"use client";

import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../../lib/supabase/browser";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Giriş tamamlanıyor…");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const supabase = createSupabaseBrowserClient();

    async function finishSignIn() {
      if (!supabase) {
        window.location.replace("/profilim?auth=error");
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          setMessage("Giriş tamamlanamadı. Profilime dönülüyor…");
          window.location.replace("/profilim?auth=error");
          return;
        }
      }

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
