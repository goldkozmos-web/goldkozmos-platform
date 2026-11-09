// Membership registration rows (gkmem_) are separate from browsing activity.
export function activityKey(visitorId: string, userId?: string | null) {
  return userId ? `gklive:${userId}:${visitorId}` : visitorId;
}

export function activityIdentity(key: string) {
  const match = /^gklive:([a-f0-9-]{36}):([a-zA-Z0-9_-]{8,80})$/.exec(key);
  return { userId: match?.[1] ?? null, visitorId: match?.[2] ?? key };
}

export function distinctActivityRows<T extends { visitor_key: string; last_seen_at: string }>(rows: T[]) {
  const browsers = new Set<string>();
  const members = new Set<string>();
  return [...rows].sort((a, b) => Date.parse(b.last_seen_at) - Date.parse(a.last_seen_at)).filter((row) => {
    const identity = activityIdentity(row.visitor_key);
    if (browsers.has(identity.visitorId)) return false;
    browsers.add(identity.visitorId);
    if (identity.userId && members.has(identity.userId)) return false;
    if (identity.userId) members.add(identity.userId);
    return true;
  });
}
