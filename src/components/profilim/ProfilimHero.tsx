"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

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
  user: ProfilimUser;
  level: ProfilimLevel;
}) {
  const router = useRouter();
  const percent = Math.round(level.progress * 100);

  async function signOut() {
    const supabase = createProfilimBrowserClient();
    await supabase?.auth.signOut();
    router.refresh();
  }

  return (
    <header className="profilimHero">
      <div className="profilimHeroTop">
        {user?.avatarUrl ? (
          <img
            className="profilimAvatar"
            src={user.avatarUrl}
            alt=""
          />
        ) : (
          <span className="profilimAvatar" aria-hidden="true">
            {user ? initials(user.displayName) : "G"}
          </span>
        )}

        <div className="profilimHeroCopy">
          <p className="profilimHeroEyebrow">GOLDKOZMOS · PROFİLİM</p>
          <h1>{user ? user.displayName : "Profilim"}</h1>
          <p className="profilimLevelLabel">
            Seviye {level.level} · {level.title}
          </p>
        </div>

        {user ? (
          <button
            type="button"
            className="profilimTextAction"
            onClick={() => void signOut()}
          >
            Çıkış
          </button>
        ) : (
          <Link className="profilimTextAction" href="/giris?next=/profilim">
            Giriş
          </Link>
        )}
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
