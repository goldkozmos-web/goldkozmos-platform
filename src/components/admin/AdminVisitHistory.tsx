"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import type { VisitHistoryPage, VisitPeriod } from "../../lib/admin/visit-history";
import styles from "./AdminVisitHistory.module.css";

const time = (at: string) => new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(at));

export default function AdminVisitHistory() {
  const [period, setPeriod] = useState<VisitPeriod>("7");
  const [type, setType] = useState("all");
  const [country, setCountry] = useState("all");
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState<VisitHistoryPage | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const request = useRef<AbortController | null>(null);

  function resetList() {
    request.current?.abort();
    setBusy(true); setError(""); setData(null);
  }

  const fetchPage = useCallback(async (signal: AbortSignal, before?: string) => {
    const client = createSupabaseBrowserClient();
    const session = await client?.auth.getSession();
    const headers: HeadersInit = {};
    if (session?.data.session?.access_token) headers.Authorization = `Bearer ${session.data.session.access_token}`;
    const params = new URLSearchParams({ period, type, country });
    if (before) params.set("before", before);
    const response = await fetch(`/api/admin/visit-history?${params}`, { headers, signal, cache: "no-store", credentials: "same-origin" });
    const result = await response.json();
    if (!response.ok) throw Error(result.error || "Geçmiş yüklenemedi.");
    return result as VisitHistoryPage;
  }, [period, type, country]);

  useEffect(() => {
    const controller = new AbortController(); request.current = controller;
    void fetchPage(controller.signal).then(result => { if (!controller.signal.aborted) setData(result); })
      .catch(e => { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "Geçmiş yüklenemedi."); })
      .finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => { controller.abort(); request.current?.abort(); };
  }, [fetchPage, refresh]);

  async function more() {
    if (!data?.next || busy) return;
    const controller = new AbortController(); request.current = controller;
    setBusy(true); setError("");
    try {
      const next = await fetchPage(controller.signal, data.next);
      if (!controller.signal.aborted) setData(current => current ? { ...next, rows: [...current.rows, ...next.rows.filter(row => !current.rows.some(old => old.id === row.id))] } : next);
    } catch (e) { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "Geçmiş yüklenemedi."); }
    finally { if (!controller.signal.aborted) setBusy(false); }
  }
  useEffect(() => () => request.current?.abort(), []);

  return <section className={styles.panel} aria-labelledby="visit-history-title">
    <header className={styles.header}><p>GOLDKOZMOS · ZİYARET DEFTERİ</p><h2 id="visit-history-title">Ziyaret geçmişi</h2><span>Sen burada değilken gelenler de kayıtlı.</span></header>
    <div className={styles.filters}>
      <label>Tarih aralığı<select value={period} onChange={e => { resetList(); setPeriod(e.target.value as VisitPeriod); }}><option value="today">Bugün</option><option value="7">Son 7 gün</option><option value="30">Son 30 gün</option><option value="90">Son 90 gün</option><option value="all">Tüm kayıtlar</option></select></label>
      <label>Ziyaretçi<select value={type} onChange={e => { resetList(); setType(e.target.value); }}><option value="all">Herkes</option><option value="member">Üyeler</option><option value="anonymous">Anonim ziyaretçiler</option></select></label>
      <label>Ülke<select value={country} onChange={e => { resetList(); setCountry(e.target.value); }}><option value="all">Tüm ülkeler</option><option value="TR">Türkiye</option><option value="other">Türkiye dışı</option></select></label>
      <button type="button" disabled={busy} onClick={() => { resetList(); setRefresh(value => value + 1); }}>Yenile ↻</button>
    </div>
    <p className={styles.status} role="status">{busy ? "Kayıtlar yükleniyor…" : data ? `${data.rows.length} sayfa ziyareti gösteriliyor · Son güncelleme ${time(data.updatedAt)}` : "Kayıtlar alınamadı."}</p>
    {error ? <p className={styles.error} role="alert">{error}</p> : null}
    {data && !data.rows.length && !busy ? <div className={styles.empty}>Bu aralıkta gösterilecek ziyaret yok.{data.next ? " Daha eski kayıtları yükleyebilirsin." : ""}</div> : null}
    <div className={styles.list}>{data?.rows.map(row => <article key={row.id} className={styles.row}>
      <div className={styles.identity}><span className={styles.avatar} aria-hidden="true">{row.member ? row.label.slice(0, 1).toLocaleUpperCase("tr-TR") : "◇"}</span><div><strong>{row.label}</strong><small>{row.member ? "Üye" : `Anonim · ${row.code}`}</small></div><time dateTime={row.at}>{time(row.at)}</time></div>
      <div className={styles.path}>{row.path}</div><p>{row.source} <span>·</span> {row.location}</p>
    </article>)}</div>
    {data?.next ? <button type="button" className={styles.more} disabled={busy} onClick={() => void more()}>{busy ? "Yükleniyor…" : "Daha eski ziyaretleri göster ↓"}</button> : null}
    <p className={styles.note}>Her satır bir sayfa ziyaretidir; aynı kişinin tekrarları dahildir. İsim yalnızca giriş yapmış ve eşleşen üye kaydı bulunan kişilerde görünür. Anonim kodlar tarayıcıyı ayırt eder, kişinin kimliğini göstermez. Konum yaklaşık olabilir. Yönetici hesabına ait eşleşen kayıtlar gösterilmez; daha önce tanımlanamayan test ziyaretleri ayrıştırılamayabilir. Yalnızca sistemde saklanan kayıtlar listelenir. Tüm saatler Türkiye saatidir.</p>
  </section>;
}
