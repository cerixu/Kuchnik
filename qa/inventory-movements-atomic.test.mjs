import test from 'node:test';
import assert from 'node:assert/strict';

import { db, openDB } from '../db.js';
import {
  changeStock, deductRecipe, deleteItem, getItem, inventoryItems, inventoryLoaded, loadInventory,
  movements, newItem, saveItem, undoMovements,
} from '../inventory.js';

async function addItem(name, stock) {
  const item = newItem({ name, unit: 'g', stock });
  await saveItem(item);
  return item;
}

async function cleanup(items) {
  const ids = new Set(items.map((item) => String(item.id)));
  const moveIds = movements().filter((move) => ids.has(String(move.itemId))).map((move) => move.id);
  await db.tx(['inventoryItems', 'inventoryMovements'], (tx) => {
    for (const item of items) tx.delete('inventoryItems', item.id);
    for (const id of moveIds) tx.delete('inventoryMovements', id);
  });
  await loadInventory();
}

test('changeStock keeps stock and movement unchanged when its transaction fails', async () => {
  await openDB();
  await loadInventory();
  const item = await addItem('QA atomowy stan mąki', 500);
  const originalTx = db.tx;

  try {
    db.tx = async () => { throw new Error('simulated transaction failure'); };
    await assert.rejects(changeStock(item, 100, { type: 'purchase', reason: 'QA' }), /simulated transaction failure/);
    assert.equal(getItem(item.id).stock, 500);
    assert.equal((await db.get('inventoryItems', item.id)).stock, 500);
    assert.equal(movements(item.id).length, 0);
  } finally {
    db.tx = originalTx;
  }

  try {
    const move = await changeStock(item, 100, { type: 'purchase', reason: 'QA' });
    assert.equal(getItem(item.id).stock, 600);
    assert.equal((await db.get('inventoryItems', item.id)).stock, 600);
    assert.equal((await db.get('inventoryMovements', move.id)).amount, 100);

    await undoMovements([move.id, move.id]);
    assert.equal(getItem(item.id).stock, 500, 'duplicate movement IDs must be undone once');
    assert.equal(await db.get('inventoryMovements', move.id), undefined);
  } finally {
    await cleanup([item]);
  }
});

test('recipe deduction and undo are all-or-nothing across multiple stock items', async () => {
  await openDB();
  await loadInventory();
  const flour = await addItem('QA atomowa mąka pszenna', 500);
  const butter = await addItem('QA atomowe masło', 250);
  const recipe = {
    id: 'qa_recipe_atomic_inventory',
    name: 'QA receptura atomowa',
    sections: [{
      name: 'Składniki',
      ingredients: [
        { name: flour.name, amount: 100, unit: 'g' },
        { name: butter.name, amount: 50, unit: 'g' },
        { name: flour.name, amount: 450, unit: 'g' },
      ],
    }],
  };
  const originalTx = db.tx;
  let result;

  try {
    db.tx = async () => { throw new Error('simulated recipe transaction failure'); };
    await assert.rejects(deductRecipe(recipe), /simulated recipe transaction failure/);
    assert.equal(getItem(flour.id).stock, 500);
    assert.equal(getItem(butter.id).stock, 250);
    assert.equal(movements(flour.id).length + movements(butter.id).length, 0);
  } finally {
    db.tx = originalTx;
  }

  try {
    result = await deductRecipe(recipe);
    assert.equal(result.moves.length, 3);
    assert.ok(result.short.includes(flour.name), 'repeated flour ingredients must not spend more than available stock');
    assert.equal(getItem(flour.id).stock, 0);
    assert.equal(getItem(butter.id).stock, 200);

    db.tx = async () => { throw new Error('simulated undo transaction failure'); };
    await assert.rejects(undoMovements(result.moves), /simulated undo transaction failure/);
    assert.equal(getItem(flour.id).stock, 0, 'failed undo must leave the completed deduction unchanged');
    assert.equal(getItem(butter.id).stock, 200);
    assert.equal(movements(flour.id).length + movements(butter.id).length, 3);
  } finally {
    db.tx = originalTx;
  }

  try {
    await undoMovements(result.moves);
    assert.equal(getItem(flour.id).stock, 500);
    assert.equal(getItem(butter.id).stock, 250);
    assert.equal(movements(flour.id).length + movements(butter.id).length, 0);
  } finally {
    await cleanup([flour, butter]);
  }
});


test('failed inventory reload preserves the last valid in-memory snapshot', async () => {
  await openDB();
  await loadInventory();
  const item = await addItem('QA snapshot magazynu zachowany', 321);
  const originalGetAll = db.getAll;

  try {
    db.getAll = async (storeName) => {
      if (storeName === 'inventoryMovements') throw new Error('simulated inventory read failure');
      return originalGetAll(storeName);
    };
    await assert.rejects(loadInventory(), /simulated inventory read failure/);
    assert.equal(inventoryLoaded(), true);
    assert.equal(getItem(item.id).stock, 321);
    assert.equal((await originalGetAll('inventoryItems')).find((x) => x.id === item.id).stock, 321);
  } finally {
    db.getAll = originalGetAll;
    await cleanup([item]);
  }
});


test('saveItem does not publish unsaved state when the storage transaction fails', async () => {
  await openDB();
  await loadInventory();

  const item = newItem({ name: 'QA saveItem atomic failure 20261025', unit: 'g', stock: 123 });
  const originalTx = db.tx;

  try {
    db.tx = async () => { throw new Error('simulated saveItem transaction failure'); };
    await assert.rejects(
      saveItem(item, { log: { type: 'adjust', amount: 23, reason: 'QA atomic save' } }),
      /simulated saveItem transaction failure/,
    );
    assert.equal(getItem(item.id), undefined);
    assert.equal(inventoryItems().some((entry) => entry.id === item.id), false);
    assert.equal(await db.get('inventoryItems', item.id), undefined);
    assert.equal(movements(item.id).length, 0);
  } finally {
    db.tx = originalTx;
  }

  const saved = await saveItem(item, { log: { type: 'adjust', amount: 23, reason: 'QA atomic save' } });
  assert.equal(getItem(saved.id).stock, 123);
  assert.equal((await db.get('inventoryItems', saved.id)).stock, 123);
  const movement = movements(saved.id).find((entry) => entry.reason === 'QA atomic save');
  assert.ok(movement, 'the audit movement must appear after the successful transaction');
  assert.equal((await db.get('inventoryMovements', movement.id)).amount, 23);

  await cleanup([saved]);
});


test('deleteItem keeps the in-memory item visible when IndexedDB deletion fails', async () => {
  await openDB();
  await loadInventory();

  const item = await addItem('QA deleteItem failure 20261025', 456);
  const originalDelete = db.delete;

  try {
    db.delete = async (storeName, key) => {
      if (storeName === 'inventoryItems' && key === item.id) {
        throw new Error('simulated inventory delete failure');
      }
      return originalDelete(storeName, key);
    };

    await assert.rejects(deleteItem(item.id), /simulated inventory delete failure/);
    assert.equal(getItem(item.id).stock, 456);
    assert.equal(inventoryItems().some((entry) => entry.id === item.id), true);
    assert.equal((await db.get('inventoryItems', item.id)).stock, 456);
  } finally {
    db.delete = originalDelete;
    await cleanup([item]);
  }
});
