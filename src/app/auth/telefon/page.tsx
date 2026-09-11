"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  PHONE_COUNTRIES,
  maskTrPhone,
  otpCodeFromInput,
  phoneSendMessage,
  phoneVerifyMessage,
  splitE164,
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
  const [dial, setDial] = useState("90");
  const [local, setLocal] = useState("");
  const [masked, setMasked] = useState("");
  const [e164, setE164] = useState("");
  const [factorId, setFactorId] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<SendMode>("change");
  const [needsNumber, setNeedsNumber] = useState(true);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  async function markPhoneStep() {
    const res = await fetch("/api/auth/phone", {
      method: "POST",
      credentials: "same-origin",
    });
    return res.ok;
  }

  function rememberPhone(phone: string, nextMode: SendMode) {
    setMode(nextMode);
    setE164(phone);
    setMasked(maskTrPhone(phone));
    setNeedsNumber(false);
    setCode("");
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

    setFactorId(factor.id);
    setChallengeId(challenge.data.id);
    rememberPhone(factor.phone || phone, "mfa");
    return { error: null };
  }

  async function sendCode(
    client: NonNullable<ReturnType<typeof createSupabaseBrowserClient>>,
    phone: string,
  ) {
    const updated = await client.auth.updateUser({ phone });
    if (!updated.error) {
      rememberPhone(phone, "change");
      return { error: null };
    }

    const change = await client.auth.resend({
      type: "phone_change",
      phone,
    });
    if (!change.error) {
      rememberPhone(phone, "change");
      return { error: null };
    }

    const mfa = await sendViaMfa(client, phone);
    if (!mfa.error) return mfa;

    const sms = await client.auth.resend({ type: "sms", phone });
    if (!sms.error) {
      rememberPhone(phone, "otp");
      return { error: null };
    }

    return {
      error: updated.error.message || change.error.message || mfa.error || sms.error?.message,
    };
  }

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      window.location.replace("/profilim");
      return;
    }
    const client = supabase;
    let alive = true;

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

      if (!alive) return;
      const existing = user.phone || "";
      if (existing) {
        const parts = splitE164(existing);
        setDial(parts.dial);
        setLocal(parts.local);
        setE164(existing);
        setMasked(maskTrPhone(existing));
      }
      setNeedsNumber(true);
      setPending(false);
    }

    void boot();
    return () => {
      alive = false;
    };
  }, [next]);

  async function enroll(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    const phone = toE164(dial, local) || e164;
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
    const sent = await sendCode(supabase, phone);
    setPending(false);
    if (sent.error) setError(phoneSendMessage(sent.error));
  }

  async function verify(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    const client = supabase;
    const token = otpCodeFromInput(code);
    if (token.length < 4) {
      setError("Telefonuna gelen 6 haneli kodu yaz.");
      return;
    }

    setPending(true);
    setError("");

    const attempts: string[] = [];

    async function tryMfa() {
      if (!factorId || !challengeId) return false;
      const result = await client.auth.mfa.verify({
        factorId,
        challengeId,
        code: token,
      });
      if (!result.error) return true;
      attempts.push(result.error.message);
      return false;
    }

    async function tryOtp(type: "phone_change" | "sms") {
      if (!e164) return false;
      const result = await client.auth.verifyOtp({
        phone: e164,
        token,
        type,
      });
      if (!result.error) return true;
      attempts.push(result.error.message);
      return false;
    }

    let ok = false;
    if (mode === "mfa") {
      ok = (await tryMfa()) || (await tryOtp("phone_change")) || (await tryOtp("sms"));
    } else if (mode === "otp") {
      ok = (await tryOtp("sms")) || (await tryOtp("phone_change")) || (await tryMfa());
    } else {
      ok = (await tryOtp("phone_change")) || (await tryOtp("sms")) || (await tryMfa());
    }

    if (!ok) {
      setPending(false);
      setError(phoneVerifyMessage(attempts[0]));
      return;
    }

    await client.auth.refreshSession();
    const locked = await markPhoneStep();
    if (!locked) {
      setPending(false);
      setError("Kod doğru. Bir saniye sonra tekrar dene.");
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
    const sent = await sendCode(supabase, phone);
    setPending(false);
    if (sent.error) setError(phoneSendMessage(sent.error));
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
                  <span> kod gitti</span>
                </>
              )}
            </h1>
            <p className="profilimGateLead">
              {needsNumber
                ? "Google kabul edildi. Kodu ancak senin telefonun alsın diye numaranı yazıp gönder."
                : `SMS ${masked || "telefonuna"} ulaştı. Gelen 6 haneyi boşluksuz yaz.`}
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
                    onChange={(event) => setCode(otpCodeFromInput(event.target.value))}
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
