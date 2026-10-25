import test from 'node:test';
import assert from 'node:assert/strict';

const initialRows = [{ id: 'r1', name: 'Poprzedni zapis' }];

async function setup(tag) {
  const data = new Map([['kdb:recipes', JSON.stringify(initialRows)]]);
  let failKey = null;
  let failNext = false;

  globalThis.localStorage = {
    getItem(key) { return data.has(key) ? data.get(key) : null; },
    setItem(key, value) {
      if (failNext && key === failKey) {
        failNext = false;
        throw Object.assign(new Error('Simulated quota exceeded'), { name: 'QuotaExceededError' });
      }
      data.set(key, String(value));
    },
    removeItem(key) { data.delete(key); },
  };
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true, writable: true, value: undefined,
  });

  const mod = await import('../db.js?fallback-single-write-' + tag);
  await mod.openDB();
  assert.equal(mod.storageStatus().mode, 'local');
  return {
    db: mod.db,
    storageStatus: mod.storageStatus,
    data,
    failOnce(key) { failKey = key; failNext = true; },
  };
}

for (const operation of [
  {
    name: 'put',
    run: (db) => db.put('recipes', { id: 'r1', name: 'Nieutrwalona zmiana' }),
  },
  {
    name: 'putMany',
    run: (db) => db.putMany('recipes', [{ id: 'r1', name: 'Nieutrwalona zmiana' }, { id: 'r2', name: 'Nowa receptura' }]),
  },
  {
    name: 'delete',
    run: (db) => db.delete('recipes', 'r1'),
  },
  {
    name: 'clear',
    run: (db) => db.clear('recipes'),
  },
]) {
  test('fallback ' + operation.name + ' rejects quota failure without publishing partial state', async () => {
    const env = await setup(operation.name);
    const before = env.data.get('kdb:recipes');
    env.failOnce('kdb:recipes');

    await assert.rejects(operation.run(env.db), /Nie udało się zapisać danych awaryjnych/);
    assert.equal(env.data.get('kdb:recipes'), before, 'persisted data must remain unchanged');
    assert.deepEqual(await env.db.getAll('recipes'), initialRows, 'in-memory snapshot must remain unchanged');
    assert.equal(env.storageStatus().mode, 'memory', 'storage status must expose the fallback mode');
    assert.equal(env.storageStatus().quotaHit, true, 'quota failure must be reported');
  });
}
