import test from 'node:test';
import assert from 'node:assert/strict';
import { fmtKitchenAmount, fmtUnit } from '../util.js';

test('Polish kitchen unit grammar handles singular, few and many forms', () => {
  const cases = [
    [1, 'łyżka', 'łyżka'],
    [0.5, 'łyżka', 'łyżki'],
    [0.333, 'łyżka', 'łyżki'],
    [1.5, 'łyżka', 'łyżki'],
    [2, 'łyżka', 'łyżki'],
    [4, 'łyżka', 'łyżki'],
    [5, 'łyżka', 'łyżek'],
    [12, 'łyżka', 'łyżek'],
    [21, 'łyżka', 'łyżek'],
    [22, 'łyżka', 'łyżki'],
    [3, 'łyżeczka', 'łyżeczki'],
    [5, 'łyżeczka', 'łyżeczek'],
    [2, 'szczypta', 'szczypty'],
    [5, 'szczypta', 'szczypt'],
    [1, 'porcja', 'porcja'],
    [4, 'porcja', 'porcje'],
    [5, 'porcja', 'porcji'],
    [250, 'g', 'g'],
    [2, 'szt.', 'szt.'],
  ];
  for (const [amount, unit, expected] of cases) {
    assert.equal(fmtUnit(amount, unit), expected, `${amount} ${unit}`);
  }
});

test('fraction glyphs are used only for countable/kitchen units', () => {
  const cases = [
    [1 / 3, 'szt.', '⅓'],
    [2 / 3, 'szt.', '⅔'],
    [0.5, 'łyżka', '½'],
    [1 + 1 / 3, 'szt.', '1⅓'],
    [0.333, 'g', '0,333'],
    [0.25, 'ml', '0,25'],
    [-0.5, 'szt.', '-½'],
  ];
  for (const [amount, unit, expected] of cases) {
    assert.equal(fmtKitchenAmount(amount, unit), expected, `${amount} ${unit}`);
  }
});

test('unknown units remain unchanged and missing quantities keep the caller fallback', () => {
  assert.equal(fmtUnit(2, 'opakowania własne'), 'opakowania własne');
  assert.equal(fmtKitchenAmount(0.5, 'g'), '0,5');
  assert.equal(fmtUnit(null, 'łyżka'), 'łyżka');
  assert.equal(fmtKitchenAmount(null, 'szt.'), '');
});
