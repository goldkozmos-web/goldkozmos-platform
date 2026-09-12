"use client";

import { useEffect, useState } from "react";

import {
  markPracticed,
  readRitualStore,
  saveRitualNote,
  toggleSavedSlug,
  type RitualStore,
} from "../../lib/goldrituel/store";
import { ritualBySlug } from "../../data/goldrituel/catalog";
import { goldrituelPath } from "../../lib/goldrituel/urls";
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
    const next = toggleSavedSlug(slug, userId);
    setStore(next);
    const supabase = createSupabaseBrowserClient();
    const ritual = ritualBySlug(slug);
    if (!supabase || !userId || !ritual) return;
    const on = next.saved.includes(slug);
    if (on) {
      void supabase.from("favorites").upsert({
        user_id: userId,
        content_type: "ritual",
        content_id: slug,
        title: ritual.title,
        href: goldrituelPath(slug),
      });
    } else {
      void supabase
        .from("favorites")
        .delete()
        .eq("content_type", "ritual")
        .eq("content_id", slug);
    }
  }

  function markDone(slug: string) {
    setStore(markPracticed(slug, userId));
  }

  function saveNote(slug: string, body: string) {
    setStore(saveRitualNote(slug, body, userId));
  }

  return { store, toggleSaved, markDone, saveNote };
}
