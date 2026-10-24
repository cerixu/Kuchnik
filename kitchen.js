/* ==========================================================================
   kitchen.js — wspólne narzędzia „kuchenne": dopasowanie składników do tekstu
   (po rdzeniach słów, z odmianą polską), czasy w krokach, dopasowanie do
   zawartości lodówki.
   ========================================================================== */
import { norm } from './util.js';

const STOP = new Set(['typ', 'swieze', 'swiezy', 'swieza', 'mielony', 'mielona', 'mielone', 'suszone', 'suszony', 'suszona', 'do', 'na', 'z', 'ze', 'w', 'lub', 'i', 'oraz', 'dla', 'po', 'od',
  'duza', 'duzy', 'male', 'maly', 'mala', 'ostudzone', 'ciepla', 'ciepłe', 'zimna', 'zimny', 'zimne', 'czesci', 'tuszka', 'filet', 'plaster', 'plastry', 'gorzka', 'gorzki', 'pelnoziarnista',
  'extra', 'vergine', 'kawalek', 'listki', 'liscie', 'galazka', 'galazki', 'zabki', 'zabek', 'szt', 'puszki', 'puszka', 'odsaczona', 'odsaczone', 'ugotowana', 'ugotowane', 'klasyczny', 'wiejska']);

/** Rdzeń słowa bez polskich końcówek: „mąki” → „mak”, „czosnku” → „czosn”. */
export function stem(word) {
  const w = norm(word);
  if (w.length < 3) return w;
  return w.slice(0, Math.max(3, w.length - (w.length >= 6 ? 2 : 1)));
}

/** Rdzenie istotnych słów nazwy składnika (pierwsze 2 znaczące). */
export function nameStems(name) {
  const clean = String(name).replace(/\([^)]*\)/g, ' ');
  const toks = norm(clean).split(/[^a-z0-9]+/).filter((t) => t.length >= 3 && !STOP.has(t));
  return toks.slice(0, 2).map(stem);
}

const matchesStem = (text, st) => new RegExp('(^|[^a-z0-9])' + st).test(text);

/** Które składniki receptury są wspomniane w danym tekście kroku? */
export function ingredientsInText(text, ingredients) {
  const t = norm(text);
  const found = [];
  for (const ing of ingredients) {
    const st = nameStems(ing.name);
    if (!st.length) continue;
    // pierwszy znaczący wyraz musi wystąpić; drugi jest opcjonalny (pomaga tylko odróżnić „sól”/„sól morska”)
    if (matchesStem(t, st[0])) found.push(ing);
  }
  return found;
}

/** Dopasowanie receptury do tego, co użytkownik ma w domu → { have, missing, score }. */
export function pantryScore(recipe, haveList) {
  const haveNorm = haveList.map((x) => norm(x)).filter(Boolean);
  const ings = recipe.sections.flatMap((s) => s.ingredients).filter((i) => i.name && !/^(sol|pieprz|woda|olej|oliwa|cukier)\b/.test(norm(i.name)));
  if (!ings.length) return { have: [], missing: [], score: 0 };
  const have = [], missing = [];
  for (const ing of ings) {
    const st = nameStems(ing.name)[0];
    const ok = st && haveNorm.some((h) => h.length >= 3 && (matchesStem(h, st) || matchesStem(norm(ing.name), stem(h))));
    (ok ? have : missing).push(ing);
  }
  return { have, missing, score: have.length / ings.length };
}

