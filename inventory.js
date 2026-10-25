/* ==========================================================================
   inventory.js — magazyn domowy (lodówka, zamrażarka, spiżarnia).

   Produkt: nazwa, kategoria, miejsce, stan w jednostce bazowej (g / ml / szt.),
   próg minimalny, cena, termin ważności, kod EAN, notatka.
   Ruchy: zakup, gotowanie (z receptury), strata, korekta — z historią i kosztem.

   Integracje: przepis pokazuje, co masz i czego brakuje; po ugotowaniu stany
   spadają (z możliwością cofnięcia); braki i niskie stany trafiają na listę
   zakupów; kupione wracają do magazynu.
   ========================================================================== */
import { db } from './db.js';
import { uid, norm, fmtNum } from './util.js';
import { state, emit, getSetting, allIngredients } from './recipes.js';
import { nameStems, stem, aisleOf } from './kitchen.js';
import { inventoryNamesMatch } from './inventory-matching.js';
import { pieceGrams } from './nutrition.js';

export const INV_CATS = ['Nabiał i jaja', 'Mięso i ryby', 'Warzywa i owoce', 'Sypkie i pieczywo', 'Przyprawy, oleje, sosy', 'Napoje', 'Mrożonki', 'Inne'];
export const LOCATIONS = [['fridge', 'Lodówka', '🧊'], ['freezer', 'Zamrażarka', '❄️'], ['pantry', 'Spiżarnia', '🫙']];
export const locName = (k) => (LOCATIONS.find((l) => l[0] === k) || LOCATIONS[2])[1];

const store = { items: new Map(), moves: [], loaded: false };
const DAY = 86400000;

/* ---------- Ładowanie / zapis ---------- */

export async function loadInventory() {
  try {
    const [items, moves] = await Promise.all([db.getAll('inventoryItems'), db.getAll('inventoryMovements')]);
    store.items = new Map(items.map((i) => [i.id, i]));
    store.moves = moves.sort((a, b) => b.at - a.at);
    const old = store.moves.filter((m) => Date.now() - m.at > 365 * DAY);           // porządek: ruchy starsze niż rok
    if (old.length) { await Promise.all(old.map((m) => db.delete('inventoryMovements', m.id))); store.moves = store.moves.filter((m) => !old.includes(m)); }
  } catch (e) { console.warn('Magazyn: nie udało się wczytać', e); store.items = new Map(); store.moves = []; }
  store.loaded = true;
  emit('inventory');
}

export const inventoryItems = () => [...store.items.values()].sort((a, b) => a.name.localeCompare(b.name, 'pl'));
export const getItem = (id) => store.items.get(id);
export const movements = (itemId) => (itemId ? store.moves.filter((m) => m.itemId === itemId) : store.moves);
export const inventoryLoaded = () => store.loaded;
export const hasInventory = () => store.items.size > 0;

async function persist(item) { item.updatedAt = Date.now(); store.items.set(item.id, item); await db.put('inventoryItems', item); }
async function logMove(m) {
  const mv = { id: uid('mv_'), at: Date.now(), cost: 0, reason: '', ...m };
  store.moves.unshift(mv);
  await db.put('inventoryMovements', mv);
  return mv;
}

/* ---------- Jednostki ---------- */

export const baseUnit = (u) => ({ g: 'g', kg: 'g', ml: 'ml', l: 'ml' }[u] || 'szt.');
export const toBase = (amount, unit) => (unit === 'kg' || unit === 'l' ? amount * 1000 : amount);

export function fmtStock(item, v = item.stock) {
  const n = Math.round(v * 100) / 100;
  if (item.unit === 'g') return n >= 1000 ? `${fmtNum(n / 1000, 2)} kg` : `${fmtNum(n, 0)} g`;
  if (item.unit === 'ml') return n >= 1000 ? `${fmtNum(n / 1000, 2)} l` : `${fmtNum(n, 0)} ml`;
  return `${fmtNum(n, 1)} szt.`;
}

/** Koszt jednostki bazowej (zł za g / ml / szt.). */
export function unitCost(item) {
  if (!(item.price > 0)) return 0;
  const per = item.priceUnit || (item.unit === 'g' ? 'kg' : item.unit === 'ml' ? 'l' : 'szt.');
  if (per === 'kg' || per === 'l') return item.price / 1000;
  return item.price;
}
export const stockValue = (item) => Math.max(0, item.stock) * unitCost(item);

