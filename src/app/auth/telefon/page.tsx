"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  maskTrPhone,
  normalizeTrPhone,
  phoneOtpMessage,
  sessionNeedsPhoneStep,
} from "../../../lib/auth/phone";
import { safeAppPath } from "../../../lib/site";
import { createSupabaseBrowserClient } from "../../../lib/supabase/browser";

type PhoneFactor = {
  id: string;
  status?: string;
  phone?: string;
  factor_type?: string;
};

export default function AuthTelefonPage() {
  const searchParams = useSearchParams();
  const next = safeAppPath(searchParams.get("next"));
  const ran = useRef(false);
  const [phone, setPhone] = useState("");
  const [masked, setMasked] = useState("");
  const [factorId, setFactorId] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [code, setCode] = useState("");
  const [needsNumber, setNeedsNumber] = useState(false);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      window.location.replace("/profilim");
      return;
    }
    const client = supabase;

    async function boot() {
      const { data: sessionPack } = await client.auth.getSession();
      if (!sessionPack.session) {
        window.location.replace("/profilim");
        return;
      }

      const { data: aal } = await client.auth.mfa.getAuthenticatorAssuranceLevel();
      if (!sessionNeedsPhoneStep(aal?.currentLevel)) {
        window.location.replace(next);
        return;
      }

      const { data: factors } = await client.auth.mfa.listFactors();
      const phones = (factors?.phone ?? []) as PhoneFactor[];
      const ready =
        phones.find((factor) => factor.status === "verified") ??
        phones.find((factor) => factor.status === "unverified");

      if (!ready) {
        setNeedsNumber(true);
        setPending(false);
        return;
      }

      setFactorId(ready.id);
      setMasked(maskTrPhone(ready.phone ?? ""));
      const { data, error: challengeError } = await client.auth.mfa.challenge({
        factorId: ready.id,
        channel: "sms",
      });
      setPending(false);
      if (challengeError || !data?.id) {
        setError(phoneOtpMessage(challengeError?.message));
        return;
      }
      setChallengeId(data.id);
    }

    void boot();
  }, [next]);

  async function enroll(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    const normalized = normalizeTrPhone(phone);
    if (!supabase || !normalized) {
      setError("05xx ile başlayan cep numaranı yaz.");
      return;
    }

    setPending(true);
    setError("");
    const { data, error: enrollError } = await supabase.auth.mfa.enroll({
      factorType: "phone",
      phone: normalized,
      friendlyName: "Cep telefonu",
    });

    if (enrollError || !data?.id) {
      setPending(false);
      setError(phoneOtpMessage(enrollError?.message));
      return;
    }

    setFactorId(data.id);
    setMasked(maskTrPhone(normalized));
    setNeedsNumber(false);
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId: data.id,
      channel: "sms",
    });
    setPending(false);
    if (challengeError || !challenge?.id) {
      setError(phoneOtpMessage(challengeError?.message));
      return;
    }
    setChallengeId(challenge.id);
  }

  async function verify(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase || !factorId || !challengeId) {
      setError("Önce telefonuna kod göndert.");
      return;
    }

    setPending(true);
    setError("");
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId,
      code: code.trim(),
    });
    setPending(false);

    if (verifyError) {
      setError(phoneOtpMessage(verifyError.message));
      return;
    }

    window.location.replace(next);
  }

  async function resend() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase || !factorId) return;
    setPending(true);
    setError("");
    const { data, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId,
      channel: "sms",
    });
    setPending(false);
    if (challengeError || !data?.id) {
      setError(phoneOtpMessage(challengeError?.message));
      return;
    }
    setChallengeId(data.id);
    setCode("");
  }

  return (
    <main className="homePage profilimPage" id="top">
      <section className="profilimDash">
        <div className="profilimDashInner">
          <section className="profilimGate">
            <p className="profilimGateEyebrow">GOLDKOZMOS · GÜVENLİK</p>
            <h1>
              {needsNumber ? (
                <>
                  Cep telefonunu
                  <span> kaydet</span>
                </>
              ) : (
                <>
                  Telefonuna
                  <span> kod gönderildi</span>
                </>
              )}
            </h1>
            <p className="profilimGateLead">
              Google kabul edildi. Girişi senin adına başkası tamamlayamasın
              diye her seferinde {masked || "telefonuna"} kod gelir.
            </p>

            {needsNumber ? (
              <form className="profilimPhoneForm" onSubmit={(event) => void enroll(event)}>
                <label>
                  Cep telefonun
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
                  {pending ? "Kod gönderiliyor…" : "Bu telefona kod gönder"}
                </button>
              </form>
            ) : (
              <form className="profilimPhoneForm" onSubmit={(event) => void verify(event)}>
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
                  onClick={() => void resend()}
                  disabled={pending}
                >
                  Yeni kod gönder
                </button>
              </form>
            )}

            {error ? <p className="profilimGoogleError">{error}</p> : null}
          </section>
        </div>
      </section>
    </main>
  );
}
