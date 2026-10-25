import test from 'node:test';
import assert from 'node:assert/strict';

import { openDB, db } from '../db.js';
import { loadInventory, inventoryItems, movements, receiveShopping } from '../inventory.js';

test('przyjęcie zakupów jest atomowe i nie nalicza drugi raz po ponowieniu', async () => {
  await openDB();
  await loadInventory();

  const row = {
    id: 'shp_atomic_receipt_test',
    name: 'Produkt testowy — przyjęcie atomowe',
    amount: 2,
    unit: 'kg',
    done: true,
  };

  const first = await receiveShopping([row]);
  assert.equal(first.added, 1);
  assert.equal(first.created, 1);
  assert.equal(first.skipped, 0);
  assert.ok(row.inventoryReceivedAt > 0);

  let item = inventoryItems().find((x) => x.name === row.name);
  assert.ok(item);
  assert.equal(item.stock, 2000);
  assert.equal(movements(item.id).filter((m) => m.sourceShoppingId === row.id).length, 1);

  const second = await receiveShopping([row]);
  assert.equal(second.added, 0);
  assert.equal(second.skipped, 1);
  assert.equal(inventoryItems().find((x) => x.id === item.id).stock, 2000);

  // Symuluj ponowne otwarcie aplikacji: stan i ruchy są ładowane z bazy.
  const storedRow = await db.get('shoppingItems', row.id);
  assert.ok(storedRow.inventoryReceivedAt > 0);
  await loadInventory();
  const afterReload = await db.get('shoppingItems', row.id);
  const third = await receiveShopping([afterReload]);
  assert.equal(third.added, 0);
  assert.equal(inventoryItems().find((x) => x.id === item.id).stock, 2000);
  assert.equal(movements(item.id).filter((m) => m.sourceShoppingId === row.id).length, 1);
});


test('równoległe przyjęcie tej samej pozycji nalicza stan i historię tylko raz', async () => {
  await openDB();
  await loadInventory();

  const id = 'shp_concurrent_receipt_test';
  const name = 'Produkt testowy — przyjęcie równoległe';
  const rowA = { id, name, amount: 2, unit: 'kg', done: true };
  const rowB = { id, name, amount: 2, unit: 'kg', done: true };

  const results = await Promise.all([
    receiveShopping([rowA]),
    receiveShopping([rowB]),
  ]);

  assert.equal(results.reduce((n, result) => n + result.added, 0), 1);
  assert.equal(results.reduce((n, result) => n + result.skipped, 0), 1);

  const matches = inventoryItems().filter((item) => item.name === name);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].stock, 2000);
  assert.equal(movements(matches[0].id).filter((move) => move.sourceShoppingId === id).length, 1);

  const itemIds = new Set(matches.map((item) => item.id));
  const moveIds = movements().filter((move) => itemIds.has(move.itemId) || move.sourceShoppingId === id).map((move) => move.id);
  await db.tx(['inventoryItems', 'inventoryMovements', 'shoppingItems'], (tx) => {
    for (const itemId of itemIds) tx.delete('inventoryItems', itemId);
    for (const moveId of moveIds) tx.delete('inventoryMovements', moveId);
    tx.delete('shoppingItems', id);
  });
  await loadInventory();
});
