"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import type { VisitPoint } from "../../lib/admin/visit-series";

type ChartData = { points: VisitPoint[]; totals: { visits: number; uniques: number }; updatedAt: string };
function dayLabel(day: string) {
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", timeZone: "Europe/Istanbul" }).format(new Date(`${day}T12:00:00+03:00`));
}
export default function AdminVisitChart() {
  const [range, setRange] = useState<1 | 7 | 30 | 90>(1);
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let request: AbortController | null = null;
    let inFlight = false;
    setLoading(true);
    setData(null);
    setSelected(null);
    setError("");
    async function load() {
      if (inFlight) return;
      inFlight = true;
      request = new AbortController();
      try {
        const headers: HeadersInit = {};
        const supabase = createSupabaseBrowserClient();
        const session = await supabase?.auth.getSession();
        const token = session?.data.session?.access_token;
        if (token) headers.Authorization = `Bearer ${token}`;
        if (cancelled) return;
        const response = await fetch(`/api/admin/visits?range=${range}`, { headers, cache: "no-store", credentials: "same-origin", signal: request.signal });
        const pack = await response.json();
        if (!response.ok) throw new Error(pack.error || "Ziyaret verileri yüklenemedi.");
        if (!cancelled) { setData(pack); setError(""); }
      } catch (reason) {
        if (!cancelled) setError(reason instanceof Error ? reason.message : "Ziyaret verileri yüklenemedi.");
      } finally {
        inFlight = false;
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    const refresh = () => { if (document.visibilityState === "visible") void load(); };
    const timer = window.setInterval(refresh, 1000);
    window.addEventListener("focus", refresh);
    return () => { cancelled = true; request?.abort(); window.clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, [range, retry]);

  const points = data?.points ?? [];
  const max = Math.max(1, ...points.map((point) => point.visits));
  const detail = points.find((point) => point.day === selected) ?? points.at(-1);
  return (
    <section className="adminPanel adminVisitPanel" aria-label="Ziyaret grafiği">
      <header className="adminPanelHead">
        <div><h2>{range === 1 ? "Bugün" : `Son ${range} gün`}</h2><p className="adminSectionLabel">{range === 1 ? "Bugünkü sayfa görüntülemeleri" : "Günlük sayfa görüntülemeleri"}</p></div>
        <div className="adminChartRanges" aria-label="Grafik tarih aralığı">
          {([1, 7, 30, 90] as const).map((item) => <button key={item} type="button" aria-pressed={range === item} onClick={() => setRange(item)}>{item === 1 ? "Bugün" : `${item} gün`}</button>)}
        </div>
      </header>
      {loading ? <p role="status" className="adminQuiet">Ziyaretler yükleniyor…</p> : null}
      {error ? <div className="adminConnectionError" role="alert">{error} <button className="adminQuietButton" type="button" onClick={() => setRetry((value) => value + 1)}>Yeniden dene</button></div> : null}
      {!loading && data ? <>
        <div className="adminChartSummary"><span><strong>{data.totals.visits.toLocaleString("tr-TR")}</strong> görüntüleme</span><span><strong>{data.totals.uniques.toLocaleString("tr-TR")}</strong> tekil ziyaretçi</span></div>
        <div className={`adminVisitBars${range === 1 ? " isToday" : ""}`} role="group" aria-label="Günlere göre ziyaret sayısı">
          {points.map((point) => <button key={point.day} type="button" className={detail?.day === point.day ? "isSelected" : ""} onClick={() => setSelected(point.day)} aria-label={`${dayLabel(point.day)}: ${point.visits} görüntüleme, ${point.uniques} tekil ziyaretçi`} title={`${dayLabel(point.day)}: ${point.visits} görüntüleme`}><span style={{ height: `${point.visits ? Math.max(6, point.visits / max * 100) : 1}%` }} /></button>)}
        </div>
        <div className="adminChartAxis"><span>{points[0] ? dayLabel(points[0].day) : ""}</span><span>{points.at(-1) ? dayLabel(points.at(-1)!.day) : ""}</span></div>
        {detail ? <p className="adminChartDetail" aria-live="polite">{dayLabel(detail.day)} · <strong>{detail.visits}</strong> görüntüleme · <strong>{detail.uniques}</strong> tekil ziyaretçi</p> : null}
        {data.totals.visits === 0 ? <p className="adminQuiet">Bu tarih aralığında kayıtlı ziyaret bulunmuyor.</p> : null}
        <p className="adminChartFreshness">Son güncelleme: <time dateTime={data.updatedAt}>{new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Istanbul" }).format(new Date(data.updatedAt))}</time> · Açıkken 1 saniyede bir yenilenir.</p>
      </> : null}
    </section>
  );
}
