/* ==========================================================================
   db.js — warstwa danych odporna na kaprysy Safari.

   Główny magazyn to IndexedDB (magazyny: recipes, ingredients, categories,
   shoppingItems, settings, history; każdy rekord ma stabilne ID).

   Safari potrafi: zawiesić pierwsze otwarcie bazy, zgubić połączenie
   („Connection to Indexed Database server lost”), odmówić dostępu (tryb
   prywatny, Lockdown, blokada danych witryn) albo zostawić bazę bez części
   magazynów. Dlatego:
     • otwarcie ma limit czasu i kilka prób,
     • brakujące magazyny są dorabiane automatycznie,
     • operacja przerwana przez zerwane połączenie jest powtarzana,
     • gdy IndexedDB nie działa wcale, aplikacja przechodzi w TRYB AWARYJNY
       (localStorage, a w ostateczności sama pamięć), zamiast pokazać błąd.
   ========================================================================== */

const DB_NAME = 'kucharzyna-db';
const DB_VERSION = 2;

export const STORES = {
  recipes: 'id',          // receptury (ze składnikami, sekcjami, krokami)
  ingredients: 'id',      // katalog składników z cenami (id = znormalizowana nazwa)
  categories: 'id',       // kategorie (wbudowane + własne)
  shoppingItems: 'id',    // lista zakupów
  settings: 'key',        // ustawienia + postęp gotowania + szkice
  history: 'id',          // historia zmian receptur (migawki)
  inventoryItems: 'id',   // magazyn: produkty, stany, progi, terminy, kody EAN
  inventoryMovements: 'id', // magazyn: ruchy (gotowanie, straty, korekty, zakupy)
};
const NAMES = Object.keys(STORES);

/* ---------- Stan i diagnostyka ---------- */

const status = { mode: 'idb', reason: '', attempts: 0, quotaHit: false };
/** { mode: 'idb' | 'local' | 'memory', reason, attempts } — do ekranu Ustawienia i komunikatów. */
export const storageStatus = () => ({ ...status });

const errText = (e) => (e ? `${e.name || 'Error'}: ${e.message || e}` : 'nieznany błąd');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const timeoutMs = () => (typeof window !== 'undefined' && window.__kDbTimeout) || 6000;
const forced = () => { try { return sessionStorage.getItem('k:forceFallback') === '1'; } catch (_) { return false; } };

/* ---------- IndexedDB: otwarcie z limitem czasu ---------- */

function openOnce(version) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const fail = (e) => { if (!settled) { settled = true; reject(e); } };
    const timer = setTimeout(() => fail(Object.assign(new Error('Przeglądarka nie odpowiedziała na otwarcie bazy (limit czasu).'), { name: 'TimeoutError' })), timeoutMs());
    let rq;
    try { rq = version ? indexedDB.open(DB_NAME, version) : indexedDB.open(DB_NAME); }
    catch (e) { clearTimeout(timer); return fail(e); }
    rq.onupgradeneeded = () => {
      const d = rq.result;
      for (const [name, keyPath] of Object.entries(STORES)) {
        if (!d.objectStoreNames.contains(name)) {
          const s = d.createObjectStore(name, { keyPath });
          if (name === 'history') s.createIndex('recipeId', 'recipeId');
        }
      }
      const tx = rq.transaction;
      if (tx && d.objectStoreNames.contains('history')) {
        const h = tx.objectStore('history');
        if (!h.indexNames.contains('recipeId')) h.createIndex('recipeId', 'recipeId');
      }
    };
    rq.onblocked = () => { /* inna karta trzyma starą wersję — czekamy na limit czasu */ };
    rq.onsuccess = () => {
      clearTimeout(timer);
      if (settled) { try { rq.result.close(); } catch (_) { /* */ } return; }
      settled = true; resolve(rq.result);
    };
    rq.onerror = (ev) => { clearTimeout(timer); try { ev.preventDefault(); } catch (_) { /* */ } fail(rq.error || new Error('Błąd otwarcia IndexedDB')); };
  });
}

/** Otwiera bazę, a jeśli brakuje magazynów (przerwana aktualizacja) — dorabia je przez podbicie wersji. */
async function openChecked() {
  let d = await openOnce();
  if (!NAMES.every((n) => d.objectStoreNames.contains(n))) {
    const next = d.version + 1;
    d.close();
    d = await openOnce(next);
  }
  if (!NAMES.every((n) => d.objectStoreNames.contains(n))) throw new Error('Baza danych nie ma wszystkich magazynów.');
  // Kontrolny odczyt: dopiero on pokazuje, że połączenie naprawdę działa.
  await new Promise((res, rej) => {
    const rq = d.transaction('settings').objectStore('settings').get('__probe__');
    rq.onsuccess = () => res(); rq.onerror = () => rej(rq.error);
  });
  return d;
}

async function openWithRetry() {
  const delays = [0, 300, 900, 2200];
  let last = null;
  for (const wait of delays) {
    if (wait) await sleep(wait);
    status.attempts++;
    try { return await openChecked(); } catch (e) { last = e; }
  }
  throw last;
}

/* ---------- Backend: IndexedDB ---------- */

const isTransient = (e) => !!e && (['InvalidStateError', 'UnknownError', 'TimeoutError', 'TransactionInactiveError', 'AbortError'].includes(e.name) || /clos|lost|connection/i.test(e.message || ''));

