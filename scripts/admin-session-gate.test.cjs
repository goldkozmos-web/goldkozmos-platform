const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const test = require('node:test');
const ts = require('typescript');
const jsx = (type, props) => ({ type, props });
function load(path, mocks = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, setTimeout, clearTimeout,
    require(name) { if (name in mocks) return mocks[name]; throw Error(name); },
  });
  return module.exports;
}
const access = load('src/lib/admin/access.ts');
const events = load('src/lib/profilim/sessionEvents.ts');
const admin = { id: 'verified-admin', email: 'goldkozmos@gmail.com', displayName: 'Gold', role: 'admin' };
function gateFixture(initialAccess) {
  const states = [], effects = [];
  let index = 0, mounted = false, notify;
  const Gate = load('src/components/admin/AdminClientGate.tsx', {
    'react/jsx-runtime': { jsx, jsxs: jsx },
    react: { useState(initial) { const slot = index++; if (!mounted) states[slot] = initial; return [states[slot], value => { states[slot] = value; }]; }, useEffect(fn) { if (!mounted) effects.push(fn); } },
    '../../lib/admin/access': access,
    '../../lib/profilim/sessionEvents': events,
    '../../lib/profilim/userFromAuth': { profilimUserFromAuth: user => user },
    '../../lib/supabase/browser': { createSupabaseBrowserClient: () => ({ auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: cb => { notify = cb; return { data: { subscription: { unsubscribe() {} } } }; },
    } }) },
    './AdminLocked': { default: 'locked' }, './AdminShell': { default: 'shell' },
  }).default;
  const render = () => { index = 0; return Gate({ initialAccess, children: 'dashboard' }); };
  render(); mounted = true;
  const cleanup = effects.map(fn => fn());
  return { render, notify: (...args) => notify(...args), close: () => cleanup.forEach(fn => fn?.()) };
}
test('a server-verified admin survives empty browser session initialization', async () => {
  const f = gateFixture({ status: 'ok', actor: admin });
  await Promise.resolve();
  f.notify('INITIAL_SESSION', null);
  assert.equal(f.render().type, 'shell');
  assert.equal(f.render().props.actor.email, admin.email);
  f.close();
});
test('explicit sign-out clears the verified admin', () => {
  const f = gateFixture({ status: 'ok', actor: admin });
  f.notify('SIGNED_OUT', null);
  assert.equal(f.render().type, 'locked');
  f.close();
});
test('a forbidden account cannot open the admin shell', async () => {
  const f = gateFixture({ status: 'forbidden', actor: { ...admin, email: 'member@example.com', role: 'user' } });
  await Promise.resolve();
  assert.equal(f.render().type, 'locked');
  assert.equal(f.render().props.title, 'Bu alan yalnızca yönetim içindir');
  f.close();
});
test('an unsigned browser receives the login gate', async () => {
  const f = gateFixture({ status: 'signed-out' });
  await Promise.resolve();
  assert.equal(f.render().type, 'locked');
  f.close();
});
test('admin layout passes the server-verified access into the client gate', async () => {
  const Layout = load('src/app/admin/layout.tsx', {
    'react/jsx-runtime': { jsx, jsxs: jsx },
    '../../components/admin/AdminClientGate': { default: 'gate' },
    '../../lib/admin/auth.server': { getAdminAccess: async () => ({ status: 'ok', actor: admin }) },
    '../../styles/admin.css': {},
  }).default;
  const result = await Layout({ children: 'dashboard' });
  assert.equal(result.props.children.props.initialAccess.actor.id, 'verified-admin');
});
