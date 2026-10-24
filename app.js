/* ==========================================================================
   app.js — start aplikacji: baza, ustawienia, motyw, nawigacja dolna,
   obsługa klawiatury iOS (visualViewport), trasy, service worker.
   ========================================================================== */
import { openDB } from './db.js';
import { loadAll, state, subscribe, getSetting, DEFAULT_SETTINGS, DEFAULT_CATEGORIES } from './recipes.js';
import { h, icon, toast, $, openSheet } from './ui.js';
import { APP_VERSION } from './util.js';
import { CHANGELOG } from './changelog.js';
import { setSetting } from './recipes.js';
import { route, startRouter, navigate } from './router.js';
import { registerSW, requestPersist } from './pwa.js';
import { mountTimerPill, initTimers, openTimersSheet } from './timers.js';

import { startView } from './views-start.js';
import { recipesView, categoriesView, resetRecipeFilters } from './views-recipes.js';
import { detailView } from './views-detail.js';
import { editorView } from './views-editor.js';
import { cookView } from './views-cook.js';
import { cookEntryView } from './views-cook-home.js';
import { calcView } from './views-calc.js';
import { shoppingView, pendingCount } from './shopping.js';
import { importView } from './views-import.js';
import { settingsView } from './views-settings.js';
import { guideView } from './views-guide.js';
import { searchView } from './views-search.js';
import { inventoryView } from './inventory.js';
import { moreView } from './views-more.js';

const root = document.documentElement;

/* ---------- Motyw, tryb, rozmiary ---------- */

const BG = { light: '#f1f0ed', dark: '#1d1d1f' };
const dark = matchMedia('(prefers-color-scheme: dark)');

function applyAppearance() {
  const theme = getSetting('theme'), tap = getSetting('tapSize'), ts = getSetting('textScale'), glass = getSetting('glass');
  root.setAttribute('data-theme', theme);
  root.setAttribute('data-tap', tap);
  root.style.setProperty('--ts', String((ts || 100) / 100));
  root.setAttribute('data-tablabels', getSetting('tabLabels') ? 'on' : 'off');
  root.style.setProperty('--glass', String(Math.min(100, Math.max(0, glass == null ? 70 : glass)) / 100));
  try {
    localStorage.setItem('k:theme', theme);
    localStorage.setItem('k:tap', tap); localStorage.setItem('k:ts', String(ts)); localStorage.setItem('k:glass', String(glass)); localStorage.setItem('k:tl', getSetting('tabLabels') ? 'on' : 'off');
  } catch (_) { /* tryb prywatny */ }
  // Kolor paska systemowego zgodny z faktycznie wybranym motywem (nie tylko z systemowym).
  const eff = theme === 'auto' ? (dark.matches ? 'dark' : 'light') : theme;
  const color = BG[eff];
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => { m.setAttribute('content', color); m.removeAttribute('media'); });
}
dark.addEventListener && dark.addEventListener('change', () => { if (getSetting('theme') === 'auto') applyAppearance(); });

/* ---------- Dolna nawigacja ---------- */

const TABS = [
  ['start', 'Start', 'home', '/'],
  ['recipes', 'Receptury', 'book', '/recipes'],
  ['categories', 'Kategorie', 'grid', '/categories'],
  ['cook', 'Gotuję', 'pot', '/cook'],
  ['inventory', 'Magazyn', 'fridge', '/inventory'],
  ['more', 'Więcej', 'more', '/more'],
];

function buildTabbar() {
  const bar = $('#tabbar');
  bar.replaceChildren(...TABS.map(([id, label, ico, path]) => {
    const a = h('a', { href: '#' + path, class: 'tab', dataset: { tab: id }, 'aria-label': label,
      onClick: (e) => { e.preventDefault(); if (id === 'recipes') resetRecipeFilters(); navigate(path, { replace: true }); } },
      h('span', { class: 'tab-ico' }, icon(ico, 24), id === 'shopping' ? h('span', { class: 'badge', id: 'cart-badge', hidden: true }) : null),
      h('span', { class: 'tab-label' }, label));
    return a;
  }));
  updateBadge();
}

