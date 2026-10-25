import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const sw = fs.readFileSync('sw.js', 'utf8');
const match = sw.match(/const CORE = \[([\s\S]*?)\];/);
assert.ok(match, 'sw.js must declare the CORE cache list');

const core = [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
const coreSet = new Set(core);
const moduleFiles = core.filter((file) => file.endsWith('.js'));

test('offline shell contains app entry and every imported local JavaScript dependency', () => {
  assert.ok(coreSet.has('app.js'), 'app.js must be cached for offline startup');

  const failures = [];
  for (const file of moduleFiles) {
    assert.ok(fs.existsSync(file), `cached module is missing: ${file}`);
    const source = fs.readFileSync(file, 'utf8');
    const patterns = [
      /^[ \t]*import[ \t]+(?:[\s\S]*?[ \t]+from[ \t]*)?['"]([^'"]+)['"]/gm,
      /^[ \t]*export[ \t]+(?:\*|\{[\s\S]*?\})[ \t]+from[ \t]*['"]([^'"]+)['"]/gm,
      /\bimport\([ \t]*['"]([^'"]+)['"][ \t]*\)/g,
    ];

    for (const pattern of patterns) {
      for (const found of source.matchAll(pattern)) {
        const specifier = found[1];
        if (!specifier.startsWith('.')) continue;

        const target = path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier));
        if (!fs.existsSync(target)) {
          failures.push(`${file}: local dependency does not exist: ${specifier}`);
          continue;
        }
        if (target.endsWith('.js') && !coreSet.has(target)) {
          failures.push(`${file}: ${target} is imported but absent from service-worker CORE`);
        }
      }
    }
  }

  assert.deepEqual(failures, [], failures.join('\n'));
  assert.ok(moduleFiles.length > 0, 'CORE must include JavaScript modules');
});
