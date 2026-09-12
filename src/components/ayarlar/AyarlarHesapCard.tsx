"use client";

import { useEffect, useState } from "react";

import { createProfilimBrowserClient } from "../../lib/profilim/auth.client";
import type { ProfilimUser } from "../../lib/profilim/types";
import AyarlarFrame from "./AyarlarFrame";

function splitName(raw: string) {
  const displayName = raw.replace(/\s+/g, " ").trim();
  if (displayName.length < 2 || displayName.length > 80) {
    return { ok: false as const, error: "Ad soyadını yaz." };
  }
  const parts = displayName.split(" ");
  const firstName = parts[0] ?? displayName;
  return {
    ok: true as const,
    displayName,
    firstName,
    lastName: parts.slice(1).join(" ") || firstName,
  };
}

function AccountBody({ user }: { user: NonNullable<ProfilimUser> }) {
  const [google, setGoogle] = useState(false);
  const [name, setName] = useState(user.displayName);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("Google e-postası değiştirilemez.");

  useEffect(() => {
    setName(user.displayName);
  }, [user.displayName]);

  useEffect(() => {
    const supabase = createProfilimBrowserClient();
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => {
      const identities = data.user?.identities ?? [];
      const provider = data.user?.app_metadata?.provider;
      setGoogle(
        provider === "google" ||
          identities.some((item) => item.provider === "google"),
      );
    });
  }, []);

  const initial = name.trim().charAt(0).toUpperCase() || "G";

  async function save() {
    const parsed = splitName(name);
    if (!parsed.ok) {
      setNote(parsed.error);
      return;
    }
    setBusy(true);
    setNote("Kaydediliyor…");
    const supabase = createProfilimBrowserClient();
    if (!supabase) {
      setBusy(false);
      setNote("Kaydedilemedi. Tekrar dene.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: parsed.firstName,
        last_name: parsed.lastName,
        full_name: parsed.displayName,
        display_name: parsed.displayName,
        name: parsed.displayName,
      },
    });

    if (error) {
      setBusy(false);
      setNote("Kaydedilemedi. Tekrar dene.");
      return;
    }

    await supabase
      .from("profiles")
      .update({ display_name: parsed.displayName })
      .eq("id", user.id);
    await supabase
      .from("site_members")
      .update({
        display_name: parsed.displayName,
        first_name: parsed.firstName,
        last_name: parsed.lastName,
      })
      .eq("auth_user_id", user.id);

    setName(parsed.displayName);
    setBusy(false);
    setNote("Adın kaydedildi. E-posta Google’dan gelir, değişmez.");
  }

  return (
    <div
      className="adminPanel ayarlarCard ayarlarAccount"
      style={{
        background: "#ffffff",
        border: 0,
        borderRadius: 22,
        boxShadow: "0 10px 28px rgba(48, 32, 18, 0.08)",
      }}
    >
      {user.avatarUrl ? (
        <img className="ayarlarPhoto" src={user.avatarUrl} alt="" />
      ) : (
        <span className="ayarlarPhoto">{initial}</span>
      )}
      <dl>
        <div>
          <dt>Ad soyad</dt>
          <dd>
            <input
              className="ayarlarNameInput"
              type="text"
              name="displayName"
              value={name}
              maxLength={80}
              autoComplete="name"
              placeholder="Ad soyadın"
              aria-label="Ad soyad"
              style={{
                width: "100%",
                minHeight: 46,
                padding: "0 14px",
                border: 0,
                borderRadius: 16,
                background: "#f4f0e4",
                color: "#1c1410",
                fontSize: 16,
                fontWeight: 600,
              }}
              onChange={(event) => setName(event.target.value)}
            />
          </dd>
        </div>
        <div>
          <dt>E-posta</dt>
          <dd>{user.email || "—"}</dd>
        </div>
        <div>
          <dt>Bağlı hesap</dt>
          <dd>{google ? "Google" : "Google ile giriş"}</dd>
        </div>
      </dl>
      <button
        type="button"
        className="ayarlarSave"
        disabled={busy}
        style={{
          width: "calc(100% - 8px)",
          minHeight: 44,
          border: 0,
          borderRadius: 999,
          background: "#1c1410",
          color: "#e3bc70",
          fontSize: 14,
          fontWeight: 700,
        }}
        onClick={() => void save()}
      >
        {busy ? "Kaydediliyor…" : "Kaydet"}
      </button>
      <p className="ayarlarNote">{note}</p>
    </div>
  );
}

export default function AyarlarHesapCard() {
  return (
    <AyarlarFrame title="Hesap Bilgileri" backHref="/ayarlar">
      {(user) => <AccountBody user={user} />}
    </AyarlarFrame>
  );
}
