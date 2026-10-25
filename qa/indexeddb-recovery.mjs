import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();
const errors = [];

await page.addInitScript(() => {
  globalThis.__kuchnikQA = { failNextIndexedDBOpen: true };
});
page.on('pageerror', (error) => errors.push('pageerror: ' + error.message));
page.on('requestfailed', (request) => errors.push('requestfailed: ' + request.url() + ' — ' + request.failure()?.errorText));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push('console: ' + message.text());
});

try {
  const response = await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response || !response.ok()) throw new Error('Start page returned a non-success HTTP response.');

  await page.waitForFunction(() =>
    window.__kucharzyna?.ready === true || window.__kuchnikBootFailed === true,
    null,
    { timeout: 60000 },
  );

  const state = await page.evaluate(() => ({
    ready: window.__kucharzyna?.ready === true,
    failed: window.__kuchnikBootFailed === true,
    failureInjected: window.__kuchnikQA?.failNextIndexedDBOpen === false,
    bootPresent: !!document.querySelector('#boot'),
    storageMode: window.__kucharzyna?.state ? 'loaded' : 'not-loaded',
  }));
  if (!state.failureInjected) throw new Error('The one-shot IndexedDB failure was not consumed by the startup path.');
  if (!state.ready || state.failed) throw new Error('Startup did not recover from the transient IndexedDB failure: ' + JSON.stringify(state));

  await page.locator('#boot').waitFor({ state: 'detached', timeout: 10000 });
  const welcome = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await welcome.count() && await welcome.isVisible().catch(() => false)) await welcome.click();

  await page.locator('.tab[data-tab="recipes"]').click();
  await page.waitForFunction(() => location.hash === '#/recipes', null, { timeout: 5000 });
  await page.locator('a[href^="#/recipe/"]').first().waitFor({ state: 'visible', timeout: 15000 });

  if (await page.locator('#boot').count()) throw new Error('Boot overlay remained after recovery.');
  if (errors.length) throw new Error('Browser errors:\n' + errors.join('\n'));
  console.log('PASS: one transient IndexedDB open failure is retried; app boots and recipes remain available.');
} finally {
  await context.close();
  await browser.close();
}
