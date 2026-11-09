export type VisitPeriod = "today" | "7" | "30" | "90" | "all";
export type VisitHistoryRow = { id: string; label: string; code: string; member: boolean; at: string; path: string; source: string; location: string };
export type VisitHistoryPage = { rows: VisitHistoryRow[]; next: string | null; updatedAt: string };

export function isDeploymentTraffic(source: string | null) {
  return /^goldkozmos-platform-[a-z0-9-]+\.vercel\.app$/i.test(source || "");
}

export function visitSince(period: string, now = new Date()) {
  if (period === "all") return null;
  if (period === "today") {
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
    const part = (type: string) => parts.find(p => p.type === type)!.value;
    return new Date(`${part("year")}-${part("month")}-${part("day")}T00:00:00+03:00`).toISOString();
  }
  if (!["7", "30", "90"].includes(period)) throw Error("Geçersiz tarih aralığı.");
  return new Date(now.getTime() - Number(period) * 86400000).toISOString();
}

export function parseVisitCursor(raw: string | null) {
  if (!raw) return null;
  const [at, id, ...extra] = raw.split("|");
  if (extra.length || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|\+00:00)$/.test(at) || !Number.isFinite(Date.parse(at)) || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id)) throw Error("Geçersiz sayfa bilgisi.");
  return { at, id };
}
