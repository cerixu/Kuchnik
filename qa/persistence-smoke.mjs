import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push('pageerror: ' + error.message));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push('console: ' + message.text());
});

async function ready() {
  await page.waitForFunction(
    () => window.__kucharzyna?.ready === true || window.__kuchnikBootFailed === true,
    null,
    { timeout: 60000 },
  );
  if (await page.evaluate(() => window.__kuchnikBootFailed === true)) {
    throw new Error('Aplikacja nie wystartowała w teście trwałości.');
  }
}

async function dismissReleaseSheet() {
  await page.waitForTimeout(1100);
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await start.count() && await start.isVisible().catch(() => false)) await start.click();
}

async function recipeHeartByHref(href) {
  const link = page.locator('a[href="' + href + '"]').first();
  await link.waitFor({ state: 'visible', timeout: 15000 });
  const card = link.locator('xpath=ancestor::*[contains(@class,"rtile")][1]');
  const heart = card.locator('.heart').first();
  await heart.waitFor({ state: 'visible', timeout: 5000 });
  return heart;
}

try {
  await page.goto(base + '#/recipes', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await ready();
  await dismissReleaseSheet();

  await page.waitForFunction(() => document.querySelectorAll('a[href^="#/recipe/"]').length > 0, null, { timeout: 30000 });
  const first = page.locator('a[href^="#/recipe/"]').first();
  const href = await first.getAttribute('href');
  if (!href) throw new Error('Nie znaleziono receptury testowej.');

  let heart = await recipeHeartByHref(href);
  const original = await heart.getAttribute('aria-pressed');
  await heart.click();
  await page.waitForFunction(({ href, original }) => {
    const link = [...document.querySelectorAll('a[href^="#/recipe/"]')].find((el) => el.getAttribute('href') === href);
    const btn = link?.closest('.rtile')?.querySelector('.heart');
    return !!btn && btn.getAttribute('aria-pressed') !== original;
  }, { href, original }, { timeout: 5000 });
  const changed = await (await recipeHeartByHref(href)).getAttribute('aria-pressed');

  // Twardy reload sprawdza zapis w IndexedDB, nie tylko stan w pamięci JS.
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
  await ready();
  await dismissReleaseSheet();
  heart = await recipeHeartByHref(href);
  const persisted = await heart.getAttribute('aria-pressed');
  if (persisted !== changed) {
    throw new Error('Ulubiona receptura nie przetrwała przeładowania: przed=' + changed + ', po=' + persisted);
  }

  // Przywróć początkowy stan; kontekst jest odizolowany, ale test nie powinien zostawiać zmian.
  if (persisted !== original) {
    await heart.click();
    await page.waitForFunction(({ href, original }) => {
      const link = [...document.querySelectorAll('a[href^="#/recipe/"]')].find((el) => el.getAttribute('href') === href);
      const btn = link?.closest('.rtile')?.querySelector('.heart');
      return !!btn && btn.getAttribute('aria-pressed') === original;
    }, { href, original }, { timeout: 5000 });
  }

  if (errors.length) throw new Error('Błędy przeglądarki:\n' + errors.join('\n'));
  console.log('PASS: ulubiona receptura zachowuje stan po reload i test przywraca wartość początkową.');
} finally {
  await context.close();
  await browser.close();
}
