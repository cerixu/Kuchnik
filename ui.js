/* ==========================================================================
   ui.js — pomocniki DOM: h(), ikony, toast, okna modalne / arkusze, formularze.
   Zero alert()/confirm() — wszystko własne, dostępne (aria, focus, Escape).
   ========================================================================== */
import { fmtNum, parseNum } from './util.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const PROP_KEYS = new Set(['value', 'checked', 'disabled', 'selected', 'hidden', 'readOnly', 'multiple', 'indeterminate']);

/** Tworzy element: h('div', {class:'x', onClick: fn}, 'tekst', child, [children]) */
export function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  let value;
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class' || k === 'className') el.className = v;
    else if (k === 'style') { if (typeof v === 'string') el.style.cssText = v; else Object.assign(el.style, v); }
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else if (k === 'ref') v(el);
    else if (/^on[A-Z]/.test(k)) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'value') value = v;
    else if (PROP_KEYS.has(k)) el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  const add = (c) => {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(add);
    else el.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
  };
  kids.forEach(add);
  if (value !== undefined) el.value = value;
  return el;
}

/* ---------- Ikony (SVG 24×24, obrys) ---------- */
const ICONS = {
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  home2: '<path d="M3.5 11.2 12 4l8.5 7.2"/><path d="M5.5 9.8V19a1 1 0 0 0 1 1H10v-5.2h4V20h3.5a1 1 0 0 0 1-1V9.8"/>',
  basket: '<path d="M3 9h18l-1.7 9.3a2 2 0 0 1-2 1.7H6.7a2 2 0 0 1-2-1.7z"/><path d="M8 9l3-5M16 9l-3-5"/><path d="M9 13v3M12 13v3M15 13v3"/>',
  grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="2.2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2.2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2.2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2.2"/>',
  pot: '<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M2 10h20M8 6V4M12 6V3M16 6V4"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  fire: '<path d="M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z"/>',
  volume: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/>',
  mute: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 6M22 9l-5 6"/>',
  shuffle: '<path d="M3 7h3c5 0 5 10 10 10h5"/><path d="M3 17h3c1.5 0 2.6-.8 3.5-2"/><path d="M13.5 9c.9-1.2 2-2 3.5-2h4"/><path d="M18 4l3 3-3 3"/><path d="M18 14l3 3-3 3"/>',
  ruler: '<rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 8v3M10 8v4M14 8v3M18 8v4"/>',
  scale: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M8 8a4 4 0 0 1 8 0"/><path d="M12 15l2.5-2.5"/>',
  drop: '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
  flame: '<path d="M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.5 1.1.5 2.1h6c0-1 0-1.7.5-2.1A6 6 0 0 0 12 3z"/>',
  fridge: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M6 10h12M9 5v2M9 13v3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3M14 9l2 2"/>',
  wave: '<path d="M2 12h3l2-6 4 12 3-9 2 3h6"/>',
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  book: '<path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M4 17a3 3 0 0 1 3-3h11"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.3a1 1 0 0 0 1-.8L21 7H6"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  chef: '<path d="M6 14a4 4 0 0 1 1-7.9A5 5 0 0 1 17 6a4 4 0 0 1 1 8"/><path d="M6 14v6h12v-6M6 17h12"/>',
  left: '<path d="M15 5l-7 7 7 7"/>',
  right: '<path d="M9 5l7 7-7 7"/>',
  down: '<path d="M5 9l7 7 7-7"/>',
  up: '<path d="M5 15l7-7 7 7"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  thermo: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
  swap: '<path d="M4 8h12M12 4l4 4-4 4"/><path d="M20 16H8M12 12l-4 4 4 4"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  share: '<path d="M12 15V3M8 7l4-4 4 4"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
  download: '<path d="M12 3v12M8 11l4 4 4-4"/><path d="M5 19h14"/>',
  upload: '<path d="M12 15V3M8 7l4-4 4 4"/><path d="M5 19h14"/>',
  more: '<circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4-2v-4z"/>',
  sort: '<path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-9 9"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>',
  coins: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9a3 3 0 0 0-2.5-1.3c-1.7 0-3 .9-3 2.3s1.3 2 3 2.4 3 1 3 2.4-1.3 2.3-3 2.3A3 3 0 0 1 9.5 15M12 6v1.7M12 16.3V18"/>',
  percent: '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.3"/><circle cx="17" cy="17" r="2.3"/>',
  pizza: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="9" r="1.2"/><circle cx="15" cy="10" r="1.2"/><circle cx="11" cy="15" r="1.2"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
};

