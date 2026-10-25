/* ==========================================================================
   views-detail.js — podgląd receptury: GOTUJĘ, PRZELICZ, procenty piekarskie,
   food cost, historia zmian, własne uwagi (autozapis).
   ========================================================================== */
import {
  h, icon, screen, button, iconBtn, toast, openSheet, confirmDialog, field, numInput, selectEl, segmented, textArea, emptyState,
} from './ui.js';
import { navigate, goBack } from './router.js';
import {
  subscribe, getRecipe, markOpened, patchRecipe, saveRecipe, deleteRecipe, duplicateRecipe, getHistory, restoreVersion,
  cloneRecipe, allIngredients, getSetting, setSetting, catName,
} from './recipes.js';
import {
  scaleRecipe, factorFromServings, factorFromYield, factorFromIngredient, effectiveYield, bakersTable, bakersRecalc, recipeCost,
  priceForFoodCost,
} from './calculator.js';
import { fmtAmount, fmtNum, fmtPct, fmtMoney, fmtMinutes, fmtDateTime, fmtDate, copyText, debounce, uid, plPortions } from './util.js';
import { heartBtn, tradMark, qtyParts, recipeToText, originOf, sideInfo, originLabel, sourceLabel } from './components.js';
import { ingIconUrl } from './ingredient-icons.js';
import { hasInventory, availability, shoppingGaps, fmtStock, findItemFor } from './inventory.js';
import { estimateKcal } from './nutrition.js';
import { openAddToShopping, addItems } from './shopping.js';
import { hostOf } from './importer.js';
import { recipeArtUrl } from './art.js';
import { attachRecipePhoto } from './food-photos.js';

const KIND_LABEL = { flour: 'mąka', water: 'woda', salt: 'sól', yeast: 'drożdże', fat: 'tłuszcz', other: '' };

