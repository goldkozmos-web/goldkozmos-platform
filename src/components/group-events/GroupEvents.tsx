"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { groupEvents, formatGroupEventDate, groupEventSelection, groupEventPrice, formatGroupPrice } from "../../data/groupEvents";
import GroupEventSelection from "./GroupEventSelection";
import BankTransferInstructions, { type BankInstructions } from "./BankTransferInstructions";
import GroupInviteButtons from "./GroupInviteButtons";
import GroupTrackingLink from "./GroupTrackingLink";
import { GROUP_REGISTRATION_PENDING, GROUP_TRACKING_PAGE, GROUP_TRACKING_STORAGE, type GroupTrackingStatus } from "../../lib/group-events/tracking";
import s from "./GroupEvents.module.css";

type Application = { registrationId: string; trackingPath: string; checkoutUrl: string | null; bank: BankInstructions | null; paymentMethod: "bank_transfer" | "shopier"; eventIds: string[]; amountKurus: number };
type Status = Pick<GroupTrackingStatus, "paymentStatus" | "approved" | "invites">;

export default function GroupEvents({ enabledSelections, bankEnabled, carousel = false }: { enabledSelections: string[]; bankEnabled: boolean; carousel?: boolean }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([groupEvents[0].id]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "shopier">("bank_transfer");
  const [application, setApplication] = useState<Application | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const selectedEvents = groupEvents.filter(item => selectedIds.includes(item.id));
  const selection = selectedEvents.length ? groupEventSelection(selectedIds) : null;
  const price = groupEventPrice(selectedEvents.length);
  const selectionTitle = selectedEvents.map(item => item.title).join(" + ");
  const approved = status?.paymentStatus === "paid" && status.approved;
  const available = !!selection && (paymentMethod === "bank_transfer" ? bankEnabled : enabledSelections.includes(selection.key)) && selectedEvents.every(item => Date.parse(item.startsAt) > now);

  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 30_000); return () => clearInterval(timer); }, []);

  useEffect(() => {
    if (!application) return;
    let active = true, checking = false;
    const check = async () => {
      if (checking) return;
      checking = true;
      try {
        const response = await fetch(`/api/group-events/registrations/${application.registrationId}`, { cache: "no-store", credentials: "same-origin", signal: AbortSignal.timeout(8000) });
        const pack = await response.json();
        if (!response.ok) throw new Error(pack.error ?? "Kayıt durumu kontrol edilemedi.");
        if (active) { setStatus(pack); setError(""); }
      } catch { if (active) setError("Kayıt durumu şu an kontrol edilemiyor. Ödeme yaptıysan yeniden ödeme yapmadan bizimle iletişime geç."); }
      finally { checking = false; }
    };
    const checkIfVisible = () => { if (document.visibilityState === "visible") void check(); };
    void check();
    const interval = setInterval(checkIfVisible, 10000);
    document.addEventListener("visibilitychange", checkIfVisible);
    return () => {
      active = false;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", checkIfVisible);
    };
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
        body: JSON.stringify({ eventIds: selectedIds, paymentMethod, fullName: data.get("fullName"), email: data.get("email"), phone: data.get("phone"), whatsappOptIn: data.get("whatsappOptIn") === "on", privacyAcknowledged: data.get("privacy") === "on", termsAccepted: data.get("terms") === "on", website: data.get("website") }),
      });
      const pack = await response.json();
      if (!response.ok) throw new Error(pack.error ?? "Başvuru kaydedilemedi.");
      if (pack.paymentMethod !== paymentMethod) throw new Error("Ödeme yöntemi doğrulanamadı.");
      if (paymentMethod === "shopier" && !/^https:\/\/www\.shopier\.com\/[0-9]+$/.test(pack.checkoutUrl)) throw new Error("Ödeme bağlantısı doğrulanamadı.");
      if (paymentMethod === "bank_transfer" && (!pack.bank?.iban || !pack.bank?.description)) throw new Error("Banka bilgileri doğrulanamadı.");
      if (pack.amountKurus !== price.totalKurus) throw new Error("Paket tutarı değişti. Lütfen seçimini kontrol et.");
      setApplication({ registrationId: pack.registrationId, trackingPath: pack.trackingPath, paymentMethod, bank: pack.bank, checkoutUrl: pack.checkoutUrl, eventIds: [...selectedIds], amountKurus: pack.amountKurus });
      setStatus({ paymentStatus: "pending", approved: false, invites: [] });
      try { localStorage.setItem(GROUP_TRACKING_STORAGE, pack.registrationId); }
      catch { return; } // Keep the tracking link and manual payment button visible if recovery storage is unavailable.
      if (paymentMethod === "shopier") window.location.assign(pack.checkoutUrl);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Başvuru kaydedilemedi."); }
    finally { setBusy(false); }
  }

  return <section className={s.section} id="yaklasan-etkinlikler" aria-labelledby="group-events-title">
    <header className={s.heading}><div><p className={s.eyebrow}>GOLDKOZMOS · CANLI GRUP ÇALIŞMALARI</p><h2 id="group-events-title">Yaklaşan Etkinlikler</h2><p className={s.intro}>Kasım ayında birlikte kendine alan aç. Sana yakın gelen çalışmayı seç ve katılımını planla.</p></div>{!carousel ? <span className={s.summary}>Kasım 2026 · Google Meet<br />20.30 Türkiye saati · 600 TL</span> : null}</header>
    {carousel ? <p className={s.scrollHint}>Etkinlikleri kaydırarak keşfet →</p> : <p className={s.note}><a href={GROUP_TRACKING_PAGE}>Mevcut kaydını takip et</a></p>}
    <div className={s.grid} role={carousel ? "region" : undefined} aria-label={carousel ? "Kaydırılabilir yaklaşan etkinlikler" : undefined} tabIndex={carousel ? 0 : undefined}>{groupEvents.map(item => <article className={s.card} key={item.id} id={`etkinlik-${item.id}`}>
      <div className={s.cardHeader}><time dateTime={item.startsAt}>{carousel ? formatGroupEventDate(item.startsAt).toLocaleUpperCase("tr-TR") : formatGroupEventDate(item.startsAt)}</time>{!carousel ? <span>600 TL</span> : null}</div>
      {item.cover ? <Image src={item.cover.src} alt={item.cover.alt} width={1254} height={1254} sizes={carousel ? "(max-width:400px) 250px, 290px" : "(max-width:650px) 100vw, (max-width:1200px) 50vw, 550px"} style={{ width: "100%", height: "auto", aspectRatio: "1 / 1", borderRadius: 12 }} /> : null}
      <h3>{item.title}</h3><p>{item.purpose}</p>
      {!carousel ? <><div className={s.facts}><span>20.30 · Türkiye saati</span><span>Google Meet</span><span>Tek günlük canlı grup çalışması</span></div>
      <details className={s.details}><summary>{item.title} — çalışma detayları</summary><h4>Bu çalışmada neler var?</h4><ul>{item.scope.map(text => <li key={text}>{text}</li>)}</ul><h4>Kimler için uygun?</h4><p>{item.suitableFor}</p><h4>Katılım nasıl gerçekleşir?</h4><p>{formatGroupEventDate(item.startsAt)} 2026, saat 20.30’da Google Meet üzerinden canlı olarak buluşuyoruz. Katılım ücreti 600 TL’dir; sabit bir katılımcı sınırı yoktur. Ödeme kontrolü ve yönetici onayından sonra kesin kaydın oluşur. Onaydan sonra WhatsApp grup davetine kişisel kayıt takip bağlantından ulaşabilirsin.</p></details></> : null}
      <div className={s.registrationAction}>
        {carousel ? <div className={s.bookingFacts}><p>20.30 Türkiye saati · <strong>600 TL</strong></p><span>Google Meet · Tek günlük canlı grup çalışması</span></div> : null}
        <button type="button" className={s.button} onClick={e => open(item.id, e.currentTarget)} disabled={Date.parse(item.startsAt) <= now}>{carousel ? "Kayıt Ol" : "Çalışmaya Kayıt Ol"} <span aria-hidden="true">↗</span></button>
      </div>
    </article>)}</div>
    <p className={s.note}>Çalışmalar kişisel gelişim ve spiritüel farkındalık amaçlıdır; tıbbi tedavi veya psikoterapi yerine geçmez. Sonuç garantisi verilmez.</p>
    <dialog ref={dialog} className={s.dialog} aria-labelledby="group-register-title" onCancel={e => { if (busy) e.preventDefault(); }} onClose={() => opener.current?.focus()}>
      <header className={s.dialogHeader}><h2 id="group-register-title">Çalışmaya kayıt ol</h2><button type="button" className={s.close} aria-label="Kayıt formunu kapat" disabled={busy} onClick={close}>×</button></header>
      {application ? <div className={s.status} aria-live="polite"><p className={s.eyebrow}>{selectionTitle}</p>
        <h3>{status?.paymentStatus === "refunded" ? "Ödeme iade durumunda." : approved ? "Katılımınız Onaylandı!" : status?.paymentStatus === "paid" ? "Ödeme alındı. Yönetici onayı bekleniyor." : "Başvurun alındı. Ödeme bekleniyor."}</h3>
        {approved ? (!error && <GroupInviteButtons invites={status.invites} />) : <p>{status?.paymentStatus === "refunded" ? "Katılım durumun için bizimle iletişime geç." : GROUP_REGISTRATION_PENDING}</p>}
        {status?.paymentStatus === "pending" && application.bank ? <BankTransferInstructions bank={application.bank} amountKurus={application.amountKurus} /> : null}
        {status?.paymentStatus === "pending" && application.checkoutUrl ? <div className={s.actions}><a className={s.button} href={application.checkoutUrl} target="_blank" rel="noopener noreferrer">Shopier’de {formatGroupPrice(application.amountKurus)} öde ↗</a><button type="button" className={`${s.button} ${s.secondary}`} onClick={close}>Daha sonra devam et</button></div> : null}
        <GroupTrackingLink path={application.trackingPath} />
        {error ? <p className={s.error} role="alert">{error}</p> : null}
      </div> : <form className={s.form} onSubmit={submit}>
        <GroupEventSelection selectedIds={selectedIds} now={now} disabled={busy} onChange={ids => { setSelectedIds(ids); setError(""); setTermsAccepted(false); }} />
        <div className={s.priceSummary} aria-live="polite" aria-atomic="true">
          <p><span>{selectedEvents.length} etkinlik · Normal toplam</span><span>{formatGroupPrice(price.subtotalKurus)}</span></p>
          {price.discountKurus > 0 ? <p><span>Paket indirimi</span><span>−{formatGroupPrice(price.discountKurus)}</span></p> : null}
          <p className={s.priceTotal}><strong>Ödenecek toplam</strong><strong>{formatGroupPrice(price.totalKurus)}</strong></p>
          <small>2 etkinlik 850 TL · 3 etkinlik 1.550 TL · 4 etkinlik 2.000 TL</small>
        </div>
        <fieldset className={s.paymentMethods} disabled={busy}><legend>Ödeme yöntemi</legend>
          <label><input type="radio" name="paymentMethod" value="bank_transfer" checked={paymentMethod === "bank_transfer"} onChange={() => { setPaymentMethod("bank_transfer"); setTermsAccepted(false); }} /><span><strong>IBAN ile ödeme</strong><small>Havale / EFT / FAST · Yönetici onaylı kayıt</small></span></label>
          <label><input type="radio" name="paymentMethod" value="shopier" checked={paymentMethod === "shopier"} onChange={() => { setPaymentMethod("shopier"); setTermsAccepted(false); }} /><span><strong>Kartla ödeme · Shopier</strong><small>Kredi veya banka kartıyla ödeme alternatifi</small></span></label>
        </fieldset>
        <label>Ad ve soyad<input name="fullName" autoComplete="name" required minLength={3} maxLength={120} /></label>
        <label>E-posta adresi<input name="email" type="email" autoComplete="email" required maxLength={254} /><span className={s.note}>Kartla ödemede Shopier üzerinde de aynı e-postayı kullan.</span></label>
        <label>WhatsApp / telefon numarası<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={10} maxLength={24} placeholder="+90 5xx xxx xx xx" /></label>
        <label className={s.check}><input name="whatsappOptIn" type="checkbox" /><span>GoldKozmos tarafından kayıt onayımın bu numaraya WhatsApp üzerinden bildirilmesini istiyorum.</span></label>
        <div className={s.honeypot} aria-hidden="true"><label>Web sitesi<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className={s.check}><input name="privacy" type="checkbox" required /><span><a href="/kvkk-aydinlatma-metni" target="_blank" rel="noopener noreferrer">KVKK aydınlatma metnini</a> okudum. İletişim bilgilerimin başvuru, ödeme takibi ve katılım bilgilendirmeleri için kullanılacağı konusunda bilgilendirildim.</span></label>
        <label className={s.check}><input name="terms" type="checkbox" required checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} /><span>Seçtiğim çalışmaların tarihlerini, toplam {formatGroupPrice(price.totalKurus)} ücretini, <a href="/mesafeli-satis-sozlesmesi" target="_blank" rel="noopener noreferrer">satış koşullarını</a> ve <a href="/iptal-ve-iade-politikasi" target="_blank" rel="noopener noreferrer">iptal/iade politikasını</a> okudum ve kabul ediyorum. Kaydımın ödeme kontrolü ve yönetici onayından sonra kesinleşeceğini biliyorum.</span></label>
        {selection && !available ? <p className={s.notice}>Seçtiğin paket için online kayıt henüz açılmadı. Lütfen daha sonra tekrar kontrol et.</p> : null}
        {error ? <p className={s.error} role="alert">{error}</p> : null}
        <button className={s.button} type="submit" disabled={busy || !available}>{busy ? "Başvurun kaydediliyor…" : `${paymentMethod === "bank_transfer" ? "Başvur ve IBAN bilgilerini gör" : "Başvur ve kartla ödemeye geç"} · ${formatGroupPrice(price.totalKurus)}`}</button>
        <p className={s.note}>Bu form kart bilgisi istemez. Formun gönderilmesi veya ödeme sayfasından geri dönmek tek başına kesin kayıt oluşturmaz.</p>
      </form>}
    </dialog>
  </section>;
}