/* ---------- Rysowane ikony UI: podwójny ślad kredki ---------- */
const PENCIL_ICONS = {
  left: '<path d="M15.4 5.1 C13.1 7.3 10.3 9.7 7.7 12.1 C10.3 14.4 12.9 16.7 15.3 18.9"/>',
  right: '<path d="M8.6 5.1 C10.9 7.3 13.7 9.7 16.3 12.1 C13.7 14.4 11.1 16.7 8.7 18.9"/>',
  down: '<path d="M5.1 9.1 C7.3 11.3 9.7 13.8 12 16.1 C14.3 13.8 16.7 11.3 18.9 9.1"/>',
  up: '<path d="M5.1 14.9 C7.3 12.7 9.7 10.2 12 7.9 C14.3 10.2 16.7 12.7 18.9 14.9"/>',
  x: '<path d="M6.2 6.1 C9.2 9.2 14.9 14.8 17.9 17.9"/><path d="M17.8 6.2 C14.7 9.2 9.2 14.8 6.1 17.9"/>',
  check: '<path d="M4.7 12.7 C6.3 14.2 7.8 15.8 9.4 17.2 C12.4 13.7 15.9 9.7 19.4 6.8"/>',
  plus: '<path d="M12.1 5.1 C11.8 8 12.2 10.1 12 12.1 C11.8 14.6 12.2 17 12 18.9"/><path d="M5.1 12.1 C7.8 11.8 10 12.2 12 12 C14.5 11.8 16.9 12.2 18.9 12"/>',
  minus: '<path d="M5.1 12.1 C8 11.8 10 12.2 12 12 C14.5 11.8 17 12.2 18.9 12"/>',
  search: '<path d="M15.7 4.8 C19.1 7.1 19.1 12.5 16.1 15.5 C13.1 18.5 7.8 18.2 5.1 15 C2.6 12 3.4 7.2 6.4 5.1 C9.1 3.1 13 3 15.7 4.8Z"/><path d="M15.3 15.2 C17.1 17 18.8 18.7 20.3 20.1"/>',
  home2: '<path d="M3.6 11.3 C6.4 8.9 9.4 6.3 12.1 4.1 C14.9 6.5 17.8 8.8 20.4 11.4"/><path d="M5.4 10.2 L5.4 19 C5.4 19.7 5.9 20 6.6 20 L10.1 20 L10.1 14.8 C10.1 14.4 10.4 14.1 10.8 14.1 L13.4 14.1 C13.8 14.1 14.1 14.4 14.1 14.8 L14.1 20 L17.5 20 C18.2 20 18.7 19.6 18.7 18.9 L18.7 10.2"/>',
  home: '<path d="M3.2 11.2 C6.2 8.6 9.4 5.7 12 3.3 C14.9 5.8 18 8.5 20.8 11.2"/><path d="M5.1 10.2 L5.1 20 L10.1 20 L10.1 14.2 L14 14.2 L14 20 L18.9 20 L18.9 10.2"/>',
  chef: '<path d="M6.2 14.1 C3.9 13.1 3.5 10.4 5.1 8.4 C6.1 7.1 7.6 6.8 8.8 7.2 C9.2 4.9 11 3.5 13 3.7 C15 3.9 16.3 5.2 16.6 7.2 C18.6 6.6 20.4 8.1 20.3 10.4 C20.2 12.3 18.8 13.6 17.2 14.1"/><path d="M6.3 13.5 L6.3 20 L17.7 20 L17.7 13.5"/><path d="M6.4 17.2 C9.6 17.5 14.6 17.5 17.6 17.2"/>',
  pot: '<path d="M4 10.2 C8.1 9.9 15.8 10 20 10.2 L19 16.2 C18.7 18.3 17.2 19.6 15.1 19.6 L8.8 19.6 C6.5 19.6 5.2 18.4 4.9 16.2Z"/><path d="M2.4 10.2 C8.5 10 15.7 10 21.5 10.2"/><path d="M8.1 6.2 C7.3 5.1 8.7 4.2 8.1 3.1 M12 6 C11.2 4.8 12.8 4.1 12.1 2.8 M15.8 6.2 C15.1 5.1 16.4 4.2 15.8 3.1"/>',
  book: '<path d="M4.1 5.1 C7.7 3.5 11 4 12.1 5.2 C13.5 4 17 3.6 19.8 5.1 L19.8 19.7 C16.5 18.5 13.5 18.8 12 20 C10.4 18.8 7.2 18.5 4.1 19.7Z"/><path d="M12 5.2 L12 19.8"/><path d="M6.8 8 C8.2 7.6 9.4 7.8 10.2 8.2 M13.9 8.1 C15.3 7.7 16.5 7.8 17.3 8.2"/>',
  basket: '<path d="M3 9.1 C8.1 8.8 15.9 8.9 21 9.1 L19.2 18 C19 19.2 18.1 20 16.8 20 L7.1 20 C5.8 20 5 19.2 4.8 18Z"/><path d="M7.7 9.1 C8.7 6.9 10 5.2 11 4.2 M16.2 9.1 C15.3 6.8 14 5.2 13 4.2"/><path d="M8.2 12.1 L8.7 16.5 M12 12 L12 16.7 M15.8 12.1 L15.3 16.5"/>',
  grid: '<rect x="3.1" y="3.2" width="7.4" height="7.2" rx="2.1"/><rect x="13.5" y="3.1" width="7.3" height="7.4" rx="2.2"/><rect x="3.2" y="13.5" width="7.3" height="7.3" rx="2.1"/><rect x="13.5" y="13.5" width="7.3" height="7.3" rx="2.2"/>',
  calc: '<rect x="5.1" y="3.1" width="13.8" height="17.8" rx="2.5"/><path d="M8 7.3 C10 7.1 14.2 7.1 16.1 7.3"/><path d="M8.1 12.1 l.1 0 M12 12.1 l.1 0 M15.8 12.1 l.1 0 M8.1 16.2 l.1 0 M12 16.2 l.1 0 M15.8 16.2 l.1 0"/>',
  timer: '<circle cx="12" cy="13" r="8.1"/><path d="M12 8.5 C11.8 10.2 12.1 11.6 12 13.1 L14.8 15"/><path d="M9.2 2.4 C11 2.2 13.2 2.2 14.9 2.4"/>',
  clock: '<path d="M12.1 3.1 C17.1 3.1 20.9 7.2 20.9 12.1 C20.9 17.1 17 20.9 12 20.9 C7.1 20.9 3.2 17 3.2 12 C3.2 7 7.1 3.2 12.1 3.1Z"/><path d="M12 7.1 C11.8 9 12.1 10.6 12 12.2 L15.1 14.1"/>',
  star: '<path d="M12.1 3.1 L14.8 8.7 L20.8 9.6 L16.4 13.8 L17.5 20 L12 17.1 L6.5 20 L7.6 13.8 L3.2 9.6 L9.3 8.7Z"/>',
  heart: '<path d="M12 20.8 C10.2 19.2 4.2 14.6 3.1 10.5 C2.3 7.3 4.1 4.6 7.2 4.5 C9.2 4.4 10.9 5.5 12 7 C13.4 5.3 15.1 4.4 17.1 4.6 C20.4 4.8 21.8 7.9 20.8 10.8 C19.7 14.6 14.6 19 12 20.8Z"/>',
};
const ICON_PENCIL_DETAILS = {
  check: '<path class="ico-pencil-accent" stroke="#9fb39a" d="M5.1 12.9 C6.5 14.2 7.8 15.5 9.1 16.7"/>',
  star: '<path class="ico-pencil-accent" stroke="#cdb27e" d="M9.6 8.8 L12.1 3.8 L14.2 8.8"/>',
  heart: '<path class="ico-pencil-accent" stroke="#d6a19a" d="M5.3 8.1 C6.1 6.3 8 5.9 9.5 6.7"/>',
  timer: '<path class="ico-pencil-accent" stroke="#a8b6b6" d="M12 9.1 L12 12.8 L14.2 14.2"/>',
  chef: '<path class="ico-pencil-accent" stroke="#d9c2a8" d="M7.2 14.3 C10 15 14.2 15 16.8 14.3"/>',
  pizza: '<path class="ico-pencil-accent" stroke="#d6aa7d" d="M8.2 9.1 L9 9.2 M14.8 10.1 L15.4 10.2 M11 14.8 L11.6 15"/>',
};