function updateBadge() {
  const b = $('#cart-badge');
  if (!b) return;
  const n = pendingCount();
  b.textContent = n > 99 ? '99+' : String(n);
  b.hidden = n === 0;
  const a = $('.tab[data-tab="shopping"]');
  if (a) a.setAttribute('aria-label', n ? `Zakupy, do kupienia: ${n}` : 'Zakupy');
}

function setActiveTab(meta) {
  document.body.classList.toggle('no-tabs', meta.tabs === false);
  document.querySelectorAll('.tab').forEach((t) => {
    const on = t.dataset.tab === meta.tab;
    t.classList.toggle('on', on);
    if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
  });
}

/* ---------- Klawiatura ekranowa i rozmiar widoku (iOS) ---------- */

function watchViewport() {
  const vv = window.visualViewport;
  const update = () => {
    if (!vv) {
      document.body.classList.remove('kb-open');
      root.style.removeProperty('--app-h');
      root.style.removeProperty('--vv-top');
      return;
    }
    // iOS może raportować zmniejszony visualViewport także po schowaniu klawiatury.
    // Uznawaj klawiaturę za otwartą tylko wtedy, gdy fokus nadal jest w polu edycji.
    const active = document.activeElement;
    const editing = active instanceof HTMLElement &&
      /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName) &&
      !active.hasAttribute('readonly') &&
      !active.hasAttribute('disabled');
    const viewportGap = window.innerHeight - vv.height;
    const kb = editing && viewportGap > 140;
    document.body.classList.toggle('kb-open', kb);
    if (kb) {
      root.style.setProperty('--app-h', vv.height + 'px');
      root.style.setProperty('--vv-top', vv.offsetTop + 'px');
    } else {
      root.style.removeProperty('--app-h');
      root.style.removeProperty('--vv-top');
    }
  };
  if (vv) { vv.addEventListener('resize', update); vv.addEventListener('scroll', update); }
  window.addEventListener('orientationchange', () => setTimeout(update, 250));
  window.addEventListener('resize', update);
  // Pole, w którym piszemy, zawsze ma być widoczne nad klawiaturą.
  document.addEventListener('focusin', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement) || !/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    setTimeout(() => { try { t.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (_) { /* */ } }, 320);
  });
  // Po zamknięciu klawiatury Safari nie zawsze wysyła resize; czyść stan po blur.
  document.addEventListener('focusout', () => setTimeout(update, 80));
  // Safari↔aplikacja: po powrocie odśwież wymiary.
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') setTimeout(update, 100); });
  window.addEventListener('pageshow', () => setTimeout(update, 50));
  update();
}

/* ---------- Offline ---------- */

function watchNetwork() {
  const set = () => root.classList.toggle('offline', !navigator.onLine);
  window.addEventListener('offline', () => { set(); toast('Brak sieci — aplikacja działa normalnie offline'); });
  window.addEventListener('online', () => { set(); toast('Połączenie wróciło'); });
  set();
}

/* ---------- Trasy ---------- */

route('/', () => startView(), { tab: 'start' });
route('/recipes', (p, q) => recipesView(q), { tab: 'recipes' });
route('/categories', () => categoriesView(), { tab: 'categories' });
route('/recipe/:id', (p) => detailView(p), { tab: 'recipes' });
route('/edit/:id', (p) => editorView(p), { tab: 'recipes', tabs: false });
route('/new', (p, q) => editorView({ id: null }, q), { tab: 'recipes', tabs: false });
route('/cook', () => cookEntryView(), { tab: 'cook' });
route('/cook/:id', (p) => cookView(p), { tab: 'cook', tabs: false });
route('/guide/:id', (p) => guideView(p), { tab: 'cook', tabs: false });
route('/search', (p, q) => searchView(q), { tab: 'more' });
route('/import', (p, q) => importView(q), { tab: 'more' });
route('/calc', () => calcView({}), { tab: 'more' });
route('/calc/:kind', (p, q) => calcView(p, q), { tab: 'more' });
route('/shopping', () => shoppingView(), { tab: 'more' });
route('/inventory', () => inventoryView(), { tab: 'inventory' });
route('/settings', () => settingsView(), { tab: 'more' });
route('/more', () => moreView(), { tab: 'more' });

