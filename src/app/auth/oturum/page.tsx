"use client";
import { useEffect, useRef, useState } from "react";
import { recordMemberJoin } from "../../../lib/admin/member-log";
import { isSiteAdminEmail } from "../../../lib/admin/access";
import { isMemberProfileComplete } from "../../../lib/auth/membership";
import { registerStepUrl, safeAppPath } from "../../../lib/site";
import { createSupabaseBrowserClient } from "../../../lib/supabase/browser";

export default function AuthOturumPage() {
  const completion = useRef<Promise<string> | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (active) setError("Giriş beklenenden uzun sürdü. Bağlantını kontrol edip yeniden deneyebilirsin.");
    }, 12000);
    if (!completion.current) {
      completion.current = (async () => {
        const supabase = createSupabaseBrowserClient();
        const params = new URLSearchParams(window.location.search);
        if (params.get("error") || !supabase) throw new Error("auth_unavailable");
        const code = params.get("code");
        const flowId = params.get("sb_flow_id");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code, flowId ? { flowId } : undefined);
          if (exchangeError) throw exchangeError;
        }
        const { data, error: userError } = await supabase.auth.getUser();
        if (userError || !data.user) throw new Error("session_unavailable");
        void supabase.rpc("ensure_own_membership").then(() => undefined, () => undefined);
        void recordMemberJoin(data.user, undefined, supabase).catch(() => undefined);
        const next = safeAppPath(params.get("next"));
        return isSiteAdminEmail(data.user.email) || isMemberProfileComplete(data.user)
          ? next : registerStepUrl(window.location.origin, next);
      })();
    }
    void completion.current.then((destination) => {
      clearTimeout(timer);
      if (active) window.location.replace(destination);
    }).catch(() => {
      clearTimeout(timer);
      if (active) setError("Google girişi tamamlanamadı. Aynı tarayıcıda yeniden giriş yapabilirsin.");
    });
    return () => { active = false; clearTimeout(timer); };
  }, []);
  return (
    <main className="homePage profilimPage" id="top">
      <section className="profilimDash"><div className="profilimDashInner"><section className="profilimGate">
        <p className="profilimGateEyebrow">GOLDKOZMOS · PROFİLİM</p>
        <h1>{error ? "Bir kez daha deneyelim." : "Giriş tamamlanıyor…"}</h1>
        {error ? <><p role="alert">{error}</p><a className="profilimGoogleButton" href="/auth/google">Google ile yeniden giriş yap</a><a href="/profilim">Profilime dön</a></> : <p role="status">Kişisel alanına yönlendiriliyorsun.</p>}
      </section></div></section>
    </main>
  );
}
