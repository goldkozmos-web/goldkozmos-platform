"use client";

import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

type Point = { day: string; visits: number; uniques: number };
type Range = "1" | "7" | "30" | "90" | "custom";

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
    range === "1" ? "Bugün" : range === "custom" ? "Özel tarih" : `Son ${range} gün`;

  return (
    <section className="adminPanel" aria-label="Ziyaret grafiği">
      <header className="adminPanelHead">
        <div>
          <h2>{label}</h2>
          <p className="adminSectionLabel">page_view</p>
        </div>
        <div className="dailyMessageActions">
          {(["1", "7", "30", "90", "custom"] as Range[]).map((item) => (
            <button key={item} type="button" onClick={() => setRange(item)}>
              {item === "1" ? "Bugün" : item === "custom" ? "Özel" : `${item}g`}
            </button>
          ))}
        </div>
      </header>
      {range === "custom" ? (
        <div className="dailyMessageActions">
          <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
          <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
        </div>
      ) : null}
      {points.length === 0 ? (
        <div className="adminQuiet">
          <strong>Veri yok</strong>
          <span>Bu aralıkta sayfa görüntülemesi düşmemiş.</span>
        </div>
      ) : (
        <div className="adminVisitChart" style={{ display: "flex", alignItems: "flex-end", gap: 4, minHeight: 120 }}>
          {points.map((point) => (
            <div
              key={point.day}
              title={`${point.day}: ${point.visits} ziyaret / ${point.uniques} tekil`}
              style={{
                flex: 1,
                height: `${Math.max(8, (point.visits / max) * 120)}px`,
                background: "#c4a35a",
                borderRadius: 4,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
