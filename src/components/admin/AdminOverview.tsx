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
  const primary = rows.slice(0, 4);
  const rest = rows.slice(4);

  return (
    <div className="adminStack">
      <section className="adminPanel" aria-label="Bugünün özeti">
        <header className="adminPanelHead">
          <div>
            <h2>Özet</h2>
            <p className="adminSectionLabel">Toplam kayıt</p>
          </div>
        </header>
        <div className="adminOverview">
          {primary.map((metric) => {
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

      {rest.length ? (
        <div className="adminPair">
          {rest.map((metric) => {
            const emptyLook = !metric.hasSource || metric.value <= 0;
            return (
              <a
                key={metric.id}
                href={metric.href}
                className={`adminMetric adminCard isPair${emptyLook ? " isEmpty" : ""}`}
              >
                <span className="adminMetricIcon">
                  <AdminMetricIcon id={metric.id} />
                </span>
                <div>
                  <strong>{formatAdminCount(metric.value)}</strong>
                  <p>{metric.title}</p>
                </div>
              </a>
            );
          })}
        </div>
      ) : null}

      <section className="adminPanel">
        <header className="adminPanelHead">
          <div>
            <p className="adminSectionLabel">Açık sekmeler</p>
            <h2>Şu an sitede</h2>
          </div>
          <span className={`adminBadge${liveNow.length ? " isLive" : ""}`}>
            {formatAdminCount(liveNow.length)}
          </span>
        </header>
        {liveNow.length === 0 ? (
          <div className="adminQuiet">
            <strong>Kimse yok</strong>
            <span>Yönetim sayfası sayılmaz. Biri sitedeyken burada görünür.</span>
          </div>
        ) : (
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
        )}
      </section>

      <AdminVisitChart />

      <section className="adminPanel" aria-label="Bugün ve 30 gün">
        <header className="adminPanelHead">
          <div>
            <p className="adminSectionLabel">Özet</p>
            <h2>Ziyaret özeti</h2>
          </div>
        </header>
        <p className="adminStatCaption">Tüm zamanlar</p>
        <div className="adminStatGrid">
          {[
            ["Ziyaretçi", live?.allTime?.visits],
            ["Tekil", live?.allTime?.uniques],
            ["Üye", live?.allTime?.members],
            ["Randevu", live?.allTime?.appointments],
            ["WhatsApp", live?.allTime?.whatsapp],
            ["Shopier", live?.allTime?.shopier],
          ].map(([label, value]) => (
            <div key={`all-${String(label)}`} className="adminStatCell">
              <strong>{formatAdminCount(Number(value) || 0)}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className="adminStatCaption">Bugün</p>
        <div className="adminStatGrid">
          {[
            ["Ziyaret", live?.todayStats?.visits],
            ["Tekil", live?.todayStats?.uniques],
            ["Yeni üye", live?.todayStats?.members],
            ["Randevu", live?.todayStats?.appointments],
            ["WhatsApp", live?.todayStats?.whatsapp],
            ["Shopier", live?.todayStats?.shopier],
          ].map(([label, value]) => (
            <div key={String(label)} className="adminStatCell">
              <strong>{formatAdminCount(Number(value) || 0)}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className="adminStatCaption">Son 30 gün</p>
        <div className="adminStatGrid">
          {[
            ["Ziyaret", live?.last30?.visits],
            ["Tekil", live?.last30?.uniques],
            ["Yeni üye", live?.last30?.members],
            ["Randevu", live?.last30?.appointments],
            ["WhatsApp", live?.last30?.whatsapp],
            ["Shopier", live?.last30?.shopier],
          ].map(([label, value]) => (
            <div key={`30-${String(label)}`} className="adminStatCell">
              <strong>{formatAdminCount(Number(value) || 0)}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="adminPanel" aria-label="Canlı aktivite">
        <header className="adminPanelHead">
          <div>
            <p className="adminSectionLabel">Hareket</p>
            <h2>Canlı aktivite</h2>
          </div>
        </header>
        {(live?.activity ?? []).length === 0 ? (
          <div className="adminQuiet">
            <strong>Henüz hareket yok</strong>
            <span>Giriş, WhatsApp ve satın alma anlık olarak burada akar.</span>
          </div>
        ) : (
          <ul className="profilimDrawerList">
            {(live?.activity ?? []).map((row) => (
              <li key={row.id}>
                <span>
                  {new Date(row.at).toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Europe/Istanbul",
                  })}
                </span>
                <strong>
                  {row.who} · {row.text}
                </strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <AdminMemberList members={members} />
    </div>
  );
}