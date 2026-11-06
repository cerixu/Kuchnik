/* ==========================================================================
   zarlock-art.js — ręcznie rysowane znaki ŻARŁOK / Kuchnik.
   Wektorowe ilustracje aplikacji: bez emoji, fontowych piktogramów i bibliotek.
   ========================================================================== */
const SVG_NS = 'http://www.w3.org/2000/svg';
let flagId = 0;

function makeSvg(inner, size, className, viewBox) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('xmlns', SVG_NS);
  svg.setAttribute('viewBox', viewBox || '0 0 80 80');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.classList.add('zarlock-art');
  if (className) svg.classList.add(className);
  svg.innerHTML = inner;
  return svg;
}

const CATEGORY_BY_ID = Object.freeze({
  'cat-pizza': 'pizza', 'cat-pasta': 'pasta', 'cat-sosy': 'sauce',
  'cat-mieso': 'steak', 'cat-ryby': 'fish', 'cat-owoce-morza': 'seafood',
  'cat-warzywa': 'vegetables', 'cat-desery': 'dessert', 'cat-pieczywo': 'bread',
  'cat-zupy': 'soup', 'cat-salatki': 'salad', 'cat-cocktaile': 'cocktail',
  'cat-prep': 'prep', 'cat-sosy-bazowe': 'saucepot', 'cat-inne': 'plate',
});

export const CATEGORY_MARK_OPTIONS = Object.freeze([
  ['pizza', 'Pizza'], ['pasta', 'Makaron'], ['sauce', 'Sos'],
  ['steak', 'Mięso'], ['fish', 'Ryba'], ['seafood', 'Owoce morza'],
  ['vegetables', 'Warzywa'], ['dessert', 'Deser'], ['bread', 'Pieczywo'],
  ['soup', 'Zupa'], ['salad', 'Sałatka'], ['cocktail', 'Koktajl'],
  ['prep', 'Przygotowanie'], ['saucepot', 'Sos bazowy'], ['plate', 'Talerz'],
]);

