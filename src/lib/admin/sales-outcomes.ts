export const salesStages = { new: "Henüz sonuç yok", contacted: "İletişime geçildi", booked: "Randevu kesinleşti", paid: "Ödeme alındı", cancelled: "Vazgeçildi / iptal" } as const;
export type SalesStage = keyof typeof salesStages;
export type SalesOutcome = { stage: SalesStage; updatedAt: string; path: string };
export function isSalesStage(value: unknown): value is SalesStage { return typeof value === "string" && Object.hasOwn(salesStages, value); }
export function readSalesOutcomes(raw: unknown): Record<string, SalesOutcome> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const rows: [string, SalesOutcome][] = [];
  for (const [id, value] of Object.entries(raw)) {
    if (!/^[0-9a-f-]{36}$/i.test(id) || !value || typeof value !== "object") continue;
    const item = value as Record<string, unknown>;
    if (!isSalesStage(item.stage) || typeof item.updatedAt !== "string" || !Number.isFinite(Date.parse(item.updatedAt)) || typeof item.path !== "string") continue;
    if (item.stage === "new") continue;
    rows.push([id, { stage: item.stage, updatedAt: item.updatedAt, path: item.path.split("?")[0].slice(0, 200) }]);
  }
  return Object.fromEntries(rows.sort((a,b)=>Date.parse(b[1].updatedAt)-Date.parse(a[1].updatedAt)).slice(0,500));
}