function idbBackend(first) {
  let conn = first;
  let reopening = null;
  const attach = (d) => {
    d.onversionchange = () => { try { d.close(); } catch (_) { /* */ } if (conn === d) conn = null; };
    d.onclose = () => { if (conn === d) conn = null; };
    return d;
  };
  attach(first);
  const get = async () => {
    if (conn) return conn;
    if (!reopening) reopening = openWithRetry().then((d) => { conn = attach(d); return d; }).finally(() => { reopening = null; });
    return reopening;
  };
  const run = async (fn) => {
    try { return await fn(await get()); }
    catch (e) { if (!isTransient(e)) throw e; conn = null; return fn(await get()); }
  };
  const wrap = (rq) => new Promise((res, rej) => { rq.onsuccess = () => res(rq.result); rq.onerror = () => rej(rq.error); });
  const done = (t) => new Promise((res, rej) => {
    t.oncomplete = () => res();
    t.onerror = () => rej(t.error);
    t.onabort = () => rej(t.error || new Error('Transakcja przerwana'));
  });
  return {
    getAll: (s) => run((d) => wrap(d.transaction(s).objectStore(s).getAll())),
    get: (s, k) => run((d) => wrap(d.transaction(s).objectStore(s).get(k))),
    byIndex: (s, i, k) => run((d) => wrap(d.transaction(s).objectStore(s).index(i).getAll(k))),
    put: (s, v) => run((d) => { const t = d.transaction(s, 'readwrite'); t.objectStore(s).put(v); return done(t); }),
    putMany: (s, vals) => run((d) => { const t = d.transaction(s, 'readwrite'); const o = t.objectStore(s); vals.forEach((v) => o.put(v)); return done(t); }),
    delete: (s, k) => run((d) => { const t = d.transaction(s, 'readwrite'); t.objectStore(s).delete(k); return done(t); }),
    clear: (s) => run((d) => { const t = d.transaction(s, 'readwrite'); t.objectStore(s).clear(); return done(t); }),
    tx: (stores, fn) => run((d) => {
      const t = d.transaction(stores, 'readwrite');
      fn({ put: (s, v) => t.objectStore(s).put(v), delete: (s, k) => t.objectStore(s).delete(k), clear: (s) => t.objectStore(s).clear() });
      return done(t);
    }),
  };
}

/* ---------- Backend awaryjny: localStorage albo sama pamięć ---------- */

const clone = (v) => { try { return JSON.parse(JSON.stringify(v)); } catch (_) { return v; } };

function mapBackend(persist) {
  const maps = {};
  const key = (s) => 'kdb:' + s;
  const load = (s) => {
    if (maps[s]) return maps[s];
    const m = new Map();
    if (persist) {
      try { const raw = localStorage.getItem(key(s)); if (raw) for (const v of JSON.parse(raw)) m.set(v[STORES[s]], v); } catch (_) { /* uszkodzone — zaczynamy od zera */ }
    }
    return (maps[s] = m);
  };
  const flush = (s) => {
    if (!persist) return;
    try { localStorage.setItem(key(s), JSON.stringify([...load(s).values()])); }
    catch (e) { status.quotaHit = true; }          // przepełnienie: dane żyją dalej w pamięci strony
  };
  const kp = (s, v) => v[STORES[s]];
  return {
    getAll: async (s) => [...load(s).values()].map(clone),
    get: async (s, k) => { const v = load(s).get(k); return v === undefined ? undefined : clone(v); },
    byIndex: async (s, i, k) => [...load(s).values()].filter((v) => v[i] === k).map(clone),
    put: async (s, v) => { load(s).set(kp(s, v), clone(v)); flush(s); },
    putMany: async (s, vals) => { const m = load(s); vals.forEach((v) => m.set(kp(s, v), clone(v))); flush(s); },
    delete: async (s, k) => { load(s).delete(k); flush(s); },
    clear: async (s) => { load(s).clear(); flush(s); },
    tx: async (stores, fn) => {
      const touched = new Set();
      fn({
        put: (s, v) => { load(s).set(kp(s, v), clone(v)); touched.add(s); },
        delete: (s, k) => { load(s).delete(k); touched.add(s); },
        clear: (s) => { load(s).clear(); touched.add(s); },
      });
      touched.forEach(flush);
    },
  };
}

/* ---------- Wybór backendu ---------- */

let backend = null;
let pending = null;

export function openDB() {
  if (backend) return Promise.resolve(backend);
  if (pending) return pending;
  pending = (async () => {
    if (!forced() && 'indexedDB' in globalThis && globalThis.indexedDB) {
      try { backend = idbBackend(await openWithRetry()); status.mode = 'idb'; return backend; }
      catch (e) { status.reason = errText(e); }
    } else {
      status.reason = forced() ? 'Tryb awaryjny wybrany ręcznie.' : 'Ta przeglądarka nie udostępnia IndexedDB.';
    }
    let ok = false;
    try { localStorage.setItem('kdb:__probe__', '1'); localStorage.removeItem('kdb:__probe__'); ok = true; } catch (_) { /* brak localStorage */ }
    backend = mapBackend(ok);
    status.mode = ok ? 'local' : 'memory';
    return backend;
  })();
  return pending;
}

const via = (name) => async (...a) => (await openDB())[name](...a);
export const db = {
  getAll: via('getAll'), get: via('get'), byIndex: via('byIndex'), put: via('put'), putMany: via('putMany'),
  delete: via('delete'), clear: via('clear'), tx: via('tx'),
};

/** Prosty magazyn klucz→wartość na bazie 'settings' (bez pamięci podręcznej). */
export const kv = {
  async get(key) { const r = await db.get('settings', key); return r ? r.value : undefined; },
  async set(key, value) { return db.put('settings', { key, value }); },
  async del(key) { return db.delete('settings', key); },
};
