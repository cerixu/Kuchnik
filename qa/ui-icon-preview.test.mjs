import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const page = read('../ui-icons-preview.html');
const ui = read('../ui.js');
const sw = read('../sw.js');

test('UI icon preview includes every public icon exactly once', () => {
  const source = ui.match(/const ICONS = \{([\s\S]*?)\n\};/);
  assert.ok(source, 'public icon map exists');
  const expected = [...source[1].matchAll(/^\s{2}([a-zA-Z0-9_-]+):/gm)].map((m) => m[1]);
  const actual = [...page.matchAll(/data-icons="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/));
  assert.equal(new Set(expected).size, 64);
  assert.equal(actual.length, 64);
  assert.deepEqual([...actual].sort(), [...expected].sort());
});

test('UI icon preview uses local modules, current styles and offline navigation cache', () => {
  assert.match(page, /href="styles\.css"/);
  assert.match(page, /from '\.\/ui\.js'/);
  assert.match(sw, /ui-icons-preview\.html/);
  assert.match(sw, /endsWith\('\/ui-icons-preview\.html'\)/);
  assert.match(sw, /const VERSION = 'kucharzyna-1\.5\.19'/);
});
