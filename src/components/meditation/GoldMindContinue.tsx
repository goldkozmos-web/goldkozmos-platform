"use client";

import type { MeditationPractice } from "../../data/meditation";
import MeditationCard from "./MeditationCard";

type GoldMindContinueProps = {
  practices: MeditationPractice[];
  onPlay: (practice: MeditationPractice) => void;
};

export default function GoldMindContinue({
  practices,
  onPlay,
}: GoldMindContinueProps) {
  return (
    <section
      className="goldmindContinue"
      aria-label="Kaldığın yerden devam et"
    >
      <div className="goldmindRailHead">
        <h2>Kaldığın Yerden Devam Et</h2>
      </div>

      {practices.length > 0 ? (
        <div className="goldmindContinueList">
          {practices.map((practice) => (
            <MeditationCard
              key={practice.id}
              practice={practice}
              onPlay={onPlay}
              variant="continue"
            />
          ))}
        </div>
      ) : (
        <div className="goldmindContinueEmpty">
          <p className="goldmindSoftEmpty">
            Dinlemeye başladığın pratikler burada görünecek.
          </p>
          <div
            className="goldmindContinueGhost"
            aria-hidden="true"
          >
            <span className="goldmindContinueGhostCover" />
            <span className="goldmindContinueGhostCopy">
              <i />
              <i />
              <b />
            </span>
            <span className="goldmindContinueGhostPlay" />
          </div>
        </div>
      )}
    </section>
  );
}
