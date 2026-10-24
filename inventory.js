/* ==========================================================================
   inventory.js — magazyn składników, zużycie, straty i skaner EAN.
   Dane pozostają lokalnie w IndexedDB; wyszukiwanie nazwy po EAN jest opcjonalne.
   ========================================================================== */
import { db } from './db.js';
import { uid, norm, fmtAmount, parseNum } from './util.js';
import { getSetting, setSetting } from './recipes.js';
import { addItems } from './shopping.js';
import { decodeEAN13Frame } from './barcode.js';
import { pieceGrams } from './nutrition.js';
import { ingEmoji } from './kitchen.js';
import { h, icon, screen, button, iconBtn, toast, openSheet, confirmDialog, emptyState, textInput, selectEl } from './ui.js';

const CATEGORIES = ['Warzywa i owoce', 'Mięso i ryby', 'Nabiał i jaja', 'Suche i przyprawy', 'Mrożonki', 'Inne'];
const UNITS = ['g', 'kg', 'ml', 'l', 'szt.'];
const WEEK = 7 * 24 * 60 * 60 * 1000;
const money = (n) => (Number.isFinite(n) ? n.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00') + ' zł';
const clean = (s) => norm(String(s || '').replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\b(świeży|świeża|świeże|posiekany|posiekana|posiekane|drobno|starty|starta|starte)\b/g, ' ').replace(/\s+/g, ' ').trim());

function baseAmount(value, unit) {
  const u = norm(unit).replace(/\.$/, '');
  if (['g', 'gram', 'gramy', 'gramów'].includes(u)) return { kind: 'mass', value };
  if (['kg', 'kilogram', 'kilogramy', 'kilogramów'].includes(u)) return { kind: 'mass', value: value * 1000 };
  if (['dag'].includes(u)) return { kind: 'mass', value: value * 10 };
  if (['mg'].includes(u)) return { kind: 'mass', value: value / 1000 };
  if (['ml', 'mililitr', 'mililitry', 'mililitrów'].includes(u)) return { kind: 'volume', value };
  if (['l', 'litr', 'litry', 'litrów'].includes(u)) return { kind: 'volume', value: value * 1000 };
  if (['cl'].includes(u)) return { kind: 'volume', value: value * 10 };
  if (['szt', 'sztuka', 'sztuki', 'sztuk', 'pcs'].includes(u)) return { kind: 'count', value };
  return { kind: u || 'other', value };
}
function fromBase(value, unit) {
  const u = norm(unit).replace(/\.$/, '');
  if (['kg', 'kilogram', 'kilogramy', 'kilogramów'].includes(u)) return value / 1000;
  if (['dag'].includes(u)) return value / 10;
  if (['mg'].includes(u)) return value * 1000;
  if (['l', 'litr', 'litry', 'litrów'].includes(u)) return value / 1000;
  if (['cl'].includes(u)) return value / 10;
  return value;
}
function convert(value, from, to) {
  const a = baseAmount(value, from), b = baseAmount(1, to);
  if (a.kind !== b.kind) return null;
  return fromBase(a.value, to);
}

/** Konwersja ilości do jednostki magazynu; sztuki ↔ masa tylko przy znanej masie sztuki. */
export function convertInventoryAmount(value, from, to, ingredientName) {
  if (!Number.isFinite(Number(value))) return null;
  const exact = convert(Number(value), from, to);
  if (exact != null) return Number.isFinite(exact) ? exact : null;
  const source = baseAmount(Number(value), from), target = baseAmount(1, to);
  if (!((source.kind === 'count' && target.kind === 'mass') || (source.kind === 'mass' && target.kind === 'count'))) return null;
  const grams = pieceGrams(ingredientName);
  if (!Number.isFinite(grams) || grams <= 0) return null;
  if (source.kind === 'count') return fromBase(source.value * grams, to);
  return source.value / grams;
}
function displayQty(n, unit) { return fmtAmount(n) + (unit ? ' ' + unit : ''); }
function inflectionStem(word) {
  const w = norm(word);
  if (w.length < 4) return w;
  // Kilka bardzo częstych składników ma nieregularne rdzenie w polskiej odmianie.
  if (/^ogor(?:ek|ka|ku|ki|kow|kiem)?$/.test(w)) return 'ogor';
  if (w === 'czosnek' || w === 'czosnku') return 'czosn';
  // norm() usuwa polskie znaki, więc "ów" zapisuje się tu jako "ow".
  return w.replace(/(?:owymi|owych|owego|owej|owie|ami|ach|ech|ich|ych|ego|emu|owa|owe|owy|owi|ow|om|em|iej|ej|ie|ku|ek|y|i|e|a|u|o)$/, '') || w;
}

function sameInflectedName(a, b) {
  const left = clean(a).split(' ').filter(Boolean);
  const right = clean(b).split(' ').filter(Boolean);
  if (!left.length || left.length !== right.length) return false;
  return left.every((word, i) => word.length >= 4 && right[i].length >= 4 && inflectionStem(word) === inflectionStem(right[i]));
}

