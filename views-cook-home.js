/* Entry point for the dedicated Gotuję tab. */
import { h, icon, screen, iconBtn, textInput, emptyState } from './ui.js';
import { listRecipes, searchText, catName } from './recipes.js';
import { navigate } from './router.js';
import { openTimersSheet } from './timers.js';
import { recipeArtUrl, artUrl } from './art.js';
import { attachRecipePhoto } from './food-photos.js';
import { norm } from './util.js';

export function cookEntryView() {
  const s = screen({
    title: 'Gotuję',
    right: iconBtn('timer', 'Minutniki', () => openTimersSheet()),
    cls: 'cook-entry',
  });
  const search = textInput({ label: 'Szukaj receptury', placeholder: 'Wpisz nazwę lub składnik…' });
  const searchBar = h('div', { class: 'cook-entry-search' }, icon('search', 18), search);
  const list = h('div', { class: 'cook-entry-list' });
  const hero = h('section', { class: 'cook-entry-hero' },
    h('span', { class: 'eyebrow' }, 'TRYB KUCHENNY'),
    h('h2', null, 'Gotuj bez rozpraszania'),
    h('p', null, 'Wybierz recepturę, odhaczaj składniki i kroki. Postęp zapisuje się na tym telefonie.'),
    h('div', { class: 'cook-entry-hero-actions' },
      h('button', { type: 'button', class: 'btn primary', onClick: () => navigate('/recipes') }, icon('book', 18), 'Wybierz z receptur'),
      h('button', { type: 'button', class: 'btn ghost', onClick: () => openTimersSheet() }, icon('timer', 18), 'Minutniki')));
  const heading = h('div', { class: 'cook-entry-heading' },
    h('h2', null, 'Rozpocznij gotowanie'),
    h('span', { class: 'muted small' }, 'Wyszukiwanie obejmuje też składniki'));

  function paint() {
    const q = norm(search.value);
    const recipes = listRecipes()
      .filter((r) => r.name && (!q || norm(searchText(r)).includes(q)))
      .sort((a, b) => Number(Boolean(b.favorite)) - Number(Boolean(a.favorite)) ||
        (b.lastCookedAt || b.lastOpenedAt || 0) - (a.lastCookedAt || a.lastOpenedAt || 0) ||
        String(a.name).localeCompare(String(b.name), 'pl'))
      .slice(0, 12);
    if (!recipes.length) {
      list.replaceChildren(emptyState('🍽️', 'Nie znaleziono receptury', 'Zmień nazwę lub wpisz składnik.'));
      return;
    }
    list.replaceChildren(...recipes.map((r) => h('button', {
      type: 'button',
      class: 'cook-entry-card',
      onClick: () => navigate('/cook/' + encodeURIComponent(r.id)),
      'aria-label': 'Rozpocznij gotowanie: ' + r.name,
    },
      h('span', { class: 'cook-entry-art' }, (() => {
        const custom = r.thumb || r.photo;
        const img = h('img', {
          class: custom ? '' : 'art',
          src: custom || recipeArtUrl(r),
          alt: r.name ? 'Zdjęcie: ' + r.name : '',
          loading: 'lazy',
          decoding: 'async',
          onError: (e) => {
            const el = e.currentTarget;
            if (el.dataset.artFallback) return;
            el.dataset.artFallback = '1';
            el.classList.add('art');
            el.src = artUrl('plate', r.name || r.id || '');
          },
        });
        if (!custom) attachRecipePhoto(img, r);
        return img;
      })()),
      h('span', { class: 'cook-entry-copy' },
        h('strong', null, r.name),
        h('span', { class: 'muted small' }, catName(r.category)),
        h('span', { class: 'cook-entry-meta' }, r.prepTime ? 'Przygotowanie ' + r.prepTime + ' min' : 'Otwórz tryb gotowania')),
      h('span', { class: 'cook-entry-arrow' }, icon('right', 18)))));
  }

  search.addEventListener('input', paint);
  s.content.append(hero, searchBar, heading, list);
  paint();
  return { el: s.el };
}
