import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

async function ready() {
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 15000 });
}
async function dismiss() {
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await start.count() && await start.isVisible().catch(() => false)) await start.click();
}
async function assertRoute(expected) {
  await page.waitForFunction((x) => location.hash.replace(/^#/, '').split('?')[0] === x, expected, { timeout: 5000 });
}

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await ready();
  await page.waitForTimeout(1200);
  await dismiss();

  const tabs = [
    ['recipes', '/recipes'],
    ['categories', '/categories'],
    ['cook', '/cook'],
    ['inventory', '/inventory'],
    ['more', '/more'],
    ['start', '/'],
  ];

  for (const [id, path] of tabs) {
    const tab = page.locator('.tab[data-tab="' + id + '"]').first();
    if (!(await tab.count())) throw new Error('Brak zakładki: ' + id);
    await tab.click();
    await assertRoute(path);
    if (!(await page.locator('#view .screen').count())) throw new Error('Ekran nie został wyrenderowany po wejściu na ' + id);
  }

  for (const path of ['/calc', '/shopping', '/search', '/import', '/settings']) {
    await page.goto(base + '#' + path, { waitUntil: 'domcontentloaded' });
    await ready();
    await dismiss();
    if (!(await page.locator('#view .screen').count())) throw new Error('Ekran nie został wyrenderowany: ' + path);
  }

  await page.goto(base + '#/recipes', { waitUntil: 'networkidle' });
  await ready();
  await dismiss();

  const recipe = page.locator('a[href^="#/recipe/"]').first();
  if (!(await recipe.count())) throw new Error('Brak receptury testowej');
  const href = await recipe.getAttribute('href');
  const card = recipe.locator('xpath=ancestor::*[contains(@class,"rtile")][1]');
  const heart = card.locator('.heart').first();
  if (!(await heart.count())) throw new Error('Brak serduszka na karcie receptury');

  const before = await heart.getAttribute('aria-pressed');
  await heart.click();
  await page.waitForTimeout(350);
  const after = await heart.getAttribute('aria-pressed');
  if (before === after) throw new Error('Kliknięcie serduszka nie zmieniło stanu ulubionych');

  const active = await card.locator('.heart.on').count();
  if (after === 'true' && active !== 1) throw new Error('Aktywne serduszko nie dostało klasy .on');

  // Test wejścia do receptury.
  await recipe.click();
  await assertRoute('/recipe/' + href.split('/recipe/')[1]);
  await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });

  // Test „więcej” i zamknięcia pełnej receptury.
  const more = page.locator('.orb-more').first();
  if (!(await more.count())) throw new Error('Brak przycisku „więcej”');
  await more.click();
  if (!(await page.locator('.recipe-full-modal').count())) throw new Error('Nie otworzył się modal pełnej receptury');

  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  if (await page.locator('.recipe-full-modal').count() && await page.locator('.recipe-full-modal').first().isVisible().catch(() => false)) {
    throw new Error('Modal pełnej receptury nie zamknął się');
  }

  // Przywróć stan ulubionych do stanu sprzed testu.
  await page.goto(base + '#/recipes', { waitUntil: 'networkidle' });
  await ready();
  await dismiss();
  const card2 = page.locator('a[href="' + href + '"]').first().locator('xpath=ancestor::*[contains(@class,"rtile")][1]');
  const heart2 = card2.locator('.heart').first();
  if ((await heart2.getAttribute('aria-pressed')) !== before) await heart2.click();

  // Test głównej ścieżki z widoku receptury.
  await page.locator('a[href="' + href + '"]').first().click();
  await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });

  // „GOTUJĘ” jest celowo dostępne na ekranie głównym; „Do zakupów” nie jest tu inline.
  await page.getByRole('button', { name: 'GOTUJĘ' }).first().click();
  await page.waitForTimeout(200);
  const finalHash = await page.evaluate(() => location.hash);
  if (!finalHash.includes('/guide/')) throw new Error('GOTUJĘ nie prowadzi do trybu prowadzenia');

} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: interaction smoke');
