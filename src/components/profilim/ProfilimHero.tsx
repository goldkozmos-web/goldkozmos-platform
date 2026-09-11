"use client";

import { isSiteAdminEmail } from "../../lib/admin/access";
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
          <img className="profilimAvatar" src={user.avatarUrl} alt="" />
        ) : (
          <span className="profilimAvatar" aria-hidden="true">
            {initials(user.displayName)}
          </span>
        )}

        <div className="profilimHeroCopy">
          <p className="profilimHeroEyebrow">PROFİLİM</p>
          <h1>{user.displayName}</h1>
          {user.email ? <p className="profilimHeroEmail">{user.email}</p> : null}
        </div>

        <button
          type="button"
          className="profilimTextAction"
          onClick={() => void signOut()}
        >
          Çıkış Yap
        </button>
      </div>

      {isSiteAdminEmail(user.email) ? (
        <a className="profilimAdminJump" href="/admin">
          Yönetim Paneline Git
        </a>
      ) : null}

      <div className="profilimHeroLevel">
        <span>
          Seviye {level.level} · {level.title}
        </span>
        <strong>
          {level.xpIntoLevel} / {level.xpForNextLevel} XP
        </strong>
      </div>

      <div className="profilimLevelBar" aria-label="Gelişim seviyesi">
        <span
          className="profilimLevelBarFill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  );
}
