import Link from "next/link";

import type { AdminOverviewMetric } from "../../lib/admin/load";

export default function AdminOverview({
  metrics,
}: {
  metrics: AdminOverviewMetric[];
}) {
  return (
    <section className="adminOverview">
      {metrics.map((metric) => (
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
                : "Bugün · gerçek kayıt"
              : metric.empty}
          </span>
        </Link>
      ))}
    </section>
  );
}