/* ---------- Start ---------- */

function fatal(err) {
  console.error(err);
  $('#view').classList.remove('boot-shell');
  $('#view').replaceChildren(h('div', { class: 'screen' }, h('div', { class: 'scroll' }, h('div', { class: 'content' },
    h('div', { class: 'empty' }, h('div', { class: 'empty-emoji' }, '⚠️'), h('h2', null, 'Nie mogę otworzyć bazy danych'),
      h('p', { class: 'muted' }, 'Żarłok zapisuje dane lokalnie (IndexedDB). Sprawdź, czy przeglądarka nie działa w trybie prywatnym ani nie blokuje pamięci witryny, i uruchom ponownie.'),
      h('p', { class: 'muted small' }, String(err && err.message || err)))))));
}

let whatsNewOpened = false;
function whatsNew() {
  // WebKit can finish more than one startup hydration path; show this release sheet once per page.
  if (whatsNewOpened || getSetting('seenVersion') === APP_VERSION || document.querySelector('.overlay')) return;
  whatsNewOpened = true;
  const release = CHANGELOG[APP_VERSION];
  const items = release && Array.isArray(release.items) && release.items.length
    ? release.items
    : ['Brakuje wpisu w dzienniku zmian dla tej wersji.'];
  openSheet({
    title: `Co nowego w ${APP_VERSION}`, variant: 'sheet',
    body: h('div', { class: 'stack' },
      release && release.intro ? h('p', { class: 'muted small' }, release.intro) : null,
      h('ul', { class: 'whatsnew' }, ...items.map((t) => h('li', null, t))),
      h('p', { class: 'muted small' }, release && release.footer
        ? release.footer
        : 'Opis tej wersji nie został jeszcze uzupełniony.')),
    actions: [{ label: 'Zaczynamy', kind: 'primary' }],
    onClose: () => setSetting('seenVersion', APP_VERSION),
  });
}

async function boot() {
  // Pierwszy render nie zależy od IndexedDB. To jest ważne na iOS, gdzie
  // otwarcie/odczyt dużej bazy może potrwać wyraźnie dłużej niż render UI.
  state.settings = { ...DEFAULT_SETTINGS };
  state.categories = [...DEFAULT_CATEGORIES];
  state.ready = false;

  subscribe((type) => {
    if (type === 'settings') applyAppearance();
    if (type === 'shopping') updateBadge();
  });

  applyAppearance();
  buildTabbar();
  watchViewport();
  watchNetwork();
  startRouter($('#view'), (path, meta) => { setActiveTab(meta); updateBadge(); });

  const viewEl = $('#view');
  if (viewEl) viewEl.classList.remove('boot-shell');

  mountTimerPill($('#app'), openTimersSheet);
  initTimers();
  requestPersist();
  // SW rejestruje się równolegle ze startem. Nie blokuje pierwszego renderu ani IndexedDB.
  registerSW().catch((e) => console.warn('Nie udało się uruchomić trybu PWA/offline:', e));
  window.__kucharzyna = { state, ready: false };

  // Hydratacja bazy w tle. Start jest już widoczny i interaktywny.
  try {
    await openDB();
    await loadAll();
    if ((getSetting('designV') || 0) < 2) {
      await setSetting('theme', 'dark');
      await setSetting('designV', 2);
    }
    applyAppearance();
    window.__kucharzyna.ready = true;
    setTimeout(whatsNew, 900);
  } catch (e) {
    // Safari/WebKit can occasionally reject the first IndexedDB open during startup.
    // Retry once without touching/deleting user data.
    try {
      await new Promise((resolve) => setTimeout(resolve, 120));
      await openDB();
      await loadAll();
      applyAppearance();
      window.__kucharzyna.ready = true;
      setTimeout(whatsNew, 900);
    } catch (retryError) {
      fatal(retryError);
      window.__kucharzyna.ready = false;
    }
  }
}

boot();
