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
       (localStorage, a w ostateczności sama pamięć), zamiast pokazać błąd;
     • uszkodzony zapis awaryjny nie jest automatycznie nadpisywany pustymi danymi.
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
    try {
      // Jednorazowy fault-injection hook wyłącznie dla automatycznego testu
      // odzyskiwania startu. Nie działa bez jawnego ustawienia przez test.
      const qa = globalThis.__kuchnikQA;
      if (qa && qa.failNextIndexedDBOpen === true) {
        qa.failNextIndexedDBOpen = false;
        throw Object.assign(new Error('Simulated transient IndexedDB startup failure'), { name: 'InvalidStateError' });
      }
      rq = version ? indexedDB.open(DB_NAME, version) : indexedDB.open(DB_NAME);
    } catch (e) { clearTimeout(timer); return fail(e); }
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
      fn({ put: (s, v) => t.objectStore(s).put(v), add: (s, v) => t.objectStore(s).add(v), delete: (s, k) => t.objectStore(s).delete(k), clear: (s) => t.objectStore(s).clear() });
      return done(t);
    }),
  };
}

/* ---------- Backend awaryjny: localStorage albo sama pamięć ---------- */

const clone = (v) => { try { return JSON.parse(JSON.stringify(v)); } catch (_) { return v; } };

function mapBackend(persist) {
  const maps = {};
  const key = (s) => 'kdb:' + s;
  let canRead = persist;
  let canWrite = persist;
  const suspendWrites = (reason) => {
    canWrite = false;
    status.mode = 'memory';
    status.reason = reason;
  };
  const load = (s) => {
    if (maps[s]) return maps[s];
    const m = new Map();
    if (canRead) {
      let raw = null;
      try { raw = localStorage.getItem(key(s)); }
      catch (_) {
        canRead = false;
        suspendWrites('Nie można odczytać awaryjnej pamięci przeglądarki. Zapis lokalny został wstrzymany, aby nie nadpisać istniejących danych.');
      }
      if (raw) {
        try {
          const values = JSON.parse(raw);
          const primaryKey = STORES[s];
          if (!Array.isArray(values) || values.some((v) =>
            !v || typeof v !== 'object' || !Object.prototype.hasOwnProperty.call(v, primaryKey) || v[primaryKey] == null
          )) throw new Error('Nieprawidłowy format danych');
          for (const v of values) m.set(v[primaryKey], v);
        } catch (_) {
          // Nigdy nie zapisuj pustej mapy na uszkodzony klucz: oryginalny tekst
          // może być jedyną kopią danych, którą da się później odzyskać.
          suspendWrites(`Awaryjne dane „${s}” mają nieprawidłowy format. Oryginał pozostaje w localStorage; zapis awaryjny wstrzymano, aby go nie nadpisać.`);
        }
      }
    }
    return (maps[s] = m);
  };
  const flush = (s) => {
    if (!canWrite) return;
    const values = [...load(s).values()];
    // load() mogło wykryć uszkodzone dane i wstrzymać zapis.
    if (!canWrite) return;
    try { localStorage.setItem(key(s), JSON.stringify(values)); }
    catch (_) {
      status.quotaHit = true;
      suspendWrites('Brak miejsca w awaryjnej pamięci przeglądarki. Dalszy zapis wstrzymano, aby nie nadpisać istniejących danych.');
    }
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
      const scope = new Set(stores);
      const staged = new Map();
      const touched = new Set();
      const table = (s) => {
        if (!STORES[s] || !scope.has(s)) {
          throw Object.assign(new Error(`Magazyn "${s}" nie należy do transakcji`), { name: 'NotFoundError' });
        }
        if (!staged.has(s)) {
          const current = load(s);
          staged.set(s, new Map([...current.entries()].map(([k, v]) => [k, clone(v)])));
        }
        return staged.get(s);
      };

      // Apply every operation to detached maps first. A callback error must not
      // leak half a transaction into the in-memory fallback backend.
      fn({
        put: (s, v) => { table(s).set(kp(s, v), clone(v)); touched.add(s); },
        add: (s, v) => {
          const m = table(s), id = kp(s, v);
          if (m.has(id)) throw Object.assign(new Error('Rekord już istnieje: ' + s), { name: 'ConstraintError' });
          m.set(id, clone(v)); touched.add(s);
        },
        delete: (s, k) => { table(s).delete(k); touched.add(s); },
        clear: (s) => { table(s).clear(); touched.add(s); },
      });
      if (!touched.size) return;

      // If persistence was already suspended because the stored data is
      // malformed/unavailable, retain the app's explicit session-memory mode.
      if (!canWrite) {
        for (const s of touched) maps[s] = staged.get(s);
        return;
      }

      // Serialize before touching storage, so serialization errors cannot leave
      // one store updated and another store untouched.
      const serialized = new Map();
      for (const s of touched) serialized.set(s, JSON.stringify([...staged.get(s).values()]));

      const previous = new Map();
      try {
        for (const s of touched) previous.set(s, localStorage.getItem(key(s)));
      } catch (e) {
        suspendWrites('Nie można odczytać awaryjnej pamięci przed transakcją; zapis został wstrzymany.');
        throw e;
      }

      const written = [];
      try {
        for (const s of touched) {
          localStorage.setItem(key(s), serialized.get(s));
          written.push(s);
        }
      } catch (e) {
        let rollbackFailed = false;
        for (const s of written.reverse()) {
          try {
            const raw = previous.get(s);
            if (raw == null) localStorage.removeItem(key(s));
            else localStorage.setItem(key(s), raw);
          } catch (_) {
            rollbackFailed = true;
          }
        }
        status.quotaHit = true;
        suspendWrites(rollbackFailed
          ? 'Transakcja awaryjna nie powiodła się, a pełne cofnięcie zapisu nie było możliwe. Nie wykonuj kolejnych zmian i wyeksportuj kopię, jeśli to możliwe.'
          : 'Brak miejsca w awaryjnej pamięci przeglądarki. Transakcję cofnięto, dalszy zapis wstrzymano, aby chronić istniejące dane.');
        throw Object.assign(
          new Error(rollbackFailed ? 'Transakcja awaryjna nie została w pełni cofnięta.' : 'Nie udało się zapisać transakcji awaryjnej; zmiany cofnięto.'),
          { name: e?.name || 'QuotaExceededError', cause: e },
        );
      }

      // Publish the staged maps only after every persistent key was written.
      for (const s of touched) maps[s] = staged.get(s);
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
