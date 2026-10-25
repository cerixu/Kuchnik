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
