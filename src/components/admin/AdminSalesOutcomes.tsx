"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import { salesStages, type SalesOutcome, type SalesStage } from "../../lib/admin/sales-outcomes";
import { useAdminLive } from "./AdminLiveProvider";

async function requestOutcomes(body?: { eventId: string; stage: SalesStage }) {
  const headers: Record<string,string> = { "Content-Type": "application/json" };
  const session = await createSupabaseBrowserClient()?.auth.getSession();
  const token = session?.data.session?.access_token;
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch("/api/admin/sales-outcomes", { method: body ? "POST" : "GET", headers, credentials: "same-origin", cache: "no-store", ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(15000) });
  const pack = await response.json();
  if (!response.ok) throw new Error(pack.error ?? "Sonuçlar yüklenemedi.");
  return pack.outcomes as Record<string, SalesOutcome>;
}

export default function AdminSalesOutcomes() {
  const { live } = useAdminLive();
  const [outcomes, setOutcomes] = useState<Record<string, SalesOutcome>>({});
  const [drafts, setDrafts] = useState<Record<string, SalesStage>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const load = useCallback(async () => { try { setOutcomes(await requestOutcomes()); setReady(true); } catch (error) { setMessage(error instanceof Error ? error.message : "Sonuçlar yüklenemedi."); } }, []);
  useEffect(() => {
    let active = true;
    void requestOutcomes().then(rows => { if (active) { setOutcomes(rows); setReady(true); } }).catch(error => { if (active) setMessage(error instanceof Error ? error.message : "Sonuçlar yüklenemedi."); });
    return () => { active = false; };
  }, []);
  const saved = Object.entries(outcomes);
  const booked = saved.filter(([,row])=>row.stage === "booked" || row.stage === "paid").length;
  const paid = saved.filter(([,row])=>row.stage === "paid").length;
  async function save(id: string) {
    setBusy(id); setMessage("");
    try { setOutcomes(await requestOutcomes({ eventId: id, stage: drafts[id] ?? outcomes[id]?.stage ?? "new" })); setMessage("Sonuç kaydedildi."); }
    catch(error) { setMessage(error instanceof Error ? error.message : "Kaydedilemedi."); }
    finally { setBusy(null); }
  }
  return <section className="adminPanel adminSalesOutcomes" aria-labelledby="sales-outcome-title"><header><h2 id="sales-outcome-title">Randevudan ödemeye</h2><p>WhatsApp geçişi satış değildir. Görüşme sonucunu doğruladığında aşağıdan kendin kaydet.</p></header>
    <div className="adminOutcomeSummary"><span><strong>{live?.appointments.length ?? 0}</strong> bugün randevu bağlantısına geçiş</span><span><strong>{ready ? booked : "—"}</strong> kaydedilen kesinleşmiş randevu</span><span><strong>{ready ? paid : "—"}</strong> ödeme alınan kayıt</span></div>
    <p className="adminQuiet">Sonuçlar yönetici hesabında saklanır; son 500 kayıt için toplamdır. WhatsApp yazışmaları otomatik okunmaz ve kişi bilgisi kaydedilmez.</p>
    {message ? <p role="status">{message}</p> : null}
    {!ready ? <button type="button" className="adminQuietButton" onClick={()=>void load()}>Sonuçları yükle</button> : null}
    {ready && (live?.appointments ?? []).map((event,index)=><form key={event.id} className="adminOutcomeRow" onSubmit={e=>{e.preventDefault();void save(event.id);}}><div><strong>Randevu geçişi {index+1}</strong><small>{event.path}</small><small>{new Date(event.createdAt).toLocaleString("tr-TR",{timeZone:"Europe/Istanbul"})}</small></div><label>Görüşme sonucu<select value={drafts[event.id] ?? outcomes[event.id]?.stage ?? "new"} onChange={e=>setDrafts(current=>({...current,[event.id]:e.target.value as SalesStage}))}>{Object.entries(salesStages).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label><button disabled={busy !== null} type="submit">{busy===event.id ? "Kaydediliyor…" : "Kaydet"}</button></form>)}
    {ready && saved.length ? <details><summary>Kaydettiğim sonuçlar ({saved.length})</summary>{saved.map(([id,row])=><form className="adminOutcomeRow" key={id} onSubmit={e=>{e.preventDefault();void save(id);}}><div><strong>{salesStages[row.stage]}</strong><small>{row.path}</small><small>{new Date(row.updatedAt).toLocaleString("tr-TR",{timeZone:"Europe/Istanbul"})}</small></div><label>Durumu düzenle<select value={drafts[id] ?? row.stage} onChange={e=>setDrafts(current=>({...current,[id]:e.target.value as SalesStage}))}>{Object.entries(salesStages).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label><button type="submit" disabled={busy!==null}>Kaydet</button></form>)}</details> : null}
  </section>;
}
