"use client";

import NotificationBell from "../daily/NotificationBell";
import { isSiteAdminEmail } from "../../lib/admin/access";
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

        <div className="profilimHeroActions">
          <NotificationBell />
          <a className="profilimSettingsGear" href="/ayarlar" aria-label="Ayarlar">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.1 7.1 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.77 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.89 14.52a.5.5 0 0 0-.12.64l1.92 3.32c.13.23.4.32.6.22l2.39-.96c.5.39 1.04.7 1.63.94l.36 2.54c.05.24.26.42.5.42h3.84c.24 0 .45-.18.5-.42l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96c.23.1.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2Z"
            />
          </svg>
          </a>
        </div>
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