export function icon(name, size = 22) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.8');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('data-icon', name);
  svg.classList.add('ico', 'ico-pencil');

  const artwork = PENCIL_ICONS[name] || ICONS[name] || '';
  const shadow = h('g', { class: 'ico-pencil-shadow', transform: 'translate(.24 .18)' });
  shadow.innerHTML = artwork;
  const main = h('g', { class: 'ico-pencil-main' });
  main.innerHTML = artwork;
  svg.append(shadow, main);
  if (ICON_PENCIL_DETAILS[name]) {
    const details = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    details.setAttribute('class', 'ico-pencil-details');
    details.innerHTML = ICON_PENCIL_DETAILS[name];
    svg.appendChild(details);
  }
  return svg;
}

/* ---------- Przyciski ---------- */

/** button('Zapisz', {kind:'primary', icon:'check', onClick, block, lg, sm}) */
export function button(label, o = {}) {
  const cls = ['btn', o.kind || '', o.block ? 'block' : '', o.lg ? 'lg' : '', o.sm ? 'sm' : '', o.cls || ''].filter(Boolean).join(' ');
  return h('button', { type: 'button', class: cls, onClick: o.onClick, disabled: o.disabled, 'aria-label': o.aria, title: o.title },
    o.icon ? icon(o.icon, o.iconSize || 20) : null, label ? h('span', null, label) : null);
}

