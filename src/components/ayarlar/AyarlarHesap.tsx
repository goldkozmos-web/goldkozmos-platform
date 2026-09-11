"use client";

import { useEffect, useState } from "react";

import { createProfilimBrowserClient } from "../../lib/profilim/auth.client";
import type { ProfilimUser } from "../../lib/profilim/types";
import AyarlarFrame from "./AyarlarFrame";

function AccountBody({ user }: { user: NonNullable<ProfilimUser> }) {
  const [google, setGoogle] = useState(false);

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

  const initial = user.displayName.trim().charAt(0).toUpperCase() || "G";

  return (
    <div className="ayarlarCard ayarlarAccount">
      {user.avatarUrl ? (
        <img className="ayarlarPhoto" src={user.avatarUrl} alt="" />
      ) : (
        <span className="ayarlarPhoto">{initial}</span>
      )}
      <dl>
        <div>
          <dt>Ad soyad</dt>
          <dd>{user.displayName}</dd>
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
      <p className="ayarlarNote">Google e-postası değiştirilemez.</p>
    </div>
  );
}

export default function AyarlarHesap() {
  return (
    <AyarlarFrame title="Hesap Bilgileri" backHref="/ayarlar">
      {(user) => <AccountBody user={user} />}
    </AyarlarFrame>
  );
}
