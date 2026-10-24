import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

async function ready() {
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 20000 });
}
async function dismiss() {
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await start.count() && await start.isVisible().catch(() => false)) await start.click();
}
async function inventory() {
  await page.goto(base + '#/inventory', { waitUntil: 'domcontentloaded' });
  await ready();
  await dismiss();
  await page.waitForSelector('.inventory-screen', { state: 'visible', timeout: 5000 });
}
async function expectText(text, label) {
  if (!(await page.getByText(text, { exact: false }).count())) throw new Error(label || ('Brak tekstu: ' + text));
}

try {
  await inventory();

  await page.getByRole('button', { name: 'Dodaj produkt do magazynu' }).first().click();
  await page.getByLabel('Nazwa produktu').fill('Mąka testowa');
  await page.getByLabel('Aktualny stan').fill('1');
  await page.getByLabel('Jednostka stanu').selectOption('kg');
  await page.getByLabel('Próg niskiego stanu').fill('2');
  await page.getByLabel('Cena za jednostkę (zł)').fill('3.5');
  await page.getByRole('button', { name: 'Zapisz', exact: true }).click();
  await page.waitForTimeout(200);
  await expectText('Mąka testowa', 'Nie zapisano produktu w magazynie.');
  await expectText('Niski stan', 'Nie pokazano ostrzeżenia o niskim stanie.');

  const search = page.getByLabel('Szukaj w magazynie');
  await search.fill('Mąka');
  await expectText('Mąka testowa', 'Wyszukiwanie magazynu nie znalazło produktu.');
  await search.fill('brak-tej-pozycji');
  await expectText('Brak wyników', 'Nie pokazano pustego stanu dla wyszukiwarki magazynu.');
  await search.fill('');

  const dates = await page.evaluate(() => {
    const iso = (d) => [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
    const past = new Date(); past.setDate(past.getDate() - 1);
    const soon = new Date(); soon.setDate(soon.getDate() + 2);
    return { past: iso(past), soon: iso(soon) };
  });
  for (const [name, expiry] of [['Produkt testowy po terminie', dates.past], ['Produkt testowy na jutro', dates.soon]]) {
    await page.getByRole('button', { name: 'Dodaj produkt do magazynu' }).first().click();
    await page.getByLabel('Nazwa produktu').fill(name);
    await page.getByLabel('Aktualny stan').fill('2');
    await page.getByLabel('Jednostka stanu').selectOption('kg');
    await page.getByLabel('Termin przydatności (cały wpis)').fill(expiry);
    await page.getByRole('button', { name: 'Zapisz', exact: true }).click();
    await page.waitForTimeout(180);
  }
  await expectText('Terminy do sprawdzenia', 'Brak panelu alertów o terminach.');
  await expectText('Po terminie', 'Nie pokazano produktu po terminie.');
  await expectText('Termin blisko', 'Nie pokazano produktu z krótkim terminem.');
  if (!(await page.locator('.inventory-item.is-expired').filter({ hasText: 'Produkt testowy po terminie' }).count())) throw new Error('Produkt po terminie nie otrzymał ostrzegawczego stylu.');
  if (!(await page.locator('.inventory-item.is-expiring').filter({ hasText: 'Produkt testowy na jutro' }).count())) throw new Error('Produkt z krótkim terminem nie otrzymał ostrzegawczego stylu.');

  await page.reload({ waitUntil: 'networkidle' });
  await ready();
  await dismiss();
  await expectText('Mąka testowa', 'Stan magazynu nie przetrwał przeładowania strony.');

  await page.getByRole('button', { name: 'Dodaj braki do zakupów' }).click();
  await page.goto(base + '#/shopping', { waitUntil: 'networkidle' });
  await ready();
  await dismiss();
  await expectText('Mąka testowa', 'Braki magazynowe nie trafiły na listę zakupów.');

  await inventory();
  await page.getByRole('button', { name: 'Zarejestruj stratę: Mąka testowa' }).click();
  await page.getByLabel('Ilość straty').fill('0.5');
  await page.getByLabel('Jednostka straty').selectOption('kg');
  await page.getByLabel('Powód').selectOption('Zepsute');
  await page.getByRole('button', { name: 'Zapisz stratę' }).click();
  await page.waitForTimeout(250);
  await expectText('1,75 zł', 'Koszt tygodniowej straty nie został obliczony poprawnie.');

  // Recipe completion must decrement the matched ingredient once.
  await page.getByRole('button', { name: 'Dodaj produkt do magazynu' }).first().click();
  await page.getByLabel('Nazwa produktu').fill('Mąka pszenna');
  await page.getByLabel('Aktualny stan').fill('1000');
  await page.getByLabel('Jednostka stanu').selectOption('g');
  await page.getByLabel('Próg niskiego stanu').fill('0');
  await page.getByLabel('Cena za jednostkę (zł)').fill('0.02');
  await page.getByRole('button', { name: 'Zapisz', exact: true }).click();

  await page.goto(base + '#/recipes', { waitUntil: 'domcontentloaded' });
  await ready();
  await dismiss();
  const searchRecipes = page.getByLabel('Szukaj receptury, składnika, tagu…');
  if (await searchRecipes.count()) await searchRecipes.fill('Kotlet schabowy');
  const recipe = page.locator('a[href^="#/recipe/"]').filter({ hasText: 'Kotlet schabowy' }).first();
  await recipe.waitFor({ state: 'visible', timeout: 8000 });
  await recipe.click();
  await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });
  await page.getByRole('button', { name: 'GOTUJĘ' }).first().click();
  await page.waitForSelector('.guide-next', { state: 'visible', timeout: 5000 });
  for (let step = 0; step < 15; step++) {
    const next = page.locator('.guide-next');
    const label = (await next.textContent()).trim();
    await next.click();
    if (label === 'Zakończ') break;
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(250);
  await inventory();
  const flour = page.locator('.inventory-item').filter({ hasText: 'Mąka pszenna' });
  await flour.waitFor({ state: 'visible', timeout: 5000 });
  await expectText('985 g', 'Ukończenie gotowania nie odjęło 15 g mąki dla jednej porcji.');

} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: Magazyn — zapisywanie, alerty terminów, wyszukiwanie, zakupy, straty i automatyczne odejmowanie składników.');
