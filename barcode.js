/* ==========================================================================
   barcode.js — odczyt kodów kreskowych EAN-13 / EAN-8 / UPC-A bez bibliotek.

   Safari nie ma BarcodeDetector, więc aplikacja ma własny dekoder:
   • próbkuje obraz wzdłuż wielu linii pod różnymi kątami (kod nie musi być
     idealnie poziomo), w obu kierunkach (także do góry nogami),
   • zamienia profil jasności na szerokości kresek i dopasowuje wzorce L/G/R
     z tolerancją na rozmycie i szum,
   • sprawdza cyfrę kontrolną — fałszywe odczyty są praktycznie wykluczone.
   Gdy przeglądarka ma BarcodeDetector (Chrome/Android), jest używany w pierwszej kolejności.
   ========================================================================== */

const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
const R = L.map((p) => [...p].map((c) => (c === '0' ? '1' : '0')).join(''));
const G = R.map((p) => [...p].reverse().join(''));
const PARITY = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];

const runsOf = (p) => { const out = []; let n = 1; for (let i = 1; i < p.length; i++) { if (p[i] === p[i - 1]) n++; else { out.push(n); n = 1; } } out.push(n); return out; };
const TABLE = { L: L.map(runsOf), G: G.map(runsOf), R: R.map(runsOf) };

/* ---------- Cyfra kontrolna ---------- */

export function checkDigitOK(code) {
  if (!/^\d{8}$|^\d{12}$|^\d{13}$/.test(code)) return false;
  const d = [...code].map(Number);
  const chk = d.pop();
  let sum = 0;
  for (let i = d.length - 1, w = 3; i >= 0; i--, w = w === 3 ? 1 : 3) sum += d[i] * w;
  return (10 - (sum % 10)) % 10 === chk;
}
export const normalizeEAN = (code) => { const c = String(code || '').replace(/\D/g, ''); return c.length === 12 ? '0' + c : c; };

/* ---------- Dekodowanie szerokości kresek ---------- */

function bestDigit(w, sets) {
  const s = w[0] + w[1] + w[2] + w[3];
  if (!(s > 0)) return null;
  let best = null, bestErr = 1e9;
  for (const set of sets) {
    for (let d = 0; d < 10; d++) {
      const p = TABLE[set][d];
      let e = 0;
      for (let k = 0; k < 4; k++) { const m = (w[k] * 7) / s; e += (m - p[k]) * (m - p[k]); }
      if (e < bestErr) { bestErr = e; best = { d, set }; }
    }
  }
  return bestErr < 0.9 ? best : null;
}

function guardOK(w, i, count) {
  const u = (w[i] + w[i + 1] + w[i + 2]) / 3;
  if (!(u > 0.8)) return false;
  for (let k = 0; k < count; k++) if (w[i + k] < u * 0.45 || w[i + k] > u * 1.9) return false;
  return true;
}

