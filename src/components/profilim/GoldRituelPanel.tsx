"use client";

import { useEffect, useMemo, useState } from "react";

import { publishedRituals, ritualBySlug } from "../../data/goldrituel/catalog";
import { goldrituelPath } from "../../lib/goldrituel/urls";
import { readRitualStore, type RitualStore } from "../../lib/goldrituel/store";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import ProfilimEmptyState from "./ProfilimEmptyState";

export type GoldRituelTab = "saved" | "done" | "notes";

export default function GoldRituelPanel({ tab }: { tab: GoldRituelTab }) {
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
      setStore(readRitualStore(data.session?.user.id ?? null));
    });
  }, []);

  const catalog = useMemo(() => publishedRituals(), []);

  if (tab === "saved") {
    const items = store.saved
      .map((slug) => ritualBySlug(slug) ?? catalog.find((item) => item.slug === slug))
      .filter(Boolean);

    if (items.length === 0) {
      return (
        <ProfilimEmptyState text="Henüz kaydettiğin bir ritüel yok. GoldRitüel’den Kaydet ile ekleyebilirsin." />
      );
    }

    return (
      <ul className="profilimDrawerList">
        {items.map((ritual) =>
          ritual ? (
            <li key={ritual.slug}>
              <a href={goldrituelPath(ritual.slug)}>
                <strong>{ritual.title}</strong>
                <span>{ritual.duration}</span>
              </a>
            </li>
          ) : null,
        )}
      </ul>
    );
  }

  if (tab === "done") {
    if (store.practiced.length === 0) {
      return (
        <ProfilimEmptyState text="Uyguladığın ritüel henüz yok. Detay sayfasından Uyguladım diyebilirsin." />
      );
    }

    return (
      <ul className="profilimDrawerList">
        {store.practiced.map((entry) => {
          const ritual = ritualBySlug(entry.slug);
          return (
            <li key={`${entry.slug}-${entry.at}`}>
              <a href={goldrituelPath(entry.slug)}>
                <strong>{ritual?.title ?? entry.slug}</strong>
                <span>
                  {new Date(entry.at).toLocaleDateString("tr-TR")} · {ritual?.duration}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  if (store.notes.length === 0) {
    return (
      <ProfilimEmptyState text="Ritüel notun yok. Detay sayfasındaki Not ekle alanı buraya düşer." />
    );
  }

  return (
    <ul className="profilimDrawerList">
      {store.notes.map((note) => {
        const ritual = ritualBySlug(note.slug);
        return (
          <li key={note.slug}>
            <a href={goldrituelPath(note.slug)}>
              <strong>{ritual?.title ?? note.slug}</strong>
              <span>{note.body}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
