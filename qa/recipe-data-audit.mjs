import fs from 'node:fs';
import { artKindFor } from '../art.js';

const SOURCES = ['seeds.js', 'seeds-pl.js', 'seeds-world.js', 'seeds-more.js', 'seeds-curated.js'];

if (artKindFor({ name: 'Baba ganoush', category: 'sauce', art: 'sauce:tomato' }) !== 'dip:eggplant') throw new Error('Baba ganoush musi używać ilustracji dipu z bakłażana, nawet jeśli ma stary wariant grafiki.');

if (artKindFor({ name: 'Pizza Margherita', category: 'main', art: 'plate' }) !== 'pizza') throw new Error('Pizza Margherita musi używać ilustracji pizzy.');

const ART_MAPPING_EXPECTATIONS = [
  ['Pierogi z mięsem', 'cat-mieso', 'dumpling'],
  ['Risotto z grzybami', 'cat-warzywa', 'risotto'],
  ['Pesto alla genovese', 'cat-sosy-bazowe', 'sauce:green'],
  ['Beszamel', 'cat-sosy-bazowe', 'sauce:white'],
  ['Salsa roja', 'cat-sosy-bazowe', 'sauce'],
  ['Satay orzechowy', 'cat-sosy-bazowe', 'sauce:brown'],
  ['Chimichurri', 'cat-sosy-bazowe', 'sauce:green'],
  ['Aioli', 'cat-sosy-bazowe', 'sauce:mayo'],
  ['Winegret klasyczny', 'cat-sosy-bazowe', 'sauce:oil'],
  ['Gremolata', 'cat-sosy-bazowe', 'sauce:green'],
  ['Wieprzowina w sosie słodko-kwaśnym', 'cat-mieso', 'pork'],
  ['Wieprzowina kung pao', 'cat-mieso', 'pork'],
  ['Wieprzowina z czarnym pieprzem', 'cat-mieso', 'pork'],
  ['Wieprzowina po syczuańsku', 'cat-mieso', 'pork'],
  ['Wieprzowina z bazylią tajską', 'cat-mieso', 'pork'],
  ['Wieprzowina w sosie orzechowym', 'cat-mieso', 'pork'],
  ['Ziemniaki puree', 'cat-warzywa', 'potato:mash'],
  ['Ziemniaki pieczone', 'cat-warzywa', 'potato:roasted'],
  ['Frytki', 'cat-warzywa', 'fries'],
  ['Ryż jaśminowy', 'cat-warzywa', 'rice'],
  ['Kasza gryczana', 'cat-warzywa', 'grain:buckwheat'],
  ['Kasza jaglana', 'cat-warzywa', 'grain:millet'],
  ['Grillowane warzywa', 'cat-warzywa', 'veg'],
  ['Fasolka szparagowa z migdałami', 'cat-warzywa', 'beans'],
  ['Colesław', 'cat-warzywa', 'salad:slaw'],
];
for (const [name, category, expected] of ART_MAPPING_EXPECTATIONS) {
  const actual = artKindFor({ name, category, art: 'food' });
  if (actual !== expected) {
    throw new Error('Zła ilustracja receptury "' + name + '": oczekiwano "' + expected + '", otrzymano "' + actual + '".');
  }
}

const EXPECTED_SOURCE_COUNT = 453;
const EXPECTED_HAND_COUNT = 3;
const BAD_ENGLISH = /\b(almonds|butter|flour|sugar|cream|cheese|milk|cup|cups|tbsp|tsp|tablespoon|teaspoon|yellow)\b/i;
const BAD_QTY_GRAMMAR = [
  /\b[234]\s+łyżka\b/i,
  /\b(?:[5-9]|[1-9]\d+)\s+łyżka\b/i,
  /\b1\s+łyżki\b/i,
  /\b[234]\s+łyżeczka\b/i,
  /\b(?:[5-9]|[1-9]\d+)\s+łyżeczka\b/i,
  /\b1\s+łyżeczki\b/i,
  /\b\d+[,.]\d+\s+łyż(?:ka|eczka)\b/i,
  /\bjeden\s+zółt/i,
];

