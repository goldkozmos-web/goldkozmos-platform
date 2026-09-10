"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { AdminOverviewMetric } from "../../lib/admin/load";

export default function AdminOverview({
  metrics,
}: {
  metrics: AdminOverviewMetric[];
}) {
  const [rows, setRows] = useState(metrics);

  useEffect(() => {
    setRows(metrics);
  }, [metrics]);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      const response = await fetch("/api/admin/live", { cache: "no-store" });
      if (!response.ok || cancelled) {
        return;
      }
      const data = (await response.json()) as { metrics?: AdminOverviewMetric[] };
      if (data.metrics) {
        setRows(data.metrics);
      }
    }

    const timer = window.setInterval(() => {
      void refresh();
    }, 10000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="adminOverview">
      {rows.map((metric) => (
        <Link
          key={metric.id}
          href={metric.href}
          className={`adminCard${metric.hasSource ? "" : " isEmpty"}`}
        >
          <p>{metric.title}</p>
          <strong>{metric.value}</strong>
          <span>
            {metric.hasSource
              ? metric.value === 0
                ? metric.empty
                : metric.id === "live"
                  ? "Şu an sitede"
                  : "Bugün · gerçek kayıt"
              : metric.empty}
          </span>
        </Link>
      ))}
    </section>
  );
}
