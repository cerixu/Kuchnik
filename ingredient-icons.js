/* ==========================================================================
   ingredient-icons.js — lokalne rysunki kredką dla wszystkich składników.
   ========================================================================== */
import { norm } from './util.js';

const RULES = [
  [/\bzakwas\b|\bstarter\b/, 'starter'],
  [/jaj|zoltk|bialk/, 'egg'],
  [/boczek|boczk|guanciale|pancetta|slonina/, 'bacon'],
  [/kielbas|salami|parowk|bratwurst|pepperoni|chorizo/, 'sausage'],
  [/kurczak|indyk|kaczka|\bdrob\b|udk|skrzydel|piers kurcz/, 'chicken'],
  [/wolow|cielecin|jagniec|stek|poledwic|szponder|watrob|mieso mielon wolow/, 'beef'],
  [/wieprz|schab|karkow|lopatk|zeber|szynk|mieso mielon wieprz/, 'pork'],
  [/\bmieso\b|mieso mielon/, 'beef'],
  [/krewetk/, 'shrimp'],
  [/kalmar|malz|ostryg|moule/, 'seafood'],
  [/losos|dorsz|sledz|pstrag|karp|tunczyk|anchois|morszczuk|mintaj|sandacz|\bryba\b/, 'fish'],
  [/tofu|tempeh/, 'tofu'],
  [/\bkawa\b|espresso|ziarna kawy/, 'coffee'],
  [/czekolad|kakao|brownie/, 'chocolate'],
  [/\bpiwo\b|lager/, 'beer'],
  [/\bwino\b|prosecco|sherry|marsala|vermouth|mirin/, 'wine'],
  [/wodka|whisk|bourbon|\brum\b|\bgin\b|tequil|cachaca|likier|triple|campari|aperol|spirytus|angostura/, 'spirit'],
  [/ocet/, 'vinegar'],
  [/musztard/, 'mustard'],
  [/\bsos\b|sos |keczup|ketchup|tabasco|gochujang|majonez|tahini|pasta tom yum|pasta tamaryndowa|pasta miso|pasta curry|pesto|salsa|passata/, 'sauce'],
  [/oliwki|oliwka/, 'olive'],
  [/kapary|ogorki kiszone|ogorek kiszony|kiszony|kiszon/, 'pickle'],
  [/fasol|groch|bob|ciecierzyc|groszek|fasolka/, 'beans'],
  [/puszk|pelati|pomidory w puszce/, 'can'],
  [/kokos/, 'coconut'],
  [/oliwa|olej|tluszcz/, 'oil'],
  [/maslo|smalec/, 'butter'],
  [/ser\b|sery|serek|mozzarella|parmezan|pecorino|feta|cheddar|gorgonzola|ricotta|mascarpone|twarog|gruyere|kajmak|emmental|suluguni/, 'cheese'],
  [/smietan|smietank/, 'cream'],
  [/jogurt|kefir|maslank/, 'yogurt'],
  [/mleko|napoj roslinny/, 'milk'],
  [/filo|ciasto na pizze|ciasto na gyoza|ciasto francuskie/, 'pastry'],
  [/tortill|pita|naan|chipsy/, 'tortilla'],
  [/\bchleb|\bbulk|bagiet|ciabatt|grzank|tost|herbatnik|biszkopt|savoiardi|sucharki/, 'bread'],
  [/\bmaka\b|skrobia|panko|semolina|semolin|kasza manna|bulka tarta/, 'flour'],
  [/makaron|spaghetti|penne|tagliatelle|fettuccine|lasagne|gnocchi|ditalini|ramen|lazanki|kolanka|tonnarelli/, 'pasta'],
  [/ryz|risotto/, 'rice'],
  [/komosa|bulgur|kasza|pszenica|peczak|platki owsiane|owsiank|granola|kuskus/, 'grain'],
  [/ziemniak|batat|puree|frytk/, 'potato'],
  [/burak/, 'beet'],
  [/seler/, 'celery'],
  [/rzodkiew/, 'radish'],
  [/pietruszka \(korzen\)|pasternak/, 'parsnip'],
  [/marchew/, 'carrot'],
  [/cebul|szalot|por\b|szczypior/, 'onion'],
  [/czosnek/, 'garlic'],
  [/pomidor|koncentrat pomidorowy/, 'tomato'],
  [/chili|jalapeno|cayenne|papryczka chili/, 'chili'],
  [/cukier|cukru|cukrem|cukrow/, 'sugar'],
  [/pieprz|kmin|cynamon|papryka.*mielon|papryka slodka|papryka wedzona|curry|kurkuma|gozdzik|anyz|szafran|galka|przypraw|wanili|ziele angielskie|garam masala|chrzan/, 'spice'],
  [/papryk/, 'pepper'],
  [/ogor/, 'cucumber'],
  [/cukini/, 'zucchini'],
  [/baklazan/, 'eggplant'],
  [/brokul|kalafior/, 'broccoli'],
  [/salat|szpinak|rukola|kapust|szczaw|botwin|jarmuz|seler naciowy/, 'leafy'],
  [/grzyb|pieczark|borowik/, 'mushroom'],
  [/kukurydz|polenta/, 'corn'],
  [/dyni/, 'pumpkin'],
  [/awokado/, 'avocado'],
  [/trawa cytrynowa/, 'lemongrass'],
  [/cytryn/, 'lemon'],
  [/limonk/, 'lime'],
  [/pomarancz|mandaryn|grejpfrut/, 'orange'],
  [/ananas/, 'pineapple'],
  [/jablk|gruszk/, 'apple'],
  [/banan/, 'banana'],
  [/sliwk|rodzynk|morele suszone/, 'dried-fruit'],
  [/truskawk|malin|zurawin|wisni|jagod|boroweck|porzeczk|owoce/, 'berry'],
  [/\bmiet/, 'mint'],
  [/imbir|galangal/, 'ginger'],
  [/bazyl/, 'basil'],
  [/natka|koper|kolendr|oregano|szalwi|lubczyk|ziola|tymian|rozmaryn|majeran|liscie|lisc|pietruszk|szczypiorek/, 'herb'],
  [/orzech|migdal|pistacj|ziemne|piniow|mak\b|pestki/, 'nuts'],
  [/soczewic/, 'lentils'],
  [/\bsol\b/, 'salt'],
  [/miod|syrop/, 'honey'],
  [/dzem|konfitur|marmolad/, 'jam'],
  [/nori|wakame/, 'seaweed'],
  [/droz/, 'yeast'],
  [/proszek|soda|zelatyn|agar/, 'spoon'],
  [/woda|tonik|sok\b/, 'water'],
  [/\blod\b|lody/, 'ice'],
];

