"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/home-recent-sales.css";
type Sale = { day: string; category: string; count: number };
export default function HomeRecentSales() {
  const [sales, setSales] = useState<Sale[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    let busy = false;
    const refresh = async () => {
      if (document.visibilityState !== "visible" || busy) return;
      busy = true;
      try {
        const response = await fetch("/api/recent-sales", { signal: controller.signal });
        if (!response.ok) throw new Error("unavailable");
        const data = await response.json();
        if (!Array.isArray(data.sales)) throw new Error("invalid");
        setSales(data.sales); setFailed(false);
      } catch { if (!controller.signal.aborted) setFailed(true); }
      finally { busy = false; }
    };
    void refresh();
    const interval = setInterval(() => void refresh(), 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => { controller.abort(); clearInterval(interval); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  return <section className="homeRecentSales" aria-labelledby="recent-sales-title"><div className="homeRecentSalesInner">
    <header><div><p>GOLDKOZMOS · SON 30 GÜN</p><h2 id="recent-sales-title">Son satışlar</h2></div><span className="recentSalesSeal">✧ Kayıtlı ödemeler</span></header>
    {failed ? <p role="status">{sales ? "Güncelleme bekleniyor; son alınan kayıtlar gösteriliyor." : "Satış kayıtları şu an yüklenemiyor."}</p> : sales === null ? <p role="status">Kayıtlar yükleniyor…</p> : null}
    {sales?.length === 0 && <p className="recentSalesEmpty">Son 30 gün için gösterilecek tamamlanmış ödeme kaydı bulunmuyor.</p>}
    {!!sales?.length && <ul className="recentSalesRail">{sales.map(sale => <li key={`${sale.day}-${sale.category}`}><span className="recentSalesIcon" aria-hidden="true">✦</span><div><h3>{sale.category}</h3><p>{sale.count} tamamlanmış ödeme</p><time dateTime={sale.day}>{new Date(`${sale.day}T12:00:00+03:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", timeZone: "Europe/Istanbul" })}</time></div></li>)}</ul>}
    <footer><p>Ödemesi panelde tamamlandı olarak kaydedilen çalışmalar. Kişisel bilgiler paylaşılmaz.</p><Link href="/calismalar">Çalışmaları keşfet ↗</Link></footer>
  </div></section>;
}