/* ---------- Emoji składników (okrągłe ikony składników jak na makiecie) ---------- */
const EMOJI = [
  [/jaj|zoltk|bialk/, '🥚'], [/boczek|guanciale|pancetta|szynk/, '🥓'], [/kielbas|salami|parowk/, '🌭'], [/kurczak|drob|udk|skrzydel|piers|indyk|kaczk/, '🍗'],
  [/wolow|wieprz|schab|karkow|zebr|mieso|mielon|lopatk|cielec|jagnie|policzk|stek|polędw|poledw/, '🥩'], [/krewetk|kalmar/, '🍤'], [/malz|ostryg/, '🦪'],
  [/losos|dorsz|sledz|pstrag|karp|tunczyk|ryba|ryby|anchois|morszczuk|mintaj/, '🐟'], [/makaron|spaghetti|penne|tagliatelle|fettuccine|lasagne|gnocchi|ditalini/, '🍝'],
  [/ryz|risotto|komosa|bulgur|kasza|pszenica/, '🍚'], [/ziemniak|puree|frytk/, '🥔'], [/marchew/, '🥕'], [/cebul|szalot|por\b|szczypior/, '🧅'], [/czosnek/, '🧄'],
  [/pomidor|passata|pelati|koncentrat|keczup/, '🍅'], [/papryk|jalape|chili/, '🌶️'], [/ogorek|ogorki/, '🥒'], [/salat|szpinak|rukola|kapust|szczaw|botwin|jarmuz/, '🥬'], [/brokul/, '🥦'],
  [/grzyb|pieczark|borowik/, '🍄'], [/jablk/, '🍎'], [/cytryn|limonk/, '🍋'], [/pomarancz/, '🍊'], [/truskawk|malin|zurawin|wisni/, '🍓'], [/jagod|boroweck|porzeczk/, '🫐'],
  [/banan/, '🍌'], [/awokado/, '🥑'], [/ananas/, '🍍'], [/kokos/, '🥥'], [/morel|sliwk|brzoskw/, '🍑'], [/dyni/, '🎃'], [/baklazan/, '🍆'], [/kukurydz/, '🌽'], [/cukini/, '🥒'],
  [/oliw|olej|smalec|tluszcz/, '🫒'], [/miod|syrop/, '🍯'], [/czekolad|kakao|brownie/, '🍫'], [/orzech|migdal|pistacj|ziemne|piniow/, '🥜'], [/fasol|groch|soczewic|ciecierzyc|bob/, '🫘'],
  [/maslo|margaryn/, '🧈'], [/ser\b|serek|mozzarell|parmezan|pecorino|feta|cheddar|gorgonzol|ricott|mascarpone|twarog|gruyere|kajmak/, '🧀'], [/mleko|smietan|jogurt|kefir|maslank|smietank|krem kokosowy/, '🥛'],
  [/mak\b|mak$/, '🌰'], [/maka|mąka|skrobia|platki|bulka tarta|panko|kasza manna/, '🌾'], [/chleb|bulk|bagiet|ciabatt|tortill|pita|grzank|tosty|tostow|herbatnik|biszkopt|savoiardi|ciasto/, '🍞'],
  [/wino|prosecco|sherry|marsala/, '🍷'], [/piwo/, '🍺'], [/wodka|whisk|bourbon|rum|gin\b|tequil|cachaca|likier|triple|campari|aperol|vermouth/, '🥃'], [/kawa|espresso/, '☕'], [/lod\b|lod$|lody/, '🧊'],
  [/bazyli|natka|koper|tymianek|rozmaryn|mieta|kolendr|oregano|szalwi|lubczyk|zioł|zioła|ziola|majeranek|liscie|liść|lisc/, '🌿'], [/imbir/, '🫚'], [/sol\b|sol$|pieprz|kmin|cynamon|papryka mielona|przypraw|curry|kurkuma|gozdzik|anyz|szafran|gałka|galka/, '🧂'],
  [/ocet|sos |sojowy|musztard|majonez|tahini|pasta/, '🫙'], [/woda|wod\b|bulion|rosol/, '💧'], [/cukier/, '🍬'], [/droz|proszek|soda|zelatyn|agar/, '🥄'], [/tofu/, '🧊'], [/sok /, '🧃'],
];
export function ingEmoji(name) {
  const n = norm(name);
  for (const [re, em] of EMOJI) if (re.test(n)) return em;
  return '🍽️';
}
