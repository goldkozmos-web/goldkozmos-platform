"use client";

import { useState } from "react";
import type { MeditationPractice } from "../../data/meditation";
import {
  getPracticeProgress,
  getRemainingListenLabel,
  isMeditationPlayable,
} from "../../data/meditation";

type MeditationCardProps = {
  practice: MeditationPractice;
  onPlay: (practice: MeditationPractice) => void;
  variant?: "library" | "rail" | "continue";
};

export default function MeditationCard({
  practice,
  onPlay,
  variant = "library",
}: MeditationCardProps) {
  const [imageFailed, setImageFailed] = useState(!practice.image);
  const playable = isMeditationPlayable(practice);
  const compact = variant === "rail";
  const isContinue = variant === "continue";
  const progress = getPracticeProgress(practice);
  const remaining = getRemainingListenLabel(practice);

  return (
    <article
      className={
        isContinue
          ? "meditationCard isContinue"
          : compact
            ? "meditationCard isRail"
            : "meditationCard"
      }
    >
      <div className="meditationCardMedia">
        {imageFailed ? (
          <div
            className="meditationCardFallback"
            aria-hidden="true"
          >
            <span>✦</span>
          </div>
        ) : (
          <img
            className="meditationCardImage"
            src={practice.image}
            alt={practice.title}
            onError={() => setImageFailed(true)}
          />
        )}

        {compact && playable ? (
          <button
            type="button"
            className="meditationCardPlay"
            aria-label={`${practice.title} pratığını başlat`}
            onClick={() => onPlay(practice)}
          >
            ▶
          </button>
        ) : null}
      </div>

      <div className="meditationCardBody">
        <p className="meditationCardMeta">
          <span>{practice.category}</span>
          <span>{practice.duration}</span>
        </p>

        <h2>{practice.title}</h2>

        {isContinue ? (
          <div className="goldmindProgress">
            <span className="goldmindProgressTrack" aria-hidden="true">
              <i style={{ width: `${Math.round(progress * 100)}%` }} />
            </span>
            {remaining ? (
              <span className="goldmindProgressTime">{remaining}</span>
            ) : null}
          </div>
        ) : null}

        {compact || isContinue ? null : <p>{practice.description}</p>}

        {compact || isContinue ? null : playable ? (
          <button
            type="button"
            className="meditationCardCta"
            onClick={() => onPlay(practice)}
          >
            Dinle
            <span aria-hidden="true">→</span>
          </button>
        ) : (
          <span className="meditationCardSoon">Yakında</span>
        )}
      </div>

      {isContinue && playable ? (
        <button
          type="button"
          className="meditationCardPlay"
          aria-label={`${practice.title} pratığına devam et`}
          onClick={() => onPlay(practice)}
        >
          ▶
        </button>
      ) : null}
    </article>
  );
}
