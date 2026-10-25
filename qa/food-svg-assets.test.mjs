import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const files = [
  'assets/food-svg/ramen-tonkotsu.svg',
  'assets/food-svg/sushi-maki.svg',
  'assets/food-svg/croissant.svg',
];
const sw = fs.readFileSync('sw.js', 'utf8');
const photos = fs.readFileSync('food-photos.js', 'utf8');
const util = fs.readFileSync('util.js', 'utf8');
const changelog = fs.readFileSync('changelog.js', 'utf8');
const readme = fs.readFileSync('README.md', 'utf8');

test('new food SVGs are self-contained, labeled and lightweight', () => {
  for (const file of files) {
    assert.ok(fs.existsSync(file), 'missing SVG: ' + file);
    const svg = fs.readFileSync(file, 'utf8');
    assert.match(svg, /<svg\b[^>]*viewBox="0 0 240 240"/, file + ' needs a scalable viewBox');
    assert.match(svg, /<title\b/, file + ' needs an accessible title');
    assert.match(svg, /<desc\b/, file + ' needs an accessible description');
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b/i, file + ' must not contain executable or embedded HTML');
    assert.doesNotMatch(svg, /(?:href|xlink:href)="https?:/i, file + ' must not depend on external assets');
    assert.ok(Buffer.byteLength(svg, 'utf8') < 12000, file + ' should remain lightweight');
  }
});

test('new SVGs are mapped to recipes and precached offline', () => {
  for (const file of files) {
    const name = file.split('/').pop();
    assert.ok(photos.includes("'" + name + "'") || photos.includes(name + "'"), 'SVG must be mapped in food-photos.js: ' + name);
    assert.ok(sw.includes("'" + file + "'"), 'SVG must be included in service worker CORE: ' + file);
  }
  assert.match(photos, /\['ramen-tonkotsu', \/\\b\(ramen tonkotsu\|tonkotsu ramen/);
  assert.match(photos, /\['sushi-maki', \/\\b\(sushi maki\|maki sushi/);
  assert.match(photos, /\['croissant', \/\\b\(croissant\|rogalik maslany/);
});

test('app and service worker versions are synchronized', () => {
  assert.match(util, /APP_VERSION = '1\.4\.40'/);
  assert.match(sw, /VERSION = 'kucharzyna-1\.4\.40'/);
  assert.ok(changelog.includes("'1.4.40'"), 'changelog entry missing');
  assert.ok(readme.includes('1.4.40'), 'README version missing');
});
