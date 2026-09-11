"use client";

import { useSearchParams } from "next/navigation";

export default function ProfilimSignIn() {
  const searchParams = useSearchParams();
  const error =
    searchParams.get("auth") === "error"
      ? "Google girişi tamamlanamadı. Tekrar dene."
      : "";

  return (
    <div className="profilimGoogleWrap">
      <a className="profilimGoogleButton" href="/auth/google">
        Google ile devam et
      </a>
      {error ? <p className="profilimGoogleError">{error}</p> : null}
    </div>
  );
}
