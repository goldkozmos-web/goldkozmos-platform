"use client";

import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

type Point = { day: string; visits: number; uniques: number };

export default function AdminVisitChart() {
  const [range, setRange] = useState<7 | 30 | 90>(30);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - (range - 1));
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
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
  }, [range]);

  const max = Math.max(1, ...points.map((item) => item.visits));

  return (
    <section className="adminPanel" aria-label="Ziyaret grafiği">
      <header className="adminPanelHead">
        <div>
          <h2>Son {range} gün</h2>
          <p className="adminSectionLabel">site_events · page</p>
        </div>
        <div className="dailyMessageActions">
          {([7, 30, 90] as const).map((item) => (
            <button key={item} type="button" onClick={() => setRange(item)}>
              {item}g
            </button>
          ))}
        </div>
      </header>
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
