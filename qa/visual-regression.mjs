import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
fs.mkdirSync('qa-shots', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

const errors = [];
const badRequests = [];
page.on('pageerror', (e) => errors.push(String(e.stack || e)));
page.on('requestfailed', (req) => badRequests.push(req.url() + ' :: ' + String(req.failure()?.errorText || 'request failed')));
page.on('response', (res) => { if (/\\.js(?:\\?|$)/.test(res.url()) && !res.ok()) badRequests.push(res.status() + ' ' + res.url()); });
page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE ' + m.text() + ' @ ' + JSON.stringify(m.location())); });
page.on('requestfailed', (r) => errors.push('REQUESTFAIL ' + r.url() + ' ' + (r.failure()?.errorText || '')));
page.on('response', (r) => { if (r.status() >= 400) errors.push('HTTP ' + r.status() + ' ' + r.url()); });
await page.addInitScript(() => {
  window.__speechLog = { spoken: 0, cancelled: 0, lastText: '' };
  class TestSpeechUtterance {
    constructor(text) { this.text = text; this.lang = ''; this.rate = 1; this.voice = null; }
  }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', {
    configurable: true, writable: true, value: TestSpeechUtterance,
  });
  const engine = {
    speaking: false, pending: false, paused: false,
    getVoices: () => [{ lang: 'pl-PL', name: 'Test Polish voice' }],
    speak(utterance) {
      this.speaking = true;
      window.__speechLog.spoken++;
      window.__speechLog.lastText = utterance.text;
    },
    cancel() { this.speaking = false; this.pending = false; window.__speechLog.cancelled++; },
    pause() { this.paused = true; },
    resume() { this.paused = false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, writable: true, value: engine });
});

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

async function ready() {
  try {
    await page.waitForSelector('#view', { state: 'attached', timeout: 10000 });
    await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 30000 });
  } catch (error) {
    const body = await page.locator('body').innerText().catch(() => '');
    const href = page.url();
    throw new Error('App readiness timeout. URL=' + href + '\\nBODY=' + body.slice(0, 2000) + '\\nERRORS=' + errors.join(' | ') + '\\nBAD_REQUESTS=' + badRequests.join(' | ') + '\\nCAUSE=' + error.message);
  }
}
async function dismissWhatsNew() {
  const overlay = page.locator('#overlays .overlay').first();
  if (!(await overlay.count())) return;
  if (!(await overlay.isVisible().catch(() => false))) return;
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await start.count()) {
    await start.click();
  } else {
    await page.keyboard.press('Escape');
  }
  await page.waitForTimeout(150);
}

async function shot(name) {
  await page.screenshot({ path: 'qa-shots/' + name, fullPage: true });
}

async function assertNoPageOverflow(label) {
  const metrics = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  assert(metrics.document <= metrics.viewport && metrics.body <= metrics.viewport,
    label + ': poziomy overflow strony ' + JSON.stringify(metrics));
}

async function box(sel) {
  const loc = page.locator(sel).first();
  assert(await loc.count(), 'Brak elementu: ' + sel);
  return loc.boundingBox();
}

