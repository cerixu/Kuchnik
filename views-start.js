/* ==========================================================================
   views-start.js — Żarłok / ekran główny v1.3
   Minimalistyczny hub. Język wizualny odpowiada ekranowi receptury:
   dużo powietrza, okrągłe zdjęcia, cienkie linie, małe akcenty kolorystyczne.
   ========================================================================== */
import { h, icon, iconBtn, screen, emptyState, button } from './ui.js';
import { navigate } from './router.js';
import { state, subscribe, listRecipes } from './recipes.js';
import { recipeTile, catTile, sectionHead, metaLine } from './components.js';
import { pendingCount } from './shopping.js';
import { db } from './db.js';
import { backupDue, daysSinceBackup } from './backup.js';
import { recipeArtUrl, recipeArtFallbackUrl } from './art.js';
import { attachRecipePhoto, hasFoodPhoto } from './food-photos.js';

const plural = (n) => n === 1 ? '1 receptura' :
  (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? n + ' receptury' : n + ' receptur');

const ACTIONS = [
  { label: 'Receptury', note: 'Cała książka', icon: 'book', tint: 'lime', path: '/recipes', primary: true },
  { label: 'Nowa receptura', note: 'Od pustej kartki', icon: 'plus', tint: 'coral', path: '/new' },
  { label: 'Gotuję', note: 'Zacznij gotowanie', icon: 'pot', tint: 'violet', path: '/cook' },
  { label: 'Magazyn', note: 'Stany, straty i koszty', icon: 'fridge', tint: 'cyan', path: '/inventory' },
  { label: 'Zakupy', note: 'Lista zakupów', icon: 'cart', tint: 'blue', path: '/shopping' },
  { label: 'Ulubione', note: 'Twoje pewniaki', icon: 'heart', tint: 'pink', path: '/recipes?f=fav' },
];

function actionRow(a, badge = 0) {
  return h('a', {
    class: 'zf-action' + (a.primary ? ' is-primary' : ''),
    href: '#' + a.path,
    style: { '--item-tint': 'var(--zf-' + a.tint + ')' },
    onClick: (e) => { e.preventDefault(); navigate(a.path); },
    'aria-label': a.label,
  },
    h('span', { class: 'zf-action-icon' }, icon(a.icon, 21),
      badge ? h('span', { class: 'zf-badge' }, badge > 99 ? '99+' : String(badge)) : null),
    h('span', { class: 'zf-action-copy' },
      h('strong', null, a.label),
      h('small', null, a.note)),
    h('span', { class: 'zf-action-go', 'aria-hidden': 'true' }, icon('right', 17))
  );
}

function featureRecipe(r) {
  if (!r) return h('div', { class: 'zf-feature-empty' }, icon('chef', 34), h('span', null, 'Dodaj pierwszą recepturę'));
  const custom = r.thumb || r.photo;
  const img = h('img', {
    class: custom ? '' : 'art',
    src: custom || recipeArtUrl(r),
    alt: 'Zdjęcie: ' + (r.name || 'receptura'),
    loading: 'eager',
    decoding: 'async',
    onError: (e) => {
      const el = e.currentTarget;
      if (el.dataset.artFallback) return;
      el.dataset.artFallback = '1';
      el.classList.add('art');
      el.src = recipeArtFallbackUrl(r);
    },
  });
  if (!custom) attachRecipePhoto(img, r);
  return h('a', {
    class: 'zf-feature',
    href: '#/recipe/' + encodeURIComponent(r.id),
    onClick: (e) => { e.preventDefault(); navigate('/recipe/' + encodeURIComponent(r.id)); },
    'aria-label': 'Otwórz recepturę: ' + r.name,
  },
    h('div', { class: 'zf-feature-ring' },
      h('div', { class: 'zf-feature-img' }, img)),
    h('div', { class: 'zf-feature-copy' },
      h('span', { class: 'zf-kicker' }, 'POLECANE NA DZIŚ'),
      h('h2', null, r.name || 'Bez nazwy'),
      h('p', null, metaLine(r) || 'Twoja receptura'),
      h('span', { class: 'zf-feature-open' }, 'Otwórz przepis', icon('right', 16)))
  );
}

