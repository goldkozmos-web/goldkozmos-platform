"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { APPOINTMENT_WHATSAPP_URL } from "@/lib/appointments";
import "@/styles/public-live-activity.css";

type Activity = { online: number; visitors: number; whatsapp: number; appointments: number; shopier: number; members: { total: number; recent: { day: string; count: number }[] } | null; sales: { day: string; category: string; count: number }[] | null; updatedAt: string };

export default function PublicLiveActivity() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Activity | null>(null);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const allowed = pathname === "/" || pathname === "/goldbook" || pathname.startsWith("/calismalar");

  useEffect(() => {
    if (!open || !allowed) return;
    const controller = new AbortController();
    async function refresh() {
      if (document.visibilityState !== "visible") return;
      try {
        const response = await fetch("/api/live-activity", { signal: controller.signal });
        if (!response.ok) throw new Error("unavailable");
        const next: Activity = await response.json();
        if (![next.online, next.visitors, next.whatsapp, next.appointments, next.shopier].every(value => Number.isSafeInteger(value) && value >= 0)) throw new Error("invalid");
        setData(next); setFailed(false);
      } catch { if (!controller.signal.aborted) setFailed(true); }
    }
    void refresh();
    const timer = setInterval(() => void refresh(), 30_000);
    document.addEventListener("visibilitychange", refresh);
    return () => { controller.abort(); clearInterval(timer); document.removeEventListener("visibilitychange", refresh); };
  }, [open, allowed]);

  useEffect(() => {
    if (open && allowed) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open, allowed]);

  if (!allowed) return null;
  const close = () => { setOpen(false); trigger.current?.focus(); };
  const movements = [
    ...(data?.members?.recent ?? []).map(item => ({ ...item, key: `member-${item.day}`, icon: "✧", label: `${item.count} yeni üye topluluğa katıldı` })),
    ...(data?.sales ?? []).map(item => ({ ...item, key: `sale-${item.day}-${item.category}`, icon: "✦", label: `${item.category} · ${item.count} tamamlanmış alım` })),
  ].sort((a,b) => b.day.localeCompare(a.day)).slice(0,12);
  return <>
    <button ref={trigger} className="gkLiveTrigger" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}><span aria-hidden="true" />Canlı</button>
    <dialog ref={dialog} className="gkLiveDialog" aria-labelledby="gk-live-title" onCancel={close} onClose={() => setOpen(false)}>
      <header><div><p>GOLDKOZMOS</p><h2 id="gk-live-title">Canlı akış</h2></div><button type="button" onClick={close} aria-label="Canlı akışı kapat">×</button></header>
      {failed ? <p role="status">{data ? "Bağlantı yenilenemedi. Aşağıdaki sayılar son başarılı güncellemeye ait." : "Akış şu an yüklenemiyor. Birazdan yeniden deneyeceğiz."}</p> : !data ? <p role="status">Güncel veriler yükleniyor…</p> : null}
      {data && <>
        <div className="gkLiveStats gkLiveStatsSummary"><div className="gkLiveOnline"><strong>{data.online}<i aria-hidden="true" /></strong><span>kişi aktif</span><small>Son 2 dakika</small></div><div><strong>{data.members?.total ?? "—"}</strong><span>toplam üye</span></div><div><strong>{data.visitors}</strong><span>bugün ziyaret eden</span></div></div>
        <a className="gkLiveSupport" href={APPOINTMENT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><span><b>WP destek</b><small>Çalışmalar ve randevu hakkında sor</small></span><strong>Destek iste ↗</strong></a>
        <button type="button" className="gkLiveChatSupport" onClick={() => { close(); window.dispatchEvent(new Event("gk-open-chat")); }}><span><b>Buradan mesaj yaz</b><small>Yanıtını site sohbetinde gör</small></span><strong>Sohbeti aç →</strong></button>
        <h3>Son hareketler</h3>
        {movements.length ? <ul className="gkLiveEvents gkLiveMovementList">{movements.map(item => <li key={item.key}><span className="gkLiveAvatar" aria-hidden="true">{item.icon}</span><div><strong>{item.label}</strong><br /><time dateTime={item.day}>{new Date(`${item.day}T12:00:00+03:00`).toLocaleDateString("tr-TR", { day:"numeric", month:"long", timeZone:"Europe/Istanbul" })}</time></div></li>)}</ul> : <p className="gkLiveNote">Son 30 gün için üyelik veya tamamlanmış alım kaydı bulunmuyor.</p>}
        {data.sales === null && <p className="gkLiveNote">Alım kayıtları şu an güncellenemiyor.</p>}
        {data.members === null && <p className="gkLiveNote">Üyelik bilgileri şu an güncellenemiyor.</p>}
      </>}
      <button type="button" className="gkLiveCloseBottom" onClick={close}>Akışı kapat ×</button>
    </dialog>
  </>;
}
