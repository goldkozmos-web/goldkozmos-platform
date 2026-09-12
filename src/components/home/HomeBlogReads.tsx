"use client";

import { useEffect, useState } from "react";

import { goldBlogArticles } from "../../data/goldblogArticles";
import {
  parseAyarlarPrefs,
  settingsStorageKey,
  type SettingsInterestId,
} from "../../lib/profilim/settings";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

const INTEREST_TO_CATEGORY: Record<SettingsInterestId, string[]> = {
  kendilik: ["kendilik-rezonansi", "spirituel-stoa", "goldkozmos-gunlugu"],
  iliskiler: ["iliski-rezonansi"],
  bolluk: ["bolluk-rezonansi"],
  meditasyon: ["spirituel-stoa", "kendilik-rezonansi"],
};

export default function HomeBlogReads() {
  const [interests, setInterests] = useState<SettingsInterestId[]>([]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    void supabase?.auth.getSession().then(({ data }) => {
      const id = data.session?.user.id;
      if (!id) return;
      try {
        const raw = window.localStorage.getItem(settingsStorageKey(id));
        if (raw) setInterests(parseAyarlarPrefs(JSON.parse(raw)).interests);
      } catch {
        // keep default newest
      }
    });
  }, []);

  const preferred = interests.flatMap((id) => INTEREST_TO_CATEGORY[id] ?? []);
  const ranked = [...goldBlogArticles].sort((a, b) => {
    const aHit = preferred.includes(a.categoryKey) ? 1 : 0;
    const bHit = preferred.includes(b.categoryKey) ? 1 : 0;
    if (aHit !== bHit) return bHit - aHit;
    if (a.isNew !== b.isNew) return Number(b.isNew) - Number(a.isNew);
    return Number(b.number) - Number(a.number);
  });

  return (
    <section className="homeSoftCard" aria-label="Bugün okuman için">
      <p className="dailyEyebrow">BUGÜN OKUMAN İÇİN</p>
      <h2>Senin için okumalar</h2>
      <div className="gkReadGrid" style={{ marginTop: 14 }}>
        {ranked.slice(0, 3).map((article) => (
          <a key={article.slug} className="gkReadCard" href={`/goldblog#${article.slug}`}>
            <strong>{article.title}</strong>
            <span>{article.description}</span>
            <small>{article.readingTime} · Oku</small>
          </a>
        ))}
      </div>
    </section>
  );
}
