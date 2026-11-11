/* ==========================================================================
   views-calc.js — kalkulatory: pizza (procenty piekarskie), procenty,
   przeliczanie receptury, koszt receptury (food cost). Wartości wpisane
   w kalkulatorach zapamiętują się (calc:*).
   ========================================================================== */
import {
  h, icon, screen, button, iconBtn, toast, field, numInput, selectEl, segmented, emptyState,
} from './ui.js';
import { navigate, goBack } from './router.js';
import {
  state, listRecipes, getRecipe, saveRecipe, blankRecipe, blankIngredient, blankSection, blankStep, kv, getSetting, allIngredients,
} from './recipes.js';
import {
  pizzaCalc, pizzaCalcFromFlour, yeastSuggestion, YEAST_TYPES, scaleRecipe, factorFromServings, factorFromYield, factorFromIngredient, effectiveYield, recipeCost, priceForFoodCost,
} from './calculator.js';
import { fmtAmount, fmtNum, fmtMoney, debounce, norm } from './util.js';
import { inventoryItems, inventoryLoaded } from './inventory.js';
import { qtyParts } from './components.js';
import { addItems, openAddToShopping } from './shopping.js';
import { calcScreen, memo, col, result } from './calc-kit.js';
import { TOOLS } from './views-tools.js';
import { openTimersSheet } from './timers.js';

const GROUPS = [
  ['Kalkulatory', [
    ['pizza', 'Pizza i ciasto', 'Kulki, hydracja, sól, drożdże → mąka, woda, sól, drożdże', 'pizza'],
    ['percent', 'Procenty', 'Ile to X%, jaki to procent, zmiana, dodaj/odejmij', 'percent'],
    ['scale', 'Przeliczanie receptury', 'Na inną liczbę porcji, wydajność lub ilość składnika', 'swap'],
    ['cost', 'Koszt receptury', 'Ceny składników, koszt porcji, food cost i cena sprzedaży', 'coins'],
    ['brine', 'Sól i solanki', 'Solanka %, sól na sucho, kiszenie', 'drop'],
    ['starter', 'Zakwas', 'Karmienie zakwasu: zakwas · mąka · woda', 'wave'],
    ['pan', 'Forma do pieczenia', 'Przelicz ciasto na inną formę', 'ruler'],
  ]],
  ['Przeliczniki i ściągi', [
    ['units', 'Przelicznik jednostek', 'Szklanki, łyżki, uncje, funty, °F — także g ↔ ml dla składników', 'scale'],
    ['doneness', 'Temperatury mięs i ryb', 'Stopnie wysmażenia, bezpieczne temperatury', 'thermo'],
    ['times', 'Czasy gotowania', 'Jajka, makarony, kasze, warzywa — z minutnikiem', 'timer'],
    ['subs', 'Zamienniki składników', 'Brakuje masła, jajka, drożdży? Znajdź zamiennik', 'swap'],
  ]],
  ['Pomysły', [
    ['pantry', 'Co mam w lodówce?', 'Wpisz składniki — pokażę pasujące receptury', 'fridge'],
    ['random', 'Co dziś gotujemy?', 'Losuj przepis według kategorii i czasu', 'shuffle'],
  ]],
];

export function calcView({ kind }) {
  if (!kind) return hub();
  if (kind === 'pizza') return pizzaCalculator();
  if (kind === 'percent') return percentCalculator();
  if (kind === 'scale') return scaleCalculator();
  if (kind === 'cost') return costCalculator();
  if (TOOLS[kind]) return TOOLS[kind]();
  return hub();
}

function hub() {
  const s = screen({ title: 'Kalkulatory', cls: 'calc-hub', right: iconBtn('timer', 'Minutniki', () => openTimersSheet()) },
    ...GROUPS.flatMap(([title, items]) => [
      h('h3', { class: 'group-title' }, title),
      h('div', { class: 'cards' }, items.map(([k, t, d, ico]) =>
        h('a', { class: 'bigcard', href: '#/calc/' + k, onClick: (e) => { e.preventDefault(); navigate('/calc/' + k); } },
          h('span', { class: 'bigcard-ico' }, icon(ico, 28)),
          h('span', { class: 'bigcard-text' }, h('strong', null, t), h('span', { class: 'muted' }, d)),
          icon('right', 20)))),
    ]));
  return { el: s.el };
}

/* ---------- Pizza ---------- */

const PIZZA_FLOURS = Object.freeze({
  'pizzeria-blue': { label: 'Caputo 00 Blue · Pizzeria', short: 'Pizzeria', protein: 12.5, wMin: 260, wMax: 280, hydration: 63, hMin: 60, hMax: 65, why: 'Mąka o średniej sile do klasycznej pizzy neapolitańskiej. Zacznij od umiarkowanej hydracji; dłuższy czas i chłodniejsza fermentacja wymagają spokojnego prowadzenia ciasta.', url: 'https://www.mulinocaputo.it/en/products/pizzeria/' },
  'saccorosso': { label: 'Caputo 00 Red · Saccorosso', short: 'Saccorosso', protein: 13, wMin: 300, wMax: 320, hydration: 66, hMin: 64, hMax: 70, why: 'Mocniejsza mąka lepiej znosi dłuższe dojrzewanie. Nie zwiększaj wody tylko z powodu wyższego W — obserwuj, jak konkretna partia ją wchłania.', url: 'https://www.mulinocaputo.it/en/products/saccorosso-5kg/' },
  nuvola: { label: 'Caputo Nuvola', short: 'Nuvola', protein: 12.5, wMin: 270, wMax: 290, hydration: 70, hMin: 68, hMax: 75, why: 'Nuvola jest przeznaczona do lekkich, obszernych rantów i dużych pęcherzy. Wyższa hydracja jest punktem wyjścia, a nie gwarancją — technika mieszania i temperatura mają znaczenie.', url: 'https://www.mulinocaputo.it/en/products/nuvola/' },
  'nuvola-super': { label: 'Caputo Nuvola Super', short: 'Nuvola Super', protein: 13.5, wMin: 320, wMax: 340, hydration: 74, hMin: 70, hMax: 78, why: 'Mocna mąka daje większy margines przy długim dojrzewaniu i wyższej hydracji, ale wysokie W nie wymaga automatycznie większej ilości wody.', url: 'https://www.mulinocaputo.it/en/products/super-cloud/' },
});

const PIZZA_STYLES = Object.freeze({
  neapolitan: { label: 'Neapolitańska', hydration: 63, hydrationMin: 60, hydrationMax: 67, salt: 2.8, oil: 0, note: 'Miękkie ciasto, lekkie ranty, krótki wypiek w bardzo wysokiej temperaturze.' },
  classic: { label: 'Klasyczna', hydration: 64, hydrationMin: 58, hydrationMax: 68, salt: 2.7, oil: 1, note: 'Bardziej zwarte i łatwe w obróbce ciasto; parametry zależą od stylu i temperatury pieca.' },
  romana: { label: 'Rzymska · tonda', hydration: 67, hydrationMin: 62, hydrationMax: 72, salt: 2.8, oil: 2, note: 'Cienki, kruchy spód; umiarkowana hydracja i niewielki dodatek oliwy.' },
  teglia: { label: 'Na blasze · teglia', hydration: 78, hydrationMin: 70, hydrationMax: 85, salt: 2.5, oil: 3, note: 'Wysoka hydracja, mocna mąka, dłuższe dojrzewanie i wypiek na dobrze natłuszczonej blasze.' },
});

