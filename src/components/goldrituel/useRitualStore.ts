"use client";

import { useEffect, useState } from "react";

import {
  markPracticed,
  readRitualStore,
  saveRitualNote,
  toggleSavedSlug,
  type RitualStore,
} from "../../lib/goldrituel/store";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

export function useRitualStore() {
  const [userId, setUserId] = useState<string | null>(null);
  const [store, setStore] = useState<RitualStore>({
    saved: [],
    practiced: [],
    notes: [],
  });

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setStore(readRitualStore(null));
      return;
    }

    void supabase.auth.getSession().then(({ data }) => {
      const id = data.session?.user.id ?? null;
      setUserId(id);
      setStore(readRitualStore(id));
    });
  }, []);

  function toggleSaved(slug: string) {
    setStore(toggleSavedSlug(slug, userId));
  }

  function markDone(slug: string) {
    setStore(markPracticed(slug, userId));
  }

  function saveNote(slug: string, body: string) {
    setStore(saveRitualNote(slug, body, userId));
  }

  return { store, toggleSaved, markDone, saveNote };
}