/** Dopasowanie nazwy produktu lub aliasu z uwzględnieniem typowych polskich odmian. */
export function inventoryNamesMatch(item, name) {
  const target = clean(name);
  if (!target) return false;
  const names = [item.name, ...(Array.isArray(item.aliases) ? item.aliases : [])];
  return names.some((value) => {
    const candidate = clean(value);
    return candidate === target || sameInflectedName(candidate, target);
  });
}
/** Status terminu ważności liczony według lokalnej daty, bez przesunięć UTC. */
export function inventoryExpiryStatus(expiryDate, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(expiryDate || ''))) return { status: 'none', days: null };
  const [year, month, day] = String(expiryDate).split('-').map(Number);
  const expiry = new Date(year, month - 1, day);
  if (expiry.getFullYear() !== year || expiry.getMonth() !== month - 1 || expiry.getDate() !== day) return { status: 'none', days: null };
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((expiry.getTime() - today.getTime()) / 86400000);
  return { status: days < 0 ? 'expired' : days === 0 ? 'today' : days <= 3 ? 'soon' : 'ok', days };
}
function expiryText(item, now = new Date()) {
  const info = inventoryExpiryStatus(item.expiryDate, now);
  if (info.status === 'none') return '';
  const date = (() => { const [y, m, d] = item.expiryDate.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('pl-PL'); })();
  if (info.status === 'expired') return 'Po terminie · ' + date;
  if (info.status === 'today') return 'Termin dzisiaj · ' + date;
  if (info.days === 1) return 'Termin jutro · ' + date;
  if (info.status === 'soon') return 'Termin za ' + info.days + ' dni · ' + date;
  return 'Termin: ' + date;
}
function lowStock(item) { return Number(item.minStock || 0) > 0 && Number(item.stock || 0) <= Number(item.minStock || 0); }

async function loadData() {
  const [items, movements, storedLots] = await Promise.all([
    db.getAll('inventoryItems'), db.getAll('inventoryMovements'), db.getAll('inventoryLots'),
  ]);
  // Bezpieczna migracja: dotychczasowy stan staje się jedną partią tylko raz.
  const knownItems = new Set(storedLots.map((lot) => lot.inventoryId));
  const legacyLots = items.filter((item) => !knownItems.has(item.id) && Number(item.stock || 0) > 0).map((item) => ({
    id: uid('lot_'), inventoryId: item.id, name: item.name, quantity: Number(item.stock || 0),
    unit: item.unit || 'kg', expiryDate: item.expiryDate || '', receivedAt: item.createdAt || Date.now(),
    unitPrice: Number(item.pricePerUnit || 0), createdAt: Date.now(), legacy: true,
  }));
  if (legacyLots.length) await db.putMany('inventoryLots', legacyLots);
  const lots = [...storedLots, ...legacyLots];
  return {
    items: items.sort((a, b) => String(a.name).localeCompare(String(b.name), 'pl')),
    movements: movements.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    lots: lots.sort((a, b) => (a.expiryDate || '9999-12-31').localeCompare(b.expiryDate || '9999-12-31') || (a.receivedAt || 0) - (b.receivedAt || 0)),
  };
}
function consumeFromLots(item, lots, amount) {
  let remaining = Math.max(0, Number(amount) || 0);
  const eligible = lots.filter((lot) => lot.inventoryId === item.id && Number(lot.quantity || 0) > 0)
    .sort((a, b) => (a.expiryDate || '9999-12-31').localeCompare(b.expiryDate || '9999-12-31') || (a.receivedAt || 0) - (b.receivedAt || 0));
  const allocations = [];
  let cost = 0;
  for (const lot of eligible) {
    if (remaining <= 0.000001) break;
    const take = Math.min(Number(lot.quantity), remaining);
    lot.quantity = Math.round((Number(lot.quantity) - take) * 10000) / 10000;
    lot.updatedAt = Date.now();
    remaining = Math.round((remaining - take) * 10000) / 10000;
    allocations.push({ lotId: lot.id, amount: take });
    cost += take * Number(lot.unitPrice ?? item.pricePerUnit ?? 0);
  }
  return { allocations, shortage: remaining, cost };
}
function addStockLot(item, quantity, options = {}) {
  return {
    id: uid('lot_'), inventoryId: item.id, name: item.name, quantity: Number(quantity), unit: item.unit,
    expiryDate: options.expiryDate || '', receivedAt: options.receivedAt || Date.now(),
    unitPrice: options.unitPrice == null ? Number(item.pricePerUnit || 0) : Number(options.unitPrice),
    createdAt: Date.now(),
  };
}

export async function deductRecipeIngredients(recipe, factor = 1) {
  factor = Number(factor);
  if (!Number.isFinite(factor) || factor <= 0) throw new Error('Nieprawidłowa skala receptury.');
  const { items, lots } = await loadData();
  const changed = [], movements = [], missing = [];
  const ingredients = (recipe.sections || []).flatMap((s) => s.ingredients || []);
  for (const ing of ingredients) {
    if (!ing.name || !Number.isFinite(Number(ing.amount)) || ing.amount == null || Number(ing.amount) <= 0) continue;
    const item = items.find((x) => inventoryNamesMatch(x, ing.name));
    if (!item) { missing.push(ing.name); continue; }
    const amount = convertInventoryAmount(Number(ing.amount) * factor, ing.unit, item.unit, ing.name);
    if (amount == null) { missing.push(ing.name + ' (inna jednostka)'); continue; }
    const allocation = consumeFromLots(item, lots, amount);
    item.stock = Math.round((Number(item.stock || 0) - amount) * 10000) / 10000;
    item.updatedAt = Date.now();
    changed.push(item);
    movements.push({
      id: uid('mov_'), inventoryId: item.id, name: item.name, type: 'cook',
      amount: -amount, unit: item.unit, cost: allocation.cost + allocation.shortage * Number(item.pricePerUnit || 0),
      allocations: allocation.allocations, shortage: allocation.shortage,
      reason: recipe.name || 'Gotowanie', recipeId: recipe.id || '', createdAt: Date.now() + movements.length,
    });
  }
  if (changed.length) await db.putMany('inventoryItems', changed);
  if (lots.length) await db.putMany('inventoryLots', lots);
  if (movements.length) await db.putMany('inventoryMovements', movements);
  return { deducted: changed.length, missing: [...new Set(missing)], low: changed.filter(lowStock).map((x) => x.name) };
}

