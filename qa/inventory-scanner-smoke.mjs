import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({
  args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'],
});
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  permissions: ['camera'],
});
const page = await context.newPage();
const errors = [];

await page.addInitScript(() => {
  window.__barcodeDetectStarted = false;
  window.__releaseBarcodeDetect = false;

  // Deterministyczny dekoder testowy: odczyt kończy się dopiero po zamknięciu skanera.
  window.BarcodeDetector = class {
    static async getSupportedFormats() {
      return ['ean_13', 'ean_8', 'upc_a', 'upc_e'];
    }
    async detect() {
      window.__barcodeDetectStarted = true;
      await new Promise((resolve) => {
        const poll = () => window.__releaseBarcodeDetect ? resolve() : setTimeout(poll, 10);
        poll();
      });
      return [{ rawValue: '5901234123457', format: 'ean_13' }];
    }
  };

  // Odpowiedź lokalna, żeby test nie zależał od dostępności Open Food Facts.
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input?.url || '';
    if (url.includes('world.openfoodfacts.org')) {
      return Promise.resolve(new Response(JSON.stringify({
        status: 1,
        product: { product_name_pl: 'Produkt testowy ze skanera' },
      }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }
    return nativeFetch(input, init);
  };
});

page.on('pageerror', (error) => errors.push('pageerror: ' + error.message));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push('console: ' + message.text());
});

async function ready() {
  await page.waitForFunction(
    () => window.__kucharzyna?.ready === true || window.__kuchnikBootFailed === true,
    null,
    { timeout: 30000 },
  );
  if (await page.evaluate(() => window.__kuchnikBootFailed === true)) {
    throw new Error('Aplikacja nie wystartowała przed testem skanera.');
  }
}

async function dismissReleaseSheet() {
  await page.waitForTimeout(1100);
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await start.count() && await start.isVisible().catch(() => false)) await start.click();
}

try {
  const response = await page.goto(base + '#/inventory', { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response || !response.ok()) throw new Error('Ekran magazynu nie zwrócił poprawnej odpowiedzi HTTP.');
  await ready();
  await dismissReleaseSheet();

  await page.getByRole('button', { name: 'Skanuj kod EAN' }).click();
  await page.waitForFunction(() => window.__barcodeDetectStarted === true, null, { timeout: 10000 });

  await page.locator('.overlay .panel-foot')
    .getByRole('button', { name: 'Zamknij', exact: true })
    .click();
  await page.evaluate(() => { window.__releaseBarcodeDetect = true; });
  await page.waitForTimeout(450);

  if (await page.getByLabel('Nazwa produktu').count()) {
    throw new Error('Spóźniony wynik EAN otworzył formularz produktu po zamknięciu skanera.');
  }
  if (await page.locator('.overlay .panel[aria-label="Skanuj kod kreskowy"]').count()) {
    throw new Error('Okno skanera pozostało otwarte po anulowaniu.');
  }
  if (errors.length) throw new Error('Błędy przeglądarki:\n' + errors.join('\n'));

  console.log('PASS: zamknięcie skanera podczas dekodowania unieważnia spóźniony wynik EAN.');
} finally {
  await context.close();
  await browser.close();
}
