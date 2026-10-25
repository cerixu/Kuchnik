import test from 'node:test';
import assert from 'node:assert/strict';

const data = new Map([
  ['kdb:recipes', JSON.stringify([{ id: 'r1', name: 'Stara receptura' }])],
  ['kdb:settings', JSON.stringify([{ key: 'theme', value: 'dark' }])],
]);
let failKey = null;
let failNext = false;

globalThis.localStorage = {
  getItem(key) { return data.has(key) ? data.get(key) : null; },
  setItem(key, value) {
    if (failNext && key === failKey) {
      failNext = false;
      throw Object.assign(new Error('Simulated localStorage quota exceeded'), { name: 'QuotaExceededError' });
    }
    data.set(key, String(value));
  },
  removeItem(key) { data.delete(key); },
};
Object.defineProperty(globalThis, 'indexedDB', {
  configurable: true,
  writable: true,
  value: undefined,
});

const { openDB, db, storageStatus } = await import('../db.js?fallback-transaction-atomic-test');

test('fallback multi-store transactions stage changes and roll back a failed storage write', async () => {
  await openDB();
  assert.equal(storageStatus().mode, 'local');

  const oldRecipes = data.get('kdb:recipes');
  const oldSettings = data.get('kdb:settings');
  assert.deepEqual(await db.getAll('recipes'), [{ id: 'r1', name: 'Stara receptura' }]);
  assert.deepEqual(await db.getAll('settings'), [{ key: 'theme', value: 'dark' }]);

  await assert.rejects(
    db.tx(['recipes', 'settings'], (tx) => {
      tx.put('recipes', { id: 'r1', name: 'Nieopublikowana zmiana' });
      tx.put('settings', { key: 'theme', value: 'light' });
      throw new Error('Simulated callback failure');
    }),
    /Simulated callback failure/,
  );
  assert.equal(data.get('kdb:recipes'), oldRecipes);
  assert.equal(data.get('kdb:settings'), oldSettings);
  assert.deepEqual(await db.getAll('recipes'), [{ id: 'r1', name: 'Stara receptura' }]);
  assert.deepEqual(await db.getAll('settings'), [{ key: 'theme', value: 'dark' }]);

  // Fail the second key after the first key has been written. The first key
  // must be restored and neither staged map may become visible in memory.
  failKey = 'kdb:settings';
  failNext = true;
  await assert.rejects(
    db.tx(['recipes', 'settings'], (tx) => {
      tx.put('recipes', { id: 'r1', name: 'Nieutrwalona receptura' });
      tx.put('settings', { key: 'theme', value: 'light' });
    }),
    /Nie udało się zapisać transakcji awaryjnej/,
  );

  assert.equal(data.get('kdb:recipes'), oldRecipes);
  assert.equal(data.get('kdb:settings'), oldSettings);
  assert.deepEqual(await db.getAll('recipes'), [{ id: 'r1', name: 'Stara receptura' }]);
  assert.deepEqual(await db.getAll('settings'), [{ key: 'theme', value: 'dark' }]);
  assert.equal(storageStatus().mode, 'memory');
  assert.equal(storageStatus().quotaHit, true);
});
