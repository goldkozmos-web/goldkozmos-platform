const fs = require('node:fs'), vm = require('node:vm'), ts = require('typescript');
const test = require('node:test'), assert = require('node:assert/strict');
function load(file, mocks, globals = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require: name => { if (name in mocks) return mocks[name]; throw Error(name); }, Buffer, process: { env: { VAPID_PRIVATE_KEY: 'test-only-not-a-production-key' } }, console: { error() {} }, Date, setTimeout, clearTimeout, ...globals });
  return module.exports;
}
const push = load('src/lib/admin/push.ts', { 'node:crypto': require('node:crypto') });
const sub = { endpoint: 'https://push.example.test/device', keys: { p256dh: 'test-key', auth: 'test-auth' } };
function serverFixture(status = 0, lastSeen = null) {
  const deleted = [], sent = [];
  const client = { from: () => {
    const query = { select: () => query, eq: () => query, limit: async () => ({ data: [{ id: 'one', content: push.packPushSub(sub) }], error: null }), maybeSingle: async () => ({ data: lastSeen ? { last_seen_at: lastSeen } : null, error: null }), delete: () => ({ eq: async (_key, value) => deleted.push(value) }) };
    return query;
  } };
  const server = load('src/lib/admin/push-server.ts', {
    'web-push': { setVapidDetails() {}, async sendNotification(subscription, payload) { sent.push(JSON.parse(payload)); if (status) throw { statusCode: status }; } },
    '../supabase/anon': { createSupabaseAnonClient: () => client }, '../supabase/service': { createSupabaseServiceClient: () => client },
    './member-keys': { isMemberVisitorKey: () => false }, '../presence/labels': { shouldSkipPresencePath: path => path.startsWith('/admin') }, './push': push,
  });
  return { server, deleted, sent };
}
test('encrypted device records are never truncated', () => {
  const long = { ...sub, endpoint: 'https://push.example.test/' + 'x'.repeat(770) };
  const packed = push.packPushSub(long);
  assert.ok(packed.length > 1000);
  assert.equal(push.parsePushSub(packed).endpoint, long.endpoint);
});
test('successful push returns a real accepted-send count', async () => {
  const f = serverFixture();
  const result = await f.server.sendAdminPush({ title: 'Test', body: 'Test' }, sub.endpoint);
  assert.equal(result.sent, 1); assert.equal(f.sent.length, 1);
});
test('a transient push provider error preserves the registered device', async () => {
  const f = serverFixture(503);
  assert.equal((await f.server.sendAdminPush({ title: 'Test', body: 'Test' })).sent, 0);
  assert.equal(f.deleted.length, 0);
});
test('a definitively expired subscription is removed', async () => {
  const f = serverFixture(410);
  await f.server.sendAdminPush({ title: 'Test', body: 'Test' });
  assert.equal(f.deleted[0], 'one');
});
test('new visitors and returning inactive visitors trigger arrivals', async () => {
  const { isPresenceArrival } = load('src/lib/presence/arrival.ts', {});
  const now = Date.now();
  assert.equal(isPresenceArrival(undefined, 'visitor', now), true);
  assert.equal(isPresenceArrival(`visitor|${now - 180000}`, 'visitor', now), true);
  assert.equal(isPresenceArrival(`visitor|${now - 20000}`, 'visitor', now), false);
  assert.equal(isPresenceArrival(`other|${now}`, 'visitor', now), true);
});
test('heartbeat and ongoing-page activity do not send duplicate arrivals', async () => {
  const f = serverFixture();
  await f.server.notifyPresencePush({ kind: 'page', path: '/', visitorKey: 'visitor', heartbeat: true, arrival: true });
  await f.server.notifyPresencePush({ kind: 'page', path: '/', visitorKey: 'visitor', heartbeat: false, arrival: false });
  assert.equal(f.sent.length, 0);
});
function phoneFixture(permission, accepted, worker) {
  const states = []; let index = 0;
  const hook = load('src/lib/admin/phone-push.ts', { react: {
    useState(value) { const slot = index++; states[slot] = value; return [value, next => states[slot] = next]; },
    useEffect() {}, useCallback: fn => fn,
  } }, {
    Notification: { permission, requestPermission: async () => permission },
    window: { PushManager: {} }, navigator: { userAgent: 'Android Chrome', serviceWorker: { ready: Promise.resolve({}), register: async () => ({ installing: worker, update: async () => undefined, pushManager: { getSubscription: async () => { if (worker) assert.equal(worker.state, 'activated'); return sub; } } }) } },
    localStorage: { setItem() {} }, atob: x => Buffer.from(x, 'base64').toString('binary'), AbortSignal,
    fetch: async (_url, init) => init?.method === 'POST' ? { ok: accepted, json: async () => accepted ? { ok: true } : { error: 'Device save failed' } } : { ok: true, json: async () => ({ publicKey: 'dGVzdA' }) },
  });
  return { hook: hook.useAdminPhonePush(), states };
}
test('denied permission never displays phone notifications as enabled', async () => {
  const f = phoneFixture('denied', true); await f.hook.toggle();
  assert.equal(f.states[0], false); assert.match(f.states[2], /Bildirim izni verilmedi/);
});
test('failed device registration never displays notifications as enabled', async () => {
  const f = phoneFixture('granted', false); await f.hook.toggle();
  assert.equal(f.states[0], false); assert.equal(f.states[2], 'Device save failed');
});
test('permission and successful server registration enable phone notifications', async () => {
  const f = phoneFixture('granted', true); await f.hook.toggle();
  assert.equal(f.states[0], true);
});

test('a newly installed notification worker activates before device registration', async () => {
  let changed;
  const worker = { state: 'installed', addEventListener: (_name, callback) => changed = callback, removeEventListener() {}, postMessage() { queueMicrotask(() => { worker.state = 'activated'; changed?.(); }); } };
  const f = phoneFixture('granted', true, worker);
  await f.hook.toggle();
  assert.equal(f.states[0], true);
  assert.equal(worker.state, 'activated');
});

function testRouteFixture(authorized) {
  let delivered = 0;
  const query = { select: () => query, eq: () => query, then: resolve => Promise.resolve(resolve({ data: [{ content: push.packPushSub(sub) }], error: null })) };
  const route = load('src/app/api/admin/push/test/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/admin/auth.server': { resolveAdminRequest: async () => ({ access: authorized ? { status: 'ok', actor: { id: 'admin' } } : { status: 'signed-out' }, client: { from: () => query } }) },
    '@/lib/admin/push': push,
    '@/lib/admin/push-server': { sendAdminPush: async () => { delivered++; return { sent: 1, failed: 0 }; } },
  });
  return { post: endpoint => route.POST({ json: async () => ({ endpoint }) }), deliveries: () => delivered };
}
test('a signed-out test request cannot send a notification', async () => {
  const f = testRouteFixture(false);
  assert.equal((await f.post(sub.endpoint)).status, 401);
  assert.equal(f.deliveries(), 0);
});
test('test delivery requires a device registered to the authenticated administrator', async () => {
  const f = testRouteFixture(true);
  assert.equal((await f.post('https://push.example.test/foreign-device')).status, 404);
  assert.equal(f.deliveries(), 0);
  assert.equal((await f.post(sub.endpoint)).body.ok, true);
  assert.equal(f.deliveries(), 1);
});
