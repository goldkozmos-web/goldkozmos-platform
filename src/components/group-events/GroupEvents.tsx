"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { groupEvents, formatGroupEventDate, groupEventSelection, groupEventPrice, formatGroupPrice } from "../../data/groupEvents";
import GroupEventSelection from "./GroupEventSelection";
import s from "./GroupEvents.module.css";

type Application = { registrationId: string; checkoutUrl: string; eventIds: string[]; amountKurus: number };
type Status = { paymentStatus: "pending" | "paid" | "refunded"; confirmationSent: boolean };

export default function GroupEvents({ enabledSelections, carousel = false }: { enabledSelections: string[]; carousel?: boolean }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([groupEvents[0].id]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const selectedEvents = groupEvents.filter(item => selectedIds.includes(item.id));
  const selection = selectedEvents.length ? groupEventSelection(selectedIds) : null;
  const price = groupEventPrice(selectedEvents.length);
  const selectionTitle = selectedEvents.map(item => item.title).join(" + ");
  const available = !!selection && enabledSelections.includes(selection.key) && selectedEvents.every(item => Date.parse(item.startsAt) > now);

  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 30_000); return () => clearInterval(timer); }, []);

  useEffect(() => {
    if (!application) return;
    let active = true;
    const check = async () => {
      try {
        const response = await fetch(`/api/group-events/registrations/${application.registrationId}`, { cache: "no-store", credentials: "same-origin", signal: AbortSignal.timeout(8000) });
        const pack = await response.json();
        if (!response.ok) throw new Error(pack.error ?? "Kayıt durumu kontrol edilemedi.");
        if (active) { setStatus(pack); setError(""); }
      } catch { if (active) setError("Kayıt durumu şu an kontrol edilemiyor. Ödeme yaptıysan yeniden ödeme yapmadan bizimle iletişime geç."); }
    };
    void check();
    const interval = setInterval(() => { if (document.visibilityState === "visible") void check(); }, 10000);
    return () => { active = false; clearInterval(interval); };
  }, [application]);

  function open(id: string, target: HTMLElement) {
    opener.current = target; setSelectedIds([id]); setError(""); setTermsAccepted(false);
    if (application?.eventIds.length !== 1 || application.eventIds[0] !== id) { setApplication(null); setStatus(null); }
    dialog.current?.showModal();
  }
  function close() { if (!busy) dialog.current?.close(); }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy || !available) return;
    const data = new FormData(e.currentTarget); setBusy(true); setError("");
    try {
      const response = await fetch("/api/group-events/registrations", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ eventIds: selectedIds, fullName: data.get("fullName"), email: data.get("email"), phone: data.get("phone"), privacyAcknowledged: data.get("privacy") === "on", termsAccepted: data.get("terms") === "on", website: data.get("website") }),
      });
      const pack = await response.json();
      if (!response.ok) throw new Error(pack.error ?? "Başvuru kaydedilemedi.");
      if (!/^https:\/\/www\.shopier\.com\/[0-9]+$/.test(pack.checkoutUrl)) throw new Error("Ödeme bağlantısı doğrulanamadı.");
      if (pack.amountKurus !== price.totalKurus) throw new Error("Paket tutarı değişti. Lütfen seçimini kontrol et.");
      setApplication({ registrationId: pack.registrationId, checkoutUrl: pack.checkoutUrl, eventIds: [...selectedIds], amountKurus: pack.amountKurus });
      setStatus({ paymentStatus: "pending", confirmationSent: false });
      window.location.assign(pack.checkoutUrl);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Başvuru kaydedilemedi."); }
    finally { setBusy(false); }
  }

  return <section className={s.section} id="yaklasan-etkinlikler" aria-labelledby="group-events-title">
    <header className={s.heading}><div><p className={s.eyebrow}>GOLDKOZMOS · CANLI GRUP ÇALIŞMALARI</p><h2 id="group-events-title">Yaklaşan Etkinlikler</h2><p className={s.intro}>Kasım ayında birlikte kendine alan aç. Sana yakın gelen çalışmayı seç ve katılımını planla.</p></div>{!carousel ? <span className={s.summary}>Kasım 2026 · Google Meet<br />20.30 Türkiye saati · 600 TL</span> : null}</header>
    {carousel ? <p className={s.scrollHint}>Etkinlikleri kaydırarak keşfet →</p> : null}
    <div className={s.grid} role={carousel ? "region" : undefined} aria-label={carousel ? "Kaydırılabilir yaklaşan etkinlikler" : undefined} tabIndex={carousel ? 0 : undefined}>{groupEvents.map(item => <article className={s.card} key={item.id} id={`etkinlik-${item.id}`}>
      <div className={s.cardHeader}><time dateTime={item.startsAt}>{carousel ? formatGroupEventDate(item.startsAt).toLocaleUpperCase("tr-TR") : formatGroupEventDate(item.startsAt)}</time>{!carousel ? <span>600 TL</span> : null}</div>
      {item.cover ? <Image src={item.cover.src} alt={item.cover.alt} width={1254} height={1254} sizes={carousel ? "(max-width:400px) 250px, 290px" : "(max-width:650px) 100vw, (max-width:1200px) 50vw, 550px"} style={{ width: "100%", height: "auto", aspectRatio: "1 / 1", borderRadius: 12 }} /> : null}
      <h3>{item.title}</h3><p>{item.purpose}</p>
      {!carousel ? <><div className={s.facts}><span>20.30 · Türkiye saati</span><span>Google Meet</span><span>Tek günlük canlı grup çalışması</span></div>
      <details className={s.details}><summary>{item.title} — çalışma detayları</summary><h4>Bu çalışmada neler var?</h4><ul>{item.scope.map(text => <li key={text}>{text}</li>)}</ul><h4>Kimler için uygun?</h4><p>{item.suitableFor}</p><h4>Katılım nasıl gerçekleşir?</h4><p>{formatGroupEventDate(item.startsAt)} 2026, saat 20.30’da Google Meet üzerinden canlı olarak buluşuyoruz. Katılım ücreti 600 TL’dir; sabit bir katılımcı sınırı yoktur. Ödemen doğrulandıktan sonra kayıt onayın ve katılım bağlantın kayıt e-postana gönderilir.</p></details></> : null}
      <div className={s.registrationAction}>
        {carousel ? <div className={s.bookingFacts}><p>20.30 Türkiye saati · <strong>600 TL</strong></p><span>Google Meet · Tek günlük canlı grup çalışması</span></div> : null}
        <button type="button" className={s.button} onClick={e => open(item.id, e.currentTarget)} disabled={Date.parse(item.startsAt) <= now}>{carousel ? "Kayıt Ol" : "Çalışmaya Kayıt Ol"} <span aria-hidden="true">↗</span></button>
      </div>
    </article>)}</div>
    <p className={s.note}>Çalışmalar kişisel gelişim ve spiritüel farkındalık amaçlıdır; tıbbi tedavi veya psikoterapi yerine geçmez. Sonuç garantisi verilmez.</p>
    <dialog ref={dialog} className={s.dialog} aria-labelledby="group-register-title" onCancel={e => { if (busy) e.preventDefault(); }} onClose={() => opener.current?.focus()}>
      <header className={s.dialogHeader}><h2 id="group-register-title">Çalışmaya kayıt ol</h2><button type="button" className={s.close} aria-label="Kayıt formunu kapat" disabled={busy} onClick={close}>×</button></header>
      {application ? <div className={s.status} aria-live="polite"><p className={s.eyebrow}>{selectionTitle}</p>
        <h3>{status?.paymentStatus === "paid" ? "Ödemen doğrulandı." : status?.paymentStatus === "refunded" ? "Ödeme iade durumunda." : "Başvurun alındı. Ödeme bekleniyor."}</h3>
        <p>{status?.paymentStatus === "paid" ? status.confirmationSent ? "Kayıt onayın ve Google Meet bağlantıların e-posta adresine gönderildi. Gelen kutunu ve spam klasörünü kontrol et." : "Kesin kaydın oluştu. Kayıt onayın ve Google Meet bağlantıların kayıt e-postana iletilecek." : status?.paymentStatus === "refunded" ? "Katılım durumun için bizimle iletişime geç." : `Kesin kayıt için Shopier üzerinden ${formatGroupPrice(application.amountKurus)} ödemeni tamamla. Shopier’de kayıt formundaki e-posta adresini kullan ve yalnızca seçtiğin paketi, 1 adet olarak satın al.`}</p>
        {status?.paymentStatus === "pending" ? <div className={s.actions}><a className={s.button} href={application.checkoutUrl} target="_blank" rel="noopener noreferrer">Shopier’de {formatGroupPrice(application.amountKurus)} öde ↗</a><button type="button" className={`${s.button} ${s.secondary}`} onClick={close}>Daha sonra devam et</button></div> : null}
        {error ? <p className={s.error} role="alert">{error}</p> : null}
      </div> : <form className={s.form} onSubmit={submit}>
        <GroupEventSelection selectedIds={selectedIds} now={now} disabled={busy} onChange={ids => { setSelectedIds(ids); setError(""); setTermsAccepted(false); }} />
        <div className={s.priceSummary} aria-live="polite" aria-atomic="true">
          <p><span>{selectedEvents.length} etkinlik · Normal toplam</span><span>{formatGroupPrice(price.subtotalKurus)}</span></p>
          {price.discountKurus > 0 ? <p><span>Paket indirimi</span><span>−{formatGroupPrice(price.discountKurus)}</span></p> : null}
          <p className={s.priceTotal}><strong>Ödenecek toplam</strong><strong>{formatGroupPrice(price.totalKurus)}</strong></p>
          <small>2 etkinlik 850 TL · 3 etkinlik 1.550 TL · 4 etkinlik 2.000 TL</small>
        </div>
        <label>Ad ve soyad<input name="fullName" autoComplete="name" required minLength={3} maxLength={120} /></label>
        <label>E-posta adresi<input name="email" type="email" autoComplete="email" required maxLength={254} /><span className={s.note}>Shopier ödemesinde de aynı e-postayı kullan. Kayıt onayın bu adrese iletilecek.</span></label>
        <label>Telefon numarası<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={10} maxLength={24} placeholder="+90 5xx xxx xx xx" /></label>
        <div className={s.honeypot} aria-hidden="true"><label>Web sitesi<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className={s.check}><input name="privacy" type="checkbox" required /><span><a href="/kvkk-aydinlatma-metni" target="_blank" rel="noopener noreferrer">KVKK aydınlatma metnini</a> okudum. İletişim bilgilerimin başvuru, ödeme takibi ve katılım bilgilendirmeleri için kullanılacağı konusunda bilgilendirildim.</span></label>
        <label className={s.check}><input name="terms" type="checkbox" required checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} /><span>Seçtiğim çalışmaların tarihlerini, toplam {formatGroupPrice(price.totalKurus)} ücretini, <a href="/mesafeli-satis-sozlesmesi" target="_blank" rel="noopener noreferrer">satış koşullarını</a> ve <a href="/iptal-ve-iade-politikasi" target="_blank" rel="noopener noreferrer">iptal/iade politikasını</a> okudum ve kabul ediyorum. Kaydımın ödeme doğrulandıktan sonra kesinleşeceğini biliyorum.</span></label>
        {selection && !available ? <p className={s.notice}>Seçtiğin paket için online kayıt henüz açılmadı. Lütfen daha sonra tekrar kontrol et.</p> : null}
        {error ? <p className={s.error} role="alert">{error}</p> : null}
        <button className={s.button} type="submit" disabled={busy || !available}>{busy ? "Başvurun kaydediliyor…" : `Başvuruyu kaydet ve ödemeye geç · ${formatGroupPrice(price.totalKurus)}`}</button>
        <p className={s.note}>Bu form kart bilgisi istemez. Formun gönderilmesi veya ödeme sayfasından geri dönmek tek başına kesin kayıt oluşturmaz.</p>
      </form>}
    </dialog>
  </section>;
}
