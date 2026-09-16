"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { recordMemberJoin } from "../../../lib/admin/member-log";
import {
  MEMBER_INTERESTS,
  isMemberProfileComplete,
  memberProfileMetadata,
  parseMemberProfile,
  prefillFromGoogle,
} from "../../../lib/auth/membership";
import { PHONE_COUNTRIES, toE164 } from "../../../lib/auth/phone";
import { isSiteAdminEmail } from "../../../lib/admin/access";
import { safeAppPath } from "../../../lib/site";
import { createSupabaseBrowserClient } from "../../../lib/supabase/browser";

export default function AuthKayitPage() {
  const searchParams = useSearchParams();
  const next = safeAppPath(searchParams.get("next"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [dial, setDial] = useState("90");
  const [phone, setPhone] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [pending, setPending] = useState(true);
  const [arrival, setArrival] = useState<"wait" | "saved" | "miss">("wait");
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      window.location.replace("/profilim");
      return;
    }
    const client = supabase;
    let alive = true;

    async function boot() {
      for (let attempt = 0; attempt < 8; attempt += 1) {
        const { data } = await client.auth.getSession();
        const user = data.session?.user;
        if (user) {
          if (isSiteAdminEmail(user.email) || isMemberProfileComplete(user)) {
            window.location.replace(next);
            return;
          }
          if (!alive) return;
          await recordMemberJoin(user, undefined, client);
          const names = prefillFromGoogle(user);
          setFirstName((current) => current || names.firstName);
          setLastName((current) => current || names.lastName);
          const check = (await fetch("/api/auth/member", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              displayName: `${names.firstName} ${names.lastName}`.trim(),
            }),
          })
            .then((res) => res.json().catch(() => null))
            .catch(() => null)) as { ok?: boolean } | null;
          setArrival(check?.ok ? "saved" : "miss");
          setPending(false);
          return;
        }
        await new Promise((resolve) => window.setTimeout(resolve, 300));
      }
      window.location.replace("/profilim");
    }

    void boot();
    return () => {
      alive = false;
    };
  }, [next]);

  function toggleInterest(id: string) {
    setInterests((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const e164 = toE164(dial, phone);
    if (!e164) {
      setError(
        dial === "90"
          ? "Türkiye için 5 ile başlayan 10 haneli cep yaz."
          : "Cep numaranı ülke koduyla yaz.",
      );
      return;
    }
    const parsed = parseMemberProfile({
      firstName,
      lastName,
      city,
      age,
      interests,
      phone: e164,
      privacyAccepted: privacy,
    });
    if ("error" in parsed) {
      setError(parsed.error);
      return;
    }

    setPending(true);
    setError("");
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.updateUser({ data: memberProfileMetadata(parsed) });
    }
    const res = await fetch("/api/auth/kayit", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        city,
        age,
        interests,
        phone,
        dial,
        privacyAccepted: true,
      }),
    });
    const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!json?.ok) {
      setPending(false);
      setError(json?.error || "Kayıt düşmedi. Tekrar dene.");
      return;
    }
    window.location.replace(next);
  }

  return (
    <main className="homePage profilimPage" id="top">
      <section className="profilimDash">
        <div className="profilimDashInner">
          <section className="profilimGate">
            <p className="profilimGateEyebrow">GOLDKOZMOS · ÜYELİK</p>
            <h1>
              Kayıt
              <span> kartın</span>
            </h1>
            <p className="profilimGateLead">
              Google kabul edildi. Bu kart Yönetim’deki üye listesine yazılır.
              Bilgilerin gizli kalır; yalnızca senin alanın ve GoldKozmos masası
              içindir.
            </p>

            <p
              className={`profilimSavePulse${arrival === "saved" ? " isOn" : ""}${arrival === "miss" ? " isMiss" : ""}`}
            >
              {arrival === "wait"
                ? "Google girişin alınıyor…"
                : arrival === "saved"
                  ? "Girişin üye kaydına düştü. Kartı tamamla, kalıcı olsun."
                  : "Giriş görüldü. Kartı kaydet, listeye yazılsın."}
            </p>

            <form className="profilimPhoneForm profilimRegisterForm" onSubmit={(event) => void submit(event)}>
              <div className="profilimSaveCard">
                <p className="profilimSaveEyebrow">Üye kaydı</p>
                <strong>Yönetim listesine yaz</strong>
                <span>Adın, şehrin ve telefonun bu kayda işlenir.</span>
                <div className="profilimRegisterRow">
                  <label>
                    Adın
                    <input
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Soyadın
                    <input
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      required
                    />
                  </label>
                </div>

                <label>
                  Nerede yaşıyorsun
                  <input
                    autoComplete="address-level2"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Şehir / ülke"
                    required
                  />
                </label>

                <label>
                  Yaşın
                  <input
                    inputMode="numeric"
                    autoComplete="bday-year"
                    value={age}
                    onChange={(event) => setAge(event.target.value.replace(/\D/g, "").slice(0, 2))}
                    placeholder="18"
                    required
                  />
                </label>
              </div>

              <fieldset className="profilimInterestField">
                <legend>İlgi alanların</legend>
                <div className="profilimInterestGrid">
                  {MEMBER_INTERESTS.map((item) => (
                    <label key={item.id} className="profilimInterestChip">
                      <input
                        type="checkbox"
                        checked={interests.includes(item.id)}
                        onChange={() => toggleInterest(item.id)}
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </fieldset>

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
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder={dial === "90" ? "532 000 00 00" : "numaran"}
                    required
                  />
                </div>
              </label>

              <label className="profilimPrivacy">
                <input
                  type="checkbox"
                  checked={privacy}
                  onChange={(event) => setPrivacy(event.target.checked)}
                />
                <span>
                  Bilgilerimin gizli kalacağını, yalnızca GoldKozmos üyeliğim
                  için kullanılacağını kabul ediyorum.{" "}
                  <Link href="/gizlilik-politikasi" target="_blank">
                    Gizlilik politikası
                  </Link>
                  {" · "}
                  <Link href="/kvkk-aydinlatma-metni" target="_blank">
                    KVKK
                  </Link>
                </span>
              </label>

              {error ? <p className="profilimSaveError">{error}</p> : null}

              <button type="submit" className="profilimPhoneButton profilimSaveButton" disabled={pending}>
                {pending ? "Kayıt düşüyor…" : "Kaydı düş"}
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
