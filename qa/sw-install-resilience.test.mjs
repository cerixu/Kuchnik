import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('sw.js', 'utf8');
const coreStart = source.indexOf('const CORE = [');
const coreEnd = source.indexOf('];', coreStart) + 2;
const installStart = source.indexOf("self.addEventListener('install', (event) => {");
const installEnd = source.indexOf("\nself.addEventListener('activate'", installStart);
if (coreStart < 0 || coreEnd < 2 || installStart < 0 || installEnd < 0) {
  throw new Error('Nie można odczytać CORE lub procedury instalacji service workera.');
}

const harnessSource = [
  "const VERSION = 'test-version';",
  source.slice(coreStart, coreEnd),
  "const scopeUrl = (p) => new URL(p, self.registration.scope).href;",
  source.slice(installStart, installEnd),
  'globalThis.__core = CORE;',
].join('\n');

const optionalAsset = (p) => /\.(?:png|jpe?g|webp|avif|woff2?|ttf|otf|svg|b64)$/i.test(p);
const relativePath = (request) => new URL(request.url).pathname.replace(/^\/Kuchnik\//, '');

test('missing optional image/font does not block service-worker installation', async () => {
  let installHandler;
  const calls = { required: [], optional: [] };
  const cache = {
    async addAll(requests) {
      calls.required = requests.map(relativePath);
      assert.equal(calls.required.some(optionalAsset), false, 'optional assets must not be in atomic addAll batch');
    },
    async add(request) {
      const path = relativePath(request);
      calls.optional.push(path);
      if (path === 'icon-512.png') throw new Error('simulated missing optional icon');
    },
  };
  const sandbox = {
    URL,
    Request,
    Promise,
    Set,
    caches: { open: async () => cache },
    self: {
      registration: { scope: 'https://example.test/Kuchnik/' },
      addEventListener(type, handler) { if (type === 'install') installHandler = handler; },
    },
  };
  vm.runInNewContext(harnessSource, sandbox);
  assert.equal(typeof installHandler, 'function', 'install handler should be registered');

  let waitUntilPromise;
  installHandler({ waitUntil(promise) { waitUntilPromise = promise; } });
  await waitUntilPromise;

  assert.ok(calls.required.includes('index.html'), 'HTML shell remains required');
  assert.ok(calls.required.includes('app.js'), 'application entry remains required');
  assert.ok(calls.optional.includes('icon-512.png'), 'missing icon is attempted as optional');
  assert.ok(calls.optional.some((path) => path.endsWith('.svg')), 'SVG illustrations are optional');
  assert.ok(calls.optional.some((path) => path.endsWith('.woff')), 'fonts are optional');
});
