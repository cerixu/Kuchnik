import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { recipeSvgKey, attachRecipePhoto, hasFoodPhoto } from '../food-photos.js';

const fixtures = [
  { name: "Spaghetti all'amatriciana", key: 'spaghetti-amatriciana', tokens: [/amatriciana/i, /guanciale/i, /pecorino/i] },
  { name: 'Panzanella', key: 'panzanella', tokens: [/panzanella/i, /pomidor/i, /bazyli/i] },
  { name: 'Saltimbocca alla romana', key: 'saltimbocca-romana', tokens: [/saltimbocca/i, /prosciutto/i, /szałwią/i] },
  { name: 'Spanakopita', key: 'spanakopita', tokens: [/spanakopita/i, /szpinaku/i, /feta/i] },
  { name: 'Pad thai z krewetkami', key: 'pad-thai', tokens: [/pad thai/i, /prawns/i, /peanuts/i] },
  { name: 'Spaghetti aglio e olio', key: 'spaghetti-aglio-olio', tokens: [/spaghetti aglio e olio/i, /garlic/i, /olive oil/i] },
  { name: 'Biryani z kurczakiem', key: 'biryani', tokens: [/biryani/i, /chicken/i, /basmati/i] },
  { name: 'Falafel', key: 'falafel', tokens: [/falafel/i, /chickpea/i, /tahini/i] },
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
  { name: 'Boeuf bourguignon', key: 'boeuf-bourguignon', tokens: [/Boeuf bourguignon/i, /wołowin/i, /pieczarkami/i] },
  { name: 'Paella z owocami morza', key: 'paella-marisco', tokens: [/Paella de marisco/i, /krewetkami/i, /małżami/i] },
  { name: 'Parmigiana di melanzane', key: 'parmigiana-di-melanzane', tokens: [/Parmigiana di melanzane/i, /bakłażana/i, /mozzarelli/i] },
  { name: 'Zupa cebulowa', key: 'french-onion-soup', tokens: [/Francuska zupa cebulowa/i, /karmelizowan/i, /Gruyère/i] },
  { name: 'Coq au vin', key: 'coq-au-vin', tokens: [/Coq au vin/i, /kurczakiem/i, /pieczarkami/i] },
  { name: 'Tom yum goong', key: 'tom-yum', tokens: [/Tom yum goong/i, /krewetkami/i, /kolendrą/i] },
  { name: 'Ratatouille niçoise', key: 'ratatouille', tokens: [/Ratatouille/i, /bakłażana/i, /cukinii/i] },
  { name: 'Crème brûlée', key: 'creme-brulee', tokens: [/crème brûlée/i, /krem waniliowy/i, /skarmelizowan/i] },
  { name: 'Tagliatelle al ragù', key: 'tagliatelle-ragu', tokens: [/tagliatelle/i, /ragù/i, /parmezan/i, /bazyli/i] },
  { name: 'Cacio e pepe', key: 'cacio-e-pepe', tokens: [/cacio e pepe/i, /pecorino/i, /pieprz/i] },
  { name: 'Fish and chips', key: 'fish-and-chips', tokens: [/fish and chips/i, /dorsz/i, /chips/i] },
  { name: 'Gulasz węgierski', key: 'gulasz-wegierski', tokens: [/gulasz węgierski/i, /wołowin/i, /papryk/i] },
  { name: 'Gambas al ajillo', key: 'gambas-al-ajillo', tokens: [/gambas al ajillo/i, /krewet/i, /czosnk/i] },
  { name: 'Gnocchi z masłem szałwiowym', key: 'gnocchi-burro-salvia', tokens: [/gnocchi/i, /masłem/i, /szałwi/i] },
  { name: 'Tarte tatin', key: 'tarte-tatin', tokens: [/Tarte Tatin/i, /jabłk/i, /karmelizowan/i] },
  { name: 'Mussaka', key: 'moussaka', tokens: [/Mussaka/i, /bakłażan/i, /beszamel/i] },
  { name: 'Ramen shoyu', key: 'ramen-shoyu', tokens: [/Ramen shoyu/i, /chashu/i, /ajitama/i] },
];

test('dedicated SVG matching is specific and stable', () => {
  for (const fixture of fixtures) {
    assert.equal(recipeSvgKey({ name: fixture.name }), fixture.key, fixture.name);
    assert.equal(hasFoodPhoto({ name: fixture.name }), true, fixture.name + ' should have artwork');
  }
  assert.equal(recipeSvgKey({ name: 'Sałatka z kurczakiem' }), null);
  assert.equal(recipeSvgKey({ name: 'Gnocchi z pesto' }), null, 'generic gnocchi must not inherit a mismatched illustration');
  assert.equal(recipeSvgKey({ name: 'Spaghetti al pomodoro' }), null, 'amatriciana must not match generic tomato pasta');
  assert.equal(recipeSvgKey({ name: 'Sałatka z pomidorami' }), null, 'panzanella must not match generic salad');
  assert.equal(recipeSvgKey({ name: 'Pita ze szpinakiem' }), null, 'spanakopita must not match generic spinach pita');
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
    const highDetailKeys = ['ramen-tonkotsu', 'sushi-maki', 'caesar-salad', 'panna-cotta', 'boeuf-bourguignon', 'paella-marisco', 'parmigiana-di-melanzane', 'french-onion-soup', 'coq-au-vin', 'tom-yum', 'ratatouille', 'creme-brulee', 'cacio-e-pepe', 'fish-and-chips', 'gulasz-wegierski', 'gambas-al-ajillo', 'pad-thai', 'spaghetti-aglio-olio', 'biryani', 'falafel', 'gnocchi-burro-salvia', 'tarte-tatin', 'moussaka', 'ramen-shoyu', 'spaghetti-amatriciana', 'panzanella', 'saltimbocca-romana', 'spanakopita'];
    const largeDetailKeys = ['boeuf-bourguignon', 'paella-marisco', 'parmigiana-di-melanzane', 'french-onion-soup'];
    const maxBytes = ['carbonara', 'bruschetta'].includes(fixture.key) ? 1800000 : largeDetailKeys.includes(fixture.key) ? 1200000 : highDetailKeys.includes(fixture.key) ? 320000 : 12000;
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
