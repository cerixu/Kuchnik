/* ==========================================================================
   views-cook-home.js — osobny punkt wejścia do trybu GOTUJĘ.
   Przeniesione z Żarłoka, dopasowane do interfejsu i danych Kuchnika.
   ========================================================================== */
import { h, icon, screen, iconBtn, textInput, emptyState, button } from './ui.js';
import { listRecipes, searchText, catName, subscribe } from './recipes.js';
import { navigate } from './router.js';
import { openTimersSheet } from './timers.js';
import { recipeArtUrl } from './art.js';
import { attachRecipePhoto } from './food-photos.js';
import { norm, fmtMinutes } from './util.js';

export function cookEntryView() {
  const s = screen({
    title: 'Gotuję',
    right: iconBtn('timer', 'Minutniki', () => openTimersSheet()),
    cls: 'cook-entry',
  });
  const search = textInput({ label: 'Szukaj receptury', placeholder: 'Wpisz nazwę lub składnik…' });
  const searchBar = h('div', { class: 'cook-entry-search' }, icon('search', 18), search);
  const list = h('div', { class: 'cook-entry-list' });
  const count = h('span', { class: 'muted small' });
  const hero = h('section', { class: 'cook-entry-hero' },
    h('span', { class: 'eyebrow' }, 'TRYB KUCHENNY'),
    h('h2', null, 'Gotuj bez rozpraszania'),
    h('p', null, 'Wybierz recepturę, odhaczaj składniki i kroki. Postęp zapisuje się na tym telefonie.'),
    h('div', { class: 'cook-entry-hero-actions' },
      button('Wybierz z receptur', { kind: 'primary', icon: 'book', onClick: () => navigate('/recipes') }),
      button('Minutniki', { icon: 'timer', onClick: () => openTimersSheet() })));
  const heading = h('div', { class: 'cook-entry-heading' },
    h('h2', null, 'Rozpocznij gotowanie'),
    count);

  function recipeCard(r) {
    const custom = r.thumb || r.photo;
    const img = h('img', {
      class: custom ? '' : 'art',
      src: custom || recipeArtUrl(r),
      alt: r.name ? 'Zdjęcie: ' + r.name : '',
      loading: 'lazy',
      decoding: 'async',
    });
    if (!custom) attachRecipePhoto(img, r);
    const active = (r.prepTime || 0) + (r.cookTime || 0);
    return h('button', {
      type: 'button',
      class: 'cook-entry-card',
      onClick: () => navigate('/cook/' + encodeURIComponent(r.id)),
      'aria-label': 'Rozpocznij gotowanie: ' + r.name,
    },
      h('span', { class: 'cook-entry-art' }, img),
      h('span', { class: 'cook-entry-copy' },
        h('strong', null, r.name),
        h('span', { class: 'muted small' }, catName(r.category)),
        h('span', { class: 'cook-entry-meta' }, active ? fmtMinutes(active) : 'Otwórz tryb gotowania')),
      h('span', { class: 'cook-entry-arrow' }, icon('right', 18)));
  }

  function paint() {
    const q = norm(search.value);
    const matches = listRecipes()
      .filter((r) => r.name && (!q || norm(searchText(r)).includes(q)))
      .sort((a, b) => Number(Boolean(b.favorite)) - Number(Boolean(a.favorite)) ||
        (b.lastCookedAt || b.lastOpenedAt || 0) - (a.lastCookedAt || a.lastOpenedAt || 0) ||
        String(a.name).localeCompare(String(b.name), 'pl'));
    const recipes = matches.slice(0, 24);
    count.textContent = matches.length > recipes.length ? `Pokazuję ${recipes.length} z ${matches.length}` : `${matches.length} receptur`;
    if (!recipes.length) {
      list.replaceChildren(emptyState('🍽️', 'Nie znaleziono receptury', 'Zmień nazwę lub wpisz składnik.',
        button('Otwórz wszystkie receptury', { icon: 'book', onClick: () => navigate('/recipes') })));
      return;
    }
    list.replaceChildren(...recipes.map(recipeCard));
  }

  search.addEventListener('input', paint);
  s.content.append(hero, searchBar, heading, list);
  paint();
  const unsub = subscribe((type) => { if (type === 'recipes') paint(); });
  return { el: s.el, destroy: () => unsub() };
}
