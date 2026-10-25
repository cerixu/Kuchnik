/* ==========================================================================
   views-inventory.js — magazyn: stany, terminy, straty i szybkie korekty.
   Mobile-first; zapis przez inventory.js do IndexedDB.
   ========================================================================== */
import { h, icon, screen, button, iconBtn, toast, openSheet, confirmDialog, field, textInput, numInput, selectEl, emptyState } from './ui.js';
import { navigate, goBack } from './router.js';
import {
  INV_CATS, LOCATIONS, inventoryItems, inventorySummary, newItem, saveItem, getItem,
  changeStock, recordWaste, deleteItem, fmtStock, locName, isOut, isLow, isSoon, isExpired, stockValue,
} from './inventory.js';
import { fmtMoney, fmtNum, parseNum, norm } from './util.js';
import { detectFrame, lookupProduct, findByBarcode, normalizeEAN } from './barcode.js';

const UNIT_OPTIONS = [['g', 'g'], ['ml', 'ml'], ['szt.', 'szt.']];
const LOCATION_OPTIONS = LOCATIONS.map(([id, label]) => [id, label]);

export function inventoryView() {
  const s = screen({
    title: 'Magazyn',
    left: iconBtn('left', 'Wstecz', () => goBack('/')),
    right: h('div', { class: 'row gap' }, iconBtn('search', 'Skanuj kod EAN', () => openScanner()), iconBtn('plus', 'Dodaj produkt', () => openEditor())),
    cls: 'inventory',
  });
  const body = h('div', { class: 'stack' });
  const search = textInput({ value: '', placeholder: 'Szukaj produktu…', label: 'Szukaj w magazynie', capitalize: 'none' });
  const stats = h('div', { class: 'results-grid' });
  const list = h('div', { class: 'stack' });
  let filter = 'all';

  function paintStats() {
    const x = inventorySummary();
    stats.replaceChildren(
      h('div', { class: 'result' }, h('span', { class: 'result-k' }, 'Produkty'), h('span', { class: 'result-v num' }, String(x.count))),
      h('div', { class: 'result' }, h('span', { class: 'result-k' }, 'Wartość stanu'), h('span', { class: 'result-v num' }, fmtMoney(x.value))),
      h('div', { class: 'result' }, h('span', { class: 'result-k' }, 'Straty · 7 dni'), h('span', { class: 'result-v num' }, fmtMoney(x.waste7.cost))),
      h('div', { class: 'result' }, h('span', { class: 'result-k' }, 'Do uwagi'), h('span', { class: 'result-v num' }, String(x.out + x.low + x.soon + x.expired))),
    );
  }

  function statusFor(item) {
    if (isExpired(item)) return ['Po terminie', 'danger'];
    if (isSoon(item)) return ['Kończy się termin', 'warn'];
    if (isOut(item)) return ['Brak stanu', 'warn'];
    if (isLow(item)) return ['Niski stan', 'warn'];
    return ['Stan OK', ''];
  }

  function paintList() {
    const q = norm(search.value);
    const items = inventoryItems().filter((it) => {
      if (q && !norm([it.name, it.category, it.barcode, it.note, ...(it.aliases || [])].join(' ')).includes(q)) return false;
      if (filter === 'attention') return isExpired(it) || isSoon(it) || isOut(it) || isLow(it);
      if (filter !== 'all') return it.location === filter;
      return true;
    });
    list.replaceChildren(...(items.length ? items.map((item) => {
      const [label, cls] = statusFor(item);
      return h('section', { class: 'card stack inv-item' },
        h('div', { class: 'row between gap' },
          h('div', { class: 'grow stack', style: { gap: '2px' } },
            h('strong', null, item.name),
            h('span', { class: 'muted small' }, (item.category || 'Inne') + ' · ' + locName(item.location))),
          h('div', { class: 'stack', style: { gap: '2px', textAlign: 'right' } },
            h('strong', { class: 'num' }, fmtStock(item)),
            h('span', { class: 'muted small' }, label))),
        item.expiry ? h('p', { class: 'muted small' }, 'Termin: ' + item.expiry) : null,
        item.minStock > 0 ? h('p', { class: 'muted small' }, 'Próg minimalny: ' + fmtStock(item, item.minStock)) : null,
        h('div', { class: 'row wrap gap' },
          button('+ Stan', { sm: true, icon: 'plus', onClick: () => adjustStock(item.id, 'purchase') }),
          button('Strata', { sm: true, icon: 'minus', onClick: () => adjustStock(item.id, 'waste') }),
          button('Edytuj', { sm: true, icon: 'edit', onClick: () => openEditor(getItem(item.id)) }),
          button('Usuń', { sm: true, kind: 'ghost', onClick: () => removeItem(item.id) })));
    }) : [emptyState('📦', 'Brak produktów', q ? 'Zmień wyszukiwanie.' : 'Dodaj pierwszy produkt, aby prowadzić stany i straty.', button('Dodaj produkt', { kind: 'primary', icon: 'plus', onClick: () => openEditor() }))]));
  }

  function paint() { paintStats(); paintList(); }

  function openEditor(existing = null, preset = {}) {
    const draft = newItem(existing ? { ...existing } : preset);
    const name = textInput({ value: draft.name, placeholder: 'np. Mąka typu 00', label: 'Nazwa produktu' });
    const unit = selectEl(UNIT_OPTIONS, draft.unit || 'g', (v) => { draft.unit = v; });
    if (existing) unit.disabled = true; // jednostka bazowa nie może się zmienić bez konwersji stanu
    const stock = numInput({ value: draft.stock, label: 'Stan początkowy', dec: 2, onInput: (v) => { draft.stock = v == null ? 0 : Math.max(0, v); } });
    const min = numInput({ value: draft.minStock, label: 'Próg minimalny', dec: 2, onInput: (v) => { draft.minStock = v == null ? 0 : Math.max(0, v); } });
    const category = selectEl(INV_CATS, draft.category, (v) => { draft.category = v; });
    const location = selectEl(LOCATION_OPTIONS, draft.location, (v) => { draft.location = v; });
    const expiry = textInput({ value: draft.expiry || '', placeholder: '', label: 'Termin ważności', type: 'date', capitalize: 'none' });
    const barcode = textInput({ value: draft.barcode || '', placeholder: 'EAN-13 / EAN-8', label: 'Kod kreskowy', inputmode: 'numeric', capitalize: 'none' });
    const note = textInput({ value: draft.note || '', placeholder: 'Opcjonalna notatka', label: 'Notatka' });
    const form = h('div', { class: 'stack' },
      field('Nazwa produktu', name),
      h('div', { class: 'row gap' }, h('div', { class: 'grow' }, field('Jednostka bazowa', unit)), h('div', { class: 'grow' }, field('Lokalizacja', location))),
      h('div', { class: 'row gap' }, h('div', { class: 'grow' }, field('Stan', stock)), h('div', { class: 'grow' }, field('Próg minimalny', min))),
      field('Kategoria', category), field('Termin ważności', expiry), field('Kod kreskowy', barcode), field('Notatka', note),
      h('p', { class: 'muted small' }, 'Stan i próg zapisuj w wybranej jednostce bazowej. Dla mąki używaj g, dla płynów ml, dla sztuk — szt.'));
    const sheet = openSheet({
      title: existing ? 'Edytuj produkt' : 'Nowy produkt',
      body: form,
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Zapisz', kind: 'primary', close: false, onClick: async () => {
          try {
            draft.name = name.value.trim();
            draft.expiry = expiry.value;
            draft.barcode = barcode.value.trim().replace(/\s+/g, '');
            draft.note = note.value.trim();
            if (!draft.name) { toast('Wpisz nazwę produktu', { type: 'error' }); name.focus(); return; }
            if (draft.stock < 0 || draft.minStock < 0) { toast('Stan nie może być ujemny', { type: 'error' }); return; }
            await saveItem(draft);
            sheet.close();
            toast(existing ? 'Zapisano zmiany' : 'Dodano produkt');
            paint();
          } catch (e) { toast(e.message || 'Nie udało się zapisać produktu', { type: 'error' }); }
        } },
      ],
    });
  }

  async function openScanner() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast('Ta przeglądarka nie udostępnia kamery. Otwórz aplikację w Safari przez HTTPS.', { type: 'error' });
      return;
    }
    const video = h('video', { autoplay: true, muted: true, playsinline: true, style: { width: '100%', maxHeight: '45dvh', objectFit: 'cover', background: '#090909', borderRadius: '18px' }, 'aria-label': 'Podgląd kamery do skanowania kodu kreskowego' });
    const canvas = h('canvas', { hidden: true });
    const status = h('p', { class: 'muted small' }, 'Ustaw kod kreskowy w kadrze. Skanowanie rozpocznie się automatycznie.');
    let stream = null, torchOn = false, stopped = false, busy = false, raf = 0, sheet;
    const torchBtn = button('Włącz latarkę', { sm: true, onClick: async () => {
      const track = stream && stream.getVideoTracks()[0];
      if (!track) return;
      try {
        torchOn = !torchOn;
        await track.applyConstraints({ advanced: [{ torch: torchOn }] });
        torchBtn.textContent = torchOn ? 'Wyłącz latarkę' : 'Włącz latarkę';
      } catch (_) { torchOn = false; toast('Latarka nie jest obsługiwana przez tę kamerę.'); }
    } });
    const stop = () => {
      stopped = true;
      if (raf) cancelAnimationFrame(raf);
      if (stream) stream.getTracks().forEach((track) => track.stop());
      stream = null;
      try { video.pause(); video.srcObject = null; } catch (_) { /* kamera mogła nie wystartować */ }
    };
    sheet = openSheet({
      title: 'Skanuj kod kreskowy',
      body: h('div', { class: 'stack' }, video, canvas, status, h('div', { class: 'row wrap gap' }, torchBtn),
        h('p', { class: 'muted small' }, 'Kod EAN zostaje porównany z magazynem. Jeśli nie ma produktu, spróbujemy pobrać nazwę z Open Food Facts; możesz też wpisać ją ręcznie.')),
      actions: [{ label: 'Zamknij', kind: 'ghost' }],
      onClose: stop,
    });
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } } });
      if (stopped) { stream.getTracks().forEach((track) => track.stop()); return; }
      video.srcObject = stream;
      await video.play();
      const tick = async () => {
        if (stopped || busy) return;
        try {
          const hit = await detectFrame(video, canvas);
          if (hit && hit.code) {
            const code = normalizeEAN(hit.code);
            busy = true;
            status.textContent = 'Odczytano ' + code + ' — sprawdzam produkt…';
            stop();
            sheet.close();
            const existing = findByBarcode(code);
            if (existing) { openEditor(existing); return; }
            const product = await lookupProduct(code);
            openEditor(null, { barcode: code, name: product ? product.name : '', unit: product && product.unit ? product.unit : 'szt.' });
            return;
          }
        } catch (_) { /* następna klatka spróbuje ponownie */ }
        if (!stopped) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    } catch (e) {
      stop();
      status.textContent = 'Nie udało się uruchomić kamery. Sprawdź uprawnienia Safari i spróbuj ponownie.';
      toast(e && e.name === 'NotAllowedError' ? 'Zezwól Safari na dostęp do kamery.' : 'Kamera niedostępna. Sprawdź HTTPS i uprawnienia.', { type: 'error' });
    }
  }
  async function adjustStock(id, type) {
    const item = getItem(id);
    if (!item) return;
    const amountInput = numInput({ value: null, label: 'Ilość (' + item.unit + ')', placeholder: '0', dec: 2 });
    const reasonInput = textInput({ value: type === 'waste' ? 'Wyrzucone' : 'Dostawa', label: 'Powód', placeholder: 'Opcjonalnie' });
    const body = h('div', { class: 'stack' }, h('p', { class: 'muted small' }, item.name + ' · aktualnie ' + fmtStock(item)),
      field('Ilość (' + item.unit + ')', amountInput), field('Powód', reasonInput),
      h('p', { class: 'muted small' }, type === 'waste' ? 'Strata zostanie zapisana w raporcie strat.' : 'Ilość zostanie dodana do stanu magazynowego.'));
    let sheet;
    sheet = openSheet({
      title: type === 'waste' ? 'Zapisz stratę' : 'Dodaj stan',
      body,
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: type === 'waste' ? 'Zapisz stratę' : 'Dodaj', kind: 'primary', close: false, onClick: async () => {
          const amount = amountInput.value.trim() === '' ? null : parseNum(amountInput.value);
          if (!(amount > 0) || !Number.isFinite(amount)) { toast('Wpisz poprawną ilość większą od zera', { type: 'error' }); return; }
          try {
            const current = getItem(id);
            if (!current) { sheet.close(); return; }
            if (type === 'waste') await recordWaste(current, amount, reasonInput.value.trim() || 'Wyrzucone');
            else await changeStock(current, amount, { type: 'purchase', reason: reasonInput.value.trim() || 'Dostawa' });
            sheet.close();
            toast(type === 'waste' ? 'Zapisano stratę' : 'Zaktualizowano stan');
            paint();
          } catch (e) { toast(e.message || 'Nie udało się zapisać zmiany', { type: 'error' }); }
        } },
      ],
    });
  }

  async function removeItem(id) {
    const item = getItem(id);
    if (!item) return;
    if (!await confirmDialog({ title: 'Usunąć produkt?', message: 'Usunąć „' + item.name + '” z magazynu? Historia ruchów pozostanie w bazie.', confirmText: 'Usuń', danger: true })) return;
    try { await deleteItem(id); toast('Usunięto produkt'); paint(); }
    catch (e) { toast(e.message || 'Nie udało się usunąć produktu', { type: 'error' }); }
  }

  const filters = h('div', { class: 'chips wrap' }, [
    ['all', 'Wszystkie'], ['attention', 'Do uwagi'], ...LOCATIONS.map(([id, label]) => [id, label]),
  ].map(([id, label]) => h('button', { type: 'button', class: 'chip' + (filter === id ? ' on' : ''), onClick: () => { filter = id; filters.querySelectorAll('.chip').forEach((el) => el.classList.toggle('on', el.textContent === label)); paintList(); } }, label)));

  body.append(
    h('div', { class: 'stack' },
      h('p', { class: 'muted small' }, 'Stany, terminy i straty. Dane zapisują się na tym urządzeniu.'),
      stats,
      field('Szukaj', search),
      filters,
      list));
  s.content.append(body);
  search.addEventListener('input', paintList);
  paint();
  return { el: s.el };
}
