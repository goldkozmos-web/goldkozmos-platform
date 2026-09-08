"use client";

import { useRef } from "react";
import type { MeditationPractice } from "../../data/meditation";
import MeditationCard from "./MeditationCard";

type GoldMindRailProps = {
  title: string;
  practices: MeditationPractice[];
  onPlay: (practice: MeditationPractice) => void;
  emptyState?: string;
};

export default function GoldMindRail({
  title,
  practices,
  onPlay,
  emptyState,
}: GoldMindRailProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  if (practices.length === 0) {
    if (!emptyState) {
      return null;
    }

    return (
      <section className="goldmindRail">
        <div className="goldmindRailHead">
          <h2>{title}</h2>
        </div>
        <p className="goldmindSoftEmpty">{emptyState}</p>
      </section>
    );
  }

  function scroll(direction: "left" | "right") {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    slider.scrollBy({
      left: direction === "right" ? 280 : -280,
      behavior: "smooth",
    });
  }

  return (
    <section className="goldmindRail">
      <div className="goldmindRailHead">
        <h2>{title}</h2>

        {practices.length > 2 ? (
          <div className="goldmindRailControls">
            <button
              type="button"
              aria-label={`${title} önceki`}
              onClick={() => scroll("left")}
            >
              ←
            </button>
            <button
              type="button"
              aria-label={`${title} sonraki`}
              onClick={() => scroll("right")}
            >
              →
            </button>
          </div>
        ) : null}
      </div>

      <div className="goldmindRailSlider" ref={sliderRef}>
        {practices.map((practice) => (
          <MeditationCard
            key={practice.id}
            practice={practice}
            onPlay={onPlay}
            variant="rail"
          />
        ))}
      </div>
    </section>
  );
}
