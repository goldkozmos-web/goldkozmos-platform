"use client";

import { createProfilimBrowserClient } from "../../lib/profilim/auth.client";
import type { ProfilimLevel, ProfilimUser } from "../../lib/profilim/types";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "G";
}

export default function ProfilimHero({
  user,
  level,
}: {
  user: NonNullable<ProfilimUser>;
  level: ProfilimLevel;
}) {
  const percent = Math.round(level.progress * 100);

  async function signOut() {
    const supabase = createProfilimBrowserClient();
    await supabase?.auth.signOut();
    window.location.replace("/profilim");
  }

  return (
    <header className="profilimHero">
      <div className="profilimHeroTop">
        {user.avatarUrl ? (
          <img
            className="profilimAvatar"
            src={user.avatarUrl}
            alt=""
          />
        ) : (
          <span className="profilimAvatar" aria-hidden="true">
            {initials(user.displayName)}
          </span>
        )}

        <div className="profilimHeroCopy">
          <p className="profilimHeroEyebrow">GOLDKOZMOS · PROFİLİM</p>
          <h1>{user.displayName}</h1>
          {user.email ? (
            <p className="profilimLevelLabel">{user.email}</p>
          ) : null}
          <p className="profilimLevelLabel">
            Seviye {level.level} · {level.title}
          </p>
        </div>

        <button
          type="button"
          className="profilimTextAction"
          onClick={() => void signOut()}
        >
          Çıkış Yap
        </button>
      </div>

      <div className="profilimLevelBar" aria-label="Gelişim seviyesi">
        <span
          className="profilimLevelBarFill"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="profilimHeroMeta">
        <strong>
          {level.xpIntoLevel} / {level.xpForNextLevel} XP
        </strong>
        <span>İçerik tamamlayınca artar</span>
      </p>
    </header>
  );
}
