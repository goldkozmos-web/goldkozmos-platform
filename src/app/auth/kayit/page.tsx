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
      const { data } = await client.auth.getSession();
      const user = data.session?.user;
      if (!user) {
        window.location.replace("/profilim");
        return;
      }
      if (isSiteAdminEmail(user.email) || isMemberProfileComplete(user)) {
        window.location.replace(next);
        return;
      }
      if (!alive) return;
      void recordMemberJoin(user, undefined, client);
      const names = prefillFromGoogle(user);
      setFirstName((current) => current || names.firstName);
      setLastName((current) => current || names.lastName);
      setPending(false);
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
      const { data: sessionPack } = await supabase.auth.getUser();
      const userId = sessionPack.user?.id;
      if (userId) {
        await supabase
          .from("profiles")
          .update({ display_name: `${parsed.firstName} ${parsed.lastName}`.trim() })
          .eq("id", userId);
      }
      await supabase.rpc("ensure_own_membership");
      const email = sessionPack.user?.email?.trim().toLowerCase();
      if (email && userId) {
        await supabase.from("site_members").upsert(
          {
            email,
            display_name: `${parsed.firstName} ${parsed.lastName}`.trim(),
            auth_user_id: userId,
            source: "google",
            status: "active",
          },
          { onConflict: "email" },
        );
      }
      await supabase.rpc("save_own_membership_profile", {
        p_first_name: parsed.firstName,
        p_last_name: parsed.lastName,
        p_city: parsed.city,
        p_age: parsed.age,
        p_interests: parsed.interests.join(","),
        p_phone: parsed.phone,
      });
      await recordMemberJoin(
        sessionPack.user ?? null,
        {
          displayName: `${parsed.firstName} ${parsed.lastName}`.trim(),
          city: parsed.city,
          phone: parsed.phone,
        },
        supabase,
      );
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
      setError(json?.error || "Kayıt tamamlanamadı. Tekrar dene.");
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
              <span> bilgilerin</span>
            </h1>
            <p className="profilimGateLead">
              Google kabul edildi. Üyeliğin sisteme düşsün diye bu kartı bir kez
              doldur. Bilgilerin gizli kalır; yalnızca senin alanın ve yönetim
              içindir, paylaşılmaz.
            </p>

            <form className="profilimPhoneForm profilimRegisterForm" onSubmit={(event) => void submit(event)}>
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

              <button type="submit" className="profilimPhoneButton" disabled={pending}>
                {pending ? "Kaydediliyor…" : "Üyeliği tamamla"}
              </button>
            </form>

            {error ? <p className="profilimGoogleError">{error}</p> : null}
          </section>
        </div>
      </section>
    </main>
  );
}
