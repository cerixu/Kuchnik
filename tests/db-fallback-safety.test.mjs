import test from 'node:test';
import assert from 'node:assert/strict';

const data = new Map([
  ['kdb:recipes', '{"broken":'],
  ['kdb:settings', JSON.stringify([{ key: 'theme', value: 'dark' }])],
]);

globalThis.localStorage = {
  getItem(key) { return data.has(key) ? data.get(key) : null; },
  setItem(key, value) { data.set(key, String(value)); },
  removeItem(key) { data.delete(key); },
};
Object.defineProperty(globalThis, 'indexedDB', {
  configurable: true,
  writable: true,
  value: undefined,
});

const { openDB, db, storageStatus } = await import('../db.js?fallback-safety-test');

test('malformed fallback storage is preserved and further writes are suspended', async () => {
  const originalRecipes = data.get('kdb:recipes');
  const originalSettings = data.get('kdb:settings');

  await openDB();
  assert.equal(storageStatus().mode, 'local');

  assert.deepEqual(await db.getAll('recipes'), []);
  assert.equal(data.get('kdb:recipes'), originalRecipes);
  assert.equal(storageStatus().mode, 'memory');
  assert.match(storageStatus().reason, /wstrzymano|wstrzymany/i);

  // Other valid stores remain readable, but writes cannot overwrite any fallback key.
  assert.deepEqual(await db.getAll('settings'), [{ key: 'theme', value: 'dark' }]);
  await db.put('recipes', { id: 'safe-test-recipe', name: 'Test' });
  await db.put('settings', { key: 'theme', value: 'light' });

  assert.equal(data.get('kdb:recipes'), originalRecipes);
  assert.equal(data.get('kdb:settings'), originalSettings);
});
