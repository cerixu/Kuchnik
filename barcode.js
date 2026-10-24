/* Pure EAN-13 decoder used as a local fallback when BarcodeDetector is absent. */
const L = ['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
const G = ['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'];
const R = ['1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'];
const PARITY = ['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'];

export function decodeEAN13Bits(bits) {
  if (typeof bits !== 'string' || bits.length !== 95 || !/^[01]+$/.test(bits)) return null;
  if (bits.slice(0, 3) !== '101' || bits.slice(45, 50) !== '01010' || bits.slice(92, 95) !== '101') return null;
  let left = '', parity = '';
  for (let i = 0; i < 6; i++) {
    const chunk = bits.slice(3 + i * 7, 10 + i * 7);
    let digit = L.indexOf(chunk);
    if (digit >= 0) { left += String(digit); parity += 'L'; continue; }
    digit = G.indexOf(chunk);
    if (digit >= 0) { left += String(digit); parity += 'G'; continue; }
    return null;
  }
  const first = PARITY.indexOf(parity);
  if (first < 0) return null;
  let right = '';
  for (let i = 0; i < 6; i++) {
    const digit = R.indexOf(bits.slice(50 + i * 7, 57 + i * 7));
    if (digit < 0) return null;
    right += String(digit);
  }
  const digits = String(first) + left + right;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(digits[i]) * (i % 2 === 0 ? 1 : 3);
  return (10 - (sum % 10)) % 10 === Number(digits[12]) ? digits : null;
}

function otsuThreshold(values) {
  const hist = new Array(256).fill(0);
  let sum = 0;
  for (const v of values) { hist[v]++; sum += v; }
  let sumB = 0, weightB = 0, best = -1, threshold = 128;
  for (let t = 0; t < 256; t++) {
    weightB += hist[t];
    if (!weightB) continue;
    const weightF = values.length - weightB;
    if (!weightF) break;
    sumB += t * hist[t];
    const meanB = sumB / weightB, meanF = (sum - sumB) / weightF;
    const between = weightB * weightF * (meanB - meanF) * (meanB - meanF);
    if (between > best) { best = between; threshold = t; }
  }
  return threshold;
}

/** EAN-8 software fallback for browsers without BarcodeDetector. */
export function decodeEAN8Bits(bits) {
  if (typeof bits !== 'string' || bits.length !== 67 || !/^[01]+$/.test(bits)) return null;
  if (bits.slice(0, 3) !== '101' || bits.slice(31, 36) !== '01010' || bits.slice(64, 67) !== '101') return null;
  let digits = '';
  for (let i = 0; i < 4; i++) {
    const digit = L.indexOf(bits.slice(3 + i * 7, 10 + i * 7));
    if (digit < 0) return null;
    digits += String(digit);
  }
  for (let i = 0; i < 4; i++) {
    const digit = R.indexOf(bits.slice(36 + i * 7, 43 + i * 7));
    if (digit < 0) return null;
    digits += String(digit);
  }
  let sum = 0;
  for (let i = 0; i < 7; i++) sum += Number(digits[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(digits[7]) ? digits : null;
}

const MODULE_SCALES = [0.9, 0.95, 0.98, 1, 1.02, 1.05, 1.1];
const MODULE_PHASES = [-0.3, 0, 0.3];

/** Decode one grayscale scanline. Reverse reading handles a barcode turned 180°. */
function decodeGrayLine(values) {
  const length = values.length;
  if (length < 180) return null;

  let min = 255, max = 0;
  for (let i = 0; i < length; i++) {
    const value = values[i];
    if (value < min) min = value;
    if (value > max) max = value;
  }
  if (max - min < 24) return null;

  const thresholds = [...new Set([otsuThreshold(values), Math.round((min + max) / 2)])];
  const bits = new Uint8Array(length);

  for (const threshold of thresholds) {
    for (let i = 0; i < length; i++) bits[i] = values[i] <= threshold ? 1 : 0;

    for (const reverse of [false, true]) {
      const runs = [];
      let color = bits[reverse ? length - 1 : 0];
      let runStart = 0;

      for (let i = 1; i <= length; i++) {
        const next = i === length ? -1 : bits[reverse ? length - 1 - i : i];
        if (i === length || next !== color) {
          runs.push({ color, start: runStart, length: i - runStart });
          color = next;
          runStart = i;
        }
      }

      // Guard 101 gives a local module-width estimate without guessing across
      // the entire image. The checksum remains the final acceptance criterion.
      for (let i = 0; i + 2 < runs.length; i++) {
        const a = runs[i], b = runs[i + 1], c = runs[i + 2];
        if (a.color !== 1 || b.color !== 0 || c.color !== 1) continue;

        const module = (a.length + b.length + c.length) / 3;
        if (module < 1.05) continue;

        const smallest = Math.min(a.length, b.length, c.length);
        const largest = Math.max(a.length, b.length, c.length);
        if (largest / Math.max(1, smallest) > 2.8) continue;

        const quiet = runs[i - 1];
        // Normally a white quiet zone is required. At the edge of the camera
        // frame allow it to be clipped; the complete guard + checksum must pass.
        if ((!quiet || quiet.color !== 0 || quiet.length < module * 3) && a.start > module * 1.5) continue;

        for (const bitLength of [95, 67]) {
          for (const scale of MODULE_SCALES) {
            const step = module * scale;
            if (a.start + step * bitLength > length + module * 0.1) continue;

            for (const phase of MODULE_PHASES) {
              const origin = a.start + module * phase;
              if (origin < 0 || origin + step * bitLength > length) continue;
              let sampled = '';
              for (let m = 0; m < bitLength; m++) {
                const x = Math.min(length - 1, Math.max(0, Math.floor(origin + (m + 0.5) * step)));
                sampled += bits[reverse ? length - 1 - x : x] ? '1' : '0';
              }

              const decoded = bitLength === 95
                ? decodeEAN13Bits(sampled)
                : decodeEAN8Bits(sampled);
              if (decoded) {
                // UPC-A is encoded as a leading-zero EAN-13 bit pattern.
                // Return the printed 12-digit UPC-A string for product lookup.
                if (bitLength === 95 && decoded.length === 13 && decoded[0] === '0') return decoded.slice(1);
                return decoded;
              }
            }
          }
        }
      }
    }
  }
  return null;
}

/**
 * Scan the full camera frame at multiple angles and offsets.
 * This supports barcodes anywhere in view, rotated/tilted labels and cameras
 * that do not expose the native BarcodeDetector API (e.g. iOS Safari).
 */
export function decodeEAN13Frame(video, canvas) {
  if (!video || !canvas || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return null;

  // Keep more pixels for small retail labels while avoiding a huge 4K canvas.
  const width = Math.min(1280, Math.max(960, video.videoWidth));
  const height = Math.max(320, Math.round(width * video.videoHeight / video.videoWidth));
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(video, 0, 0, width, height);

  let pixels;
  try {
    pixels = ctx.getImageData(0, 0, width, height).data;
  } catch (_) {
    return null;
  }

  // Convert the frame once; reading lots of individual rows from Canvas is
  // significantly slower on mobile Safari than scanning a single typed array.
  const gray = new Uint8Array(width * height);
  for (let src = 0, dst = 0; dst < gray.length; dst++, src += 4) {
    gray[dst] = (pixels[src] * 77 + pixels[src + 1] * 150 + pixels[src + 2] * 29) >> 8;
  }

  const angles = [0, 90, 15, 165, 30, 150, 45, 135, 60, 120, 75, 105];
  const offsets = [0, -0.16, 0.16, -0.32, 0.32, -0.48, 0.48, -0.64, 0.64, -0.8, 0.8];
  const centerX = (width - 1) / 2;
  const centerY = (height - 1) / 2;

  for (const degrees of angles) {
    const angle = degrees * Math.PI / 180;
    const dx = Math.cos(angle), dy = Math.sin(angle);
    const nx = -dy, ny = dx;
    const normalRadius = (Math.abs(nx) * (width - 1) + Math.abs(ny) * (height - 1)) / 2;

    for (const fraction of offsets) {
      const x0 = centerX + nx * normalRadius * fraction;
      const y0 = centerY + ny * normalRadius * fraction;
      let tMin = -Infinity, tMax = Infinity;

      if (Math.abs(dx) < 1e-6) {
        if (x0 < 0 || x0 >= width) continue;
      } else {
        const ta = (0 - x0) / dx, tb = (width - 1 - x0) / dx;
        tMin = Math.max(tMin, Math.min(ta, tb));
        tMax = Math.min(tMax, Math.max(ta, tb));
      }
      if (Math.abs(dy) < 1e-6) {
        if (y0 < 0 || y0 >= height) continue;
      } else {
        const ta = (0 - y0) / dy, tb = (height - 1 - y0) / dy;
        tMin = Math.max(tMin, Math.min(ta, tb));
        tMax = Math.min(tMax, Math.max(ta, tb));
      }

      const firstT = Math.ceil(tMin), lastT = Math.floor(tMax);
      const lineLength = lastT - firstT + 1;
      if (lineLength < 180) continue;
      const values = new Uint8Array(lineLength);
      for (let i = 0; i < lineLength; i++) {
        const t = firstT + i;
        const px = Math.max(0, Math.min(width - 1, x0 + dx * t));
        const py = Math.max(0, Math.min(height - 1, y0 + dy * t));
        const x = Math.floor(px), y = Math.floor(py);
        const x1 = Math.min(width - 1, x + 1), y1 = Math.min(height - 1, y + 1);
        const fx = px - x, fy = py - y;
        const top = gray[y * width + x] * (1 - fx) + gray[y * width + x1] * fx;
        const bottom = gray[y1 * width + x] * (1 - fx) + gray[y1 * width + x1] * fx;
        values[i] = Math.round(top * (1 - fy) + bottom * fy);
      }

      const decoded = decodeGrayLine(values);
      if (decoded) return decoded;
    }
  }
  return null;
}
