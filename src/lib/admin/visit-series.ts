export type VisitEvent = { created_at: string; visitor_key: string; path: string | null };
export type VisitPoint = { day: string; visits: number; uniques: number };

export function visitWindow(range: 1 | 7 | 30 | 90, now = new Date()) {
  const today = new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const end = new Date(`${today}T00:00:00+03:00`);
  end.setUTCDate(end.getUTCDate() + 1);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - range);
  const days = Array.from({ length: range }, (_, i) => new Date(start.getTime() + i * 86400000 + 10800000).toISOString().slice(0, 10));
  return { from: start.toISOString(), to: end.toISOString(), days };
}

export function visitSeries(events: VisitEvent[], days: string[]) {
  const buckets = new Map(days.map((day) => [day, { visits: 0, people: new Set<string>() }]));
  const people = new Set<string>();
  for (const event of events) {
    if (event.visitor_key.startsWith("gkmem_") || /^\/(admin|auth|api)(\/|\?|$)/.test(event.path ?? "") || event.path === "/uyelik") continue;
    const at = Date.parse(event.created_at);
    if (!Number.isFinite(at)) continue;
    const day = new Date(at + 10800000).toISOString().slice(0, 10);
    const bucket = buckets.get(day);
    if (!bucket) continue;
    const member = /^gklive:([a-f0-9-]{36}):/.exec(event.visitor_key);
    const key = member ? `member:${member[1]}` : event.visitor_key;
    bucket.visits += 1;
    bucket.people.add(key);
    people.add(key);
  }
  const points: VisitPoint[] = [...buckets].map(([day, bucket]) => ({ day, visits: bucket.visits, uniques: bucket.people.size }));
  return { points, totals: { visits: points.reduce((sum, p) => sum + p.visits, 0), uniques: people.size } };
}