/** Przycisk-ikona z obowiązkowym aria-label. */
export function iconBtn(name, label, onClick, cls = '') {
  return h('button', { type: 'button', class: 'iconbtn ' + cls, 'aria-label': label, title: label, onClick }, icon(name, 24));
}

/* ---------- Ekran (nagłówek + przewijana treść) ---------- */

export function screen({ title, left, right, sub, cls = '', large = true }, ...content) {
  const heroMode = large === 'hero';
  if (heroMode) large = false;
  if (sub) large = false;      // ekrany z wyszukiwarką/zakładkami: tytuł mały, wyśrodkowany (jak w iOS przy pasku wyszukiwania)
  const mini = h('div', { class: 'topbar-mini', 'aria-hidden': large || heroMode ? 'true' : null }, title);
  const row = h('div', { class: 'topbar-row' }, left || h('span', { class: 'nav-spacer' }), mini, right || h('span', { class: 'nav-spacer' }));
  const top = h('header', { class: 'topbar' + (large || heroMode ? '' : ' compact') + (sub ? ' has-sub' : '') }, row, sub || null);
  const big = large ? h('h1', { class: 'topbar-title' }, title) : null;
  const inner = h('div', { class: 'content' }, ...content);
  const scroll = h('div', { class: 'scroll' }, big, inner);
  const el = h('section', { class: 'screen ' + cls }, scroll, top);   // pasek nad treścią: przewijana treść „wchodzi” pod szkło
  // Wysokość paska (zmienia się z wyszukiwarką/zakładkami) → odstęp na górze przewijanej treści.
  const measure = () => el.style.setProperty('--top-h', top.offsetHeight + 'px');
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(top);
  requestAnimationFrame(measure);
  scroll.addEventListener('scroll', () => {
    const limit = big ? Math.max(24, big.offsetTop + big.offsetHeight * 0.55 - (parseFloat(el.style.getPropertyValue('--top-h')) || 0)) : heroMode ? 240 : 2;
    top.classList.toggle('scrolled', scroll.scrollTop > limit);
  }, { passive: true });
  const setTitle = (t) => { mini.textContent = t; if (big) big.textContent = t; };
  return { el, top, scroll, content: inner, setTitle };
}

export const emptyState = (mark, title, text, ...actions) =>
  h('div', { class: 'empty' }, h('div', { class: 'empty-mark', 'aria-hidden': 'true' }, icon(mark, 44)), h('h2', null, title),
    text ? h('p', { class: 'muted' }, text) : null, actions.length ? h('div', { class: 'row wrap center' }, actions) : null);

/* ---------- Toast ---------- */

export function toast(msg, o = {}) {
  const box = $('#toasts');
  if (!box) return { dismiss() {} };
  const t = h('div', { class: 'toast ' + (o.type || ''), role: 'status' }, h('span', { class: 'toast-msg' }, msg));
  let timer;
  const dismiss = () => { clearTimeout(timer); t.classList.remove('in'); setTimeout(() => t.remove(), 200); };
  if (o.action) t.appendChild(h('button', { type: 'button', class: 'toast-act', onClick: () => { dismiss(); o.action.fn(); } }, o.action.label));
  box.appendChild(t);
  while (box.children.length > 3) box.firstChild.remove();
  requestAnimationFrame(() => t.classList.add('in'));
  if (!o.sticky) timer = setTimeout(dismiss, o.ms || (o.action ? 6000 : 2400));
  return { dismiss };
}

