import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const ui = read('../ui.js');
const css = read('../styles.css');
const sw = read('../sw.js');
const hatch = read('../assets/ui-pencil-hatch.svg');

test('UI icons keep the legacy names and render the pencil treatment', () => {
  const block = ui.match(/const ICONS = \{([\s\S]*?)\n\};/);
  assert.ok(block, 'central ICONS map exists');
  const names = [...block[1].matchAll(/^\s{2}([a-zA-Z0-9_-]+):/gm)].map((m) => m[1]);
  assert.ok(names.length >= 60, 'legacy icon set is retained');
  for (const name of ['left', 'right', 'check', 'x', 'plus', 'minus', 'search', 'chef', 'timer']) {
    assert.ok(names.includes(name), 'missing legacy icon: ' + name);
  }
  assert.match(ui, /const PENCIL_ICONS = \{/);
  assert.match(ui, /ico-pencil-shadow/);
  assert.match(ui, /ico-pencil-main/);
  assert.match(ui, /createElementNS\('http:\/\/www\.w3\.org\/2000\/svg', 'g'\)/);
  assert.match(css, /\.ico-pencil-shadow[\s\S]*stroke-dasharray/);
});

test('button texture is local and precached for offline use', () => {
  assert.match(hatch, /<svg[\s\S]*viewBox="0 0 160 160"/);
  assert.match(hatch, /stroke-opacity=/);
  assert.match(css, /assets\/ui-pencil-hatch\.svg/);
  assert.match(sw, /assets\/ui-pencil-hatch\.svg/);
});


test('all 64 UI symbols use a dedicated pencil drawing', () => {
  const source = ui.match(/const ICONS = \{([\s\S]*?)\n\};/);
  const pencil = ui.match(/const PENCIL_ICONS = \{([\s\S]*?)\n\};/);
  assert.ok(source && pencil, 'both icon maps must exist');
  const names = [...source[1].matchAll(/^\s{2}([a-zA-Z0-9_-]+):/gm)].map((m) => m[1]);
  const pencilNames = [...pencil[1].matchAll(/^\s{2}([a-zA-Z0-9_-]+):/gm)].map((m) => m[1]);
  assert.equal(new Set(names).size, 64, 'icon API should contain 64 unique symbols');
  assert.deepEqual(names.filter((name) => !pencilNames.includes(name)), [],
    'no standard icon fallback should remain');
});


test('active bottom navigation uses only local pencil texture', () => {
  assert.match(css, /#tabbar \.tab\.on \.tab-ico::before/);
  assert.match(css, /#tabbar \.tab\.on \.tab-ico::after/);
  assert.match(css, /assets\/ui-pencil-hatch\.svg/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});


test('real buttons use the muted graphite, copper and danger surfaces', () => {
  assert.match(css, /\.btn\.primary\s*\{[\s\S]*#85543d[\s\S]*#57382f/);
  assert.match(css, /\.btn\.danger\s*\{[\s\S]*#78413d[\s\S]*#4e2929/);
  assert.match(css, /\.btn\.ghost\s*\{[\s\S]*background: transparent/);
  assert.match(css, /\.iconbtn\.glassy\s*\{[\s\S]*rgba\(53,48,48/);
  assert.match(css, /:focus-visible/);
});
