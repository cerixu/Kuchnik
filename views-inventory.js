/* Magazyn Kuchnika — stany, alerty, straty i przekazanie braków do zakupów. */
import { h, icon, screen, button, iconBtn, toast, openSheet, textInput, numInput, selectEl, field, textArea, switchEl, emptyState } from './ui.js';
import { navigate } from './router.js';
import { subscribe, getSetting, setSetting } from './recipes.js';
import {
  INV_CATS, LOCATIONS, locName, loadInventory, inventoryItems, inventorySummary,
  newItem, saveItem, deleteItem, changeStock, recordWaste, fmtStock, stockValue,
  unitCost, isLow, isSoon, isExpired, isOut, restockList, toBase, baseUnit,
} from './inventory.js';
import { addItems } from './shopping.js';
import { fmtNum, norm } from './util.js';

const money = (v) => fmtNum(v || 0, 2) + ' zł';
const unitOptions = [['g','g'], ['kg','kg'], ['ml','ml'], ['l','l'], ['szt.','szt.']];
const reasonOptions = [['Zepsute','Zepsute'], ['Po terminie','Po terminie'], ['Błąd produkcji','Błąd produkcji'], ['Zwrot / reklamacja','Zwrot / reklamacja'], ['Inne','Inne']];

export function inventoryView() {
  const s = screen({
    title: 'Magazyn',
    left: iconBtn('left', 'Wstecz', () => navigate('/')),
    right: iconBtn('plus', 'Dodaj produkt do magazynu', () => openItemSheet()),
    cls: 'inventory-screen',
  });
  let query = '';
  const summaryEl = h('div', { class: 'inventory-summary grid-3' });
  const search = textInput({ label: 'Szukaj w magazynie', placeholder: 'Produkt, kategoria lub kod EAN…', onInput: (v) => { query = v; paint(); } });
  const listEl = h('div', { class: 'inventory-items' });
  const alertsEl = h('div', { class: 'inventory-alerts stack' });
  const wasteEl = h('div', { class: 'inventory-waste card stack' });
  const alertSwitch = switchEl(getSetting('invAlerts') !== false, async (value) => {
    await setSetting('invAlerts', value);
    paint();
  }, 'Alerty magazynu', 'Niski stan i terminy przydatności');
  const actions = h('div', { class: 'row wrap inventory-head-actions' },
    button('Dodaj produkt do magazynu', { icon: 'plus', kind: 'primary', onClick: () => openItemSheet() }),
    button('Dodaj braki do zakupów', { icon: 'cart', onClick: addShortages }));
  const top = h('div', { class: 'inventory-top stack' },
    h('div', { class: 'inventory-intro' },
      h('p', { class: 'eyebrow' }, 'KONTROLA ZAPASÓW'),
      h('p', { class: 'muted' }, 'Stany, terminy, straty i składniki potrzebne do produkcji. Dane zostają na tym urządzeniu.')),
    actions, summaryEl, alertSwitch, alertsEl,
    h('label', { class: 'field' }, h('span', { class: 'field-label' }, 'Szukaj w magazynie'), search),
    h('h2', { class: 'section-title' }, 'Produkty'),
    listEl, wasteEl);
  s.content.append(top);

  async function addShortages() {
    const items = restockList();
    if (!items.length) { toast('Brak produktów poniżej progu minimalnego'); return; }
    const result = await addItems(items);
    toast(`Dodano do zakupów: ${result.count}`, { action: { label: 'Pokaż', fn: () => navigate('/shopping') } });
  }

  function openItemSheet(existing = null) {
    const item = existing ? { ...existing, aliases: [...(existing.aliases || [])] } : newItem();
    let unit = item.unit === 'g' ? (item.stock >= 1000 ? 'kg' : 'g') : item.unit === 'ml' ? (item.stock >= 1000 ? 'l' : 'ml') : 'szt.';
    const shown = (amount) => unit === 'kg' || unit === 'l' ? amount / 1000 : amount;
    const name = textInput({ value: item.name, label: 'Nazwa produktu', placeholder: 'Np. mąka pszenna' });
    const stock = numInput({ value: shown(item.stock), label: 'Aktualny stan', dec: 3 });
    const unitSelect = selectEl(unitOptions, unit, (v) => { unit = v; }, { label: 'Jednostka stanu' });
    const minStock = numInput({ value: shown(item.minStock), label: 'Próg niskiego stanu', dec: 3 });
    const price = numInput({ value: item.price, label: 'Cena za jednostkę (zł)', dec: 2 });
    const category = selectEl(INV_CATS, item.category, () => {}, { label: 'Kategoria' });
    const location = selectEl(LOCATIONS.map(([v, label]) => [v, label]), item.location, () => {}, { label: 'Miejsce przechowywania' });
    const expiry = textInput({ value: item.expiry, label: 'Termin przydatności (cały wpis)', type: 'date', capitalize: 'off' });
    const barcode = textInput({ value: item.barcode, label: 'Kod EAN', placeholder: 'Zeskanuj lub wpisz kod', capitalize: 'off', inputmode: 'numeric' });
    const note = textArea({ value: item.note, label: 'Notatka', placeholder: 'Dostawca, partia, uwagi…', rows: 2 });
    let sheet;
    const save = async () => {
      const amount = Math.max(0, Number(stock.value.replace(',', '.')) || 0);
      const minimum = Math.max(0, Number(minStock.value.replace(',', '.')) || 0);
      const base = baseUnit(unit);
      const next = {
        ...item, name: name.value, category: category.value, location: location.value,
        unit: base, stock: toBase(amount, unit), minStock: toBase(minimum, unit),
        price: Math.max(0, Number(price.value.replace(',', '.')) || 0),
        priceUnit: unit === 'kg' ? 'kg' : unit === 'l' ? 'l' : unit === 'g' ? 'kg' : unit === 'ml' ? 'l' : 'szt.',
        expiry: expiry.value, barcode: barcode.value.trim(), note: note.value,
      };
      try {
        await saveItem(next);
        if (sheet) sheet.close();
        toast(existing ? 'Zapisano zmiany' : 'Dodano produkt do magazynu');
        paint();
      } catch (error) { toast(error.message || 'Nie udało się zapisać produktu', { type: 'error' }); }
    };
    sheet = openSheet({
      title: existing ? 'Edytuj produkt' : 'Dodaj produkt do magazynu',
      variant: 'sheet', cls: 'inventory-edit-sheet',
      body: h('div', { class: 'inventory-form stack' },
        field('Nazwa produktu', name),
        h('div', { class: 'grid-2' }, field('Aktualny stan', stock), field('Jednostka stanu', unitSelect)),
        h('div', { class: 'grid-2' }, field('Próg niskiego stanu', minStock), field('Cena za jednostkę (zł)', price)),
        h('div', { class: 'grid-2' }, field('Kategoria', category), field('Miejsce przechowywania', location)),
        field('Termin przydatności (cały wpis)', expiry),
        field('Kod EAN', barcode), field('Notatka', note),
        h('div', { class: 'row wrap' },
          button('Zapisz', { kind: 'primary', onClick: save }),
          button('Anuluj', { kind: 'ghost', onClick: () => sheet && sheet.close() }))),
    });
  }

  function openWaste(item) {
    const defaultUnit = item.unit === 'g' ? (item.stock >= 1000 ? 'kg' : 'g') : item.unit === 'ml' ? (item.stock >= 1000 ? 'l' : 'ml') : 'szt.';
    const amount = numInput({ value: null, label: 'Ilość straty', placeholder: defaultUnit === 'kg' || defaultUnit === 'l' ? '0,5' : 'Ilość', dec: 3 });
    const unit = selectEl(unitOptions, defaultUnit, () => {}, { label: 'Jednostka straty' });
    const reason = selectEl(reasonOptions, 'Zepsute', () => {}, { label: 'Powód' });
    let sheet;
    sheet = openSheet({
      title: 'Zarejestruj stratę',
      body: h('div', { class: 'stack' },
        h('p', { class: 'muted' }, item.name + ' · dostępne: ' + fmtStock(item)),
        field('Ilość straty', amount), field('Jednostka', unit), field('Powód', reason),
        button('Zapisz stratę', { kind: 'primary', block: true, onClick: async () => {
          const n = Number(amount.value.replace(',', '.')) || 0;
          if (!(n > 0)) { toast('Podaj ilość straty', { type: 'error' }); return; }
          const baseAmount = toBase(n, unit.value);
          const result = await recordWaste(item, baseAmount, reason.value);
          if (!result) { toast('Strata przekracza dostępny stan', { type: 'error' }); return; }
          sheet.close();
          toast('Zapisano stratę: ' + money(result.cost));
          paint();
        } }),
      ),
    });
  }

  function openStockChange(item, delta) {
    const amount = numInput({ value: null, label: 'Ilość korekty', dec: 3 });
    const unit = selectEl(unitOptions, item.unit === 'g' ? 'g' : item.unit === 'ml' ? 'ml' : 'szt.', () => {}, { label: 'Jednostka' });
    let sheet;
    sheet = openSheet({
      title: delta > 0 ? 'Przyjmij dostawę' : 'Korekta stanu',
      body: h('div', { class: 'stack' },
        h('p', { class: 'muted' }, item.name + ' · aktualnie ' + fmtStock(item)),
        field('Ilość korekty', amount), field('Jednostka', unit),
        button('Zapisz', { kind: 'primary', block: true, onClick: async () => {
          const n = Number(amount.value.replace(',', '.')) || 0;
          if (!(n > 0)) { toast('Podaj ilość', { type: 'error' }); return; }
          await changeStock(item, toBase(n, unit.value) * Math.sign(delta), { type: delta > 0 ? 'purchase' : 'adjust', reason: delta > 0 ? 'Przyjęcie dostawy' : 'Korekta stanu' });
          sheet.close(); paint();
        } }),
      ),
    });
  }

  function paint() {
    const all = inventoryItems();
    const filtered = all.filter((item) => !query || norm([item.name, item.category, item.barcode, item.note].join(' ')).includes(norm(query)));
    const summary = inventorySummary();
    summaryEl.replaceChildren(
      h('div', { class: 'inventory-summary-card' }, h('span', { class: 'muted small' }, 'Produkty'), h('strong', null, String(summary.count))),
      h('div', { class: 'inventory-summary-card' }, h('span', { class: 'muted small' }, 'Wartość'), h('strong', null, money(summary.value))),
      h('div', { class: 'inventory-summary-card' }, h('span', { class: 'muted small' }, 'Straty · 7 dni'), h('strong', null, money(summary.waste7.cost))),
    );
    const expired = all.filter(isExpired), soon = all.filter(isSoon), low = all.filter(isLow);
    alertsEl.replaceChildren();
    if (getSetting('invAlerts') !== false && (expired.length || soon.length || low.length || all.some(isOut))) {
      alertsEl.append(h('section', { class: 'card stack inventory-alert-card' },
        h('h2', { class: 'card-title' }, 'Terminy do sprawdzenia'),
        ...expired.map((item) => h('div', { class: 'inventory-alert is-expired' }, h('strong', null, item.name), h('span', null, 'Po terminie'))),
        ...soon.map((item) => h('div', { class: 'inventory-alert is-expiring' }, h('strong', null, item.name), h('span', null, 'Termin blisko'))),
        low.length ? h('h3', { class: 'subhead' }, 'Niski stan') : null,
        ...low.map((item) => h('div', { class: 'inventory-alert is-low' }, h('strong', null, item.name), h('span', null, 'Niski stan'))),
      ));
    } else alertsEl.append(h('p', { class: 'muted small' }, 'Brak pilnych alertów.'));
    listEl.replaceChildren();
    if (!filtered.length) {
      listEl.append(emptyState('📦', all.length ? 'Brak wyników' : 'Magazyn jest pusty', all.length ? 'Zmień wyszukiwaną nazwę lub kod EAN.' : 'Dodaj pierwszy produkt, aby śledzić stany i straty.',
        all.length ? null : button('Dodaj produkt do magazynu', { kind: 'primary', onClick: () => openItemSheet() })));
    } else {
      filtered.forEach((item) => {
        const statusClass = isExpired(item) ? ' is-expired' : isSoon(item) ? ' is-expiring' : isLow(item) ? ' is-low' : isOut(item) ? ' is-out' : '';
        listEl.append(h('article', { class: 'inventory-item' + statusClass },
          h('div', { class: 'inventory-item-main' },
            h('div', { class: 'inventory-item-title' },
              h('strong', null, item.name),
              isExpired(item) ? h('span', { class: 'status-pill danger' }, 'Po terminie') : isSoon(item) ? h('span', { class: 'status-pill warning' }, 'Termin blisko') : isLow(item) ? h('span', { class: 'status-pill warning' }, 'Niski stan') : null),
            h('p', { class: 'muted small' }, item.category + ' · ' + locName(item.location)),
            item.minStock > 0 ? h('p', { class: 'muted small' }, 'Próg: ' + fmtStock(item, item.minStock)) : null),
          h('div', { class: 'inventory-stock' }, h('strong', { class: 'num' }, fmtStock(item)), h('span', { class: 'muted small' }, money(stockValue(item)))),
          h('div', { class: 'inventory-item-actions' },
            button('Edytuj', { icon: 'edit', onClick: () => openItemSheet(item) }),
            button('− Stan', { icon: 'minus', onClick: () => openStockChange(item, -1) }),
            button('+ Stan', { icon: 'plus', onClick: () => openStockChange(item, 1) }),
            button('Zarejestruj stratę: ' + item.name, { icon: 'trash', onClick: () => openWaste(item), aria: 'Zarejestruj stratę: ' + item.name }),
            button('Usuń', { icon: 'x', kind: 'ghost', onClick: async () => {
              const sh = openSheet({ title: 'Usunąć produkt?', body: h('p', null, item.name), actions: [
                { label: 'Anuluj', kind: 'ghost' },
                { label: 'Usuń', kind: 'danger', onClick: async () => { await deleteItem(item.id); paint(); toast('Usunięto produkt'); } },
              ] });
              void sh;
            } }),
          )));
      });
    }
    wasteEl.replaceChildren(h('h2', { class: 'card-title' }, 'Straty w ostatnich 7 dniach'),
      h('p', { class: 'muted' }, 'Koszt wyrzuconych produktów: ' + money(summary.waste7.cost)),
      h('p', { class: 'muted small' }, summary.waste7.count + ' zarejestrowanych strat'));
  }

  const unsub = subscribe((type) => { if (type === 'inventory' || type === 'settings') paint(); });
  loadInventory().then(paint);
  paint();
  return { el: s.el, destroy: () => unsub() };
}
