import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('sw.js', 'utf8');
const start = source.indexOf('async function networkFirst(event, url, cacheKey) {');
const end = source.indexOf("\nself.addEventListener('fetch'", start);
if (start < 0 || end < 0) throw new Error('Nie można odczytać networkFirst z sw.js.');

const functionSource = [
  'const VERSION = "test-version";',
  'const NETWORK_TIMEOUT = 25;',
  source.slice(start, end),
  'globalThis.networkFirst = networkFirst;',
  'globalThis.staleWhileRevalidate = staleWhileRevalidate;',
].join('\n');

function harness({ cached = null, fetchImpl }) {
  const waits = [];
  const writes = [];
  const cache = { match: async () => cached, put: async (...args) => { writes.push(args); } };
  const sandbox = {
    caches: { open: async () => cache },
    fetch: fetchImpl,
    setTimeout,
  };
  vm.runInNewContext(functionSource, sandbox);
  return { networkFirst: sandbox.networkFirst, staleWhileRevalidate: sandbox.staleWhileRevalidate, waits, cache, writes };
}

const eventFor = (waits) => ({ waitUntil(promise) { waits.push(promise); } });
const stalledFetch = () => new Promise(() => {});

test('cache miss plus stalled network rejects after bounded timeout', async () => {
  const { networkFirst, waits } = harness({ fetchImpl: stalledFetch });
  await assert.rejects(
    networkFirst(eventFor(waits), 'https://example.test/index.html', '/index.html'),
    /Network timeout without cached response/,
  );
  assert.equal(waits.length, 0, 'cache miss must not keep the service-worker event alive indefinitely');
});

test('cached response is returned when network exceeds the timeout', async () => {
  const cached = { ok: true, source: 'cache' };
  const { networkFirst, waits } = harness({ cached, fetchImpl: stalledFetch });
  const response = await networkFirst(eventFor(waits), 'https://example.test/index.html', '/index.html');
  assert.equal(response, cached);
  assert.equal(waits.length, 1);
  await waits[0];
});

test('a quick network response is returned on a cache miss', async () => {
  const network = { ok: true, source: 'network', clone() { return this; } };
  const { networkFirst, waits } = harness({ fetchImpl: async () => network });
  const response = await networkFirst(eventFor(waits), 'https://example.test/index.html', '/index.html');
  assert.equal(response, network);
  assert.equal(waits.length, 0);
});

test('cached static asset is served while a bounded refresh runs in background', async () => {
  let finishFetch;
  const cached = { ok: true, source: 'cache' };
  const { staleWhileRevalidate, waits, writes } = harness({
    cached,
    fetchImpl: () => new Promise((resolve) => { finishFetch = resolve; }),
  });
  const response = await staleWhileRevalidate(eventFor(waits), 'https://example.test/app.js');
  assert.equal(response, cached);
  assert.equal(waits.length, 1, 'refresh should remain attached to the event with a timeout');

  const fresh = { ok: true, source: 'network', clone() { return this; } };
  finishFetch(fresh);
  await waits[0];
  assert.equal(writes.length, 1, 'fresh response should replace the cached copy');
});

test('a static asset cache miss uses the network and stores the response', async () => {
  const network = { ok: true, source: 'network', clone() { return this; } };
  const { staleWhileRevalidate, waits, writes } = harness({ fetchImpl: async () => network });
  const response = await staleWhileRevalidate(eventFor(waits), 'https://example.test/app.css');
  assert.equal(response, network);
  assert.equal(waits.length, 0);
  assert.equal(writes.length, 1);
});

test('a static asset cache miss plus stalled network rejects after the timeout', async () => {
  const { staleWhileRevalidate, waits } = harness({ fetchImpl: stalledFetch });
  await assert.rejects(
    staleWhileRevalidate(eventFor(waits), 'https://example.test/app.js'),
    /Network timeout without cached response/,
  );
  assert.equal(waits.length, 0);
});