/* ---------- Arkusze i okna dialogowe ---------- */

const stack = [];
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * openSheet({ title, body, actions:[{label, kind, onClick}], variant:'sheet'|'center', onClose })
 * onClick może zwrócić false (lub Promise<false>), by nie zamykać okna.
 */
export function openSheet({ title, body, actions = [], variant = 'sheet', onClose, dismissible = true, cls = '' }) {
  const prevFocus = document.activeElement;
  let closed = false;
  const close = (reason = 'api') => {
    if (closed) return;
    closed = true;
    const i = stack.indexOf(api); if (i >= 0) stack.splice(i, 1);
    ov.classList.remove('in');
    setTimeout(() => ov.remove(), 180);
    if (!stack.length) document.body.classList.remove('modal-open');
    if (prevFocus && prevFocus.focus && document.contains(prevFocus)) { try { prevFocus.focus({ preventScroll: true }); } catch (_) { /* */ } }
    if (onClose) onClose(reason);
  };
  const bodyEl = h('div', { class: 'panel-body' }, body);
  const foot = actions.length ? h('div', { class: 'panel-foot' }, actions.map((a) => h('button', {
    type: 'button', class: 'btn ' + (a.kind || ''), disabled: a.disabled,
    onClick: async (e) => {
      const r = a.onClick ? await a.onClick(e) : undefined;
      if (r !== false && a.close !== false) close('action');
    },
  }, a.icon ? icon(a.icon, 20) : null, a.label))) : null;
  const panel = h('div', { class: 'panel', role: 'dialog', 'aria-modal': 'true', 'aria-label': title || 'Okno', tabindex: '-1' },
    title ? h('div', { class: 'panel-head' }, h('h2', null, title), dismissible ? iconBtn('x', 'Zamknij', () => close('x')) : null) : null,
    bodyEl, foot);
  const ov = h('div', { class: `overlay ${variant} ${cls}` }, h('div', { class: 'backdrop', onClick: dismissible ? () => close('backdrop') : null }), panel);
  const api = { close, panel, body: bodyEl, el: ov, dismissible };
  $('#overlays').appendChild(ov);
  stack.push(api);
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => { ov.classList.add('in'); panel.focus({ preventScroll: true }); });
  return api;
}

export function closeAllOverlays() { [...stack].forEach((s) => s.close('route')); }

