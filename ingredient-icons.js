/* ==========================================================================
   ingredient-icons.js — kolorowe ikony składników rysowane w kodzie (SVG).
   Wyglądają tak samo na każdym telefonie (w przeciwieństwie do emoji),
   mają cieniowanie 3D i pasują do ciemnej oprawy aplikacji.
   ========================================================================== */
import { norm } from './util.js';

const c = (x, y, r, f, o) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${o ? ` opacity="${o}"` : ''}/>`;
const e = (x, y, rx, ry, f, a = 0, o) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}"${a ? ` transform="rotate(${a} ${x} ${y})"` : ''}${o ? ` opacity="${o}"` : ''}/>`;
const r = (x, y, w, h, f, rx = 0, a = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"${a ? ` transform="rotate(${a} ${x + w / 2} ${y + h / 2})"` : ''}/>`;
const p = (d, f, extra = '') => `<path d="${d}" fill="${f}" ${extra}/>`;
const line = (d, s, w = 2, extra = '') => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
const leaf = (x, y, a, s = 1, f = '#4fa34a') => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0 0 C5 -8 16 -8 20 0 C16 8 5 8 0 0Z" fill="${f}"/><path d="M2 0 H18" stroke="#ffffff" stroke-opacity=".4" stroke-width="1.2"/></g>`;
const shine = (x, y, rx = 6, ry = 3, a = -30) => e(x, y, rx, ry, '#ffffff', a, 0.35);

const bottle = (body, label, cap, liquid) => `${r(25, 6, 14, 8, cap, 2)}${p('M26 14h12v6c0 4 8 6 8 14v22a5 5 0 0 1-5 5H23a5 5 0 0 1-5-5V34c0-8 8-10 8-14z', body)}${liquid ? p('M20 40h24v17a3 3 0 0 1-3 3H23a3 3 0 0 1-3-3z', liquid) : ''}${r(22, 36, 20, 14, label, 3)}`;
const jar = (body, lid, content, label) => `${r(16, 8, 32, 9, lid, 3)}${p('M18 17h28v6c3 3 3 6 3 10v20a6 6 0 0 1-6 6H21a6 6 0 0 1-6-6V33c0-4 0-7 3-10z', body, 'opacity=".55"')}${p('M18 30h28v25a5 5 0 0 1-5 5H23a5 5 0 0 1-5-5z', content)}${label ? r(22, 36, 20, 13, label, 3) : ''}`;

const GLYPHS = {
  tomato: () => `${c(32, 36, 21, '#e5483a')}${p('M32 15l-5 6-8-1 5 6-2 3 10-3 10 3-2-3 5-6-8 1z', '#3f9d4e')}${shine(23, 30)}`,
  onion: () => `${p('M32 12c3 5 5 8 5 11 8 4 12 11 12 18 0 9-8 14-17 14s-17-5-17-14c0-7 4-14 12-18 0-3 2-6 5-11z', '#c98bc4')}${line('M32 24c-6 8-8 16-5 28M32 24c6 8 8 16 5 28M32 24v30', '#f1d4ee', 2)}${shine(24, 38)}`,
  garlic: () => `${p('M32 10c2 6 3 9 3 12 11 3 17 11 17 20 0 8-8 12-20 12s-20-4-20-12c0-9 6-17 17-20 0-3 1-6 3-12z', '#f4efe2')}${line('M32 24c-8 8-9 18-6 30M32 24c8 8 9 18 6 30', '#d9cfb8', 2)}${shine(22, 40)}`,
  carrot: () => `${p('M44 18c4 4 6 8 4 13L24 56c-3 2-6-1-5-5L35 21c2-3 5-5 9-3z', '#f08a24')}${line('M32 32l6 3M28 40l6 3', '#c9611a', 2)}${leaf(42, 14, -60, 1, '#4fa34a')}${leaf(46, 18, -20, 1, '#6fbf4a')}${shine(38, 28, 5, 2, 55)}`,
  potato: () => `${e(32, 36, 22, 17, '#c9a066', -12)}${c(24, 34, 2, '#a07a44')}${c(38, 42, 2, '#a07a44')}${c(34, 28, 1.6, '#a07a44')}${shine(24, 28)}`,
  pepper: () => `${p('M32 18c10-3 19 3 19 15 0 14-8 23-19 23S13 47 13 33c0-12 9-18 19-15z', '#e5483a')}${line('M32 20v34', '#b52a20', 1.8, 'opacity=".5"')}${r(29, 8, 6, 10, '#4a8b3a', 2)}${shine(22, 30)}`,
  chili: () => `${p('M16 30c8-6 24-6 32 4 4 5 8 16 4 20-6 4-10-8-16-14-5-4-14-4-20-10z', '#d9342a')}${p('M14 26l6-6 6 2-4 8z', '#3f9d4e')}${shine(30, 31, 8, 2, 15)}`,
  cucumber: () => `${r(8, 24, 48, 18, '#5aa845', 9, -25)}${c(24, 38, 1.3, '#d7efbd')}${c(34, 31, 1.3, '#d7efbd')}${c(42, 24, 1.3, '#d7efbd')}${shine(26, 28, 9, 2, -25)}`,
  zucchini: () => `${r(8, 24, 48, 18, '#3f8a41', 9, -25)}${line('M16 42l30-20', '#a8d58a', 1.6, 'opacity=".6"')}${shine(26, 28, 9, 2, -25)}`,
  leafy: () => `${e(24, 38, 14, 20, '#7cc35a', -20)}${e(40, 38, 14, 20, '#5aa845', 20)}${e(32, 32, 14, 22, '#9bd36f')}${line('M32 18v38', '#d7efbd', 1.6)}`,
  broccoli: () => `${r(28, 38, 8, 20, '#9bd36f', 3)}${c(20, 30, 11, '#3f9d4e')}${c(32, 22, 12, '#4fa34a')}${c(44, 30, 11, '#3f9d4e')}${c(32, 34, 9, '#58b565')}${shine(26, 20, 5, 3)}`,
  mushroom: () => `${r(25, 34, 14, 22, '#f4efe2', 6)}${p('M10 38c0-16 10-26 22-26s22 10 22 26z', '#b98a5a')}${c(24, 26, 2.5, '#e2c8a0')}${c(38, 22, 2, '#e2c8a0')}${c(44, 30, 2, '#e2c8a0')}${shine(22, 22, 7, 3)}`,
  eggplant: () => `${p('M40 12c6 4 10 12 6 24-4 12-14 20-24 18-8-2-8-10-2-20 6-12 14-26 20-22z', '#6a3a8a')}${p('M38 10l8 4-4 6-8-4z', '#3f9d4e')}${shine(34, 30, 3, 9, 40)}`,
  corn: () => `${p('M32 8c8 2 12 14 12 26 0 12-4 22-12 22S20 46 20 34C20 22 24 10 32 8z', '#ffd24a')}${line('M20 24h24M20 34h24M20 44h24M28 10v44M36 10v44', '#e0a82a', 1.2)}${p('M32 56c-12 0-18-10-18-22 6 4 8 12 18 22z', '#6fbf4a')}${p('M32 56c12 0 18-10 18-22-6 4-8 12-18 22z', '#4fa34a')}`,
  pumpkin: () => `${e(32, 38, 22, 17, '#f08a24')}${e(22, 38, 11, 17, '#e07a14')}${e(42, 38, 11, 17, '#e07a14')}${e(32, 38, 9, 17, '#f5a34a')}${r(29, 14, 6, 9, '#4a8b3a', 2)}`,
  lemon: () => `${p('M8 34c4-8 12-14 24-14s20 6 24 14c-4 8-12 14-24 14S12 42 8 34z', '#ffd543')}${p('M6 34l5-3v6zM58 34l-5-3v6z', '#e0b020')}${leaf(36, 14, -30, 0.9)}${shine(24, 30, 7, 3, -20)}`,
  orange: () => `${c(32, 36, 21, '#f6a41b')}${c(32, 36, 21, '#ffc94d', 0.18)}${leaf(34, 14, -20, 0.9)}${c(25, 30, 1.2, '#d98a10')}${c(38, 40, 1.2, '#d98a10')}${shine(24, 28)}`,
  apple: () => `${p('M32 20c-6-5-20-2-20 14 0 14 8 22 14 22 3 0 4-1 6-1s3 1 6 1c6 0 14-8 14-22 0-16-14-19-20-14z', '#d9342a')}${r(31, 10, 3, 10, '#6a4a2a', 1.5)}${leaf(34, 12, -30, 0.9)}${shine(22, 30)}`,
  banana: () => `${p('M10 22c6 20 20 32 42 28 2 0 2 3 0 4-24 8-42-6-48-30z', '#ffd543')}${p('M10 22l-3-4 5-2z', '#6a4a2a')}${shine(24, 36, 7, 2, 40)}`,
  berry: () => `${p('M32 56C16 46 10 34 12 26c2-8 12-8 20-4 8-4 18-4 20 4 2 8-4 20-20 30z', '#d9342a')}${p('M24 16l8 6 8-6-2 8h-12z', '#3f9d4e')}${c(24, 34, 1.4, '#ffe9a0')}${c(34, 40, 1.4, '#ffe9a0')}${c(40, 30, 1.4, '#ffe9a0')}${c(28, 46, 1.4, '#ffe9a0')}${shine(22, 28)}`,
  avocado: () => `${p('M32 8c9 0 12 14 14 24 2 12-6 24-14 24S16 44 18 32C20 22 23 8 32 8z', '#3a6a22')}${p('M32 15c6 0 8 11 10 19 1 9-4 17-10 17s-11-8-10-17c2-8 4-19 10-19z', '#cfe58a')}${c(32, 38, 8, '#8a5a2a')}${shine(29, 35, 3, 2)}`,
  herb: () => `${line('M32 56V24', '#3f8a41', 2.6)}${leaf(32, 38, -40, 1.1, '#4fa34a')}${leaf(32, 38, -140, 1.1, '#3f9d4e')}${leaf(32, 26, -60, 1, '#6fbf4a')}${leaf(32, 26, -120, 1, '#58b565')}${leaf(32, 16, -90, 0.9, '#7cc35a')}`,
  egg: () => `${e(32, 36, 17, 22, '#f6ead6')}${e(26, 28, 5, 9, '#ffffff', 20, 0.55)}${e(32, 36, 17, 22, '#d8c4a0', 0, 0.15)}`,
  cheese: () => `${p('M6 40L50 14c4-2 8 0 8 4v26c0 3-2 5-5 5H10c-4 0-6-4-4-9z', '#ffd24a')}${p('M6 40h52v9H10c-4 0-6-4-4-9z', '#f0b829')}${c(36, 28, 3.4, '#e0a020')}${c(46, 36, 2.6, '#e0a020')}${c(26, 44, 2.4, '#d99a10')}`,
  butter: () => `${p('M8 28l30-10 18 6v22l-30 10-18-6z', '#ffe27a')}${p('M8 28l18 6 30-10M26 34v22', '#f0c850', 'opacity=".0"')}${p('M8 28l18 6v22L8 50z', '#f0c850')}${p('M26 34l30-10v22L26 56z', '#ffeaa0')}${p('M8 28l30-10 18 6-30 10z', '#fff3c0')}`,
  milk: () => `${p('M18 22L32 8l14 14v34c0 2-2 4-4 4H22c-2 0-4-2-4-4z', '#f6f9ff')}${p('M18 22h28v8H18z', '#cfe0f5')}${r(22, 36, 20, 14, '#4a90d9', 4)}${c(32, 43, 3, '#ffffff')}`,
  cream: () => `${p('M18 22L32 8l14 14v34c0 2-2 4-4 4H22c-2 0-4-2-4-4z', '#fff6dc')}${p('M18 22h28v8H18z', '#f0dfae')}${r(22, 36, 20, 14, '#d9a23a', 4)}${c(32, 43, 3, '#ffffff')}`,
  yogurt: () => `${p('M14 20h36l-4 36c0 2-2 4-4 4H22c-2 0-4-2-4-4z', '#f6f9ff')}${r(12, 14, 40, 9, '#4a90d9', 4)}${r(20, 32, 24, 14, '#d9342a', 4)}`,
  flour: () => `${p('M16 14h32l6 42H10z', '#f1e4c8')}${p('M16 14h32l2 8H14z', '#d9c9a0')}${line('M32 28v22M28 32l4-4 4 4M28 40l4-4 4 4', '#c9a23a', 2)}`,
  bread: () => `${p('M8 36c0-12 10-22 24-22s24 10 24 22v16H8z', '#d9953f')}${p('M8 36c0-12 10-22 24-22s24 10 24 22z', '#e8aa55')}${line('M20 24l6 8M32 20l6 10M44 26l4 8', '#f6dba2', 3)}${shine(22, 22, 8, 3, -20)}`,
  pasta: () => `${[22, 16, 10].map((rr, i) => `<circle cx="32" cy="32" r="${rr}" fill="none" stroke="${i % 2 ? '#f0bd45' : '#f7cf63'}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${60 - i * 10} 7"/>`).join('')}${c(32, 32, 4, '#c9372c')}`,
  rice: () => `${p('M8 32h48c0 14-10 24-24 24S8 46 8 32z', '#f4f4f6')}${p('M12 32c2-12 10-18 20-18s18 6 20 18z', '#ffffff')}${[[22, 24], [32, 20], [42, 25], [28, 28], [38, 29]].map(([x, y]) => e(x, y, 3, 1.5, '#e8e0d0', x * 3)).join('')}`,
  oil: () => bottle('#cdb42d', '#fff6c0', '#4a3a1a', '#e8c020'),
  salt: () => `${p('M22 18h20l4 38c0 2-2 4-4 4H22c-2 0-4-2-4-4z', '#f4f8ff')}${p('M22 10h20c2 0 4 2 4 5v3H18v-3c0-3 2-5 4-5z', '#9aa2b0')}${c(28, 14, 1, '#4a4a55')}${c(36, 14, 1, '#4a4a55')}${r(23, 30, 18, 14, '#d9e2f2', 3)}`,
  spice: () => jar('#f0e6d8', '#4a3a2a', '#b8431d', '#fff2d0'),
  sugar: () => `${r(10, 30, 22, 22, '#ffffff', 3)}${r(32, 34, 20, 20, '#f4f4f8', 3)}${r(20, 14, 20, 20, '#ffffff', 3, -10)}${line('M14 36h14M36 40h12', '#d9dce8', 1.4)}`,
  honey: () => `${jar('#f6e2a0', '#8a5a2a', '#f0a21a', '#fff3c0')}${line('M44 4L36 20', '#8a5a2a', 3)}`,
  chocolate: () => `${r(12, 10, 40, 44, '#5a3320', 4)}${[0, 1, 2].map((i) => [0, 1, 2, 3].map((j) => r(15 + i * 12, 13 + j * 10.5, 11, 9, '#7a4a2a', 2)).join('')).join('')}${r(12, 10, 40, 8, '#c9342b', 3)}`,
  nuts: () => `${e(24, 36, 13, 16, '#c9a066', -15)}${e(42, 34, 12, 15, '#b98a50', 20)}${line('M24 24v24M42 22v24', '#8a6a3a', 1.6)}${e(32, 46, 9, 6, '#d9b078', 5)}`,
  beans: () => `${e(20, 34, 9, 15, '#8a2f22', -25)}${e(34, 28, 9, 15, '#a8432d', 15)}${e(44, 42, 9, 14, '#8a2f22', -50)}${e(26, 46, 8, 12, '#a8432d', 60)}${shine(32, 22, 3, 6, 15)}`,
  lentils: () => `${[[18, 28], [30, 22], [42, 28], [22, 40], [36, 38], [48, 40], [28, 50], [42, 50]].map(([x, y], i) => c(x, y, 6, ['#e0a23a', '#c9811a', '#e8b84a'][i % 3])).join('')}`,
  chicken: () => `${p('M44 8c10 4 14 14 8 24-4 6-12 8-18 6L18 52c-3 3-8 1-8-3s2-6 4-8l14-16c-2-6 0-14 8-18 3-2 5-2 8 1z', '#c9792c')}${p('M42 12c6 2 10 8 6 16-3 4-8 5-12 3 2-6 2-12 6-19z', '#e0983f')}${r(10, 46, 10, 6, '#f1e6d2', 3, -40)}${shine(40, 20, 4, 6, 30)}`,
  beef: () => `${p('M10 30c0-14 14-20 26-18 14 2 20 12 16 24-4 12-20 18-32 12-6-4-10-10-10-18z', '#b0432d')}${line('M20 24c8 2 14 8 18 16M26 20c6 6 10 12 12 20', '#f1c8b0', 2.4, 'opacity=".75"')}${e(40, 34, 5, 4, '#f1d8c0')}${shine(22, 22, 6, 3)}`,
  pork: () => `${p('M12 30c0-12 12-18 24-16 12 2 18 10 16 22-2 12-16 18-28 14-8-3-12-10-12-20z', '#e8a090')}${p('M18 22c8-6 20-6 28 2', '#f6c8bc', 'opacity=".0"')}${e(38, 34, 8, 6, '#f6d0c4')}${r(46, 30, 8, 5, '#f1e6d2', 2, 20)}${shine(22, 22, 6, 3)}`,
  bacon: () => `${p('M8 20c10-6 20 6 30 0s14-6 18 0v12c-4-6-8-6-18 0S18 38 8 32z', '#c9654a')}${p('M8 34c10-6 20 6 30 0s14-6 18 0v12c-4-6-8-6-18 0S18 52 8 46z', '#d9755a')}${line('M10 26c10-5 20 5 30 0s12-4 14 0', '#f1c8b0', 3)}${line('M10 40c10-5 20 5 30 0s12-4 14 0', '#f1c8b0', 3)}`,
  sausage: () => `${r(8, 22, 48, 18, '#a8452d', 9, -18)}${line('M20 36l8-8M32 32l8-8M44 28l6-6', '#5e1f12', 2)}${shine(20, 30, 8, 2, -18)}`,
  fish: () => `${p('M6 32c8-12 20-16 32-10 6 3 10 7 12 10-2 3-6 7-12 10-12 6-24 2-32-10z', '#6aa6d9')}${p('M50 32l10-10v20z', '#4a86b9')}${p('M14 32c8-8 18-10 28-4', '#a8d0ee', 'opacity=".0"')}${c(18, 29, 2, '#ffffff')}${c(18, 29, 1, '#222833')}${line('M26 24c4 6 4 10 0 16M34 24c4 6 4 10 0 16', '#8ab8e0', 1.6)}${shine(28, 24, 8, 2, -10)}`,
  shrimp: () => `${p('M16 16c14-6 32 0 34 16 2 12-8 22-20 22-4 0-8-1-10-3 8 0 18-4 20-12 2-10-8-16-20-14z', '#f27c48')}${line('M24 20c4-1 8 0 10 1M30 26c4 0 8 2 10 4M32 34c4 2 6 4 6 8', '#d9602f', 1.8)}${p('M12 14l8-6-2 10z', '#e66a36')}${c(22, 24, 1.6, '#222')}${shine(38, 26, 3, 7, 30)}`,
  tofu: () => `${p('M10 28l22-8 22 8v18l-22 8-22-8z', '#f6efe0')}${p('M10 28l22 8v18l-22-8z', '#e4d8c0')}${p('M10 28l22-8 22 8-22 8z', '#fffaf0')}`,
  wine: () => `${p('M22 8h20c2 14 0 26-10 28-10-2-12-14-10-28z', '#ffffff', 'opacity=".35"')}${p('M23 20h18c0 10-2 16-9 18-7-2-9-8-9-18z', '#9c1f2e')}${line('M32 38v16', '#dfe3ea', 3)}${line('M22 56h20', '#dfe3ea', 3)}${shine(26, 24, 2, 6, 10)}`,
  beer: () => `${p('M14 20h26v34c0 3-2 5-5 5H19c-3 0-5-2-5-5z', '#f0b429')}${p('M40 26h6c4 0 6 3 6 7s-2 7-6 7h-6', 'none', 'stroke="#dfe3ea" stroke-width="3.5"')}${p('M12 20c0-6 4-9 8-8 2-4 8-4 10 0 4-1 10 1 10 8z', '#ffffff')}${line('M22 28v22M30 28v22', '#ffd966', 2, 'opacity=".6"')}`,
  spirit: () => bottle('#8a5a2a', '#fff2d0', '#3a2a1a', '#c9811a'),
  coffee: () => `${p('M10 28h34v12c0 8-6 14-14 14h-6c-8 0-14-6-14-14z', '#f4f4f8')}${p('M44 32h4c4 0 6 2 6 6s-2 6-6 6h-5', 'none', 'stroke="#f4f4f8" stroke-width="3.4"')}${e(27, 28, 17, 5, '#5a3320')}${line('M20 20c-3-4 3-6 0-10M30 20c-3-4 3-6 0-10', '#cfd2dc', 2, 'opacity=".7"')}`,
  ice: () => `${r(12, 24, 22, 22, '#bfe4f7', 5, -12)}${r(30, 28, 22, 22, '#d6eefb', 5, 14)}${shine(20, 30, 5, 2, -30)}${shine(40, 34, 5, 2, 20)}`,
  water: () => `${p('M32 8c10 12 18 20 18 30a18 18 0 0 1-36 0c0-10 8-18 18-30z', '#4aa3e0')}${shine(24, 38, 3, 8, 20)}`,
  stock: () => `${p('M10 30h44l-3 22c0 3-3 5-6 5H19c-3 0-6-2-6-5z', '#8a8a95')}${r(8, 26, 48, 6, '#a8a8b4', 3)}${line('M22 18c-3-4 3-6 0-10M32 18c-3-4 3-6 0-10M42 18c-3-4 3-6 0-10', '#cfd2dc', 2.2, 'opacity=".75"')}${r(24, 38, 16, 8, '#d9a23a', 3)}`,
  sauce: () => bottle('#d9342a', '#fff2d0', '#f6f6f6', '#b52a20'),
  mustard: () => bottle('#e0b020', '#fff2d0', '#c97a3a', '#d9a010'),
  vinegar: () => bottle('#e8d8b8', '#8a3a2a', '#4a3a2a', '#c98a4a'),
  yeast: () => `${r(12, 16, 40, 36, '#d9b44a', 4)}${r(12, 16, 40, 10, '#b8942a', 3)}${r(20, 32, 10, 10, '#f6e6b0', 2)}${r(34, 34, 10, 8, '#f6e6b0', 2)}`,
  spoon: () => `${e(24, 24, 11, 14, '#e8e8ee', -30)}${r(28, 28, 5, 32, '#cfd2dc', 2, -30)}${e(22, 22, 7, 8, '#ffffff', -30, 0.9)}`,
  tortilla: () => `${c(32, 34, 22, '#e0b660')}${c(32, 34, 17, '#efca78')}${c(24, 30, 2, '#c99a40')}${c(38, 38, 2, '#c99a40')}${c(36, 26, 1.6, '#c99a40')}${c(26, 42, 1.6, '#c99a40')}${shine(24, 24, 6, 2)}`,
  coconut: () => `${p('M8 34c0-14 10-22 24-22s24 8 24 22c0 10-10 20-24 20S8 44 8 34z', '#8a5a2a')}${p('M14 34c0-10 8-16 18-16s18 6 18 16c0 8-8 14-18 14S14 42 14 34z', '#ffffff')}${p('M20 34c0-6 5-10 12-10s12 4 12 10c0 5-5 9-12 9s-12-4-12-9z', '#f0e8d8')}`,
  can: () => `${r(14, 12, 36, 44, '#b0b4c0', 5)}${r(14, 12, 36, 7, '#d4d8e2', 4)}${r(14, 49, 36, 7, '#d4d8e2', 4)}${r(14, 24, 36, 22, '#d9342a')}${c(32, 35, 6, '#fff2d0')}`,
  jarred: () => jar('#f0e6d8', '#c9342b', '#b52a20', '#fff2d0'),
  plate: () => `${c(32, 34, 24, '#e8e8ee')}${c(32, 34, 17, '#f6f6fa')}${line('M8 18v28M56 18v28', '#cfd2dc', 3)}`,
};

const RULES = [
  [/zoltk|jaj/, 'egg'], [/boczek|guanciale|pancetta/, 'bacon'], [/kielbas|salami|parowk|bratwurst|pepperoni|chorizo/, 'sausage'], [/szynk|karkow|lopatk|schab|zebr|wieprz/, 'pork'],
  [/kurczak|drob|udk|skrzydel|piers|indyk|kaczk/, 'chicken'], [/wolow|mieso|mielon|jagnie|cielec|policzk|stek|poledw|szponder|watrob/, 'beef'], [/krewetk|kalmar|malz|ostryg/, 'shrimp'],
  [/losos|dorsz|sledz|pstrag|karp|tunczyk|ryba|ryby|anchois|morszczuk|mintaj|sandacz/, 'fish'], [/tofu|tempeh/, 'tofu'],
  [/makaron|spaghetti|penne|tagliatelle|fettuccine|lasagne|gnocchi|ditalini|ramen|lazanki|kolanka|tonnarelli/, 'pasta'], [/ryz|risotto|komosa|bulgur|kasza|pszenica|peczak|platki owsiane/, 'rice'],
  [/ziemniak|puree|frytk/, 'potato'], [/marchew/, 'carrot'], [/cebul|szalot|\bpor\b|szczypior/, 'onion'], [/czosnek/, 'garlic'], [/passata|sos pomidorowy|pelati|puszk/, 'can'], [/pomidor|koncentrat/, 'tomato'],
  [/papryk(?!a mielona|a slodka|a wedzona)|papryka/, 'pepper'], [/chili|jalape|cayenne|papryczk/, 'chili'], [/ogorek|ogorki/, 'cucumber'], [/cukini/, 'zucchini'], [/salat|szpinak|rukola|kapust|szczaw|botwin|jarmuz|seler naciowy/, 'leafy'],
  [/brokul|kalafior/, 'broccoli'], [/grzyb|pieczark|borowik/, 'mushroom'], [/baklazan/, 'eggplant'], [/kukurydz/, 'corn'], [/dyni/, 'pumpkin'], [/awokado/, 'avocado'],
  [/cytryn|limonk/, 'lemon'], [/pomarancz|mandaryn|grejpfrut/, 'orange'], [/jablk|gruszk/, 'apple'], [/banan/, 'banana'], [/truskawk|malin|zurawin|wisni|jagod|boroweck|porzeczk|owoce/, 'berry'],
  [/ananas|mango|brzoskw|morel|sliwk/, 'orange'], [/kokos(?!owy krem)/, 'coconut'], [/mleko kokosowe|krem kokosowy/, 'can'],
  [/maslo|margaryn|smalec/, 'butter'], [/ser\b|serek|mozzarell|parmezan|pecorino|feta|cheddar|gorgonzol|ricott|mascarpone|twarog|gruyere|kajmak|emmental|suluguni/, 'cheese'],
  [/smietan|smietank/, 'cream'], [/jogurt|kefir|maslank/, 'yogurt'], [/mleko|napoj roslinny/, 'milk'],
  [/maka|skrobia|bulka tarta|panko|kasza manna|semolin/, 'flour'], [/chleb|bulk|bagiet|ciabatt|grzank|tosty|tostow|herbatnik|biszkopt|savoiardi|sucharki|ciasto/, 'bread'], [/tortill|pita|naan|chipsy/, 'tortilla'],
  [/wino|prosecco|sherry|marsala|vermouth/, 'wine'], [/piwo/, 'beer'], [/wodka|whisk|bourbon|\brum\b|\bgin\b|tequil|cachaca|likier|triple|campari|aperol|spirytus/, 'spirit'], [/kawa|espresso/, 'coffee'],
  [/\blod\b|lody|kostki lodu/, 'ice'], [/bazyli|natka|koper|mieta|kolendr|oregano|szalwi|lubczyk|ziola|zioła|tymianek|rozmaryn|majeranek|liscie|lisc|pietruszk|szczypiorek/, 'herb'],
  [/oliw|olej|tluszcz/, 'oil'], [/miod|syrop|dzem|konfitur/, 'honey'], [/czekolad|kakao|brownie/, 'chocolate'], [/orzech|migdal|pistacj|ziemne|piniow|mak\b|pestki|sezam/, 'nuts'],
  [/fasol|groch|bob|ciecierzyc|zielony groszek|groszek/, 'beans'], [/soczewic/, 'lentils'], [/cukier/, 'sugar'], [/\bsol\b|sol morska|sol gruba/, 'salt'],
  [/pieprz|kmin|cynamon|papryka|curry|kurkuma|gozdzik|anyz|szafran|galka|przypraw|imbir|wanili|chrzan/, 'spice'],
  [/keczup|sos bbq|sos |tabasco|sriracha|sos$/, 'sauce'], [/musztard|majonez|tahini|pasta /, 'mustard'], [/ocet/, 'vinegar'], [/droz/, 'yeast'], [/proszek|soda|zelatyn|agar/, 'spoon'],
  [/woda|wod\b|woda gazowana|tonik|piwo imbirowe|sok /, 'water'], [/bulion|rosol|fond|wywar/, 'stock'],
];

/** Klucz ikony dla nazwy składnika. */
export function ingIconKey(name) {
  const n = norm(name);
  for (const [re, key] of RULES) if (re.test(n)) return key;
  return 'plate';
}

const cache = new Map();
/** Data URL ikony (z pamięcią podręczną) — do <img src>. */
export function ingIconUrl(name) {
  const key = ingIconKey(name);
  let u = cache.get(key);
  if (!u) {
    u = iconUrlFor(key);
    cache.set(key, u);
  }
  return u;
}

export const ING_ICON_KEYS = Object.keys(GLYPHS);
export function iconSvg(key) { return shadeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="128" height="128"><defs></defs>${(GLYPHS[key] || GLYPHS.plate)()}</svg>`); }
export const iconUrlFor = (key) => 'data:image/svg+xml;utf8,' + encodeURIComponent(iconSvg(key));

/* Cieniowanie 3D: płaskie kolory → gradienty (jak w ilustracjach dań). */
const hex = (cc) => [1, 3, 5].map((i) => parseInt(cc.slice(i, i + 2), 16));
const toHex = (a) => '#' + a.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const lighten = (cc, t) => toHex(hex(cc).map((v) => v + (255 - v) * t));
const darken = (cc, t) => toHex(hex(cc).map((v) => v * (1 - t)));
function shadeSvg(svg) {
  const map = new Map();
  let defs = '';
  const out = svg.replace(/(fill|stroke)="(#[0-9a-fA-F]{6})"/g, (m, attr, col0) => {
    if (attr === 'stroke') return m;
    const col = col0.toLowerCase();
    if (col === '#ffffff') return m;                       // odblaski zostają czyste
    let id = map.get(col);
    if (!id) { id = 'g' + map.size; map.set(col, id); defs += `<radialGradient id="${id}" cx=".34" cy=".28" r=".95"><stop offset="0" stop-color="${lighten(col, 0.26)}"/><stop offset=".6" stop-color="${col}"/><stop offset="1" stop-color="${darken(col, 0.22)}"/></radialGradient>`; }
    return `fill="url(#${id})"`;
  });
  return out.replace('<defs></defs>', `<defs>${defs}</defs>`);
}
