"use client";

import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

type Point = { day: string; visits: number; uniques: number };
type Range = "1" | "7" | "30" | "90" | "custom";

const RANGES: { id: Range; label: string }[] = [
  { id: "1", label: "Bugün" },
  { id: "7", label: "7 gün" },
  { id: "30", label: "30 gün" },
  { id: "90", label: "90 gün" },
  { id: "custom", label: "Özel" },
];

export default function AdminVisitChart() {
  const [range, setRange] = useState<Range>("30");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const to = new Date();
    const from = new Date();
    if (range === "1") from.setHours(0, 0, 0, 0);
    else if (range === "custom" && customFrom && customTo) {
      from.setTime(Date.parse(customFrom));
      to.setTime(Date.parse(customTo));
    } else {
      from.setDate(to.getDate() - (Number(range) - 1));
    }
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    void supabase
      .rpc("admin_visit_series", {
        p_from: from.toISOString().slice(0, 10),
        p_to: to.toISOString().slice(0, 10),
      })
      .then(({ data, error }) => {
        if (error) {
          console.warn("admin_visit_series", error.message);
          return;
        }
        setPoints(
          (Array.isArray(data) ? data : []).map((row) => ({
            day: String(row.day),
            visits: Number(row.visits) || 0,
            uniques: Number(row.uniques) || 0,
          })),
        );
      });

    const channel = supabase
      .channel("admin-visits")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "analytics_events" },
        () => {
          void supabase
            .rpc("admin_visit_series", {
              p_from: from.toISOString().slice(0, 10),
              p_to: to.toISOString().slice(0, 10),
            })
            .then(({ data }) => {
              setPoints(
                (Array.isArray(data) ? data : []).map((row) => ({
                  day: String(row.day),
                  visits: Number(row.visits) || 0,
                  uniques: Number(row.uniques) || 0,
                })),
              );
            });
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") console.warn("visit realtime bağlanamadı");
      });
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [range, customFrom, customTo]);

  const max = Math.max(1, ...points.map((item) => item.visits));
  const label =
    range === "1" ? "Bugün" : range === "custom" ? "Özel aralık" : `Son ${range} gün`;
  const ghosts = [18, 34, 22, 48, 30, 56, 26];

  return (
    <section className="adminPanel" aria-label="Ziyaret grafiği">
      <header className="adminPanelHead">
        <div>
          <p className="adminSectionLabel">Ziyaretler</p>
          <h2>{label}</h2>
        </div>
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
      {range === "custom" ? (
        <div className="adminRangeDates">
          <label>
            Başlangıç
            <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
          </label>
          <label>
            Bitiş
            <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
          </label>
        </div>
      ) : null}
      {points.length === 0 ? (
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
        <div className="adminVisitChart">
          {points.map((point) => (
            <i
              key={point.day}
              className="adminVisitBar"
              title={`${point.day}: ${point.visits} ziyaret / ${point.uniques} tekil`}
              style={{ height: `${Math.max(10, (point.visits / max) * 100)}%` }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
