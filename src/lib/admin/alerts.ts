import type { AdminOverviewMetric, AdminVisitorRow } from "./load";

export type AdminAlert = {
  kind: "visitor" | "member";
  title: string;
  body: string;
};

export function metricValue(
  metrics: AdminOverviewMetric[] | undefined,
  id: string,
) {
  return metrics?.find((metric) => metric.id === id)?.value ?? 0;
}

export function diffAdminLive(
  prev: { memberCount: number; visitorIds: string[] } | null,
  next: { metrics: AdminOverviewMetric[]; visitors: AdminVisitorRow[] },
): AdminAlert[] {
  if (!prev) {
    return [];
  }

  const alerts: AdminAlert[] = [];
  const memberCount = metricValue(next.metrics, "members");
  if (memberCount > prev.memberCount) {
    const added = memberCount - prev.memberCount;
    alerts.push({
      kind: "member",
      title: "Yeni üye",
      body:
        added === 1
          ? "Siteye yeni bir üye kayıt oldu."
          : `${added} yeni üye kayıt oldu.`,
    });
  }

  const known = new Set(prev.visitorIds);
  const fresh = next.visitors.filter((visitor) => visitor.id && !known.has(visitor.id));
  for (const visitor of fresh.slice(0, 3)) {
    alerts.push({
      kind: "visitor",
      title: "Yeni ziyaretçi",
      body: [visitor.location, visitor.path].filter(Boolean).join(" · "),
    });
  }

  return alerts;
}

export function nextLiveCursor(
  metrics: AdminOverviewMetric[],
  visitors: AdminVisitorRow[],
) {
  return {
    memberCount: metricValue(metrics, "members"),
    visitorIds: visitors.map((visitor) => visitor.id).filter(Boolean),
  };
}
