"use client";

import { useEffect, useRef } from "react";

import { recordMemberJoin } from "../../../lib/admin/member-log";
import { createSupabaseBrowserClient } from "../../../lib/supabase/browser";

export default function AuthOturumPage() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) {
      return;
    }
    ran.current = true;

    const supabase = createSupabaseBrowserClient();
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const oauthError = params.get("error");

    async function finish() {
      if (oauthError || !supabase) {
        window.location.replace("/profilim?auth=error");
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          window.location.replace("/profilim?auth=error");
          return;
        }
      }

      await supabase.rpc("ensure_own_membership");
      const { data: userPack } = await supabase.auth.getUser();
      await recordMemberJoin(userPack.user ?? null);
      window.location.replace("/auth/kayit");
    }

    void finish();
  }, []);

  return (
    <main className="homePage profilimPage" id="top">
      <section className="profilimDash">
        <div className="profilimDashInner">
          <section className="profilimGate">
            <p className="profilimGateEyebrow">GOLDKOZMOS · PROFİLİM</p>
            <h1>Giriş tamamlanıyor…</h1>
          </section>
        </div>
      </section>
    </main>
  );
}
