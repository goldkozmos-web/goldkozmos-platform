"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { normalizeTrPhone, phoneOtpMessage } from "../../lib/auth/phone";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

export default function ProfilimSignIn() {
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(
    searchParams.get("auth") === "error"
      ? "Google girişi tamamlanamadı. Tekrar dene."
      : "",
  );

  const supabase = createSupabaseBrowserClient();

  async function sendCode(event: React.FormEvent) {
    event.preventDefault();
    const normalized = normalizeTrPhone(phone);
    if (!normalized) {
      setError("05xx ile başlayan bir cep numarası yaz.");
      return;
    }
    if (!supabase) {
      setError("Giriş şu an hazır değil. Google ile dene.");
      return;
    }

    setPending(true);
    setError("");
    const { error: sendError } = await supabase.auth.signInWithOtp({
      phone: normalized,
    });
    setPending(false);

    if (sendError) {
      setError(phoneOtpMessage(sendError.message));
      return;
    }

    setSent(true);
  }

  async function verifyCode(event: React.FormEvent) {
    event.preventDefault();
    const normalized = normalizeTrPhone(phone);
    if (!normalized || !supabase) {
      setError("Numarayı kontrol edip tekrar dene.");
      return;
    }

    setPending(true);
    setError("");
    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone: normalized,
      token: code.trim(),
      type: "sms",
    });
    setPending(false);

    if (verifyError) {
      setError(phoneOtpMessage(verifyError.message));
      return;
    }

    await supabase.rpc("ensure_own_membership");
    window.location.replace("/profilim");
  }

  return (
    <div className="profilimGoogleWrap">
      <a className="profilimGoogleButton" href="/auth/google">
        Google ile devam et
      </a>

      <p className="profilimAuthSplit">veya telefonuna kod gönder</p>

      {sent ? (
        <form className="profilimPhoneForm" onSubmit={(event) => void verifyCode(event)}>
          <label>
            SMS kodu
            <input
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="6 haneli kod"
              maxLength={8}
              required
            />
          </label>
          <button type="submit" className="profilimPhoneButton" disabled={pending}>
            {pending ? "Kontrol ediliyor…" : "Kodu doğrula"}
          </button>
          <button
            type="button"
            className="profilimPhoneGhost"
            onClick={() => {
              setSent(false);
              setCode("");
              setError("");
            }}
          >
            Numarayı değiştir
          </button>
        </form>
      ) : (
        <form className="profilimPhoneForm" onSubmit={(event) => void sendCode(event)}>
          <label>
            Cep telefonu
            <input
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="05xx xxx xx xx"
              required
            />
          </label>
          <button type="submit" className="profilimPhoneButton" disabled={pending}>
            {pending ? "Kod gönderiliyor…" : "Telefonuma kod gönder"}
          </button>
        </form>
      )}

      {error ? <p className="profilimGoogleError">{error}</p> : null}
    </div>
  );
}
