import fs from 'node:fs';
import { chromium } from 'playwright';

const swSource = fs.readFileSync('sw.js', 'utf8');
const version = swSource.match(/const VERSION = '([^']+)'/)?.[1];
const coreMatch = swSource.match(/const CORE = \[([\s\S]*?)\];/);
if (!version || !coreMatch) throw new Error('Nie można odczytać wersji/cache CORE z sw.js.');
const core = [...coreMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]).filter((p) => p !== './');
const required = ['index.html', 'app.js', 'recipes.js', 'food-photos.js',
  'assets/food-svg/carbonara.svg', 'assets/food-svg/margherita.svg',
  'assets/food-svg/tomato-soup.svg', 'assets/food-svg/burger.svg',
  'assets/food-svg/greek-salad.svg', 'assets/food-svg/mojito.svg'];
for (const path of required) {
  if (!core.includes(path)) throw new Error('Brak zasobu w CORE service workera: ' + path);
}

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

async function ready() {
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 20000 });
}
async function dismissReleaseSheet() {
  await page.waitForTimeout(1100);
  const button = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await button.count() && await button.isVisible().catch(() => false)) await button.click();
}

try {
  await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
  await ready();
  await dismissReleaseSheet();
  await page.goto(base + '#/recipes', { waitUntil: 'networkidle', timeout: 30000 });
  await ready();
  await page.waitForSelector('a[href^="#/recipe/"]', { state: 'visible', timeout: 10000 });

  await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) throw new Error('Service Worker API niedostępne.');
    await navigator.serviceWorker.ready;
  });
  await page.waitForFunction(() => !!navigator.serviceWorker.controller, null, { timeout: 10000 });

  const cacheCheck = await page.evaluate(async ({ cacheName, requiredPaths }) => {
    const names = await caches.keys();
    if (!names.includes(cacheName)) throw new Error('Brak cache wersji aplikacji: ' + cacheName);
    const cache = await caches.open(cacheName);
    return Promise.all(requiredPaths.map(async (path) => ({
      path,
      cached: !!(await cache.match(new URL(path, location.href).href)),
    })));
  }, { cacheName: version, requiredPaths: required });
  const missing = cacheCheck.filter((item) => !item.cached).map((item) => item.path);
  if (missing.length) throw new Error('Brak wymaganych zasobów w cache offline: ' + missing.join(', '));

  const href = await page.locator('a[href^="#/recipe/"]').first().getAttribute('href');
  if (!href) throw new Error('Nie znaleziono receptury do testu offline.');

  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
  await ready();
  await page.waitForFunction(() => !document.querySelector('#boot'), null, { timeout: 10000 });
  await page.waitForSelector('a[href^="#/recipe/"]', { state: 'visible', timeout: 10000 });
  if ((await page.locator('a[href^="#/recipe/"]').count()) < 1) throw new Error('Lista receptur jest pusta po uruchomieniu offline.');

  await page.goto(base + href, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForSelector('.detail', { state: 'visible', timeout: 10000 });
  if (!(await page.evaluate(() => window.__kucharzyna?.ready === true))) throw new Error('Aplikacja utraciła stan gotowości po przejściu offline.');
} finally {
  await context.close();
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki podczas testu offline:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: offline boot, cached shell/assets, recipe list and detail view');
