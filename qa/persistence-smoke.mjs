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
async function firstRecipeHeart() {
  await page.waitForFunction(() => {
    const links = document.querySelectorAll('a[href^="#/recipe/"]');
    const seeded = window.__kucharzyna?.state?.recipes?.size || 0;
    return links.length > 0 || seeded > 0;
  }, null, { timeout: 60000 });
  const recipe = page.locator('a[href^="#/recipe/"]').first();
  await recipe.waitFor({ state: 'visible', timeout: 15000 });
  const card = recipe.locator('xpath=ancestor::*[contains(@class,"rtile")][1]');
  const heart = card.locator('.heart').first();
  if (!(await heart.count())) throw new Error('Brak serduszka na karcie receptury.');
  return heart;
}

try {
  await page.goto(base + '#/recipes', { waitUntil: 'networkidle' });
  await ready();
  await dismiss();

  const heart = await firstRecipeHeart();
  const original = await heart.getAttribute('aria-pressed');
  await heart.click();
  await page.waitForTimeout(350);
  const changed = await heart.getAttribute('aria-pressed');
  if (changed === original) throw new Error('Nie udało się zmienić stanu ulubionych.');

  // Twardy reload: wartość musi zostać odczytana ponownie z IndexedDB.
  await page.reload({ waitUntil: 'networkidle' });
  await ready();
  await dismiss();
  const afterReload = page.locator('a[href^="#/recipe/"]').first();
  const debug = await page.evaluate(() => ({
    hash: location.hash,
    ready: window.__kucharzyna?.ready,
    recipes: window.__kucharzyna?.state?.recipes?.size,
    seeded: window.__kucharzyna?.state?.settings?.seeded,
  }));
  await afterReload.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
    throw new Error('Po reload brak receptury. DEBUG=' + JSON.stringify(debug));
  });
  const afterReloadCard = afterReload.locator('xpath=ancestor::*[contains(@class,"rtile")][1]');
  const afterReloadHeart = afterReloadCard.locator('.heart').first();
  const persisted = await afterReloadHeart.getAttribute('aria-pressed');
  if (persisted !== changed) throw new Error('Stan ulubionych nie przetrwał przeładowania: zapis=' + changed + ', po reload=' + persisted + ' DEBUG=' + JSON.stringify(debug));

  // Przywrócenie stanu wejściowego.
  if (persisted !== original) {
    await afterReloadHeart.click();
    await page.waitForTimeout(350);
  }
  const restored = await afterReloadHeart.getAttribute('aria-pressed');
  if (restored !== original) throw new Error('Nie udało się przywrócić stanu wejściowego.');

} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: persistence smoke');