/** `w` — kolejne szerokości biegów (naprzemiennie kreska/przerwa), `barFirst` — czy w[0] jest kreską. */
function decodeRuns(w, barFirst) {
  const n = w.length;
  for (let i = barFirst ? 0 : 1; i + 43 <= n; i += 2) {
    if (!guardOK(w, i, 3)) continue;
    // EAN-13 / UPC-A: 3 + 24 + 5 + 24 + 3 = 59 biegów
    if (i + 59 <= n) {
      const left = [], par = [];
      let ok = true, j = i + 3;
      for (let k = 0; k < 6 && ok; k++, j += 4) { const r = bestDigit(w.slice(j, j + 4), ['L', 'G']); if (!r) ok = false; else { left.push(r.d); par.push(r.set); } }
      if (ok) {
        const mid = j; // środkowy ogranicznik 5 biegów
        j += 5;
        const right = [];
        for (let k = 0; k < 6 && ok; k++, j += 4) { const r = bestDigit(w.slice(j, j + 4), ['R']); if (!r) ok = false; else right.push(r.d); }
        if (ok && guardOK(w, j, 3) && mid > 0) {
          const first = PARITY.indexOf(par.join(''));
          if (first >= 0) { const code = String(first) + left.join('') + right.join(''); if (checkDigitOK(code)) return { code, format: 'ean_13' }; }
        }
      }
    }
    // EAN-8: 3 + 16 + 5 + 16 + 3 = 43 biegów
    {
      const left = []; let ok = true, j = i + 3;
      for (let k = 0; k < 4 && ok; k++, j += 4) { const r = bestDigit(w.slice(j, j + 4), ['L']); if (!r) ok = false; else left.push(r.d); }
      if (ok) {
        j += 5;
        const right = [];
        for (let k = 0; k < 4 && ok; k++, j += 4) { const r = bestDigit(w.slice(j, j + 4), ['R']); if (!r) ok = false; else right.push(r.d); }
        if (ok && guardOK(w, j, 3)) { const code = left.join('') + right.join(''); if (checkDigitOK(code)) return { code, format: 'ean_8' }; }
      }
    }
  }
  return null;
}

/** Profil jasności jednej linii → kod albo null. */
export function decodeProfile(prof) {
  const n = prof.length;
  if (n < 60) return null;
  // Progi z percentyli; histereza chroni przed szumem na krawędziach.
  const sorted = Float32Array.from(prof).sort();
  const lo = sorted[Math.floor(n * 0.04)], hi = sorted[Math.floor(n * 0.96)];
  if (hi - lo < 28) return null;
  const mid = (lo + hi) / 2, h = (hi - lo) * 0.09;
  const w = [];
  let cur = prof[0] < mid ? 1 : 0, len = 0, first = cur;
  for (let i = 0; i < n; i++) {
    const v = prof[i];
    const c = cur === 1 ? (v > mid + h ? 0 : 1) : (v < mid - h ? 1 : 0);
    if (c === cur) len++; else { w.push(len); cur = c; len = 1; }
  }
  w.push(len);
  if (w.length < 43) return null;
  const barFirst = first === 1;
  let r = decodeRuns(w, barFirst);
  if (r) return r;
  const rev = w.slice().reverse();
  // po odwróceniu pierwszym biegiem jest to, czym był ostatni
  const lastIsBar = (w.length % 2 === 1) ? barFirst : !barFirst;
  r = decodeRuns(rev, lastIsBar);
  return r;
}

/* ---------- Próbkowanie obrazu wzdłuż linii pod kątem ---------- */

function toGray(img) {
  const { data, width, height } = img;
  const g = new Float32Array(width * height);
  for (let i = 0, p = 0; i < g.length; i++, p += 4) g[i] = data[p] * 0.299 + data[p + 1] * 0.587 + data[p + 2] * 0.114;
  return g;
}

function sampleLine(g, W, H, cx, cy, ang, len, step) {
  const dx = Math.cos(ang), dy = Math.sin(ang);
  const n = Math.floor(len / step);
  const out = new Float32Array(n);
  let k = 0;
  for (let i = 0; i < n; i++) {
    const t = (i - n / 2) * step;
    const x = cx + dx * t, y = cy + dy * t;
    if (x < 0 || y < 0 || x >= W - 1 || y >= H - 1) continue;
    const x0 = x | 0, y0 = y | 0, fx = x - x0, fy = y - y0, p = y0 * W + x0;
    out[k++] = g[p] * (1 - fx) * (1 - fy) + g[p + 1] * fx * (1 - fy) + g[p + W] * (1 - fx) * fy + g[p + W + 1] * fx * fy;
  }
  return out.subarray(0, k);
}

const ANGLES = [0, 5, -5, 10, -10, 17, -17, 26, -26, 36, -36].map((d) => (d * Math.PI) / 180);
const OFFSETS = [0.5, 0.42, 0.58, 0.34, 0.66, 0.26, 0.74, 0.18, 0.82, 0.46, 0.54, 0.38, 0.62, 0.3, 0.7];

