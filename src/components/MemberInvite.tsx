"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createSupabaseBrowserClient } from "../lib/supabase/browser";
import "../styles/member-invite.css";

const dismissalKey = "goldkozmos-member-invite-dismissed";
let dismissedThisVisit = false;

export default function MemberInvite() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const publicPage = !/^\/(admin|auth|profilim|ayarlar|api)(\/|$)/.test(pathname);

  useEffect(() => {
    if (!publicPage || dismissedThisVisit) return;
    try { if (localStorage.getItem(dismissalKey)) return; } catch { /* Private browsing can disable storage. */ }
    let cancelled = false;
    const client = createSupabaseBrowserClient();
    const timer = window.setTimeout(() => {
      if (!client) return;
      void client.auth.getSession().then(({ data, error }) => {
        if (!cancelled && !error && !data.session && !dismissedThisVisit) setOpen(true);
      }).catch(() => undefined);
    }, 15000);
    const subscription = client?.auth.onAuthStateChange((_event, session) => {
      if (session) setOpen(false);
    }).data.subscription;
    return () => { cancelled = true; clearTimeout(timer); subscription?.unsubscribe(); };
  }, [publicPage]);

  function dismiss() {
    dismissedThisVisit = true;
    try { localStorage.setItem(dismissalKey, "1"); } catch { /* Keep the dismissal for this visit. */ }
    setOpen(false);
  }

  if (!open || !publicPage) return null;
  return (
    <aside className="memberInvite" aria-label="Üyelik daveti">
      <button className="memberInviteClose" type="button" aria-label="Üyelik davetini kapat" onClick={dismiss}>×</button>
      <div className="memberInviteArt" aria-hidden="true"><span className="memberInviteOrbit" /><span className="memberInviteStar">✦</span><span className="memberInviteSpark">✧</span><span className="memberInviteArtLabel">SENİN KOZMOSUN</span></div>
      <span className="memberInviteEyebrow">GOLDKOZMOS · ÜCRETSİZ ÜYELİK</span>
      <h2>Kendine ait<br /><em>bir alan aç.</em></h2>
      <p>Sevdiğin içerikleri bir arada tut, günlük alanlarını keşfet ve Paylaşım Çemberi’ne katıl.</p>
      <ul className="memberInviteReasons"><li>İçerikleri favorilerine ekle</li><li>Duygu ve rüya günlüklerine yer aç</li><li>Çemberde yorum yap, paylaşımda bulun</li></ul>
      <Link className="memberInviteJoin" href="/profilim" onClick={dismiss}>Ücretsiz üye ol <span aria-hidden="true">↗</span></Link>
      <p className="memberInviteNote">Üyelik ücretsizdir. Ücretli çalışmalar ayrıca sunulur.</p>
      <button type="button" className="memberInviteLater" onClick={dismiss}>Şimdi değil, keşfetmeye devam et</button>
    </aside>
  );
}
