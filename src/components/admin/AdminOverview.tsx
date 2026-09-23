"use client";

import { usePathname } from "next/navigation";

import { adminMetricHint, formatAdminCount } from "../../lib/admin/access";
import type { AdminOverviewMetric } from "../../lib/admin/load";
import AdminMemberList from "./AdminMemberList";
import { AdminMetricIcon } from "./AdminIcons";
import { useAdminLive } from "./AdminLiveProvider";
import AdminVisitChart from "./AdminVisitChart";

export default function AdminOverview({
  metrics,
}: {
  metrics: AdminOverviewMetric[];
}) {
  const { live } = useAdminLive();
  const pathname = usePathname();
  const rows = live?.metrics ?? metrics;
  const members = live?.members ?? [];
  const liveNow = (live?.visitors ?? []).filter((visitor) => visitor.live);

  return (
    <div className="adminStack">
      <section className="adminPanel" aria-label="Özet">
        <header className="adminPanelHead">
          <div>
            <h2>Özet</h2>
            <p className="adminSectionLabel">Toplam kayıt</p>
          </div>
        </header>
        <div className="adminOverview">
          {rows.map((metric) => {
            const liveOn = metric.id === "live" && metric.value > 0;
            const emptyLook = !metric.hasSource || metric.value <= 0;
            const selected =
              pathname === metric.href ||
              (metric.href !== "/admin" && pathname.startsWith(`${metric.href}/`));

            return (
              <a
                key={metric.id}
                href={metric.href}
                className={`adminMetric adminCard${emptyLook ? " isEmpty" : ""}${liveOn ? " isLive" : ""}${selected ? " isOn" : ""}`}
              >
                <span className="adminMetricIcon">
                  <AdminMetricIcon id={metric.id} />
                </span>
                <strong>
                  {liveOn ? <i className="adminLiveDot" aria-hidden="true" /> : null}
                  {formatAdminCount(metric.value)}
                </strong>
                <p>{metric.title}</p>
                <span className="adminCardHint">
                  {adminMetricHint(metric.id, metric.value, metric.empty)}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {liveNow.length > 0 ? (
        <section className="adminPanel">
          <header className="adminPanelHead">
            <div>
              <p className="adminSectionLabel">Açık sekmeler</p>
              <h2>Şu an sitede</h2>
            </div>
            <span className="adminBadge isLive">
              {formatAdminCount(liveNow.length)}
            </span>
          </header>
          <div className="adminPresence">
            {liveNow.map((visitor) => (
              <article key={visitor.id} className="adminMember">
                <div className="adminMemberCopy">
                  <strong>{visitor.label}</strong>
                  <small>
                    {visitor.location}
                    {" · "}
                    {visitor.path}
                  </small>
                </div>
                <span className="adminBadge isLive">Açık</span>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <AdminVisitChart />

      <AdminMemberList members={members} />
    </div>
  );
}
