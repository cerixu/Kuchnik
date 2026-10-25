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
const pageErrors = [];

await page.addInitScript(() => {
  globalThis.__kuchnikQA = {
    startupDeadlineMs: 8000,
    startupPhaseTimeoutMs: 20000,
    delayInventoryLoadMs: 12000,
  };
});
page.on('pageerror', (error) => pageErrors.push(error.message));

try {
  const response = await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response || !response.ok()) throw new Error('Start page returned a non-success HTTP response.');

  await page.waitForFunction(
    () => window.__kuchnikQA?.inventoryDelayStarted === true,
    null,
    { timeout: 20000 },
  );
  await page.waitForFunction(
    () => window.__kuchnikBootFailed === true,
    null,
    { timeout: 12000 },
  );

  // Poczekaj, aż celowo opóźniona operacja zakończy się po ekranie błędu.
  await page.waitForTimeout(6500);
  const state = await page.evaluate(() => ({
    failed: window.__kuchnikBootFailed === true,
    ready: window.__kucharzyna?.ready === true,
    bootPresent: !!document.querySelector('#boot'),
    viewText: document.querySelector('#view')?.innerText || '',
    delayStarted: window.__kuchnikQA?.inventoryDelayStarted === true,
  }));

  if (!state.delayStarted || !state.failed || state.ready || state.bootPresent ||
      !state.viewText.includes('Nie mogę otworzyć danych')) {
    throw new Error('Late startup operation changed the failed boot state: ' + JSON.stringify(state));
  }
  if (pageErrors.length) throw new Error('Browser errors: ' + pageErrors.join(' | '));

  console.log('PASS: a late inventory startup result cannot replace the fatal screen or mark the app ready.');
} finally {
  await context.close();
  await browser.close();
}
