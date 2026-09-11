"use client";

import { useEffect, useState } from "react";

import {
  DEFAULT_AYARLAR,
  parseAyarlarPrefs,
  settingsStorageKey,
  type AyarlarPrefs,
} from "../../lib/profilim/settings";
import { createProfilimBrowserClient } from "../../lib/profilim/auth.client";

export function useAyarlarPrefs(userId: string) {
  const [prefs, setPrefs] = useState<AyarlarPrefs>(DEFAULT_AYARLAR);

  useEffect(() => {
    let local: AyarlarPrefs | null = null;
    try {
      const raw = window.localStorage.getItem(settingsStorageKey(userId));
      if (raw) local = parseAyarlarPrefs(JSON.parse(raw));
    } catch {
      local = null;
    }
    if (local) setPrefs(local);

    const supabase = createProfilimBrowserClient();
    void supabase?.auth.getUser().then(({ data }) => {
      const meta = data.user?.user_metadata?.gk_ayarlar;
      if (!local && meta) {
        setPrefs(parseAyarlarPrefs(meta));
      }
    });
  }, [userId]);

  async function save(next: AyarlarPrefs) {
    setPrefs(next);
    try {
      window.localStorage.setItem(
        settingsStorageKey(userId),
        JSON.stringify(next),
      );
    } catch {
      // Private mode.
    }
    const supabase = createProfilimBrowserClient();
    await supabase?.auth.updateUser({ data: { gk_ayarlar: next } });
    return supabase;
  }

  return { prefs, setPrefs, save };
}