const CATEGORY_DRAWINGS = Object.freeze({
  pizza: '<path d="M19 49Q26 24 43 18L58 57Q40 64 19 49Z" fill="#b97750" stroke="#e4c4a8"/><path d="M23 47Q31 28 44 23L55 53Q40 58 23 47Z" fill="#d8b36f" stroke="#ead7bf"/><circle cx="35" cy="39" r="3.3" fill="#a85143" stroke="#df9b74"/><circle cx="45" cy="48" r="2.7" fill="#a85143"/><path d="M38 29l3-4m-4 5 1-5M31 47l-3 3m4-2-1 4" stroke="#78835f" stroke-width="2.1"/><path d="M28 52l4 2m-2-4 4 3" stroke="#f0d998" stroke-width="1.2"/>',
  pasta: '<path d="M18 39Q40 63 62 39Q59 59 40 61Q21 59 18 39Z" fill="#262326" stroke="#d7a982"/><path d="M21 39Q40 47 59 39" stroke="#e7d5c2"/><path d="M28 37c-4-8 8-12 10-3s-7 11-5 3 14-8 13 0-7 9-5 2 12-5 10 2" fill="none" stroke="#d5b56f" stroke-width="2.1"/><path d="M34 31l3-3m-1 5 3-4m8 4 3-2" stroke="#bc704f" stroke-width="1.4"/><path d="M24 42q5 4 9 4m14 0q5-1 8-4" stroke="#f0e3d2" stroke-width="1.2"/>',
  sauce: '<path d="M18 39Q40 61 62 39Q58 59 40 60Q22 59 18 39Z" fill="#2b2523" stroke="#d6a783"/><ellipse cx="40" cy="38" rx="22" ry="9" fill="#9e5443" stroke="#e1bd9e"/><path d="M27 38q7-8 14-1t13 0" fill="none" stroke="#dcaa79" stroke-width="2"/><path d="M48 21l10 12M54 20l7-3" stroke="#d9cbb7" stroke-width="2.2"/><path d="M29 40l4 2m12-6 4 2m-14 3 3 1" stroke="#f0d9b4" stroke-width="1.1"/>',
  steak: '<path d="M24 29q7-9 18-4l13 7q8 7 1 17-8 13-23 9-17-4-15-17 1-7 6-12Z" fill="#8b4b3d" stroke="#e0ac8b"/><path d="M48 45q6-3 11 1l7 6-5 4-8-5q-5 1-7-2" fill="#ead9c7" stroke="#d8c3ac"/><path d="M26 34q6-6 12-2m-13 7 5-3m4 13 8-7m-3 13 8-7" stroke="#be7860" stroke-width="1.7"/><circle cx="35" cy="39" r="2" fill="#3c2928"/><circle cx="44" cy="33" r="1.5" fill="#edc999"/>',
  fish: '<path d="M17 40q12-16 31-10 8 3 12 10-5 8-12 11-19 6-31-11Z" fill="#738477" stroke="#e0d0bd"/><path d="M18 40 10 31v18l8-9Zm31-10q-2 10 0 21" fill="#b97856" stroke="#e0d0bd"/><circle cx="30" cy="38" r="1.8" fill="#171719"/><path d="M36 34l4 4m-8 5 4 4m5-9 4 4m-9-1 4 4" stroke="#d6c7b5" stroke-width="1.2"/><path d="M52 39q4 1 6 2" stroke="#e9d7c4"/>',
  seafood: '<path d="M47 25q10 1 9 10-1 6-7 7-3 1-4 5-2 8-11 8-10 0-10-9 0-7 8-9 5-1 5-6 0-7 10-6Z" fill="#bd7055" stroke="#edd0b8"/><path d="M38 37q7 2 8 7m-12 0q2 8 10 6m-12-1-6 5 1-8-6 3 3-8m28-10 7-5-1 9" fill="none" stroke="#e9c2a2" stroke-width="1.7"/><circle cx="50" cy="31" r="1.4" fill="#2b1d1b"/>',
  vegetables: '<path d="M37 27q-14-10-17 1 10 1 17 8M40 29q2-15 13-13 0 10-10 16M42 33q13-11 20-3-5 9-18 10" fill="#647958" stroke="#d7c6ae" stroke-width="1.4"/><path d="M40 36q-1 12-13 25 12 2 21-1-5-11-5-24Z" fill="#b9684d" stroke="#eed2b8"/><path d="M39 43l3 12m-7-10 3 10" stroke="#e0a17a" stroke-width="1.2"/><path d="M34 29l2 4m7-8-1 6m8-5-6 7" stroke="#94a07a" stroke-width="1.1"/>',
  dessert: '<path d="M22 35 50 27 59 47 31 55Z" fill="#bd7457" stroke="#e5c5a7"/><path d="m22 35 28-8 3 6-28 9Z" fill="#e1c58d" stroke="#f1dfc0"/><path d="m25 41 28-8 3 6-28 8Zm3 8 28-8 3 6-28 8Z" fill="#f0dfc6" stroke="#d8b38f"/><path d="M50 27q-2-8 4-9 3 5-1 10m-14 4q0-7 5-7t5 6" fill="#8b7055" stroke="#eed8c1"/><circle cx="41" cy="31" r="2" fill="#b85648"/>',
  bread: '<path d="M18 46q1-15 14-20 15-6 29 5 6 6 2 14-4 9-23 12-19 2-22-11Z" fill="#c28a54" stroke="#ead5b9"/><path d="M29 31q-3 5-1 10m12-14q-3 5-1 10m12-5q-3 5-1 10" stroke="#f1dfbd" stroke-width="2.1"/><path d="M22 47q14 9 39 0" stroke="#9a6243" stroke-width="1.2"/><path d="M27 51l3 1m7 2 3 .2m8-1 3-1" stroke="#f0d6ae" stroke-width="1"/>',
  soup: '<path d="M19 39Q40 63 61 39Q58 58 40 60Q22 58 19 39Z" fill="#272326" stroke="#d8a782"/><ellipse cx="40" cy="38" rx="21" ry="9" fill="#a95343" stroke="#e5c7aa"/><path d="M31 28q-3-6 1-10m8 10q-3-6 1-11m7 12q-2-5 2-8" fill="none" stroke="#cbbcac" stroke-width="1.5"/><circle cx="33" cy="37" r="2" fill="#e2bd7d"/><circle cx="44" cy="35" r="1.7" fill="#6f805f"/><circle cx="50" cy="40" r="1.5" fill="#e2bd7d"/><path d="M25 42q5 4 9 4m13-1q5-1 8-4" stroke="#f0e3d2" stroke-width="1.1"/>',
  salad: '<path d="M21 44q-5-12 7-15 0-12 11-8 8-7 13 2 12 0 8 12 6 11-8 15-14 8-28-2-3-2-3-4Z" fill="#55694d" stroke="#d8c8b5"/><path d="M27 42q7-16 12-7 2-12 8-8 5 4 1 11 10-8 12-1 1 6-9 10-14 7-24-5Z" fill="#718766" stroke="#d8c8b5"/><circle cx="35" cy="40" r="3" fill="#b95f4b" stroke="#efd0b1"/><circle cx="47" cy="35" r="2.5" fill="#d5b778"/><path d="M31 48q10 7 21 0m-19-3 4 2m9-11 3 2" stroke="#dbe0c4" stroke-width="1.1"/>',
  cocktail: '<path d="M22 20h36L42 40v15m-9 0h18m-9-15v15" fill="none" stroke="#e6d4c1" stroke-width="1.9"/><path d="M26 24h28L42 37Z" fill="#a75e4c" stroke="#d89a76"/><circle cx="47" cy="28" r="2.1" fill="#d9b779"/><path d="M42 23q-2-7 4-9m0 0q2 2 0 4" stroke="#758264" stroke-width="1.7"/><path d="M30 26l5 5m11 18v5" stroke="#f4e1ce" stroke-width="1"/>',
  prep: '<path d="M18 26q1-4 5-4h34q5 1 5 5v31q-1 4-5 4H23q-5-1-5-5Z" fill="#49342b" stroke="#d9a783"/><path d="M24 29q15-5 31 0m-31 4q12-4 24-1m-21 5 2 2m4-3 2 2m4-3 2 2" stroke="#bd8060" stroke-width="1.3"/><path d="m46 28 13-12q3-2 5 0l-13 14-6 3Z" fill="#d9d4c9" stroke="#f0e4d4"/><path d="m45 30-5 8 8-4" fill="#b56c4b" stroke="#eed9c6"/><path d="M25 48q5 2 10 0" stroke="#e8d1ba" stroke-width="1.2"/>',
  saucepot: '<path d="M23 29h34l-3 27q-1 4-5 4H31q-5 0-5-4Z" fill="#3a302d" stroke="#e2c7ae"/><path d="M21 29h38m-28-5h18m-15 0v5m12-5v5" stroke="#d1a27b" stroke-width="2"/><path d="M27 40h26m-24 4h22" stroke="#a85c49" stroke-width="1.5"/><path d="M33 24q-3-5 1-8m8 8q-3-5 1-8" stroke="#d3c5b6" stroke-width="1.3"/><circle cx="34" cy="37" r="1.5" fill="#e3c486"/><circle cx="45" cy="37" r="1.5" fill="#e3c486"/>',
  plate: '<circle cx="40" cy="40" r="23" fill="#202023" stroke="#ead7c4" stroke-width="1.7"/><circle cx="40" cy="40" r="16" fill="none" stroke="#bd7958" stroke-width="1.5"/><path d="M29 42q6-10 14-4 6 4 9-2m-21 9q8 5 16 0" fill="none" stroke="#d3b46f" stroke-width="2"/><path d="M31 35l3-3m11 15 3-3" stroke="#778364" stroke-width="1.8"/>',
});

