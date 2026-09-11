"use client";

import Link from "next/link";

import type { AdminOverviewMetric } from "../../lib/admin/load";
import { AdminMemberDesk } from "./AdminMemberList";
import { useAdminLive } from "./AdminLiveProvider";

export default function AdminOverview({
  metrics,
}: {
  metrics: AdminOverviewMetric[];
}) {
  const { live } = useAdminLive();
  const rows = live?.metrics ?? metrics;
  const members = live?.members ?? [];

  return (
    <div className="adminStack">
      <section className="adminOverview">
        {rows.map((metric) => {
          const liveOn = metric.id === "live" && metric.value > 0;

          return (
            <Link
              key={metric.id}
              href={metric.href}
              className={`adminCard${metric.hasSource ? "" : " isEmpty"}${liveOn ? " isLive" : ""}`}
            >
              <p>{metric.title}</p>
              <strong>
                {liveOn ? <i className="adminLiveDot" aria-hidden="true" /> : null}
                {metric.value}
              </strong>
            </Link>
          );
        })}
      </section>

      <AdminMemberDesk members={members} />
    </div>
  );
}
