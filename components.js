/* ==========================================================================
   components.js — wspólne elementy interfejsu (karta receptury, nagłówki sekcji).
   ========================================================================== */
import { h, icon, toast } from './ui.js';
import { navigate } from './router.js';
import { catName, catIcon, ORIGINS, toggleFavorite } from './recipes.js';
import { fmtMinutes, fmtAmount, fmtKitchenAmount, fmtNum, fmtUnit } from './util.js';
import { recipeArtUrl, categoryArtUrl } from './art.js';
import { attachRecipePhoto, attachCategoryPhoto } from './food-photos.js';
import { estimateKcal } from './nutrition.js';
import { hostOf } from './importer.js';

export const originOf = (code) => ORIGINS.find((o) => o.code === code);

/** Czas czynny + osobno fermentacja, np. "45 min · ferm. 24 h". */
export function timeText(r) {
  const active = (r.prepTime || 0) + (r.cookTime || 0);
  const parts = [];
  if (active) parts.push(fmtMinutes(active));
  if (r.fermentTime) parts.push('ferm. ' + fmtMinutes(r.fermentTime));
  return parts.join(' · ');
}

export function metaLine(r) {
  const parts = [catName(r.category)];
  if (r.servings) parts.push(`${r.servings} porc.`);
  const t = timeText(r);
  if (t) parts.push(t);
  return parts.join(' · ');
}

/** „🇮🇹 Włochy” — skąd pochodzi potrawa (albo null, gdy nie wiadomo). */
export function originLabel(r) { const o = originOf(r.origin); return o ? `${o.flag} ${o.name}` : null; }

/** Skąd jest sam przepis: strona, książka, „Kucharzyna” (przykład) albo „Własny”. */
export function sourceLabel(r) {
  if (r.sourceUrl) return hostOf(r.sourceUrl) || r.source || 'Internet';
  const s = String(r.source || '').split(' — ')[0].replace(/\s*\(.*\)\s*$/, '').trim();
  return s || 'Własny';
}

/** Krótki opis do przeglądania: własny albo złożony ze składników. */
export function shortDesc(r) {
  if (r.description && r.description.trim()) return r.description.trim();
  const names = [];
  for (const sec of r.sections || []) for (const i of sec.ingredients) { const n = String(i.name || '').replace(/\s*\(.*\)\s*/, '').trim(); if (n && !names.includes(n)) names.push(n.toLowerCase()); if (names.length >= 4) break; if (names.length >= 4) break; }
  const t = (r.prepTime || 0) + (r.cookTime || 0);
  const head = names.length ? `${catName(r.category)}: ${names.join(', ')}.` : `${catName(r.category)}.`;
  return t ? `${head} ${fmtMinutes(t)}.` : head;
}

/** Gwiazdka + flaga dla receptur tradycyjnych. */
export function tradMark(r) {
  if (!r.traditional) return null;
  const o = originOf(r.origin);
  return h('span', { class: 'trad', title: o ? `Tradycyjna — ${o.name}` : 'Tradycyjna', 'aria-label': o ? `Tradycyjna, ${o.name}` : 'Tradycyjna' },
    icon('star', 16), o ? h('span', { class: 'flag', 'aria-hidden': 'true' }, o.flag) : null);
}

export function heartBtn(r, onToggle) {
  const b = h('button', { type: 'button', class: 'heart' + (r.favorite ? ' on' : ''), 'aria-pressed': !!r.favorite,
    'aria-label': r.favorite ? `Usuń z ulubionych: ${r.name}` : `Dodaj do ulubionych: ${r.name}`,
    onClick: async (e) => {
      e.stopPropagation();
      const next = await toggleFavorite(r.id);
      toast(next.favorite ? 'Dodano do ulubionych' : 'Usunięto z ulubionych');
      if (onToggle) onToggle(next);
    } }, icon('heart', 22));
  return b;
}

/** Miniatura: własne zdjęcie, a gdy go brak — ilustracja potrawy rysowana w kodzie. */
function recipeImage(r, alt = '') {
  const custom = r.thumb || r.photo;
  const img = h('img', { class: custom ? '' : 'art', src: custom || recipeArtUrl(r), alt, loading: 'lazy', decoding: 'async' });
  if (!custom) attachRecipePhoto(img, r);
  return img;
}

export function thumbEl(r, cls = '') {
  return h('div', { class: 'rthumb ' + cls }, recipeImage(r));
}

/** Prawa kolumna karty (jak „4.8 ★ / 350 kcal” na makiecie): ocena albo czas, pod spodem kalorie. */
export function sideInfo(r) {
  const k = estimateKcal(r);
  const t = (r.prepTime || 0) + (r.cookTime || 0);
  const top = r.rating ? h('span', { class: 'rt-rate' }, String(r.rating).replace('.', ','), h('span', { class: 'star' }, '★'))
    : t ? h('span', { class: 'rt-rate' }, fmtMinutes(t)) : null;
  const sub = k ? h('span', { class: 'rt-sub' }, `${k.perServing} kcal`) : r.servings ? h('span', { class: 'rt-sub' }, `${r.servings} porc.`) : null;
  return h('div', { class: 'rt-side' }, top, sub);
}

