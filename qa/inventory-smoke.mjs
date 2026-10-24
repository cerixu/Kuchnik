import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await page.addInitScript(() => {
  // Deterministic camera harness: fake video frames and a delayed decode let this
  // smoke test verify torch-button contents and scanner cancellation without hardware.
  const media = navigator.mediaDevices;
  if (media && media.getUserMedia) {
    const originalGetUserMedia = media.getUserMedia.bind(media);
    media.getUserMedia = async (...args) => {
      const stream = await originalGetUserMedia(...args);
      const track = stream.getVideoTracks()[0];
      if (track) {
        const originalCapabilities = track.getCapabilities?.bind(track);
        track.getCapabilities = () => ({ ...(originalCapabilities ? originalCapabilities() : {}), torch: true });
        track.applyConstraints = async (constraints) => { window.__torchConstraints = constraints; };
      }
      return stream;
    };
  }
  window.__barcodeDetectStarted = false;
  window.__releaseBarcodeDetect = false;
  window.BarcodeDetector = class {
    constructor() {}
    async detect() {
      window.__barcodeDetectStarted = true;
      await new Promise((resolve) => {
        const poll = () => window.__releaseBarcodeDetect ? resolve() : setTimeout(poll, 10);
        poll();
      });
      return [{ rawValue: '5901234123457' }];
    }
  };
});
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
async function expectText(text, label) {
  if (!(await page.getByText(text, { exact: false }).count())) throw new Error(label || ('Brak tekstu: ' + text));
}

