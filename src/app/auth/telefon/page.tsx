"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  PHONE_COUNTRIES,
  maskTrPhone,
  phoneOtpMessage,
  toE164,
} from "../../../lib/auth/phone";
import { safeAppPath } from "../../../lib/site";
import { createSupabaseBrowserClient } from "../../../lib/supabase/browser";

type PhoneFactor = {
  id: string;
  status?: string;
  phone?: string;
};

type SendMode = "mfa" | "change" | "otp";

export default function AuthTelefonPage() {
  const searchParams = useSearchParams();
  const next = safeAppPath(searchParams.get("next"));
  const ran = useRef(false);
  const [dial, setDial] = useState("90");
  const [local, setLocal] = useState("");
  const [masked, setMasked] = useState("");
  const [e164, setE164] = useState("");
  const [factorId, setFactorId] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<SendMode>("change");
  const [needsNumber, setNeedsNumber] = useState(false);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  async function markPhoneStep() {
    const res = await fetch("/api/auth/phone", {
      method: "POST",
      credentials: "same-origin",
    });
    return res.ok;
  }

  async function sendViaMfa(
    client: NonNullable<ReturnType<typeof createSupabaseBrowserClient>>,
    phone: string,
  ) {
    const { data: factors } = await client.auth.mfa.listFactors();
    const phones = (factors?.phone ?? []) as PhoneFactor[];
    let factor =
      phones.find((item) => item.status === "verified") ??
      phones.find((item) => item.status === "unverified");

    if (!factor) {
      const enrolled = await client.auth.mfa.enroll({
        factorType: "phone",
        phone,
        friendlyName: "Cep telefonu",
      });
      if (enrolled.error || !enrolled.data?.id) {
        return { error: enrolled.error?.message ?? "mfa" };
      }
      factor = { id: enrolled.data.id, phone };
    }

    const challenge = await client.auth.mfa.challenge({
      factorId: factor.id,
      channel: "sms",
    });
    if (challenge.error || !challenge.data?.id) {
      return { error: challenge.error?.message ?? "challenge" };
    }

    setMode("mfa");
    setFactorId(factor.id);
    setChallengeId(challenge.data.id);
    setMasked(maskTrPhone(factor.phone || phone));
    setE164(phone);
    setNeedsNumber(false);
    return { error: null };
  }

  async function sendViaUserPhone(
    client: NonNullable<ReturnType<typeof createSupabaseBrowserClient>>,
    phone: string,
  ) {
    const { error: updateError } = await client.auth.updateUser({ phone });
    if (!updateError) {
      setMode("change");
      setE164(phone);
      setMasked(maskTrPhone(phone));
      setNeedsNumber(false);
      return { error: null };
    }

    const otp = await client.auth.signInWithOtp({
      phone,
      options: { shouldCreateUser: false, channel: "sms" },
    });
    if (otp.error) {
      return { error: otp.error.message };
    }
    setMode("otp");
    setE164(phone);
    setMasked(maskTrPhone(phone));
    setNeedsNumber(false);
    return { error: null };
  }

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
      const user = sessionPack.session?.user;
      if (!user) {
        window.location.replace("/profilim");
        return;
      }

      const passed = await fetch("/api/auth/phone", { credentials: "same-origin" });
      const status = (await passed.json().catch(() => null)) as { ok?: boolean } | null;
      if (status?.ok) {
        window.location.replace(next);
        return;
      }

      const existing = user.phone || "";
      if (existing) {
        const mfa = await sendViaMfa(client, existing);
        if (!mfa.error) {
          setPending(false);
          return;
        }
        const fallback = await sendViaUserPhone(client, existing);
        setPending(false);
        if (fallback.error) {
          setNeedsNumber(true);
          setError(phoneOtpMessage(fallback.error));
        }
        return;
      }

      setNeedsNumber(true);
      setPending(false);
    }

    void boot();
  }, [next]);

  async function enroll(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    const phone = toE164(dial, local);
    if (!phone) {
      setError(
        dial === "90"
          ? "Türkiye için 5 ile başlayan 10 haneli cep yaz. Örnek: 532 000 00 00"
          : "Ülke kodunu seçip numarayı yaz.",
      );
      return;
    }
    if (!supabase) return;

    setPending(true);
    setError("");
    const mfa = await sendViaMfa(supabase, phone);
    if (!mfa.error) {
      setPending(false);
      return;
    }
    const fallback = await sendViaUserPhone(supabase, phone);
    setPending(false);
    if (fallback.error) {
      setError(phoneOtpMessage(fallback.error));
    }
  }

  async function verify(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    const token = code.trim();
    if (token.length < 4) {
      setError("Telefonuna gelen kodu yaz.");
      return;
    }

    setPending(true);
    setError("");

    let verifyError = "";
    if (mode === "mfa") {
      const result = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: token,
      });
      verifyError = result.error?.message ?? "";
    } else {
      const result = await supabase.auth.verifyOtp({
        phone: e164,
        token,
        type: mode === "change" ? "phone_change" : "sms",
      });
      verifyError = result.error?.message ?? "";
    }

    if (verifyError) {
      setPending(false);
      setError(phoneOtpMessage(verifyError));
      return;
    }

    await supabase.auth.refreshSession();
    const locked = await markPhoneStep();
    if (!locked) {
      setPending(false);
      setError("Kod alındı ama kilit tamamlanamadı. Yeni kod iste.");
      return;
    }
    window.location.replace(next);
  }

  async function resend() {
    const supabase = createSupabaseBrowserClient();
    const phone = e164 || toE164(dial, local);
    if (!supabase || !phone) return;
    setPending(true);
    setError("");
    const mfa = await sendViaMfa(supabase, phone);
    if (!mfa.error) {
      setPending(false);
      setCode("");
      return;
    }
    const fallback = await sendViaUserPhone(supabase, phone);
    setPending(false);
    setCode("");
    if (fallback.error) setError(phoneOtpMessage(fallback.error));
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
                  <span> doğrula</span>
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
                  <div className="profilimPhoneRow">
                    <select
                      aria-label="Ülke kodu"
                      value={dial}
                      onChange={(event) => setDial(event.target.value)}
                    >
                      {PHONE_COUNTRIES.map((country) => (
                        <option key={`${country.flag}-${country.dial}`} value={country.dial}>
                          {country.flag} +{country.dial} {country.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      autoComplete="tel-national"
                      value={local}
                      onChange={(event) => setLocal(event.target.value)}
                      placeholder={dial === "90" ? "532 000 00 00" : "numaran"}
                      required
                    />
                  </div>
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