/* ---------- Terminy i niskie stany ---------- */

export function daysLeft(item) {
  if (!item.expiry) return null;
  const d = new Date(item.expiry + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return null;
  return Math.ceil((d.getTime() - Date.now()) / DAY - 0.5);
}
export const soonDays = () => Math.max(1, +getSetting('invSoonDays') || 3);
export const isExpired = (i) => { const d = daysLeft(i); return d != null && d < 0; };
export const isSoon = (i) => { const d = daysLeft(i); return d != null && d >= 0 && d <= soonDays(); };
export const isOut = (i) => i.stock <= 0;
export const isLow = (i) => i.minStock > 0 && i.stock > 0 && i.stock <= i.minStock;
export const needsRestock = (i) => i.minStock > 0 && i.stock <= i.minStock;

export function inventorySummary() {
  const items = inventoryItems();
  const since7 = Date.now() - 7 * DAY, since30 = Date.now() - 30 * DAY;
  const waste = (since) => store.moves.filter((m) => m.type === 'waste' && m.at >= since);
  const w7 = waste(since7), w30 = waste(since30);
  const sum = (a) => a.reduce((x, m) => x + (m.cost || 0), 0);
  return {
    count: items.length,
    out: items.filter((i) => isOut(i) && i.minStock > 0).length,
    low: items.filter(isLow).length,
    soon: items.filter(isSoon).length,
    expired: items.filter(isExpired).length,
    value: items.reduce((x, i) => x + stockValue(i), 0),
    waste7: { cost: sum(w7), count: w7.length }, waste30: { cost: sum(w30), count: w30.length },
  };
}
/** Liczba rzeczy wymagających uwagi (znaczek na zakładce Magazyn). */
export const attentionCount = () => { if (getSetting('invAlerts') === false) return 0; const s = inventorySummary(); return s.out + s.low + s.soon + s.expired; };

/* ---------- Dodawanie / edycja ---------- */

export function newItem(over = {}) {
  const name = over.name || '';
  const cat = over.category || (name ? aisleOf(name) : 'Inne');
  return {
    id: uid('inv_'), name, category: INV_CATS.includes(cat) ? cat : 'Inne', location: over.location || guessLocation(name, cat), stock: 0, unit: 'g', minStock: 0,
    price: 0, priceUnit: '', barcode: '', expiry: '', note: '', aliases: [], createdAt: Date.now(), updatedAt: Date.now(), ...over,
  };
}
export function guessLocation(name, cat) {
  const n = norm(name);
  if (/mrozon|lody|mrozona/.test(n)) return 'freezer';
  if (['Nabiał i jaja', 'Mięso i ryby', 'Warzywa i owoce'].includes(cat)) return /ziemniak|cebul|czosnek|dyni/.test(n) ? 'pantry' : 'fridge';
  return 'pantry';
}

export async function saveItem(item, { log = null } = {}) {
  item.name = String(item.name || '').trim();
  if (!item.name) throw new Error('Podaj nazwę produktu');
  item.stock = Math.max(0, Number(item.stock) || 0);
  await persist(item);
  if (log) await logMove({ itemId: item.id, name: item.name, unit: item.unit, ...log });
  emit('inventory');
  return item;
}

export async function deleteItem(id) {
  store.items.delete(id);
  await db.delete('inventoryItems', id);
  emit('inventory');
}

/** Zmiana stanu o `delta` (jednostka bazowa). type: purchase | cook | waste | adjust. */
export async function changeStock(item, delta, { type = 'adjust', reason = '', recipeId = '', recipeName = '', price = null } = {}) {
  const before = item.stock;
  item.stock = Math.max(0, before + delta);
  const real = item.stock - before;
  if (type === 'purchase' && price > 0 && delta > 0) {
    item.price = price; item.priceUnit = item.unit === 'g' ? 'kg' : item.unit === 'ml' ? 'l' : 'szt.';
    if (item.unit !== 'szt.') item.price = price / (delta / 1000);                                 // cena za kg/l z ceny zakupu
    else item.price = price / delta;
  }
  await persist(item);
  const cost = type === 'waste' ? Math.abs(real) * unitCost(item) : 0;
  const mv = await logMove({ itemId: item.id, name: item.name, unit: item.unit, type, amount: real, cost, reason, recipeId, recipeName });
  emit('inventory');
  return mv;
}

export async function undoMovements(ids) {
  for (const id of ids) {
    const mv = store.moves.find((m) => m.id === id);
    if (!mv) continue;
    const it = store.items.get(mv.itemId);
    if (it) { it.stock = Math.max(0, it.stock - mv.amount); await persist(it); }
    store.moves = store.moves.filter((m) => m.id !== id);
    await db.delete('inventoryMovements', id);
  }
  emit('inventory');
}

export async function recordWaste(item, amount, reason = 'Wyrzucone') {
  const take = Math.min(amount, item.stock);
  if (!(take > 0)) return null;
  return changeStock(item, -take, { type: 'waste', reason });
}

/* ---------- Kody EAN ---------- */

export const findByBarcode = (code) => inventoryItems().find((i) => i.barcode && i.barcode === String(code));

/* ---------- Dopasowanie składników receptury do magazynu ---------- */

const BASIC = /^(woda|sol|pieprz|lod|przyprawy?)(\s|$|,)|^sol\b|^woda\b/;
const wordStart = (hay, st) => !!st && new RegExp('(^|[^a-z0-9])' + st).test(hay);

function matchScore(ingName, item) {
  // Prefer exact or same-phrase Polish inflection matches before the legacy prefix heuristic.
  if (inventoryNamesMatch(item, ingName)) return 10;
  const n = norm(ingName);
  const ing = nameStems(ingName);
  const names = [item.name, ...(item.aliases || [])];
  let best = 0;
  for (const nm of names) {
    const it = nameStems(nm);
    if (!it.length || !ing.length) continue;
    let sc = 0;
    if (wordStart(n, it[0]) || wordStart(norm(nm), ing[0])) sc = 2;
    else continue;
    if (it[1] && ing[1]) sc += (wordStart(n, it[1]) || wordStart(norm(nm), ing[1]) ? 1 : -1);
    best = Math.max(best, sc);
  }
  return best;
}

export function findItemFor(ingName) {
  let best = null, bestScore = 1;
  for (const it of store.items.values()) {
    const sc = matchScore(ingName, it);
    if (sc > bestScore || (sc === bestScore && best && it.stock > best.stock)) { best = it; bestScore = sc; }
  }
  return best;
}

/** Ile jednostek bazowych produktu potrzeba na składnik (albo null, gdy nie da się przeliczyć). */
export function needIn(item, ing, factor = 1) {
  if (ing.amount == null || !Number.isFinite(ing.amount)) return null;
  const a = ing.amount * factor;
  let base = null, isCount = false;
  switch (ing.unit) {
    case 'g': case 'ml': base = a; break;
    case 'kg': case 'l': base = a * 1000; break;
    case 'łyżka': base = a * 15; break;
    case 'łyżeczka': base = a * 5; break;
    case 'szczypta': base = a * 0.4; break;
    case 'szt.': isCount = true; base = a; break;
    default: return null;
  }
  if (item.unit === 'szt.') {
    if (isCount) return base;
    const w = pieceGrams(item.name) || pieceGrams(ing.name);
    return w ? base / w : null;
  }
  if (isCount) { const w = pieceGrams(ing.name) || pieceGrams(item.name); return w ? base * w : null; }
  return base;
}

/**
 * Dostępność receptury w magazynie.
 * status: ok | partial | missing | basic | taste (amount „do smaku”, bez wpływu na wynik).
 */
export function availability(recipe, factor = 1) {
  const rows = [];
  for (const ing of allIngredients(recipe)) {
    if (!ing.name || ing.unit === '%') continue;
    const name = norm(ing.name);
    if (BASIC.test(name)) { rows.push({ ing, item: null, status: 'basic', need: null, have: null }); continue; }
    const item = findItemFor(ing.name);
    const need = item ? needIn(item, ing, factor) : null;
    if (ing.amount == null) { rows.push({ ing, item, status: item ? 'ok' : 'taste', need: null, have: item ? item.stock : 0 }); continue; }
    if (!item) { rows.push({ ing, item: null, status: 'missing', need: null, have: 0 }); continue; }
    if (need == null) { rows.push({ ing, item, status: item.stock > 0 ? 'ok' : 'missing', need: null, have: item.stock }); continue; }
    const have = item.stock;
    rows.push({ ing, item, need, have, status: have >= need * 0.999 ? 'ok' : have > 0 ? 'partial' : 'missing' });
  }
  const counted = rows.filter((r) => ['ok', 'partial', 'missing'].includes(r.status));
  const ok = counted.filter((r) => r.status === 'ok').length;
  return { rows, counted: counted.length, ok, partial: counted.filter((r) => r.status === 'partial').length, missing: counted.filter((r) => r.status === 'missing').length, pct: counted.length ? ok / counted.length : 0 };
}

/** Pozycje do listy zakupów: tylko to, czego brakuje (z uwzględnieniem tego, co jest w magazynie). */
export function shoppingGaps(recipe, factor = 1) {
  const out = [];
  for (const r of availability(recipe, factor).rows) {
    if (!['partial', 'missing'].includes(r.status)) continue;
    const ing = r.ing;
    let amount = ing.amount != null ? ing.amount * factor : null;
    if (r.status === 'partial' && r.need > 0 && amount != null) amount = amount * ((r.need - r.have) / r.need);
    if (amount != null) amount = Math.round(amount * 10) / 10;
    out.push({ name: ing.name, amount, unit: ing.unit, recipeId: recipe.id, recipeName: recipe.name });
  }
  return out;
}

/** Odejmuje od magazynu składniki ugotowanej receptury. Zwraca { moves, used, short } do podsumowania/cofnięcia. */
export async function deductRecipe(recipe, factor = 1) {
  const av = availability(recipe, factor);
  const moves = [], used = [], short = [];
  for (const r of av.rows) {
    if (!r.item || !(r.need > 0) || !['ok', 'partial'].includes(r.status)) { if (r.status === 'missing' && r.ing.amount != null) short.push(r.ing.name); continue; }
    const take = Math.min(r.need, r.item.stock);
    if (!(take > 0)) continue;
    const mv = await changeStock(r.item, -take, { type: 'cook', recipeId: recipe.id, recipeName: recipe.name, reason: `Gotowanie: ${recipe.name}` });
    moves.push(mv.id); used.push({ name: r.item.name, amount: take, item: r.item });
    if (r.status === 'partial') short.push(r.ing.name);
  }
  return { moves, used, short };
}

/* ---------- Niskie stany → zakupy; kupione → magazyn ---------- */

export function restockList() {
  return inventoryItems().filter(needsRestock).map((i) => {
    const target = Math.max(i.minStock * 2, i.minStock + 1);
    let amount = Math.max(0, target - i.stock);
    let unit = i.unit;
    if (unit === 'g' && amount >= 1000) { amount /= 1000; unit = 'kg'; } else if (unit === 'ml' && amount >= 1000) { amount /= 1000; unit = 'l'; }
    amount = unit === 'szt.' ? Math.ceil(amount) : Math.round(amount * 10) / 10;
    return { name: i.name, amount, unit, recipeName: 'Magazyn' };
  });
}

/** Zakupy oznaczone jako kupione → stany magazynu (zakładanie nowych pozycji, gdy brakuje). */
export async function receiveShopping(items) {
  let added = 0, created = 0;
  for (const s of items) {
    const unit = ['g', 'kg', 'ml', 'l', 'szt.'].includes(s.unit) ? s.unit : 'szt.';
    const amount = s.amount != null && s.amount > 0 ? toBase(s.amount, unit) : (unit === 'szt.' ? 1 : null);
    if (amount == null) continue;
    let it = findItemFor(s.name);
    if (!it) { it = newItem({ name: s.name, unit: baseUnit(unit), stock: 0 }); created++; await persist(it); }
    const converted = it.unit === baseUnit(unit) ? amount : (it.unit === 'szt.' ? amount / (pieceGrams(it.name) || 100) : amount * (pieceGrams(s.name) || 1));
    await changeStock(it, converted, { type: 'purchase', reason: 'Kupione (lista zakupów)' });
    added++;
  }
  emit('inventory');
  return { added, created };
}

/** Szybki szacunek, ile receptur z całej książki da się ugotować z magazynu (≥ minPct składników). */
export function cookableRecipes(minPct = 0.85, limit = 24) {
  if (!hasInventory()) return [];
  const out = [];
  for (const r of state.recipes.values()) {
    const av = availability(r, 1);
    if (av.counted >= 3 && av.pct >= minPct) out.push({ recipe: r, av });
  }
  return out.sort((a, b) => b.av.pct - a.av.pct || a.av.missing - b.av.missing).slice(0, limit);
}