function pizzaCalculator() {
  // Zachowujemy dotychczasowe klucze calc:pizza (flour, flourType, balls,
  // ballWeight itd.), aby aktualizacja nie resetowała ustawień na urządzeniu.
  const { st, save, ready } = memo('pizza', {
    mode: 'balls', flour: 7500, flourType: 'pizzeria-blue', flourBlend: null,
    balls: 4, ballWeight: 250, hydration: 65, salt: 3, oil: 0, yeast: 0.2,
    yeastType: 'fresh', leavenType: 'yeast', starterPct: 0.65, starterWaterGrams: null, style: 'neapolitan', calcMode: 'hybrid', temp: 20, hours: 24,
    fermentationMode: 'single', roomHours: 7, roomTemp: 20, fridgeTemp: 4,
  });
  const out = h('div', { class: 'results' });
  const form = h('div', { class: 'stack' });
  st.flourType = PIZZA_FLOURS[st.flourType] ? st.flourType : 'pizzeria-blue';
  st.style = PIZZA_STYLES[st.style] ? st.style : 'neapolitan';
  st.calcMode = ['auto', 'manual'].includes(st.calcMode) ? st.calcMode : 'hybrid';
  st.fermentationMode = st.fermentationMode === 'split' ? 'split' : 'single';
  const s = calcScreen('Pizza i ciasto', form, out);
  let suggestionHost = null;

  function normalizedBlend() {
    let rows = Array.isArray(st.flourBlend) ? st.flourBlend : [];
    rows = rows.map((row) => ({
      type: PIZZA_FLOURS[row && row.type] ? row.type : (PIZZA_FLOURS[st.flourType] ? st.flourType : 'pizzeria-blue'),
      parts: Math.max(1, Number(row && row.parts) || 1),
    }));
    if (!rows.length) rows = [{ type: st.flourType, parts: 100 }];
    const total = rows.reduce((acc, row) => acc + row.parts, 0);
    return rows.map((row) => ({ ...row, pct: total > 0 ? row.parts / total * 100 : 100 / rows.length }));
  }

  function blendProfile() {
    const blend = normalizedBlend();
    const sumWeighted = (key) => blend.reduce((acc, row) => acc + PIZZA_FLOURS[row.type][key] * row.pct / 100, 0);
    const labels = blend.map((row) => PIZZA_FLOURS[row.type].short + ' ' + fmtNum(row.pct, 1) + '%');
    return {
      blend,
      label: labels.join(' + '),
      protein: sumWeighted('protein'),
      wMin: sumWeighted('wMin'),
      wMax: sumWeighted('wMax'),
      hydration: sumWeighted('hydration'),
      hMin: sumWeighted('hMin'),
      hMax: sumWeighted('hMax'),
      why: blend.length === 1
        ? PIZZA_FLOURS[blend[0].type].why
        : 'Parametry mieszanki są średnią ważoną udziałem każdej mąki. To punkt startowy — rzeczywista chłonność i siła ciasta zależą też od partii mąki, temperatury oraz sposobu wyrabiania.',
    };
  }

  function flourStockKey(item) {
    const name = norm([item.name, ...(item.aliases || [])].join(' ')).replace(/[^a-z0-9]+/g, ' ').trim();
    if (name.includes('nuvola super') || name.includes('super nuvola')) return 'nuvola-super';
    if (name.includes('saccorosso') || name.includes('00 red') || name.includes('caputo red')) return 'saccorosso';
    if (name.includes('nuvola')) return 'nuvola';
    if (name.includes('00 blue') || name.includes('caputo blue') ||
        name.includes('pizzeria caputo') || name.includes('caputo pizzeria')) return 'pizzeria-blue';
    return '';
  }

  function gramsLabel(value) {
    const grams = Math.max(0, Number(value) || 0);
    return grams >= 1000 ? fmtNum(grams / 1000, 2) + ' kg' : fmtNum(grams, 0) + ' g';
  }

  function flourStockAdvice(profile, flourAmount) {
    if (!inventoryLoaded()) return null;
    const stock = new Map();
    let ambiguous00 = false;
    inventoryItems().filter((item) => item.stock > 0 && item.unit === 'g').forEach((item) => {
      const type = flourStockKey(item);
      if (type) {
        if (!stock.has(type)) stock.set(type, []);
        stock.get(type).push(item);
      } else {
        const name = norm(item.name).toLowerCase();
        if (name.includes('maka') && name.includes('00')) ambiguous00 = true;
      }
    });
    const known = [...stock.entries()];
    if (!known.length) {
      return h('p', { class: 'muted small' }, ambiguous00
        ? 'W magazynie jest mąka „00”, ale bez marki lub typu nie da się dobrać jej siły. Dopisz np. Caputo Pizzeria, Saccorosso albo Nuvola.'
        : 'Nie widzę rozpoznanej mąki do pizzy w magazynie. Dodaj ją pod nazwą z marką i typem, aby zobaczyć zapas i przewidywane zużycie.');
    }
    const partsTotal = profile.blend.reduce((sum, row) => sum + row.parts, 0);
    return h('div', { class: 'stack flour-stock-advice' },
      h('strong', null, 'Mąki z Twojego magazynu'),
      ...known.map(([type, items]) => {
        const flour = PIZZA_FLOURS[type];
        const amount = items.reduce((sum, item) => sum + item.stock, 0);
        const current = profile.blend.find((row) => row.type === type);
        const names = items.map((item) => item.name).join(', ');
        if (current) {
          const needed = flourAmount * current.pct / 100;
          const difference = amount - needed;
          return h('p', { class: 'muted small' }, flour.short + ': na stanie ' + gramsLabel(amount) +
            ' (' + names + '). Mieszanka zużyje ok. ' + gramsLabel(needed) +
            (difference >= 0
              ? '; zostanie ok. ' + gramsLabel(difference) + '.'
              : '; brakuje ok. ' + gramsLabel(-difference) + '.'));
        }
        const pct = Math.min(20, flourAmount > 0 ? amount / flourAmount * 100 : 20);
        const minimumShare = 100 / (partsTotal + 1);
        const canAdd = pct >= minimumShare;
        const share = canAdd ? pct : minimumShare;
        const newParts = partsTotal * share / (100 - share);
        return h('div', { class: 'stack' },
          h('p', { class: 'muted small' }, 'Masz ' + flour.short + ': ' + gramsLabel(amount) +
            ' (' + names + '). ' + (canAdd
              ? 'Możesz wykorzystać ją jako ' + fmtNum(share, 1) + '% mieszanki.'
              : 'To za mały zapas, by dodać go w obecnych proporcjach mieszanki.')),
          canAdd ? button('Dodaj do mieszanki · ' + fmtNum(share, 1) + '%', { sm: true, kind: 'ghost', onClick: () => {
            const next = normalizedBlend().map(({ type: key, parts }) => ({ type: key, parts }));
            if (next.some((row) => row.type === type)) return;
            next.push({ type, parts: newParts });
            st.flourBlend = next;
            st.flourType = next[0].type;
            syncAutoParameters(); save(); build(); paintOut();
          } }) : null);
      }));
  }

  function processAdvice(profile) {
    const hydration = Number(st.hydration) || 0;
    const hydrationText = hydration < profile.hMin
      ? 'Hydracja ' + fmtNum(hydration, 1) + '% jest poniżej orientacyjnego zakresu ' +
        fmtNum(profile.hMin, 1) + '–' + fmtNum(profile.hMax, 1) +
        '%. Ciasto będzie sztywniejsze i łatwiejsze do formowania; wodę możesz zwiększać stopniowo.'
      : hydration > profile.hMax
        ? 'Hydracja ' + fmtNum(hydration, 1) + '% przekracza orientacyjny zakres ' +
          fmtNum(profile.hMin, 1) + '–' + fmtNum(profile.hMax, 1) +
          '%. Dodawaj wodę etapami i oceń, czy mąka ją wchłania, zanim dolejesz całość.'
        : 'Hydracja ' + fmtNum(hydration, 1) + '% mieści się w orientacyjnym zakresie ' +
          fmtNum(profile.hMin, 1) + '–' + fmtNum(profile.hMax, 1) +
          '% dla tej mieszanki. Wyższa hydracja daje luźniejsze ciasto, ale chłonność zależy też od partii i wyrabiania.';
    const hours = fermentationHours();
    let fermentationText;
    if (st.fermentationMode === 'split' || hours >= 36) {
      fermentationText = profile.wMax < 300
        ? 'Przy długim dojrzewaniu obecna mieszanka ma umiarkowaną siłę (W ok. ' +
          Math.round(profile.wMin) + '–' + Math.round(profile.wMax) +
          '). Obserwuj napięcie ciasta; jeśli słabnie, zwiększ udział Saccorosso lub Nuvola Super albo skróć etap w cieple.'
        : 'Mocniejsza mieszanka (W ok. ' + Math.round(profile.wMin) + '–' + Math.round(profile.wMax) +
          ') daje większy margines przy długim dojrzewaniu. Tempo nadal zależy od temperatury ciasta i ilości drożdży.';
    } else {
      fermentationText = 'Dobór czasu i drożdży kontroluje tempo fermentacji; sama zawartość białka nie wyznacza czasu dojrzewania. W jest wskazówką siły, a hydracja opisuje udział wody.';
    }
    return [hydrationText, fermentationText];
  }

  function autoParameters(profile = blendProfile()) {
    const style = PIZZA_STYLES[st.style] || PIZZA_STYLES.neapolitan;
    const hydration = Math.max(0, Math.min(style.hydration, profile.hMax));
    let yeast = Number(st.yeast) || 0;
    if (st.leavenType !== 'starter') {
      let hours = Math.max(1, Number(st.hours) || 24);
      let temp = Number(st.temp) || 20;
      if (st.fermentationMode === 'split') {
        const equivalent = Math.max(1,
          (Number(st.roomHours) || 0) * Math.pow(2, ((Number(st.roomTemp) || 20) - 20) / 10) +
          48 * Math.pow(2, ((Number(st.fridgeTemp) || 4) - 20) / 10));
        hours = equivalent; temp = 20;
      }
      const base = yeastSuggestion(temp, hours);
      yeast = base == null ? yeast : base * (YEAST_TYPES[st.yeastType] || YEAST_TYPES.fresh).f;
    }
    return { hydration, salt: style.salt, oil: style.oil, yeast, style };
  }

  function syncAutoParameters() {
    if (st.calcMode !== 'auto') return;
    const p = autoParameters();
    st.hydration = p.hydration;
    st.salt = p.salt;
    st.oil = p.oil;
    if (st.leavenType !== 'starter') st.yeast = Math.round(p.yeast * 100) / 100;
  }

  function applyAutoParameters() {
    const p = autoParameters();
    st.hydration = p.hydration;
    st.salt = p.salt;
    st.oil = p.oil;
    if (st.leavenType !== 'starter') st.yeast = Math.round(p.yeast * 100) / 100;
    save(); build(); paintOut(); paintSuggestion();
  }

  function fermentationSummary() {
    if (st.fermentationMode === 'split') {
      return fmtNum(st.roomHours, 1) + ' h wstępnie w ' + fmtNum(st.roomTemp, 1) + ' °C + 48 h w lodówce (ok. ' + fmtNum(st.fridgeTemp, 1) + ' °C)';
    }
    return fmtNum(st.hours, 1) + ' h w ' + fmtNum(st.temp, 1) + ' °C';
  }

  function fermentationHours() {
    return st.fermentationMode === 'split'
      ? Math.max(0, Number(st.roomHours) || 0) + 48
      : Math.max(0, Number(st.hours) || 0);
  }

  function compute() {
    const sourdough = st.leavenType === 'starter';
    const opts = {
      hydration: st.hydration,
      salt: st.salt,
      oil: st.oil,
      yeast: sourdough ? 0 : st.yeast,
      starter: sourdough ? Math.min(1, Math.max(0, Number(st.starterPct) || 0)) : 0,
      starterWater: sourdough && st.starterWaterGrams != null ? Math.max(0, Number(st.starterWaterGrams) || 0) : null,
    };
    return st.mode === 'flour'
      ? pizzaCalcFromFlour({ flour: st.flour || 0, ...opts, ballWeight: st.ballWeight || 0 })
      : pizzaCalc({ balls: st.balls || 0, ballWeight: st.ballWeight || 0, ...opts });
  }

  function paintOut() {
    const r = compute();
    if (st.leavenType === 'starter' && (!r.starterValid || !r.massBalanceValid)) {
      out.replaceChildren(h('p', { class: 'muted pad' },
        'Za mało wody w stosunku do zakwasu 1:1:2. Zwiększ hydrację albo zmniejsz procent zakwasu macierzystego.'));
      return;
    }
    const ok = r.total > 0 && Number.isFinite(r.flour);
    if (!ok) {
      out.replaceChildren(h('p', { class: 'muted pad' },
        st.mode === 'flour' ? 'Wpisz ilość mąki w gramach.' : 'Wpisz liczbę kulek i wagę kulki.'));
      return;
    }
    const sourdough = st.leavenType === 'starter';
    const yeast = YEAST_TYPES[st.yeastType] || YEAST_TYPES.fresh;
    const profile = blendProfile();
    const flourParts = profile.blend.map((row) =>
      PIZZA_FLOURS[row.type].short + ' ' + fmtNum(row.pct, 1) + '% (' +
      fmtAmount((sourdough ? r.doughFlour : r.flour) * row.pct / 100) + ' g)').join(' · ');
    const hydrationHint = fmtNum(autoParameters(profile).hydration, 1);
    out.replaceChildren(
      h('div', { class: 'results-grid' },
        result(sourdough ? 'Mąka do ciasta' : 'Mąka', fmtAmount(sourdough ? r.doughFlour : r.flour), 'g', 'big'),
        result(sourdough ? 'Woda do ciasta' : 'Woda', fmtAmount(sourdough ? r.doughWater : r.water), 'g', 'big'),
        result('Sól', fmtAmount(r.salt), 'g'),
        sourdough ? result('Zakwas macierzysty', fmtAmount(r.starterSeed), 'g') : result('Drożdże ' + yeast.label, fmtNum(r.yeast, 2), 'g'),
        sourdough ? result('Mąka do zakwasu', fmtAmount(r.starterFlour), 'g') : null,
        sourdough ? result('Woda do zakwasu', fmtAmount(r.starterWater), 'g') : null,
        sourdough ? result('Aktywny zakwas łącznie', fmtAmount(r.starter), 'g') : null,
        st.oil > 0 ? result('Oliwa', fmtAmount(r.oil), 'g') : null,
        result('Masa całkowita', fmtAmount(r.total), 'g', 'total')),
      h('p', { class: 'muted small' }, st.mode === 'flour'
        ? 'Z ' + fmtAmount(r.flour) + ' g łącznej mąki · ok. ' + r.ballCount + ' kulek po ' + fmtAmount(st.ballWeight) + ' g' +
          (r.remainder > 0 ? ' + ' + fmtAmount(r.remainder) + ' g reszty' : '') +
          ' · suma procentów ' + fmtNum(r.pctSum, 2) + '% (mąka = 100%)'
        : st.balls + ' × ' + fmtAmount(st.ballWeight) + ' g · suma procentów ' + fmtNum(r.pctSum, 2) + '% (mąka = 100%)'),
      h('section', { class: 'card stack flour-advice' },
        h('strong', null, 'Profil: ' + (PIZZA_STYLES[st.style] || PIZZA_STYLES.neapolitan).label),
        h('p', { class: 'muted small' }, (PIZZA_STYLES[st.style] || PIZZA_STYLES.neapolitan).note),
        h('p', { class: 'muted small' }, 'Automat proponuje hydrację ' + fmtNum(autoParameters(profile).hydration, 1) +
          '%, sól ' + fmtNum(autoParameters(profile).salt, 1) + '% i oliwę ' + fmtNum(autoParameters(profile).oil, 1) +
          '%. Możesz zastosować propozycję, a potem ręcznie zmienić dowolną wartość.'),
        button('Zastosuj parametry automatu', { sm: true, kind: 'ghost', onClick: applyAutoParameters }),

        h('div', { class: 'row between wrap' },
          h('strong', null, profile.label),
          h('span', { class: 'muted small' }, 'W ' + Math.round(profile.wMin) + '–' + Math.round(profile.wMax) +
            ' · białko ' + fmtNum(profile.protein, 1) + '%')),
        h('p', { class: 'muted small' }, 'W ' + Math.round(profile.wMin) + '–' + Math.round(profile.wMax) +
          ' i białko ' + fmtNum(profile.protein, 1) + '% to orientacyjna średnia ważona mieszanki.'),
        h('p', { class: 'muted small' }, 'Propozycja startowa: ' + hydrationHint + '% hydracji (zakres orientacyjny ' +
          fmtNum(profile.hMin, 1) + '–' + fmtNum(profile.hMax, 1) + '%). Twoje ustawienie: ' +
          fmtNum(st.hydration, 1) + '%.'),
        Math.abs(Number(st.hydration) - profile.hydration) > 0.05
          ? button('Ustaw hydrację ' + hydrationHint + '%', { sm: true, onClick: () => {
            st.hydration = autoParameters(profile).hydration; save(); build(); paintOut();
          } })
          : null,
        h('p', { class: 'muted small' }, profile.why),
        ...processAdvice(profile).map((text) => h('p', { class: 'muted small' }, text)),
        flourStockAdvice(profile, sourdough ? r.doughFlour : r.flour),
        h('p', { class: 'muted small' }, 'Udział w mące do ciasta: ' + flourParts),
        ...profile.blend.map((row) => h('a', {
          href: PIZZA_FLOURS[row.type].url, target: '_blank', rel: 'noopener noreferrer',
        }, 'Parametry ' + PIZZA_FLOURS[row.type].label + ' u producenta ↗'))),
      sourdough ? h('p', { class: 'muted small' },
        fmtAmount(r.starterSeed) + ' g zakwasu macierzystego + ' + fmtAmount(r.starterFlour) +
        ' g świeżej mąki + ' + fmtAmount(r.starterWater) + ' g świeżej wody = ' + fmtAmount(r.starter) +
        ' g aktywnego zakwasu (1:1:2). W bilansie uwzględniono też ' +
        fmtAmount(r.starterFlourContribution) + ' g całkowitej mąki i ' +
        fmtAmount(r.starterWaterContribution) + ' g całkowitej wody z zakwasu.') : null,
      h('div', { class: 'row wrap gap' },
        button('Zapisz jako recepturę', { icon: 'plus', kind: 'primary', onClick: () => saveAsRecipe(r) }),
        button('Do zakupów', { icon: 'cart', onClick: async () => {
          const flourToBuy = sourdough ? r.doughFlour : r.flour;
          const items = profile.blend.map((row) => ({
            name: PIZZA_FLOURS[row.type].label,
            amount: Math.round(flourToBuy * row.pct / 100),
            unit: 'g',
          }));
          if (sourdough && r.starterFlour > 0) items.push({ name: 'Mąka pszenna do zakwasu', amount: Math.round(r.starterFlour), unit: 'g' });
          items.push({ name: 'Sól', amount: Math.round(r.salt * 10) / 10, unit: 'g' });
          if (!sourdough) items.push({ name: 'Drożdże ' + yeast.label, amount: Math.round(r.yeast * 100) / 100, unit: 'g' });
          if (r.oil > 0) items.push({ name: 'Oliwa', amount: Math.round(r.oil), unit: 'g' });
          await addItems(items);
          toast('Dodano do zakupów', { action: { label: 'Pokaż', fn: () => navigate('/shopping') } });
        } })));
  }

  async function saveAsRecipe(r) {
    const sourdough = st.leavenType === 'starter';
    const yeast = YEAST_TYPES[st.yeastType] || YEAST_TYPES.fresh;
    const profile = blendProfile();
    const I = (name, amount, unit, extra = {}) => blankIngredient({ name, amount, unit, ...extra });
    const r1 = (v) => Math.round(v * 10) / 10;
    const doughFlour = sourdough ? r.doughFlour : r.flour;
    const doughWater = sourdough ? r.doughWater : r.water;
    const ings = profile.blend.map((row) => I(
      PIZZA_FLOURS[row.type].label,
      r1(doughFlour * row.pct / 100),
      'g',
      { flour: true, percent: r.flour > 0 ? doughFlour / r.flour * row.pct : row.pct },
    ));
    ings.push(
      I('Woda', r1(doughWater), 'g', { percent: r.flour > 0 ? doughWater / r.flour * 100 : st.hydration }),
      I('Sól', r1(r.salt), 'g', { percent: st.salt }),
    );
    if (sourdough) {
      ings.push(
        I('Mąka z zakwasu macierzystego', r1(r.starterSeed / 2), 'g', { flour: true, percent: r.flour > 0 ? (r.starterSeed / 2) / r.flour * 100 : 0 }),
        I('Woda z zakwasu macierzystego', r1(r.starterSeed / 2), 'g', { percent: r.flour > 0 ? (r.starterSeed / 2) / r.flour * 100 : 0 }),
        I('Mąka do dokarmienia zakwasu', r1(r.starterFlour), 'g', { flour: true, percent: r.flour > 0 ? r.starterFlour / r.flour * 100 : 0 }),
        I('Woda do dokarmienia zakwasu', r1(r.starterWater), 'g', { percent: r.flour > 0 ? r.starterWater / r.flour * 100 : 0 }),
      );
    }
    if (st.oil > 0) ings.push(I('Oliwa', r1(r.oil), 'g', { percent: st.oil }));
    if (!sourdough) ings.push(I('Drożdże ' + yeast.label, Math.round(r.yeast * 100) / 100, 'g', { percent: st.yeast }));
    const sec = blankSection('CIASTO'); sec.ingredients = ings;
    const portions = st.mode === 'flour' ? Math.max(1, r.ballCount) : Math.max(1, Math.floor(Number(st.balls) || 0));
    const portionStep = st.mode === 'flour'
      ? 'Podziel orientacyjnie na ' + r.ballCount + ' kulek po ' + fmtAmount(st.ballWeight) + ' g' +
        (r.remainder > 0 ? '; pozostanie ' + fmtAmount(r.remainder) + ' g ciasta' : '') + '.'
      : 'Podziel na ' + st.balls + ' kulek po ' + fmtAmount(st.ballWeight) + ' g.';
    const steps = sourdough ? [
      blankStep('Przygotuj aktywny zakwas 1:1:2: ' + fmtAmount(r.starterSeed) + ' g zakwasu macierzystego, ' +
        fmtAmount(r.starterFlour) + ' g mąki i ' + fmtAmount(r.starterWater) + ' g wody.'),
      blankStep('Pozostaw zakwas do szczytu aktywności.'),
      blankStep('Połącz mąki do ciasta z wodą, solą i oliwą; dodaj przygotowany aktywny zakwas. Wyrabiaj do uzyskania gładkiego ciasta.'),
    ] : [
      blankStep('Rozpuść sól w wodzie, dodaj drożdże.'),
      blankStep('Połącz wybrane mąki z wodą i wyrabiaj do uzyskania gładkiego, elastycznego ciasta.'),
    ];
    if (st.fermentationMode === 'split') {
      steps.push(blankStep('Fermentuj wstępnie masę przez ' + fmtNum(st.roomHours, 1) + ' h w temperaturze pokojowej (' +
        fmtNum(st.roomTemp, 1) + ' °C).'));
      steps.push(blankStep(portionStep));
      steps.push(blankStep('Uformowane kulki fermentuj na zimno przez 48 h w lodówce (około ' +
        fmtNum(st.fridgeTemp, 1) + ' °C).'));
    } else {
      steps.push(blankStep(portionStep));
      steps.push(blankStep('Fermentuj ok. ' + fmtNum(st.hours, 1) + ' h w ' + fmtNum(st.temp, 1) + ' °C.'));
    }
    const fermentTotal = fermentationHours();
    const fermentLabel = fermentationSummary();
    const blendLabel = profile.blend.map((row) => PIZZA_FLOURS[row.type].label + ' ' + fmtNum(row.pct, 1) + '%').join(' + ');
    const baseDesc = 'Mąki: ' + blendLabel + '. Hydracja ' + st.hydration + '%, sól ' + st.salt + '%' +
      (st.oil ? ', oliwa ' + st.oil + '%' : '') + '. Fermentacja: ' + fermentLabel + '.';
    const rec = blankRecipe({
      name: 'Ciasto na pizzę (' + (st.mode === 'flour'
        ? fmtAmount(r.flour) + ' g mąki'
        : st.balls + ' × ' + fmtAmount(st.ballWeight) + ' g') + ')',
      category: 'cat-pizza', servings: portions, yieldAmount: Math.round(r.total), yieldUnit: 'g',
      fermentTime: Math.round(fermentTotal * 60), temperature: 'Fermentacja: ' + fermentLabel,
      bakers: true, sections: [sec],
      description: sourdough
        ? baseDesc + ' Aktywny zakwas 1:1:2, zakwas macierzysty ' + st.starterPct + '% mąki.'
        : baseDesc + ' Drożdże ' + st.yeast + '%.',
      tags: ['ciasto', 'kalkulator'],
      steps,
    });
    const saved = await saveRecipe(rec);
    toast('Zapisano recepturę', { action: { label: 'Otwórz', fn: () => navigate('/recipe/' + saved.id) } });
  }

  function paintSuggestion() {
    if (!suggestionHost) return;
    let sug;
    let label;
    if (st.fermentationMode === 'split') {
      const room = Math.max(0, Number(st.roomHours) || 0);
      const roomTemp = Number(st.roomTemp) || 20;
      const fridgeTemp = Number(st.fridgeTemp) || 4;
      const equivalent = room * Math.pow(2, (roomTemp - 20) / 10) + 48 * Math.pow(2, (fridgeTemp - 20) / 10);
      sug = yeastSuggestion(20, equivalent);
      label = 'Orientacyjnie dla ' + fmtNum(room, 1) + ' h w ' + fmtNum(roomTemp, 1) +
        ' °C + 48 h w lodówce (' + fmtNum(fridgeTemp, 1) + ' °C; ok. ' +
        fmtNum(equivalent, 1) + ' h równoważnych w 20 °C): ';
    } else {
      sug = yeastSuggestion(st.temp, st.hours);
      label = 'Orientacyjnie dla ' + fmtNum(st.temp, 1) + ' °C i ' + fmtNum(st.hours, 1) + ' h: ';
    }
    if (sug == null || st.leavenType === 'starter') { suggestionHost.replaceChildren(); return; }
    const yeast = YEAST_TYPES[st.yeastType] || YEAST_TYPES.fresh;
    suggestionHost.replaceChildren(h('div', { class: 'suggest' },
      h('span', null, label, h('strong', { class: 'num' }, fmtNum(sug * yeast.f, 2) + '%'), ' (' + yeast.label + ')'),
      button('Użyj', { sm: true, onClick: () => {
        st.yeast = Math.round(sug * yeast.f * 100) / 100;
        save(); paintOut(); paintSuggestion();
      } })));
  }

  function flourBlendEditor() {
    const holder = h('section', { class: 'card stack flour-blend-editor' });
    const summary = h('p', { class: 'muted small' });
    const paintSummary = () => {
      const profile = blendProfile();
      summary.textContent = 'Wyliczony udział: ' + profile.blend.map((row) =>
        PIZZA_FLOURS[row.type].short + ' ' + fmtNum(row.pct, 1) + '%').join(' · ') +
        ' (łącznie 100%). Proporcje wpisujesz w częściach.';
    };
    const rowsHost = h('div', { class: 'stack' });
    const rebuildRows = () => {
      const rows = normalizedBlend();
      rowsHost.replaceChildren(...rows.map((row, index) => {
        const usedByOthers = new Set(rows.filter((_, otherIndex) => otherIndex !== index).map((other) => other.type));
        const flourSelect = selectEl(Object.entries(PIZZA_FLOURS)
          .filter(([key]) => key === row.type || !usedByOthers.has(key))
          .map(([key, item]) => [key, item.label]), row.type, (value) => {
            const next = normalizedBlend().map(({ type, parts }) => ({ type, parts }));
            next[index] = { ...next[index], type: value };
            st.flourBlend = next;
            st.flourType = next[0].type;
            save(); build(); paintOut();
          }, { label: 'Mąka ' + (index + 1) });
        const partsInput = numInput({
          value: row.parts, label: 'Części mąki ' + (index + 1), dec: 1,
          onInput: (value) => {
            if (!(Number(value) > 0)) return;
            const next = normalizedBlend().map(({ type, parts }) => ({ type, parts }));
            next[index] = { ...next[index], parts: Number(value) };
            st.flourBlend = next;
            st.flourType = next[0].type;
            save(); paintSummary(); paintOut();
          },
        });
        return h('div', { class: 'card stack flour-blend-row' },
          h('div', { class: 'row gap' },
            col(field('Mąka ' + (index + 1), flourSelect)),
            col(field('Części', partsInput))),
          rows.length > 1 ? button('Usuń tę mąkę', { sm: true, kind: 'ghost', onClick: () => {
            st.flourBlend = normalizedBlend().filter((_, removeIndex) => removeIndex !== index)
              .map(({ type, parts }) => ({ type, parts }));
            st.flourType = st.flourBlend[0].type;
            syncAutoParameters(); save(); build(); paintOut();
          } }) : null);
      }));
      paintSummary();
    };
    const used = new Set(normalizedBlend().map((row) => row.type));
    const unused = Object.keys(PIZZA_FLOURS).find((key) => !used.has(key));
    holder.append(
      h('h2', { class: 'card-title' }, icon('pizza', 20), 'Mieszanka mąk'),
      h('p', { class: 'muted small' }, 'Dodaj różne mąki i ustaw ich części, np. 70 części Pizzeria + 30 części Nuvola. Kalkulator przelicza proporcje na udział procentowy.'),
      rowsHost,
      unused ? button('Dodaj kolejną mąkę · 20% na start', { icon: 'plus', kind: 'ghost', onClick: () => {
        const next = normalizedBlend().map(({ type, parts }) => ({ type, parts }));
        const partsTotal = next.reduce((sum, row) => sum + row.parts, 0);
        next.push({ type: unused, parts: partsTotal / 4 });
        st.flourBlend = next;
        st.flourType = next[0].type;
        save(); build(); paintOut();
      } }) : null,
      summary);
    rebuildRows();
    return holder;
  }

  function build() {
    const upd = (key) => (value) => { st[key] = value; save(); paintOut(); };
    const chips = (key, values, suffix = '') => h('div', { class: 'chips wrap' }, values.map((value) => h('button', {
      type: 'button', class: 'chip' + (st[key] === value ? ' on' : ''),
      onClick: () => { st[key] = value; save(); build(); paintOut(); paintSuggestion(); },
    }, String(value).replace('.', ',') + suffix)));
    suggestionHost = h('div', { class: 'suggestion-host' });
    form.replaceChildren(
      h('section', { class: 'card stack' },
        field('Rodzaj pizzy', selectEl(Object.entries(PIZZA_STYLES).map(([key, item]) => [key, item.label]), st.style, (value) => {
          st.style = value; save();
          if (st.calcMode === 'auto') applyAutoParameters();
          else { build(); paintOut(); }
        })),
        segmented([['auto', 'Automat'], ['hybrid', 'Automat + ręcznie'], ['manual', 'Ręcznie']], st.calcMode, (value) => {
          st.calcMode = value; if (value === 'auto') syncAutoParameters(); save();
          if (value === 'auto') applyAutoParameters();
          else { build(); paintOut(); }
        }, { label: 'Sposób doboru parametrów' }),
        segmented([['balls', 'Na kulki'], ['flour', 'Mam mąkę']], st.mode, (value) => {
          st.mode = value; save(); build(); paintOut();
        }, { label: 'Sposób obliczania' }),
        st.mode === 'flour'
          ? h('div', { class: 'stack' },
            (() => {
              const range = h('input', { type: 'range', min: 250, max: 10000, step: 50, value: Math.min(10000, Math.max(250, st.flour)), class: 'range', 'aria-label': 'Ilość mąki — suwak' });
              const amount = numInput({ value: st.flour, label: 'Ilość mąki (g)', dec: 0, onInput: (value) => {
                if (value == null) return;
                st.flour = value; range.value = String(Math.min(10000, Math.max(250, value))); save(); paintOut();
              } });
              range.addEventListener('input', () => {
                st.flour = Number(range.value); amount.value = String(st.flour); amount.classList.remove('invalid'); save(); paintOut();
              });
              return h('div', { class: 'flour-amount-controls' }, field('Całkowita mąka (g) — razem z zakwasem', amount), range);
            })())
          : h('div', { class: 'stack' },
            h('div', { class: 'row gap' },
              col(field('Liczba kulek', numInput({ value: st.balls, label: 'Liczba kulek', dec: 0, onInput: upd('balls') }))),
              col(field('Waga kulki (g)', numInput({ value: st.ballWeight, label: 'Waga kulki', dec: 1, onInput: upd('ballWeight') })))),
            chips('ballWeight', [200, 250, 280, 320, 350], ' g'))),
      flourBlendEditor(),
      h('section', { class: 'card stack' },
        h('div', { class: 'row gap' },
          col((() => {
            const range = h('input', { type: 'range', min: 50, max: 85, step: 1, value: st.hydration, class: 'range', 'aria-label': 'Hydracja — suwak' });
            const amount = numInput({ value: st.hydration, label: 'Hydracja (%) — wpisz lub przesuń suwak', dec: 1, onInput: (value) => {
              if (value == null) return;
              st.hydration = value; range.value = String(Math.min(85, Math.max(50, value))); save(); paintOut();
            } });
            range.addEventListener('input', () => {
              st.hydration = Number(range.value); amount.value = String(st.hydration); amount.classList.remove('invalid'); save(); paintOut();
            });
            return field('Hydracja %', h('div', { class: 'flour-amount-controls' }, amount, range));
          })()),
          col(field('Sól %', numInput({ value: st.salt, label: 'Sól', dec: 2, onInput: upd('salt') })))),
        chips('hydration', [60, 62, 65, 70, 75], '%'),
        field('Oliwa % (opcjonalnie)', numInput({ value: st.oil, label: 'Oliwa', dec: 2, onInput: upd('oil') }))),
      h('section', { class: 'card stack' },
        h('h2', { class: 'card-title' }, icon('thermo', 20), 'Drożdże i fermentacja'),
        segmented([['single', 'Jeden etap'], ['split', 'Wstępna + zimna']], st.fermentationMode, (value) => {
          st.fermentationMode = value; syncAutoParameters(); save(); build(); paintOut(); paintSuggestion();
        }, { label: 'Schemat fermentacji' }),
        st.fermentationMode === 'split'
          ? h('div', { class: 'stack' },
            h('div', { class: 'row gap' },
              col(field('Wstępna (godz.)', numInput({ value: st.roomHours, label: 'Fermentacja wstępna w godzinach', dec: 1, onInput: (value) => {
                st.roomHours = value; syncAutoParameters(); save(); paintOut(); paintSuggestion();
              } }))),
              col(field('Temperatura pokoju (°C)', numInput({ value: st.roomTemp, label: 'Temperatura fermentacji wstępnej', dec: 1, onInput: (value) => {
                st.roomTemp = value; syncAutoParameters(); save(); paintOut(); paintSuggestion();
              } })))),
            chips('roomHours', [6, 7, 8], ' h'),
            h('div', { class: 'fermentation-track card' },
              h('strong', null, 'WSTĘPNA · ' + fmtNum(st.roomHours, 1) + ' h · ' + fmtNum(st.roomTemp, 1) + ' °C'),
              h('span', { class: 'muted small' }, 'Następnie: ZIMNA · 48 h w lodówce · około ' + fmtNum(st.fridgeTemp, 1) + ' °C')),
            h('p', { class: 'muted small' }, 'Punkty startowe: 6, 7 lub 8 godzin w temperaturze pokojowej, potem 48 godzin w lodówce. Rzeczywiste tempo zależy od temperatury ciasta, ilości drożdży i mąki.'))
          : h('div', { class: 'row gap' },
            col(field('Temperatura (°C)', numInput({ value: st.temp, label: 'Temperatura fermentacji', dec: 1, onInput: (value) => {
              st.temp = value; syncAutoParameters(); save(); paintOut(); paintSuggestion();
            } }))),
            col(field('Czas (godz.)', numInput({ value: st.hours, label: 'Czas fermentacji w godzinach', dec: 1, onInput: (value) => {
              st.hours = value; syncAutoParameters(); save(); paintOut(); paintSuggestion();
            } })))),
        field('Rodzaj zaczynu', selectEl([['yeast', 'Drożdże'], ['starter', 'Aktywny zakwas 1:1:2']], st.leavenType, (value) => {
          st.leavenType = value; syncAutoParameters(); save(); build(); paintOut(); paintSuggestion();
        })),
        st.leavenType === 'starter'
          ? h('div', { class: 'stack' },
            field('Woda do dokarmienia zakwasu (g)', numInput({ value: st.starterWaterGrams == null ? compute().starterWater : st.starterWaterGrams, label: 'Woda do zakwasu w gramach', dec: 1, onInput: (value) => {
              st.starterWaterGrams = Math.max(0, Number(value) || 0);
              save(); paintOut();
            } })),
            h('p', { class: 'muted small' }, 'Proporcja zakwas : mąka : woda = 1:1:2. Wpisujesz wodę, którą fizycznie dodasz do zakwasu. Kalkulator wylicza zakwas macierzysty i mąkę do dokarmienia, a ich wodę i mąkę wlicza do hydracji całej receptury.'))
          : h('div', { class: 'row gap' },
            col(field('Rodzaj drożdży', selectEl(Object.entries(YEAST_TYPES).map(([key, value]) => [key, value.label]), st.yeastType, (value) => {
              st.yeastType = value; syncAutoParameters(); save(); build(); paintOut(); paintSuggestion();
            }))),
            col(field('Drożdże %', numInput({ value: st.yeast, label: 'Drożdże procent', dec: 2, onInput: upd('yeast') })))),
        suggestionHost,
        h('p', { class: 'muted small' }, 'Wskazówka ilości drożdży jest orientacyjna — mąka, temperatura ciasta i proces zmieniają tempo dojrzewania.')));
    paintSuggestion();
  }

  ready.then(() => {
    if (!Array.isArray(st.flourBlend) || !st.flourBlend.length) {
      st.flourBlend = [{ type: PIZZA_FLOURS[st.flourType] ? st.flourType : 'pizzeria-blue', parts: 100 }];
    }
    build(); paintOut();
  });
  build(); paintOut();
  return { el: s.el };
}

