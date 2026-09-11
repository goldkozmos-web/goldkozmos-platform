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
  const liveNow = (live?.visitors ?? []).filter((visitor) => visitor.live);

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

      <section className="adminList">
        <p className="adminSectionLabel">Şu an sitede</p>
        {liveNow.length === 0 ? (
          <article className="adminMember">
            <div>
              <strong>Şu an kimse yok</strong>
              <small>Açık bir site sekmesi birkaç saniyede buraya düşer. Yönetim paneli sayılmaz.</small>
            </div>
          </article>
        ) : (
          liveNow.map((visitor) => (
            <article key={visitor.id} className="adminMember">
              <div>
                <strong>
                  {visitor.label}
                  {" · canlı"}
                </strong>
                <small>
                  {visitor.location}
                  {" · "}
                  {visitor.path}
                </small>
              </div>
            </article>
          ))
        )}
      </section>

      <AdminMemberDesk members={members} />
    </div>
  );
}
