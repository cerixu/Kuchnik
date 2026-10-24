/* ==========================================================================
   db.js — cienka warstwa nad IndexedDB.
   Magazyny: recipes, ingredients, categories, shoppingItems, settings, history, inventoryItems, inventoryMovements.
   Każdy rekord ma stabilne ID (settings: klucz tekstowy).

   WAŻNE: baza ma własną, unikalną nazwę. GitHub Pages różnych repozytoriów
   tego samego konta współdzielą origin *.github.io, więc wspólna nazwa DB
   powodowałaby konflikt schematów między aplikacjami.
   ========================================================================== */

const DB_NAME = 'zaruok-app-db';
const DB_VERSION = 4;

export const STORES = {
  recipes: 'id',
  ingredients: 'id',
  categories: 'id',
  shoppingItems: 'id',
  settings: 'key',
  history: 'id',
  inventoryItems: 'id',
  inventoryMovements: 'id',
  inventoryLots: 'id',
};

let dbPromise = null;

const RECOVERABLE = new Set([
  'AbortError',
  'InvalidStateError',
  'NotFoundError',
  'UnknownError',
]);

const transientDbError = (e) => !!e && RECOVERABLE.has(e.name);

function resetConnection() {
  dbPromise = null;
}

export function openDB() {
  if (dbPromise) return dbPromise;

  let resolveOpen, rejectOpen;
  const promise = new Promise((resolve, reject) => {
    resolveOpen = resolve;
    rejectOpen = reject;
  });
  dbPromise = promise;

  queueMicrotask(() => {
    if (!('indexedDB' in globalThis)) {
      resetConnection();
      rejectOpen(new Error('Ta przeglądarka nie udostępnia IndexedDB.'));
      return;
    }

    let rq;
    try {
      if (globalThis.__kucharzynaQA?.failNextIndexedDBOpen) {
        globalThis.__kucharzynaQA.failNextIndexedDBOpen = false;
        throw new DOMException('Simulated IndexedDB startup failure', 'InvalidStateError');
      }
      rq = indexedDB.open(DB_NAME, DB_VERSION);
    } catch (e) {
      resetConnection();
      rejectOpen(e instanceof Error ? e : new Error('Nie udało się otworzyć IndexedDB.'));
      return;
    }

    rq.onupgradeneeded = () => {
      const d = rq.result;
      for (const [name, keyPath] of Object.entries(STORES)) {
        if (!d.objectStoreNames.contains(name)) {
          const store = d.createObjectStore(name, { keyPath });
          if (name === 'history') store.createIndex('recipeId', 'recipeId');
        } else if (name === 'history') {
          const store = rq.transaction.objectStore(name);
          if (!store.indexNames.contains('recipeId')) store.createIndex('recipeId', 'recipeId');
        }
      }
    };

    rq.onsuccess = () => {
      const d = rq.result;
      d.onversionchange = () => {
        d.close();
        resetConnection();
      };
      d.onclose = resetConnection;
      d.onerror = () => {
        resetConnection();
      };
      resolveOpen(d);
    };

    rq.onerror = () => {
      resetConnection();
      rejectOpen(rq.error || new Error('Nie udało się otworzyć IndexedDB.'));
    };

    rq.onblocked = () => {
      console.warn('Otwarcie IndexedDB zostało zablokowane przez inną kartę/aplikację.');
    };
  });

  return promise;
}
async function withRetry(fn) {
  try {
    return await fn();
  } catch (e) {
    if (!transientDbError(e)) throw e;
    resetConnection();
    return fn();
  }
}

const wrap = (rq) => new Promise((res, rej) => {
  rq.onsuccess = () => res(rq.result);
  rq.onerror = () => rej(rq.error);
});

const done = (t) => new Promise((res, rej) => {
  t.oncomplete = () => res();
  t.onerror = () => rej(t.error);
  t.onabort = () => rej(t.error || new Error('Transakcja przerwana'));
});

export const db = {
  async getAll(store) {
    return withRetry(async () => {
      const d = await openDB();
      return wrap(d.transaction(store).objectStore(store).getAll());
    });
  },
  async get(store, key) {
    return withRetry(async () => {
      const d = await openDB();
      return wrap(d.transaction(store).objectStore(store).get(key));
    });
  },
  async byIndex(store, index, key) {
    return withRetry(async () => {
      const d = await openDB();
      return wrap(d.transaction(store).objectStore(store).index(index).getAll(key));
    });
  },
  async put(store, val) {
    return withRetry(async () => {
      const d = await openDB();
      const t = d.transaction(store, 'readwrite');
      t.objectStore(store).put(val);
      return done(t);
    });
  },
  async putMany(store, vals) {
    return withRetry(async () => {
      const d = await openDB();
      const t = d.transaction(store, 'readwrite');
      const s = t.objectStore(store);
      vals.forEach((v) => s.put(v));
      return done(t);
    });
  },
  async delete(store, key) {
    return withRetry(async () => {
      const d = await openDB();
      const t = d.transaction(store, 'readwrite');
      t.objectStore(store).delete(key);
      return done(t);
    });
  },
  async clear(store) {
    return withRetry(async () => {
      const d = await openDB();
      const t = d.transaction(store, 'readwrite');
      t.objectStore(store).clear();
      return done(t);
    });
  },

  async tx(stores, fn) {
    return withRetry(async () => {
      const d = await openDB();
      const t = d.transaction(stores, 'readwrite');
      fn({
        put: (s, v) => t.objectStore(s).put(v),
        delete: (s, k) => t.objectStore(s).delete(k),
        clear: (s) => t.objectStore(s).clear(),
      });
      return done(t);
    });
  },
};

export const kv = {
  async get(key) { const r = await db.get('settings', key); return r ? r.value : undefined; },
  async set(key, value) { return db.put('settings', { key, value }); },
  async del(key) { return db.delete('settings', key); },
};
