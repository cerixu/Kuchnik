import test from 'node:test';
import assert from 'node:assert/strict';
import { inventoryNamesMatch } from '../inventory-matching.js';

test('matches common Polish inflections without broadening product identity', () => {
  assert.equal(inventoryNamesMatch({ name: 'Ogórek' }, 'ogórka'), true);
  assert.equal(inventoryNamesMatch({ name: 'czosnek' }, 'czosnku'), true);
});

test('does not match a generic ingredient to a more specific product', () => {
  assert.equal(inventoryNamesMatch({ name: 'pomidor' }, 'pomidor koktajlowy'), false);
  assert.equal(inventoryNamesMatch({ name: 'papryka' }, 'papryka czerwona'), false);
});

test('preserves meaningful qualifiers in parentheses', () => {
  assert.equal(inventoryNamesMatch({ name: 'papryka (czerwona)' }, 'papryka czerwona'), true);
  assert.equal(inventoryNamesMatch({ name: 'papryka (czerwona)' }, 'papryka (zielona)'), false);
});

test('ignores preparation-only adjectives and supports explicit aliases', () => {
  assert.equal(inventoryNamesMatch({ name: 'czosnek (posiekany)' }, 'czosnku'), true);
  assert.equal(inventoryNamesMatch({ name: 'oliwa', aliases: ['oliwa z oliwek'] }, 'oliwa z oliwek'), true);
});
