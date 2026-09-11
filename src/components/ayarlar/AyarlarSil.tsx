"use client";

import { useState } from "react";

import { createProfilimBrowserClient } from "../../lib/profilim/auth.client";
import AyarlarFrame from "./AyarlarFrame";

export default function AyarlarSil() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function remove() {
    if (!window.confirm("Hesabın kalıcı olarak silinsin mi?")) {
      return;
    }
    setBusy(true);
    setError("");
    const supabase = createProfilimBrowserClient();
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (supabase) {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (token) headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch("/api/ayarlar/sil", {
      method: "POST",
      headers,
      credentials: "same-origin",
    });
    if (!response.ok) {
      setBusy(false);
      setError("Silinemedi. Çıkış yapıp tekrar dene.");
      return;
    }
    await supabase?.auth.signOut();
    window.location.replace("/profilim");
  }

  return (
    <AyarlarFrame title="Hesabımı Sil" backHref="/ayarlar">
      {() => (
        <div className="ayarlarCard ayarlarCopy">
          <p>
            Hesabın ve girişin silinir. Bu işlem geri alınamaz.
          </p>
          {error ? <p className="ayarlarNote">{error}</p> : null}
          <button
            type="button"
            className="ayarlarDanger"
            disabled={busy}
            onClick={() => void remove()}
          >
            {busy ? "Siliniyor…" : "Hesabımı sil"}
          </button>
        </div>
      )}
    </AyarlarFrame>
  );
}