/** Duża karta receptury z okrągłym zdjęciem (Start, siatka) — styl z makiety: zdjęcie, tytuł, ocena/kalorie, krótki opis i pochodzenie. */
export function recipeTile(r, { onFav } = {}) {
  const href = '/recipe/' + encodeURIComponent(r.id);
  const org = originLabel(r);
  return h('div', { class: 'rtile' + (r.traditional ? ' trad-tile' : '') },
    h('a', { class: 'rtile-link', href: '#' + href, 'aria-label': r.name, onClick: (e) => { e.preventDefault(); navigate(href); } },
      h('div', { class: 'rtile-img' }, recipeImage(r)),
      h('div', { class: 'rtile-row' },
        h('div', { class: 'rtile-name' }, r.traditional ? h('span', { class: 'rtile-trad' }, h('span', { class: 'trad-star' }, icon('star', 14))) : null, r.name || 'Bez nazwy'),
        sideInfo(r)),
      h('p', { class: 'rtile-desc' }, shortDesc(r)),
      h('div', { class: 'rtile-from' }, org ? h('span', { class: 'from-origin' }, org) : h('span', { class: 'from-origin' }, `${catIcon(r.category)} ${catName(r.category)}`), h('span', { class: 'from-src' }, sourceLabel(r)))),
    h('div', { class: 'rtile-heart' }, heartBtn(r, onFav)));
}

/** Okrągła kafelka kategorii (ilustracja + nazwa + liczba). */
export function catTile(cat, count, onClick) {
  const img = h('img', { class: 'art', src: categoryArtUrl(cat.id), alt: '', loading: 'lazy', decoding: 'async' });
  attachCategoryPhoto(img, cat.id);
  return h('button', { type: 'button', class: 'ctile', onClick, 'aria-label': `${cat.name}: ${count}` },
    h('span', { class: 'ctile-img' }, img),
    h('span', { class: 'ctile-name' }, cat.name), h('span', { class: 'ctile-n' }, String(count)));
}

/** Wiersz receptury (widok listy): miniatura, tytuł, opis, kraj i źródło. */
export function recipeCard(r, { onFav } = {}) {
  const org = originLabel(r);
  return h('div', { class: 'rcard' + (r.traditional ? ' trad-card' : '') },
    h('a', { class: 'rcard-main', href: '#/recipe/' + encodeURIComponent(r.id), 'aria-label': r.name,
      onClick: (e) => { e.preventDefault(); navigate('/recipe/' + encodeURIComponent(r.id)); } },
      thumbEl(r),
      h('div', { class: 'rbody' },
        h('div', { class: 'rtitle' }, r.traditional ? h('span', { class: 'trad-star' }, icon('star', 14)) : null, h('span', { class: 'rname' }, r.name || 'Bez nazwy')),
        h('div', { class: 'rdesc' }, shortDesc(r)),
        h('div', { class: 'rmeta' }, h('span', { class: 'from-origin' }, org || `${catIcon(r.category)} ${catName(r.category)}`), h('span', { class: 'from-src' }, sourceLabel(r)), h('span', null, metaLine(r).split(' · ').slice(1).join(' · ')))),
    ),
    heartBtn(r, onFav));
}

export function sectionHead(title, { action, onAction, count } = {}) {
  return h('div', { class: 'sechead' },
    h('h2', null, title, count != null ? h('span', { class: 'count' }, String(count)) : null),
    action ? h('button', { type: 'button', class: 'linkbtn', onClick: onAction }, action, icon('right', 16)) : null);
}

/** Ilość składnika do wyświetlenia: { num: '1000', unit: 'g' } albo { num: '', unit: 'do smaku' }. */
export function qtyParts(ing) {
  if (ing.amount == null || !Number.isFinite(ing.amount)) return { num: '', unit: 'do smaku' };
  return {
    num: fmtKitchenAmount(ing.amount, ing.unit || ''),
    unit: ing.unit === 'szt.' ? 'szt.' : fmtUnit(ing.amount, ing.unit || ''),
  };
}

/** Receptura jako czysty tekst (kopiowanie, udostępnianie). */
export function recipeToText(r) {
  const L = [r.name];
  const meta = [];
  if (r.servings) meta.push(`Porcje: ${r.servings}`);
  if (r.yieldAmount) meta.push(`Wydajność: ${fmtAmount(r.yieldAmount)} ${r.yieldUnit}`);
  if (r.prepTime) meta.push(`Przygotowanie: ${fmtMinutes(r.prepTime)}`);
  if (r.cookTime) meta.push(`Gotowanie: ${fmtMinutes(r.cookTime)}`);
  if (r.fermentTime) meta.push(`Fermentacja: ${fmtMinutes(r.fermentTime)}`);
  if (r.temperature) meta.push(`Temperatura: ${r.temperature}`);
  if (meta.length) L.push(meta.join(' · '));
  if (r.description) L.push('', r.description);
  L.push('', 'SKŁADNIKI');
  r.sections.forEach((s) => {
    if (s.name) L.push('', s.name + ':');
    s.ingredients.forEach((i) => {
      const q = qtyParts(i);
      L.push(`- ${i.name}${q.num || q.unit ? ' — ' + [q.num, q.unit].filter(Boolean).join(' ') : ''}${i.percent != null ? ` (${fmtNum(i.percent, 2)}%)` : ''}`);
    });
  });
  if (r.steps.length) { L.push('', 'PRZYGOTOWANIE'); r.steps.forEach((s, n) => L.push(`${n + 1}. ${s.text}`)); }
  if (r.notes) L.push('', 'UWAGI', r.notes);
  if (r.sourceUrl || r.source) L.push('', `Źródło: ${[r.source, r.sourceUrl].filter(Boolean).join(' — ')}`);
  return L.join('\n');
}