export function inventoryView() {
  let active = true;
  let data = { items: [], movements: [], lots: [] };
  const right = h('div', { class: 'row gap inventory-head-actions' },
    iconBtn('scan', 'Skanuj kod EAN', openScanner),
    iconBtn('plus', 'Dodaj produkt do magazynu', () => openItemSheet()));
  const s = screen({ title: 'Magazyn', right, cls: 'inventory' });
  const c = s.content;
  let selectedCategory = 'Wszystkie';
  const searchIn = textInput({ label: 'Szukaj w magazynie', placeholder: 'Szukaj w magazynie…' });
  searchIn.addEventListener('input', paint);
  const searchBar = h('div', { class: 'inventory-search' }, icon('search', 18), searchIn);
  const filterRow = h('div', { class: 'inventory-filters', role: 'group', 'aria-label': 'Kategorie magazynu' });
  const filterButtons = ['Wszystkie', ...CATEGORIES].map((label) => button(label, { kind: 'ghost', onClick: () => { selectedCategory = label; paint(); } }));
  filterRow.replaceChildren(...filterButtons);
  const content = h('div', { class: 'inventory-content' });
  c.replaceChildren(searchBar, filterRow, content);

  async function reload() {
    try { data = await loadData(); if (active) paint(); }
    catch (e) { toast('Nie udało się odczytać magazynu: ' + (e.message || 'błąd'), { type: 'error' }); }
  }
  function lowItems() { return data.items.filter(lowStock); }
  function weeklyWaste() {
    const from = Date.now() - WEEK;
    return data.movements.filter((m) => m.type === 'waste' && (m.createdAt || 0) >= from).reduce((n, m) => n + Number(m.cost || 0), 0);
  }

  async function saveItem(item) {
    const previous = data.items.find((x) => x.id === item.id);
    if (previous) {
      const delta = Math.round((Number(item.stock || 0) - Number(previous.stock || 0)) * 10000) / 10000;
      if (delta > 0) await db.put('inventoryLots', addStockLot(item, delta, { expiryDate: item.expiryDate || '' }));
      else if (delta < 0) {
        const { lots } = await loadData();
        consumeFromLots(previous, lots, Math.abs(delta));
        if (lots.length) await db.putMany('inventoryLots', lots);
      }
      if (item.expiryDate !== previous.expiryDate) {
        const { lots } = await loadData();
        const legacy = lots.filter((lot) => lot.inventoryId === item.id && lot.legacy);
        legacy.forEach((lot) => { lot.expiryDate = item.expiryDate || ''; lot.updatedAt = Date.now(); });
        if (legacy.length) await db.putMany('inventoryLots', legacy);
      }
    }
    await db.put('inventoryItems', item);
    await reload();
    if (getSetting('inventoryLowAlerts') !== false && lowStock(item)) toast('Niski stan: ' + item.name, { type: 'error' });
  }
  async function adjust(item, delta) {
    const next = { ...item, stock: Math.round((Number(item.stock || 0) + delta) * 10000) / 10000, updatedAt: Date.now() };
    let movementCost = delta * Number(item.pricePerUnit || 0);
    if (delta > 0) await db.put('inventoryLots', addStockLot(next, delta));
    else {
      const { lots } = await loadData();
      const allocation = consumeFromLots(item, lots, Math.abs(delta));
      movementCost = -(allocation.cost + allocation.shortage * Number(item.pricePerUnit || 0));
      if (lots.length) await db.putMany('inventoryLots', lots);
    }
    await db.put('inventoryItems', next);
    await db.put('inventoryMovements', {
      id: uid('mov_'), inventoryId: item.id, name: item.name, type: 'adjustment',
      amount: delta, unit: item.unit, cost: movementCost,
      reason: delta > 0 ? 'Ręczne dodanie' : 'Ręczne odjęcie', createdAt: Date.now(),
    });
    await reload();
    if (getSetting('inventoryLowAlerts') !== false && lowStock(next)) toast('Niski stan: ' + next.name, { type: 'error' });
  }

  function openItemSheet(existing = null, prefill = {}) {
    const old = existing || {};
    const name = textInput({ value: prefill.name || old.name || '', label: 'Nazwa produktu', placeholder: 'Np. Mąka pszenna' });
    const category = selectEl(CATEGORIES.map((x) => [x, x]), old.category || 'Inne', null, { label: 'Kategoria' });
    const stock = textInput({ value: String(old.stock ?? 0), label: 'Aktualny stan', inputmode: 'decimal' });
    const unit = selectEl(UNITS.map((x) => [x, x]), old.unit || 'kg', null, { label: 'Jednostka stanu' });
    const minimum = textInput({ value: String(old.minStock ?? 0), label: 'Próg niskiego stanu', inputmode: 'decimal' });
    const price = textInput({ value: String(old.pricePerUnit ?? ''), label: 'Cena za jednostkę (zł)', inputmode: 'decimal', placeholder: 'Opcjonalnie' });
    const barcode = textInput({ value: prefill.barcode || old.barcode || '', label: 'Kod EAN', inputmode: 'numeric', placeholder: 'Opcjonalnie' });
    const aliases = textInput({ value: (old.aliases || []).join(', '), label: 'Nazwy alternatywne', placeholder: 'Oddziel przecinkami' });
    const expiry = h('input', { type: 'date', class: 'input', value: old.expiryDate || '', 'aria-label': 'Termin przydatności (cały wpis)' });
    const body = h('div', { class: 'stack inventory-edit-form' },
      fieldLabel('Nazwa produktu', name), fieldLabel('Kategoria', category),
      h('div', { class: 'grid two' }, fieldLabel('Stan', stock), fieldLabel('Jednostka', unit)),
      h('div', { class: 'grid two' }, fieldLabel('Próg niskiego stanu', minimum), fieldLabel('Cena za jednostkę', price)),
      fieldLabel('Termin dla stanu początkowego', expiry),
      fieldLabel('Kod EAN', barcode), fieldLabel('Nazwy alternatywne', aliases),
      h('p', { class: 'muted small' }, 'Termin przy pozycji dotyczy stanu początkowego/partii legacy. Nowe dostawy dodawaj jako osobne partie, każda z własnym terminem. Nazwy alternatywne pomagają dopasować składniki z receptur.'));
    const sh = openSheet({
      title: old.id ? 'Edytuj produkt' : 'Dodaj do magazynu', variant: 'sheet', body,
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Zapisz', kind: 'primary', onClick: async () => {
          const n = name.value.trim();
          if (!n) { name.focus(); toast('Wpisz nazwę produktu', { type: 'error' }); return false; }
          const stockVal = parseNum(stock.value), minVal = parseNum(minimum.value), priceVal = parseNum(price.value);
          const item = {
            id: old.id || uid('inv_'), name: n, category: category.value || 'Inne',
            stock: stockVal == null ? 0 : stockVal, unit: unit.value || 'kg',
            minStock: minVal == null ? 0 : minVal, pricePerUnit: priceVal == null ? 0 : priceVal,
            barcode: barcode.value.trim(), aliases: aliases.value.split(',').map((x) => x.trim()).filter(Boolean),
            expiryDate: expiry.value || '',
            updatedAt: Date.now(), createdAt: old.createdAt || Date.now(),
          };
          await saveItem(item); toast('Zapisano: ' + n); return true;
        } },
      ],
    });
    return sh;
  }
  function openBatchSheet(item) {
    const quantity = textInput({ value: '1', label: 'Ilość przyjęta (' + item.unit + ')', inputmode: 'decimal' });
    const expiry = h('input', { type: 'date', class: 'input', value: '', 'aria-label': 'Termin przydatności partii' });
    const received = h('input', { type: 'date', class: 'input', value: new Date().getFullYear() + '-' + String(new Date().getMonth()+1).padStart(2,'0') + '-' + String(new Date().getDate()).padStart(2,'0'), 'aria-label': 'Data przyjęcia partii' });
    const price = textInput({ value: String(item.pricePerUnit || ''), label: 'Cena za jednostkę (zł)', inputmode: 'decimal', placeholder: 'Opcjonalnie' });
    return openSheet({
      title: 'Nowa partia · ' + item.name, variant: 'sheet',
      body: h('div', { class: 'stack inventory-edit-form' },
        h('p', { class: 'muted small' }, 'Stan partii jest prowadzony osobno. Przy gotowaniu Żarłok zużywa najpierw partie z najbliższym terminem (FEFO), a potem starsze partie (FIFO).'),
        fieldLabel('Ilość (' + item.unit + ')', quantity),
        fieldLabel('Termin przydatności partii', expiry),
        fieldLabel('Data przyjęcia', received),
        fieldLabel('Cena za jednostkę (zł)', price)),
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Przyjmij partię', kind: 'primary', onClick: async () => {
          const qty = parseNum(quantity.value), priceVal = parseNum(price.value);
          if (qty == null || qty <= 0) { quantity.focus(); toast('Podaj ilość większą od zera', { type: 'error' }); return false; }
          const parts = String(received.value || '').split('-').map(Number);
          const receivedAt = parts.length === 3 ? new Date(parts[0], parts[1]-1, parts[2]).getTime() : Date.now();
          const lot = addStockLot(item, qty, { expiryDate: expiry.value, receivedAt, unitPrice: priceVal == null ? item.pricePerUnit : priceVal });
          const next = { ...item, stock: Math.round((Number(item.stock || 0) + qty) * 10000) / 10000, updatedAt: Date.now() };
          await db.put('inventoryLots', lot);
          await db.put('inventoryItems', next);
          await db.put('inventoryMovements', { id: uid('mov_'), inventoryId: item.id, lotId: lot.id, name: item.name, type: 'receive', amount: qty, unit: item.unit, cost: qty * Number(lot.unitPrice || 0), reason: 'Przyjęcie partii', createdAt: Date.now() });
          await reload(); toast('Przyjęto partię: ' + item.name); return true;
        } },
      ],
    });
  }

  function fieldLabel(label, control) { return h('label', { class: 'field' }, h('span', { class: 'field-label' }, label), control); }

  async function recordWaste(item) {
    const amount = textInput({ value: '1', label: 'Ilość straty', inputmode: 'decimal' });
    const reason = selectEl([['Przeterminowane', 'Przeterminowane'], ['Zepsute', 'Zepsute'], ['Błąd produkcji', 'Błąd produkcji'], ['Nadprodukcja', 'Nadprodukcja'], ['Inne', 'Inne']], 'Zepsute', null, { label: 'Powód' });
    const sh = openSheet({
      title: 'Zarejestruj stratę', variant: 'center',
      body: h('div', { class: 'stack' },
        h('p', null, item.name + ' · stan: ' + displayQty(item.stock, item.unit)),
        fieldLabel('Ilość straty (' + item.unit + ')', amount), fieldLabel('Powód', reason)),
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Zapisz stratę', kind: 'danger', onClick: async () => {
          const n = parseNum(amount.value);
          if (n == null || n <= 0) { toast('Podaj ilość większą od zera', { type: 'error' }); return false; }
          const next = { ...item, stock: Math.round((Number(item.stock || 0) - n) * 10000) / 10000, updatedAt: Date.now() };
          const { lots } = await loadData(); const allocation = consumeFromLots(item, lots, n); if (lots.length) await db.putMany('inventoryLots', lots);
          const wasteCost = allocation.cost + allocation.shortage * Number(item.pricePerUnit || 0);
          await db.put('inventoryItems', next);
          await db.put('inventoryMovements', {
            id: uid('wst_'), inventoryId: item.id, name: item.name, type: 'waste', amount: -n, unit: item.unit,
            cost: wasteCost, allocations: allocation.allocations, shortage: allocation.shortage, reason: reason.value, createdAt: Date.now(),
          });
          await reload();
          toast('Zapisano stratę: ' + money(wasteCost));
          return true;
        } },
      ],
    });
    return sh;
  }

  async function deleteItem(item) {
    if (!await confirmDialog({ title: 'Usunąć z magazynu?', message: item.name + ' zostanie usunięty z listy stanów. Historia strat pozostanie.', confirmText: 'Usuń', danger: true })) return;
    const lots = data.lots.filter((lot) => lot.inventoryId === item.id);
    if (lots.length) await db.tx(['inventoryItems', 'inventoryLots'], (t) => { t.delete('inventoryItems', item.id); lots.forEach((lot) => t.delete('inventoryLots', lot.id)); });
    else await db.delete('inventoryItems', item.id);
    await reload();
    toast('Usunięto z magazynu');
  }

  async function addLowToShopping() {
    const low = lowItems().filter((x) => Number(x.minStock || 0) > Number(x.stock || 0));
    if (!low.length) { toast('Nie ma braków do dodania'); return; }
    await addItems(low.map((x) => ({ name: x.name, amount: Math.max(0, Number(x.minStock) - Number(x.stock)), unit: x.unit })));
    toast('Dodano braki do listy zakupów');
  }

  async function lookupBarcode(code) {
    if (!navigator.onLine) return {};
    try {
      const res = await fetch('https://world.openfoodfacts.org/api/v2/product/' + encodeURIComponent(code) + '.json', { headers: { Accept: 'application/json' } });
      if (!res.ok) return {};
      const payload = await res.json();
      const p = payload && payload.product;
      if (payload.status !== 1 || !p) return {};
      return { name: p.product_name_pl || p.product_name || p.product_name_en || '' };
    } catch (_) { return {}; }
  }

  async function openScanner() {
    let active = true, accepting = false, stream = null, torch = false;
    const video = h('video', { class: 'scanner-video', autoplay: true, playsinline: true, muted: true });
    const code = textInput({ label: 'Kod EAN', placeholder: 'Zeskanuj lub wpisz kod', inputmode: 'numeric' });
    const status = h('p', { class: 'scanner-status muted', 'aria-live': 'polite' }, 'Uruchamiam kamerę…');
    const torchBtn = button('Latarka', { kind: 'ghost', icon: 'flashlight', onClick: async () => {
      const track = stream && stream.getVideoTracks()[0];
      if (!track || torchBtn.disabled || !active) return;
      const nextTorch = !torch;
      try {
        await track.applyConstraints({ advanced: [{ torch: nextTorch }] });
        if (!active) return;
        torch = nextTorch;
        // The shared button helper keeps its SVG icon next to a text span.
        // Updating textContent on the button would delete that icon.
        const label = torchBtn.querySelector('span');
        if (label) label.textContent = torch ? 'Wyłącz latarkę' : 'Latarka';
      } catch (_) {
        if (active) toast('Latarka nie jest obsługiwana przez tę kamerę');
      }
    } });
    const stopCamera = () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      stream = null;
      video.srcObject = null;
    };
    const stop = () => {
      active = false;
      stopCamera();
    };
    const acceptCode = async (raw) => {
      if (!active || accepting) return false;
      const value = String(raw || '').replace(/\D/g, '');
      if (!/^\d{8}$|^\d{12,14}$/.test(value)) {
        toast('Wpisz prawidłowy kod EAN/UPC', { type: 'error' });
        return false;
      }
      accepting = true;
      active = false;
      stopCamera();
      sh.close('scan');
      const found = await lookupBarcode(value);
      openItemSheet(null, { barcode: value, name: found.name || '' });
      return true;
    };
    const sh = openSheet({
      title: 'Skaner kodów EAN', variant: 'sheet',
      body: h('div', { class: 'stack scanner-shell' },
        h('div', { class: 'scanner-frame' }, video, h('span', { class: 'scanner-line', 'aria-hidden': 'true' })),
        status, torchBtn, fieldLabel('Kod produktu', code),
        h('p', { class: 'muted small' }, 'Jeśli Safari nie udostępnia automatycznego dekodowania, wpisz kod ręcznie. Po połączeniu z internetem spróbujemy rozpoznać nazwę produktu.')),
      actions: [
        { label: 'Użyj kodu', kind: 'primary', onClick: () => acceptCode(code.value) },
        { label: 'Zamknij', kind: 'ghost' },
      ],
      onClose: stop,
    });
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('Brak dostępu do kamery w tej przeglądarce.');
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 }, height: { ideal: 720 },
          frameRate: { ideal: 30, max: 30 },
        },
        audio: false,
      });
      if (!active) { stopCamera(); return; }
      video.srcObject = stream;
      await video.play();
      if (!active) { stopCamera(); return; }
      const frame = video.closest('.scanner-frame');
      if (frame && video.videoWidth && video.videoHeight) frame.style.aspectRatio = video.videoWidth + ' / ' + video.videoHeight;
      status.textContent = 'Szukam kodu w całym kadrze — możesz obrócić produkt lub telefon.';
      const track = stream.getVideoTracks()[0];
      let caps = {};
      try { caps = track && track.getCapabilities ? track.getCapabilities() : {}; } catch (_) {}
      torchBtn.disabled = !(caps && caps.torch);
      // Keep the camera continuously focused when the device exposes that control.
      if (track && Array.isArray(caps.focusMode) && caps.focusMode.includes('continuous')) {
        try { await track.applyConstraints({ advanced: [{ focusMode: 'continuous' }] }); } catch (_) {}
      }
      let detector = null;
      if (typeof window.BarcodeDetector === 'function') {
        try { detector = new window.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] }); } catch (_) { detector = null; }
      }
      const canvas = document.createElement('canvas');
      let lastScanAt = 0;
      let nativeFrameCount = 0;
      let nativeRequestId = 0;
      let nativePendingId = 0;
      let nativeResult = null;

      status.textContent = detector
        ? 'Skanuję automatycznie w całym kadrze — nie musisz celować w linię.'
        : 'Skanuję lokalnie w wielu kierunkach — obróć produkt, jeśli trzeba.';

      const startNativeDetection = () => {
        if (!active || !detector || nativePendingId) return;
        const requestId = ++nativeRequestId;
        nativePendingId = requestId;
        // Do not await detect(video): one slow WebKit detector must never freeze
        // the scan loop or prevent the local decoder from checking later frames.
        try {
          Promise.resolve(detector.detect(video)).then((codes) => {
            if (active && nativePendingId === requestId) nativeResult = { requestId, codes };
          }, () => {
            if (active && nativePendingId === requestId) nativeResult = { requestId, error: true };
          });
        } catch (_) {
          nativeResult = { requestId, error: true };
        }
      };

      const scheduleScan = () => {
        if (!active) return;
        // Use actual camera-frame callbacks when available; RAF is the Safari fallback.
        if (typeof video.requestVideoFrameCallback === 'function') {
          video.requestVideoFrameCallback(() => { void scanFrame(); });
        } else {
          requestAnimationFrame(() => { void scanFrame(); });
        }
      };

      const scanFrame = async () => {
        if (!active) return;
        try {
          if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
            const now = performance.now ? performance.now() : Date.now();
            if (now - lastScanAt >= (detector ? 75 : 90)) {
              lastScanAt = now;
              let raw = '';
              let fallbackDue = !detector;

              if (detector) {
                if (nativeResult && nativeResult.requestId === nativePendingId) {
                  const result = nativeResult;
                  nativeResult = null;
                  nativePendingId = 0;
                  if (result.error) {
                    detector = null;
                    fallbackDue = true;
                  } else {
                    const hit = (result.codes || []).find((item) => /^(?:\d{8}|\d{12,14})$/.test(String(item && item.rawValue || '').replace(/\D/g, '')));
                    raw = hit ? String(hit.rawValue).replace(/\D/g, '') : '';
                    nativeFrameCount++;
                    // Native detection remains the fast path; local decoding runs
                    // on alternating misses and immediately if native detection stalls.
                    fallbackDue = !raw && nativeFrameCount % 2 === 0;
                  }
                } else if (nativePendingId) {
                  fallbackDue = true;
                }

                // Keep one native task in flight at most. A new request is started
                // after the previous result is collected, never on top of a slow one.
                if (detector && !nativePendingId) startNativeDetection();
              }

              if (!active) return;
              if (!raw && fallbackDue) raw = decodeEAN13Frame(video, canvas) || '';
              if (!active) return;
              if (raw) {
                await acceptCode(raw);
                return;
              }
            }
          }
        } catch (_) {
          // Skip this frame (blur, glare or unsupported camera pixel format) and keep scanning.
        }
        scheduleScan();
      };
      scheduleScan();
    } catch (e) {
      if (!active) { stopCamera(); return; }
      // Camera startup can fail after getUserMedia has returned a stream. Stop it
      // cleanly, but keep the sheet active so manual barcode entry still works.
      stopCamera();
      status.textContent = 'Nie udało się uruchomić kamery. Możesz wpisać EAN ręcznie.';
      toast(e.message || 'Nie udało się uruchomić kamery', { type: 'error' });
    }
  }

  function itemCard(item) {
    const low = lowStock(item);
    const itemLots = data.lots.filter((lot) => lot.inventoryId === item.id).sort((a, b) => (a.expiryDate || '9999-12-31').localeCompare(b.expiryDate || '9999-12-31') || (a.receivedAt || 0) - (b.receivedAt || 0));
    const datedLots = itemLots.filter((lot) => Number(lot.quantity || 0) > 0 && lot.expiryDate);
    const expiryLot = datedLots[0];
    const expiry = inventoryExpiryStatus(expiryLot ? expiryLot.expiryDate : (itemLots.length ? '' : item.expiryDate));
    const expiryClass = expiry.status === 'expired' ? ' is-expired' : ['today', 'soon'].includes(expiry.status) ? ' is-expiring' : '';
    const expiryLabel = expiryText(expiryLot || item);
    return h('article', { class: 'inventory-item' + (low ? ' is-low' : '') + expiryClass },
      h('div', { class: 'inventory-item-main' },
        h('div', { class: 'inventory-item-title' }, h('span', { class: 'inventory-item-glyph', 'aria-hidden': 'true' }, ingEmoji(item.name)), h('strong', null, item.name), low ? h('span', { class: 'inventory-low-badge' }, 'Niski stan') : null,
          expiry.status === 'expired' ? h('span', { class: 'inventory-expiry-badge is-expired' }, 'Po terminie') : ['today', 'soon'].includes(expiry.status) ? h('span', { class: 'inventory-expiry-badge is-expiring' }, expiry.status === 'today' ? 'Termin dziś' : 'Termin blisko') : null),
        h('p', { class: 'muted small' }, [item.category || 'Inne', item.barcode ? 'EAN ' + item.barcode : ''].filter(Boolean).join(' · ')),
        expiryLabel ? h('p', { class: 'inventory-expiry-text' }, icon('calendar-clock', 14), expiryLabel) : null,
        itemLots.length ? h('div', { class: 'inventory-lots-mini' },
          h('div', { class: 'row between' }, h('span', { class: 'muted small' }, 'Partie: ' + itemLots.filter((lot) => Number(lot.quantity || 0) > 0).length), h('span', { class: 'muted small' }, 'FEFO')),
          itemLots.filter((lot) => Number(lot.quantity || 0) > 0).slice(0, 2).map((lot) => h('div', { class: 'inventory-lot-mini' },
            h('span', null, lot.expiryDate ? expiryText({ expiryDate: lot.expiryDate }) : 'Bez terminu'),
            h('strong', null, displayQty(lot.quantity, lot.unit || item.unit))))) : null,
        item.pricePerUnit ? h('p', { class: 'muted small' }, money(item.pricePerUnit) + ' / ' + item.unit) : null),
      h('div', { class: 'inventory-stock' },
        h('strong', null, displayQty(item.stock, item.unit)),
        h('span', { class: 'muted small' }, 'minimum ' + displayQty(item.minStock || 0, item.unit))),
      h('div', { class: 'inventory-item-actions' },
        iconBtn('minus', 'Odejmij 1 ' + item.unit, () => adjust(item, -1), 'quiet'),
        iconBtn('plus', 'Dodaj 1 ' + item.unit, () => adjust(item, 1), 'quiet'),
        iconBtn('trash', 'Zarejestruj stratę: ' + item.name, () => recordWaste(item), 'quiet'),
        iconBtn('plus-circle', 'Dodaj partię: ' + item.name, () => openBatchSheet(item), 'quiet'),
        iconBtn('edit', 'Edytuj: ' + item.name, () => openItemSheet(item), 'quiet'),
        iconBtn('x', 'Usuń produkt: ' + item.name, () => deleteItem(item), 'quiet')));
  }

  function paint() {
    const low = lowItems();
    const expiring = data.lots.filter((lot) => Number(lot.quantity || 0) > 0 && ['today', 'soon'].includes(inventoryExpiryStatus(lot.expiryDate).status));
    const expired = data.lots.filter((lot) => Number(lot.quantity || 0) > 0 && inventoryExpiryStatus(lot.expiryDate).status === 'expired');
    const query = clean(searchIn.value);
    const filteredItems = data.items.filter((item) => (selectedCategory === 'Wszystkie' || (item.category || 'Inne') === selectedCategory) && (!query || clean([item.name, ...(item.aliases || []), item.barcode].join(' ')).includes(query)));
    filterButtons.forEach((b, i) => { b.classList.toggle('on', ['Wszystkie', ...CATEGORIES][i] === selectedCategory); });
    const from = Date.now() - WEEK;
    const recentWaste = data.movements.filter((m) => m.type === 'waste' && (m.createdAt || 0) >= from).slice(0, 5);
    const alertsOn = getSetting('inventoryLowAlerts') !== false;
    const summary = h('div', { class: 'inventory-summary' },
      summaryCard('Produkty', String(data.items.length), 'inventory-stat-products'),
      summaryCard('Niski stan', String(low.length), low.length ? 'inventory-stat-low' : 'inventory-stat-ok'),
      summaryCard('Partie po terminie', String(expired.length), expired.length ? 'inventory-stat-expired' : 'inventory-stat-ok'),
      summaryCard('Partie ≤ 3 dni', String(expiring.length), expiring.length ? 'inventory-stat-expiring' : 'inventory-stat-ok'),
      summaryCard('Straty · 7 dni', money(weeklyWaste()), 'inventory-stat-waste'));
    const alertToggle = button('Alerty niskiego stanu: ' + (alertsOn ? 'włączone' : 'wyłączone'), {
      kind: 'ghost', block: true, icon: 'bell', onClick: async () => { await setSetting('inventoryLowAlerts', !alertsOn); paint(); },
    });
    const kids = [summary, alertToggle];
    if (expired.length || expiring.length) {
      const urgent = [...expired, ...expiring].sort((a, b) => {
        const da = inventoryExpiryStatus(a.expiryDate).days ?? 99999;
        const db = inventoryExpiryStatus(b.expiryDate).days ?? 99999;
        return da - db;
      });
      kids.push(h('section', { class: 'inventory-expiry-panel card stack' },
        h('div', { class: 'row between' }, h('h2', { class: 'card-title' }, icon('calendar-clock', 20), 'Terminy do sprawdzenia'), h('span', { class: 'pill' }, String(urgent.length))),
        h('p', { class: 'muted small' }, 'Sprawdź konkretne partie przed użyciem. Przy gotowaniu zużywana jest najpierw partia z najbliższym terminem.'),
        urgent.slice(0, 8).map((lot) => {
          const item = data.items.find((x) => x.id === lot.inventoryId);
          return h('div', { class: 'inventory-expiry-row' },
            h('span', { class: 'inventory-expiry-dot ' + (inventoryExpiryStatus(lot.expiryDate).status === 'expired' ? 'is-expired' : 'is-expiring') }),
            h('div', { class: 'grow' }, h('strong', null, item ? item.name : lot.name), h('p', { class: 'muted small' }, expiryText({ expiryDate: lot.expiryDate }))),
            h('strong', { class: 'num' }, displayQty(lot.quantity, lot.unit)));
        })));
    }
    if (low.length) {
      kids.push(h('section', { class: 'inventory-low-panel card stack' },
        h('div', { class: 'row between' }, h('h2', { class: 'card-title' }, icon('alert', 20), 'Do uzupełnienia'), h('span', { class: 'pill' }, String(low.length))),
        h('p', { class: 'muted small' }, 'Pozycje poniżej ustawionego minimum. Możesz dodać brakujące ilości do listy zakupów.'),
        button('Dodaj braki do zakupów', { kind: 'primary', block: true, icon: 'cart', onClick: addLowToShopping })));
    }
    if (!data.items.length) {
      kids.push(emptyState('📦', 'Magazyn jest pusty', 'Dodaj produkty, ustaw jednostkę i minimum. Żarłok może potem odliczać składniki po zakończeniu gotowania.',
        button('Dodaj pierwszy produkt', { kind: 'primary', icon: 'plus', onClick: () => openItemSheet() }),
        button('Skanuj kod EAN', { icon: 'scan', onClick: openScanner })));
    } else if (!filteredItems.length) {
      kids.push(emptyState('🔎', 'Brak wyników', 'Zmień frazę albo kategorię magazynu.'));
    } else {
      const groups = new Map();
      filteredItems.forEach((item) => { const key = item.category || 'Inne'; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(item); });
      [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0], 'pl')).forEach(([label, items]) => {
        kids.push(h('section', { class: 'inventory-group card stack' },
          h('div', { class: 'row between' }, h('h2', { class: 'card-title' }, label), h('span', { class: 'pill' }, String(items.length))),
          h('div', { class: 'inventory-items' }, items.map(itemCard))));
      });
    }
    if (recentWaste.length) {
      kids.push(h('section', { class: 'inventory-group card stack' },
        h('h2', { class: 'card-title' }, 'Ostatnie straty'),
        recentWaste.map((m) => h('div', { class: 'inventory-movement' },
          h('div', null, h('strong', null, m.name), h('p', { class: 'muted small' }, (m.reason || 'Strata') + ' · ' + new Date(m.createdAt).toLocaleDateString('pl-PL'))),
          h('div', { class: 'inventory-movement-cost' }, h('strong', null, money(m.cost)), h('span', { class: 'muted small' }, displayQty(Math.abs(m.amount), m.unit)))))));
    }
    content.replaceChildren(...kids);
  }
  function summaryCard(label, value, cls) {
    return h('div', { class: 'inventory-summary-card ' + cls }, h('span', { class: 'muted small' }, label), h('strong', null, value));
  }

  void reload();
  return { el: s.el, destroy: () => { active = false; } };
}
