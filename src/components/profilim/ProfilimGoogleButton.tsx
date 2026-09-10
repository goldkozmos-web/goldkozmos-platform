"use client";

import { useState } from "react";

import { signInWithGoogle } from "../../lib/profilim/auth.client";

export default function ProfilimGoogleButton() {
  const [error, setError] = useState("");
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