export function startView() {
  const s = screen({
    title: 'Żarłok',
    left: h('span', { class: 'nav-spacer' }),
    right: iconBtn('search', 'Szukaj', () => navigate('/search')),
    cls: 'start-final',
    large: 'hero',
  });

  const c = s.content;
  let unsub;
  let destroyed = false;
  let stockSummary = { loaded: false, items: 0, low: 0 };

  async function refreshStockSummary() {
    try {
      const items = await db.getAll('inventoryItems');
      stockSummary = { loaded: true, items: items.length, low: items.filter((x) => Number(x.minStock || 0) > 0 && Number(x.stock || 0) <= Number(x.minStock || 0)).length };
    } catch (_) { stockSummary.loaded = true; }
    if (!destroyed) paint();
  }

  function paint() {
    const all = listRecipes();
    const recent = all.filter((r) => r.lastOpenedAt).sort((a, b) => b.lastOpenedAt - a.lastOpenedAt).slice(0, 6);
    const favs = all.filter((r) => r.favorite).sort((a, b) => (b.favoritedAt || 0) - (a.favoritedAt || 0)).slice(0, 6);
    const n = pendingCount();
    const used = new Map();
    all.forEach((r) => used.set(r.category, (used.get(r.category) || 0) + 1));
    const cats = state.categories.filter((cat) => used.has(cat.id)).slice(0, 8);

    const sorted = [...all].sort((a, b) =>
      (b.updatedAt || 0) - (a.updatedAt || 0) || String(a.name).localeCompare(String(b.name), 'pl'));
    const feature = sorted.find((r) => r.favorite && hasFoodPhoto(r)) || sorted.find((r) => hasFoodPhoto(r)) || sorted.find((r) => r.favorite) || sorted[0] || null;

    const kids = [
      h('div', { class: 'zf-head' },
        h('div', { class: 'zf-head-copy' },
          h('span', { class: 'zf-kicker' }, 'NOTATNIK KUCHARZA'),
          h('h1', null, 'Żarłok'),
          h('p', null, 'Co dziś gotujemy?'),
          h('small', { class: 'zf-head-meta' }, plural(all.length) + ' · tylko na tym telefonie')),
        h('div', { class: 'zf-head-mark', 'aria-hidden': 'true' },
          h('span', { class: 'zf-mark-dot' }),
          h('span', null, 'PRO'))),

      h('div', { class: 'zf-feature-wrap' }, featureRecipe(feature)),
      h('div', { class: 'zf-status-row' },
        h('button', { type: 'button', class: 'zf-status-card', onClick: () => navigate('/inventory') },
          h('span', { class: 'zf-status-icon' }, icon('fridge', 19)),
          h('span', { class: 'zf-status-copy' }, h('strong', null, 'Magazyn'), h('small', null, !stockSummary.loaded ? 'Sprawdzam stany…' : stockSummary.items === 0 ? 'Dodaj produkty' : stockSummary.low ? stockSummary.low + ' braków' : stockSummary.items + ' produktów')),
          h('span', { class: 'zf-status-go' }, icon('right', 15))),
        h('button', { type: 'button', class: 'zf-status-card', onClick: () => navigate('/shopping') },
          h('span', { class: 'zf-status-icon shopping' }, icon('cart', 19)),
          h('span', { class: 'zf-status-copy' }, h('strong', null, 'Zakupy'), h('small', null, n ? n + ' pozycji do kupienia' : 'Lista jest pusta')),
          h('span', { class: 'zf-status-go' }, icon('right', 15)))),

      h('div', { class: 'zf-section-title zf-menu-heading' },
        h('span', { class: 'zf-section-index' }, '01'),
        h('span', null, 'MENU'),
        h('span', { class: 'zf-section-line' }),
        h('span', { class: 'zf-section-caption' }, 'NAWIGACJA')),

      h('div', { class: 'zf-actions' },
        ACTIONS.map((a) => actionRow(a, a.label === 'Zakupy' ? n : 0))),

      h('button', { type: 'button', class: 'zf-more-cta', onClick: () => navigate('/more') },
        h('span', { class: 'zf-more-cta-icon' }, icon('more', 20)),
        h('span', null, h('strong', null, 'Więcej narzędzi'), h('small', null, 'Kalkulatory, import i ustawienia')),
        icon('right', 17))
    ];

    if (backupDue()) {
      const d = daysSinceBackup();
      kids.push(h('button', {
        type: 'button', class: 'zf-backup',
        onClick: () => navigate('/settings'),
      },
        icon('download', 18),
        h('span', null, d == null ? 'Zrób pierwszą kopię danych' : 'Kopia danych ma ' + d + ' dni'),
        icon('right', 15)));
    }

    if (!all.length) {
      kids.push(h('div', { class: 'zf-empty-card' },
        emptyState('📒', 'Jeszcze pusto', 'Dodaj pierwszą recepturę i zbuduj swój prywatny notatnik.',
          button('Nowa receptura', { kind: 'primary', icon: 'plus', onClick: () => navigate('/new') }),
          button('Importuj', { icon: 'upload', onClick: () => navigate('/import') }))));
      c.replaceChildren(...kids);
      return;
    }

    if (cats.length) {
      kids.push(sectionHead('Kategorie', {
        action: 'Wszystkie',
        onAction: () => navigate('/recipes'),
      }));
      kids.push(h('div', { class: 'rail cats zf-cats-rail' },
        cats.map((cat) => catTile(cat, used.get(cat.id), () =>
          navigate('/recipes?cat=' + encodeURIComponent(cat.id))))));
    }

    if (recent.length) {
      kids.push(sectionHead('Ostatnio używane', { action: 'Wszystkie', onAction: () => navigate('/recipes?f=recent') }));
      kids.push(h('div', { class: 'rail zf-recipe-rail' }, recent.map((r) => recipeTile(r))));
    }

    if (favs.length) {
      kids.push(sectionHead('Ulubione', { action: 'Wszystkie', onAction: () => navigate('/recipes?f=fav') }));
      kids.push(h('div', { class: 'rail zf-recipe-rail' }, favs.map((r) => recipeTile(r))));
    }

    c.replaceChildren(...kids);
  }

  paint();
  void refreshStockSummary();
  unsub = subscribe((t) => {
    if (t === 'recipes' || t === 'shopping' || t === 'settings' || t === 'categories' || t === 'hydrated') paint();
  });

  return { el: s.el, destroy: () => { destroyed = true; if (unsub) unsub(); } };
}
