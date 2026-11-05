/* ==========================================================================
   Ingredient illustrations — hand-drawn colored-pencil PNG assets.
   ========================================================================== */
import { norm } from './util.js';

const RULES = [
  [/zoltk|jaj/, 'egg'], [/boczek|guanciale|pancetta/, 'bacon'], [/kielbas|salami|parowk|bratwurst|pepperoni|chorizo/, 'sausage'], [/szynk|karkow|lopatk|schab|zebr|wieprz/, 'pork'],
  [/kurczak|drob|udk|skrzydel|piers|indyk|kaczk/, 'chicken'], [/wolow|mieso|mielon|jagnie|cielec|policzk|stek|poledw|szponder|watrob/, 'beef'], [/krewetk|kalmar|malz|ostryg/, 'shrimp'],
  [/losos|dorsz|sledz|pstrag|karp|tunczyk|ryba|ryby|anchois|morszczuk|mintaj|sandacz/, 'fish'], [/tofu|tempeh/, 'tofu'],
  [/makaron|spaghetti|penne|tagliatelle|fettuccine|lasagne|gnocchi|ditalini|ramen|lazanki|kolanka|tonnarelli/, 'pasta'], [/ryz|risotto|komosa|bulgur|kasza|pszenica|peczak|platki owsiane/, 'rice'],
  [/ziemniak|puree|frytk/, 'potato'], [/marchew/, 'carrot'], [/cebul|szalot|\bpor\b|szczypior/, 'onion'], [/czosnek/, 'garlic'], [/passata|sos pomidorowy|pelati|puszk/, 'can'], [/pomidor|koncentrat/, 'tomato'],
  [/papryk(?!a mielona|a slodka|a wedzona)|papryka/, 'pepper'], [/chili|jalape|cayenne|papryczk/, 'chili'], [/ogorek|ogorki/, 'cucumber'], [/cukini/, 'zucchini'], [/salat|szpinak|rukola|kapust|szczaw|botwin|jarmuz|seler naciowy/, 'leafy'],
  [/brokul|kalafior/, 'broccoli'], [/grzyb|pieczark|borowik/, 'mushroom'], [/baklazan/, 'eggplant'], [/kukurydz/, 'corn'], [/dyni/, 'pumpkin'], [/awokado/, 'avocado'],
  [/cytryn|limonk/, 'lemon'], [/pomarancz|mandaryn|grejpfrut/, 'orange'], [/jablk|gruszk/, 'apple'], [/banan/, 'banana'], [/truskawk|malin|zurawin|wisni|jagod|boroweck|porzeczk|owoce/, 'berry'],
  [/ananas|mango|brzoskw|morel|sliwk/, 'orange'], [/kokos(?!owy krem)/, 'coconut'], [/mleko kokosowe|krem kokosowy/, 'can'],
  [/maslo|margaryn|smalec/, 'butter'], [/ser\b|serek|mozzarell|parmezan|pecorino|feta|cheddar|gorgonzol|ricott|mascarpone|twarog|gruyere|kajmak|emmental|suluguni/, 'cheese'],
  [/smietan|smietank/, 'cream'], [/jogurt|kefir|maslank/, 'yogurt'], [/mleko|napoj roslinny/, 'milk'],
  [/maka|skrobia|bulka tarta|panko|kasza manna|semolin/, 'flour'], [/chleb|bulk|bagiet|ciabatt|grzank|tosty|tostow|herbatnik|biszkopt|savoiardi|sucharki|ciasto/, 'bread'], [/tortill|pita|naan|chipsy/, 'tortilla'],
  [/wino|prosecco|sherry|marsala|vermouth/, 'wine'], [/piwo/, 'beer'], [/wodka|whisk|bourbon|\brum\b|\bgin\b|tequil|cachaca|likier|triple|campari|aperol|spirytus/, 'spirit'], [/kawa|espresso/, 'coffee'],
  [/\blod\b|lody|kostki lodu/, 'ice'], [/bazyli|natka|koper|mieta|kolendr|oregano|szalwi|lubczyk|ziola|zioła|tymianek|rozmaryn|majeranek|liscie|lisc|pietruszk|szczypiorek/, 'herb'],
  [/oliw|olej|tluszcz/, 'oil'], [/miod|syrop|dzem|konfitur/, 'honey'], [/czekolad|kakao|brownie/, 'chocolate'], [/orzech|migdal|pistacj|ziemne|piniow|mak\b|pestki|sezam/, 'nuts'],
  [/fasol|groch|bob|ciecierzyc|zielony groszek|groszek/, 'beans'], [/soczewic/, 'lentils'], [/cukier/, 'sugar'], [/\bsol\b|sol morska|sol gruba/, 'salt'],
  [/pieprz|kmin|cynamon|papryka|curry|kurkuma|gozdzik|anyz|szafran|galka|przypraw|imbir|wanili|chrzan/, 'spice'],
  [/keczup|sos bbq|sos |tabasco|sriracha|sos$/, 'sauce'], [/musztard|majonez|tahini|pasta /, 'mustard'], [/ocet/, 'vinegar'], [/droz/, 'yeast'], [/proszek|soda|zelatyn|agar/, 'spoon'],
  [/woda|wod\b|woda gazowana|tonik|piwo imbirowe|sok /, 'water'], [/bulion|rosol|fond|wywar/, 'stock'],
];

const ASSETS = Object.freeze({
  tomato: "tomato",
  onion: "onion",
  garlic: "garlic",
  carrot: "carrot",
  potato: "potato",
  pepper: "pepper",
  chili: "chili",
  cucumber: "cucumber",
  zucchini: "zucchini",
  leafy: "leafy",
  broccoli: "leafy",
  mushroom: "mushroom",
  eggplant: "zucchini",
  corn: "carrot",
  pumpkin: "potato",
  lemon: "lemon",
  orange: "lemon",
  apple: "tomato",
  banana: "lemon",
  berry: "tomato",
  avocado: "pepper",
  herb: "basil",
  egg: "egg",
  cheese: "cheese",
  butter: "butter",
  milk: "milk",
  cream: "cream",
  yogurt: "yogurt",
  flour: "flour",
  bread: "flour",
  pasta: "pasta",
  rice: "rice",
  oil: "butter",
  salt: "salt",
  spice: "chili",
  sugar: "sugar",
  honey: "honey",
  chocolate: "honey",
  nuts: "bacon",
  beans: "pasta",
  lentils: "pasta",
  chicken: "chicken",
  beef: "beef",
  pork: "pork",
  bacon: "bacon",
  sausage: "sausage",
  fish: "fish",
  shrimp: "shrimp",
  tofu: "tofu",
  wine: "honey",
  beer: "milk",
  spirit: "milk",
  coffee: "stock",
  ice: "salt",
  water: "milk",
  stock: "cream",
  sauce: "tomato",
  mustard: "can",
  vinegar: "lemon",
  yeast: "flour",
  spoon: "salt",
  tortilla: "pasta",
  coconut: "garlic",
  can: "can",
  jarred: "can",
  plate: "salt"
});
const cache = new Map();
export function ingIconKey(name) {
  const n = norm(name);
  for (const [re, key] of RULES) if (re.test(n)) return key;
  return 'plate';
}
export function iconUrlFor(key) {
  const file = ASSETS[key] || ASSETS.plate;
  return new URL(`./assets/ingredient-illustrations/${file}.png`, import.meta.url).href;
}
export function ingIconUrl(name) {
  const key = ingIconKey(name);
  if (!cache.has(key)) cache.set(key, iconUrlFor(key));
  return cache.get(key);
}
export const ING_ICON_KEYS = Object.keys(ASSETS);
