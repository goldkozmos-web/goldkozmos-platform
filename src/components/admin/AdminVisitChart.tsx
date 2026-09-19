"use client";

import { useMemo, useState } from "react";

import { formatAdminCount } from "../../lib/admin/access";
import type { AdminVisitPoint } from "../../lib/admin/load";
import { useAdminLive } from "./AdminLiveProvider";

type Range = "1" | "7" | "30";

const RANGES: { id: Range; label: string }[] = [
  { id: "1", label: "Bugün" },
  { id: "7", label: "7 gün" },
  { id: "30", label: "30 gün" },
];

function sliceSeries(series: AdminVisitPoint[], range: Range) {
  if (!series.length) return [];
  const count = Number(range);
  return series.slice(Math.max(0, series.length - count));
}

export default function AdminVisitChart() {
  const { live } = useAdminLive();
  const [range, setRange] = useState<Range>("30");
  const points = useMemo(
    () => sliceSeries(live?.visitSeries ?? [], range),
    [live?.visitSeries, range],
  );
  const visits = points.reduce((sum, item) => sum + item.visits, 0);
  const uniques = points.reduce((sum, item) => sum + item.uniques, 0);
  const max = Math.max(1, ...points.map((item) => item.visits));
  const label =
    range === "1" ? "Bugün" : range === "7" ? "Son 7 gün" : "Son 30 gün";
  const ghosts = [18, 34, 22, 48, 30, 56, 26];
  const empty = visits <= 0;

  return (
    <section className="adminPanel" aria-label="Ziyaret grafiği">
      <header className="adminPanelHead">
        <div>
          <p className="adminSectionLabel">Ziyaretler</p>
          <h2>{label}</h2>
        </div>
        {empty ? null : (
          <span className="adminBadge">{formatAdminCount(visits)}</span>
        )}
      </header>
      <div className="adminRangeRail" role="tablist" aria-label="Zaman aralığı">
        {RANGES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={range === item.id ? "isOn" : ""}
            aria-pressed={range === item.id}
            onClick={() => setRange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {empty ? (
        <div className="adminVisitEmpty">
          <div className="adminVisitChart isGhost" aria-hidden="true">
            {ghosts.map((height, index) => (
              <i key={index} className="adminVisitBar" style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="adminQuiet">
            <strong>Bu aralık sessiz</strong>
            <span>Sayfa görüntülemeleri düşünce çubuklar burada dolar.</span>
          </div>
        </div>
      ) : (
        <>
          <div className="adminVisitChart">
            {points.map((point) => (
              <i
                key={point.day}
                className={`adminVisitBar${point.visits <= 0 ? " isMute" : ""}`}
                title={`${point.day}: ${point.visits} ziyaret / ${point.uniques} tekil`}
                style={{
                  height: `${Math.max(6, (point.visits / max) * 100)}%`,
                }}
              />
            ))}
          </div>
          <p className="adminCardHint">
            {formatAdminCount(visits)} sayfa · {formatAdminCount(uniques)} tekil
          </p>
        </>
      )}
    </section>
  );
}
