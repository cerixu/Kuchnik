import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { recipeSvgKey, attachRecipePhoto, hasFoodPhoto } from '../food-photos.js';

const fixtures = [
  { name: 'Spaghetti Carbonara', key: 'carbonara', tokens: [/guanciale/i, /pecorino/i, /bazyli/i] },
  { name: 'Pizza Margherita', key: 'margherita', tokens: [/mozzarell/i, /bazyli/i, /pomidor/i] },
  { name: 'Zupa pomidorowa', key: 'tomato-soup', tokens: [/krem pomidorowy/i, /śmietanki/i, /bazyli/i] },
  { name: 'Burger klasyczny', key: 'burger', tokens: [/burger klasyczny/i, /sezamow/i, /kotlet/i] },
  { name: 'Sałatka grecka', key: 'greek-salad', tokens: [/sałatka grecka/i, /oliwk/i, /fet/i] },
  { name: 'Mojito', key: 'mojito', tokens: [/mojito/i, /limonk/i, /mięt/i, /słomk/i] },
];

test('dedicated SVG matching is specific and stable', () => {
  for (const fixture of fixtures) {
    assert.equal(recipeSvgKey({ name: fixture.name }), fixture.key, fixture.name);
    assert.equal(hasFoodPhoto({ name: fixture.name }), true, fixture.name + ' should have artwork');
  }
  assert.equal(recipeSvgKey({ name: 'Sałatka z kurczakiem' }), null);
});

test('dedicated SVGs are lightweight, accessible, local and safe', () => {
  for (const fixture of fixtures) {
    const path = new URL('../assets/food-svg/' + fixture.key + '.svg', import.meta.url);
    const source = fs.readFileSync(path, 'utf8');
    assert.ok(source.trim().startsWith('<svg '), fixture.key + ': missing SVG root');
    assert.ok(source.trim().endsWith('</svg>'), fixture.key + ': unclosed SVG');
    assert.match(source, /xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    assert.match(source, /viewBox="0 0 240 240"/);
    assert.match(source, /role="img"/);
    assert.match(source, /aria-labelledby="title desc"/);
    assert.match(source, /<title id="title">[\s\S]*?<\/title>/);
    assert.match(source, /<desc id="desc">[\s\S]*?<\/desc>/);
    assert.ok(source.length < 12000, fixture.key + ': SVG exceeds 12 KB');
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
