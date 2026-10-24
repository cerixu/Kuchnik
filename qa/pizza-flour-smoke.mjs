import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

async function dismissWhatsNew() {
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await start.count() && await start.isVisible().catch(() => false)) await start.click();
}

try {
  await page.goto(base + '#/calc/pizza', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 15000 });
  await page.waitForTimeout(1200);
  await dismissWhatsNew();

  const mode = await page.getByRole('button', { name: 'Mam mąkę' }).count();
  if (!mode) throw new Error('Brak opcji „Mam mąkę”');

  const flourInput = page.getByLabel('Masa mąki');
  if (!(await flourInput.count())) throw new Error('Brak pola „Masa mąki”');
  await flourInput.fill('7200');

  const values = await page.evaluate(async () => {
    const { pizzaCalcFromFlour } = await import('./calculator.js');
    return pizzaCalcFromFlour({ flour: 7200, hydration: 65, salt: 3, oil: 0, yeast: 0.2 });
  });

  const expected = { flour: 7200, water: 4680, salt: 216, yeast: 14.4, total: 12110.4 };
  const starter = await page.evaluate(async () => {
    const { pizzaCalcFromFlour } = await import('./calculator.js');
    const r = pizzaCalcFromFlour({ flour: 7700, hydration: 65, salt: 3, oil: 0, yeast: 0, starter: 0.656 });
    return { seed: r.starterSeed, flour: r.starterFlour, water: r.starterWater, totalStarter: r.starter, doughFlour: r.doughFlour, doughWater: r.doughWater, total: r.total };
  });
  const starterExpected = { seed: 50.512, flour: 50.512, water: 101.024, totalStarter: 202.048, doughFlour: 7649.488, doughWater: 4903.976, total: 12986.512 };
  for (const [k, v] of Object.entries(starterExpected)) if (Math.abs(starter[k] - v) > 0.001) throw new Error('Błędny przelicznik aktywnego zakwasu ' + k + ': ' + starter[k] + ', oczekiwano ' + v);
  const capped = await page.evaluate(async () => {
    const { pizzaCalcFromFlour } = await import('./calculator.js');
    return pizzaCalcFromFlour({ flour: 7700, hydration: 65, salt: 3, oil: 0, yeast: 0, starter: 20 }).starterSeed;
  });
  if (capped !== 77) throw new Error('Zakwas macierzysty musi być ograniczony do maks. 1% mąki: ' + capped);
  for (const [k, v] of Object.entries(expected)) {
    if (Math.abs(values[k] - v) > 0.001) throw new Error('Błędny wynik ' + k + ': ' + values[k] + ', oczekiwano ' + v);
  }

  const water = await page.locator('.results-grid').innerText();
  if (!water.includes('4 680') && !water.includes('4680')) throw new Error('Widok nie pokazuje 4680 g wody');

  await page.getByRole('button', { name: 'Kulki' }).click();
  if (!(await page.getByLabel('Liczba kulek').count())) throw new Error('Tryb kulek nie wrócił poprawnie');

  await page.getByRole('button', { name: 'Mam mąkę' }).click();
  if (!(await page.getByLabel('Masa mąki').count())) throw new Error('Powrót do trybu „Mam mąkę” nie działa');

  // Fermentation fields must retain focus across consecutive keystrokes.
  const temperature = page.getByLabel('Temperatura fermentacji');
  await temperature.click();
  await page.waitForTimeout(30);
  await temperature.press('Control+A');
  await page.keyboard.type('25');
  if (await temperature.inputValue() !== '25') throw new Error('Pole temperatury gubi fokus przy wpisywaniu znak po znaku');
  if (!(await temperature.evaluate((el) => el === document.activeElement))) throw new Error('Pole temperatury utraciło fokus');
  const fermentationTime = page.getByLabel('Czas fermentacji w godzinach');
  await fermentationTime.click();
  await page.waitForTimeout(30);
  await fermentationTime.press('Control+A');
  await page.keyboard.type('18');
  if (await fermentationTime.inputValue() !== '18') throw new Error('Pole czasu fermentacji gubi fokus przy wpisywaniu');
  if (!(await fermentationTime.evaluate((el) => el === document.activeElement))) throw new Error('Pole czasu fermentacji utraciło fokus');

  // Input is mother-starter percentage, capped at 1% of total flour.
  await page.getByLabel('Masa mąki').fill('7700');
  await page.getByLabel('Rodzaj zaczynu').selectOption('starter');
  if (!(await page.getByText(/50,5 g \+ 50,5 g \+ 101 g = 202 g/).count())) throw new Error('Brak przykładu proporcji 1:1:2 dla aktywnego zakwasu');
  await page.getByLabel('Zakwas macierzysty procent mąki').fill('0.656');
  const row = (label) => page.locator('.result').filter({ hasText: label });
  if (!(await row('Zakwas macierzysty').innerText()).includes('50,5')) throw new Error('Zakwas macierzysty powinien mieć ok. 50,5 g');
  if (!(await row('Mąka do zakwasu').innerText()).includes('50,5')) throw new Error('Mąka do zakwasu powinna mieć ok. 50,5 g');
  if (!(await row('Woda do zakwasu').innerText()).includes('101')) throw new Error('Woda do zakwasu powinna mieć ok. 101 g');
  if (!(await row('Aktywny zakwas łącznie').innerText()).includes('202')) throw new Error('Aktywny zakwas powinien mieć ok. 202 g');
  const totalText = await row('Masa całkowita').innerText();
  if (!totalText.includes('12 987') && !totalText.includes('12987')) throw new Error('Masa końcowa powinna zaokrąglać się do 12 987 g bez podwójnego liczenia mąki i wody');
  await page.getByLabel('Zakwas macierzysty procent mąki').fill('5');
  if (!(await page.getByLabel('Zakwas macierzysty procent mąki').inputValue()).startsWith('1')) throw new Error('Pole zakwasu nie ogranicza wartości do 1%');

  await page.getByRole('button', { name: 'Zapisz jako recepturę' }).click();
  const openRecipe = page.getByRole('button', { name: 'Otwórz' }).last();
  await openRecipe.waitFor({ state: 'visible', timeout: 5000 });
  await openRecipe.click();
  await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });
  await page.locator('.orb-more').first().click();
  await page.waitForSelector('.recipe-full-modal', { state: 'visible', timeout: 5000 });
  const savedRecipe = await page.locator('.recipe-full-modal').innerText();
  for (const item of ['Zakwas macierzysty', 'Mąka pszenna do zakwasu', 'Woda do zakwasu']) {
    if (!savedRecipe.includes(item)) throw new Error('Zapisana receptura nie zawiera składnika: ' + item);
  }

  console.log('PASS: flour-first pizza, focus-stable temperature, 1:1:2 sourdough and saved recipe');
} finally {
  await browser.close();
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
