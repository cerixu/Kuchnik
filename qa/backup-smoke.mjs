import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

try {
  await page.goto(base + '#/inventory', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 20000 });

  const result = await page.evaluate(async () => {
    const { db, openDB } = await import('./db.js');
    const { loadAll } = await import('./recipes.js');
    const { buildBackup, parseBackup, importBackup } = await import('./backup.js');
    const { pieceGrams } = await import('./nutrition.js');
    const { inventoryNamesMatch, convertInventoryAmount } = await import('./inventory.js');
    await openDB();
    await loadAll();

    const suffix = String(Date.now());
    const itemId = 'qa-backup-item-' + suffix;
    const moveId = 'qa-backup-move-' + suffix;
    const item = { id: itemId, name: 'Cebula testowa', aliases: ['Cebule testowe'], stock: 2, unit: 'kg', minStock: 0.5, pricePerUnit: 4, updatedAt: Date.now() };
    const movement = { id: moveId, inventoryId: itemId, name: item.name, type: 'waste', amount: -0.2, unit: 'kg', cost: 0.8, reason: 'Test QA', createdAt: Date.now() };
    await db.put('inventoryItems', item);
    await db.put('inventoryMovements', movement);

    const parsed = parseBackup(JSON.stringify(await buildBackup()));
    if (!parsed.backup.data.inventoryItems.some((x) => x.id === itemId)) throw new Error('Eksport nie zawiera produktu magazynowego.');
    if (!parsed.backup.data.inventoryMovements.some((x) => x.id === moveId)) throw new Error('Eksport nie zawiera ruchu magazynowego.');
    if (parsed.summary.inventoryItems < 1 || parsed.summary.inventoryMovements < 1) throw new Error('Podsumowanie kopii pomija magazyn.');

    await db.delete('inventoryItems', itemId);
    await db.delete('inventoryMovements', moveId);
    await importBackup(parsed.backup, 'merge');
    if (!(await db.get('inventoryItems', itemId))) throw new Error('Scalanie nie przywróciło produktu.');
    if (!(await db.get('inventoryMovements', moveId))) throw new Error('Scalanie nie przywróciło ruchu.');

    await importBackup(parsed.backup, 'merge');
    const sameMoves = (await db.getAll('inventoryMovements')).filter((x) => x.id === moveId);
    if (sameMoves.length !== 1) throw new Error('Ponowne scalanie zduplikowało ruch magazynowy.');

    const newer = await db.get('inventoryItems', itemId);
    newer.stock = 99;
    newer.updatedAt = Number(newer.updatedAt || 0) + 1000000;
    await db.put('inventoryItems', newer);
    await importBackup(parsed.backup, 'merge');
    const latest = await db.get('inventoryItems', itemId);
    if (latest.stock !== 99) throw new Error('Scalanie nadpisało nowszy lokalny stan magazynu.');

    const replaceBackup = parseBackup(JSON.stringify(await buildBackup()));
    await db.delete('inventoryItems', itemId);
    await db.delete('inventoryMovements', moveId);
    await importBackup(replaceBackup.backup, 'replace');
    if (!(await db.get('inventoryItems', itemId)) || !(await db.get('inventoryMovements', moveId))) {
      throw new Error('Zastąpienie kopią nie odtworzyło danych magazynowych.');
    }

    const legacy = parseBackup(JSON.stringify({
      app: 'Kucharzyna', version: 1,
      data: { recipes: [], ingredients: [], categories: [], shoppingItems: [], settings: [], history: [] }
    }));
    if (legacy.backup.data.inventoryItems.length || legacy.backup.data.inventoryMovements.length) {
      throw new Error('Starsza kopia bez magazynu nie została odczytana bezpiecznie.');
    }

    if (pieceGrams('cebula') !== 110 || pieceGrams('jajko') !== 55 || pieceGrams('papryka mielona') !== null) {
      throw new Error('Masa pojedynczej sztuki zwraca błędny wynik.');
    }
    if (!inventoryNamesMatch({ name: 'Pomidor' }, 'Pomidory')) throw new Error('Nie rozpoznano typowej odmiany nazwy.');
    if (inventoryNamesMatch({ name: 'Papryka mielona' }, 'Papryka')) throw new Error('Dopasowanie pomyliło paprykę świeżą z mieloną.');
    if (Math.abs(convertInventoryAmount(2, 'szt.', 'g', 'jajka') - 110) > 0.001) throw new Error('Niepoprawne przeliczenie sztuk na gramy.');
    if (Math.abs(convertInventoryAmount(2, 'szt.', 'kg', 'cebula') - 0.22) > 0.001) throw new Error('Niepoprawne przeliczenie sztuk na kilogramy.');
    if (convertInventoryAmount(100, 'ml', 'g', 'oliwa') !== null) throw new Error('Wykonano niedozwoloną konwersję objętości na masę.');
    return { exportedItems: parsed.summary.inventoryItems, exportedMovements: parsed.summary.inventoryMovements };
  });

  if (errors.length) throw new Error('Błędy w przeglądarce: ' + errors.join(' | '));
  console.log('PASS: backup round-trip; inventory merge; legacy backup; unit conversion', JSON.stringify(result));
} finally {
  await browser.close();
}
