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
    // Zachowujemy pełną historię ruchów. Nie usuwaj jej automatycznie na podstawie wieku:
    // może być potrzebna do rozliczeń, strat i kontroli stanów.
    store.moves = moves.sort((a, b) => b.at - a.at);
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

/** Zmiana stanu i wpis historii są zapisywane w jednej transakcji. */
export async function changeStock(item, delta, { type = 'adjust', reason = '', recipeId = '', recipeName = '', price = null } = {}) {
  const before = Math.max(0, Number(item.stock) || 0);
  const change = Number(delta);
  if (!Number.isFinite(change)) throw new Error('Nieprawidłowa zmiana stanu');

  const nextStock = Math.max(0, before + change);
  const real = nextStock - before;
  const nextItem = { ...item, stock: nextStock, updatedAt: Date.now() };
  if (type === 'purchase' && price > 0 && change > 0) {
    nextItem.price = price;
    nextItem.priceUnit = nextItem.unit === 'g' ? 'kg' : nextItem.unit === 'ml' ? 'l' : 'szt.';
    if (nextItem.unit !== 'szt.') nextItem.price = price / (change / 1000);
    else nextItem.price = price / change;
  }

  const mv = {
    id: uid('mv_'), at: nextItem.updatedAt,
    cost: type === 'waste' ? Math.abs(real) * unitCost(nextItem) : 0,
    reason, itemId: nextItem.id, name: nextItem.name, unit: nextItem.unit,
    type, amount: real, recipeId, recipeName,
  };

  // IndexedDB commits the new stock and its audit movement together.
  // Do not mutate the live object until persistence succeeds.
  await db.tx(['inventoryItems', 'inventoryMovements'], (t) => {
    t.put('inventoryItems', nextItem);
    t.put('inventoryMovements', mv);
  });

  Object.assign(item, nextItem);
  store.items.set(item.id, item);
  store.moves.unshift(mv);
  emit('inventory');
  return mv;
}

/** Cofnij wybrane ruchy jednym zapisem, bez częściowego stanu przy błędzie IndexedDB. */
export async function undoMovements(ids) {
  const requested = Array.isArray(ids) ? ids : [ids];
  const uniqueIds = [...new Set(requested.filter((id) => id != null).map(String))];
  const toUndo = uniqueIds
    .map((id) => store.moves.find((m) => String(m.id) === id))
    .filter(Boolean);
  if (!toUndo.length) return;

  const nextItems = new Map();
  for (const mv of toUndo) {
    const base = nextItems.get(mv.itemId) || store.items.get(mv.itemId);
    if (!base) continue;
    const stock = Math.max(0, Number(base.stock) || 0);
    const amount = Number(mv.amount) || 0;
    nextItems.set(mv.itemId, {
      ...base,
      stock: Math.max(0, stock - amount),
      updatedAt: Date.now(),
    });
  }

  await db.tx(['inventoryItems', 'inventoryMovements'], (t) => {
    for (const item of nextItems.values()) t.put('inventoryItems', item);
    for (const mv of toUndo) t.delete('inventoryMovements', mv.id);
  });

  for (const [id, next] of nextItems) {
    const current = store.items.get(id);
    if (current) Object.assign(current, next);
    store.items.set(id, current || next);
  }
  const removed = new Set(toUndo.map((m) => String(m.id)));
  store.moves = store.moves.filter((m) => !removed.has(String(m.id)));
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
  let added = 0, created = 0, skipped = 0;

  for (const s of items) {
    const sourceId = s && s.id != null ? String(s.id) : '';
    const name = String(s && s.name || '').trim();
    const unit = s && s.unit;
    const amount = s && s.amount != null && Number(s.amount) > 0
      ? toBase(Number(s.amount), unit)
      : null;

    if (!sourceId || !name || !['g', 'kg', 'ml', 'l', 'szt.'].includes(unit) || !Number.isFinite(amount) || amount <= 0) {
      skipped++;
      continue;
    }

    // Idempotency guard: the receipt marker and stock movement are written together below.
    // Also recognize older receipts that were marked before this atomic flow existed.
    const priorMove = store.moves.find((m) => String(m.sourceShoppingId || '') === sourceId);
    if (s.inventoryReceivedAt || priorMove) {
      if (!s.inventoryReceivedAt && priorMove) {
        const marked = { ...s, inventoryReceivedAt: priorMove.at || Date.now() };
        await db.tx(['shoppingItems'], (t) => t.put('shoppingItems', marked));
        Object.assign(s, marked);
      }
      skipped++;
      continue;
    }

    let item = findItemFor(name);
    const isNew = !item;
    if (!item) item = newItem({ name, unit: baseUnit(unit), stock: 0 });

    const converted = item.unit === baseUnit(unit)
      ? amount
      : (item.unit === 'szt.' ? amount / (pieceGrams(item.name) || 100) : amount * (pieceGrams(name) || 1));
    if (!Number.isFinite(converted) || converted <= 0) {
      skipped++;
      continue;
    }

    const before = Math.max(0, Number(item.stock) || 0);
    const now = Date.now();
    const nextItem = { ...item, stock: before + converted, updatedAt: now };
    const movement = {
      id: uid('mv_'), at: now, cost: 0, reason: 'Kupione (lista zakupów)',
      itemId: nextItem.id, name: nextItem.name, unit: nextItem.unit,
      type: 'purchase', amount: nextItem.stock - before, sourceShoppingId: sourceId,
    };
    const marked = { ...s, inventoryReceivedAt: now };

    // IndexedDB commits stock, movement history and the shopping marker atomically.
    // A reload or retry cannot add the same shopping row a second time.
    await db.tx(['inventoryItems', 'inventoryMovements', 'shoppingItems'], (t) => {
      t.put('inventoryItems', nextItem);
      t.put('inventoryMovements', movement);
      t.put('shoppingItems', marked);
    });

    store.items.set(nextItem.id, nextItem);
    store.moves.unshift(movement);
    Object.assign(s, marked);
    if (isNew) created++;
    added++;
  }

  emit('inventory');
  return { added, created, skipped };
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
