"use client";

import { useEffect, useMemo, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import ProfilimEmptyState from "./ProfilimEmptyState";
import ProfilimFeaturedCard from "./ProfilimFeaturedCard";
import "../../styles/daily-practice.css";

const XP: Record<string, number> = {
  daily_action: 15,
  emotion_journal: 10,
  goldmind_complete: 20,
  goldbook_chapter: 15,
  growth_series: 15,
  reminder_complete: 8,
  journey_day: 12,
  archetype: 20,
  favorite_add: 2,
};

type Range = "7" | "30" | "all";

const BADGE_SEALS = [
  { id: "ilk-adim", title: "İlk Adım" },
  { id: "3-gun-aktif", title: "3 Gün Aktif" },
  { id: "7-gunluk-seri", title: "7 Günlük Seri" },
  { id: "ilk-duygu", title: "İlk Duygu" },
  { id: "ilk-eylem", title: "İlk Eylem" },
  { id: "ilk-goldmind", title: "GoldMind" },
  { id: "10-icerik", title: "10 İçerik" },
  { id: "21-yolculuk", title: "21 Gün" },
];

export function ProfilimBadgeRow({ onOpen }: { onOpen: () => void }) {
  const [earned, setEarned] = useState<Set<string>>(new Set());
  const [total, setTotal] = useState(BADGE_SEALS.length);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    void Promise.all([
      supabase.from("badges").select("id"),
      supabase.from("user_badges").select("badge_id"),
    ]).then(([all, have]) => {
      setEarned(new Set((have.data ?? []).map((row) => String(row.badge_id))));
      if (all.data?.length) setTotal(all.data.length);
    });
  }, []);

  return (
    <ProfilimFeaturedCard
      className="profilimBadgeCard"
      eyebrow="ROZET"
      title="Rozetlerim"
      onOpen={onOpen}
    >
      <span className="profilimBadgeMedals" aria-hidden="true">
        {BADGE_SEALS.slice(0, 6).map((badge) => (
          <span
            key={badge.id}
            className={`profilimMedal${earned.has(badge.id) ? " isEarned" : ""}`}
          >
            ★
          </span>
        ))}
      </span>
      {earned.size === 0
        ? "Henüz rozet yok. Adımların burada birikir."
        : `${earned.size} / ${total} rozet kazandın.`}
    </ProfilimFeaturedCard>
  );
}

export function ProfilimBadgesPanel() {
  const [items, setItems] = useState<{ id: string; title: string; description: string; earned: boolean }[]>([]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    void Promise.all([
      supabase.from("badges").select("id, title, description"),
      supabase.from("user_badges").select("badge_id"),
    ]).then(([all, earned]) => {
      const have = new Set((earned.data ?? []).map((row) => String(row.badge_id)));
      setItems(
        (all.data ?? []).map((row) => ({
          id: String(row.id),
          title: String(row.title),
          description: String(row.description ?? ""),
          earned: have.has(String(row.id)),
        })),
      );
    });
  }, []);

  if (items.length === 0) {
    return <ProfilimEmptyState text="Rozetler burada birikir. İlk adımınla açılırlar." />;
  }

  return (
    <ul className="profilimBadgeList">
      {items.map((item) => (
        <li
          key={item.id}
          className={`profilimBadgeItem${item.earned ? " isEarned" : ""}`}
        >
          <span className="profilimMedal" aria-hidden="true">
            ★
          </span>
          <span>
            <span>{item.earned ? "Kazanıldı" : "Kilitli"}</span>
            <strong>{item.title}</strong>
            <small>{item.description}</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ProfilimStatsPanel() {
  const [range, setRange] = useState<Range>("30");
  const [rows, setRows] = useState<{ kind: string; created_at: string }[]>([]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    void supabase
      .from("user_activity")
      .select("kind, created_at")
      .order("created_at", { ascending: false })
      .limit(400)
      .then(({ data }) => setRows((data ?? []) as { kind: string; created_at: string }[]));
  }, []);

  const stats = useMemo(() => {
    const from =
      range === "all"
        ? 0
        : Date.now() - Number(range) * 24 * 60 * 60 * 1000;
    const sliced = rows.filter((row) => Date.parse(row.created_at) >= from);
    const days = new Set(
      sliced.map((row) => new Date(row.created_at).toLocaleDateString("tr-TR")),
    );
    return {
      active: days.size,
      actions: sliced.filter((row) => row.kind === "daily_action").length,
      journal: sliced.filter((row) => row.kind === "emotion_journal").length,
      journey: sliced.filter((row) => row.kind === "journey_day").length,
      mind: sliced.filter((row) => row.kind === "goldmind_complete").length,
      content: sliced.filter((row) =>
        ["goldbook_chapter", "goldmind_complete", "journey_day"].includes(row.kind),
      ).length,
      xp: sliced.reduce((sum, row) => sum + (XP[row.kind] ?? 10), 0),
    };
  }, [rows, range]);

  return (
    <div className="profilimDrawerStack">
      <div className="dailyMessageActions">
        {(["7", "30", "all"] as Range[]).map((item) => (
          <button key={item} type="button" onClick={() => setRange(item)}>
            {item === "all" ? "Toplam" : `${item} gün`}
          </button>
        ))}
      </div>
      <p>Aktif gün: {stats.active}</p>
      <p>GoldAct: {stats.actions}</p>
      <p>Günlük: {stats.journal}</p>
      <p>Yolculuk günü: {stats.journey}</p>
      <p>GoldMind: {stats.mind}</p>
      <p>İçerik: {stats.content}</p>
      <p>XP (bu aralık): {stats.xp}</p>
    </div>
  );
}

export function LiveFavoritesPanel() {
  const [items, setItems] = useState<{ id: string; title: string; href: string; content_type: string }[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    void supabase
      .from("favorites")
      .select("id, title, href, content_type")
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems((data ?? []) as typeof items));
  }, []);

  const types = ["all", ...new Set(items.map((item) => item.content_type))];
  const visible = items.filter((item) => filter === "all" || item.content_type === filter);

  if (items.length === 0) {
    return <ProfilimEmptyState text="Henüz favorin yok. Ritüel, tarot kartı veya blog yazısını kaydedince burada toplanır." />;
  }

  return (
    <div className="profilimDrawerStack">
      <div className="dailyMessageActions">
        {types.map((type) => (
          <button key={type} type="button" onClick={() => setFilter(type)}>
            {type === "all" ? "Tümü" : type}
          </button>
        ))}
      </div>
      <ul className="profilimDrawerList">
        {visible.map((item) => (
          <li key={item.id}>
            <a href={item.href}>
              <span>{item.content_type}</span>
              <strong>{item.title}</strong>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
