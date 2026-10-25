/* ==========================================================================
   inventory-matching.js — conservatively match ingredient names in Polish.
   Shared by stock availability and recipe deduction; no storage side effects.
   ========================================================================== */
import { norm } from './util.js';

const clean = (value) => norm(String(value || '')
  .replace(/\s*\([^)]*\)\s*/g, ' ')
  .replace(/\b(swiezy|swieza|swieze|posiekany|posiekana|posiekane|drobno|starty|starta|starte)\b/g, ' ')
  .replace(/\s+/g, ' ')
  .trim());

function inflectionStem(word) {
  const w = norm(word);
  if (w.length < 4) return w;
  if (/^ogor(?:ek|ka|ku|ki|kow|kiem)?$/.test(w)) return 'ogor';
  if (/^olej(?:u|em|owi|ach|ami)?$/.test(w)) return 'olej';
  if (w === 'czosnek' || w === 'czosnku') return 'czosn';
  return w.replace(/(?:owymi|owych|owego|owej|owie|ami|ach|ech|ich|ych|ego|emu|owa|owe|owy|owi|ow|om|em|iej|ej|ie|ku|ek|y|i|e|a|u|o)$/, '') || w;
}

function sameInflectedName(a, b) {
  const left = clean(a).split(' ').filter(Boolean);
  const right = clean(b).split(' ').filter(Boolean);
  if (!left.length || left.length !== right.length) return false;
  return left.every((word, index) =>
    word.length >= 4 &&
    right[index].length >= 4 &&
    inflectionStem(word) === inflectionStem(right[index])
  );
}

/**
 * Exact phrase or conservative same-word-count inflection match.
 * Deliberately does not treat a generic ingredient as identical to a more
 * specific product (e.g. "pomidor" !== "pomidor koktajlowy").
 */
export function inventoryNamesMatch(item, name) {
  const target = clean(name);
  if (!target) return false;
  const names = [item?.name, ...(Array.isArray(item?.aliases) ? item.aliases : [])];
  return names.some((value) => {
    const candidate = clean(value);
    return candidate !== '' && (candidate === target || sameInflectedName(candidate, target));
  });
}
