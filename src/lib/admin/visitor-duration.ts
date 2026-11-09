export function visitorDurationSeconds(start: string | null | undefined, lastSeen: string | null, live: boolean, now: number): number | null {
  if (!start || !lastSeen) return null;
  const from = Date.parse(start);
  const seen = Date.parse(lastSeen);
  if (!Number.isFinite(from) || !Number.isFinite(seen) || seen < from) return null;
  // Presence is confirmed every eight seconds. Never extrapolate past that window.
  const end = live ? Math.min(now, seen + 8000) : seen;
  return Math.max(0, Math.floor((end - from) / 1000));
}

export function formatVisitorDuration(seconds: number | null): string {
  if (seconds === null) return "Süre bilgisi bekleniyor";
  return `${Math.floor(seconds / 60)} dk ${seconds % 60} sn`;
}