/* ---------- Procenty ---------- */

function percentCalculator() {
  const { st, save, ready } = memo('percent', { mode: 'of', a: null, b: null });
  const holder = h('div', { class: 'stack' });
  const seg = h('div');
  const s = calcScreen('Procenty', seg, holder);
  const MODES = [['of', 'X% z Y'], ['what', 'Ile %'], ['chg', 'Zmiana'], ['add', '± %']];
  const fm = (v) => fmtNum(v, 4);

  function build() {
    seg.replaceChildren(segmented(MODES, st.mode, (v) => { st.mode = v; save(); build(); }, { label: 'Rodzaj obliczenia' }));
    const out = h('div', { class: 'results' });
    const calc = () => {
      const a = st.a, b = st.b;
      let res = null, text = '';
      if (a != null && b != null) {
        if (st.mode === 'of') { res = (a / 100) * b; text = `${fm(a)}% z ${fm(b)}`; }
        else if (st.mode === 'what') { if (b !== 0) { res = (a / b) * 100; text = `${fm(a)} z ${fm(b)}`; } }
        else if (st.mode === 'chg') { if (a !== 0) { res = ((b - a) / Math.abs(a)) * 100; text = `z ${fm(a)} do ${fm(b)}`; } }
        else { res = a * (1 + b / 100); text = `${fm(a)} ${b >= 0 ? '+' : '−'} ${fm(Math.abs(b))}%`; }
      }
      out.replaceChildren(res == null ? h('p', { class: 'muted pad' }, 'Wpisz obie wartości.') :
        h('div', { class: 'results-grid' }, result(text, fm(res), st.mode === 'what' || st.mode === 'chg' ? '%' : '', 'big total')));
    };
    const labels = {
      of: ['Procent (%)', 'Z liczby'], what: ['Ta liczba', 'Z liczby'], chg: ['Wartość początkowa', 'Wartość końcowa'], add: ['Wartość', 'Dodaj / odejmij (%)'],
    }[st.mode];
    holder.replaceChildren(
      h('section', { class: 'card stack' },
        h('div', { class: 'row gap' },
          col(field(labels[0], numInput({ value: st.a, label: labels[0], dec: 4, onInput: (v) => { st.a = v; save(); calc(); } }))),
          col(field(labels[1], numInput({ value: st.b, label: labels[1], dec: 4, onInput: (v) => { st.b = v; save(); calc(); } })))),
        st.mode === 'add' ? h('p', { class: 'muted small' }, 'Ujemny procent odejmuje (np. −10 to rabat 10%).') : null),
      out);
    calc();
  }
  ready.then(build);
  build();
  return { el: s.el };
}

