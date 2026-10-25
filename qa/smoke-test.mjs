import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});
const errors = [];

page.on('pageerror', (error) => errors.push('pageerror: ' + error.message));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push('console: ' + message.text());
});

try {
  const response = await page.goto('http://127.0.0.1:4173/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  if (!response || !response.ok()) throw new Error('Start page returned a non-success HTTP response.');

  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 65000 });
  await page.locator('#boot').waitFor({ state: 'detached', timeout: 10000 });
  await page.waitForTimeout(1100);

  const whatsNew = page.getByRole('button', { name: 'Zaczynamy' });
  if (await whatsNew.count()) await whatsNew.click();

  await page.locator('.qa[aria-label="Gotuję"]').click();
  await page.locator('.cook-entry-hero').waitFor({ timeout: 10000 });
  await page.locator('.cook-entry-search input').fill('carbonara');
  await page.locator('.cook-entry-card').first().waitFor({ timeout: 10000 });
  await page.locator('.cook-entry-card').first().click();
  await page.locator('.cookbar').waitFor({ timeout: 10000 });

  if (await page.locator('#boot').count()) throw new Error('Boot overlay remained after navigation.');
  if (errors.length) throw new Error('Browser errors:\n' + errors.join('\n'));

  console.log('Smoke test passed: app boot, boot overlay removal, recipe search, and cook view.');
} finally {
  await browser.close();
}
