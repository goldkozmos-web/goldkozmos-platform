"use client";

import type { AdminOverviewMetric } from "../../lib/admin/load";
import AdminMemberList, { AdminMemberDesk } from "./AdminMemberList";
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
      <section className="adminOverview" aria-label="Bugünün özeti">
        {rows.map((metric) => {
          const liveOn = metric.id === "live" && metric.value > 0;
          const hint =
            metric.id === "live"
              ? liveOn
                ? "Şu an açık"
                : metric.empty
              : metric.id === "members"
                ? metric.value > 0
                  ? "Kayıtlı"
                  : metric.empty
                : metric.value > 0
                  ? "Bugün"
                  : metric.empty;

          return (
            <a
              key={metric.id}
              href={metric.href}
              className={`adminCard${metric.hasSource ? "" : " isEmpty"}${liveOn ? " isLive" : ""}`}
            >
              <p>{metric.title}</p>
              <strong>
                {liveOn ? <i className="adminLiveDot" aria-hidden="true" /> : null}
                {metric.value}
              </strong>
              <span className="adminCardHint">{hint}</span>
            </a>
          );
        })}
      </section>

      <div className="adminDesk">
        <section className="adminPanel">
          <header className="adminPanelHead">
            <div>
              <p className="adminSectionLabel">Şu an sitede</p>
              <h2>Canlı ziyaret</h2>
            </div>
            <span className={`adminBadge${liveNow.length ? " isLive" : ""}`}>
              {liveNow.length}
            </span>
          </header>
          {liveNow.length === 0 ? (
            <div className="adminQuiet">
              <strong>Beklemede</strong>
              <span>
                Açık bir site sekmesi birkaç saniyede buraya düşer. Yönetim paneli
                sayılmaz.
              </span>
            </div>
          ) : (
            <div className="adminPresence">
              {liveNow.map((visitor) => (
                <article key={visitor.id} className="adminMember">
                  <div>
                    <strong>{visitor.label}</strong>
                    <small>
                      {visitor.location}
                      {" · "}
                      {visitor.path}
                    </small>
                  </div>
                  <span className="adminBadge isLive">Canlı</span>
                </article>
              ))}
            </div>
          )}
        </section>

        <AdminMemberDesk members={members} compact />
      </div>

      <AdminMemberList members={members} />
    </div>
  );
}
