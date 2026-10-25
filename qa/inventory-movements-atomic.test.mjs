import test from 'node:test';
import assert from 'node:assert/strict';

import { db, openDB } from '../db.js';
import {
  changeStock, deductRecipe, getItem, inventoryItems, loadInventory,
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
    assert.equal(result.moves.length, 2);
    assert.equal(getItem(flour.id).stock, 400);
    assert.equal(getItem(butter.id).stock, 200);

    db.tx = async () => { throw new Error('simulated undo transaction failure'); };
    await assert.rejects(undoMovements(result.moves), /simulated undo transaction failure/);
    assert.equal(getItem(flour.id).stock, 400);
    assert.equal(getItem(butter.id).stock, 200);
    assert.equal(movements(flour.id).length + movements(butter.id).length, 2);
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