export function categoryMarkKey(categoryId, storedKey) {
  if (CATEGORY_DRAWINGS[storedKey]) return storedKey;
  return CATEGORY_BY_ID[categoryId] || 'plate';
}

export function categoryGlyph(categoryId, size, storedKey) {
  const key = categoryMarkKey(categoryId, storedKey);
  const dish = '<circle cx="40" cy="40" r="37" fill="#211f21" stroke="#bd7958" stroke-width="1.4"/>' +
    '<path d="M9 38a31 31 0 0 1 59-9" fill="none" stroke="#f0dfd0" stroke-opacity=".28" stroke-width="1"/>' +
    '<circle cx="40" cy="40" r="27" fill="#171719" stroke="#d9c5b2" stroke-opacity=".68" stroke-width="1.2"/>';
  return makeSvg(dish + (CATEGORY_DRAWINGS[key] || CATEGORY_DRAWINGS.plate), size || 76, 'category-art');
}

const ORIGIN_FLAGS = Object.freeze({
  PL: {type:'h', colors:['#f0e7dc','#ba6258']},
  IT: {type:'v', colors:['#71815f','#eee5d9','#b65d4c']},
  FR: {type:'v', colors:['#53698b','#eee5d9','#b65d4c']},
  ES: {type:'h', colors:['#b84e42','#dfb966','#b84e42'], ratios:[1,2,1]},
  DE: {type:'h', colors:['#302b2b','#a95245','#d7ae64']},
  GR: {type:'greece'},
  PT: {type:'pt'},
  GB: {type:'uk'},
  AT: {type:'h', colors:['#b94e45','#eee5d9','#b94e45']},
  HU: {type:'h', colors:['#b85249','#eee5d9','#70815f']},
  CZ: {type:'cz'},
  SE: {type:'cross', colors:['#526e91','#e0bc68'], x:25},
  TR: {type:'turkey'},
  LB: {type:'cedar'},
  GE: {type:'georgia'},
  IL: {type:'israel'},
  MA: {type:'morocco'},
  IN: {type:'india'},
  CN: {type:'china'},
  JP: {type:'japan'},
  KR: {type:'korea'},
  TH: {type:'h', colors:['#b84f45','#f0e8dc','#566a8b','#f0e8dc','#b84f45'], ratios:[1,1,2,1,1]},
  VN: {type:'vietnam'},
  US: {type:'usa'},
  MX: {type:'mexico'},
  PE: {type:'v', colors:['#b95145','#f0e7dc','#b95145']},
  BR: {type:'brazil'},
  AR: {type:'argentina'},
  LT: {type:'h', colors:['#d4b35f','#71815f','#b75448']},
  RU: {type:'h', colors:['#f0e7dc','#587293','#b94e45']},
  CU: {type:'cuba'},
  PR: {type:'puerto'},
  UA: {type:'h', colors:['#5a78a0','#e2bd65']},
  NL: {type:'h', colors:['#b95145','#f0e7dc','#566d92']},
  IE: {type:'v', colors:['#70825d','#f0e7dc','#d68655']},
  CH: {type:'swiss'},
  HR: {type:'croatia'},
  DK: {type:'cross', colors:['#b54e45','#f0e7dc'], x:25},
  NO: {type:'cross', colors:['#566d91','#f0e7dc','#b94e45'], x:25},
  FI: {type:'cross', colors:['#f0e7dc','#607a9c'], x:25},
  AU: {type:'australia'},
  EG: {type:'egypt'},
  ID: {type:'h', colors:['#b95145','#f0e7dc']},
  PH: {type:'philippines'},
});