try {
  await page.goto(base + '#/inventory', { waitUntil: 'networkidle' });
  await ready();
  await page.waitForTimeout(900);
  await dismiss();

  await page.getByRole('button', { name: 'Dodaj produkt do magazynu' }).click();
  await page.getByLabel('Nazwa produktu').fill('Mąka testowa');
  await page.getByLabel('Aktualny stan').fill('1');
  await page.getByLabel('Jednostka stanu').selectOption('kg');
  await page.getByLabel('Próg niskiego stanu').fill('2');
  await page.getByLabel('Cena za jednostkę (zł)').fill('3.5');
  await page.getByRole('button', { name: 'Zapisz', exact: true }).click();
  await page.waitForTimeout(250);
  await expectText('Mąka testowa', 'Nie zapisano produktu w magazynie.');
  await expectText('Niski stan', 'Nie pokazano ostrzeżenia o niskim stanie.');
  const search = page.getByLabel('Szukaj w magazynie');
  await search.fill('Mąka');
  await expectText('Mąka testowa', 'Wyszukiwanie magazynu nie znalazło produktu.');
  await search.fill('brak-tej-pozycji');
  await expectText('Brak wyników', 'Nie pokazano pustego stanu dla wyszukiwarki magazynu.');
  await search.fill('');

  // Expiry tracking: an expired item and an item expiring in two days must be visible and prioritized.
  const expiryDates = await page.evaluate(() => {
    const iso = (d) => [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
    const past = new Date(); past.setDate(past.getDate() - 1);
    const soon = new Date(); soon.setDate(soon.getDate() + 2);
    return { past: iso(past), soon: iso(soon) };
  });
  await page.getByRole('button', { name: 'Dodaj produkt do magazynu' }).click();
  await page.getByLabel('Nazwa produktu').fill('Produkt testowy po terminie');
  await page.getByLabel('Aktualny stan').fill('2');
  await page.getByLabel('Jednostka stanu').selectOption('kg');
  await page.getByLabel('Termin przydatności (cały wpis)').fill(expiryDates.past);
  await page.getByRole('button', { name: 'Zapisz', exact: true }).click();
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'Dodaj produkt do magazynu' }).click();
  await page.getByLabel('Nazwa produktu').fill('Produkt testowy na jutro');
  await page.getByLabel('Aktualny stan').fill('1');
  await page.getByLabel('Jednostka stanu').selectOption('kg');
  await page.getByLabel('Termin przydatności (cały wpis)').fill(expiryDates.soon);
  await page.getByRole('button', { name: 'Zapisz', exact: true }).click();
  await page.waitForTimeout(300);
  await expectText('Terminy do sprawdzenia', 'Brak panelu alertów o terminach.');
  await expectText('Po terminie', 'Nie pokazano produktu po terminie.');
  await expectText('Termin blisko', 'Nie pokazano produktu z terminem w ciągu 3 dni.');
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

  await page.goto(base + '#/inventory', { waitUntil: 'networkidle' });
  await ready();
  await dismiss();
  await page.getByRole('button', { name: 'Zarejestruj stratę: Mąka testowa' }).click();
  await page.getByLabel('Ilość straty').fill('0.5');
  await page.getByLabel('Powód').selectOption('Zepsute');
  await page.getByRole('button', { name: 'Zapisz stratę' }).click();
  await page.waitForTimeout(250);
  await expectText('1,75 zł', 'Koszt tygodniowej straty nie został obliczony poprawnie.');

  // Verify recipe completion automatically decrements an exact ingredient match.
  await page.getByRole('button', { name: 'Dodaj produkt do magazynu' }).click();
  await page.getByLabel('Nazwa produktu').fill('Mąka pszenna');
  await page.getByLabel('Aktualny stan').fill('1000');
  await page.getByLabel('Jednostka stanu').selectOption('g');
  await page.getByLabel('Próg niskiego stanu').fill('0');
  await page.getByLabel('Cena za jednostkę (zł)').fill('0.02');
  await page.getByRole('button', { name: 'Zapisz', exact: true }).click();
  await page.goto(base + '#/recipes', { waitUntil: 'domcontentloaded' });
  await ready();
  await dismiss();
  await page.getByLabel('Szukaj').fill('Kotlet schabowy');
  const schabowy = page.locator('a[href^="#/recipe/"]').filter({ hasText: 'Kotlet schabowy' }).first();
  await schabowy.waitFor({ state: 'visible', timeout: 5000 });
  const recipeHref = await schabowy.getAttribute('href');
  await schabowy.click();
  await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });
  await page.getByRole('button', { name: 'GOTUJĘ' }).first().click();
  await page.waitForSelector('.guide-next', { state: 'visible', timeout: 5000 });
  for (let step = 0; step < 12; step++) {
    const next = page.locator('.guide-next');
    const label = (await next.textContent()).trim();
    await next.click();
    if (label === 'Zakończ') break;
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(250);
  await page.goto(base + '#/inventory', { waitUntil: 'domcontentloaded' });
  await ready();
  await dismiss();
  const flourRow = page.locator('.inventory-item').filter({ hasText: 'Mąka pszenna' });
  await flourRow.waitFor({ state: 'visible', timeout: 5000 });
  await expectText('985 g', 'Ukończenie gotowania nie odjęło 15 g mąki dla domyślnej jednej porcji.');

  // The classic checklist must also start at one portion and deduct stock once when complete.
  await page.goto(base + recipeHref, { waitUntil: 'domcontentloaded' });
  await ready();
  await dismiss();
  await page.getByRole('button', { name: 'Lista kontrolna' }).click();
  await page.waitForSelector('.cook', { state: 'visible', timeout: 5000 });
  const classicFlour = page.locator('.cook-row:not(.step)').filter({ hasText: 'Mąka pszenna' }).first();
  await classicFlour.waitFor({ state: 'visible', timeout: 5000 });
  if (!/15\s*g/.test((await classicFlour.innerText()).replace(/\s+/g, ' '))) {
    throw new Error('Klasyczna lista kontrolna nie startuje od jednej porcji: ' + await classicFlour.innerText());
  }

  const ingredientRows = page.locator('.cook-row:not(.step)');
  for (let i = 0; i < await ingredientRows.count(); i++) await ingredientRows.nth(i).click();
  await page.getByRole('button', { name: 'Kroki', exact: true }).click();
  const stepRows = page.locator('.cook-row.step');
  const stepCount = await stepRows.count();
  if (!stepCount) throw new Error('Klasyczna lista kontrolna nie ma kroków do odhaczenia.');
  for (let i = 0; i < stepCount; i++) await stepRows.nth(i).click();
  await page.locator('.cookbar').getByRole('button', { name: 'Zakończ', exact: true }).evaluate((el) => { el.click(); el.click(); });
  await page.waitForTimeout(350);
  await page.goto(base + '#/inventory', { waitUntil: 'domcontentloaded' });
  await ready();
  await dismiss();
  await expectText('970 g', 'Klasyczna lista kontrolna nie odjęła dokładnie 15 g albo odjęła składniki podwójnie.');

  // Separate inventory batches keep their own dates and are included in the aggregate stock.
  await page.getByRole('button', { name: 'Dodaj partię: Mąka pszenna' }).click();
  await page.getByLabel('Ilość przyjęta (g)').fill('5');
  const soonDate = new Date(Date.now() + 2 * 86400000);
  const expiryValue = soonDate.getFullYear() + '-' + String(soonDate.getMonth() + 1).padStart(2, '0') + '-' + String(soonDate.getDate()).padStart(2, '0');
  await page.getByLabel('Termin przydatności partii').fill(expiryValue);
  await page.getByLabel('Cena za jednostkę (zł)').fill('0.03');
  await page.getByRole('button', { name: 'Przyjmij partię' }).click();
  await page.waitForTimeout(250);
  await expectText('975 g', 'Przyjęcie nowej partii nie zwiększyło łącznego stanu magazynu.');
  const flourLots = await page.evaluate(() => new Promise((resolve, reject) => {
    const request = indexedDB.open('zaruok-app-db');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('inventoryLots', 'readonly');
      const all = tx.objectStore('inventoryLots').getAll();
      all.onsuccess = () => { const rows = all.result.filter((x) => x.name === 'Mąka pszenna'); db.close(); resolve(rows); };
      all.onerror = () => reject(all.error);
    };
  }));
  if (!flourLots.some((lot) => lot.quantity === 5 && lot.expiryDate === expiryValue)) {
    throw new Error('Partia nie zachowała własnej ilości i terminu przydatności.');
  }

  // Cooking must consume the closest-expiry batch before the older, undated legacy stock.
  await page.goto(base + recipeHref, { waitUntil: 'domcontentloaded' });
  await ready();
  await dismiss();
  await page.getByRole('button', { name: 'GOTUJĘ' }).first().click();
  await page.waitForSelector('.guide-next', { state: 'visible', timeout: 5000 });
  for (let step = 0; step < 12; step++) {
    const next = page.locator('.guide-next');
    const label = (await next.textContent()).trim();
    await next.click();
    if (label === 'Zakończ') break;
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(300);
  await page.goto(base + '#/inventory', { waitUntil: 'domcontentloaded' });
  await ready();
  await dismiss();
  await expectText('960 g', 'Zużycie partii FEFO nie zachowało prawidłowego łącznego stanu magazynu.');
  const remainingLots = await page.evaluate(() => new Promise((resolve, reject) => {
    const request = indexedDB.open('zaruok-app-db');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('inventoryLots', 'readonly');
      const all = tx.objectStore('inventoryLots').getAll();
      all.onsuccess = () => { const rows = all.result.filter((x) => x.name === 'Mąka pszenna'); db.close(); resolve(rows); };
      all.onerror = () => reject(all.error);
    };
  }));
  const expiringBatch = remainingLots.find((lot) => lot.expiryDate === expiryValue);
  if (!expiringBatch || expiringBatch.quantity !== 0) {
    throw new Error('Gotowanie nie zużyło najpierw partii z najbliższym terminem (FEFO).');
  }

  await page.getByRole('button', { name: 'Skanuj kod EAN' }).click();
  await page.waitForSelector('.scanner-frame', { timeout: 5000 });
  if (!(await page.locator('.scanner-line').count())) throw new Error('Brak animowanej linii skanowania EAN.');
  if (!(await page.getByLabel('Kod EAN').count())) throw new Error('Brak ręcznego pola kodu EAN.');

  const torchButton = page.locator('.scanner-shell button.btn');
  await torchButton.waitFor({ state: 'visible', timeout: 5000 });
  await page.waitForFunction(() => window.__barcodeDetectStarted === true, null, { timeout: 5000 });
  if (await torchButton.isDisabled()) throw new Error('Latarka nie jest dostępna w teście kamery.');
  await torchButton.click();
  await torchButton.getByText('Wyłącz latarkę', { exact: true }).waitFor({ state: 'visible', timeout: 1500 });
  if (!(await torchButton.locator('svg').count())) throw new Error('Kliknięcie latarki usunęło ikonę SVG z przycisku.');
  const torchOn = await page.evaluate(() => window.__torchConstraints?.advanced?.[0]?.torch === true);
  if (!torchOn) throw new Error('Skaner nie przekazał poprawnego przełączenia latarki.');
  await torchButton.click();
  await torchButton.getByText('Latarka', { exact: true }).waitFor({ state: 'visible', timeout: 1500 });
  if (!(await torchButton.locator('svg').count())) throw new Error('Ponowne kliknięcie latarki usunęło ikonę SVG z przycisku.');

  // Close while native decoding is awaiting a frame. Its eventual result must not
  // reopen the product sheet after the scanner has been dismissed.
  await page.locator('.overlay .panel-foot').getByRole('button', { name: 'Zamknij', exact: true }).click();
  await page.evaluate(() => { window.__releaseBarcodeDetect = true; });
  await page.waitForTimeout(250);
  if (await page.getByLabel('Nazwa produktu').count()) {
    throw new Error('Wynik skanowania otworzył formularz produktu po zamknięciu skanera.');
  }

} finally {
  await browser.close();
}
if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: inventory, expiry alerts, waste cost, shopping handoff, and EAN scanner UI');