try {
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await ready();
  await page.waitForTimeout(1200);
  const releaseSheet = page.locator('#overlays .overlay').first();
  await releaseSheet.waitFor({ state: 'visible', timeout: 5000 });
  const releaseCopy = await releaseSheet.innerText();
  const utilSource = fs.readFileSync(new URL('../util.js', import.meta.url), 'utf8');
  const versionMatch = utilSource.match(/export const APP_VERSION = '([^']+)'/);
  assert(versionMatch, 'Nie udało się odczytać numeru APP_VERSION z util.js.');
  const currentVersion = versionMatch[1];
  const changelogSource = fs.readFileSync(new URL('../changelog.js', import.meta.url), 'utf8');
  const releaseMarker = "'" + currentVersion + "': Object.freeze({";
  const releaseStart = changelogSource.indexOf(releaseMarker);
  assert(releaseStart >= 0, 'Brak wpisu w changelog.js dla bieżącej wersji ' + currentVersion + '.');
  const laterRelease = changelogSource.indexOf("\n  '", releaseStart + releaseMarker.length);
  const releaseEnd = laterRelease >= 0 ? laterRelease : changelogSource.indexOf('\n});', releaseStart);
  const releaseSource = changelogSource.slice(releaseStart, releaseEnd >= 0 ? releaseEnd : changelogSource.length);
  const expectedReleaseText = [...releaseSource.matchAll(/'([^']*)'/g)]
    .map((match) => match[1]).filter((value) => value !== currentVersion);
  assert(expectedReleaseText.length >= 3, 'Aktualny wpis changeloga jest pusty lub niepełny.');
  assert(releaseCopy.includes('Co nowego w ' + currentVersion),
    'Okno startowe nie pokazuje aktualnego numeru wersji ' + currentVersion + '.');
  for (const expectedText of expectedReleaseText) {
    assert(releaseCopy.includes(expectedText), 'Okno startowe nie pokazuje wpisu changeloga: ' + expectedText);
  }
  await dismissWhatsNew();
  const heroPhotoDebug = await page.locator('.zf-feature-img img').first().evaluate((img) => {
    const snap = (el) => {
      const s = getComputedStyle(el), r = el.getBoundingClientRect();
      return {tag:el.tagName,cls:el.className,display:s.display,visibility:s.visibility,opacity:s.opacity,zIndex:s.zIndex,position:s.position,
        width:Math.round(r.width),height:Math.round(r.height),top:Math.round(r.top),left:Math.round(r.left),borderRadius:s.borderRadius,background:s.backgroundColor,overflow:s.overflow};
    };
    return {alt:img.alt,complete:img.complete,naturalWidth:img.naturalWidth,photoRequested:img.dataset.photoRequested||'',photoSource:img.dataset.photoSource||'',
      srcPrefix:String(img.currentSrc||img.src||'').slice(0,70),image:snap(img),wrapper:snap(img.parentElement),ring:snap(img.parentElement.parentElement),
      copy:snap(img.closest('.zf-feature')?.querySelector('.zf-feature-copy')),feature:snap(img.closest('.zf-feature'))};
  });
  console.log('HERO_PHOTO_DEBUG ' + JSON.stringify(heroPhotoDebug));
  assert(heroPhotoDebug.photoSource && heroPhotoDebug.naturalWidth > 0 && heroPhotoDebug.image.width > 100 && heroPhotoDebug.wrapper.width > 100,
    'Zdjęcie wyróżnionej receptury nie wypełnia karty: ' + JSON.stringify(heroPhotoDebug));

  const semanticIcons = await page.evaluate(async () => {
    const mod = await import(new URL('views-detail.js', location.href).href);
    const paths = (name) => [...mod.ingredientGlyph(name).querySelectorAll('path')].map((p) => p.getAttribute('d') || '');
    return {
      basilKind: mod.ingredientKind('Świeża bazylia'),
      basilLeaf: paths('Świeża bazylia')[0]?.startsWith('M11 36 C9 17 24 8 38 10'),
      pepperKind: mod.ingredientKind('Papryka czerwona'),
      pepperShape: paths('Papryka czerwona')[0]?.startsWith('M22 12 C19 9 12 10 11 18'),
      powderKind: mod.ingredientKind('Papryka słodka'),
      powderShaker: paths('Papryka słodka')[0]?.startsWith('M16 16 H32 L30 41 H18 Z'),
      cinnamonKind: mod.ingredientKind('Cynamon'),
      cinnamonSticks: paths('Cynamon')[0]?.startsWith('M13 34 L31 12'),
      saltCrystals: paths('Sól morska')[0]?.startsWith('M16 18 H32 L30 40 H18 Z'),
      pepperMill: paths('Pieprz czarny')[0]?.startsWith('M20 9 H28 L30 15'),
    };
  });
  assert(semanticIcons.basilKind === 'vegetable' && semanticIcons.basilLeaf,
    'Bazylia nie ma już semantycznej kategorii zioła/liście.');
  assert(semanticIcons.pepperKind === 'vegetable' && semanticIcons.pepperShape,
    'Świeża papryka nie ma własnej ikony warzywa.');
  assert(semanticIcons.powderKind === 'spice' && semanticIcons.powderShaker,
    'Papryka słodka/mielona powinna zachować ikonę przyprawy.');
  assert(semanticIcons.cinnamonKind === 'spice' && semanticIcons.cinnamonSticks,
    'Cynamon powinien mieć osobną ikonę lasek cynamonu, a nie ogólny shaker.');
  assert(semanticIcons.saltCrystals && semanticIcons.pepperMill,
    'Sól i pieprz muszą mieć osobne, semantycznie czytelne ikony.');

  const artworkAudit = await page.evaluate(async () => {
    const art = await import(new URL('art.js', location.href).href);
    const kind = (name, category, explicit = 'food') => art.artKindFor({ name, category, art: explicit });
    return {
      tofu: kind('Tofu z czarnym pieprzem', 'cat-mieso'),
      duck: kind('Kaczka z czarnym pieprzem', 'cat-mieso'),
      noodles: kind('Kurczak Pad See Ew', 'cat-mieso'),
      friedRice: kind('Wok-fried rice z warzywami i jajkiem', 'cat-warzywa'),
      curry: kind('Zielone curry tajskie', 'cat-mieso', 'curry'),
      cocktail: kind('Aperol Spritz', 'cat-sosy-bazowe'),
      currywurst: kind('Currywurst', 'cat-mieso'),
    };
  });
  assert(artworkAudit.tofu === 'tofu', 'Tofu nadal dostaje przypadkową ilustrację z kategorii mięsa.');
  assert(artworkAudit.duck === 'duck', 'Kaczka nadal dostaje ilustrację steku wołowego.');
  assert(artworkAudit.noodles === 'pasta:asia', 'Pad See Ew nie używa wariantu azjatyckiego makaronu.');
  assert(artworkAudit.friedRice === 'rice', 'Smażony ryż nie używa ilustracji ryżu.');
  assert(artworkAudit.curry === 'curry', 'Curry nie używa dedykowanego motywu.');
  assert(artworkAudit.cocktail === 'cocktail', 'Nazwa koktajlu nie nadpisuje błędnej kategorii obrazu.');
  assert(artworkAudit.currywurst === 'sausage', 'Currywurst błędnie używa ilustracji curry zamiast kiełbasy.');
  const photoRouting = await page.evaluate(async () => {
    const photos = await import(new URL('food-photos.js', location.href).href);
    const key = (name, category) => photos.recipePhotoKey({ name, category });
    return {
      moscowMule: key('Moscow Mule', 'cat-cocktaile'),
      americano: key('Americano', 'cat-cocktaile'),
      mojito: key('Mojito', 'cat-cocktaile'),
      aperol: key('Aperol Spritz', 'cat-cocktaile'),
      baguette: key('Baguette', 'cat-pieczywo'),
      baguettePl: key('Bagietka francuska', 'cat-pieczywo'),
      sourdough: key('Chleb na zakwasie', 'cat-pieczywo'),
      tomatoSauce: key('Sos pomidorowy', 'cat-sosy'),
    };
  });
  assert(photoRouting.moscowMule === 'cocktail', 'Zdjęcie Moscow Mule musi pozostać przypisane do właściwego drinka.');
  assert(photoRouting.americano !== 'cocktail' && photoRouting.mojito !== 'cocktail',
    'Zdjęcie Moscow Mule nie może być używane dla Americano ani Mojito.');
  assert(photoRouting.aperol === 'aperol', 'Aperol Spritz powinien używać własnego zdjęcia.');
  assert(photoRouting.baguette === 'baguette' && photoRouting.baguettePl === 'baguette',
    'Baguette/Bagietka musi mieć dedykowane zdjęcie podłużnego chleba, nie bochenka na zakwasie.');
  assert(photoRouting.sourdough === 'sourdough', 'Chleb na zakwasie powinien zachować zdjęcie okrągłego bochenka.');
  assert(photoRouting.tomatoSauce !== 'cocktail', 'Sos pomidorowy nie może odziedziczyć zdjęcia koktajlu.');
  

  const localPhotoAudit = await page.evaluate(async () => {
    const names = ["food-aperol.jpg.b64","food-asian-noodles.jpg.b64","food-baba-ganoush.jpg.b64","food-babka-piaskowa.jpg.b64","food-bagel.jpg.b64","food-barszcz.jpg.b64","food-bbq-ribs.jpg.b64","food-beef-stew.jpg.b64","food-bibimbap.jpg.b64","food-bigos.jpg.b64","food-brownie.jpg.b64","food-bruschetta.jpg.b64","food-burger.jpg.b64","food-cake.jpg.b64","food-carbonara.jpg.b64","food-chicken-curry.jpg.b64","food-cocktail.jpg.b64","food-creme-brulee.jpg.b64","food-crepes.jpg.b64","food-curry-chickpea.jpg.b64","food-dessert.jpg.b64","food-focaccia.jpg.b64","food-fried-rice.jpg.b64","food-lasagna.jpg.b64","food-pasta-tomato.jpg.b64","food-pierogi.jpg.b64","food-pizza.jpg.b64","food-risotto.jpg.b64","food-salad.jpg.b64","food-salmon.jpg.b64","food-schnitzel.jpg.b64","food-seafood.jpg.b64","food-soup-clear.jpg.b64","food-soup-pumpkin.jpg.b64","food-soup-tomato.jpg.b64","food-soup.jpg.b64","food-sourdough.jpg.b64","food-baguette.jpg.b64","food-steak.jpg.b64"];
    return Promise.all(names.map(async (name) => {
      const response = await fetch(new URL(name, location.href));
      const body = response.ok ? (await response.text()).trim() : '';
      return { name, ok: response.ok, valid: body.startsWith('/9j/') && body.length > 1000 };
    }));
  });
  assert(localPhotoAudit.length === 39 && localPhotoAudit.every((item) => item.ok && item.valid),
    'Każde z 39 zdjęć musi być dostępne i zawierać poprawne dane JPEG: ' + JSON.stringify(localPhotoAudit.filter((item) => !item.ok || !item.valid)));
  const photoFirstStylesLoaded = await page.evaluate(() => Array.from(document.styleSheets).some((s) => s.href && s.href.includes('zarlok-v2.css')));
  assert(photoFirstStylesLoaded, 'Brak nowej warstwy graficznej foto-first.');

  const redesignStylesLoaded = await page.evaluate(() => Array.from(document.styleSheets).some((s) => s.href && s.href.includes('design-overhaul.css')));
  assert(redesignStylesLoaded, 'Brak przebudowanego układu Żarłoka 2.1.0.');
  const mobilePolishLoaded = await page.evaluate(() => {
    const link = document.querySelector('head link[href*="mobile-polish.css"]');
    return !!(link && link.sheet && link.sheet.cssRules && link.parentElement === document.head);
  });
  assert(mobilePolishLoaded, 'Arkusz mobile-polish.css musi być poprawnie załadowany w sekcji head.');

  await page.emulateMedia({ colorScheme: 'light' });
  const automaticLightTheme = await page.evaluate(() => {
    const root = document.documentElement;
    const previous = root.getAttribute('data-theme');
    root.setAttribute('data-theme', 'auto');
    const background = getComputedStyle(root).getPropertyValue('--z-bg').trim();
    if (previous === null) root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', previous);
    return background;
  });
  await page.emulateMedia({ colorScheme: 'dark' });
  assert(automaticLightTheme === '#f3eee7',
    'Motyw automatyczny nie przełącza nowego designu na jasny przy jasnym wyglądzie iOS: ' + automaticLightTheme);

  const designStylesLoaded = await page.evaluate(() => Array.from(document.styleSheets).some((s) => s.href && s.href.includes('claude-completion.css')));
  assert(designStylesLoaded, 'Brak pełnej warstwy stylu Claude / Liquid Glass.');

  const startBox = await box('.zf-head');
  const tabBox = await box('#tabbar');
  assert(startBox.width > 300, 'Nagłówek Start jest za wąski.');
  const tabMetrics = await page.evaluate(() => {
    const bar = document.querySelector('#tabbar');
    const rect = bar.getBoundingClientRect();
    const style = getComputedStyle(bar);
    const tabs = [...bar.querySelectorAll('.tab')];
    const icons = tabs.map((tab) => tab.querySelector('.tab-ico')?.getBoundingClientRect());
    return {
      viewport: innerWidth,
      x: rect.x, y: rect.y, width: rect.width, height: rect.height,
      bottomGap: innerHeight - rect.bottom,
      centerError: Math.abs((rect.left + rect.right) / 2 - innerWidth / 2),
      firstIconShiftX: (() => {
        const svg = bar.querySelector('.tab:nth-child(1) .tab-ico svg');
        if (!svg) return null;
        const transform = getComputedStyle(svg).transform;
        return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m41;
      })(),
      leftGap: rect.left,
      rightGap: innerWidth - rect.right,
      radius: style.borderRadius,
      backgroundColor: style.backgroundColor,
      position: style.position,
      tabs: tabs.length,
      activeMarkerDisplay: getComputedStyle(tabs.find((tab) => tab.classList.contains('on')) || bar.querySelector('.tab'), '::after').display,
      activeTabTransform: getComputedStyle(tabs.find((tab) => tab.classList.contains('on')) || bar.querySelector('.tab')).transform,
      iconsInside: icons.every((icon) => icon && icon.left >= rect.left && icon.right <= rect.right && icon.top >= rect.top && icon.bottom <= rect.bottom),
      widths: tabs.map((tab) => tab.getBoundingClientRect().width),
    };
  });
  assert(tabBox.height >= 50 && tabBox.height <= 120, 'Dolna nawigacja ma nieprawidłową wysokość: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.position === 'relative' && tabMetrics.width >= tabMetrics.viewport - 2 && Math.abs(tabMetrics.x) <= 1 && tabMetrics.centerError <= 2 && Math.abs(tabMetrics.leftGap) <= 1 && Math.abs(tabMetrics.rightGap) <= 1,
    'Dolna nawigacja powinna zajmować szerokość ekranu i uczestniczyć w układzie, zamiast przykrywać listę: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.backgroundColor.includes('0.95') || tabMetrics.backgroundColor.includes('0.97'),
    'Dolna nawigacja jest zbyt przezroczysta i przepuszcza tekst/karty spod spodu: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.bottomGap >= -1 && tabMetrics.bottomGap <= 2,
    'Dolna nawigacja nie jest osadzona na dole układu: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.tabs === 6 && tabMetrics.widths.every((w) => w >= 45) && tabMetrics.iconsInside,
    'Ikony lub zakładki dolnej nawigacji są ściśnięte albo wychodzą poza pasek: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.firstIconShiftX !== null && Math.abs(tabMetrics.firstIconShiftX) <= 0.1,
    'Pierwsza ikona dolnego paska jest przesunięta poza optyczny środek: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.activeMarkerDisplay === 'none',
    'Aktywna zakładka ma odziedziczony marker/kropkę, która psuje wyrównanie: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.activeTabTransform === 'none',
    'Cała aktywna zakładka nie może skakać podczas przejść stanów: ' + JSON.stringify(tabMetrics));

  // Ustawienie podpisów zakładek musi działać w obu stanach; stare reguły CSS
  // wcześniej wymuszały display:block nawet przy data-tablabels="off".
  const tabLabelStates = await page.evaluate(() => {
    const root = document.documentElement;
    const old = root.getAttribute('data-tablabels');
    const labels = [...document.querySelectorAll('#tabbar .tab .tab-label')];
    root.setAttribute('data-tablabels', 'off');
    const hiddenWhenOff = labels.length === 6 && labels.every((el) => getComputedStyle(el).display === 'none');
    root.setAttribute('data-tablabels', 'on');
    const shownWhenOn = labels.length === 6 && labels.every((el) => getComputedStyle(el).display !== 'none');
    const bar = document.querySelector('#tabbar').getBoundingClientRect();
    const labelsInsideBar = labels.every((el) => {
      const r = el.getBoundingClientRect();
      return r.left >= bar.left - 1 && r.right <= bar.right + 1;
    });
    if (old === null) root.removeAttribute('data-tablabels');
    else root.setAttribute('data-tablabels', old);
    return { hiddenWhenOff, shownWhenOn, labelsInsideBar, count: labels.length };
  });
  assert(tabLabelStates.hiddenWhenOff && tabLabelStates.shownWhenOn && tabLabelStates.labelsInsideBar,
    'Podpisy zakładek nie respektują ustawienia lub wychodzą poza pasek: ' + JSON.stringify(tabLabelStates));

  const tabCentering = await page.evaluate(() => {
    const bar = document.querySelector('#tabbar').getBoundingClientRect();
    return [...document.querySelectorAll('#tabbar .tab')].map((tab) => {
      const icon = tab.querySelector('.tab-ico').getBoundingClientRect();
      return Math.abs((icon.left + icon.right) / 2 - (tab.getBoundingClientRect().left + tab.getBoundingClientRect().right) / 2);
    });
  });
  assert(tabCentering.length === 6 && tabCentering.every((n) => n <= 1.5),
    'Ikony zakładek nie są wycentrowane we własnych polach: ' + JSON.stringify(tabCentering));

  const tapTarget = page.locator('#tabbar .tab[data-tab="recipes"]');
  const tapBox = await tapTarget.boundingBox();
  await page.mouse.move(tapBox.x + tapBox.width / 2, tapBox.y + tapBox.height / 2);
  await page.mouse.down();
  const pressTransforms = await tapTarget.evaluate((el) => ({
    tab: getComputedStyle(el).transform,
    icon: getComputedStyle(el.querySelector('.tab-ico')).transform,
  }));
  await page.mouse.move(2, 2); // release poza linkiem, żeby nie nawigować podczas testu :active
  await page.mouse.up();
  assert(pressTransforms.tab === 'none' && pressTransforms.icon !== 'none',
    'Naciśnięcie nawigacji powinno animować tylko kapsułę ikony, bez przesuwania całej zakładki: ' + JSON.stringify(pressTransforms));
  await shot('01-start.png');

  // Responsive overflow sweep: horizontal rails may scroll internally, but the page itself must not widen.
  for (const width of [375, 390, 932]) {
    await page.setViewportSize({ width, height: width === 932 ? 430 : 844 });
    await page.waitForTimeout(100);
    await assertNoPageOverflow('Start @ ' + width + 'px');
  }
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto(base + '#/recipes', { waitUntil: 'domcontentloaded' });
  await ready();
  await dismissWhatsNew();
  const grid = await box('.rgrid, .rail');
  assert(grid.width > 300, 'Lista/siatka receptur nie zajmuje prawidłowej szerokości.');

  for (const width of [375, 390, 932]) {
    await page.setViewportSize({ width, height: width === 932 ? 430 : 844 });
    await page.waitForTimeout(100);
    await assertNoPageOverflow('Receptury @ ' + width + 'px');
  }
  await page.setViewportSize({ width: 390, height: 844 });

  // Capture and assert the exact screen affected by the recipe search/filter styling.
  const recipeUi = await page.evaluate(() => {
    const box = document.querySelector('.topbar .searchbox');
    const input = document.querySelector('.topbar .search-input');
    const chip = document.querySelector('.topbar .chips .chip.on');
    if (!box || !input || !chip) return null;
    const bs = getComputedStyle(box);
    const ins = getComputedStyle(input);
    const cs = getComputedStyle(chip);
    return {
      radius: parseFloat(bs.borderTopLeftRadius),
      inputBorder: parseFloat(ins.borderTopWidth),
      inputBackground: ins.backgroundColor,
      chipColor: cs.color,
      searchboxWidth: box.getBoundingClientRect().width
    };
  });
  assert(recipeUi, 'Brakuje wyszukiwarki lub aktywnego filtra na liście receptur.');
  assert(recipeUi.radius >= 16, 'Pole wyszukiwania nie ma zaokrąglonego kształtu: ' + JSON.stringify(recipeUi));
  assert(recipeUi.inputBorder === 0, 'Wyszukiwarka ma dodatkową ramkę wewnątrz szklanego kontenera: ' + JSON.stringify(recipeUi));
  const updateNoticeLayout = await page.evaluate(() => {
    const header = document.querySelector('.screen .topbar');
    if (!header) return null;
    const before = parseFloat(getComputedStyle(header).paddingTop);
    document.body.classList.add('has-update-notice');
    const reserved = parseFloat(getComputedStyle(header).paddingTop);
    document.body.classList.remove('has-update-notice');
    return { before, reserved, extra: reserved - before };
  });
  assert(updateNoticeLayout && updateNoticeLayout.extra >= 50,
    'Powiadomienie o aktualizacji nie rezerwuje miejsca nad wyszukiwarką: ' + JSON.stringify(updateNoticeLayout));
  const chipRgb = (recipeUi.chipColor.match(/\d+/g) || []).slice(0, 3).map(Number);
  assert(chipRgb.length === 3 && chipRgb[0] > 180 && chipRgb[1] > 150,
    'Aktywny filtr ma zbyt ciemny tekst zamiast jasnego kontrastu: ' + JSON.stringify(recipeUi));
  const recipeComposition = await page.evaluate(() => {
    const frame = document.querySelector('.recipes .rtile-img');
    const image = frame?.querySelector('img');
    const scroll = document.querySelector('.recipes .scroll');
    const bar = document.querySelector('#tabbar');
    const frameRect = frame?.getBoundingClientRect();
    const barRect = bar?.getBoundingClientRect();
    const scrollRect = scroll?.getBoundingClientRect();
    const scrollStyle = scroll ? getComputedStyle(scroll) : null;
    const ratio = frameRect && frameRect.height ? frameRect.width / frameRect.height : 0;
    const vv = window.visualViewport;
    const active = document.activeElement;
    const editing = active instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName);
    return {
      imageRatio: ratio,
      imageAnimation: image ? getComputedStyle(image).animationName : '',
      scrollBottomPadding: scrollStyle ? parseFloat(scrollStyle.paddingBottom) : 0,
      scrollDockGap: scrollRect && barRect ? barRect.top - scrollRect.bottom : null,
      dockHeight: barRect ? barRect.height : 0,
      dockBottomGap: barRect ? innerHeight - barRect.bottom : 0,
      keyboardClass: document.body.classList.contains('kb-open'),
      keyboardActuallyVisible: !!(editing && vv && innerHeight - vv.height > 140),
    };
  });
  assert(recipeComposition.imageRatio > 1.25 && recipeComposition.imageRatio < 1.42,
    'Zdjęcia receptur nie mają wspólnego, lekko poziomego kadru 4:3: ' + JSON.stringify(recipeComposition));
  assert(recipeComposition.imageAnimation === 'none',
    'Miniatury receptur nie powinny rozmywać się podczas ładowania: ' + JSON.stringify(recipeComposition));
  assert(recipeComposition.scrollBottomPadding >= 16 && recipeComposition.scrollBottomPadding <= 80,
    'Lista ma nieprawidłowy margines końcowy po przeniesieniu docka do układu: ' + JSON.stringify(recipeComposition));
  assert(recipeComposition.scrollDockGap !== null && recipeComposition.scrollDockGap >= -1 && recipeComposition.scrollDockGap <= 2,
    'Dolny dock nadal nachodzi na obszar przewijania receptur: ' + JSON.stringify(recipeComposition));
  assert(recipeComposition.dockHeight >= 50 && recipeComposition.dockHeight <= 120 &&
    recipeComposition.dockBottomGap >= -1 && recipeComposition.dockBottomGap <= 2,
    'Dolny dock ma nieprawidłowe wymiary albo położenie: ' + JSON.stringify(recipeComposition));
  assert(!recipeComposition.keyboardClass || recipeComposition.keyboardActuallyVisible,
    'Stan klawiatury iOS pozostał aktywny, mimo że klawiatura nie jest otwarta: ' + JSON.stringify(recipeComposition));
  await shot('02-recipes-list.png');

  const recipeLinks = await page.locator('a[href^="#/recipe/"]').evaluateAll((els) =>
    [...new Set(els.map((el) => el.getAttribute('href')))].slice(0, 20));
  assert(recipeLinks.length > 0, 'Brak receptury testowej.');
  let selectedRecipe = null;
  let typedIngredientIcons = 0;
  for (const href of recipeLinks) {
    // Change route inside the SPA; do not reload the entire app for every candidate.
    await page.evaluate((target) => { location.hash = target; }, href);
    await page.waitForFunction((target) => location.hash === target, href, { timeout: 5000 });
    await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });
    await page.waitForTimeout(150);
    await dismissWhatsNew();
    typedIngredientIcons = await page.locator('.orb-dot[data-kind]').count();
    if (typedIngredientIcons > 0) { selectedRecipe = href; break; }
  }
  assert(selectedRecipe, 'Nie znaleziono receptury z ikonami składników do testu.');
  assert(await page.locator('.orb-dot[data-kind] svg').count() > 0, 'Łuk składników nie renderuje ikon wektorowych.');
  assert(await page.locator('.orb-dot[data-kind] svg').first().evaluate((el) => el.namespaceURI) === 'http://www.w3.org/2000/svg', 'Ikony na łuku muszą używać przestrzeni nazw SVG.');
  const hero = await box('.detail-hero');
  const orbit = await box('.orbit');
  assert(hero.width > 300, 'Hero receptury ma nieprawidłową szerokość.');
  assert(orbit.width > 300, 'Łuk składników ma nieprawidłową szerokość.');
  await shot('02-recipe.png');

  const more = page.locator('.orb-more').first();
  assert(await more.count(), 'Brak przycisku „więcej”.');
  await more.click();
  await page.waitForTimeout(250);

  const modal = await box('.recipe-full-modal');
  const modalFacts = await page.locator('.recipe-modal-facts').innerText();
  assert(modalFacts.includes('1 porcja'), 'Receptura nie otwiera się domyślnie na jedną porcję.');
  assert(modal.width >= 330 && modal.width <= 390, 'Modal pełnej receptury ma nieprawidłową szerokość.');
  assert(await page.locator('.recipe-modal-ing-icon[data-kind]').count() > 0, 'Brak ikon składników z kolorami semantycznymi w pełnej recepturze.');
  assert(await page.locator('.recipe-modal-ing-icon svg').count() > 0, 'Ikony składników nie są renderowane jako wektorowe grafiki SVG.');
  assert(await page.locator('.recipe-modal-ing-icon svg').first().evaluate((el) => el.namespaceURI) === 'http://www.w3.org/2000/svg', 'Ikony pełnej receptury muszą używać przestrzeni nazw SVG.');
  const ingredientIconRadius = await page.locator('.recipe-modal-ing-icon').first().evaluate((el) => getComputedStyle(el).borderRadius);
  assert(['13px', '14px'].includes(ingredientIconRadius), 'Warstwa Liquid Glass nie wystylowała ikon składników.');
  await shot('03-full-recipe.png');

  const modalScroll = await page.locator('.recipe-full-modal .scroll').first().evaluate((el) => ({
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
  })).catch(() => null);
  if (modalScroll) assert(modalScroll.scrollHeight >= modalScroll.clientHeight, 'Modal ma uszkodzony obszar przewijania.');
  // Additional mobile surfaces: design QA must cover the whole app, not only Start.
  async function captureSurface(path, name, label) {
    await page.goto(base + '#' + path, { waitUntil: 'domcontentloaded' });
    await ready();
    await page.waitForTimeout(350);
    await dismissWhatsNew();
    assert(await page.locator('#view .screen').count(), label + ': ekran nie został wyrenderowany.');
    await assertNoPageOverflow(label);
    await shot(name);
  }
  await captureSurface('/calc', '04-calculators.png', 'Kalkulatory');
  await captureSurface('/cook', '05-cook-entry.png', 'Gotuję');
  await captureSurface('/inventory', '06-inventory.png', 'Magazyn');
  assert(await page.locator('.inventory-head-actions .iconbtn svg path').count() > 0, 'Przyciski Magazynu nie mają widocznych ikon SVG.');
  await captureSurface('/more', '07-more.png', 'Więcej');
  await captureSurface('/shopping', '08-shopping.png', 'Zakupy');
  await captureSurface('/search', '09-search.png', 'Wyszukiwanie');
  await captureSurface('/settings', '10-settings.png', 'Ustawienia');
  await captureSurface('/categories', '11-category-tiles.png', 'Kategorie');
  assert(await page.locator('.category-tile-grid').count() === 1, 'Brak siatki kafelków kategorii.');
  assert(await page.locator('.category-tile').count() >= 4, 'Ekran kategorii powinien pokazywać co najmniej cztery skróty.');
  const categoryIconAudit = await page.evaluate(() => ({
    total: document.querySelectorAll('.category-tile-icon').length,
    svg: document.querySelectorAll('.category-tile-icon svg').length,
    emojiOnly: [...document.querySelectorAll('.category-tile-icon')].filter((el) => !el.querySelector('svg')).length,
  }));
  assert(categoryIconAudit.total > 0 && categoryIconAudit.svg === categoryIconAudit.total && categoryIconAudit.emojiOnly === 0,
    'Kafelki kategorii muszą używać spójnych ikon SVG, a nie mieszaniny emoji i ikon: ' + JSON.stringify(categoryIconAudit));
  const categoryGridMetrics = await page.locator('.category-tile-grid').evaluate((el) => {
    const grid = el.getBoundingClientRect();
    const tiles = [...el.querySelectorAll('.category-tile')].slice(0, 2).map((t) => t.getBoundingClientRect());
    return { width: grid.width, columns: getComputedStyle(el).gridTemplateColumns, tiles };
  });
  assert(categoryGridMetrics.tiles.length === 2 && categoryGridMetrics.tiles[0].width > 130 &&
    categoryGridMetrics.tiles[0].left < categoryGridMetrics.tiles[1].left,
    'Kafelki kategorii nie układają się w czytelne dwie kolumny: ' + JSON.stringify(categoryGridMetrics));
  const categorySearch = page.getByRole('searchbox', { name: 'Szukaj kategorii' });
  await categorySearch.fill('Wszystkie');
  assert(await page.locator('.category-tile').count() === 1, 'Wyszukiwanie kategorii nie filtruje kafelków.');
  await page.locator('.category-tile').click();
  await page.waitForFunction(() => location.hash === '#/recipes', null, { timeout: 5000 });
  await page.waitForSelector('.recipes', { state: 'visible', timeout: 5000 });
  assert(await page.locator('.recipes').count() === 1, 'Kafelek „Wszystkie receptury” nie wraca do listy receptur.');
  await assertNoPageOverflow('Kategorie');

  await page.goto(base + '#/recipes', { waitUntil: 'domcontentloaded' });
  await ready();
  await dismissWhatsNew();
  const cookingRecipe = page.locator('a[href^="#/recipe/"]').first();
  assert(await cookingRecipe.count(), 'Brak receptury do testu widoku gotowania.');
  await cookingRecipe.click();
  await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });
  await page.getByRole('button', { name: 'GOTUJĘ' }).first().click();
  await page.waitForTimeout(250);
  assert(await page.locator('.guide').count(), 'Nie otworzył się widok prowadzenia gotowania.');
  const guideServings = await page.locator('.guide .stepper-val').innerText();
  assert(guideServings.includes('1') && guideServings.includes('porcja'), 'Tryb prowadzenia nie startuje na jedną porcję.');
  const enabledSpeak = page.getByRole('button', { name: 'Zatrzymaj czytanie kroków na głos' });
  if (await enabledSpeak.count()) {
    await enabledSpeak.click();
    await page.getByRole('button', { name: 'Włącz czytanie kroków na głos' }).waitFor({ state: 'visible', timeout: 1500 });
  }
  await page.getByRole('button', { name: 'Zaczynamy', exact: true }).click();
  await page.locator('.guide-speech-actions').waitFor({ state: 'visible', timeout: 5000 });
  const readCurrentStep = page.getByRole('button', { name: 'Czytaj ten krok', exact: true });
  const stopReading = page.getByRole('button', { name: 'Zatrzymaj czytanie', exact: true });
  assert(await readCurrentStep.count() === 1 && await stopReading.count() === 1,
    'W trybie gotowania brakuje przycisków czytania i zatrzymania kroku.');
  await readCurrentStep.click();
  await page.waitForFunction(() => window.__speechLog.spoken > 0, null, { timeout: 1500 });
  const spokenBeforeStop = await page.evaluate(() => window.__speechLog.spoken);
  const cancelledBeforeStop = await page.evaluate(() => window.__speechLog.cancelled);
  await stopReading.click();
  await page.waitForFunction((n) => window.__speechLog.cancelled > n, cancelledBeforeStop, { timeout: 1500 });
  assert(await page.getByRole('button', { name: 'Włącz czytanie kroków na głos' }).count() === 1,
    'Zatrzymanie czytania nie wyłączyło automatycznego czytania następnych kroków.');
  await page.locator('.guide-next').click();
  await page.waitForTimeout(100);
  assert(await page.evaluate(() => window.__speechLog.spoken) === spokenBeforeStop,
    'Po zatrzymaniu głosu kolejny krok został automatycznie odczytany.');
  await assertNoPageOverflow('Gotowanie');
  await shot('11-cooking.png');

} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: mobile visual regression smoke');
