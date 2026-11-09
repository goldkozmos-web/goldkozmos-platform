export const PRESENCE_SEEN_COOKIE = "gk_presence_seen";
export function isPresenceArrival(previous: string | undefined, visitorKey: string, now = Date.now()) {
  const [key, timestamp] = (previous ?? "").split("|");
  const seen = Number(timestamp);
  return key !== visitorKey || !Number.isFinite(seen) || seen <= 0 || seen > now || now - seen > 120_000;
}