function stripeMarkup(axis, colors, ratios) {
  const x = 12, y = 17, w = 48, h = 32;
  const rs = ratios || colors.map(() => 1);
  const total = rs.reduce((a, b) => a + b, 0);
  let at = axis === 'v' ? x : y;
  return colors.map((color, i) => {
    const size = (axis === 'v' ? w : h) * rs[i] / total;
    const rect = axis === 'v'
      ? '<rect x="' + at.toFixed(2) + '" y="' + y + '" width="' + (size + .2).toFixed(2) + '" height="' + h + '" fill="' + color + '"/>'
      : '<rect x="' + x + '" y="' + at.toFixed(2) + '" width="' + w + '" height="' + (size + .2).toFixed(2) + '" fill="' + color + '"/>';
    at += size;
    return rect;
  }).join('');
}

function starPath(cx, cy, r, fill) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const rr = i % 2 ? r * .43 : r;
    pts.push((cx + Math.cos(a) * rr).toFixed(1) + ',' + (cy + Math.sin(a) * rr).toFixed(1));
  }
  return '<polygon points="' + pts.join(' ') + '" fill="' + fill + '"/>';
}

function flagPattern(code, spec) {
  const x = 12, y = 17, w = 48, h = 32;
  if (!spec) return '<rect x="12" y="17" width="48" height="32" fill="#74513f"/>' + starPath(36, 33, 6, '#e5c17f');
  if (spec.type === 'h' || spec.type === 'v') return stripeMarkup(spec.type, spec.colors, spec.ratios);
  if (spec.type === 'greece') {
    let lines = stripeMarkup('h', ['#5c7596','#f0e7dc','#5c7596','#f0e7dc','#5c7596','#f0e7dc','#5c7596'], [1,1,1,1,1,1,1]);
    lines += '<rect x="12" y="17" width="18" height="16" fill="#5c7596"/><path d="M20 18h3v6h6v3h-6v6h-3v-6h-6v-3h6Z" fill="#f0e7dc"/>';
    return lines;
  }
  if (spec.type === 'cross') {
    const base = '<rect x="12" y="17" width="48" height="32" fill="' + spec.colors[0] + '"/>';
    const n = spec.colors.length > 2;
    const white = n ? spec.colors[1] : spec.colors[1];
    const accent = n ? spec.colors[2] : null;
    return base + (n ? '<path d="M12 17h48v8H12z" fill="' + white + '"/>' + '<path d="M12 25h48v24H12z" fill="' + spec.colors[0] + '"/>' : '') +
      '<path d="M' + (spec.x || 25) + ' 17v32" stroke="' + (n ? white : spec.colors[1]) + '" stroke-width="9"/>' +
      '<path d="M12 31h48" stroke="' + (n ? white : spec.colors[1]) + '" stroke-width="9"/>' +
      (accent ? '<path d="M' + (spec.x || 25) + ' 17v32M12 31h48" stroke="' + accent + '" stroke-width="4"/>' : '');
  }
  if (spec.type === 'pt') return '<rect x="12" y="17" width="20" height="32" fill="#70835f"/><rect x="32" y="17" width="28" height="32" fill="#a95045"/><circle cx="32" cy="33" r="5" fill="#d5b46e"/><circle cx="32" cy="33" r="2" fill="#efe5d8"/>';
  if (spec.type === 'cz') return stripeMarkup('h',['#f0e7dc','#b65348']) + '<path d="M12 17 34 33 12 49Z" fill="#59749a"/>';
  if (spec.type === 'uk') return '<rect x="12" y="17" width="48" height="32" fill="#526b90"/><path d="m12 17 48 32m0-32L12 49" stroke="#f0e7dc" stroke-width="8"/><path d="m12 17 48 32m0-32L12 49" stroke="#b84e45" stroke-width="3"/><path d="M34 17v32M12 33h48" stroke="#f0e7dc" stroke-width="11"/><path d="M34 17v32M12 33h48" stroke="#b84e45" stroke-width="5"/>';
  if (spec.type === 'usa') {
    let out = stripeMarkup('h',['#b84f45','#f0e7dc','#b84f45','#f0e7dc','#b84f45','#f0e7dc','#b84f45','#f0e7dc'],Array(8).fill(1));
    out += '<rect x="12" y="17" width="21" height="17" fill="#516b91"/>';
    [[16,21],[22,21],[28,21],[19,26],[25,26],[16,31],[22,31],[28,31]].forEach(([cx,cy])=>{out+='<circle cx="'+cx+'" cy="'+cy+'" r="1" fill="#f3e6d8"/>';});
    return out;
  }
  if (spec.type === 'turkey') return '<rect x="12" y="17" width="48" height="32" fill="#b84e45"/><circle cx="32" cy="33" r="9" fill="#f0e7dc"/><circle cx="36" cy="31" r="7" fill="#b84e45"/>' + starPath(43,33,4,'#f0e7dc');
  if (spec.type === 'cedar') return stripeMarkup('h',['#b64f45','#f0e7dc','#b64f45'],[1,2,1]) + '<path d="M36 26 32 34h3l-4 6h4l-5 7h20l-5-7h4l-4-6h3l-5-8-3 5-3-5Z" fill="#73845e" stroke="#526a48" stroke-width=".8"/><path d="M39 43v5" stroke="#725a3c" stroke-width="1.4"/>';
  if (spec.type === 'georgia') return '<rect x="12" y="17" width="48" height="32" fill="#f1e8dd"/><path d="M31 17h7v11h10v7H38v14h-7V35H19v-7h12Z" fill="#b95145"/><path d="M18 21h3v4h4v3h-4v4h-3v-4h-4v-3h4Zm30 11h3v4h4v3h-4v4h-3v-4h-4v-3h4Zm-30 7h3v3h4v3h-4v3h-3v-3h-4v-3h4Z" fill="#b95145"/>';
  if (spec.type === 'israel') return '<rect x="12" y="17" width="48" height="32" fill="#f0e7dc"/><path d="M12 22h48v4H12Zm0 18h48v4H12Z" fill="#657da0"/><path d="m36 27 7 12H29Zm0 12 7-12H29Z" fill="none" stroke="#657da0" stroke-width="1.8"/>';
  if (spec.type === 'morocco') return '<rect x="12" y="17" width="48" height="32" fill="#a94f43"/>' + starPath(36,33,9,'#70835e') + '<path d="M36 25v16m-7-12 14 8m0-8-14 8" stroke="#70835e" stroke-width="1.4"/>';
  if (spec.type === 'india') return stripeMarkup('h',['#d18a59','#f0e7dc','#72835e']) + '<circle cx="36" cy="33" r="5.5" fill="none" stroke="#63789a" stroke-width="1.2"/><circle cx="36" cy="33" r="1.2" fill="#63789a"/><path d="M36 27v12m-5-6h10m-8-4 6 8m0-8-6 8" stroke="#63789a" stroke-width=".7"/>';
  if (spec.type === 'china') return '<rect x="12" y="17" width="48" height="32" fill="#b84f45"/>' + starPath(21,25,5,'#e1bd6d') + '<circle cx="31" cy="22" r="1.4" fill="#e1bd6d"/><circle cx="34" cy="28" r="1.4" fill="#e1bd6d"/><circle cx="33" cy="36" r="1.4" fill="#e1bd6d"/><circle cx="29" cy="42" r="1.4" fill="#e1bd6d"/>';
  if (spec.type === 'japan') return '<rect x="12" y="17" width="48" height="32" fill="#f0e7dc"/><circle cx="36" cy="33" r="9" fill="#b84f45"/><path d="M19 22h8m17 22h8" stroke="#fff" stroke-opacity=".55" stroke-width=".8"/>';
  if (spec.type === 'korea') return '<rect x="12" y="17" width="48" height="32" fill="#f0e7dc"/><path d="M29 33a7 7 0 0 1 14 0 3.5 3.5 0 0 0-7 0 3.5 3.5 0 0 1-7 0Z" fill="#b95349"/><path d="M43 33a7 7 0 0 1-14 0 3.5 3.5 0 0 0 7 0 3.5 3.5 0 0 1 7 0Z" fill="#58749a"/><path d="M17 23l6-3m-5 5 6-3m22 24 6-3m-5 5 6-3" stroke="#333133" stroke-width="1.5"/>';
  if (spec.type === 'vietnam') return '<rect x="12" y="17" width="48" height="32" fill="#b64f45"/>' + starPath(36,33,8,'#e0bd69');
  if (spec.type === 'brazil') return '<rect x="12" y="17" width="48" height="32" fill="#617c59"/><path d="m36 20 19 13-19 13-19-13Z" fill="#ddb95f"/><circle cx="36" cy="33" r="8" fill="#526f91"/><path d="M29 32q7-4 14 0m-12 4q5 2 10 0" fill="none" stroke="#eee6d9" stroke-width="1"/>';
  if (spec.type === 'argentina') return stripeMarkup('h',['#8098b6','#f0e7dc','#8098b6']) + '<circle cx="36" cy="33" r="4" fill="#d8b76d"/><path d="M36 27v12m-5-6h10m-8-4 6 8m0-8-6 8" stroke="#ac8750" stroke-width=".8"/>';
  if (spec.type === 'cuba') return '<rect x="12" y="17" width="48" height="32" fill="#f0e7dc"/><path d="M12 17h48v6H12Zm0 12h48v6H12Zm0 12h48v6H12Z" fill="#617a9a"/><path d="M12 17 34 33 12 49Z" fill="#b84f45"/>' + starPath(20,33,4,'#f0e7dc');
  if (spec.type === 'puerto') return '<rect x="12" y="17" width="48" height="32" fill="#f0e7dc"/><path d="M12 17h48v6H12Zm0 12h48v6H12Zm0 12h48v6H12Z" fill="#b84f45"/><path d="M12 17 34 33 12 49Z" fill="#617a9a"/>' + starPath(20,33,4,'#f0e7dc');
  if (spec.type === 'swiss') return '<rect x="12" y="17" width="48" height="32" fill="#b64f45"/><path d="M33 22h6v8h8v6h-8v8h-6v-8h-8v-6h8Z" fill="#f0e7dc"/>';
  if (spec.type === 'croatia') return stripeMarkup('h',['#b84e45','#f0e7dc','#5a7190']) + '<path d="M32 26h8v14h-8z" fill="#f0e7dc" stroke="#ba6558" stroke-width="1"/><path d="M32 26h4v4h-4zm4 4h4v4h-4zm-4 4h4v4h-4zm4 4h4v2h-4z" fill="#b84e45"/>';
  if (spec.type === 'australia') return '<rect x="12" y="17" width="48" height="32" fill="#526b90"/><path d="m12 17 19 14m0-14L12 31" stroke="#f0e7dc" stroke-width="4"/><path d="m12 17 19 14m0-14L12 31" stroke="#b84f45" stroke-width="1.7"/><path d="M27 17v16M12 25h31" stroke="#f0e7dc" stroke-width="4"/><path d="M27 17v16M12 25h31" stroke="#b84f45" stroke-width="1.7"/>' + starPath(48,38,4,'#f0e7dc') + '<circle cx="39" cy="43" r="1.5" fill="#f0e7dc"/><circle cx="54" cy="28" r="1.4" fill="#f0e7dc"/>';
  if (spec.type === 'egypt') return stripeMarkup('h',['#b84e45','#f0e7dc','#303032']) + '<circle cx="36" cy="33" r="3" fill="#d4b36c"/><path d="M34 31h4v5h-4z" fill="#d4b36c"/>';
  if (spec.type === 'philippines') return '<rect x="12" y="17" width="48" height="16" fill="#617a9a"/><rect x="12" y="33" width="48" height="16" fill="#b84f45"/><path d="M12 17 33 33 12 49Z" fill="#f0e7dc"/><circle cx="18" cy="33" r="2" fill="#d8b76d"/>' + starPath(25,26,2.6,'#d8b76d') + starPath(25,40,2.6,'#d8b76d');
  return '<rect x="12" y="17" width="48" height="32" fill="#74513f"/>' + starPath(36,33,6,'#e5c17f');
}

