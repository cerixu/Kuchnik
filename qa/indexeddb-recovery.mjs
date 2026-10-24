import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });

await page.addInitScript(() => {
  globalThis.__kucharzynaQA = { failNextIndexedDBOpen: true };
});

const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  try {
    await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 15000 });
  } catch (e) {
    console.error('RECOVERY DEBUG', JSON.stringify({
      url: page.url(),
      ready: await page.evaluate(() => window.__kucharzyna?.ready ?? null),
      stateReady: await page.evaluate(() => window.__kucharzyna?.state?.ready ?? null),
      text: (await page.locator('body').innerText()).slice(0, 1200),
      errors,
    }));
    throw e;
  }

  const start = page.locator('.zf-head').first();
  if (!(await start.count())) throw new Error('Start nie wyrenderował się po recovery IndexedDB');

  // A major version bump opens the release sheet for a fresh profile.
  // Dismiss it before interacting with the navigation underneath.
  const welcome = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await welcome.count() && await welcome.isVisible().catch(() => false)) {
    await welcome.click();
    await page.waitForTimeout(150);
  }

  const recipes = page.locator('.tab[data-tab="recipes"]').first();
  await recipes.click();
  await page.waitForFunction(() => location.hash === '#/recipes', null, { timeout: 5000 });
  if (!(await page.locator('a[href^="#/recipe/"]').count())) throw new Error('Receptury nie załadowały się po recovery IndexedDB');
} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: IndexedDB startup recovery');
