"use client";
import { useEffect, useState } from "react";
import { groupEvents, formatGroupPrice } from "../../data/groupEvents";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import s from "./GroupEvents.module.css";

type Row = { id: string; event_title: string; amount_kurus: number; full_name: string; email: string; phone: string; payment_status: string; created_at: string; provider_order_id: string | null; confirmation_sent_at: string | null };
type Pack = { rows: Row[]; total: number; counts: { eventId: string; title: string; total: number; paid: number }[]; meetings: { event_id: string; meet_url: string }[]; emailConfigured: boolean };

async function adminRequest(eventId: string, offset: number, body?: Record<string, unknown>) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const session = await createSupabaseBrowserClient()?.auth.getSession();
  const token = session?.data.session?.access_token;
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`/api/admin/group-events?eventId=${encodeURIComponent(eventId)}&offset=${offset}`, { method: body ? "POST" : "GET", headers, credentials: "same-origin", cache: "no-store", ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(20000) });
  const pack = await response.json(); if (!response.ok) throw new Error(pack.error ?? pack.message ?? "İşlem tamamlanamadı."); return pack;
}

export default function AdminGroupEvents() {
  const [pack, setPack] = useState<Pack | null>(null), [eventId, setEventId] = useState(""), [offset, setOffset] = useState(0);
  const [meetingEvent, setMeetingEvent] = useState(groupEvents[0].id), [meetUrl, setMeetUrl] = useState("");
  const [orders, setOrders] = useState<Record<string, string>>({}), [busy, setBusy] = useState(false), [message, setMessage] = useState(""), [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    void adminRequest(eventId, offset).then(data => { if (active) setPack(data); }).catch(cause => { if (active) setError(cause.message); });
    return () => { active = false; };
  }, [eventId, offset]);
  function page(nextEventId: string, nextOffset: number) { setPack(null); setError(""); setEventId(nextEventId); setOffset(nextOffset); }
  async function act(body: Record<string, unknown>) {
    if (busy) return; setBusy(true); setMessage(""); setError("");
    try { const result = await adminRequest(eventId, offset, body); setMessage(result.message); setPack(await adminRequest(eventId, offset)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "İşlem tamamlanamadı."); }
    finally { setBusy(false); }
  }
  return <section className={s.admin} aria-labelledby="group-admin-title"><p className={s.eyebrow}>GRUP ÇALIŞMALARI · KAYIT YÖNETİMİ</p><h2 id="group-admin-title">Başvurular ve kesin kayıtlar</h2><p>Kesin kayıt sayısı yalnızca Shopier tarafından doğrulanan ödemeleri içerir. Başvurular tek başına katılımcı sayılmaz.</p>
    {error ? <p className={s.error} role="alert">{error}</p> : null}{message ? <p role="status">{message}</p> : null}
    {pack ? <>
      <div className={s.totals}>{pack.counts.map(count => <div key={count.eventId}><strong>{count.title}</strong><br />{count.total} başvuru · {count.paid} kesin kayıt</div>)}</div>
      <h3>Katılım bağlantısı</h3><p className={s.note}>Bağlantı genel sayfada gösterilmez. Yalnızca ödemesi yeniden doğrulanmış katılımcıya onay e-postasında gönderilir.</p>
      <form className={s.adminControls} onSubmit={e => { e.preventDefault(); void act({ action: "save-meeting", eventId: meetingEvent, meetUrl }); }}>
        <label>Etkinlik<select value={meetingEvent} onChange={e => { setMeetingEvent(e.target.value); setMeetUrl(pack.meetings.find(m => m.event_id === e.target.value)?.meet_url ?? ""); }}>{groupEvents.map(event => <option key={event.id} value={event.id}>{event.title}</option>)}</select></label>
        <label>Google Meet bağlantısı<input type="url" required value={meetUrl} onChange={e => setMeetUrl(e.target.value)} placeholder="https://meet.google.com/abc-defg-hij" /></label><button className={s.button} disabled={busy}>Bağlantıyı kaydet</button>
      </form>
      {!pack.emailConfigured ? <p className={s.notice}>E-posta hizmeti henüz yapılandırılmadı. Kayıt onayı gönderimi, gerekli sunucu ayarlarından sonra açılır.</p> : null}
      <label>Etkinliğe göre filtrele<select value={eventId} onChange={e => page(e.target.value, 0)}><option value="">Tüm etkinlikler</option>{groupEvents.map(event => <option value={event.id} key={event.id}>{event.title}</option>)}</select></label>
      <div className={s.tableWrap}><table><caption>Başvurular · {pack.total} kayıt</caption><thead><tr><th>Katılımcı</th><th>Etkinlik / paket</th><th>Toplam ücret</th><th>Durum</th><th>Kayıt tarihi</th><th>Shopier doğrulaması</th><th>Kayıt onayı</th></tr></thead><tbody>{pack.rows.map(row => <tr key={row.id}><td>{row.full_name}<br />{row.email}<br />{row.phone}</td><td>{row.event_title}</td><td>{formatGroupPrice(row.amount_kurus)}</td><td>{row.payment_status === "paid" ? "Ödendi · kesin kayıt" : row.payment_status === "refunded" ? "İade edildi" : "Ödeme bekleniyor"}</td><td>{new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", dateStyle: "short", timeStyle: "short" }).format(new Date(row.created_at))}</td><td>{row.provider_order_id ?? <><input aria-label={`${row.full_name} için Shopier sipariş numarası`} inputMode="numeric" value={orders[row.id] ?? ""} onChange={e => setOrders(old => ({ ...old, [row.id]: e.target.value }))} /><button type="button" className={s.button} disabled={busy || !orders[row.id]} onClick={() => void act({ action: "verify-payment", registrationId: row.id, orderId: orders[row.id] })}>Shopier’den doğrula</button></>}</td><td>{row.confirmation_sent_at ? "Gönderildi" : <button type="button" className={s.button} disabled={busy || row.payment_status !== "paid" || !pack.emailConfigured} onClick={() => void act({ action: "send-confirmation", registrationId: row.id })}>Onay e-postası gönder</button>}</td></tr>)}</tbody></table></div>
      <div className={s.actions}><button className={s.button} disabled={busy || offset === 0} onClick={() => page(eventId, Math.max(0, offset - 50))}>Önceki</button><button className={s.button} disabled={busy || offset + 50 >= pack.total} onClick={() => page(eventId, offset + 50)}>Sonraki</button></div>
    </> : !error ? <p role="status">Kayıtlar yükleniyor…</p> : null}
  </section>;
}