/** ImageData-podobny obiekt ({data,width,height}) → { code, format } albo null. */
export function decodeImageData(img) {
  const { width: W, height: H } = img;
  const g = toGray(img);
  const diag = Math.hypot(W, H);
  for (const step of [1, 0.5]) {
    if (step === 0.5 && W > 900) break;
    for (const ang of ANGLES) {
      for (const off of OFFSETS) {
        const cy = H * off, cx = W / 2;
        // linia przechodzi przez (cx, cy) — pod kątem obejmuje większość obrazu
        const prof = sampleLine(g, W, H, cx, cy, ang, diag, step);
        const r = decodeProfile(prof);
        if (r) return r;
      }
    }
  }
  return null;
}

/* ---------- Kamera: klatka → kod ---------- */

let nativeDetector = null;
export async function nativeSupported() {
  try {
    if (!('BarcodeDetector' in globalThis)) return false;
    const fm = await globalThis.BarcodeDetector.getSupportedFormats();
    if (!fm.includes('ean_13')) return false;
    nativeDetector = nativeDetector || new globalThis.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] });
    return true;
  } catch (_) { return false; }
}

/** Odczyt z elementu video: BarcodeDetector, a gdy brak — własny dekoder na zmniejszonej klatce. */
export async function detectFrame(video, canvas) {
  if (nativeDetector) {
    try { const r = await nativeDetector.detect(video); if (r && r[0] && r[0].rawValue) return { code: normalizeEAN(r[0].rawValue), format: r[0].format || 'native' }; } catch (_) { /* spadnij do własnego */ }
  }
  const vw = video.videoWidth, vh = video.videoHeight;
  if (!vw || !vh) return null;
  const scale = Math.min(1, 960 / vw);
  canvas.width = Math.round(vw * scale); canvas.height = Math.round(vh * scale);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const r = decodeImageData(img);
  return r ? { code: normalizeEAN(r.code), format: r.format } : null;
}

/* ---------- Dane o produkcie (opcjonalnie, Open Food Facts) ---------- */

/** Szuka nazwy produktu po kodzie (tylko kod EAN opuszcza telefon). Zwraca { name, brand, amount, unit } albo null. */
export async function lookupProduct(code, { timeout = 6500 } = {}) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeout);
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json?fields=product_name,product_name_pl,generic_name_pl,brands,quantity,categories_tags`, { signal: ctl.signal, credentials: 'omit', referrerPolicy: 'no-referrer' });
    if (!res.ok) return null;
    const j = await res.json();
    if (!j || j.status === 0 || !j.product) return null;
    const p = j.product;
    const name = (p.product_name_pl || p.generic_name_pl || p.product_name || '').trim();
    if (!name) return null;
    const brand = String(p.brands || '').split(',')[0].trim();
    let amount = null, unit = '';
    const q = String(p.quantity || '').toLowerCase().replace(',', '.').match(/([\d.]+)\s*(kg|g|l|ml|cl|szt)/);
    if (q) {
      const v = parseFloat(q[1]);
      if (q[2] === 'kg') { amount = v * 1000; unit = 'g'; } else if (q[2] === 'g') { amount = v; unit = 'g'; }
      else if (q[2] === 'l') { amount = v * 1000; unit = 'ml'; } else if (q[2] === 'ml') { amount = v; unit = 'ml'; }
      else if (q[2] === 'cl') { amount = v * 10; unit = 'ml'; } else { amount = v; unit = 'szt.'; }
    }
    return { name: brand && !name.toLowerCase().includes(brand.toLowerCase()) ? `${name} (${brand})` : name, brand, amount, unit, categories: p.categories_tags || [] };
  } catch (_) { return null; } finally { clearTimeout(timer); }
}
