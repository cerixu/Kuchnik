import test from 'node:test';
import assert from 'node:assert/strict';

import { pizzaCalc, pizzaCalcFromFlour } from '../calculator.js';

test('mąka-first: zakwas 1:1:2 mieści się w zadanej hydracji i masie całkowitej', () => {
  const r = pizzaCalcFromFlour({
    flour: 7500, hydration: 65, salt: 3, oil: 0, yeast: 0, starter: 0.65, ballWeight: 250,
  });

  assert.equal(r.flour, 7500);
  assert.equal(r.water, 4875);
  assert.equal(r.salt, 225);
  assert.equal(r.starterSeed, 12.1875);
  assert.equal(r.starterFlour, 12.1875);
  assert.equal(r.starterWater, 24.375);
  assert.equal(r.starter, 48.75);
  assert.equal(r.starterMotherFlour, 6.09375);
  assert.equal(r.starterMotherWater, 6.09375);
  assert.equal(r.starterFlourContribution, 18.28125);
  assert.equal(r.starterWaterContribution, 30.46875);
  assert.equal(r.doughFlour + r.starterFlour + r.starterMotherFlour, r.flour);
  assert.equal(r.doughWater + r.starterWater + r.starterMotherWater, r.water);
  assert.equal(r.doughFlour, 7481.71875);
  assert.equal(r.doughWater, 4844.53125);
  assert.equal(r.pctSum, 168, 'starter is included in formula flour/water, not added as an extra percentage');
  assert.equal(r.total, 12600);
  assert.equal(r.ballCount, 50);
  assert.equal(r.remainder, 100);
  assert.equal(r.starterValid, true);

  const components = r.doughFlour + r.doughWater + r.salt + r.oil + r.yeast + r.starter;
  assert.ok(Math.abs(components - r.total) < 1e-8, 'component mass must equal total dough mass');
});

test('procent oznacza masę aktywnego zakwasu 1:1:2 względem całkowitej mąki', () => {
  const r = pizzaCalcFromFlour({
    flour: 7500, hydration: 63.5, salt: 2.8, oil: 0, yeast: 0, starter: 15.65,
  });

  assert.ok(Math.abs(r.starter / r.flour * 100 - 15.65) < 1e-10);
  assert.ok(Math.abs(r.starterSeed + r.starterFlour + r.starterWater - r.starter) < 1e-10);
  assert.ok(Math.abs(r.starterWater / r.starterFlour - 2) < 1e-10);
  assert.ok(Math.abs(r.doughFlour + r.starterFlour + r.starterMotherFlour - r.flour) < 1e-10);
  assert.ok(Math.abs(r.doughWater + r.starterWater + r.starterMotherWater - r.water) < 1e-10);
  assert.ok(Math.abs(r.doughFlour + r.starterFlourContribution - r.flour) < 1e-10);
  assert.ok(Math.abs(r.doughWater + r.starterWaterContribution - r.water) < 1e-10);
  assert.equal(r.massBalanceValid, true);
  assert.equal(r.starterValid, true);
});

test('tryb kulek zachowuje docelową masę także przy zakwasie', () => {
  const r = pizzaCalc({
    balls: 4, ballWeight: 250, hydration: 65, salt: 3, oil: 0, yeast: 0, starter: 0.65,
  });

  assert.equal(r.total, 1000);
  assert.equal(r.ballCount, 4);
  assert.equal(r.remainder, 0);
  assert.equal(r.starterValid, true);
  assert.ok(Math.abs((r.doughFlour + r.doughWater + r.salt + r.oil + r.yeast + r.starter) - r.total) < 1e-8);
});

test('tryb drożdżowy bez zakwasu zachowuje dotychczasowe procenty', () => {
  const r = pizzaCalc({ balls: 4, ballWeight: 250, hydration: 65, salt: 3, oil: 0, yeast: 0.2 });
  const expectedFlour = 1000 / 1.682;

  assert.ok(Math.abs(r.flour - expectedFlour) < 1e-9);
  assert.equal(r.starter, 0);
  assert.equal(r.pctSum, 168.2);
  assert.equal(r.total, 1000);
});

test('nieprawidłowo niska hydracja sygnalizuje, że nie da się odjąć wody do zakwasu', () => {
  const r = pizzaCalcFromFlour({ flour: 1000, hydration: 1, salt: 2, starter: 1 });
  assert.equal(r.starterValid, false);
  assert.ok(r.doughWater < 0);
});

test('niepoprawne liczby nie propagują NaN ani Infinity do wyniku', () => {
  const r = pizzaCalcFromFlour({ flour: Infinity, hydration: NaN, salt: 3, starter: Infinity });
  for (const key of ['flour', 'water', 'salt', 'oil', 'yeast', 'total', 'pctSum', 'doughFlour', 'doughWater']) {
    assert.ok(Number.isFinite(r[key]), key + ' must remain finite');
  }
});