const ICON_FILES = Object.freeze({
  'egg': 'egg',
  'bacon': 'bacon',
  'sausage': 'sausage',
  'pork': 'pork',
  'chicken': 'chicken',
  'beef': 'beef',
  'shrimp': 'shrimp',
  'seafood': 'seafood',
  'fish': 'fish',
  'tofu': 'tofu',
  'pasta': 'pasta',
  'rice': 'rice',
  'grain': 'grain',
  'potato': 'potato',
  'carrot': 'carrot',
  'parsnip': 'parsnip',
  'onion': 'onion',
  'garlic': 'garlic',
  'can': 'can',
  'tomato': 'tomato',
  'pepper': 'pepper',
  'chili': 'chili',
  'cucumber': 'cucumber',
  'zucchini': 'zucchini',
  'leafy': 'leafy',
  'broccoli': 'broccoli',
  'mushroom': 'mushroom',
  'eggplant': 'eggplant',
  'corn': 'corn',
  'pumpkin': 'pumpkin',
  'avocado': 'avocado',
  'lemon': 'lemon',
  'lime': 'lime',
  'orange': 'orange',
  'pineapple': 'pineapple',
  'apple': 'apple',
  'banana': 'banana',
  'berry': 'berry',
  'dried-fruit': 'dried-fruit',
  'coconut': 'coconut',
  'butter': 'butter',
  'cheese': 'cheese',
  'cream': 'cream',
  'yogurt': 'yogurt',
  'milk': 'milk',
  'flour': 'flour',
  'bread': 'bread',
  'tortilla': 'tortilla',
  'pastry': 'pastry',
  'wine': 'wine',
  'beer': 'beer',
  'spirit': 'spirit',
  'coffee': 'coffee',
  'ice': 'ice',
  'water': 'water',
  'stock': 'stock',
  'herb': 'herb',
  'basil': 'basil',
  'mint': 'mint',
  'lemongrass': 'lemongrass',
  'ginger': 'ginger',
  'oil': 'oil',
  'olive': 'olive',
  'honey': 'honey',
  'chocolate': 'chocolate',
  'nuts': 'nuts',
  'beans': 'beans',
  'lentils': 'lentils',
  'sugar': 'sugar',
  'salt': 'salt',
  'spice': 'spice',
  'seasoning-mix': 'seasoning-mix',
  'sauce': 'sauce',
  'mustard': 'mustard',
  'vinegar': 'vinegar',
  'yeast': 'yeast',
  'spoon': 'spoon',
  'starter': 'starter',
  'beet': 'beet',
  'celery': 'celery',
  'radish': 'radish',
  'jam': 'jam',
  'pickle': 'pickle',
  'seaweed': 'seaweed',
});
const cache = new Map();

export function matchIngredientIcon(name) {
  const n = norm(name).replace(/\s+/g, ' ').trim();
  if (!n) return null;

  // Te linie są nazwami pojedynczych składników zapisanymi razem w przepisie.
  if (/\bsol\b.*\bpieprz\b|\bpieprz\b.*\bsol\b/.test(n) && /,|\si\s/.test(n)) return 'seasoning-mix';
  if (/bulion|fond|wywar/.test(n)) return 'stock';
  // W nazwie wywaru występuje też "rosół", ale tusza/mięso pozostaje mięsem.
  if (/rosol/.test(n) && !/(kurczak|wolow|wieprz|mieso|szponder|mostek|indyk|kaczka)/.test(n)) return 'stock';
  if (/maka.*chlebow/.test(n)) return 'flour';

  for (const [re, key] of RULES) if (re.test(n)) return key;
  return null;
}

export function ingIconKey(name) {
  return matchIngredientIcon(name) || 'seasoning-mix';
}

export function iconUrlFor(key) {
  const file = ICON_FILES[key] || ICON_FILES['seasoning-mix'];
  return new URL(`./assets/ingredient-illustrations/${file}.png`, import.meta.url).href;
}

export function ingIconUrl(name) {
  const key = ingIconKey(name);
  if (!cache.has(key)) cache.set(key, iconUrlFor(key));
  return cache.get(key);
}

export const ING_ICON_KEYS = Object.keys(ICON_FILES);