export function originGlyph(code, size) {
  const c = String(code || '').toUpperCase();
  const spec = ORIGIN_FLAGS[c];
  const uid = 'zarlock-origin-' + (++flagId);
  const clip = '<defs><clipPath id="' + uid + '"><rect x="12" y="17" width="48" height="32" rx="5"/></clipPath></defs>';
  const base = '<circle cx="40" cy="40" r="37" fill="#222023" stroke="#bc7958" stroke-width="1.45"/>' +
    '<circle cx="40" cy="40" r="32.5" fill="none" stroke="#f1dfd0" stroke-opacity=".20" stroke-width=".8"/>';
  const flag = '<rect x="11.5" y="16.5" width="49" height="33" rx="5.5" fill="#252326" stroke="#e6d3c1" stroke-width="1.15"/>' +
    '<g clip-path="url(#' + uid + ')">' + flagPattern(c, spec) + '</g>' +
    '<rect x="12" y="17" width="48" height="32" rx="5" fill="none" stroke="#f3e2d3" stroke-opacity=".52" stroke-width=".85"/>' +
    '<path d="M16 19h34" stroke="#fff5ec" stroke-opacity=".25" stroke-width=".8"/>';
  const detail = '<path d="M17 55q4 2 7 0m31 0q3 1 5-1" fill="none" stroke="#cf9876" stroke-opacity=".68" stroke-width="1"/>';
  return makeSvg(clip + base + flag + detail, size || 64, 'origin-art', '0 0 80 80');
}

