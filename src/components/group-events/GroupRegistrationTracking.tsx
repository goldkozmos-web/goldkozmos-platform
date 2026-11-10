"use client";

import { useEffect, useState } from "react";
import { findGroupEvent } from "../../data/groupEvents";
import { GROUP_REGISTRATION_PENDING, GROUP_TRACKING_STORAGE, REGISTRATION_ID, REGISTRATION_TOKEN, type GroupTrackingStatus } from "../../lib/group-events/tracking";
import GroupTrackingLink from "./GroupTrackingLink";
import s from "./GroupEvents.module.css";

export default function GroupRegistrationTracking() {
  const [status, setStatus] = useState<GroupTrackingStatus | null>(null);
  const [message, setMessage] = useState("Kayıt durumu yükleniyor…");

  useEffect(() => {
    let controller: AbortController | undefined;
    async function check() {
      controller?.abort();
      const current = new AbortController();
      controller = current;
      const fragment = window.location.hash.slice(1);
      const [id, token, extra] = fragment.split(".");
      let registrationId = id;
      if (!fragment) {
        try { registrationId = localStorage.getItem(GROUP_TRACKING_STORAGE) ?? ""; }
        catch { registrationId = ""; }
      }
      if (!REGISTRATION_ID.test(registrationId) || (fragment && (!token || !REGISTRATION_TOKEN.test(token) || extra !== undefined))) {
        setStatus(null);
        setMessage("Kayıt olurken verilen kişisel takip bağlantısını açın.");
        return;
      }
      try {
        const response = await fetch(`/api/group-events/registrations/${registrationId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          credentials: token ? "omit" : "same-origin",
          cache: "no-store",
          signal: AbortSignal.any([current.signal, AbortSignal.timeout(8000)]),
        });
        if (response.status === 401 || response.status === 404) {
          if (!current.signal.aborted) {
            setStatus(null);
            setMessage("Kayda erişilemedi. Kayıt olurken verilen kişisel takip bağlantısını kontrol edin.");
          }
          return;
        }
        if (!response.ok) throw new Error("Status unavailable");
        const nextStatus: GroupTrackingStatus = await response.json();
        if (!current.signal.aborted) { setStatus(nextStatus); setMessage(""); }
      } catch {
        if (current.signal.aborted) return;
        setStatus(null);
        setMessage("Kayıt durumu şu an kontrol edilemiyor. Lütfen biraz sonra tekrar deneyin.");
      }
    }
    function visibleCheck() { if (document.visibilityState === "visible") void check(); }
    function changeRegistration() { setStatus(null); setMessage("Kayıt durumu yükleniyor…"); void check(); }
    void check();
    const interval = window.setInterval(visibleCheck, 10_000);
    document.addEventListener("visibilitychange", visibleCheck);
    window.addEventListener("hashchange", changeRegistration);
    return () => {
      controller?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", visibleCheck);
      window.removeEventListener("hashchange", changeRegistration);
    };
  }, []);

  const approved = status?.paymentStatus === "paid" && status.approved;
  return <section className={s.tracking} aria-labelledby="group-tracking-title">
    <p className={s.eyebrow}>GOLDKOZMOS · GRUP ÇALIŞMALARI</p>
    <h1 id="group-tracking-title">Kayıt Takibi</h1>
    <div aria-live="polite">
      {status ? <>
        <p>{status.eventTitle}</p>
        {approved ? <>
          <h2>Katılımınız Onaylandı!</h2>
          <p>GoldKozmos grup çalışmasına kaydınız tamamlandı.</p>
          {status.invites.length ? <>
            <p>Çalışma tarihini, saatini, katılım bilgilerini ve duyuruları WhatsApp grubumuzdan takip edebilirsiniz.</p>
            <p>Aşağıdaki butona dokunarak grubumuza katılım isteği gönderin.</p>
            <ul className={s.invites}>
              {status.invites.map(invite => {
                const title = findGroupEvent(invite.eventId)?.title ?? invite.eventId;
                return <li key={invite.eventId}>
                  <strong>{title}</strong>
                  <a className={s.button} href={invite.url} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp Grubuna Katıl · ${title}`}>WhatsApp Grubuna Katıl</a>
                </li>;
              })}
            </ul>
            <p className={s.note}>Grup katılımınız yönetici onayının ardından tamamlanacaktır.</p>
          </> : <p className={s.notice}>WhatsApp grup bağlantısı hazır olduğunda burada görünecek.</p>}
        </> : <p className={s.notice}>{status.paymentStatus === "refunded" ? "Ödemeniz iade edildi. Katılım durumunuz için bizimle iletişime geçebilirsiniz." : GROUP_REGISTRATION_PENDING}</p>}
      </> : <p className={s.notice}>{message}</p>}
    </div>
    {status ? <GroupTrackingLink path={status.trackingPath} currentPage /> : null}
  </section>;
}
