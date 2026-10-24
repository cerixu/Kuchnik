/* ==========================================================================
   art-extra.js — dodatkowe motywy i warianty ilustracji potraw.
   Specyfikacja motywu: „rodzaj” albo „rodzaj:wariant”, np. soup:red.
   ========================================================================== */
import { shadow, plate, leaf, dots, circ, ell, rect, wedge, lemonWheel, orangeWheel, bowl } from './art-kit.js';

const P = Math.PI / 180;
const ring = (cx, cy, r, n, f, size = 3, a0 = 0) => Array.from({ length: n }, (_, i) => circ(cx + r * Math.cos((a0 + i * 360 / n) * P), cy + r * Math.sin((a0 + i * 360 / n) * P), size, f)).join('');
const swirl = (c = '#fff', o = 0.85) => `<path d="M72 96 C88 78 112 118 130 98" stroke="${c}" stroke-opacity="${o}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M80 112 C96 100 108 124 124 112" stroke="${c}" stroke-opacity="${o * 0.7}" stroke-width="4" fill="none" stroke-linecap="round"/>`;

/* ---------- Zupy ---------- */
const SOUP = {
  '': ['#eaa63e', 'veg'], clear: ['#f3d27a', 'noodle'], red: ['#9c1f2e', 'cream'], tomato: ['#d9532f', 'basil'], pumpkin: ['#f0a24a', 'seeds'],
  green: ['#8fc25c', 'cream'], white: ['#efe2bd', 'egg'], mushroom: ['#a0713f', 'mush'], asia: ['#e8643a', 'shrimp'], cold: ['#e0483a', 'cold'],
};
const soup = (v) => {
  const [b, x] = SOUP[v] || SOUP[''];
  let extra = '';
  if (x === 'veg') extra = dots([[78, 112], [118, 120], [122, 82], [84, 78], [104, 98]], 6, '#f08a24') + dots([[92, 120], [134, 100], [70, 98], [110, 76]], 3.2, '#5fb84c');
  if (x === 'noodle') extra = [0, 1, 2, 3, 4].map((i) => `<path d="M${64 + i * 4} ${84 + i * 9} q10 -9 20 0 t20 0 t20 0 t18 0" stroke="#f8e7a8" stroke-width="3.4" fill="none" stroke-linecap="round"/>`).join('') + dots([[78, 112], [122, 82], [104, 130]], 5.5, '#f08a24') + dots([[90, 100], [132, 108], [76, 86]], 2.6, '#5fb84c');
  if (x === 'cream') extra = swirl('#fff', 0.9) + dots([[118, 122], [86, 82]], 3, '#4fa34a');
  if (x === 'basil') extra = swirl('#fff4de', 0.9) + leaf(94, 100, -20, 0.9) + dots([[120, 118], [84, 120], [124, 84]], 2.6, '#fff4de');
  if (x === 'seeds') extra = swirl('#fff6e0', 0.9) + [[96, 104, 10], [110, 98, -20], [86, 112, 30], [120, 112, 0]].map(([px, py, a]) => ell(px, py, 4.4, 2.2, '#6a8a3a', a)).join('');
  if (x === 'egg') extra = ell(100, 98, 20, 15, '#fffdf6') + circ(100, 98, 8, '#ffb81f') + [[70, 120], [128, 124], [80, 78], [130, 82]].map(([px, py]) => circ(px, py, 9, '#c9704a') + circ(px, py, 4, '#e2937a')).join('') + dots([[104, 130], [70, 100]], 2.5, '#4fa34a');
  if (x === 'mush') extra = [[78, 90, 20], [116, 84, -10], [96, 120, 5], [128, 112, 25]].map(([px, py, a]) => ell(px, py, 12, 7, '#d6b184', a) + ell(px, py + 2, 8, 3, '#b58a5a', a)).join('') + dots([[100, 98], [70, 112]], 3, '#5fb84c');
  if (x === 'shrimp') extra = [[78, 90, 0], [120, 110, 180]].map(([px, py, a]) => `<g transform="translate(${px} ${py}) rotate(${a})"><path d="M-14 -8 A15 15 0 1 1 -6 14" stroke="#f27c48" stroke-width="10" fill="none" stroke-linecap="round"/></g>`).join('') + dots([[104, 80], [136, 90], [90, 124]], 4, '#e5483a') + leaf(100, 100, 30, 0.7) + dots([[70, 118], [118, 74]], 2.6, '#4fa34a');
  if (x === 'cold') extra = swirl('#fff4e0', 0.6) + dots([[80, 80], [122, 118], [92, 124], [126, 86]], 3.4, '#5fb84c') + dots([[100, 98], [70, 108]], 3, '#f6c453');
  return `${plate(74)}<circle cx="100" cy="100" r="60" fill="#3c3c40"/><circle cx="100" cy="100" r="54" fill="${b}"/><circle cx="100" cy="100" r="54" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="3"/>${extra}`;
};

/* ---------- Makarony ---------- */
const PASTA = {
  '': ['#f2c755', '#c9372c', 'basil'], white: ['#f4d98a', '#f8ecc4', 'bacon'], pesto: ['#e8cd6e', '#5c9c3d', 'pine'], ragu: ['#f2c755', '#8a2f22', 'meat'],
  oil: ['#f2c755', null, 'parsley'], asia: ['#e8b86a', null, 'asia'],
};
const pasta = (v) => {
  const [nc, sc, x] = PASTA[v] || PASTA[''];
  const nest = [40, 33, 26, 19].map((r, i) => `<circle cx="100" cy="100" r="${r}" fill="none" stroke="${i % 2 ? nc : '#f9d977'}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${70 - i * 8} 9" transform="rotate(${i * 37} 100 100)"/>`).join('');
  let top = '';
  if (sc && x !== 'bacon') top += circ(100, 98, 15, sc) + circ(95, 93, 6, 'rgba(255,255,255,.3)');
  if (x === 'basil') top += leaf(94, 84, -50, 0.9) + dots([[70, 70], [130, 74], [72, 128], [128, 126], [100, 144]], 2.4, '#fff4cf');
  if (x === 'bacon') top += circ(100, 98, 20, sc) + dots([[90, 92], [108, 100], [96, 108], [112, 90], [88, 104]], 4, '#c06a4a') + dots([[100, 96], [92, 100], [110, 110], [104, 88], [84, 96]], 1.6, '#3a2a1a');
  if (x === 'pine') top += dots([[88, 86], [112, 92], [92, 112], [110, 110]], 3, '#f1dca6') + dots([[76, 76], [126, 80], [80, 128]], 2.6, '#fff4cf');
  if (x === 'meat') top += dots([[92, 92], [108, 98], [96, 106], [106, 88]], 3, '#5a1c14') + dots([[70, 76], [130, 78], [76, 126], [126, 128], [100, 144]], 2.6, '#fff4cf');
  if (x === 'parsley') top += dots([[84, 84], [112, 88], [92, 110], [118, 110], [100, 96], [76, 104]], 2.6, '#4fa34a') + dots([[96, 84], [110, 104]], 2, '#d9342a');
  if (x === 'asia') top += [[84, 92, 0], [116, 106, 180]].map(([px, py, a]) => `<g transform="translate(${px} ${py}) rotate(${a})"><path d="M-12 -7 A13 13 0 1 1 -5 12" stroke="#f27c48" stroke-width="8" fill="none" stroke-linecap="round"/></g>`).join('') + dots([[100, 84], [96, 116], [126, 90], [72, 108]], 3, '#d9a56a') + wedge(144, 132, -30, 0.55, '#8fd14a') + dots([[110, 100], [88, 112]], 2.4, '#4fa34a');
  return `${plate(74)}${nest}${top}`;
};

