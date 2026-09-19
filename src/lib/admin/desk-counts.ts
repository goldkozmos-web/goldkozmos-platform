export function lifetimeVisitCount(totalVisitors: number, pageViewsToday: number) {
  return Math.max(0, totalVisitors);
}

export function lifetimeEventCount(total: number, today: number) {
  return Math.max(0, total > 0 ? total : today);
}

export function rangeCount(fromTable: number, fromAnalytics: number) {
  return Math.max(0, fromTable || fromAnalytics);
}
