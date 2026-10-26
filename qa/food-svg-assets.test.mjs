import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const files = [
  'assets/food-svg/ramen-tonkotsu.svg',
  'assets/food-svg/sushi-maki.svg',
  'assets/food-svg/croissant.svg',
  'assets/food-svg/pizza-diavola.svg',
  'assets/food-svg/risotto-milanese.svg',
  'assets/food-svg/pierogi.svg',
  'assets/food-svg/steak.svg',
  'assets/food-svg/salmon.svg',
  'assets/food-svg/focaccia.svg',
  'assets/food-svg/tiramisu.svg',
  'assets/food-svg/caesar-salad.svg',
  'assets/food-svg/pho-bo.svg',
  'assets/food-svg/bibimbap.svg',
  'assets/food-svg/chicken-curry.svg',
  'assets/food-svg/dumplings.svg',
  'assets/food-svg/tacos.svg',
  'assets/food-svg/pancakes.svg',
  'assets/food-svg/cheesecake.svg',
  'assets/food-svg/shakshuka.svg',
  'assets/food-svg/grilled-chicken.svg',
  'assets/food-svg/tuna-sashimi.svg',
  'assets/food-svg/fries.svg',
  'assets/food-svg/apple-pie.svg',
];

const highDetailFiles = [
  'assets/food-svg/ramen-tonkotsu.svg',
  'assets/food-svg/sushi-maki.svg',
  'assets/food-svg/caesar-salad.svg',
  'assets/food-svg/panna-cotta.svg',
];

const sw = fs.readFileSync('sw.js', 'utf8');
const photos = fs.readFileSync('food-photos.js', 'utf8');
const util = fs.readFileSync('util.js', 'utf8');
const changelog = fs.readFileSync('changelog.js', 'utf8');
const readme = fs.readFileSync('README.md', 'utf8');

test('food SVGs are scalable, accessible, self-contained and size-bounded', () => {
  for (const file of files) {
    assert.ok(fs.existsSync(file), 'missing SVG: ' + file);
    const svg = fs.readFileSync(file, 'utf8');
    const viewBoxText = svg.match(/\bviewBox=["']([^"']+)["']/i)?.[1];
    const viewBox = viewBoxText?.trim().split(/[ ,]+/).map(Number);
    assert.ok(viewBox && viewBox.length === 4, file + ' needs a valid viewBox');
    assert.ok(viewBox[2] > 0 && viewBox[3] > 0, file + ' needs positive viewBox dimensions');
    assert.ok(Math.abs(viewBox[2] - viewBox[3]) < 0.01, file + ' should use a square viewBox');
    assert.match(svg, /<title\b[^>]*>\s*[^<]+<\/title>/i, file + ' needs a non-empty accessible title');
    assert.match(svg, /<desc\b[^>]*>\s*[^<]+<\/desc>/i, file + ' needs a non-empty accessible description');
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b/i, file + ' must not contain executable or embedded HTML');
    assert.doesNotMatch(svg, /<image\b/i, file + ' must not embed raster artwork');
    assert.doesNotMatch(svg, /(?:href|xlink:href)\s*=\s*["'](?:https?:|\/\/|data:image)/i, file + ' must not depend on external or embedded raster assets');
    assert.doesNotMatch(svg, /url\(\s*["']?(?:https?:|\/\/|data:image)/i, file + ' must not reference external paint assets');
    assert.ok(Buffer.byteLength(svg, 'utf8') < 320000, file + ' must stay within the mobile asset budget');
  }
});

test('new art pack retains detailed vector paths rather than simplified pictograms', () => {
  for (const file of highDetailFiles) {
    const svg = fs.readFileSync(file, 'utf8');
    const pathCount = (svg.match(/<path\b/g) || []).length;
    assert.ok(pathCount >= 200, file + ' needs detailed vector paths; found ' + pathCount);
  }
});

test('food SVGs are mapped to recipes and precached offline', () => {
  for (const file of files) {
    const name = file.split('/').pop();
    assert.ok(photos.includes("'" + name + "'") || photos.includes(name + "'"), 'SVG must be mapped in food-photos.js: ' + name);
    assert.ok(sw.includes("'" + file + "'"), 'SVG must be included in service worker CORE: ' + file);
  }
  for (const key of ['ramen-tonkotsu', 'sushi-maki', 'caesar-salad', 'panna-cotta']) {
    assert.ok(photos.includes("'" + key + "'"), 'missing recipe mapping key: ' + key);
  }
  const recipeMarkers = [
    ['ramen-tonkotsu', ['ramen tonkotsu', 'tonkotsu ramen']],
    ['sushi-maki', ['sushi maki', 'maki sushi']],
    ['caesar-salad', ['salatka caesar', 'caesar salad']],
    ['panna-cotta', ['panna cotta']],
    ['croissant', ['croissant', 'rogalik maslany']],
  ];
  for (const [key, markers] of recipeMarkers) {
    assert.ok(photos.includes("['" + key + "'"), 'missing recipe matcher: ' + key);
    for (const marker of markers) assert.ok(photos.includes(marker), key + ' should match ' + marker);
  }
});

test('app and service worker versions are synchronized', () => {
  assert.match(util, /APP_VERSION = '1\.4\.44'/);
  assert.match(sw, /VERSION = 'kucharzyna-1\.4\.44'/);
  assert.ok(changelog.includes("'1.4.44'"), 'changelog entry missing');
  assert.ok(readme.includes('1.4.44'), 'README version missing');
});
