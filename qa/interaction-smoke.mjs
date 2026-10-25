import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

async function ready() {
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 20000 });
}
async function dismiss() {
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await start.count() && await start.isVisible().catch(() => false)) await start.click();
}
async function assertRoute(expected) {
  await page.waitForFunction((x) => location.hash.replace(/^#/, '').split('?')[0] === x, expected, { timeout: 5000 });
}
async function openRoute(path) {
  await page.goto(base + '#' + path, { waitUntil: 'domcontentloaded' });
  await ready();
  await dismiss();
  await page.waitForSelector('#view .screen', { state: 'visible', timeout: 5000 });
}

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await ready();
  await page.waitForTimeout(900);
  await dismiss();

  const tabs = [
    ['start', '/'],
    ['recipes', '/recipes'],
    ['cook', '/cook'],
    ['inventory', '/inventory'],
    ['more', '/more'],
  ];
  for (const [id, path] of tabs) {
    const tab = page.locator('.tab[data-tab="' + id + '"]').first();
    if (!(await tab.count())) throw new Error('Brak zakładki: ' + id);
    await tab.click();
    await assertRoute(path);
    if (!(await page.locator('#view .screen').count())) throw new Error('Ekran nie został wyrenderowany po wejściu na ' + id);
  }

  for (const path of ['/calc', '/shopping', '/search', '/import', '/settings', '/recipes', '/new']) {
    await openRoute(path);
  }

  await openRoute('/recipes');
  const recipe = page.locator('a[href^="#/recipe/"]').first();
  if (!(await recipe.count())) throw new Error('Brak receptury testowej');
  const href = await recipe.getAttribute('href');
  const card = recipe.locator('xpath=ancestor::*[contains(@class,"rtile")][1]');
  const heart = card.locator('.heart').first();
  if (!(await heart.count())) throw new Error('Brak serduszka na karcie receptury');

  const before = await heart.getAttribute('aria-pressed');
  await heart.click();
  await page.waitForTimeout(250);
  const after = await heart.getAttribute('aria-pressed');
  if (before === after) throw new Error('Kliknięcie serduszka nie zmieniło stanu ulubionych');

  await recipe.click();
  await assertRoute('/recipe/' + href.split('/recipe/')[1]);
  await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });
  if (!(await page.locator('.detail-hero').count())) throw new Error('Brak hero receptury');
  if (!(await page.locator('.orbit .orb-dot').count())) throw new Error('Brak wizualizacji składników');

  // Open and close the full recipe sheet.
  const more = page.locator('.more-toggle').first();
  if (!(await more.count())) throw new Error('Brak przycisku „Cały przepis”');
  await more.click();
  await page.waitForSelector('.full-recipe', { state: 'visible', timeout: 5000 });
  if (!(await page.locator('.full-recipe .steps').count())) throw new Error('Pełny przepis nie pokazuje kroków');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  if (await page.locator('.full-recipe').count()) throw new Error('Pełny przepis nie zamknął się klawiszem Escape');

  // Restore the favourite state so the test does not leave sample data changed.
  await openRoute('/recipes');
  const card2 = page.locator('a[href="' + href + '"]').first().locator('xpath=ancestor::*[contains(@class,"rtile")][1]');
  const heart2 = card2.locator('.heart').first();
  if ((await heart2.getAttribute('aria-pressed')) !== before) await heart2.click();

  await page.locator('a[href="' + href + '"]').first().click();
  await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });
  await page.getByRole('button', { name: 'GOTUJĘ' }).first().click();
  await page.waitForFunction(() => location.hash.includes('/guide/'), null, { timeout: 5000 });

} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: Kuchnik interaction smoke — nawigacja, ulubione, pełny przepis i tryb prowadzenia.');
