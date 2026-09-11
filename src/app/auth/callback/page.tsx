"use client";

import { useEffect, useRef, useState } from "react";

import { createSupabaseBrowserClient } from "../../../lib/supabase/browser";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Giriş tamamlanıyor…");
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) {
      return;
    }
    ran.current = true;

    const search = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const code = search.get("code");
    const oauthError = search.get("error") || hash.get("error");
    const supabase = createSupabaseBrowserClient();

    async function finishSignIn() {
      if (oauthError || !supabase) {
        window.location.replace("/profilim?auth=error");
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (!session?.user) {
            setMessage("Giriş tamamlanamadı. Profilime dönülüyor…");
            window.location.replace("/profilim?auth=error");
            return;
          }
        }
      }

      await supabase.auth.getSession();
      window.location.replace("/profilim");
    }

    void finishSignIn();
  }, []);

  return (
    <main className="homePage profilimPage" id="top">
      <section className="profilimDash">
        <div className="profilimDashInner">
          <section className="profilimGate">
            <p className="profilimGateEyebrow">GOLDKOZMOS · PROFİLİM</p>
            <h1>{message}</h1>
          </section>
        </div>
      </section>
    </main>
  );
}
