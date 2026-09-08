"use client";

import { useGoldMindPresence } from "../../lib/goldmindPresence";
import { usePlayback } from "../platform/PlaybackProvider";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export default function AudioPlayer() {
  const {
    session,
    isPlaying,
    currentTime,
    duration,
    toggle,
    seek,
    minimize,
  } = usePlayback();

  useGoldMindPresence({
    active: isPlaying && session?.platform === "goldmind",
    practiceId: session?.contentId,
  });

  if (!session || session.platform !== "goldmind" || !session.audioUrl) {
    return null;
  }

  const progressMax = duration > 0 ? duration : 0;
  const progressValue = Math.min(currentTime, progressMax);

  return (
    <div className="meditationPlayer" role="region" aria-label="Ses oynatıcı">
      <div className="meditationPlayerCopy">
        <p>GoldMind</p>
        <strong>{session.title}</strong>
      </div>

      <button
        type="button"
        className="meditationPlayerToggle"
        aria-label={isPlaying ? "Duraklat" : "Oynat"}
        onClick={toggle}
      >
        {isPlaying ? "❚❚" : "▶"}
      </button>

      <div className="meditationPlayerTimeline">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={progressMax || 0}
          step={0.1}
          value={progressValue}
          aria-label="İlerleme"
          disabled={progressMax === 0}
          onChange={(event) => seek(Number(event.target.value))}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <button
        type="button"
        className="meditationPlayerClose"
        aria-label="Oynatıcıyı küçült"
        onClick={minimize}
      >
        ×
      </button>
    </div>
  );
}
