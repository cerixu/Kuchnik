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
page.on('requestfailed', (request) => errors.push('requestfailed: ' + request.url() + ' — ' + request.failure()?.errorText));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push('console: ' + message.text());
});

try {
  const response = await page.goto('http://127.0.0.1:4173/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  if (!response || !response.ok()) throw new Error('Start page returned a non-success HTTP response.');

  await page.waitForFunction(() =>
    window.__kucharzyna?.ready === true ||
    window.__kuchnikBootFailed === true ||
    document.querySelector('#boot')?.dataset.recoveryShown === '1',
    null,
    { timeout: 65000 },
  ).catch(async () => {
    const state = await page.evaluate(() => ({
      ready: !!window.__kucharzyna?.ready,
      failed: !!window.__kuchnikBootFailed,
      boot: document.querySelector('#boot')?.innerText || '',
      view: document.querySelector('#view')?.innerText || '',
    }));
    throw new Error('Startup timed out before ready: ' + JSON.stringify(state) + '\\nConsole errors: ' + errors.join(' | '));
  });
  const startup = await page.evaluate(() => ({
    ready: !!window.__kucharzyna?.ready,
    failed: !!window.__kuchnikBootFailed,
    boot: document.querySelector('#boot')?.innerText || '',
    view: document.querySelector('#view')?.innerText || '',
  }));
  if (!startup.ready) throw new Error('App startup failed: ' + JSON.stringify(startup) + '\\nConsole errors: ' + errors.join(' | '));
  await page.locator('#boot').waitFor({ state: 'detached', timeout: 10000 });
  await page.waitForTimeout(1100);

  const whatsNew = page.getByRole('button', { name: 'Zaczynamy' });
  if (await whatsNew.count()) await whatsNew.click();

  // Check pizza flour blending and the two-stage fermentation controls on mobile.
  await page.locator('#tabbar a[data-tab="calc"]').click();
  await page.locator('a[href="#/calc/pizza"]').click();
  await page.locator('.flour-blend-editor').waitFor({ timeout: 10000 });

  // Każda zmiana wejściowa musi aktualizować gotową listę składników, nie tylko panel sugestii.
  const liveRecipe = page.locator('.live-recipe');
  const initialFlourRow = await liveRecipe.locator('.ing').first().innerText();
  await page.getByLabel('Liczba kulek').fill('5');
  const updatedFlourRow = await liveRecipe.locator('.ing').first().innerText();
  if (initialFlourRow === updatedFlourRow) {
    throw new Error('Changing the number of dough balls did not update the live flour dose.');
  }

  const waterRow = liveRecipe.locator('.ing').filter({ hasText: 'Woda do ciasta' });
  const initialWaterRow = await waterRow.innerText();
  await page.getByLabel('Hydracja (%) — wpisz lub przesuń suwak').fill('70');
  const updatedWaterRow = await waterRow.innerText();
  if (initialWaterRow === updatedWaterRow) {
    throw new Error('Changing hydration did not update the live water amount.');
  }

  await page.getByRole('button', { name: 'Moja mieszanka' }).click();
  await page.getByLabel('Rodzaj mąki 1').selectOption('pizzeria-blue');
  await page.getByRole('button', { name: 'Dodaj kolejną mąkę' }).click();
  const flourParts = page.locator('.flour-blend-row input.num');
  await flourParts.nth(0).fill('70');
  await flourParts.nth(1).fill('30');
  const flourAdvice = await page.locator('.flour-advice').innerText();
  if (!flourAdvice.includes('Pizzeria 70%') || !flourAdvice.includes('Saccorosso 30%')) {
    throw new Error('Flour blend shares were not reflected in the calculator: ' + flourAdvice);
  }

  // Teglia automatycznie wybiera mocną mąkę i dostosowuje hydrację do jej zakresu.
  await page.getByLabel('Rodzaj pizzy').selectOption('teglia');
  await page.getByRole('button', { name: 'Dobór automatyczny' }).click();
  const tegliaAdvice = await page.locator('.flour-advice').innerText();
  if (!tegliaAdvice.includes('Aria 100%')) {
    throw new Error('Teglia did not select the dedicated Caputo Aria flour: ' + tegliaAdvice);
  }
  await page.getByRole('button', { name: 'Zastosuj parametry automatu' }).click();
  const tegliaHydration = await page.getByLabel('Hydracja (%) — wpisz lub przesuń suwak').inputValue();
  if (Number(tegliaHydration.replace(',', '.')) !== 78) {
    throw new Error('Teglia automatic hydration should be 78%, received ' + tegliaHydration);
  }

  await page.getByRole('button', { name: 'Wstępna + zimna' }).click();
  await page.getByRole('button', { name: '8 h' }).click();
  const fermentation = await page.locator('.fermentation-track').innerText();
  if (!fermentation.includes('8 h') || !fermentation.includes('48 h w lodówce')) {
    throw new Error('Two-stage fermentation was not reflected in the calculator: ' + fermentation);
  }
  await page.locator('#tabbar a[data-tab="start"]').click();

  await page.locator('.qa[aria-label="Gotuję"]').click();
  await page.locator('.cook-entry-hero').waitFor({ timeout: 10000 });
  await page.locator('.cook-entry-search input').fill('carbonara');
  await page.locator('.cook-entry-card').first().waitFor({ timeout: 10000 });
  await page.locator('.cook-entry-card').first().click();
  await page.locator('.cookbar').waitFor({ timeout: 10000 });

  if (await page.locator('#boot').count()) throw new Error('Boot overlay remained after navigation.');
  if (errors.length) throw new Error('Browser errors:\n' + errors.join('\n'));

  console.log('Smoke test passed: app boot, live recipe updates, flour blending, teglia flour/hydration, split fermentation, recipe search, and cook view.');
} finally {
  await browser.close();
}