function normalizeName(s) {
  return s.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

const issues = [];
const names = new Map();
let sourceCount = 0;

for (const file of SOURCES) {
  const text = fs.readFileSync(file, 'utf8');
  const recipeBlocks = text.split(/\n(?=# )/).filter((block) => block.startsWith('# '));
  const recipeNames = [...text.matchAll(/^# (.+)$/gm)].map((m) => m[1].trim());
  sourceCount += recipeNames.length;

  for (const block of recipeBlocks) {
    const lines = block.split('\n');
    const name = lines[0].slice(2).trim();
    const ingredientLines = lines.filter((line) => line.includes('|') && !line.startsWith('@ '));
    const steps = lines.filter((line) => line.startsWith('> ')).map((line) => line.slice(2).trim());
    if (!lines.some((line) => line.startsWith('@ '))) issues.push(file + ': brak metadanych: ' + name);
    if (!lines.some((line) => line.startsWith(': '))) issues.push(file + ': brak opisu: ' + name);
    if (ingredientLines.length < 2) issues.push(file + ': mniej niż 2 składniki: ' + name);
    if (!steps.length) issues.push(file + ': brak instrukcji: ' + name);
    const normalizedSteps = steps.map((step) => step.toLocaleLowerCase('pl').replace(/\s+/g, ' ').trim());
    if (normalizedSteps.some((step, idx) => normalizedSteps.indexOf(step) !== idx)) {
      issues.push(file + ': powtórzony krok w tej samej recepturze: ' + name);
    }
  }

  if (!recipeNames.length) issues.push(file + ': brak receptur');
  recipeNames.forEach((name, idx) => {
    const key = normalizeName(name);
    if (!key) issues.push(file + ': pusta nazwa #' + (idx + 1));
    if (names.has(key)) issues.push('DUPLIKAT NAZWY: "' + name + '" oraz "' + names.get(key) + '"');
    else names.set(key, name);
    if (BAD_ENGLISH.test(name)) issues.push(file + ': angielski fragment w nazwie: "' + name + '"');
  });

  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith('> ')) {
      if (BAD_ENGLISH.test(line.slice(2))) issues.push(file + ':' + (i + 1) + ': angielski fragment w kroku: "' + line.slice(2) + '"');
      continue;
    }
    if (line.startsWith(': ')) {
      if (BAD_ENGLISH.test(line.slice(2))) issues.push(file + ':' + (i + 1) + ': angielski fragment w opisie: "' + line.slice(2) + '"');
      continue;
    }
    if (line.startsWith('# ') || line.startsWith('@ ') || line.startsWith('## ')) continue;
    if (line.includes('|')) {
      const parts = line.split('|');
      const left = parts[0].trim();
      const ing = parts.slice(1).join('|').trim();
      if (!ing) issues.push(file + ':' + (i + 1) + ': pusty składnik');
      if (BAD_ENGLISH.test(ing)) issues.push(file + ':' + (i + 1) + ': angielski fragment w składniku: "' + ing + '"');
      BAD_QTY_GRAMMAR.forEach((re) => { if (re.test(left)) issues.push(file + ':' + (i + 1) + ': podejrzana odmiana jednostki: "' + left + '"'); });
    }
  }
}

const curatedText = fs.readFileSync('seeds-curated.js', 'utf8');
const curatedBlocks = curatedText.split(/\n(?=# )/).filter((block) => block.startsWith('# '));
const GENERIC_STEPS = [
  /^(?:Przygotuj bazę\.|Dodaj dodatki\.|Podawaj od razu\.|Przygotuj składniki\.|Dopraw i podawaj\.)$/i,
  /Jeśli receptura zawiera/i,
  /odpowiedniej dla (?:danego rodzaju|tego deseru|rodzaju wypieku)/i,
  /Przygotuj bazę napoju/i,
  /Dodaj dodatki, które wymagają/i,
  /Warzywa i pozostałe składniki oczyść/i,
  /piecz, gotuj albo schładzaj/i,
  /temperatury odpowiedniej/i,
  /jeśli przewidziano go w recepturze/i,
  /wykończ ziołami, olejem aromatyzowanym lub przyprawami z listy/i,
  /z dekoracją przewidzianą w recepturze/i,
  /przygotuj sok lub owoce zgodnie/i,
  /przygotuj elastyczne ciasto/i,
  /wymieszaj mąkę, wodę, drożdże lub zakwas/i,
  /zgodnie z recepturą/i,
  /Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju/i,
  /Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia/i,
  /Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania/i,
  /Udekoruj składnikiem z listy i podawaj od razu/i,
  /Przygotuj dodatki i pokrój je na równe kawałki\. Jeśli używasz makaronu, ugotuj go osobno\./i,
  /Dodaj tofu, glony, warzywa lub owoce morza z receptury/i,
];
for (const block of curatedBlocks) {
  const name = block.split('\n')[0].slice(2).trim();
  const ingredients = block.split('\n').filter((line) => line.includes('|') && !line.startsWith('@ '));
  const steps = [...block.matchAll(/^> (.+)$/gm)].map((m) => m[1].trim());
  const hasTofuIngredient = ingredients.some((line) => /\|\s*tofu(?:\s|$)/i.test(line));
  if (!hasTofuIngredient && steps.some((step) => /tofu odłóż na bok/i.test(step))) {
    issues.push('Krok odwołuje się do tofu, którego nie ma w składnikach: ' + name);
  }
  if (ingredients.length < 3) issues.push('Receptura bez minimum 3 składników: ' + name);
  if (steps.length < 4) issues.push('Za mało kroków w recepturze: ' + name);
  if (steps.some((step) => GENERIC_STEPS.some((pattern) => pattern.test(step)))) issues.push('Pozostał generyczny krok w recepturze: ' + name);
  if (steps.some((step) => /^Po wypieku dodaj .+; podawaj od razu\.$/i.test(step))) issues.push('Niepełna instrukcja wykończenia pizzy: ' + name);
  const meta = block.split('\n').find((line) => line.startsWith('@ ')) || '';
  if (/\btags=wok\b/.test(meta)) {
    const firstIngredient = ingredients[0]?.split('|').slice(1).join('|').trim() || '';
    const expectedCategory = /krewetki/i.test(firstIngredient) ? 'owoce-morza' : /tofu/i.test(firstIngredient) ? 'warzywa' : 'mieso';
    if (!new RegExp('\\bcat=' + expectedCategory + '\\b').test(meta)) issues.push('Nieprawidłowa kategoria dania z woka: ' + name);
  }
}


const criticalRecipes = new Map([
  ['Sernik krakowski', [/temperaturze odpowiedniej dla rodzaju wypieku/i, /owoce pokrój i dopraw/i, /owoce pokrój.*masę serową/i]],
  ['Pączki różane', [/nagrzej piekarnik do temperatury odpowiedniej/i, /jeśli receptura zawiera/i, /piecz, gotuj albo schładzaj/i]],
  ['Profiteroles', [/temperaturze odpowiedniej dla tego deseru/i, /jeśli receptura zawiera/i, /piecz, gotuj albo schładzaj/i]],
  ['Amerykańska szarlotka', [/masę serową/i, /temperaturze odpowiedniej dla rodzaju wypieku/i]],
  ['Bułeczki cynamonowe', [/temperaturze odpowiedniej dla tego deseru/i, /piecz, gotuj albo schładzaj/i]],
  ['Tres leches', [/temperaturze odpowiedniej dla tego deseru/i, /piecz, gotuj albo schładzaj/i]],
  ['Baklava', [/temperaturze odpowiedniej dla tego deseru/i, /piecz, gotuj albo schładzaj/i]],
  ['Basbousa', [/temperaturze odpowiedniej dla tego deseru/i, /piecz, gotuj albo schładzaj/i]],
  ['Matcha tiramisu', [/temperaturze odpowiedniej dla tego deseru/i, /piecz, gotuj albo schładzaj/i]],
]);
for (const [name, patterns] of criticalRecipes) {
  const block = curatedBlocks.find((item) => item.startsWith('# ' + name + '\n'));
  if (!block) { issues.push('Brak receptury wymaganej w kontroli jakości: ' + name); continue; }
  const steps = [...block.matchAll(/^> (.+)$/gm)].map((m) => m[1]);
  for (const pattern of patterns) {
    if (steps.some((step) => pattern.test(step))) issues.push('Pozostała instrukcja-szablon (' + pattern + '): ' + name);
  }
}
const BAD_MEAT_FORMS = [
  /\b(?:wołowina|wieprzowina|kaczka)\s+pokrój\b/i,
  /\b(?:dodaj|włóż)\s+(?:wołowina|wieprzowina|kaczka)\b/i,
];
for (const block of curatedBlocks) {
  const name = block.split('\n')[0].slice(2).trim();
  const steps = [...block.matchAll(/^> (.+)$/gm)].map((m) => m[1]);
  if (steps.some((step) => BAD_MEAT_FORMS.some((pattern) => pattern.test(step)))) {
    issues.push('Błędna odmiana mięsa w instrukcji: ' + name);
  }
}

const GENERIC_PROTEIN_STEP = /\bobsmaż białko\b|\bbiałko partiami\b/i;
for (const block of curatedBlocks) {
  const name = block.split('\n')[0].slice(2).trim();
  const steps = [...block.matchAll(/^> (.+)$/gm)].map((m) => m[1]);
  if (steps.some((step) => GENERIC_PROTEIN_STEP.test(step))) {
    issues.push('Zbyt ogólna instrukcja smażenia białka: ' + name);
  }
}
const tofuPepper = curatedBlocks.find((block) => block.startsWith('# Tofu z czarnym pieprzem\n')) || '';
if (/sos ostrygowy/i.test(tofuPepper)) {
  issues.push('Tofu z czarnym pieprzem nie może domyślnie zawierać sosu ostrygowego.');
}

const handSource = fs.readFileSync('recipes.js', 'utf8');
const handIds = ['rcp_seed_pizza', 'rcp_seed_carbonara', 'rcp_seed_sos'];
const handCount = handIds.filter((id) => handSource.includes("id: '" + id + "'")).length;

if (sourceCount !== EXPECTED_SOURCE_COUNT) issues.push('Nieoczekiwana liczba seedów: ' + sourceCount + ' (oczekiwano ' + EXPECTED_SOURCE_COUNT + ')');
if (handCount !== EXPECTED_HAND_COUNT) issues.push('Nieoczekiwana liczba ręcznych seedów: ' + handCount + ' (oczekiwano ' + EXPECTED_HAND_COUNT + ')');

console.log(JSON.stringify({ sourceCount, handCount, total: sourceCount + handCount, uniqueNames: names.size, issues: issues.length }, null, 2));

if (issues.length) {
  console.error('\nRECIPE DATA AUDIT FAIL\n' + issues.slice(0, 120).join('\n'));
  if (issues.length > 120) console.error('…i ' + (issues.length - 120) + ' kolejnych.');
  process.exit(1);
}
if (names.size !== sourceCount) process.exit(1);
console.log('PASS: recipe source audit');
