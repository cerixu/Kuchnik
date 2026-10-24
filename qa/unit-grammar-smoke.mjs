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
  const overlay = page.locator('#overlays .overlay').first();
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();

  // The first-run release sheet may appear just after the app signals ready.
  // Wait for it; otherwise a later navigation can leave it intercepting taps.
  const appeared = await overlay.waitFor({ state: 'visible', timeout: 2500 })
    .then(() => true).catch(() => false);
  if (!appeared) return;

  if (await start.count() && await start.isVisible().catch(() => false)) {
    await start.click({ force: true, timeout: 2000 }).catch(() => {});
  }
  if (await overlay.isVisible().catch(() => false)) {
    await page.keyboard.press('Escape').catch(() => {});
  }
  await overlay.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
}

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await ready();
  await dismiss();

  const forms = await page.evaluate(async () => {
    const { fmtUnit, fmtKitchenAmount } = await import('./util.js');
    const cases = [
      [1, 'łyżka', 'łyżka'],
      [0.5, 'łyżka', 'łyżki'],
      [0.333, 'łyżka', 'łyżki'],
      [1.5, 'łyżka', 'łyżki'],
      [2, 'łyżka', 'łyżki'],
      [4, 'łyżka', 'łyżki'],
      [5, 'łyżka', 'łyżek'],
      [12, 'łyżka', 'łyżek'],
      [21, 'łyżka', 'łyżek'],
      [22, 'łyżka', 'łyżki'],
      [3, 'łyżeczka', 'łyżeczki'],
      [5, 'łyżeczka', 'łyżeczek'],
      [2, 'szczypta', 'szczypty'],
      [5, 'szczypta', 'szczypt'],
      [1, 'porcja', 'porcja'],
      [4, 'porcja', 'porcje'],
      [5, 'porcja', 'porcji'],
      [250, 'g', 'g'],
      [2, 'szt.', 'szt.'],
    ];
    return cases.map(([n, u, expected]) => ({ n, u, actual: fmtUnit(n, u), expected }));
  });
  const fractionCases = await page.evaluate(async () => {
    const { fmtKitchenAmount } = await import('./util.js');
    return [
      [1 / 3, 'szt.', '⅓'], [2 / 3, 'szt.', '⅔'],
      [0.5, 'łyżka', '½'], [1 + 1 / 3, 'szt.', '1⅓'],
      [0.333, 'g', '0,333'],
    ].map(([n, unit, expected]) => ({ n, unit, actual: fmtKitchenAmount(n, unit), expected }));
  });
  const badFractions = fractionCases.filter((x) => x.actual !== x.expected);
  if (badFractions.length) throw new Error('Błędny zapis ilości kuchennych: ' + JSON.stringify(badFractions));

  const bad = forms.filter((x) => x.actual !== x.expected);
  if (bad.length) throw new Error('Błędna odmiana: ' + JSON.stringify(bad));

  await page.goto(base + '#/recipe/rcp_seed_lasagne_alla_bolognese', { waitUntil: 'networkidle' });
  await ready();
  await dismiss();
  await page.waitForSelector('.detail', { state: 'visible', timeout: 8000 });

  await page.locator('.orb-more').first().click();
  await page.waitForSelector('.recipe-full-modal', { state: 'visible', timeout: 5000 });
  const unitRows = await page.locator('.recipe-full-modal .recipe-modal-ing').evaluateAll((els) => els.map((el) => ({
    amount: el.querySelector('.recipe-modal-ing-qty')?.textContent?.trim() || '',
    unit: el.querySelector('.recipe-modal-ing-unit')?.textContent?.trim() || '',
  })));
  if (!unitRows.length) throw new Error('Brak ilości składników w pełnej recepturze.');
  const visibleForms = unitRows.map((x) => x.amount + ' ' + x.unit);
  if (!visibleForms.includes('⅛ łyżki') || !visibleForms.includes('¼ łyżki')) {
    throw new Error('Nieprawidłowa odmiana łyżki w pełnej recepturze: ' + JSON.stringify(visibleForms));
  }

  console.log('PASS: Polish unit grammar runtime + recipe rendering');
} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
