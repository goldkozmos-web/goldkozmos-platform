"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { signInWithGoogle } from "../../lib/profilim/auth.client";

export default function ProfilimGoogleButton() {
  const searchParams = useSearchParams();
  const [error, setError] = useState(
    searchParams.get("auth") === "error"
      ? "Google girişi tamamlanamadı. Tekrar dene."
      : "",
  );
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setError("");
    setPending(true);

    const result = await signInWithGoogle();

    if (result.error) {
      setError(result.error);
      setPending(false);
    }
  }

  return (
    <div className="profilimGoogleWrap">
      <button
        type="button"
        className="profilimGoogleButton"
        onClick={() => void handleClick()}
        disabled={pending}
      >
        {pending ? "Yönlendiriliyor…" : "Google ile Devam Et"}
      </button>
      {error ? <p className="profilimGoogleError">{error}</p> : null}
    </div>
  );
}
