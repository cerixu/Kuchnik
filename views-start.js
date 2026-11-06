/* ==========================================================================
   views-start.js — ekran Start w stylu makiety: duży nagłówek, wyszukiwarka,
   karuzela dużych kart „Polecane na dziś”, okrągłe przyciski akcji,
   kuchnie świata (skąd jest przepis), kategorie i półki z recepturami.
   ========================================================================== */
import { h, icon, screen, button, emptyState } from './ui.js';
import { navigate } from './router.js';
import { state, subscribe, listRecipes, getSetting } from './recipes.js';
import { recipeTile, catTile, sectionHead } from './components.js';
import { pendingCount } from './shopping.js';
import { backupDue, daysSinceBackup } from './backup.js';
import { openTimersSheet } from './timers.js';
import { ORIGINS } from './recipes.js';
import { originGlyph } from './zarlock-art.js';

const HEADLINE = 'Gotuj. Próbuj. Powtarzaj.';
const plural = (n) => `${n} ${n === 1 ? 'receptura' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'receptury' : 'receptur'}`;

export function startView() {
  const fire = h('button', { type: 'button', class: 'fire-btn', 'aria-label': 'Losuj przepis', title: 'Losuj przepis', onClick: () => navigate('/calc/random') }, icon('shuffle', 20));
  const s = screen({ title: 'ŻARŁOK', large: 'hero', right: fire, cls: 'start' });
  const c = s.content;
  let unsub;

  const searchIn = h('input', { class: 'input start-search', type: 'search', placeholder: 'Szukaj przepisu, składnika, kraju…', 'aria-label': 'Szukaj przepisu', autocomplete: 'off', autocapitalize: 'off', enterkeyhint: 'search' });
  const go = () => { const q = searchIn.value.trim(); navigate('/recipes' + (q ? '?q=' + encodeURIComponent(q) : '')); };
  searchIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); searchIn.blur(); go(); } });
  const searchBox = h('div', { class: 'start-searchbox' }, icon('search', 20), searchIn);

  const action = (label, ico, path, { badge = 0, primary = false, fn, wide = false, hint = '' } = {}) => {
    const copy = wide
      ? h('span', { class: 'qa-copy' }, h('span', { class: 'qa-label' }, label), h('span', { class: 'qa-hint' }, hint))
      : h('span', { class: 'qa-label' }, label);
    return h('button', { type: 'button', class: 'qa' + (primary ? ' primary' : '') + (wide ? ' qa-wide' : ''), onClick: fn || (() => navigate(path)), 'aria-label': label },
      h('span', { class: 'qa-ico' }, icon(ico, 26), badge ? h('span', { class: 'badge' }, String(badge > 99 ? '99+' : badge)) : null), copy);
  };

  /** Karuzela „coverflow”: środkowa karta największa, sąsiednie mniejsze i przygaszone. */
  function deck(list) {
    const el = h('div', { class: 'deck', role: 'list' }, list.map((r) => h('div', { class: 'deck-item', role: 'listitem' }, recipeTile(r))));
    const apply = () => {
      const first = el.querySelector('.deck-item');
      if (first) { const pad = Math.max(0, (el.clientWidth - first.offsetWidth) / 2 + 16) + 'px'; if (el.style.paddingLeft !== pad) { el.style.paddingLeft = pad; el.style.paddingRight = pad; } }
      const mid = el.scrollLeft + el.clientWidth / 2;
      el.querySelectorAll('.deck-item').forEach((it) => {
        const d = Math.min(1, Math.abs(it.offsetLeft + it.offsetWidth / 2 - mid) / (it.offsetWidth * 0.95));
        it.style.setProperty('--k', d.toFixed(3));
        it.style.zIndex = String(Math.round(10 - d * 10));
      });
    };
    el.addEventListener('scroll', () => requestAnimationFrame(apply), { passive: true });
    requestAnimationFrame(() => requestAnimationFrame(apply));
    window.addEventListener('resize', apply);
    return el;
  }

  function paint() {
    const all = listRecipes();
    const recent = all.filter((r) => r.lastOpenedAt).sort((a, b) => b.lastOpenedAt - a.lastOpenedAt).slice(0, 10);
    const favs = all.filter((r) => r.favorite).sort((a, b) => (b.favoritedAt || 0) - (a.favoritedAt || 0)).slice(0, 10);
    const n = pendingCount();
    const kids = [
      h('div', { class: 'start-head' },
        h('div', { class: 'brand-lockup' },
          h('span', { class: 'brand-mark', 'aria-hidden': 'true' }, h('img', { src: 'icon-192.png', alt: '' })),
          h('div', { class: 'brand-copy' },
            h('h1', { class: 'brand-name' }, 'ŻARŁOK'),
            h('span', { class: 'brand-caption' }, 'Kuchnik · warsztat kucharza'))),
        h('p', { class: 'hero-line' }, HEADLINE),
        h('p', { class: 'muted hero-sub' }, `${plural(all.length)} w Twojej kuchni · działa offline`)),
      searchBox,
    ];

    if (!all.length) {
      kids.push(emptyState('book', 'Pusto w książce', 'Dodaj pierwszą recepturę albo wklej przepis z internetu.',
        button('Nowa receptura', { kind: 'primary', icon: 'plus', onClick: () => navigate('/new') }), button('Importuj', { icon: 'upload', onClick: () => navigate('/import') })));
    } else {
      const day = Math.floor(Date.now() / 86400000);
      const inspire = all.map((r, i) => ({ r, k: (i * 7919 + day * 104729) % 1009 })).sort((a, b) => a.k - b.k).slice(0, 9).map((x) => x.r);
      kids.push(sectionHead('Co dziś gotujemy?', { action: 'Losuj', onAction: () => navigate('/calc/random') }), deck(inspire));
    }

    const menuGroup = (title, size, actions) => h('section', { class: 'home-menu-group' },
      h('h3', { class: 'home-menu-title' }, title),
      h('div', { class: 'qa-row qa-' + size, role: 'group', 'aria-label': title }, ...actions));
    kids.push(sectionHead('Menu kucharza'));
    kids.push(menuGroup('Gotowanie', '4',
      [action('Nowa receptura', 'plus', '/new', { primary: true }), action('Gotuję', 'chef', '/cook'), action('Kalkulatory', 'calc', '/calc'), action('Minutnik', 'timer', null, { fn: () => openTimersSheet() })]));
    kids.push(menuGroup('Twoja biblioteka', '3',
      [action('Moje receptury', 'book', '/recipes'), action('Ostatnio używane', 'clock', '/recipes?f=recent'), action('Ulubione', 'heart', '/recipes?f=fav')]));
    kids.push(menuGroup('Zapasy i zakupy', '2',
      [action('Lista zakupów', 'basket', '/shopping', { badge: n }), action('Magazyn', 'fridge', '/inventory')]));
    kids.push(menuGroup('Odkrywaj', 'wide',
      [action('Szukaj w sieci', 'search', '/search', { wide: true, hint: 'Znajdź przepis albo nową inspirację' })]));

    if (backupDue()) {
      const d = daysSinceBackup();
      kids.push(h('div', { class: 'notice' }, icon('download', 22),
        h('div', { class: 'notice-text' }, h('strong', null, 'Zrób kopię zapasową'), h('span', { class: 'muted' }, d == null ? 'Jeszcze jej nie zrobiono — dane są tylko w tym telefonie.' : `Ostatnia: ${d} dni temu.`)),
        button('Kopia', { sm: true, onClick: () => navigate('/settings') })));
    }

    if (all.length) {
      // Skąd są przepisy — kuchnie świata
      const byOrigin = new Map();
      all.forEach((r) => { if (r.origin) byOrigin.set(r.origin, (byOrigin.get(r.origin) || 0) + 1); });
      const cuisines = ORIGINS.filter((o) => byOrigin.has(o.code)).sort((a, b) => byOrigin.get(b.code) - byOrigin.get(a.code)).slice(0, 14);
      if (cuisines.length) {
        kids.push(sectionHead('Skąd jest przepis', { action: 'Wszystkie', onAction: () => navigate('/recipes') }),
          h('div', { class: 'rail cuisines' }, cuisines.map((o) => h('button', { type: 'button', class: 'cu', onClick: () => navigate('/recipes?origin=' + o.code), 'aria-label': `${o.name}: ${byOrigin.get(o.code)}` },
            h('span', { class: 'cu-flag' }, originGlyph(o.code, 64)), h('span', { class: 'cu-name' }, o.name), h('span', { class: 'cu-n' }, String(byOrigin.get(o.code)))))));
      }
      const used = new Map();
      all.forEach((r) => used.set(r.category, (used.get(r.category) || 0) + 1));
      const cats = state.categories.filter((cat) => used.has(cat.id));
      if (cats.length) kids.push(sectionHead('Kategorie', { action: 'Wszystkie', onAction: () => navigate('/recipes') }), h('div', { class: 'rail cats' }, cats.map((cat) => catTile(cat, used.get(cat.id), () => navigate('/recipes?cat=' + encodeURIComponent(cat.id))))));
      const rail = (title, list, more, emptyText) => {
        kids.push(sectionHead(title, list.length && more ? { action: 'Wszystkie', onAction: () => navigate(more) } : {}));
        kids.push(list.length ? h('div', { class: 'rail' }, list.map((r) => recipeTile(r))) : h('p', { class: 'muted pad' }, emptyText));
      };
      rail('Ostatnio używane', recent, '/recipes?f=recent', 'Tu pojawią się receptury, które otworzysz.');
      rail('Ulubione', favs, '/recipes?f=fav', 'Stuknij serce przy recepturze, żeby była zawsze pod ręką.');
      const trad = all.filter((r) => r.traditional).sort((a, b) => a.name.localeCompare(b.name, 'pl')).slice(0, 14);
      if (trad.length) rail('Tradycyjne', trad, '/recipes?f=trad', '');
    }
    c.replaceChildren(...kids);
  }

  paint();
  unsub = subscribe((t) => { if (t === 'recipes' || t === 'shopping' || t === 'settings') paint(); });
  return { el: s.el, destroy: () => unsub && unsub() };
}
