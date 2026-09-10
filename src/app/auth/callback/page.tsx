"use client";

import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../../lib/supabase/browser";
import { emailFromAuthRecord, postAuthPath } from "../../../lib/admin/access";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Giriş tamamlanıyor…");

  useEffect(() => {
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
          setMessage("Giriş tamamlanamadı. Profilime dönülüyor…");
          window.location.replace("/profilim?auth=error");
          return;
        }
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        window.location.replace(postAuthPath(emailFromAuthRecord(session.user)));
        return;
      }

      await new Promise<void>((resolve) => {
        const timeout = window.setTimeout(() => resolve(), 4000);
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, nextSession) => {
          if (nextSession?.user) {
            window.clearTimeout(timeout);
            subscription.unsubscribe();
            resolve();
          }
        });
      });

      const {
        data: { session: later },
      } = await supabase.auth.getSession();

      window.location.replace(
        postAuthPath(emailFromAuthRecord(later?.user ?? null)),
      );
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
