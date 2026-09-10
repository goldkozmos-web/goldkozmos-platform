"use client";

import { useEffect, useState } from "react";

import { postLoginPath, fetchOwnProfileFlags } from "../../../lib/admin/profile";
import { createSupabaseBrowserClient } from "../../../lib/supabase/browser";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Giriş tamamlanıyor…");

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const code = search.get("code");
    const oauthError = search.get("error") || hash.get("error");
    const supabase = createSupabaseBrowserClient();

    async function routeAfterLogin(userId: string | undefined) {
      if (!supabase || !userId) {
        window.location.replace("/profilim");
        return;
      }

      const profile = await fetchOwnProfileFlags(supabase, userId);
      window.location.replace(postLoginPath(profile));
    }

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
        await routeAfterLogin(session.user.id);
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

      await routeAfterLogin(later?.user?.id);
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
