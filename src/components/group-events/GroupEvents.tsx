"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { groupEvents, formatGroupEventDate } from "../../data/groupEvents";
import s from "./GroupEvents.module.css";

type Application = { registrationId: string; checkoutUrl: string; eventId: string };
type Status = { paymentStatus: "pending" | "paid" | "refunded"; confirmationSent: boolean };

export default function GroupEvents({ enabledIds }: { enabledIds: string[] }) {
  const [selectedId, setSelectedId] = useState(groupEvents[0].id);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [application, setApplication] = useState<Application | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const event = groupEvents.find(item => item.id === selectedId)!;
  const available = enabledIds.includes(event.id) && Date.parse(event.startsAt) > now;

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
    opener.current = target; setSelectedId(id); setError("");
    if (application?.eventId !== id) { setApplication(null); setStatus(null); }
    dialog.current?.showModal();
  }
  function close() { if (!busy) dialog.current?.close(); }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy || !available) return;
    const data = new FormData(e.currentTarget); setBusy(true); setError("");
    try {
      const response = await fetch("/api/group-events/registrations", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ eventId: selectedId, fullName: data.get("fullName"), email: data.get("email"), phone: data.get("phone"), privacyAcknowledged: data.get("privacy") === "on", termsAccepted: data.get("terms") === "on", website: data.get("website") }),
      });
      const pack = await response.json();
      if (!response.ok) throw new Error(pack.error ?? "Başvuru kaydedilemedi.");
      if (!/^https:\/\/www\.shopier\.com\/[0-9]+$/.test(pack.checkoutUrl)) throw new Error("Ödeme bağlantısı doğrulanamadı.");
      setApplication({ registrationId: pack.registrationId, checkoutUrl: pack.checkoutUrl, eventId: selectedId });
      setStatus({ paymentStatus: "pending", confirmationSent: false });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Başvuru kaydedilemedi."); }
    finally { setBusy(false); }
  }

  return <section className={s.section} id="yaklasan-etkinlikler" aria-labelledby="group-events-title">
    <header className={s.heading}><div><p className={s.eyebrow}>GOLDKOZMOS · CANLI GRUP ÇALIŞMALARI</p><h2 id="group-events-title">Yaklaşan Etkinlikler</h2><p className={s.intro}>Kasım ayında birlikte kendine alan aç. Sana yakın gelen çalışmayı seç, detayları incele ve katılımını planla.</p></div><span className={s.summary}>Kasım 2026 · Google Meet<br />20.30 Türkiye saati · 600 TL</span></header>
    <div className={s.grid}>{groupEvents.map(item => <article className={s.card} key={item.id} id={`etkinlik-${item.id}`}>
      <div className={s.cardHeader}><time dateTime={item.startsAt}>{formatGroupEventDate(item.startsAt)}</time><span>600 TL</span></div>
      {item.cover ? <Image src={item.cover.src} alt={item.cover.alt} width={600} height={400} sizes="(max-width:650px) 100vw, 50vw" style={{ width: "100%", height: "auto", borderRadius: 12 }} /> : null}
      <h3>{item.title}</h3><p>{item.purpose}</p>
      <div className={s.facts}><span>20.30 · Türkiye saati</span><span>Google Meet</span><span>Tek günlük canlı grup çalışması</span></div>
      <details className={s.details}><summary>{item.title} — çalışma detayları</summary><h4>Bu çalışmada neler var?</h4><ul>{item.scope.map(text => <li key={text}>{text}</li>)}</ul><h4>Kimler için uygun?</h4><p>{item.suitableFor}</p><h4>Katılım nasıl gerçekleşir?</h4><p>{formatGroupEventDate(item.startsAt)} 2026, saat 20.30’da Google Meet üzerinden canlı olarak buluşuyoruz. Katılım ücreti 600 TL’dir; sabit bir katılımcı sınırı yoktur. Ödemen doğrulandıktan sonra kayıt onayın ve katılım bağlantın kayıt e-postana gönderilir.</p></details>
      <button type="button" className={s.button} onClick={e => open(item.id, e.currentTarget)} disabled={Date.parse(item.startsAt) <= now}>Çalışmaya Kayıt Ol <span aria-hidden="true">↗</span></button>
    </article>)}</div>
    <p className={s.note}>Çalışmalar kişisel gelişim ve spiritüel farkındalık amaçlıdır; tıbbi tedavi veya psikoterapi yerine geçmez. Sonuç garantisi verilmez.</p>
    <dialog ref={dialog} className={s.dialog} aria-labelledby="group-register-title" onCancel={e => { if (busy) e.preventDefault(); }} onClose={() => opener.current?.focus()}>
      <header className={s.dialogHeader}><h2 id="group-register-title">Çalışmaya kayıt ol</h2><button type="button" className={s.close} aria-label="Kayıt formunu kapat" disabled={busy} onClick={close}>×</button></header>
      {application ? <div className={s.status} aria-live="polite"><p className={s.eyebrow}>{event.title}</p>
        <h3>{status?.paymentStatus === "paid" ? "Ödemen doğrulandı." : status?.paymentStatus === "refunded" ? "Ödeme iade durumunda." : "Başvurun alındı. Ödeme bekleniyor."}</h3>
        <p>{status?.paymentStatus === "paid" ? status.confirmationSent ? "Kayıt onayın ve Google Meet bağlantın e-posta adresine gönderildi. Gelen kutunu ve spam klasörünü kontrol et." : "Kesin kaydın oluştu. Kayıt onayın ve Google Meet bağlantın kayıt e-postana iletilecek." : status?.paymentStatus === "refunded" ? "Katılım durumun için bizimle iletişime geç." : "Kesin kayıt için Shopier üzerinden 600 TL ödemeni tamamla. Shopier’de kayıt formundaki e-posta adresini kullan ve yalnızca bu etkinliği, 1 adet olarak satın al."}</p>
        {status?.paymentStatus === "pending" ? <div className={s.actions}><a className={s.button} href={application.checkoutUrl} target="_blank" rel="noopener noreferrer">Shopier’de 600 TL öde ↗</a><button type="button" className={`${s.button} ${s.secondary}`} onClick={close}>Daha sonra devam et</button></div> : null}
        {error ? <p className={s.error} role="alert">{error}</p> : null}
      </div> : <form className={s.form} onSubmit={submit}>
        <p className={s.notice}>{event.title}<br />{formatGroupEventDate(event.startsAt)} 2026 · 20.30 · Google Meet · 600 TL</p>
        <label>Katılacağın etkinlik<select name="eventId" value={selectedId} onChange={e => { setSelectedId(e.target.value); setError(""); }}>{groupEvents.map(item => <option value={item.id} key={item.id}>{item.title} · {formatGroupEventDate(item.startsAt)}</option>)}</select></label>
        <label>Ad ve soyad<input name="fullName" autoComplete="name" required minLength={3} maxLength={120} /></label>
        <label>E-posta adresi<input name="email" type="email" autoComplete="email" required maxLength={254} /><span className={s.note}>Shopier ödemesinde de aynı e-postayı kullan. Kayıt onayın bu adrese iletilecek.</span></label>
        <label>Telefon numarası<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={10} maxLength={24} placeholder="+90 5xx xxx xx xx" /></label>
        <div className={s.honeypot} aria-hidden="true"><label>Web sitesi<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className={s.check}><input name="privacy" type="checkbox" required /><span><a href="/kvkk-aydinlatma-metni" target="_blank" rel="noopener noreferrer">KVKK aydınlatma metnini</a> okudum. İletişim bilgilerimin başvuru, ödeme takibi ve katılım bilgilendirmeleri için kullanılacağı konusunda bilgilendirildim.</span></label>
        <label className={s.check}><input name="terms" type="checkbox" required /><span>Seçtiğim çalışmanın tarihini, 600 TL ücretini, <a href="/mesafeli-satis-sozlesmesi" target="_blank" rel="noopener noreferrer">satış koşullarını</a> ve <a href="/iptal-ve-iade-politikasi" target="_blank" rel="noopener noreferrer">iptal/iade politikasını</a> okudum ve kabul ediyorum. Kaydımın ödeme doğrulandıktan sonra kesinleşeceğini biliyorum.</span></label>
        {!available ? <p className={s.notice}>Online kayıt henüz açılmadı. Lütfen daha sonra tekrar kontrol et.</p> : null}
        {error ? <p className={s.error} role="alert">{error}</p> : null}
        <button className={s.button} type="submit" disabled={busy || !available}>{busy ? "Başvurun kaydediliyor…" : "Başvuruyu kaydet ve ödemeye geç · 600 TL"}</button>
        <p className={s.note}>Bu form kart bilgisi istemez. Formun gönderilmesi veya ödeme sayfasından geri dönmek tek başına kesin kayıt oluşturmaz.</p>
      </form>}
    </dialog>
  </section>;
}
