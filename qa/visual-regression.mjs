import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
fs.mkdirSync('qa-shots', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const errors = [];
const badRequests = [];
page.on('pageerror', (e) => errors.push(String(e.stack || e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('requestfailed', (req) => badRequests.push(req.url() + ' :: ' + String(req.failure()?.errorText || 'request failed')));
page.on('response', (res) => { if (res.status() >= 400) badRequests.push(res.status() + ' ' + res.url()); });

function assert(ok, message) { if (!ok) throw new Error(message); }
async function ready() {
  await page.waitForSelector('#view', { state: 'attached', timeout: 10000 });
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 30000 });
}
async function dismissWhatsNew() {
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await start.count() && await start.isVisible().catch(() => false)) {
    await start.click();
    await page.waitForTimeout(120);
  }
}
async function noOverflow(label) {
  const metrics = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  assert(metrics.document <= metrics.viewport && metrics.body <= metrics.viewport,
    label + ': poziomy overflow ' + JSON.stringify(metrics));
}
async function screenshot(name) { await page.screenshot({ path: 'qa-shots/' + name, fullPage: true }); }

try {
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await ready();
  await page.waitForTimeout(900);

  // Versioned release notes must match the version currently shipped by the app.
  const releaseSheet = page.locator('#overlays .overlay').first();
  await releaseSheet.waitFor({ state: 'visible', timeout: 5000 });
  const releaseCopy = await releaseSheet.innerText();
  const utilSource = fs.readFileSync(new URL('../util.js', import.meta.url), 'utf8');
  const versionMatch = utilSource.match(/export const APP_VERSION = '([^']+)'/);
  assert(versionMatch, 'Nie udało się odczytać APP_VERSION.');
  const version = versionMatch[1];
  const changelogSource = fs.readFileSync(new URL('../changelog.js', import.meta.url), 'utf8');
  const marker = "'" + version + "': Object.freeze({";
  const start = changelogSource.indexOf(marker);
  assert(start >= 0, 'Brak wpisu changelog.js dla ' + version);
  const next = changelogSource.indexOf("\n  '", start + marker.length);
  const end = next >= 0 ? next : changelogSource.indexOf('\n});', start);
  const release = changelogSource.slice(start, end >= 0 ? end : changelogSource.length);
  const releaseText = [...release.matchAll(/'([^']*)'/g)].map((m) => m[1]).filter((v) => v !== version);
  assert(releaseText.length >= 3, 'Wpis changeloga jest pusty lub niepełny.');
  assert(releaseCopy.includes('Co nowego w ' + version), 'Okno nowości nie pokazuje aktualnej wersji.');
  for (const item of releaseText) assert(releaseCopy.includes(item), 'Brak tekstu changeloga w oknie: ' + item);
  await dismissWhatsNew();

  // Start screen, local photographs, and stylesheet layers.
  assert(await page.locator('.start-head .hero-line').count(), 'Brak nagłówka ekranu Start.');
  await page.waitForFunction(() => [...document.querySelectorAll('.rtile-img img')]
    .some((img) => img.dataset.photoSource && img.naturalWidth > 0), null, { timeout: 15000 });
  const loadedPhoto = await page.locator('.rtile-img img[data-photo-source]').first().evaluate((img) => ({
    source: img.dataset.photoSource, width: img.naturalWidth, renderedWidth: img.getBoundingClientRect().width,
  }));
  assert(loadedPhoto.width > 0 && loadedPhoto.renderedWidth > 80, 'Lokalne zdjęcie receptury nie wyświetla się poprawnie: ' + JSON.stringify(loadedPhoto));

  for (const stylesheet of ['zarlok-v2.css', 'design-overhaul.css', 'mobile-polish.css', 'art-direction.css', 'claude-completion.css']) {
    assert(await page.locator('head link[rel="stylesheet"]').evaluateAll((els, name) => els.some((el) => el.href.includes(name)), stylesheet),
      'Arkusz stylów nie jest podpięty: ' + stylesheet);
  }

  const tabs = await page.locator('#tabbar .tab').count();
  assert(tabs === 5, 'Dolna nawigacja powinna mieć 5 zakładek, ma: ' + tabs);
  const tabMetrics = await page.evaluate(() => {
    const bar = document.querySelector('#tabbar');
    const br = bar.getBoundingClientRect();
    const icons = [...bar.querySelectorAll('.tab-ico')].map((el) => el.getBoundingClientRect());
    return { viewport: innerWidth, x: br.x, right: br.right, bottomGap: innerHeight - br.bottom,
      width: br.width, height: br.height, tabs: icons.length,
      iconsInside: icons.every((r) => r.left >= br.left && r.right <= br.right && r.top >= br.top && r.bottom <= br.bottom) };
  });
  assert(tabMetrics.width > 300 && tabMetrics.x >= 0 && tabMetrics.right <= tabMetrics.viewport + 1,
    'Dolna nawigacja wychodzi poza ekran: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.height >= 50 && tabMetrics.height <= 120 && tabMetrics.bottomGap >= -1 && tabMetrics.bottomGap <= 28 && tabMetrics.iconsInside,
    'Nieprawidłowe wymiary lub rozmieszczenie dolnej nawigacji: ' + JSON.stringify(tabMetrics));
  await screenshot('01-start.png');

  for (const width of [375, 390, 932]) {
    await page.setViewportSize({ width, height: width === 932 ? 430 : 844 });
    await page.waitForTimeout(100);
    await noOverflow('Start @ ' + width + 'px');
  }
  await page.setViewportSize({ width: 390, height: 844 });

  // Recipe list, search/filter UI, and a real detail page.
  await page.goto(base + '#/recipes', { waitUntil: 'domcontentloaded' });
  await ready();
  await dismissWhatsNew();
  await page.waitForSelector('.recipes', { state: 'visible', timeout: 5000 });
  assert(await page.locator('.rgrid .rtile, .list .rcard').count() > 0, 'Lista receptur nie pokazuje kart.');
  assert(await page.locator('.searchbox .search-input').count(), 'Brak pola wyszukiwania receptur.');
  await noOverflow('Receptury @ 390px');
  await screenshot('02-recipes.png');

  const search = page.locator('.searchbox .search-input').first();
  await search.fill('pizza');
  await page.waitForTimeout(250);
  assert(await page.locator('.rgrid .rtile, .list .rcard').count() > 0, 'Wyszukiwanie „pizza” nie zwraca receptur.');
  await search.fill('');
  await page.waitForTimeout(150);

  const link = page.locator('a[href^="#/recipe/"]').first();
  assert(await link.count(), 'Brak linku do receptury z listy.');
  await link.click();
  await page.waitForSelector('.detail-hero', { state: 'visible', timeout: 5000 });
  assert(await page.locator('.detail-title').count(), 'Ekran szczegółów nie ma tytułu receptury.');
  assert(await page.locator('.orbit .orb-dot').count() > 0, 'Szczegóły receptury nie pokazują składników na łuku.');
  assert(await page.locator('.more-toggle').count() > 0, 'Brak przycisku otwierającego pełny przepis.');
  await page.waitForFunction(() => { const img = document.querySelector('.detail-hero img'); return !!(img && img.complete && img.naturalWidth > 0); }, null, { timeout: 5000 });
  const detailImage = await page.locator('.detail-hero img').first().evaluate((img) => ({
    source: img.dataset.photoSource || '', naturalWidth: img.naturalWidth,
  }));
  assert(detailImage.naturalWidth > 0, 'Obraz w nagłówku receptury nie załadował się.');
  await screenshot('03-recipe-detail.png');

  // All locally mapped JPEG payloads must be available and valid without external APIs.
  const photoNames = [
    'food-pizza.jpg.b64','food-carbonara.jpg.b64','food-risotto.jpg.b64','food-salmon.jpg.b64','food-steak.jpg.b64',
    'food-dessert.jpg.b64','food-salad.jpg.b64','food-sauce.jpg.b64','food-soup.jpg.b64','food-seafood.jpg.b64',
    'food-pierogi.jpg.b64','food-burger.jpg.b64','food-focaccia.jpg.b64','food-pasta-tomato.jpg.b64','food-lasagna.jpg.b64',
    'food-chicken-curry.jpg.b64','food-schnitzel.jpg.b64','food-soup-tomato.jpg.b64','food-soup-clear.jpg.b64','food-soup-pumpkin.jpg.b64',
    'food-sourdough.jpg.b64','food-baguette.jpg.b64','food-cake.jpg.b64','food-babka-piaskowa.jpg.b64','food-baba-ganoush.jpg.b64',
    'food-cocktail.jpg.b64','food-asian-noodles.jpg.b64','food-fried-rice.jpg.b64','food-barszcz.jpg.b64','food-bigos.jpg.b64',
    'food-bbq-ribs.jpg.b64','food-beef-stew.jpg.b64','food-brownie.jpg.b64','food-creme-brulee.jpg.b64','food-crepes.jpg.b64',
    'food-bagel.jpg.b64','food-bibimbap.jpg.b64','food-curry-chickpea.jpg.b64','food-bruschetta.jpg.b64','food-aperol.jpg.b64',
  ];
  const localPhotos = await page.evaluate(async (names) => Promise.all(names.map(async (name) => {
    const response = await fetch(new URL(name, location.href));
    const body = response.ok ? (await response.text()).trim() : '';
    return { name, ok: response.ok, valid: body.startsWith('/9j/') && body.length > 1000 };
  })), photoNames);
  assert(localPhotos.length === 40 && localPhotos.every((item) => item.ok && item.valid),
    'Jedno lub więcej lokalnych zdjęć JPEG jest niedostępne albo uszkodzone: ' + JSON.stringify(localPhotos.filter((x) => !x.ok || !x.valid)));

  const photoRouting = await page.evaluate(async () => {
    const photos = await import(new URL('food-photos.js', location.href).href);
    const key = (name, category) => photos.recipePhotoKey({ name, category });
    return {
      moscowMule: key('Moscow Mule', 'cat-cocktaile'),
      americano: key('Americano', 'cat-cocktaile'),
      mojito: key('Mojito', 'cat-cocktaile'),
      aperol: key('Aperol Spritz', 'cat-cocktaile'),
      baguette: key('Baguette', 'cat-pieczywo'),
      baguettePl: key('Bagietka francuska', 'cat-pieczywo'),
      sourdough: key('Chleb na zakwasie', 'cat-pieczywo'),
      tomatoSauce: key('Sos pomidorowy', 'cat-sosy'),
    };
  });
  assert(photoRouting.moscowMule === 'cocktail', 'Moscow Mule musi mieć własne zdjęcie.');
  assert(photoRouting.americano !== 'cocktail' && photoRouting.mojito !== 'cocktail', 'Zdjęcie Moscow Mule nie może trafiać do innych drinków.');
  assert(photoRouting.aperol === 'aperol', 'Aperol Spritz powinien mieć własne zdjęcie.');
  assert(photoRouting.baguette === 'baguette' && photoRouting.baguettePl === 'baguette', 'Bagietka musi mieć zdjęcie bagietki.');
  assert(photoRouting.sourdough === 'sourdough', 'Chleb na zakwasie powinien mieć własne zdjęcie.');
  assert(photoRouting.tomatoSauce !== 'cocktail', 'Sos pomidorowy nie może dostać zdjęcia koktajlu.');

  assert(errors.length === 0, 'Błędy JavaScript w przeglądarce: ' + errors.join(' | '));
  assert(badRequests.length === 0, 'Nieudane żądania zasobów: ' + badRequests.join(' | '));
  console.log('PASS: Kuchnik mobile visual smoke, 40 local photos, changelog, navigation, search and recipe detail.');
} finally {
  await browser.close();
}
