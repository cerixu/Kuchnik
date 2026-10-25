/* Secondary tools and settings live under the Więcej tab. */
import { h, icon, screen, iconBtn } from './ui.js';
import { navigate } from './router.js';

const ITEMS = [
  ['Kalkulatory', 'Proporcje, przeliczniki, food cost i ciasto', 'calc', '/calc'],
  ['Lista zakupów', 'Pozycje do kupienia i ilości', 'cart', '/shopping'],
  ['Szukaj w sieci', 'Źródła online i import do bazy', 'search', '/search'],
  ['Ulubione', 'Zapisane receptury', 'heart', '/recipes?f=fav'],
  ['Import receptur', 'Dodaj z tekstu lub pliku', 'upload', '/import'],
  ['Ustawienia', 'Wygląd, kopia danych i prywatność', 'sliders', '/settings'],
];

export function moreView() {
  const s = screen({
    title: 'Więcej',
    right: iconBtn('search', 'Wyszukaj recepturę', () => navigate('/search')),
    cls: 'more-view',
  });
  s.content.append(
    h('section', { class: 'more-hero' },
      h('span', { class: 'eyebrow' }, 'NARZĘDZIA KUCHENNE'),
      h('h2', null, 'Wszystko pod ręką'),
      h('p', null, 'Kalkulatory, zakupy, wyszukiwanie i ustawienia są tutaj, poza główną nawigacją.')),
    h('div', { class: 'more-grid' }, ITEMS.map(([label, note, ico, path]) =>
      h('button', { type: 'button', class: 'more-card', onClick: () => navigate(path), 'aria-label': label },
        h('span', { class: 'more-card-icon' }, icon(ico, 22)),
        h('span', { class: 'more-card-copy' }, h('strong', null, label), h('small', null, note)),
        h('span', { class: 'more-card-arrow' }, icon('right', 17)))))
  );
  return { el: s.el };
}
