import test from 'node:test';
import assert from 'node:assert/strict';
import { inventoryNamesMatch } from '../inventory-matching.js';

test('matches common Polish inflections conservatively', () => {
  assert.equal(inventoryNamesMatch({ name: 'Ogórek' }, 'ogórka'), true);
  assert.equal(inventoryNamesMatch({ name: 'Czosnek' }, 'czosnku'), true);
  assert.equal(inventoryNamesMatch({ name: 'Pomidory' }, 'pomidor'), true);
});

test('ignores preparation notes and parenthetical descriptors', () => {
  assert.equal(inventoryNamesMatch({ name: 'Czosnek' }, 'świeży czosnek (posiekany)'), true);
});

test('supports explicit aliases', () => {
  assert.equal(inventoryNamesMatch({ name: 'Pecorino Romano', aliases: ['ser pecorino'] }, 'ser pecorino'), true);
});

test('does not collapse a generic ingredient into a more specific product', () => {
  assert.equal(inventoryNamesMatch({ name: 'Pomidor koktajlowy' }, 'pomidor'), false);
  assert.equal(inventoryNamesMatch({ name: 'Olej rzepakowy' }, 'olej słonecznikowy'), false);
});

test('rejects empty names', () => {
  assert.equal(inventoryNamesMatch({ name: 'Mąka' }, ''), false);
  assert.equal(inventoryNamesMatch({ name: '' }, '   '), false);
});
