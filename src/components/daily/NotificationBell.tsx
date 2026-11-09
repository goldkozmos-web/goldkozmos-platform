"use client";

import { useCallback, useEffect, useState } from "react";

import type { AppNotification } from "../../lib/daily/types";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../../lib/daily/client";
import ProfilimDrawer from "../profilim/ProfilimDrawer";
import "../../styles/daily-practice.css";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import { enableMemberPush } from "../../lib/push/browser";

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AppNotification[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [phoneStatus, setPhoneStatus] = useState("");
  const [phonePending, setPhonePending] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  async function testPhone() {
    setPhonePending(true);
    try {
      const response=await fetch("/api/profilim/push/send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:"Goldkozmos · Profilim",body:"Kişisel bildirim bağlantın çalışıyor.",url:"/profilim"}),signal:AbortSignal.timeout(15000)});
      const result=await response.json() as {sent?:number};
      setPhoneStatus(response.ok && (result.sent??0)>0 ? "Deneme bildirimi kayıtlı telefonuna gönderildi." : "Kayıtlı cihaza ulaşılamadı. Telefonunda bildirimleri açıp yeniden dene.");
    } catch {setPhoneStatus("Bağlantı kurulamadı. Yeniden dene.");}
    finally {setPhonePending(false);}
  }

  const reload = useCallback(async () => {
    try {
      setItems(await fetchNotifications());
      setError("");
    } catch {
      setError("Bildirimler yüklenemedi. Yeniden deneyebilirsin.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
    void fetch("/api/profilim/push/due", {
      method: "POST",
      credentials: "same-origin",
    }).catch(() => undefined);
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      void reload();
      void fetch("/api/profilim/push/due", {
        method: "POST",
        credentials: "same-origin",
      }).catch(() => undefined);
    }, 20_000);
    const client = createSupabaseBrowserClient();
    const channel = client?.channel("profilim-notifications")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, () => void reload())
      .on("postgres_changes", { event: "*", schema: "public", table: "member_messages" }, () => void reload())
      .subscribe();
    const onFocus = () => { if (document.visibilityState === "visible") void reload(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
      if (channel && client) void client.removeChannel(channel);
    };
  }, [reload]);

  const unread = items.filter((item) => !item.isRead).length;

  return (
    <>
      <button
        type="button"
        className="profilimBell"
        aria-label="Bildirimler"
        onClick={() => {
          setOpen(true);
          void reload();
          void fetch("/api/profilim/push",{cache:"no-store"}).then(response=>response.json()).then(result=>{if(result.registeredDevices>0)setPhoneStatus(`${result.registeredDevices} cihazın kişisel bildirimlere bağlı.`);}).catch(()=>undefined);
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 22a2.4 2.4 0 0 0 2.35-1.9H9.65A2.4 2.4 0 0 0 12 22Zm8-5.2V11a8 8 0 1 0-16 0v5.8L2 19v1h20v-1l-2-2.2Z"
          />
        </svg>
        {unread > 0 ? <span className="profilimBellBadge">{unread}</span> : null}
      </button>

      {open ? (
        <ProfilimDrawer
          eyebrow="BİLDİRİM"
          title="Bildirim Merkezi"
          onClose={close}
        >
          <section className="profilimNotificationSetup"><strong>Yenilikler cebine de gelsin.</strong><p>Yeni mesajlar, kazandığın rozetler ve hatırlatmalar için bu cihazdaki telefon bildirimlerini etkinleştir.</p><button type="button" disabled={phonePending} onClick={() => { setPhonePending(true); void enableMemberPush().then(result => setPhoneStatus(result.ok ? "Telefonun bildirimler için kaydedildi." : result.reason === "denied" ? "Bildirim izni kapalı. Tarayıcı ayarından izin verebilirsin." : "Telefon bildirimi açılamadı. Bu tarayıcıda tekrar deneyebilirsin.")).finally(() => setPhonePending(false)); }}>{phonePending ? "Bağlanıyor…" : "Telefon bildirimlerini aç"}</button><button type="button" disabled={phonePending} onClick={() => void testPhone()}>Deneme bildirimi gönder</button>{phoneStatus ? <p role="status">{phoneStatus}</p> : null}</section>
          {unread > 0 ? (
            <button
              type="button"
              className="dailyInlineAction"
              onClick={() => { void markAllNotificationsRead().then(() => reload()).catch(() => setError("Bildirimler güncellenemedi. Yeniden dene.")); }}
            >
              Tümünü okundu işaretle
            </button>
          ) : null}
          {error ? <div role="alert"><p className="profilimDrawerNote">{error}</p><button type="button" className="dailyInlineAction" onClick={() => void reload()}>Yeniden dene</button></div> : null}
          {loading ? <p className="profilimDrawerNote" role="status">Bildirimler yükleniyor…</p> : !error && items.length === 0 ? (
            <p className="profilimDrawerNote">Henüz bildirimin yok.</p>
          ) : (
            <ul className="profilimDrawerList">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="profilimInboxItem"
                    onClick={() => {
                      void markNotificationRead(item.id).then(() => reload()).catch(() => setError("Bildirim güncellenemedi."));
                      if (item.link) {
                        window.location.assign(item.link);
                      }
                    }}
                  >
                    <span>{item.isRead ? "Okundu" : "Yeni"}</span>
                    <strong>{item.title}</strong>
                    <small>{formatWhen(item.createdAt)}</small>
                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{item.body}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </ProfilimDrawer>
      ) : null}
    </>
  );
}
