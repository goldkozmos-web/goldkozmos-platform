import test from 'node:test';
import assert from 'node:assert/strict';
import { visitWindow, visitSeries } from '../src/lib/admin/visit-series.ts';
import { activityIdentity, activityKey } from '../src/lib/presence/activity.ts';

test('Istanbul midnight uses the new local day even before UTC midnight', () => {
  const window = visitWindow(7, new Date('2026-10-03T21:30:00Z'));
  assert.equal(window.days.at(-1), '2026-10-04');
  assert.equal(window.days.length, 7);
  assert.equal(window.from, '2026-09-27T21:00:00.000Z');
  assert.equal(window.to, '2026-10-04T21:00:00.000Z');
});
test('month boundaries and empty days are retained for each range', () => {
  for (const range of [1, 7, 30, 90] as const) {
    const window = visitWindow(range, new Date('2026-03-01T00:00:00Z'));
    const data = visitSeries([], window.days);
    assert.equal(data.points.length, range);
    assert.equal(data.totals.visits, 0);
    assert.ok(data.points.every(point => point.visits === 0));
  }
});

test('today includes only the current Istanbul calendar day', () => {
  const window = visitWindow(1, new Date('2026-10-06T20:50:00Z'));
  assert.deepEqual(window.days, ['2026-10-06']);
  assert.equal(window.from, '2026-10-05T21:00:00.000Z');
  assert.equal(window.to, '2026-10-06T21:00:00.000Z');
  const data = visitSeries([
    { path: '/', created_at: '2026-10-05T20:59:59Z', visitor_key: 'previous-day' },
    { path: '/', created_at: '2026-10-05T21:00:00Z', visitor_key: 'today' },
    { path: '/goldblog', created_at: '2026-10-06T20:50:00Z', visitor_key: 'today' },
  ], window.days);
  assert.deepEqual(data.totals, { visits: 2, uniques: 1 });
});
test('registration events and control pages cannot inflate real visits', () => {
  const events = ['/uyelik', '/admin', '/auth/kayit', '/api/presence', '/goldmind'].map(path => ({path, created_at:'2026-10-03T21:01:00Z', visitor_key: 'browser-1234'}));
  events.push({path:'/',created_at:'2026-10-04T09:00:00Z',visitor_key:'gkmem_fake-registration'});
  const data = visitSeries(events, ['2026-10-03', '2026-10-04']);
  assert.deepEqual(data.totals, {visits:1, uniques:1});
  assert.equal(data.points[1].visits, 1);
});
test('a signed in member on two devices is one person across days', () => {
  const user = '12345678-1234-1234-1234-123456789abc';
  const one = activityKey('browser-1111', user);
  const two = activityKey('browser-2222', user);
  assert.deepEqual(activityIdentity(one), {userId:user, visitorId:'browser-1111'});
  const data = visitSeries([{path:'/',created_at:'2026-10-03T09:00:00Z',visitor_key:one},{path:'/goldmind',created_at:'2026-10-04T09:00:00Z',visitor_key:two}], ['2026-10-03','2026-10-04']);
  assert.deepEqual(data.totals,{visits:2,uniques:1});
});
test('anonymous visits do not invent a member identity', () => {
  assert.deepEqual(activityIdentity(activityKey('browser-1234')), {userId:null,visitorId:'browser-1234'});
  assert.equal(activityIdentity('gklive:not-a-user:browser-1234').userId, null);
});

test('sign in does not show the same browser twice, and sign out uses the latest state', async () => {
  const { distinctActivityRows } = await import('../src/lib/presence/activity.ts');
  const user = '12345678-1234-1234-1234-123456789abc';
  const anon = {visitor_key:'browser-1234',last_seen_at:'2026-10-04T09:00:00Z'};
  const member = {visitor_key:activityKey('browser-1234',user),last_seen_at:'2026-10-04T09:01:00Z'};
  assert.deepEqual(distinctActivityRows([anon,member]), [member]);
  assert.deepEqual(distinctActivityRows([{...anon,last_seen_at:'2026-10-04T09:02:00Z'},member]), [{...anon,last_seen_at:'2026-10-04T09:02:00Z'}]);
});
