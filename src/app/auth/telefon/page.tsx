"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { safeAppPath } from "../../../lib/site";

export default function AuthTelefonRedirectPage() {
  const searchParams = useSearchParams();
  const next = safeAppPath(searchParams.get("next"));

  useEffect(() => {
    const url = next === "/profilim" ? "/auth/kayit" : `/auth/kayit?next=${encodeURIComponent(next)}`;
    window.location.replace(url);
  }, [next]);

  return (
    <main className="homePage profilimPage" id="top">
      <section className="profilimDash">
        <div className="profilimDashInner">
          <section className="profilimGate">
            <p className="profilimGateEyebrow">GOLDKOZMOS · ÜYELİK</p>
            <h1>Kayıt bilgilerine geçiliyor…</h1>
          </section>
        </div>
      </section>
    </main>
  );
}