export function detailView({ id }) {
  const base0 = getRecipe(id);
  if (!base0) {
    const s = screen({ title: 'Receptura', left: iconBtn('left', 'Wstecz', () => goBack('/recipes')) },
      emptyState('🤷', 'Nie ma takiej receptury', 'Mogła zostać usunięta.', button('Wszystkie receptury', { kind: 'primary', onClick: () => navigate('/recipes', { replace: true }) })));
    return { el: s.el };
  }
  markOpened(id);

  let scaled = null;          // przeliczona kopia (niezapisana) albo null
  let scaleLabel = '';
  const defSv = +getSetting('defaultServings') || 0;
  if (defSv > 0 && base0.servings && Math.abs(defSv - base0.servings) > 1e-6) { scaled = scaleRecipe(base0, defSv / base0.servings); scaleLabel = plPortions(defSv); }
  let skipPaint = false;
  const amateur = () => getSetting('mode') === 'amateur';
  const base = () => getRecipe(id);
  const cur = () => scaled || base();

  const heartSlot = h('span', { class: 'heart-slot' });
  const s = screen({
    title: base0.name || 'Receptura', left: iconBtn('left', 'Wstecz', () => goBack('/recipes')),
    right: h('div', { class: 'row' }, heartSlot, iconBtn('more', 'Więcej', () => openMore())), cls: 'detail', large: 'hero',
  });

  /* ----- Przeliczanie ----- */

  function applyScaled(r, label) {
    const b = base();
    const same = JSON.stringify(allIngredients(r).map((i) => i.amount)) === JSON.stringify(allIngredients(b).map((i) => i.amount)) && r.servings === b.servings;
    if (same) { scaled = null; scaleLabel = ''; } else { scaled = r; scaleLabel = label; }
    paint();
    if (scaled) s.scroll.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function applyFactor(k, label) {
    if (!(k > 0) || !Number.isFinite(k)) { toast('Podaj poprawną wartość', { type: 'error' }); return false; }
    const r = scaleRecipe(base(), k);
    applyScaled(r, label || `×${fmtNum(k, 3)}`);
  }

  function openScale() {
    const r = base();
    let mode = 'servings';
    const y = effectiveYield(r);
    let servings = cur().servings || r.servings, yAmt = y ? y.amount * (cur().servings && r.servings ? cur().servings / r.servings : 1) : null, yUnit = (y && y.unit) || 'g';
    const ings = allIngredients(r).filter((i) => i.name && i.amount > 0 && i.unit !== '%');
    let ingId = ings[0] ? ings[0].id : '', ingAmt = null, ingUnit = ings[0] ? ings[0].unit : 'g';
    const out = h('div', { class: 'preview-line' });
    const holder = h('div', { class: 'stack' });

    const factor = () => {
      if (mode === 'servings') return factorFromServings(r, servings);
      if (mode === 'yield') return factorFromYield(r, yAmt, yUnit);
      const ing = ings.find((i) => i.id === ingId);
      return ing ? factorFromIngredient(ing, ingAmt, ingUnit) : null;
    };
    const showOut = () => {
      const k = factor();
      out.replaceChildren(k ? h('span', null, 'Współczynnik ', h('strong', { class: 'num' }, '×' + fmtNum(k, 3)),
        r.servings ? ` · ${fmtNum(r.servings * k, 1)} porcji` : '') : h('span', { class: 'muted' }, 'Wpisz wartość docelową'));
    };
    const build = () => {
      const kids = [];
      if (mode === 'servings') {
        kids.push(field('Liczba porcji', numInput({ value: servings, label: 'Liczba porcji', onInput: (v) => { servings = v; showOut(); } }), `Receptura jest na ${r.servings || '?'} porcji`));
      } else if (mode === 'yield') {
        kids.push(h('div', { class: 'row gap' },
          h('div', { class: 'grow' }, field('Wydajność', numInput({ value: yAmt, label: 'Wydajność', onInput: (v) => { yAmt = v; showOut(); } }))),
          h('div', { class: 'grow' }, field('Jednostka', selectEl(['g', 'kg', 'ml', 'l', 'szt.', 'porcja'], yUnit, (v) => { yUnit = v; showOut(); })))));
        kids.push(h('p', { class: 'muted small' }, y ? `Obecnie: ${fmtAmount(y.amount)} ${y.unit}${y.computed ? ' (suma składników)' : ''}` : 'Receptura nie ma wydajności ani ilości w g/ml.'));
      } else {
        if (!ings.length) kids.push(h('p', { class: 'muted' }, 'Brak składników z ilością.'));
        else {
          kids.push(field('Składnik', selectEl(ings.map((i) => [i.id, `${i.name} (${fmtAmount(i.amount)} ${i.unit})`]), ingId, (v) => { ingId = v; const i = ings.find((x) => x.id === v); ingUnit = i.unit; build(); })));
          kids.push(h('div', { class: 'row gap' },
            h('div', { class: 'grow' }, field('Mam / chcę użyć', numInput({ value: ingAmt, label: 'Docelowa ilość', onInput: (v) => { ingAmt = v; showOut(); } }))),
            h('div', { class: 'grow' }, field('Jednostka', selectEl(['g', 'kg', 'ml', 'l', 'szt.', 'łyżka', 'łyżeczka'], ingUnit, (v) => { ingUnit = v; showOut(); })))));
        }
      }
      holder.replaceChildren(...kids);
      showOut();
    };
    const chips = h('div', { class: 'chips wrap' }, [0.5, 2, 3, 5, 10].map((k) => h('button', { type: 'button', class: 'chip', onClick: () => { sh.close(); applyFactor(k, `×${k}`); } }, '×' + String(k).replace('.', ','))));
    const modes = [['servings', 'Porcje'], ['yield', 'Wydajność'], ['ingredient', 'Składnik']];
    const sh = openSheet({
      title: 'Przelicz', variant: 'sheet',
      body: h('div', { class: 'stack' },
        h('div', null, h('div', { class: 'field-label' }, 'Szybko'), chips),
        segmented(modes, mode, (v) => { mode = v; build(); }, { label: 'Przelicz według' }),
        holder, out),
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Przelicz', kind: 'primary', icon: 'swap', onClick: () => {
          const k = factor();
          if (!k) { toast('Uzupełnij wartość docelową', { type: 'error' }); return false; }
          const lbl = mode === 'servings' ? `${fmtNum(servings, 1)} porcji` : mode === 'yield' ? `${fmtAmount(yAmt)} ${yUnit}` : `×${fmtNum(k, 3)}`;
          applyFactor(k, lbl);
        } },
      ],
    });
    build();
  }

  function openBakers() {
    const r = base();
    const t = bakersTable(r);
    if (!t.ok) return;
    let total = t.totalG, hyd = t.hydration, salt = t.salt, yeast = t.yeast, fat = t.fat;
    let balls = r.servings || 1, bw = total / (r.servings || 1);
    const prev = h('div', { class: 'bk-preview' });
    const hasFat = t.rows.some((x) => x.kind === 'fat');
    const show = () => {
      const res = bakersRecalc(r, { total, hydration: hyd, salt, yeast, fat: hasFat ? fat : undefined });
      const tt = bakersTable(res);
      prev.replaceChildren(h('div', { class: 'kv' }, tt.rows.map((x) =>
        h('div', { class: 'kv-row' }, h('span', null, x.name), h('span', { class: 'num' }, `${fmtAmount(x.grams)} g · ${fmtPct(x.pct)}`)))),
        h('div', { class: 'kv-total' }, 'Masa ciasta ', h('strong', { class: 'num' }, fmtAmount(tt.totalG) + ' g'), ' · mąka ', h('strong', { class: 'num' }, fmtAmount(tt.flourG) + ' g')));
      prev._res = res;
    };
    const totalIn = numInput({ value: total, label: 'Masa ciasta w gramach', dec: 1, onInput: (v) => { if (v > 0) { total = v; bw = total / balls; bwIn.value = fmtNum(bw, 1); } show(); } });
    const ballsIn = numInput({ value: balls, label: 'Liczba kulek', dec: 0, onInput: (v) => { if (v > 0) { balls = v; total = balls * bw; totalIn.value = fmtNum(total, 1); } show(); } });
    const bwIn = numInput({ value: bw, label: 'Waga kulki w gramach', dec: 1, onInput: (v) => { if (v > 0) { bw = v; total = balls * bw; totalIn.value = fmtNum(total, 1); } show(); } });
    const sh = openSheet({
      title: 'Procenty piekarskie', variant: 'sheet',
      body: h('div', { class: 'stack' },
        h('p', { class: 'muted small' }, 'Mąka = 100%. Zmień masę ciasta lub proporcje — pozostałe składniki przeliczą się same.'),
        field('Masa całego ciasta (g)', totalIn),
        h('div', { class: 'row gap' }, h('div', { class: 'grow' }, field('Liczba kulek', ballsIn)), h('div', { class: 'grow' }, field('Waga kulki (g)', bwIn))),
        h('div', { class: 'row gap' },
          h('div', { class: 'grow' }, field('Hydracja %', numInput({ value: hyd, label: 'Hydracja', dec: 1, onInput: (v) => { if (v >= 0) hyd = v; show(); } }))),
          h('div', { class: 'grow' }, field('Sól %', numInput({ value: salt, label: 'Sól', dec: 2, onInput: (v) => { if (v >= 0) salt = v; show(); } })))),
        h('div', { class: 'row gap' },
          h('div', { class: 'grow' }, field('Drożdże %', numInput({ value: yeast, label: 'Drożdże', dec: 2, onInput: (v) => { if (v >= 0) yeast = v; show(); } }))),
          hasFat ? h('div', { class: 'grow' }, field('Tłuszcz %', numInput({ value: fat, label: 'Tłuszcz', dec: 2, onInput: (v) => { if (v >= 0) fat = v; show(); } }))) : h('div', { class: 'grow' })),
        prev),
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Zastosuj', kind: 'primary', icon: 'check', onClick: () => applyScaled(prev._res, `ciasto ${fmtAmount(total)} g`) },
      ],
    });
    show();
  }

  /* ----- Zapis przeliczonej ----- */

  async function saveScaledHere() {
    const ok = await confirmDialog({ title: 'Zapisać w tej recepturze?', message: 'Ilości zostaną nadpisane. Poprzednią wersję znajdziesz w historii zmian.', confirmText: 'Zapisz' });
    if (!ok) return;
    const next = { ...scaled, id };
    await saveRecipe(next, { note: `Przeliczono (${scaleLabel})` });
    scaled = null; scaleLabel = '';
    toast('Zapisano przeliczoną recepturę');
    paint();
  }
  async function saveScaledNew() {
    const c = cloneRecipe(scaled);
    const now = Date.now();
    Object.assign(c, { id: uid('rcp_'), name: `${base().name} (${scaleLabel})`, favorite: false, favoritedAt: 0, createdAt: now, updatedAt: now, lastOpenedAt: 0, openCount: 0, photo: base().photo, thumb: base().thumb });
    c.sections.forEach((sec) => { sec.id = uid('sec_'); sec.ingredients.forEach((i) => { i.id = uid('ing_'); }); });
    c.steps.forEach((st) => { st.id = uid('stp_'); });
    const saved = await saveRecipe(c);
    toast('Zapisano jako nową recepturę', { action: { label: 'Otwórz', fn: () => navigate('/recipe/' + saved.id) } });
  }

  /* ----- Food cost ----- */

  function openPrices() {
    const r = cloneRecipe(base());
    const ings = allIngredients(r).filter((i) => i.name);
    const cur$ = getSetting('currency') || 'zł';
    const total = h('div', { class: 'preview-line' });
    const upd = () => {
      const c = recipeCost(r, 1);
      total.replaceChildren(h('span', null, 'Koszt razem ', h('strong', { class: 'num' }, fmtMoney(c.total, cur$)), c.perPortion != null ? ` · porcja ${fmtMoney(c.perPortion, cur$)}` : '', c.foodCostPct != null ? ` · food cost ${fmtNum(c.foodCostPct, 1)}%` : ''),
        c.missing ? h('div', { class: 'muted small' }, `Brak ceny lub zgodnej jednostki: ${c.missing}`) : null);
    };
    const rows = ings.map((i) => {
      const pkg = h('div', { class: 'row gap pkg' });
      const buildPkg = () => {
        pkg.replaceChildren();
        pkg.hidden = i.priceUnit !== 'opak.';
        if (i.priceUnit === 'opak.') {
          pkg.append(h('div', { class: 'grow' }, field('Waga / ilość w opakowaniu', numInput({ value: i.packageWeight, label: 'Waga opakowania', onInput: (v) => { i.packageWeight = v; upd(); } }))),
            h('div', { class: 'grow' }, field('Jednostka', selectEl(['g', 'ml', 'szt.'], i.packageUnit || 'g', (v) => { i.packageUnit = v; upd(); }))));
        }
      };
      buildPkg();
      return h('div', { class: 'price-row' },
        h('div', { class: 'price-name' }, i.name, h('small', { class: 'muted num' }, i.amount != null ? ` ${fmtAmount(i.amount)} ${i.unit}` : '')),
        h('div', { class: 'row gap' },
          h('div', { class: 'grow' }, numInput({ value: i.price, label: `Cena: ${i.name}`, placeholder: 'cena', dec: 2, onInput: (v) => { i.price = v; upd(); } })),
          h('div', { class: 'grow' }, selectEl([['kg', `${cur$}/kg`], ['l', `${cur$}/l`], ['g', `${cur$}/g`], ['ml', `${cur$}/ml`], ['szt.', `${cur$}/szt.`], ['opak.', `${cur$}/opak.`]], i.priceUnit || 'kg', (v) => { i.priceUnit = v; buildPkg(); upd(); }, { label: 'Jednostka ceny' }))),
        pkg);
    });
    const sale = numInput({ value: r.salePrice, label: 'Cena sprzedaży porcji', dec: 2, placeholder: 'np. 32', onInput: (v) => { r.salePrice = v; upd(); } });
    openSheet({
      title: 'Ceny składników', variant: 'sheet',
      body: h('div', { class: 'stack' },
        h('p', { class: 'muted small' }, 'Ceny zapisują się w recepturze i w katalogu składników (podpowiadają się w innych recepturach). Cena 0 jest dozwolona (np. woda).'),
        field(`Cena sprzedaży porcji (${cur$})`, sale), total, h('div', { class: 'stack' }, rows)),
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Zapisz ceny', kind: 'primary', onClick: async () => {
          await saveRecipe({ ...base(), sections: r.sections, salePrice: r.salePrice }, { note: 'Zaktualizowano ceny' });
          if (scaled) { scaled = null; scaleLabel = ''; }
          toast('Zapisano ceny'); paint();
        } },
      ],
    });
    upd();
  }

  function costCard() {
    const r = cur();
    const cur$ = getSetting('currency') || 'zł';
    const c = recipeCost(r, 1);
    const any = c.lines.some((l) => l.cost != null);
    const kv = (k, v, cls = '') => h('div', { class: 'stat ' + cls }, h('span', { class: 'stat-k' }, k), h('span', { class: 'stat-v num' }, v));
    const body = [];
    if (any) {
      body.push(h('div', { class: 'stats' },
        kv('Koszt receptury', fmtMoney(c.total, cur$)),
        kv('Koszt porcji', fmtMoney(c.perPortion, cur$)),
        kv('Cena sprzedaży', r.salePrice > 0 ? fmtMoney(r.salePrice, cur$) : '—'),
        kv('Food cost', c.foodCostPct != null ? fmtNum(c.foodCostPct, 1) + '%' : '—', c.foodCostPct > 35 ? 'warn' : '')));
      if (c.perPortion > 0) body.push(h('p', { class: 'muted small' }, `Dla food cost 30%: cena porcji ok. ${fmtMoney(priceForFoodCost(c.perPortion, 30), cur$)}`));
      if (c.missing) body.push(h('p', { class: 'muted small' }, `Składników bez ceny lub zgodnej jednostki: ${c.missing}`));
    } else body.push(h('p', { class: 'muted' }, 'Dodaj ceny składników, aby policzyć koszt receptury, porcji i food cost.'));
    body.push(button(any ? 'Edytuj ceny' : 'Dodaj ceny', { icon: 'coins', block: true, onClick: openPrices }));
    return h('section', { class: 'card' }, h('h2', { class: 'card-title' }, icon('coins', 20), 'Koszt'), ...body);
  }

  /* ----- Historia ----- */

  async function openHistory() {
    const list = await getHistory(id);
    const body = h('div', { class: 'stack' });
    if (!list.length) body.append(emptyState('🕓', 'Brak historii', 'Każda zapisana zmiana pojawi się tutaj, z możliwością przywrócenia.'));
    list.forEach((e) => {
      const detail = h('div', { class: 'hist-detail', hidden: true });
      const btnPrev = button('Podgląd', { sm: true, kind: 'ghost', onClick: () => {
        if (!detail.hidden) { detail.hidden = true; btnPrev.lastChild.textContent = 'Podgląd'; return; }
        const snap = e.snapshot;
        detail.replaceChildren(
          h('div', { class: 'muted small' }, `${snap.servings} porcji · ${catName(snap.category)}`),
          ...snap.sections.map((sec) => h('div', null, sec.name ? h('div', { class: 'tape' }, sec.name) : null,
            h('ul', { class: 'plain' }, sec.ingredients.map((i) => { const q = qtyParts(i); return h('li', null, `${i.name} — ${[q.num, q.unit].filter(Boolean).join(' ')}`); })))),
          snap.steps.length ? h('ol', { class: 'plain steps-mini' }, snap.steps.map((st) => h('li', null, st.text))) : null);
        detail.hidden = false; btnPrev.lastChild.textContent = 'Ukryj';
      } });
      const btnRestore = button('Przywróć wersję', { sm: true, kind: 'primary', onClick: async () => {
        const ok = await confirmDialog({ title: 'Przywrócić tę wersję?', message: `Receptura wróci do stanu z ${fmtDateTime(e.at)}. Obecna wersja trafi do historii, więc możesz to cofnąć.`, confirmText: 'Przywróć' });
        if (!ok) return;
        await restoreVersion(e);
        sheet.close(); scaled = null; toast('Przywrócono wersję'); paint();
      } });
      body.append(h('div', { class: 'hist-item' },
        h('div', { class: 'hist-date' }, fmtDateTime(e.at)),
        h('ul', { class: 'plain hist-changes' }, e.changes.map((c) => h('li', null, c))),
        h('div', { class: 'row gap' }, btnPrev, btnRestore), detail));
    });
    const sheet = openSheet({ title: 'Historia zmian', variant: 'sheet', body, actions: [{ label: 'Zamknij', kind: 'ghost' }] });
  }

  /* ----- Menu „więcej” ----- */

  function openMore() {
    const r = base();
    const sh = openSheet({
      title: r.name || 'Receptura', variant: 'sheet',
      body: h('div', { class: 'menu' },
        button('Edytuj recepturę', { icon: 'edit', block: true, onClick: () => { sh.close(); navigate('/edit/' + id); } }),
        button('Duplikuj', { icon: 'copy', block: true, onClick: async () => { sh.close(); const c = await duplicateRecipe(id); toast('Utworzono kopię', { action: { label: 'Otwórz', fn: () => navigate('/recipe/' + c.id) } }); } }),
        button('Skopiuj jako tekst', { icon: 'copy', block: true, onClick: async () => { sh.close(); const ok = await copyText(recipeToText(cur())); toast(ok ? 'Skopiowano recepturę' : 'Nie udało się skopiować', { type: ok ? '' : 'error' }); } }),
        navigator.share ? button('Udostępnij', { icon: 'share', block: true, onClick: async () => { sh.close(); try { await navigator.share({ title: r.name, text: recipeToText(cur()) }); } catch (_) { /* anulowano */ } } }) : null,
        amateur() ? null : button('Historia zmian', { icon: 'history', block: true, onClick: () => { sh.close(); openHistory(); } }),
        button('Usuń recepturę', { icon: 'trash', kind: 'danger', block: true, onClick: async () => {
          sh.close();
          const ok = await confirmDialog({ title: `Usunąć „${r.name}”?`, message: 'Receptura wraz z historią zmian zostanie usunięta z tego telefonu. Tej operacji nie da się cofnąć (chyba że masz kopię JSON).', confirmText: 'Usuń', danger: true });
          if (!ok) return;
          await deleteRecipe(id); toast('Receptura usunięta'); navigate('/recipes', { replace: true });
        } })),
    });
  }

  /* ----- Rysowanie ----- */

  let notesDirty = false;
  const notesSave = debounce(async (val) => {
    skipPaint = true;
    try { await patchRecipe(id, { notes: val }, { touch: true }); } finally { skipPaint = false; }
    notesDirty = false;
    savedHint.textContent = 'Zapisano';
    setTimeout(() => { if (savedHint.textContent === 'Zapisano') savedHint.textContent = ''; }, 1500);
  }, 500);
  const savedHint = h('span', { class: 'muted small saved-hint', 'aria-live': 'polite' });
  let notesEl = null;

  function ingredientsCard(r, table) {
    const showPct = !!(table && table.ok && r.bakers && !amateur());
    const pct = new Map(table && table.ok ? table.rows.map((x) => [x.id, x]) : []);
    const secs = r.sections.filter((sec) => sec.ingredients.length || sec.name);
    const avMap = hasInventory() ? new Map(availability(r, 1).rows.map((x) => [x.ing.id, x])) : new Map();
    return h('section', { class: 'card ingredients' },
      h('h2', { class: 'card-title' }, icon('list', 20), 'Składniki'),
      secs.length ? secs.map((sec) => h('div', { class: 'ing-section' },
        sec.name ? h('div', { class: 'tape' }, sec.name) : null,
        h('ul', { class: 'ing-list' }, sec.ingredients.map((i) => {
          const q = qtyParts(i);
          const p = pct.get(i.id);
          const av = avMap.get(i.id);
          return h('li', { class: 'ing' + (av ? ' av-' + av.status : '') },
            h('img', { class: 'ing-ico', src: ingIconUrl(i.name), alt: '' }),
            h('span', { class: 'ing-name' }, i.name || '—', av && av.status === 'ok' ? h('span', { class: 'av-dot ok', title: 'Masz w magazynie' }) : av && av.status === 'partial' ? h('span', { class: 'av-dot partial', title: `Masz tylko ${fmtStock(av.item, av.have)}` }) : av && av.status === 'missing' ? h('span', { class: 'av-dot missing', title: 'Brak w magazynie' }) : null, showPct && p && KIND_LABEL[p.kind] ? h('span', { class: 'kind' }, KIND_LABEL[p.kind]) : null),
            showPct && p && p.pct != null ? h('span', { class: 'ing-pct num' }, fmtPct(p.pct)) : null,
            h('span', { class: 'ing-qty' }, h('span', { class: 'amt num' }, q.num), h('span', { class: 'unit' }, q.unit)));
        })))) : h('p', { class: 'muted' }, 'Brak składników.'));
  }

  function bakersCard(r, table) {
    if (!r.bakers || amateur() || !table.ok) return null;
    const kv = (k, v) => h('div', { class: 'stat' }, h('span', { class: 'stat-k' }, k), h('span', { class: 'stat-v num' }, v));
    return h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, icon('percent', 20), 'Procenty piekarskie'),
      h('div', { class: 'stats' }, kv('Mąka', fmtAmount(table.flourG) + ' g'), kv('Masa ciasta', fmtAmount(table.totalG) + ' g'), kv('Hydracja', fmtPct(table.hydration)),
        kv('Sól', fmtPct(table.salt)), kv('Drożdże', fmtPct(table.yeast)), table.fat > 0 ? kv('Tłuszcz', fmtPct(table.fat)) : null),
      button('Przelicz ciasto', { icon: 'swap', block: true, onClick: openBakers }));
  }

  /* Składniki na łuku — okrągłe, kolorowe ikony wektorowe jak na makiecie. */
  function orbit(r) {
    const ings = allIngredients(r).filter((i) => i.name && i.unit !== '%');
    const picked = [], used = new Set();
    for (const i of ings) { const k = ingIconUrl(i.name); if (used.has(k)) continue; used.add(k); picked.push(i); if (picked.length >= 5) break; }
    const more = ings.length - picked.length;
    const items = [...picked.map((i) => ({ ing: i })), ...(more > 0 ? [{ more }] : [])];
    const n = items.length;
    if (!n) return null;
    const H = n > 3 ? 54 : 30;
    const av = hasInventory() ? new Map(availability(r, 1).rows.map((x) => [x.ing.id, x.status])) : null;
    const el = h('div', { class: 'orbit', style: { '--oh': H + 'px' } }, h('div', { class: 'orbit-arc' }),
      ...items.map((it, idx) => {
        const t = n === 1 ? 0.5 : idx / (n - 1);
        const u = 2 * t - 1;
        const y = H * (1 - Math.sqrt(Math.max(0, 1 - u * u)));
        const x = 9 + 82 * t;
        const q = it.ing ? qtyParts(it.ing) : null;
        const st = it.ing && av ? av.get(it.ing.id) : null;
        return h('button', { type: 'button', class: 'orb' + (st ? ' av-' + st : ''), style: { left: x + '%', top: y + 'px' }, 'aria-label': it.ing ? `${it.ing.name} ${q.num} ${q.unit}` : `Jeszcze ${it.more} składników`,
          onClick: () => { openFullRecipe(); setTimeout(() => { const t2 = document.querySelector('.full-recipe .ingredients'); if (t2) t2.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 260); } },
          h('span', { class: 'orb-dot' }, it.ing ? h('img', { src: ingIconUrl(it.ing.name), alt: '' }) : `+${it.more}`, st && st !== 'basic' && st !== 'taste' ? h('span', { class: 'orb-av ' + st }) : null),
          h('span', { class: 'orb-name' }, it.ing ? it.ing.name.replace(/\s*\(.*\)\s*/, '').split(/[\s,]+/)[0] : 'więcej'),
          it.ing ? h('span', { class: 'orb-amt num' }, [q.num, q.unit].filter(Boolean).join('\u00a0')) : null);
      }));
    return h('div', { class: 'orbit-wrap' }, h('div', { class: 'orbit-title' }, 'Składniki'), el);
  }

  /* ----- Ekran: góra jak na makiecie ----- */

  function paint() {
    const r = cur();
    s.setTitle(r.name || 'Receptura');
    heartSlot.replaceChildren(heartBtn(base()));
    const kids = [];
    const rr = base();
    const heroCustom = rr.photo || rr.thumb;
    const heroImg = h('img', { class: heroCustom ? '' : 'art', src: heroCustom || recipeArtUrl(rr), alt: heroCustom ? `Zdjęcie: ${r.name}` : '' });
    if (!heroCustom) attachRecipePhoto(heroImg, rr);
    kids.push(h('div', { class: 'detail-hero' }, h('div', { class: 'hero-circle' }, heroImg)));
    kids.push(h('div', { class: 'detail-title-row' },
      h('h1', { class: 'detail-title' }, r.name || 'Receptura'),
      sideInfo({ ...rr, servings: r.servings, sections: r.sections })));
    const orgL = originLabel(rr);
    kids.push(h('div', { class: 'detail-from' },
      orgL ? h('a', { class: 'from-chip', href: '#/recipes?origin=' + rr.origin, onClick: (e) => { e.preventDefault(); navigate('/recipes?origin=' + rr.origin); } }, orgL) : null,
      h('span', { class: 'from-chip soft' }, icon('book', 14), rr.sourceUrl ? h('a', { href: rr.sourceUrl, target: '_blank', rel: 'noopener noreferrer' }, sourceLabel(rr)) : sourceLabel(rr)),
      h('span', { class: 'from-chip soft' }, catName(rr.category))));
    if (hasInventory()) {
      const av = availability(r, 1);
      if (av.counted) {
        const cls = av.pct >= 0.999 ? 'good' : av.pct >= 0.6 ? 'mid' : 'bad';
        kids.push(h('button', { type: 'button', class: 'stock-chip ' + cls, onClick: openAvailability },
          icon('fridge', 18),
          h('span', null, av.pct >= 0.999 ? 'Masz wszystko w magazynie' : `Masz ${av.ok} z ${av.counted} składników`),
          h('span', { class: 'stock-chip-go' }, av.pct >= 0.999 ? 'Gotuj!' : `brakuje ${av.counted - av.ok}`), icon('right', 16)));
      }
    }
    if (r.description) kids.push(h('p', { class: 'desc' }, r.description));
    if (scaled) kids.push(scaleBanner());
    kids.push(orbit(r));
    kids.push(h('div', { class: 'actions-primary' },
      button('GOTUJĘ', { kind: 'primary', lg: true, block: true, icon: 'chef', onClick: () => navigate('/guide/' + id) }),
      h('p', { class: 'muted small center-text' }, 'Prowadzę krok po kroku: składniki, minutniki, czytanie na głos')));
    kids.push(h('button', { type: 'button', class: 'more-toggle', onClick: openFullRecipe }, icon('chev', 22), h('span', null, 'Cały przepis')));
    s.content.replaceChildren(...kids.filter(Boolean));
    renderFull();
  }

  function scaleBanner() {
    return h('div', { class: 'banner scale-banner', role: 'status' },
      h('div', { class: 'banner-text' }, h('strong', null, 'Przeliczone: ' + scaleLabel), h('span', { class: 'muted' }, 'Podgląd — nic jeszcze nie zapisano.')),
      h('div', { class: 'row wrap gap' },
        button('Zapisz jako nową', { sm: true, onClick: saveScaledNew }),
        button('Zapisz w tej', { sm: true, onClick: saveScaledHere }),
        button('Reset', { sm: true, kind: 'ghost', onClick: () => { scaled = null; scaleLabel = ''; paint(); } })));
  }

  /* ----- Magazyn: co mam, czego brakuje ----- */

  function openAvailability() {
    const r = cur();
    const av = availability(r, 1);
    const rows = av.rows.filter((x) => ['ok', 'partial', 'missing'].includes(x.status));
    const sh = openSheet({
      title: 'Składniki w magazynie', variant: 'sheet',
      body: h('div', { class: 'stack' },
        h('div', { class: 'av-meter' }, h('div', { class: 'av-bar' }, h('span', { style: { width: Math.round(av.pct * 100) + '%' } })), h('strong', { class: 'num' }, `${av.ok} / ${av.counted}`)),
        h('div', { class: 'av-list' }, rows.map((x) => {
          const q = qtyParts(x.ing);
          return h('div', { class: 'av-row ' + x.status },
            h('img', { class: 'ing-ico', src: ingIconUrl(x.ing.name), alt: '' }),
            h('div', { class: 'av-text' }, h('strong', null, x.ing.name), h('small', { class: 'muted' }, x.item ? `W magazynie: ${fmtStock(x.item, x.have)} · potrzeba: ${[q.num, q.unit].filter(Boolean).join(' ')}` : `Potrzeba: ${[q.num, q.unit].filter(Boolean).join(' ')} · nie masz tego w magazynie`)),
            h('span', { class: 'av-mark ' + x.status }, x.status === 'ok' ? '✓' : x.status === 'partial' ? '↗' : '✕'));
        }))),
      actions: [{ label: 'Zamknij', kind: 'ghost' },
        { label: 'Brakujące do zakupów', kind: 'primary', icon: 'cart', onClick: async () => { const gaps = shoppingGaps(r, 1); if (!gaps.length) { toast('Masz wszystko — nic nie brakuje'); return; } const res = await addItems(gaps); toast(`Dodano do zakupów: ${res.count}`, { action: { label: 'Pokaż', fn: () => navigate('/shopping') } }); } }],
    });
    void sh;
  }

  /* ----- Pełny przepis w dużym szklanym oknie ----- */

  let full = null;

  function buildDetails() {
    const r = cur(), rr = base();
    const table = bakersTable(r);
    const facts = [];
    const fact = (ico, text) => (text ? h('span', { class: 'fact' }, icon(ico, 18), text) : null);
    facts.push(fact('users', r.servings ? plPortions(r.servings) : ''));
    if (r.yieldAmount) facts.push(fact('info', `${fmtAmount(r.yieldAmount)} ${r.yieldUnit}`));
    facts.push(fact('clock', [r.prepTime ? `przyg. ${fmtMinutes(r.prepTime)}` : '', r.cookTime ? `gotow. ${fmtMinutes(r.cookTime)}` : ''].filter(Boolean).join(' · ')));
    facts.push(fact('timer', r.fermentTime ? `ferm. ${fmtMinutes(r.fermentTime)}` : ''));
    facts.push(fact('thermo', r.temperature));
    facts.push(fact('star', rr.rating ? `${rr.rating}/5` : ''));
    facts.push(fact('chef', rr.cookCount ? `gotowano ${rr.cookCount}×` : ''));
    const det = [];
    if (scaled) det.push(scaleBanner());
    det.push(h('div', { class: 'detail-head' },
      h('div', { class: 'row wrap gap' }, tradMark(rr) ? h('span', { class: 'trad-big' }, tradMark(rr), originOf(rr.origin) ? originOf(rr.origin).name : 'Tradycyjna') : null,
        h('a', { class: 'pill', href: '#/recipes?cat=' + encodeURIComponent(r.category), onClick: (e) => { e.preventDefault(); navigate('/recipes?cat=' + encodeURIComponent(r.category)); } }, catName(r.category)),
        ...(r.tags || []).map((t) => h('a', { class: 'pill soft', href: '#/recipes?tag=' + encodeURIComponent(t), onClick: (e) => { e.preventDefault(); navigate('/recipes?tag=' + encodeURIComponent(t)); } }, '#' + t))),
      h('div', { class: 'facts' }, facts)));
    const kc = estimateKcal(r);
    if (kc) det.push(h('p', { class: 'muted small kcal-note' }, `Szacunkowo ok. ${kc.perServing} kcal na porcję (orientacyjnie, z tabel wartości odżywczej; ${Math.round(kc.coverage * 100)}% składników rozpoznano).`));
    det.push(h('div', { class: 'rate-row' }, h('span', { class: 'field-label' }, 'Twoja ocena'),
      h('div', { class: 'stars small', role: 'radiogroup', 'aria-label': 'Ocena' }, [1, 2, 3, 4, 5].map((n) => h('button', { type: 'button', class: 'star' + ((rr.rating || 0) >= n ? ' on' : ''), role: 'radio', 'aria-checked': rr.rating === n, 'aria-label': `${n} z 5`,
        onClick: async () => { await patchRecipe(id, { rating: rr.rating === n ? 0 : n }); } }, icon('star', 26))))));
    if (rr.servings) det.push(h('div', { class: 'stepper-bar' }, h('span', { class: 'field-label' }, 'Porcje'),
      h('div', { class: 'stepper', role: 'group', 'aria-label': 'Liczba porcji' },
        iconBtn('minus', 'Mniej porcji', () => { const cs = r.servings || rr.servings; const t = Math.max(0.5, cs > 1 ? cs - 1 : cs / 2); applyFactor(t / rr.servings, plPortions(t)); }, 'glassy'),
        h('div', { class: 'stepper-val' }, h('strong', { class: 'num' }, fmtNum(r.servings, 1))),
        iconBtn('plus', 'Więcej porcji', () => { const cs = r.servings || rr.servings; const t = cs + 1; applyFactor(t / rr.servings, plPortions(t)); }, 'glassy'))));
    det.push(h('div', { class: 'actions-row' },
      button('Przelicz', { icon: 'swap', onClick: openScale }),
      button('Do zakupów', { icon: 'cart', onClick: () => openAddToShopping(r, 1) }),
      button('Edytuj', { icon: 'edit', onClick: () => navigate('/edit/' + id) })));
    if (hasInventory()) {
      const av = availability(r, 1);
      if (av.counted) det.push(h('button', { type: 'button', class: 'stock-chip wide ' + (av.pct >= 0.999 ? 'good' : av.pct >= 0.6 ? 'mid' : 'bad'), onClick: openAvailability },
        icon('fridge', 18), h('span', null, av.pct >= 0.999 ? 'Masz wszystko w magazynie' : `W magazynie: ${av.ok} z ${av.counted} składników`), h('span', { class: 'stock-chip-go' }, 'Szczegóły'), icon('right', 16)));
    }
    det.push(ingredientsCard(r, table));
    det.push(bakersCard(r, table));
    det.push(h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, icon('list', 20), 'Przygotowanie'),
      r.steps.length ? h('ol', { class: 'steps' }, r.steps.map((st) => h('li', null, h('span', { class: 'step-text' }, st.text)))) : h('p', { class: 'muted' }, 'Brak kroków. Dodaj je w edytorze.')));
    if (!amateur()) det.push(costCard());
    const startNotes = notesDirty && notesEl ? notesEl.value : rr.notes || '';
    notesEl = textArea({ value: startNotes, label: 'Własne uwagi', placeholder: 'Np. ciasto wyszło za twarde — następnym razem +10 g wody…', rows: 3, onInput: (v) => { notesDirty = true; savedHint.textContent = '…'; notesSave(v); } });
    det.push(h('section', { class: 'card' }, h('div', { class: 'row between' }, h('h2', { class: 'card-title' }, icon('edit', 20), 'Własne uwagi'), savedHint), notesEl));
    const src = [];
    if (rr.source) src.push(h('div', null, 'Źródło: ', rr.source));
    if (rr.sourceUrl) src.push(h('div', null, h('a', { class: 'ext', href: rr.sourceUrl, target: '_blank', rel: 'noopener noreferrer' }, icon('link', 16), hostOf(rr.sourceUrl) || rr.sourceUrl)));
    src.push(h('div', null, `Dodano ${fmtDate(rr.createdAt, true)} · zmieniono ${fmtDateTime(rr.updatedAt)}`));
    det.push(h('div', { class: 'meta-foot muted small' }, src));
    if (!amateur()) det.push(h('div', { class: 'row center' }, button('Historia zmian', { icon: 'history', kind: 'ghost', onClick: openHistory })));
    return det.filter(Boolean);
  }

  function renderFull() {
    if (!full) return;
    const top = full.panel.querySelector('.panel-body');
    const keep = top ? top.scrollTop : 0;
    full.holder.replaceChildren(...buildDetails());
    if (top) top.scrollTop = keep;
  }

  function openFullRecipe() {
    if (full) return;
    const holder = h('div', { class: 'full-recipe stack' });
    const sheet = openSheet({
      title: base().name || 'Przepis', variant: 'sheet', cls: 'tall full', body: holder,
      actions: [
        { label: 'Lista kontrolna', kind: 'ghost', icon: 'list', onClick: () => navigate('/cook/' + id) },
        { label: 'GOTUJĘ', kind: 'primary', icon: 'chef', onClick: () => navigate('/guide/' + id) },
      ],
      onClose: () => { if (notesDirty && notesEl) notesSave.flush(notesEl.value); full = null; },
    });
    full = { holder, panel: sheet.panel };
    renderFull();
  }

  s.content.addEventListener('click', () => {});
  paint();
  const unsub = subscribe((t) => {
    if (skipPaint) return;
    if (t === 'recipes' || t === 'settings' || t === 'categories' || t === 'inventory') {
      if (!getRecipe(id)) { navigate('/recipes', { replace: true }); return; }
      paint();
    }
  });
  return { el: s.el, destroy: () => { unsub(); if (notesDirty && notesEl) notesSave.flush(notesEl.value); } };
}
