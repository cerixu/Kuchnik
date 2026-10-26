import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { recipeSvgKey, attachRecipePhoto, hasFoodPhoto } from '../food-photos.js';

const fixtures = [
  { name: 'Spaghetti Carbonara', key: 'carbonara', tokens: [/guanciale/i, /pecorino/i, /pieprz/i] },
  { name: 'Pizza Margherita', key: 'margherita', tokens: [/mozzarell/i, /bazyli/i, /pomidor/i] },
  { name: 'Zupa pomidorowa', key: 'tomato-soup', tokens: [/krem pomidorowy/i, /śmietanki/i, /bazyli/i] },
  { name: 'Burger klasyczny', key: 'burger', tokens: [/burger klasyczny/i, /sezamow/i, /kotlet/i] },
  { name: 'Sałatka grecka', key: 'greek-salad', tokens: [/sałatka grecka/i, /oliwk/i, /fet/i] },
  { name: 'Mojito', key: 'mojito', tokens: [/mojito/i, /limonk/i, /mięt/i, /słomk/i] },
  { name: 'Lasagne alla bolognese', key: 'lasagna', tokens: [/lasagne/i, /ragù/i, /beszamelem/i] },
  { name: 'Gnocchi al pomodoro', key: 'gnocchi', tokens: [/gnocchi/i, /pomodoro/i, /bazyli/i] },
  { name: 'Bruschetta al pomodoro', key: 'bruschetta', tokens: [/bruschetta/i, /pomidor/i, /bazyli/i] },
  { name: 'Panna cotta waniliowa', key: 'panna-cotta', tokens: [/panna cotta/i, /malin/i, /waniliow/i] },
  { name: 'Ramen tonkotsu', key: 'ramen-tonkotsu', tokens: [/Ramen tonkotsu/i, /chashu/i, /ajitama/i] },
  { name: 'Sushi maki z łososiem i ogórkiem', key: 'sushi-maki', tokens: [/Sushi maki/i, /łosos/i, /nori/i] },
  { name: 'Sałatka Caesar z grillowanym kurczakiem', key: 'caesar-salad', tokens: [/Sałatka Caesar/i, /kurczakiem/i, /parmezanem/i] },
  { name: 'Tagliatelle al ragù', key: 'tagliatelle-ragu', tokens: [/tagliatelle/i, /ragù/i, /parmezan/i, /bazyli/i] },
];

test('dedicated SVG matching is specific and stable', () => {
  for (const fixture of fixtures) {
    assert.equal(recipeSvgKey({ name: fixture.name }), fixture.key, fixture.name);
    assert.equal(hasFoodPhoto({ name: fixture.name }), true, fixture.name + ' should have artwork');
  }
  assert.equal(recipeSvgKey({ name: 'Sałatka z kurczakiem' }), null);
});

test('dedicated SVGs are accessible, local and safe with image-specific size budgets', () => {
  for (const fixture of fixtures) {
    const path = new URL('../assets/food-svg/' + fixture.key + '.svg', import.meta.url);
    const source = fs.readFileSync(path, 'utf8');
    assert.ok(source.trim().startsWith('<svg '), fixture.key + ': missing SVG root');
    assert.ok(source.trim().endsWith('</svg>'), fixture.key + ': unclosed SVG');
    assert.match(source, /xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    assert.match(source, /viewBox="0 0 [0-9.]+ [0-9.]+"/);
    assert.match(source, /role="img"/);
    assert.match(source, /aria-labelledby="title desc"/);
    assert.match(source, /<title id="title">[\s\S]*?<\/title>/);
    assert.match(source, /<desc id="desc">[\s\S]*?<\/desc>/);
    const highDetailKeys = ['ramen-tonkotsu', 'sushi-maki', 'caesar-salad', 'panna-cotta'];
    const maxBytes = ['carbonara', 'bruschetta'].includes(fixture.key) ? 1800000 : highDetailKeys.includes(fixture.key) ? 320000 : 12000;
    assert.ok(Buffer.byteLength(source, 'utf8') < maxBytes, fixture.key + ': SVG exceeds ' + maxBytes + ' bytes');
    assert.ok(!/<script\b|(?:href|xlink:href)="https?:\/\//i.test(source), fixture.key + ': external/script content');
    for (const token of fixture.tokens) assert.match(source, token, fixture.key + ': missing dish-specific detail');
    const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, fixture.key + ': duplicate SVG IDs');
    const refs = [...source.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
    for (const ref of refs) assert.ok(ids.includes(ref), fixture.key + ': missing SVG id #' + ref);
  }
});

test('custom user photo is never replaced by a library illustration', () => {
  const img = fakeImage();
  img.src = 'user-photo.jpg';
  attachRecipePhoto(img, { name: 'Mojito', photo: 'user-photo.jpg' });
  assert.equal(img.src, 'user-photo.jpg');
  assert.equal(img.dataset.photoSource, undefined);
});

test('missing photo falls back to a local SVG illustration', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('simulated offline'); };
  try {
    const img = fakeImage();
    attachRecipePhoto(img, { name: 'Spaghetti Carbonara' });
    await new Promise((resolve) => setTimeout(resolve, 30));
    assert.match(img.src, /assets\/food-svg\/carbonara\.svg$/);
    assert.equal(img.dataset.photoSource, 'svg:carbonara');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

function fakeImage() {
  const removed = [];
  return {
    dataset: {},
    isConnected: true,
    src: 'data:image/svg+xml,placeholder',
    classList: { remove: (name) => removed.push(name) },
    removed,
  };
}