/* ---------- Wybór receptury ---------- */

function recipeSelect(st, key, onChange) {
  const list = listRecipes().sort((a, b) => a.name.localeCompare(b.name, 'pl'));
  if (!list.find((r) => r.id === st[key])) st[key] = list[0] ? list[0].id : '';
  return selectEl(list.map((r) => [r.id, r.name]), st[key], (v) => { st[key] = v; onChange(v); }, { label: 'Receptura' });
}

/* ---------- Przeliczanie receptury ---------- */

function scaleCalculator() {
  const { st, save, ready } = memo('scale', { id: '', mode: 'servings', servings: null, yAmt: null, yUnit: 'g', ingId: '', ingAmt: null, ingUnit: 'g' });
  const holder = h('div', { class: 'stack' });
  const s = calcScreen('Przeliczanie receptury', holder);

  function build() {
    if (!state.recipes.size) { holder.replaceChildren(emptyState('book', 'Brak receptur', 'Dodaj recepturę, żeby ją przeliczyć.', button('Nowa receptura', { kind: 'primary', onClick: () => navigate('/new') }))); return; }
    const sel = recipeSelect(st, 'id', () => { st.servings = st.yAmt = st.ingAmt = null; st.ingId = ''; save(); build(); });
    const r = getRecipe(st.id);
    const y = effectiveYield(r);
    const ings = allIngredients(r).filter((i) => i.name && i.amount > 0 && i.unit !== '%');
    if (!ings.find((i) => i.id === st.ingId)) { st.ingId = ings[0] ? ings[0].id : ''; st.ingUnit = ings[0] ? ings[0].unit : 'g'; }
    let k = null;
    if (st.mode === 'servings') k = factorFromServings(r, st.servings);
    else if (st.mode === 'yield') k = factorFromYield(r, st.yAmt, st.yUnit);
    else { const ing = ings.find((i) => i.id === st.ingId); k = ing ? factorFromIngredient(ing, st.ingAmt, st.ingUnit) : null; }
    const out = h('div', { class: 'stack' });
    const paintOut = () => {
      let kk = null;
      if (st.mode === 'servings') kk = factorFromServings(r, st.servings);
      else if (st.mode === 'yield') kk = factorFromYield(r, st.yAmt, st.yUnit);
      else { const ing = ings.find((i) => i.id === st.ingId); kk = ing ? factorFromIngredient(ing, st.ingAmt, st.ingUnit) : null; }
      if (!kk) { out.replaceChildren(h('p', { class: 'muted pad' }, 'Wpisz wartość docelową.')); return; }
      const sc = scaleRecipe(r, kk);
      out.replaceChildren(
        result('Współczynnik', '×' + fmtNum(kk, 3), '', 'total'),
        h('div', { class: 'card' }, sc.sections.map((sec) => h('div', { class: 'ing-section' }, sec.name ? h('div', { class: 'tape' }, sec.name) : null,
          h('ul', { class: 'ing-list' }, sec.ingredients.filter((i) => i.name).map((i) => { const q = qtyParts(i); return h('li', { class: 'ing' }, h('span', { class: 'ing-name' }, i.name), h('span', { class: 'ing-qty' }, h('span', { class: 'amt num' }, q.num), h('span', { class: 'unit' }, q.unit))); }))))),
        h('div', { class: 'row wrap gap' },
          button('Do zakupów', { icon: 'cart', onClick: () => openAddToShopping(r, kk) }),
          button('Otwórz recepturę', { icon: 'book', kind: 'ghost', onClick: () => navigate('/recipe/' + r.id) })));
    };
    const inputs = [];
    if (st.mode === 'servings') inputs.push(field('Liczba porcji', numInput({ value: st.servings, label: 'Liczba porcji', dec: 1, placeholder: `teraz ${r.servings || '?'}`, onInput: (v) => { st.servings = v; save(); paintOut(); } })));
    else if (st.mode === 'yield') {
      inputs.push(h('div', { class: 'row gap' }, col(field('Wydajność', numInput({ value: st.yAmt, label: 'Wydajność', onInput: (v) => { st.yAmt = v; save(); paintOut(); } }))),
        col(field('Jednostka', selectEl(['g', 'kg', 'ml', 'l', 'szt.', 'porcja'], st.yUnit, (v) => { st.yUnit = v; save(); paintOut(); })))));
      inputs.push(h('p', { class: 'muted small' }, y ? `Obecnie: ${fmtAmount(y.amount)} ${y.unit}${y.computed ? ' (suma składników)' : ''}` : 'Ta receptura nie ma wydajności.'));
    } else if (ings.length) {
      inputs.push(field('Składnik', selectEl(ings.map((i) => [i.id, `${i.name} (${fmtAmount(i.amount)} ${i.unit})`]), st.ingId, (v) => { st.ingId = v; st.ingUnit = ings.find((i) => i.id === v).unit; save(); build(); })));
      inputs.push(h('div', { class: 'row gap' }, col(field('Docelowa ilość', numInput({ value: st.ingAmt, label: 'Docelowa ilość', onInput: (v) => { st.ingAmt = v; save(); paintOut(); } }))),
        col(field('Jednostka', selectEl(['g', 'kg', 'ml', 'l', 'szt.', 'łyżka', 'łyżeczka'], st.ingUnit, (v) => { st.ingUnit = v; save(); paintOut(); })))));
    }
    void k;
    holder.replaceChildren(
      h('section', { class: 'card stack' }, field('Receptura', sel),
        segmented([['servings', 'Porcje'], ['yield', 'Wydajność'], ['ingredient', 'Składnik']], st.mode, (v) => { st.mode = v; save(); build(); }, { label: 'Przelicz według' }), ...inputs),
      out);
    paintOut();
  }
  ready.then(build);
  build();
  return { el: s.el };
}