if (typeof document !== 'undefined') document.addEventListener('keydown', (e) => {
  const top = stack[stack.length - 1];
  if (!top) return;
  if (e.key === 'Escape' && top.dismissible) { e.preventDefault(); top.close('escape'); }
  if (e.key === 'Tab') {
    const f = [...top.panel.querySelectorAll(FOCUSABLE)].filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === top.panel)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/** Własne potwierdzenie (zamiast confirm()). Zwraca Promise<boolean>. */
export function confirmDialog({ title, message, confirmText = 'OK', cancelText = 'Anuluj', danger = false }) {
  return new Promise((resolve) => {
    let result = false;
    openSheet({
      title, variant: 'center', body: h('p', { class: 'dialog-msg' }, message),
      actions: [
        { label: cancelText, kind: 'ghost' },
        { label: confirmText, kind: danger ? 'danger' : 'primary', onClick: () => { result = true; } },
      ],
      onClose: () => resolve(result),
    });
  });
}

/** Własne pole tekstowe (zamiast prompt()). Zwraca Promise<string|null>. */
export function promptDialog({ title, label, value = '', placeholder = '', confirmText = 'OK', message, inputmode }) {
  return new Promise((resolve) => {
    let result = null;
    const input = h('input', { class: 'input', type: 'text', value, placeholder, autocomplete: 'off', inputmode, 'aria-label': label || title });
    const submit = () => { result = input.value.trim(); sh.close('action'); };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    const sh = openSheet({
      title, variant: 'center',
      body: h('div', { class: 'stack' }, message ? h('p', { class: 'dialog-msg' }, message) : null, label ? h('label', { class: 'field-label' }, label) : null, input),
      actions: [{ label: 'Anuluj', kind: 'ghost' }, { label: confirmText, kind: 'primary', onClick: () => { result = input.value.trim(); } }],
      onClose: () => resolve(result),
    });
    setTimeout(() => { if (!/iPhone|iPad/.test(navigator.userAgent)) input.focus(); }, 60);
  });
}

/* ---------- Formularze ---------- */

export const field = (label, control, hint) =>
  h('label', { class: 'field' }, h('span', { class: 'field-label' }, label), control, hint ? h('span', { class: 'field-hint' }, hint) : null);

export function textInput({ value = '', placeholder = '', onInput, label, cls = '', list, type = 'text', inputmode, capitalize = 'sentences' } = {}) {
  const el = h('input', { class: 'input ' + cls, type, value, placeholder, 'aria-label': label, autocomplete: 'off', autocapitalize: capitalize, list, inputmode, enterkeyhint: 'next' });
  if (onInput) el.addEventListener('input', () => onInput(el.value, el));
  return el;
}

export function autosize(el) {
  const fit = () => { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight + 2, 600) + 'px'; };
  el.addEventListener('input', fit);
  el.addEventListener('focus', fit);
  el._fit = fit;
  requestAnimationFrame(fit);
  return el;
}
export const autosizeAll = (root) => $$('textarea.auto', root).forEach((t) => t._fit && t._fit());

export function textArea({ value = '', placeholder = '', onInput, label, rows = 3, cls = '' } = {}) {
  const el = h('textarea', { class: 'input textarea auto ' + cls, rows, placeholder, 'aria-label': label, value, autocapitalize: 'sentences' });
  if (onInput) el.addEventListener('input', () => onInput(el.value, el));
  return autosize(el);
}

/** Pole liczbowe z przecinkiem dziesiętnym (klawiatura numeryczna iOS). */
export function numInput({ value = null, onInput, placeholder = '', label, dec = 3, cls = '' } = {}) {
  const el = h('input', { class: 'input num ' + cls, type: 'text', inputmode: 'decimal', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false',
    'aria-label': label, placeholder, value: value == null ? '' : fmtNum(value, dec), enterkeyhint: 'done' });
  el.addEventListener('input', () => {
    const n = parseNum(el.value);
    el.classList.toggle('invalid', el.value.trim() !== '' && n == null);
    if (onInput) onInput(n, el);
  });
  el.addEventListener('focus', () => setTimeout(() => { try { el.select(); } catch (_) { /* */ } }, 0));
  return el;
}

/** options: ['a','b'] albo [['val','Etykieta'],…] */
export function selectEl(options, value, onChange, { label, cls = '' } = {}) {
  const el = h('select', { class: 'input select ' + cls, 'aria-label': label },
    options.map((o) => { const [v, l] = Array.isArray(o) ? o : [o, o]; return h('option', { value: v }, l); }));
  el.value = value == null ? '' : value;
  if (onChange) el.addEventListener('change', () => onChange(el.value));
  return el;
}

/** Przełącznik segmentowy (radio). */
export function segmented(options, value, onChange, { label, cls = '' } = {}) {
  const wrap = h('div', { class: 'seg ' + cls, role: 'group', 'aria-label': label });
  const paint = () => [...wrap.children].forEach((b) => { const on = b.dataset.v === String(value); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  options.forEach((o) => {
    const [v, l] = Array.isArray(o) ? o : [o, o];
    wrap.appendChild(h('button', { type: 'button', dataset: { v: String(v) }, onClick: () => { value = v; paint(); onChange(v); } }, l));
  });
  paint();
  return wrap;
}

export function switchEl(checked, onChange, label, hint) {
  const input = h('input', { type: 'checkbox', role: 'switch', checked: !!checked });
  input.addEventListener('change', () => onChange(input.checked));
  return h('label', { class: 'switch-row' }, h('span', { class: 'switch-text' }, h('span', null, label), hint ? h('small', { class: 'muted' }, hint) : null),
    h('span', { class: 'switch' }, input, h('span', { class: 'track' })));
}

export const chip = (label, { on = false, onClick, cls = '', aria } = {}) =>
  h('button', { type: 'button', class: `chip ${on ? 'on' : ''} ${cls}`, 'aria-pressed': on, 'aria-label': aria, onClick }, label);

/* ---------- Skróty ---------- */
export const scrollTop = (el) => { if (el) el.scrollTop = 0; };
export function focusLater(el) { setTimeout(() => { try { el.focus(); } catch (_) { /* */ } }, 30); }
