import test from 'node:test';
import assert from 'node:assert/strict';

import { openDB, db } from '../db.js';
import { loadInventory, inventoryItems, movements } from '../inventory.js';
import { parseBackup, importBackup } from '../backup.js';

test('niekompletna kopia zachowuje sekcje magazynu i jego historię', async () => {
  await openDB();
  const item = {
    id: 'inv_backup_safety_test', name: 'Produkt testowy — ochrona kopii',
    unit: 'g', stock: 321, minStock: 0, createdAt: 1, updatedAt: 1,
  };
  const movement = {
    id: 'mv_backup_safety_test', itemId: item.id, name: item.name,
    unit: 'g', type: 'purchase', amount: 321, at: 1, reason: 'test',
  };
  await db.tx(['inventoryItems', 'inventoryMovements', 'settings'], (t) => {
    t.put('inventoryItems', item);
    t.put('inventoryMovements', movement);
    t.put('settings', { key: 'seeded', value: true });
  });
  await loadInventory();

  const parsed = parseBackup(JSON.stringify({
    app: 'Kucharzyna',
    version: 1,
    data: {
      recipes: [], ingredients: [], categories: [], shoppingItems: [],
      settings: [{ key: 'seeded', value: true }], history: [],
    },
  }));
  assert.ok(parsed.summary.preservedSections.some((x) => x.key === 'inventoryItems'));
  assert.ok(parsed.summary.preservedSections.some((x) => x.key === 'inventoryMovements'));

  await importBackup(parsed.backup, 'replace');
  assert.equal((await db.get('inventoryItems', item.id)).stock, 321);
  assert.equal((await db.get('inventoryMovements', movement.id)).amount, 321);
  assert.equal(inventoryItems().find((x) => x.id === item.id).stock, 321);
  assert.equal(movements(item.id).filter((x) => x.id === movement.id).length, 1);
});

test('odrzuca kopię bez sekcji receptur przed zmianą danych', () => {
  assert.throws(
    () => parseBackup(JSON.stringify({ app: 'Kucharzyna', version: 1, data: {} })),
    /brakuje sekcji receptur/,
  );
});
