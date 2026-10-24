/* ==========================================================================
   nutrition.js — orientacyjny szacunek kalorii na porcję (kcal / 100 g z tabel
   typu USDA / Tabele wartości odżywczej). Pokazywany tylko wtedy, gdy
   rozpoznano ≥ 70% masy składników. To przybliżenie, nie dane laboratoryjne.
   ========================================================================== */
import { norm } from './util.js';

// [wzorzec nazwy (bez polskich znaków), kcal/100 g, masa sztuki w g (opcjonalnie)]
const T = [
  [/zoltk/, 322, 18], [/bialk/, 52, 33], [/jaj/, 143, 55], [/maslo klarowane|smalec|slonina/, 880], [/maslo|margaryn/, 717], [/oliw|olej/, 884], [/majonez/, 680], [/tahini/, 595], [/maslo orzechowe/, 588],
  [/smietan.*30|smietanka|krem kokosowy/, 290], [/smietan/, 190], [/mleko kokosowe/, 197], [/mleko|maslank|kefir|napoj roslinny/, 58], [/jogurt grecki/, 100], [/jogurt/, 62],
  [/mascarpone/, 430], [/serek smietankowy/, 340], [/ricott/, 170], [/twarog|twaroq/, 135], [/mozzarell/, 250], [/parmezan|grana|pecorino|gruyere|emmental|cheddar|kefalotyri|suluguni/, 410], [/feta/, 260], [/gorgonzol|pleśniow|plesniow|blue cheese/, 350], [/ser zolty|ser |kajmak/, 350],
  [/boczek|guanciale|pancetta/, 520], [/szynk/, 140], [/salami|pepperoni/, 430], [/kielbas|bratwurst|parowk/, 300], [/schab|poledwi/, 170], [/karkowk|lopatk/, 250], [/zebr/, 300], [/mielon.*wolow|wolowin|wolowe|policzk|szponder/, 230],
  [/mielon|wieprzow/, 250], [/jagnie/, 280], [/cielec/, 120], [/kaczk/, 337], [/piers/, 120], [/kurczak|udk|skrzydel|drob|indyk/, 190], [/watrob/, 135],
  [/losos/, 208], [/dorsz|morszczuk|mintaj|sandacz|pstrag/, 100], [/sledz/, 200], [/karp/, 127], [/tunczyk/, 130], [/anchois/, 210], [/krewetk/, 85], [/malz/, 80], [/kalmar/, 90],
  [/maka|mąka|panko|bulka tarta|platki owsiane|sucharki/, 370], [/skrobia/, 350], [/makaron|spaghetti|penne|lasagne|tagliatelle|fettuccine|ditalini|lazanki|kolanka|ramen|tonnarelli/, 360], [/gnocchi/, 130],
  [/ryz|komosa|kasza|bulgur|pszenica|peczak/, 350], [/(^|[^a-z])(chleb|bulk|bagiet|ciabatt|tortill|pita|grzank|biszkopt|savoiardi|herbatnik|chipsy|kromk)/, 270, 50], [/ciasto francuskie|ciasto filo|filo/, 400],
  [/cukier|syrop cukrowy/, 400], [/miod|syrop/, 310], [/czekolad/, 540], [/kakao/, 230], [/orzech|migdal|pistacj|ziemne|piniow/, 620], [/mak\b/, 525], [/rodzynk|zurawina suszona/, 300], [/morele suszone|sliwki suszone/, 240],
  [/ziemniak|puree/, 77, 150], [/marchew/, 41, 80], [/pietruszka \(korzen|seler|por\b/, 35], [/cebul|szalot/, 40, 110], [/czosnek/, 149, 4], [/pomidor|passata|pelati|sos pomidorowy|sos enchilada/, 22, 120], [/koncentrat/, 80], [/keczup|sos bbq/, 110],
  [/papryk/, 31, 180], [/ogorek|ogorki/, 15, 150], [/cukini/, 17, 250], [/baklazan/, 25, 300], [/kapust|szpinak|salat|szczaw|botwin|brokul|jarmuz|fasolka|grosz?ek zielony|buraki|buraczk|dyni|dynia/, 30], [/awokado/, 160, 170], [/pieczark|grzyb(?!y suszone)|borowik/, 25],
  [/grzyby suszone/, 280], [/jablk/, 52, 180], [/cytryn|limonk/, 29, 70], [/pomarancz/, 47, 150], [/truskawk|malin|jagod|zurawin|porzeczk|owoce/, 45], [/banan/, 89, 120], [/ananas/, 50], [/(^|[^a-z])(mus|dzem)([^a-z]|$)/, 250],
  [/fasol|ciecierzyc|soczewic/, 110], [/groszek|kukurydz/, 80], [/tofu/, 76], [/oliwki/, 115], [/kapary/, 23], [/ogorek kiszony|kapusta kiszona/, 18], [/musztard/, 66], [/sos sojowy|sos rybny/, 55], [/ocet|tonik|woda|bulion|rosol|lod\b|sol\b|pieprz|przypraw|piwo imbirowe/, 0],
  [/wino/, 83], [/prosecco/, 80], [/piwo/, 43], [/wodka|rum|gin\b|tequil|whisk|bourbon|cachaca|vermouth|campari|aperol|triple|likier|sherry|marsala/, 230], [/espresso|kawa/, 2], [/sok /, 45],
  [/droz|proszek|soda|zelatyn|agar|wanili|cynamon|kmin|papryka mielona|papryka slodka|kurkuma|garam|curry|oregano|tymianek|bazyli|natka|koper|mieta|kolendr|szafran|galka|gozdzik|anyz|rozmaryn|szalwi|lisc|chili/, -1],
];
const FREE = /(woda|bulion|rosol|lod\b|\bsol\b|pieprz|ocet|tonik|przypraw|ziola)/;
const SPOON = { 'łyżka': 15, 'łyżeczka': 5, szczypta: 0.4 };

/** Typowa masa jednej sztuki produktu (g) albo null. */
export function pieceGrams(name) { const n = norm(name); const row = T.find(([re]) => re.test(n)); return row && row[2] ? row[2] : null; }

export function ingredientGrams(ing, pieceG) {
  if (ing.amount == null || !Number.isFinite(ing.amount)) return null;
  switch (ing.unit) {
    case 'g': case 'ml': return ing.amount;
    case 'kg': case 'l': return ing.amount * 1000;
    case 'łyżka': case 'łyżeczka': case 'szczypta': return ing.amount * SPOON[ing.unit];
    case 'szt.': return pieceG ? ing.amount * pieceG : null;
    default: return null;
  }
}

/** { perServing, total, coverage } albo null, gdy za mało danych. */
export function estimateKcal(recipe) {
  let total = 0, covered = 0, known = 0, n = 0;
  for (const sec of recipe.sections) for (const ing of sec.ingredients) {
    if (!ing.name) continue;
    const name = norm(ing.name);
    if (/^(bulion|rosol|woda|lod|wywar)\b/.test(name)) continue;          // płyny bez kalorii (bulion zajmuje miejsce, ale nie liczy się do pokrycia)
    const row = T.find(([re]) => re.test(name));
    const g = ingredientGrams(ing, row && row[2]);
    if (g == null) continue;
    if (row ? row[1] <= 0 : FREE.test(name)) continue;               // woda, sól, przyprawy: nie liczą się do pokrycia
    // Część tłuszczu do smażenia i mięso z wywaru praktycznie nie trafia na talerz.
    let share = /do smazenia/.test(name) ? 0.2 : /rosolow|na rosol|do bulionu|szkielet|koscie|fond/.test(name) ? 0.12 : 1;
    // Mięso z kością: jadalna część to tylko ok. połowa–dwie trzecie masy.
    if (!/bez kosci|filet|piers|mielon/.test(name)) {
      if (/zebr/.test(name)) share *= 0.5; else if (/kaczk|tuszk|caly|cala|caly/.test(name)) share *= 0.55; else if (/udk|podudzi|skrzydel/.test(name)) share *= 0.65;
    }
    // Alkohol w daniach częściowo wyparowuje (drinki liczymy w całości).
    if (recipe.category !== 'cat-cocktaile' && /wino|piwo|wodka|rum|whisk|bourbon|sherry|marsala|likier|prosecco/.test(name)) share *= 0.35;
    known += g;
    if (row) { total += g * row[1] / 100 * share; covered += g; n++; }
  }
  if (!(known > 0) || covered / known < 0.7 || n < 3) return null;
  const servings = recipe.servings > 0 ? recipe.servings : 1;
  return { perServing: Math.round(total / servings / 5) * 5, total: Math.round(total), coverage: covered / known };
}