/* ---------- Pizza ---------- */
const pizza = (v) => {
  const sauce = v === 'white' ? '#f3e2b0' : '#d9412b';
  const cheese = [[78, 80, 14], [120, 76, 13], [100, 108, 16], [70, 116, 12], [130, 114, 13], [98, 66, 8], [146, 98, 8], [56, 94, 8]];
  let top = cheese.map(([x, y, r]) => `${circ(x, y, r, '#fff3bd')}${circ(x - r * 0.25, y - r * 0.25, r * 0.55, '#fffbe3')}`).join('');
  if (v === 'pepperoni') top += [[84, 92], [118, 90], [100, 120], [70, 112], [132, 118], [102, 70], [60, 92]].map(([x, y]) => `${circ(x, y, 10, '#b8302a')}${circ(x - 2, y - 2, 4, '#d9534a')}`).join('');
  else if (v === 'veg') top += [[84, 92], [120, 86], [104, 118], [72, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="none" stroke="#4fa34a" stroke-width="3.4"/>`).join('') + dots([[96, 76], [128, 108], [66, 98], [110, 100]], 4, '#2f2a24') + dots([[90, 112], [132, 90]], 5, '#e2c8a0');
  else top += leaf(86, 96, -30, 0.9) + leaf(112, 90, 40, 0.9) + leaf(92, 120, 100, 0.85) + leaf(126, 120, -20, 0.8);
  return `${plate(74)}${circ(100, 100, 64, '#e3a352')}${circ(100, 100, 58, '#cf8a3a')}${circ(100, 100, 53, sauce)}${top}<circle cx="100" cy="100" r="64" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>`;
};

/* ---------- Sałatki ---------- */
const salad = (v) => {
  const leaves = [[76, 84, -30, '#7cc35a'], [118, 80, 30, '#5aa845'], [98, 112, 80, '#9bd36f'], [70, 116, -60, '#5aa845'], [128, 116, 20, '#7cc35a'], [100, 76, 0, '#9bd36f']];
  const base = `${bowl(74)}`;
  if (v === 'caprese') return `${plate(74)}${[0, 1, 2, 3, 4, 5].map((i) => { const a = (i * 60 - 90) * P; return circ(100 + 40 * Math.cos(a), 100 + 40 * Math.sin(a), 15, '#e5483a') + circ(100 + 40 * Math.cos(a) - 3, 100 + 40 * Math.sin(a) - 3, 4, '#fff', 0.35) + circ(100 + 28 * Math.cos(a + 0.52), 100 + 28 * Math.sin(a + 0.52), 14, '#fffaf0'); }).join('')}${leaf(92, 96, -30, 1)}${leaf(104, 102, 60, 0.9)}${leaf(86, 108, 120, 0.8)}`;
  if (v === 'potato') return `${base}${circ(100, 100, 56, '#f4ecd0')}${dots([[80, 86], [108, 78], [124, 100], [94, 112], [72, 108], [112, 124], [86, 130], [128, 120]], 6, '#ffb15e')}${dots([[92, 94], [118, 88], [100, 102], [80, 120], [122, 112]], 3.4, '#6cc04a')}${[[100, 86], [76, 98], [116, 118], [96, 124]].map(([x, y]) => rect(x - 5, y - 5, 10, 10, '#fff8e0', 2, 20)).join('')}${dots([[104, 100], [88, 100]], 2.6, '#ffd24a')}${leaf(110, 70, -50, 0.5)}`;
  if (v === 'slaw') return `${base}${circ(100, 100, 56, '#eef2dc')}${[[80, 88], [112, 82], [126, 108], [96, 114], [72, 110]].map(([x, y], i) => `<path d="M${x - 14} ${y} q8 -10 14 0 t14 0" stroke="${i % 2 ? '#d9e6b0' : '#f4f6e4'}" stroke-width="6" fill="none" stroke-linecap="round"/>`).join('')}${dots([[90, 98], [116, 96], [100, 122], [84, 76]], 4, '#f08a24')}${leaf(112, 124, 30, 0.6)}`;
  if (v === 'greek') return `${base}${[[76, 86], [112, 82], [130, 108], [92, 116], [70, 112]].map(([x, y]) => `<path d="M${x - 12} ${y} q12 -14 24 0 q-12 8 -24 0Z" fill="#e5483a"/>`).join('')}${[[100, 98], [64, 98], [120, 130]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#d7efbd" stroke="#8cc063" stroke-width="2"/>`).join('')}${[[90, 100], [116, 112], [78, 124], [124, 86]].map(([x, y]) => rect(x - 6, y - 6, 12, 12, '#fffdf3', 2, 15)).join('')}${dots([[104, 124], [72, 98], [132, 96], [98, 78]], 5, '#3a3a2c')}<path d="M84 74 q14 -10 28 0" stroke="#b05a9a" stroke-width="3" fill="none"/>`;
  if (v === 'caesar') return `${base}${[[80, 90, -20], [118, 86, 20], [100, 116, 90], [74, 118, -50], [130, 116, 10]].map(([x, y, a]) => ell(x, y, 28, 14, '#a9d77a', a) + ell(x, y, 18, 4, '#d9efb9', a)).join('')}${[[90, 100], [116, 104], [100, 84], [80, 122], [122, 126]].map(([x, y]) => rect(x - 7, y - 7, 14, 14, '#e0a850', 3, x)).join('')}${[[100, 112], [84, 94], [124, 94]].map(([x, y]) => `<path d="M${x - 10} ${y} q10 -8 20 0 q-10 4 -20 0Z" fill="#fff4cf"/>`).join('')}`;
  return `${base}${leaves.map(([x, y, a, c]) => ell(x, y, 26, 15, c, a)).join('')}${[[88, 92], [122, 100], [78, 118], [108, 126]].map(([x, y]) => `${circ(x, y, 10, '#e5483a')}${circ(x - 3, y - 3, 3.4, '#fff', 0.5)}`).join('')}${[[104, 84], [66, 98], [132, 82]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#d7efbd" stroke="#8cc063" stroke-width="2"/>`).join('')}${dots([[96, 108], [140, 112], [70, 80]], 5, '#3a3a2c')}${[[118, 118], [84, 70], [112, 100]].map(([x, y]) => rect(x, y, 9, 9, '#fffaf0', 1.5, 20)).join('')}`;
};

/* ---------- Sosy ---------- */
const SAUCE = { '': ['#c9342b', 'basil'], white: ['#f3e3a8', 'pepper'], green: ['#6ea23e', 'nuts'], brown: ['#7a4a2a', 'gloss'], mayo: ['#f7f0da', 'yolk'], yellow: ['#f6d36a', 'gloss'], oil: ['#f2c94c', 'oil'], hummus: ['#e8c98a', 'hummus'], jogurt: ['#faf6ea', 'cucumber'] };
const sauce = (v) => {
  const [c, x] = SAUCE[v] || SAUCE[''];
  let top = `<path d="M66 92 C84 74 112 106 134 88" stroke="#fff" stroke-opacity=".35" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  if (x === 'basil') top += dots([[116, 116], [84, 118], [102, 72], [128, 104]], 3.4, '#f6c453', 0.9) + leaf(88, 98, -20, 1.1) + leaf(106, 108, 60, 0.9);
  if (x === 'pepper') top += dots([[90, 92], [112, 104], [100, 120], [124, 88], [80, 112]], 1.8, '#3a2a1a');
  if (x === 'nuts') top += dots([[90, 92], [112, 104], [100, 120]], 3, '#f1dca6') + leaf(96, 86, -30, 0.7);
  if (x === 'gloss') top += `<path d="M78 112 C96 126 116 120 126 104" stroke="#fff" stroke-opacity=".3" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if (x === 'yolk') top += circ(100, 100, 14, '#fbeaa0', 0.5);
  if (x === 'oil') top += dots([[84, 92], [114, 108], [96, 120], [122, 86]], 6, '#fff0a0', 0.55) + leaf(96, 96, 20, 0.7);
  if (x === 'hummus') top = `<circle cx="100" cy="100" r="24" fill="#d6a85a" opacity=".55"/>${dots([[88, 94], [112, 108], [100, 90], [96, 114], [118, 92]], 5, '#e0b25f')}<path d="M70 100 C86 84 114 116 130 100" stroke="#d58a2a" stroke-width="3" fill="none" opacity=".7"/>${dots([[96, 100], [104, 104]], 2, '#b8431d')}`;
  if (x === 'cucumber') top += dots([[84, 94], [112, 88], [98, 116], [122, 108], [78, 112]], 5, '#cfe8a4') + dots([[104, 100], [90, 104]], 2.4, '#4fa34a') + leaf(100, 84, 10, 0.6);
  return `${plate(70)}${circ(100, 100, 52, '#3c3c40')}${circ(100, 100, 46, c)}${top}${rect(132, 118, 12, 46, '#d9d2c6', 6, -40)}${ell(156, 154, 16, 10, '#d9d2c6', -40)}`;
};

/* ---------- Pieczywo ---------- */
const bread = (v) => {
  if (v === 'round') return `${shadow(100, 152, 70, 10)}${circ(100, 100, 62, '#bf7a28')}${circ(100, 98, 57, '#dc9a43')}<path d="M64 98 H136 M100 62 V134" stroke="#f6dba2" stroke-width="9" stroke-linecap="round"/>${dots([[74, 80], [128, 120], [86, 124], [120, 78], [104, 112]], 1.8, '#fff', 0.7)}`;
  if (v === 'rolls') return `${shadow(100, 152, 76, 9)}${[[66, 98], [102, 84], [138, 100], [84, 126], [120, 128]].map(([x, y]) => `${ell(x, y, 24, 20, '#bf7a28')}${ell(x, y - 2, 21, 17, '#dc9a43')}<path d="M${x - 10} ${y - 4} l20 8" stroke="#f6dba2" stroke-width="4" stroke-linecap="round"/>`).join('')}`;
  return `${shadow(100, 150, 76, 10)}${ell(100, 104, 72, 46, '#bf7a28')}${ell(100, 100, 66, 40, '#dc9a43')}${[0, 1, 2, 3].map((i) => `<rect x="${64 + i * 18}" y="${78 + (i % 2) * 2}" width="9" height="42" rx="4.5" fill="#f6dba2" transform="rotate(-28 ${68 + i * 18} 100)"/>`).join('')}${dots([[70, 80], [128, 86], [92, 124], [136, 112], [80, 108], [112, 70]], 1.8, '#fff', 0.7)}`;
};

/* ---------- Ciasta i desery ---------- */
const CAKE = { '': ['#f2d193', '#e8b974', '#fff6e8', 'berry'], cheese: ['#c98a47', '#f7e7b0', '#fff6e0', 'sauce'], choc: ['#6b3a22', '#8a5233', '#4a2616', 'rasp'], tiramisu: ['#e6cfa0', '#f5e9cf', '#7a4a2a', 'cocoa'] };
const cake = (v) => {
  const [l1, l2, cr, top] = CAKE[v] || CAKE[''];
  const topEl = top === 'berry' ? [[84, 76], [102, 70], [120, 76]].map(([x, y]) => `${circ(x, y, 9, '#d8344a')}${circ(x - 3, y - 3, 3, '#fff', 0.6)}`).join('') + leaf(98, 58, -60, 0.7)
    : top === 'sauce' ? `<path d="M70 82 C80 104 88 86 100 100 C112 86 120 104 130 82Z" fill="#c9283a"/>${dots([[88, 76], [110, 74], [100, 70]], 6, '#a8203a')}`
      : top === 'rasp' ? [[84, 76], [102, 70], [120, 76]].map(([x, y]) => `${circ(x, y, 8, '#c9283a')}${dots([[x - 2, y - 2], [x + 2, y + 1]], 2, '#e66a7a')}`).join('') + leaf(100, 56, -60, 0.6)
        : `${dots([[84, 78], [100, 76], [116, 80], [92, 84], [108, 86]], 3, '#3a2010', 0.6)}`;
  const mid = v === 'cheese' ? `<rect x="40" y="94" width="120" height="34" fill="${l2}"/><rect x="40" y="128" width="120" height="24" fill="${l1}"/><rect x="40" y="76" width="120" height="18" fill="#fbefc4"/>`
    : `<rect x="40" y="128" width="120" height="24" fill="${l1}"/><rect x="40" y="120" width="120" height="8" fill="${cr}"/><rect x="40" y="100" width="120" height="20" fill="${l2}"/><rect x="40" y="94" width="120" height="6" fill="${cr}"/><rect x="40" y="76" width="120" height="18" fill="${v === 'tiramisu' ? '#f5e9cf' : l1}"/>`;
  const drip = v === '' ? '<path d="M60 80 C70 100 80 82 92 98 C104 82 114 100 126 80 L130 76 L66 76Z" fill="#5e3420"/>' : v === 'choc' ? '<path d="M60 78 C70 98 80 80 92 96 C104 80 114 98 126 78 L130 74 L66 74Z" fill="#2e160c"/>' : v === 'tiramisu' ? '<rect x="40" y="74" width="120" height="8" fill="#7a4a2a"/>' : '';
  return `${shadow(100, 158, 76, 9)}<ellipse cx="100" cy="152" rx="76" ry="10" fill="#d9d9dd"/><ellipse cx="100" cy="150" rx="64" ry="7" fill="#2b2b2e"/><defs><clipPath id="c"><path d="M56 150 L144 150 L130 80 L70 80Z"/></clipPath></defs><g clip-path="url(#c)">${mid}${drip}</g><path d="M56 150 L144 150 L130 80 L70 80Z" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>${topEl}`;
};

/* ---------- Koktajle ---------- */
const COCK = { '': ['rocks', '#f08a3c', '#ffb066', 'peel'], red: ['rocks', '#d6322c', '#f0645a', 'orange'], spritz: ['wine', '#f58a3c', '#ffb066', 'orange'], highball: ['high', '#dff0b8', '#f4fbd8', 'mint'], martini: ['coupe', '#3a2418', '#e8d3b0', 'beans'], margarita: ['coupe', '#d8ec9a', '#f0f8c8', 'lime'] };
const cocktail = (v) => {
  const [shape, liq, top, g] = COCK[v] || COCK[''];
  const ice = (pts) => pts.map(([x, y, a]) => `<rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="5" fill="#fff" fill-opacity=".72" stroke="#fff" stroke-width="1.5" transform="rotate(${a} ${x} ${y})"/>`).join('');
  if (shape === 'coupe') return `${shadow(100, 164, 50, 6)}<path d="M100 120 V158 M72 160 H128" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M52 62 H148 L104 118 H96Z" fill="#fff" fill-opacity=".5" stroke="#fff" stroke-width="3"/><path d="M58 68 H142 L103 112 H97Z" fill="${liq}"/><path d="M58 68 H142 L136 76 H64Z" fill="${top}"/>${g === 'beans' ? dots([[88, 70], [100, 68], [112, 70]], 4.4, '#2b1a10') : ''}${g === 'lime' ? `${lemonWheel(142, 62, 15, '#8fd14a')}<path d="M52 62 H148" stroke="#fff" stroke-width="6" stroke-dasharray="2 3"/>` : ''}`;
  if (shape === 'wine') return `${shadow(100, 164, 44, 6)}<path d="M100 114 V156 M74 158 H126" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M58 38 H142 C146 80 126 114 100 114 C74 114 54 80 58 38Z" fill="#fff" fill-opacity=".5" stroke="#fff" stroke-width="3"/><path d="M62 56 H138 C140 86 124 108 100 108 C76 108 60 86 62 56Z" fill="${liq}"/>${ice([[84, 70, 12], [112, 74, -14], [98, 92, 20]])}${orangeWheel(128, 42, 16)}`;
  if (shape === 'high') return `${shadow(100, 162, 40, 6)}<path d="M64 30 H136 L128 158 H72Z" fill="#fff" fill-opacity=".5" stroke="#fff" stroke-width="3"/><path d="M68 56 H132 L126 152 H74Z" fill="${liq}"/>${ice([[88, 76, 10], [112, 82, -12], [98, 106, 18], [112, 128, 6]])}<path d="M118 14 L106 100" stroke="#e5483a" stroke-width="5" stroke-linecap="round"/>${[[80, 46, -30], [92, 38, 10], [106, 44, 40], [120, 40, -20]].map(([x, y, a]) => leaf(x - 10, y, a, 0.75, '#3f9d4e')).join('')}${lemonWheel(136, 60, 15, '#8fd14a')}`;
  return `${shadow(100, 160, 52, 7)}<path d="M58 70 L142 70 L132 156 L68 156Z" fill="#fff" fill-opacity=".55" stroke="#fff" stroke-width="3"/><path d="M62 96 L138 96 L131 150 L69 150Z" fill="${liq}"/><path d="M62 96 L138 96 L137 104 L63 104Z" fill="${top}"/>${ice([[80, 100, 18], [102, 104, -10], [122, 100, 14]])}<path d="M118 28 L106 98" stroke="#e5483a" stroke-width="5" stroke-linecap="round"/>${g === 'orange' ? orangeWheel(140, 72, 17) : `<path d="M126 60 q14 -6 16 10 q-12 2 -16 -10Z" fill="#f6a41b"/>`}<path d="M66 74 L72 150" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>`;
};

/* ---------- Pancakes / placki / naleśniki ---------- */
const pancakes = (v) => {
  const potato = v === 'potato';
  const c1 = potato ? '#c98a3e' : '#e0a24c', c2 = potato ? '#dea65a' : '#f0c274';
  const disc = (y) => `<ellipse cx="100" cy="${y + 8}" rx="56" ry="16" fill="${c1}"/><rect x="44" y="${y - 2}" width="112" height="10" fill="${c1}"/><ellipse cx="100" cy="${y - 2}" rx="56" ry="16" fill="${c2}"/>`;
  return `${shadow(100, 156, 70, 9)}<ellipse cx="100" cy="152" rx="76" ry="14" fill="#d9d9dd"/><ellipse cx="100" cy="149" rx="64" ry="9" fill="#2b2b2e"/>${[132, 114, 96, 78].map(disc).join('')}${potato ? `${ell(100, 68, 20, 9, '#fffdf6')}${leaf(94, 58, -30, 0.6)}${leaf(104, 60, 40, 0.6)}` : `<path d="M54 76 C60 98 70 80 80 100 C90 82 100 104 110 84 C120 104 130 86 146 76 C130 66 70 66 54 76Z" fill="#a65a1a" opacity=".9"/>${rect(88, 52, 24, 16, '#ffe27a', 4, -6)}${dots([[70, 70], [130, 70], [112, 62]], 7, '#d8344a')}`}`;
};

/* ---------- Tarta ---------- */
const tart = (v) => {
  const crust = Array.from({ length: 24 }, (_, i) => circ(100 + 68 * Math.cos(i * 15 * P), 100 + 68 * Math.sin(i * 15 * P), 7.5, '#d9a05a')).join('');
  let fill = '';
  if (v === 'apple') fill = `${circ(100, 100, 62, '#f2c860')}${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${100 + 18 * Math.cos(i * 45 * P)} ${100 + 18 * Math.sin(i * 45 * P)} q${24 * Math.cos((i * 45 + 20) * P)} ${24 * Math.sin((i * 45 + 20) * P)} ${40 * Math.cos((i * 45 + 8) * P)} ${40 * Math.sin((i * 45 + 8) * P)}" stroke="#c9763a" stroke-width="9" fill="none" stroke-linecap="round" opacity=".9"/>`).join('')}${circ(100, 100, 12, '#e8a24a')}`;
  else if (v === 'lemon') fill = `${circ(100, 100, 62, '#f7d84a')}${circ(100, 100, 50, '#fbe676')}${[0, 1, 2, 3, 4, 5].map((i) => lemonWheel(100 + 30 * Math.cos(i * 60 * P), 100 + 30 * Math.sin(i * 60 * P), 10)).join('')}`;
  else fill = `${circ(100, 100, 62, '#f6e2a4')}${ring(100, 100, 44, 12, '#c9283a', 7)}${ring(100, 100, 28, 8, '#3a4a9a', 6, 20)}${circ(100, 100, 12, '#c9283a')}`;
  return `${shadow(100, 160, 72, 8)}${circ(100, 100, 74, '#d9a05a')}${crust}${circ(100, 100, 64, '#e8b872')}${fill}${leaf(96, 92, -30, 0.5)}`;
};

/* ---------- Pudding / panna cotta / creme brulee ---------- */
const pudding = (v) => v === 'brulee'
  ? `${shadow(100, 154, 52, 7)}<ellipse cx="100" cy="120" rx="56" ry="16" fill="#e9dfd0"/><path d="M44 96 H156 L150 126 C146 142 54 142 50 126Z" fill="#fff"/><ellipse cx="100" cy="96" rx="56" ry="16" fill="#e9dfd0"/><ellipse cx="100" cy="96" rx="48" ry="12" fill="#c98a2f"/><ellipse cx="100" cy="94" rx="40" ry="9" fill="#e6ad4a"/><path d="M70 92 l10 6 M96 88 l8 8 M120 94 l-8 6" stroke="#8a5614" stroke-width="2"/>${leaf(120, 80, -20, 0.6)}`
  : `${shadow(100, 158, 46, 7)}<path d="M64 50 H136 L128 148 C126 156 74 156 72 148Z" fill="#fff" fill-opacity=".55" stroke="#fff" stroke-width="3"/><path d="M68 78 H132 L127 146 C125 152 75 152 73 146Z" fill="#fffaf0"/><path d="M68 78 H132 L131 92 C120 100 108 90 100 98 C92 90 80 100 69 92Z" fill="#c9283a"/>${dots([[86, 72], [104, 68], [118, 74]], 7, '#c9283a')}${dots([[84, 70], [102, 66]], 2.4, '#e66a7a')}${leaf(112, 56, -40, 0.6)}`;

/* ---------- Ciasteczka / brownie ---------- */
const cookies = (v) => v === 'brownie'
  ? `${plate(74)}${[[72, 84], [108, 84], [72, 118], [108, 118]].map(([x, y]) => `${rect(x - 17, y - 15, 34, 30, '#4a2616', 5)}${rect(x - 15, y - 13, 30, 14, '#6b3a22', 4)}${dots([[x - 6, y - 2], [x + 6, y + 6]], 2.6, '#f1dca6')}`).join('')}<path d="M60 104 H140" stroke="#fff" stroke-opacity=".3"/>`
  : `${plate(74)}${[[72, 84], [118, 78], [100, 112], [64, 118], [134, 116]].map(([x, y]) => `${circ(x, y, 20, '#b9783a')}${circ(x, y, 17, '#d9a05a')}${dots([[x - 7, y - 5], [x + 6, y - 7], [x + 2, y + 6], [x - 6, y + 8], [x + 10, y + 2]], 3, '#4a2a14')}`).join('')}`;

/* ---------- Muffinka, lody, smoothie, słoik, frytki, szaszłyki ---------- */
const cupcake = () => `${shadow(100, 158, 56, 7)}<path d="M58 108 H142 L130 156 H70Z" fill="#f5a0b5"/>${[70, 86, 102, 118, 132].map((x) => `<path d="M${x} 108 L${x - 3 + (x - 100) * 0.12} 156" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>`).join('')}<ellipse cx="100" cy="108" rx="44" ry="10" fill="#e68aa0"/>${ell(100, 96, 44, 18, '#f7b6c8')}${ell(100, 78, 34, 15, '#f9c7d4')}${ell(100, 62, 22, 12, '#fbd7e0')}${circ(100, 46, 9, '#d8344a')}${circ(97, 43, 3, '#fff', 0.6)}${dots([[78, 90], [120, 94], [92, 74], [110, 70], [100, 100]], 2.4, '#ffd24a')}${dots([[84, 82], [116, 84], [100, 62]], 2.2, '#5aa6ff')}`;
const icecream = () => `${shadow(100, 164, 40, 6)}<path d="M66 98 L134 98 L100 168Z" fill="#d9a050"/>${[0, 1, 2, 3].map((i) => `<path d="M${70 + i * 14} 98 L${100 + (i - 1.5) * 4} 164 M${130 - i * 14} 98 L${100 - (i - 1.5) * 4} 164" stroke="#b9792f" stroke-width="2"/>`).join('')}${circ(100, 84, 36, '#fff1c9')}${circ(86, 66, 28, '#f7b6c8')}<path d="M66 90 C70 108 78 96 84 106 C90 94 96 108 102 98 C108 110 116 96 124 100 C130 92 134 98 134 90Z" fill="#fff1c9"/>${circ(98, 44, 9, '#d8344a')}${circ(95, 41, 3, '#fff', 0.6)}${dots([[82, 60], [100, 66], [90, 76], [116, 82]], 2.2, '#8a4a2a')}`;
const smoothie = () => `${shadow(100, 164, 40, 6)}<path d="M62 40 H138 L128 158 C126 164 74 164 72 158Z" fill="#fff" fill-opacity=".55" stroke="#fff" stroke-width="3"/><path d="M66 62 H134 L127 154 C125 160 75 160 73 154Z" fill="#e86fa0"/><path d="M66 62 H134 L133 72 C120 80 108 70 100 78 C92 70 80 80 67 72Z" fill="#f6a0c4"/><path d="M118 20 L108 100" stroke="#4fa34a" stroke-width="5" stroke-linecap="round"/>${dots([[78, 54], [96, 50], [116, 52]], 7, '#7a2a6a')}${circ(130, 46, 16, '#ffe27a')}${circ(130, 46, 7, '#f0c850')}${leaf(80, 36, -30, 0.7)}`;
const jar = () => `${shadow(100, 160, 50, 7)}<rect x="62" y="48" width="76" height="14" rx="6" fill="#d9b44a"/><path d="M66 64 H134 V148 C134 158 66 158 66 148Z" fill="#fff" fill-opacity=".5" stroke="#fff" stroke-width="3"/><path d="M70 82 H130 V146 C130 154 70 154 70 146Z" fill="#c9342b"/>${[[84, 96], [110, 100], [92, 120], [118, 126], [100, 110]].map(([x, y]) => ell(x, y, 11, 7, '#e0584a', x)).join('')}${rect(76, 100, 48, 30, '#fff6e0', 4)}${leaf(86, 114, -10, 0.9)}<path d="M72 70 L74 140" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>`;
const fries = () => `${shadow(100, 160, 46, 6)}${[[70, 30, -14], [84, 22, -6], [98, 18, 0], [112, 22, 8], [126, 30, 14], [92, 34, -3], [108, 36, 4]].map(([x, y, a]) => rect(x - 5, y, 10, 70, '#f0c04a', 3, a)).join('')}<path d="M62 84 H138 L128 160 H72Z" fill="#d9342a"/><path d="M62 84 H138 L136 98 H64Z" fill="#fff"/><path d="M76 98 L80 160 M100 98 V160 M124 98 L120 160" stroke="#fff" stroke-width="7"/>${circ(150, 150, 13, '#d9342a')}${circ(146, 146, 4, '#f06a5a')}`;
const skewers = () => `${plate(76)}${[68, 100, 132].map((y, i) => `<path d="M40 ${y} H160" stroke="#c9a56a" stroke-width="4" stroke-linecap="round"/>${[0, 1, 2, 3, 4].map((j) => { const c = ['#8b4a2b', '#d9342a', '#8b4a2b', '#6cc04a', '#b05a9a'][(j + i) % 5]; return rect(54 + j * 20, y - 11, 18, 22, c, 5); }).join('')}`).join('')}${leaf(150, 140, 30, 0.7)}`;

/* ---------- Mięsa i dania główne ---------- */
const chicken = () => `${plate(76)}${ell(100, 96, 46, 34, '#b96a22')}${ell(100, 92, 42, 30, '#d98a3a')}${ell(90, 84, 22, 12, '#ecb06a', -10)}${dots([[78, 98], [112, 102], [96, 110], [120, 84], [84, 80]], 2.6, '#a35a18')}${[[56, 124, 28], [142, 124, -28]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})">${ell(x, y, 20, 12, '#c9792c')}${ell(x, y - 2, 16, 8, '#e0983f')}${rect(x + 14, y - 3, 16, 6, '#f1e6d2', 3)}${circ(x + 32, y - 4, 4.4, '#f1e6d2')}${circ(x + 32, y + 4, 4.4, '#f1e6d2')}</g>`).join('')}${leaf(70, 70, -30, 0.8)}${leaf(120, 130, 30, 0.8)}${wedge(146, 76, 20, 0.6)}`;
const cutlet = () => `${plate(76)}<path d="M52 98 C50 70 86 56 112 62 C142 68 152 98 138 118 C122 140 58 130 52 98Z" fill="#c8801f"/><path d="M58 98 C58 74 88 62 110 68 C136 74 144 98 132 114 C118 132 62 124 58 98Z" fill="#e0a43c"/>${dots([[76, 90], [96, 80], [118, 88], [100, 108], [126, 104], [78, 112], [108, 74]], 2.4, '#b9741f')}${dots([[88, 96], [112, 98], [92, 118], [128, 94]], 1.8, '#f4cf78')}${wedge(138, 134, -20, 0.8)}${leaf(60, 130, 20, 0.7)}${dots([[146, 80], [158, 92], [150, 104]], 8, '#f6e6a8')}`;
const stew = () => `${bowl(72, '#8a7a6a', '#4a3a30')}${circ(100, 100, 54, '#8a4a28')}${[[76, 86, 20], [104, 78, -10], [124, 100, 25], [90, 118, 8], [112, 126, -20]].map(([x, y, a]) => rect(x - 11, y - 9, 22, 18, '#5e301a', 4, a)).join('')}${[[88, 98], [118, 84], [100, 128], [128, 120], [70, 108]].map(([x, y]) => circ(x, y, 7.5, '#f08a24') + circ(x - 2, y - 2, 3, '#ffb15e')).join('')}${[[100, 98], [76, 124]].map(([x, y]) => rect(x - 7, y - 7, 14, 14, '#f0d58a', 3, 15)).join('')}${dots([[110, 108], [84, 76], [128, 108], [94, 90]], 2.8, '#4fa34a')}`;
const rolls = () => `<ellipse cx="100" cy="116" rx="80" ry="60" fill="#2a1a08" opacity=".14"/>${ell(100, 104, 78, 58, '#e9e0d0')}${ell(100, 104, 68, 48, '#c9342b')}${[[70, 96, -25], [106, 82, 12], [128, 112, -50], [86, 120, 10]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})">${rect(x - 22, y - 12, 44, 24, '#8fbf5a', 12)}${rect(x - 18, y - 9, 36, 8, '#a8d070', 4)}<path d="M${x - 12} ${y - 10} V${y + 10} M${x + 2} ${y - 10} V${y + 10} M${x + 14} ${y - 10} V${y + 10}" stroke="#6a9a3a" stroke-width="2"/></g>`).join('')}${leaf(96, 100, 20, 0.7)}${dots([[60, 124], [138, 84], [112, 130]], 2.6, '#4fa34a')}`;
const meatballs = () => `${plate(76)}${circ(100, 100, 52, '#c9342b')}${[[78, 86], [104, 76], [126, 94], [88, 114], [114, 120], [100, 98]].map(([x, y]) => `${circ(x, y, 15, '#7d3f22')}${circ(x - 4, y - 4, 6, '#a35a38')}`).join('')}${leaf(94, 98, -40, 0.9)}${dots([[70, 112], [132, 118], [72, 78]], 2.6, '#fff4cf')}`;
const ribs = () => `${plate(78)}<g transform="rotate(-12 100 100)">${rect(46, 70, 108, 60, '#8b3d22', 14)}${rect(50, 74, 100, 22, '#a8532f', 10)}${[0, 1, 2, 3, 4].map((i) => rect(58 + i * 20, 66, 10, 68, '#f1dcc0', 5)).join('')}${[0, 1, 2, 3, 4].map((i) => rect(52 + i * 20, 82, 22, 38, '#8b3d22', 8)).join('')}<path d="M52 84 C70 78 130 78 148 84" stroke="#e9a070" stroke-opacity=".7" stroke-width="4" fill="none" stroke-linecap="round"/></g>${dots([[70, 62], [120, 56], [136, 140]], 2.2, '#fff3d1')}${leaf(136, 142, 20, 0.7)}`;
const sausage = () => `${plate(76)}${[78, 106].map((y, i) => `<g transform="rotate(${i ? 6 : -6} 100 ${y})">${rect(44, y - 11, 112, 22, '#a8452d', 11)}${rect(48, y - 9, 104, 7, '#c9654a', 4)}${[0, 1, 2, 3, 4].map((j) => `<path d="M${64 + j * 20} ${y - 10} l8 20" stroke="#5e1f12" stroke-width="3.4" stroke-linecap="round"/>`).join('')}</g>`).join('')}<path d="M52 130 q12 -12 24 0 t24 0 t24 0 t20 0" stroke="#f2c230" stroke-width="5" fill="none" stroke-linecap="round"/>${dots([[134, 72], [146, 84]], 8, '#f6e6a8')}${leaf(60, 56, 30, 0.7)}`;
const lasagne = () => `<ellipse cx="100" cy="116" rx="82" ry="62" fill="#2a1a08" opacity=".14"/>${rect(28, 56, 144, 90, '#d9cfbe', 16)}${rect(36, 64, 128, 74, '#f1c05a', 10)}${[[56, 84], [92, 100], [128, 80], [148, 112], [70, 120], [112, 124]].map(([x, y]) => circ(x, y, 9, '#c9822f', 0.8)).join('')}${[[100, 74], [64, 104], [136, 98]].map(([x, y]) => circ(x, y, 7, '#fbe29a')).join('')}<path d="M36 126 H164" stroke="#c9342b" stroke-width="5" opacity=".7"/>${leaf(96, 88, 20, 0.8)}${leaf(110, 104, 70, 0.7)}`;
const ramen = () => `${bowl(74, '#9a9aa4', '#2b2b34')}${circ(100, 100, 56, '#e7b25a')}${[0, 1, 2, 3].map((i) => `<path d="M${58 + i * 3} ${78 + i * 12} q10 -10 22 0 t22 0 t22 0 t18 0" stroke="#f9e6a0" stroke-width="3.4" fill="none" stroke-linecap="round"/>`).join('')}${ell(120, 86, 17, 13, '#fffdf6')}${circ(120, 86, 7, '#f4a21f')}${[[80, 114], [96, 128]].map(([x, y]) => circ(x, y, 12, '#e6a090') + circ(x, y, 7, '#f0c0b0')).join('')}${rect(60, 70, 26, 34, '#1f3a2d', 3, -12)}${dots([[104, 112], [116, 118], [92, 92], [132, 112]], 3, '#6cc04a')}<rect x="132" y="38" width="5" height="90" rx="2.5" fill="#8b5632" transform="rotate(30 132 38)"/><rect x="146" y="40" width="5" height="90" rx="2.5" fill="#6b3f24" transform="rotate(26 146 40)"/>`;
const curry = () => `${bowl(70)}${circ(100, 100, 52, '#e0802f')}${[[82, 88], [108, 80], [122, 104], [92, 112], [112, 122]].map(([x, y]) => rect(x - 9, y - 7, 18, 14, '#f3d29a', 4, x)).join('')}<path d="M84 100 q16 -12 32 0" stroke="#fff" stroke-opacity=".4" stroke-width="4" fill="none"/>${dots([[96, 96], [118, 92], [84, 118]], 3, '#4fa34a')}<path d="M62 126 A24 20 0 0 1 110 126Z" fill="#fff"/><path d="M62 126 A24 20 0 0 1 110 126" fill="none" stroke="#e8e0d0" stroke-width="2"/>${dots([[78, 116], [90, 112], [100, 118], [84, 122]], 1.6, '#e8e0d0')}`;
const taco = () => `${plate(76)}${[[100, 78, -6], [100, 118, 4]].map(([x, y, a], i) => `<g transform="rotate(${a} ${x} ${y})"><path d="M44 ${y + 16} A56 44 0 0 1 156 ${y + 16}Z" fill="#e0b660"/>${[0, 1, 2, 3, 4, 5].map((j) => `<path d="M${52 + j * 18} ${y - 10 + (j % 2) * 4} q8 -12 16 0" stroke="#6cc04a" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('')}${dots([[70, y - 2], [92, y - 6], [112, y - 2], [132, y - 6]], 6, '#d9342a')}${dots([[82, y + 2], [104, y + 4], [124, y + 2]], 5, '#7d3f22')}<path d="M44 ${y + 16} A56 44 0 0 1 156 ${y + 16}" fill="none" stroke="#c99a40" stroke-width="3"/></g>`).join('')}${wedge(150, 138, -20, 0.6, '#8fd14a')}`;
const sushi = () => `${plate(76)}${[[68, 80, '#f4803f'], [102, 74, '#7ab948'], [136, 84, '#f4803f'], [76, 116, '#e5483a'], [110, 122, '#f4803f'], [140, 114, '#7ab948']].map(([x, y, c]) => `${circ(x, y, 17, '#1f3a2d')}${circ(x, y, 13.5, '#fffdf6')}${dots([[x - 4, y - 4], [x + 5, y + 3], [x, y + 6]], 1.2, '#e8e0d0')}${circ(x, y, 6.5, c)}`).join('')}${circ(40, 138, 9, '#8fd14a')}${ell(54, 142, 10, 6, '#f6a0b4')}`;
const paella = () => `<ellipse cx="100" cy="116" rx="86" ry="74" fill="#2a1a08" opacity=".14"/>${circ(100, 100, 76, '#3b3b40')}${rect(168, 94, 28, 12, '#3b3b40', 6)}${circ(100, 100, 66, '#e8c04a')}${dots([[70, 90], [126, 76], [118, 122], [84, 124], [100, 100], [62, 110], [138, 104]], 3, '#d9a82a')}${[[82, 78, -20], [124, 100, 20], [96, 124, 190]].map(([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-14 -8 A15 15 0 1 1 -6 14" stroke="#f27c48" stroke-width="10" fill="none" stroke-linecap="round"/></g>`).join('')}${[[108, 76], [70, 104], [134, 126]].map(([x, y]) => ell(x, y, 11, 8, '#2c2c34', x) + ell(x, y - 2, 7, 3, '#5a5a66', x)).join('')}${dots([[92, 92], [112, 112], [80, 118], [122, 86]], 3, '#5fb84c')}${[[100, 86, 10], [88, 108, 70]].map(([x, y, a]) => rect(x - 12, y - 3, 24, 6, '#d9342a', 3, a)).join('')}${wedge(60, 76, 30, 0.5)}`;
const omelette = () => `${plate(76)}<path d="M42 104 C42 66 158 66 158 104 C158 128 42 128 42 104Z" fill="#e8b92e"/><path d="M48 102 C50 72 150 72 152 102 C150 120 50 120 48 102Z" fill="#f6cc4a"/><path d="M48 104 C70 96 130 96 152 104" stroke="#d9a21e" stroke-width="3" fill="none"/>${ell(86, 88, 22, 8, '#fff0a8', -8, 0.7)}${dots([[78, 106], [100, 100], [124, 104], [112, 112], [90, 112]], 2.6, '#4fa34a')}${[[148, 132], [60, 134]].map(([x, y]) => circ(x, y, 12, '#e5483a') + circ(x - 3, y - 3, 4, '#fff', 0.5)).join('')}${leaf(52, 70, -20, 0.8)}`;
const sandwich = () => `${shadow(100, 158, 70, 8)}${rect(44, 124, 112, 26, '#e3b46c', 12)}${rect(44, 124, 112, 8, '#c98a3f', 6)}<path d="M40 122 C52 108 62 130 74 116 C86 130 96 110 108 120 C120 130 130 110 142 118 C148 122 154 118 160 116 L160 126 L40 126Z" fill="#6fbf4a"/>${rect(46, 106, 108, 12, '#f08a8a', 4)}${[[64, 98], [96, 98], [128, 98]].map(([x, y]) => `${ell(x, y, 15, 7, '#e5483a')}${ell(x - 2, y - 1, 6, 2, '#f0847a')}`).join('')}<path d="M44 94 L156 94 L150 104 L50 104Z" fill="#f6c744"/>${rect(44, 66, 112, 28, '#e3b46c', 12)}${rect(44, 66, 112, 8, '#f0cc8a', 6)}`;
const focaccia = () => `${shadow(100, 150, 76, 8)}<g transform="rotate(-6 100 100)">${rect(34, 58, 132, 84, '#c98a3a', 14)}${rect(38, 62, 124, 76, '#e6ae52', 11)}${Array.from({ length: 18 }, (_, i) => circ(54 + (i % 6) * 21, 78 + Math.floor(i / 6) * 22, 5, '#c9852f')).join('')}${[[62, 74], [112, 96], [138, 76], [80, 122]].map(([x, y]) => `${circ(x, y, 9, '#d9342a')}${circ(x - 2, y - 2, 3, '#fff', 0.5)}`).join('')}${[[96, 80, 20], [60, 100, -30], [126, 118, 10]].map(([x, y, a]) => `<path d="M${x} ${y} l18 6" stroke="#4a8b3a" stroke-width="2.4" transform="rotate(${a} ${x} ${y})"/>`).join('')}${dots([[70, 90], [100, 110], [120, 80], [140, 100], [86, 66], [110, 128]], 1.6, '#fff', 0.9)}</g>`;

/* ---------- Eksport ---------- */
export const EXTRA = { soup, pasta, pizza, salad, sauce, bread, cake, cocktail, pancakes, tart, pudding, cookies, cupcake, icecream, smoothie, jar, fries, skewers, chicken, cutlet, stew, rolls, meatballs, ribs, sausage, lasagne, ramen, curry, taco, sushi, paella, omelette, sandwich, focaccia };

/** Wszystkie dozwolone specyfikacje „rodzaj:wariant” (do testów i podglądu). */
export const VARIANT_SPECS = [
  ...Object.keys(SOUP).map((v) => (v ? 'soup:' + v : 'soup')), ...Object.keys(PASTA).map((v) => (v ? 'pasta:' + v : 'pasta')),
  'pizza', 'pizza:pepperoni', 'pizza:white', 'pizza:veg', 'salad', 'salad:greek', 'salad:caesar', 'salad:caprese', 'salad:potato', 'salad:slaw',
  ...Object.keys(SAUCE).map((v) => (v ? 'sauce:' + v : 'sauce')), 'bread', 'bread:round', 'bread:rolls', 'cake', 'cake:cheese', 'cake:choc', 'cake:tiramisu',
  ...Object.keys(COCK).map((v) => (v ? 'cocktail:' + v : 'cocktail')), 'pancakes', 'pancakes:potato', 'tart', 'tart:apple', 'tart:lemon', 'pudding', 'pudding:brulee', 'cookies', 'cookies:brownie',
  'cupcake', 'icecream', 'smoothie', 'jar', 'fries', 'skewers', 'chicken', 'cutlet', 'stew', 'rolls', 'meatballs', 'ribs', 'sausage', 'lasagne', 'ramen', 'curry', 'taco', 'sushi', 'paella', 'omelette', 'sandwich', 'focaccia',
];
