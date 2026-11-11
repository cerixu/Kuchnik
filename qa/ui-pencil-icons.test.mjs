import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const ui = read('../ui.js');
const css = read('../styles.css');
const sw = read('../sw.js');
const hatch = read('../assets/ui-pencil-hatch.svg');

test('UI icons keep the legacy names and render the pencil treatment', () => {
  const block = ui.match(/const ICONS = \{([\\s\\S]*?)\\n\};/);
  assert.ok(block, 'central ICONS map exists');
  const names = [...block[1].matchAll(/^\\s{2}([a-zA-Z0-9_-]+):/gm)].map((m) => m[1]);
  assert.ok(names.length >= 60, 'legacy icon set is retained');
  for (const name of ['left', 'right', 'check', 'x', 'plus', 'minus', 'search', 'chef', 'timer']) {
    assert.ok(names.includes(name), 'missing legacy icon: ' + name);
  }
  assert.match(ui, /const PENCIL_ICONS = \{/);
  assert.match(ui, /ico-pencil-shadow/);
  assert.match(ui, /ico-pencil-main/);
  assert.match(css, /\.ico-pencil-shadow[\\s\\S]*stroke-dasharray/);
});

test('button texture is local and precached for offline use', () => {
  assert.match(hatch, /<svg[\\s\\S]*viewBox="0 0 160 160"/);
  assert.match(hatch, /stroke-opacity=/);
  assert.match(css, /assets\\/ui-pencil-hatch\\.svg/);
  assert.match(sw, /assets\\/ui-pencil-hatch\\.svg/);
});
