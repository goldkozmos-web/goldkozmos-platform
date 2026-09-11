"use client";

import { useEffect } from "react";

import {
  memberIdsFromSettings,
  SETTINGS_INTERESTS,
  settingsFromMemberInterests,
  type SettingsInterestId,
} from "../../lib/profilim/settings";
import { createProfilimBrowserClient } from "../../lib/profilim/auth.client";
import type { ProfilimUser } from "../../lib/profilim/types";
import AyarlarFrame from "./AyarlarFrame";
import { useAyarlarPrefs } from "./useAyarlarPrefs";

function InterestsBody({ user }: { user: NonNullable<ProfilimUser> }) {
  const { prefs, setPrefs, save } = useAyarlarPrefs(user.id);

  useEffect(() => {
    const supabase = createProfilimBrowserClient();
    void supabase
      ?.from("site_members")
      .select("interests")
      .eq("auth_user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        const fromMember = settingsFromMemberInterests(
          typeof data?.interests === "string" ? data.interests : "",
        );
        if (!fromMember.length) return;
        setPrefs((prev) =>
          prev.interests.length === 0
            ? { ...prev, interests: fromMember }
            : prev,
        );
      });
  }, [setPrefs, user.id]);

  async function toggle(id: SettingsInterestId) {
    const interests = prefs.interests.includes(id)
      ? prefs.interests.filter((item) => item !== id)
      : [...prefs.interests, id];
    const next = { ...prefs, interests };
    const supabase = await save(next);
    await supabase
      ?.from("site_members")
      .update({ interests: memberIdsFromSettings(interests).join(",") })
      .eq("auth_user_id", user.id);
  }

  return (
    <div className="ayarlarCard">
      {SETTINGS_INTERESTS.map((item) => {
        const on = prefs.interests.includes(item.id);
        return (
          <button
            key={item.id}
            type="button"
            className={`ayarlarChoice${on ? " isOn" : ""}`}
            onClick={() => void toggle(item.id)}
          >
            <span>{item.label}</span>
            <i aria-hidden="true">{on ? "✓" : ""}</i>
          </button>
        );
      })}
    </div>
  );
}

export default function AyarlarIcerik() {
  return (
    <AyarlarFrame title="İçerik Tercihlerim" backHref="/ayarlar">
      {(user) => <InterestsBody user={user} />}
    </AyarlarFrame>
  );
}