/* ---------- Koszt receptury ---------- */

function costCalculator() {
  const { st, save, ready } = memo('cost', { id: '', target: 30 });
  const holder = h('div', { class: 'stack' });
  const s = calcScreen('Koszt receptury', holder);
  const cur$ = () => getSetting('currency') || 'zł';

  function build() {
    if (!state.recipes.size) { holder.replaceChildren(emptyState('book', 'Brak receptur', 'Dodaj recepturę, żeby policzyć jej koszt.', button('Nowa receptura', { kind: 'primary', onClick: () => navigate('/new') }))); return; }
    const sel = recipeSelect(st, 'id', () => { save(); build(); });
    const base = getRecipe(st.id);
    // Praca na kopii — zapis dopiero po kliknięciu „Zapisz w recepturze”.
    const r = JSON.parse(JSON.stringify(base));
    const ings = allIngredients(r).filter((i) => i.name);
    const sum = h('div', { class: 'results' });
    const paintSum = () => {
      const c = recipeCost(r, 1);
      const sugg = c.perPortion > 0 ? priceForFoodCost(c.perPortion, st.target) : null;
      sum.replaceChildren(h('div', { class: 'results-grid' },
        result('Koszt receptury', fmtMoney(c.total, cur$()), '', 'big'),
        result('Koszt porcji', fmtMoney(c.perPortion, cur$()), '', 'big'),
        result('Cena sprzedaży', r.salePrice > 0 ? fmtMoney(r.salePrice, cur$()) : '—'),
        result('Food cost', c.foodCostPct != null ? fmtNum(c.foodCostPct, 1) : '—', c.foodCostPct != null ? '%' : '', c.foodCostPct > 35 ? 'warn' : '')),
        sugg ? h('p', { class: 'muted' }, `Cena porcji dla food cost ${fmtNum(st.target, 1)}%: `, h('strong', { class: 'num' }, fmtMoney(sugg, cur$()))) : null,
        c.missing ? h('p', { class: 'muted small' }, `Składników bez ceny lub zgodnej jednostki: ${c.missing}`) : null);
    };
    const rows = ings.map((i) => {
      const pkg = h('div', { class: 'row gap', hidden: i.priceUnit !== 'opak.' });
      const buildPkg = () => {
        pkg.hidden = i.priceUnit !== 'opak.';
        pkg.replaceChildren(col(field('Waga opakowania', numInput({ value: i.packageWeight, label: 'Waga opakowania', onInput: (v) => { i.packageWeight = v; paintSum(); } }))),
          col(field('Jednostka', selectEl(['g', 'ml', 'szt.'], i.packageUnit || 'g', (v) => { i.packageUnit = v; paintSum(); }))));
      };
      buildPkg();
      return h('div', { class: 'price-row' },
        h('div', { class: 'price-name' }, i.name, h('small', { class: 'muted num' }, i.amount != null ? ` ${fmtAmount(i.amount)} ${i.unit}` : '')),
        h('div', { class: 'row gap' },
          col(numInput({ value: i.price, label: `Cena: ${i.name}`, placeholder: 'cena', dec: 2, onInput: (v) => { i.price = v; paintSum(); } })),
          col(selectEl([['kg', `${cur$()}/kg`], ['l', `${cur$()}/l`], ['g', `${cur$()}/g`], ['ml', `${cur$()}/ml`], ['szt.', `${cur$()}/szt.`], ['opak.', `${cur$()}/opak.`]], i.priceUnit || 'kg', (v) => { i.priceUnit = v; buildPkg(); paintSum(); }, { label: 'Jednostka ceny' }))),
        pkg);
    });
    holder.replaceChildren(
      h('section', { class: 'card stack' }, field('Receptura', sel),
        h('div', { class: 'row gap' },
          col(field('Porcje', numInput({ value: r.servings, label: 'Liczba porcji', dec: 1, onInput: (v) => { r.servings = v || 0; paintSum(); } }))),
          col(field(`Cena sprzedaży (${cur$()})`, numInput({ value: r.salePrice, label: 'Cena sprzedaży porcji', dec: 2, onInput: (v) => { r.salePrice = v; paintSum(); } })))),
        field('Docelowy food cost (%)', numInput({ value: st.target, label: 'Docelowy food cost', dec: 1, onInput: (v) => { st.target = v || 30; save(); paintSum(); } }))),
      sum,
      h('section', { class: 'card stack' }, h('h2', { class: 'card-title' }, icon('coins', 20), 'Ceny składników'), ...rows),
      h('div', { class: 'row wrap gap' },
        button('Zapisz w recepturze', { icon: 'check', kind: 'primary', onClick: async () => {
          await saveRecipe({ ...base, sections: r.sections, servings: r.servings, salePrice: r.salePrice }, { note: 'Zaktualizowano ceny (kalkulator kosztu)' });
          toast('Zapisano ceny w recepturze');
        } }),
        button('Otwórz recepturę', { icon: 'book', kind: 'ghost', onClick: () => navigate('/recipe/' + base.id) })));
    paintSum();
  }
  ready.then(build);
  build();
  return { el: s.el };
}
