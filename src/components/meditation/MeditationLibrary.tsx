"use client";

import { useEffect, useMemo, useState } from "react";
import {
  GOLDMIND_COLLECTIONS,
  getCollectionPractices,
  getContinueListening,
  getFeaturedPractices,
  getTodaysPicks,
  isMeditationPlayable,
  meditationFilterFromFocus,
  type MeditationFilter,
  type MeditationPractice,
} from "../../data/meditation";
import GoldMindWelcome from "./GoldMindWelcome";
import ContinueGlance from "../platform/ContinueGlance";
import GoldMindFeatured from "./GoldMindFeatured";
import MeditationFilters from "./MeditationFilters";
import GoldMindContinue from "./GoldMindContinue";
import GoldMindRail from "./GoldMindRail";
import AudioPlayer from "./AudioPlayer";
import LiveActivity from "../LiveActivity";
import { useGoldMindLiveCount } from "../../lib/goldmindPresence";
import { usePlayback } from "../platform/PlaybackProvider";

export default function MeditationLibrary({
  initialFocus,
}: {
  initialFocus?: string;
}) {
  const focusFilter = meditationFilterFromFocus(initialFocus);
  const [filter, setFilter] = useState<MeditationFilter>(
    () => focusFilter ?? "Tümü",
  );
  const activeUsers = useGoldMindLiveCount();
  const { startAudio, session, minimized } = usePlayback();

  const featured = useMemo(() => getFeaturedPractices(), []);
  const continueListening = useMemo(
    () => getContinueListening(),
    [],
  );
  const todaysPicks = useMemo(
    () => getTodaysPicks(filter),
    [filter],
  );

  useEffect(() => {
    if (!focusFilter) {
      return;
    }

    setFilter(focusFilter);

    const node =
      document.querySelector(".goldmindQuickCard.isActive") ??
      document.querySelector(".goldmindQuick");

    node?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [focusFilter]);

  function handleFilterChange(nextFilter: MeditationFilter) {
    setFilter(nextFilter);
  }

  function handlePlay(practice: MeditationPractice) {
    if (!isMeditationPlayable(practice)) {
      return;
    }

    startAudio({
      platform: "goldmind",
      contentId: practice.id,
      title: practice.title,
      href: "/goldmind",
      audioUrl: practice.audioUrl,
      description: practice.category,
    });
  }

  return (
    <div className="goldmindApp">
      <GoldMindWelcome />

      <ContinueGlance platformId="goldmind" variant="page" />

      <GoldMindFeatured
        practices={featured}
        onPlay={handlePlay}
      />

      <section className="goldmindQuick" aria-label="Hızlı erişim">
        <MeditationFilters
          value={filter}
          onChange={handleFilterChange}
        />
      </section>

      <GoldMindContinue
        practices={continueListening}
        onPlay={handlePlay}
      />

      <GoldMindRail
        title="Bugün Senin İçin"
        practices={todaysPicks}
        onPlay={handlePlay}
        emptyState="Yeni pratikler hazırlanıyor."
      />

      <LiveActivity
        activeUsers={activeUsers}
        title="Canlı GoldMind Akışı"
      />

      {GOLDMIND_COLLECTIONS.map((collection) => {
        const practices = getCollectionPractices(collection.id);

        if (practices.length === 0) {
          return null;
        }

        return (
          <GoldMindRail
            key={collection.id}
            title={collection.title}
            practices={practices}
            onPlay={handlePlay}
          />
        );
      })}

      {session?.platform === "goldmind" &&
      session.audioUrl &&
      !minimized ? (
        <AudioPlayer />
      ) : null}
    </div>
  );
}