const TAB_DRAWINGS = Object.freeze({
  start: '<path class="ink" d="M9 17q-3-2-2-6 1-4 6-4 2-5 7-3 5 1 5 6 4 0 4 4-1 4-5 4H11q-2 0-2-1Z"/><path class="ink" d="M10 18v8h16v-8M13 22h10"/><path class="copper" d="M17 18q-3-5 1-9 0 4 3 5 2 2 0 4"/><path class="copper" d="M13 28h11"/>',
  recipes: '<path class="ink" d="M5 7q7-3 13 1 6-4 12-1v20q-6-3-12 1-6-4-13-1Z"/><path class="ink" d="M18 8v20"/><path class="copper" d="M9 12q4-1 6 1m-6 4q4-1 6 1m8-5q2-1 4-1m-4 5q2-1 4-1"/>',
  calc: '<path class="ink" d="M9 4h16q2 0 2 2v22q0 2-2 2H9q-2 0-2-2V6q0-2 2-2Z"/><path class="ink" d="M11 8h12v5H11Z"/><path class="ink" d="M12 18h.01m5 0h.01m5 0h.01M12 23h.01m5 0h.01m5 0h.01"/><path class="copper" d="M13 10h7m-7 2h4"/>',
  shopping: '<path class="ink" d="M5 12h24l-3 16H8Z"/><path class="ink" d="M11 12q1-7 6-7t6 7"/><path class="ink" d="M12 17v7m5-7v7m5-7v7"/><path class="copper" d="M10 10q2-3 4-1m7-2q3-2 4 2"/><path class="copper" d="m15 12 2-4 2 4"/>',
  settings: '<path class="ink" d="m17 3 2 2 3-.2 1 2.6 2.7 1.1-.3 3 2 2-1.6 2.4.4 3-2.8.8-1.1 2.7-3-.3-2 2-2.3-1.7-3 .4-.9-2.8-2.7-1.2.3-2.9-2-2L9.3 12l-.4-3 2.8-.9L13 5.5l3 .3Z"/><circle class="copper" cx="17" cy="14" r="4.2"/><path class="copper" d="M17 11v6m-3-3h6"/>',
});

export function tabGlyph(name, size) {
  const inner = TAB_DRAWINGS[name] || TAB_DRAWINGS.start;
  return makeSvg(inner, size || 28, 'tab-art', '0 0 34 34');
}
