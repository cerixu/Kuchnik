import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const failures = [];
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

async function shot(name) {
  await page.screenshot({ path: 'qa-shots/' + name + '.png', fullPage: true });
}

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 15000 });
  await shot('01-start');

  await page.goto(base + '#/recipes', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await shot('02-recipes');

  const recipe = page.locator('a[href^="#/recipe/"]').first();
  if (await recipe.count()) {
    await recipe.click();
    await page.waitForTimeout(350);
    await shot('03-recipe');
    const more = page.locator('.orb-more').first();
    if (await more.count()) {
      await more.click();
      await page.waitForTimeout(250);
      await shot('04-full-recipe');
      if (!(await page.locator('.recipe-full-modal').first().count())) failures.push('Pełna receptura nie otworzyła się w modalu.');
      if ((await page.locator('.recipe-modal-ing-icon').count()) === 0) failures.push('Modal receptury nie zawiera ikon składników.');
    }
  } else {
    failures.push('Nie znaleziono żadnej receptury do testu.');
  }
} finally {
  await browser.close();
}
if (errors.length) console.error('Błędy przeglądarki:\n' + errors.join('\n'));
if (failures.length) { console.error('FAIL:\n' + failures.join('\n')); process.exit(1); }
console.log('PASS: visual smoke QA');
