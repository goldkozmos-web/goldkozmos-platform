"use client";

import { useRef } from "react";
import type { MeditationPractice } from "../../data/meditation";
import { isMeditationPlayable } from "../../data/meditation";

type GoldMindFeaturedProps = {
  practices: MeditationPractice[];
  onPlay: (practice: MeditationPractice) => void;
};

export default function GoldMindFeatured({
  practices,
  onPlay,
}: GoldMindFeaturedProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const slides = practices.length > 0 ? practices : [null, null, null];

  function scrollBySlide(direction: "left" | "right") {
    const slider = sliderRef.current;
    const card = slider?.querySelector(".goldmindFeaturedSlide");

    if (!slider || !(card instanceof HTMLElement)) {
      return;
    }

    const styles = window.getComputedStyle(slider);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 12;
    const amount = card.offsetWidth + gap;
    const maxScroll = Math.max(0, slider.scrollWidth - slider.clientWidth);
    const atStart = slider.scrollLeft <= 12;
    const atEnd = slider.scrollLeft >= maxScroll - 12;

    if (direction === "right" && atEnd) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction === "left" && atStart) {
      slider.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    slider.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="goldmindFeatured" aria-label="Öne çıkan pratikler">
      <div className="goldmindFeaturedHead">
        <h2>Öne çıkanlar</h2>
        <div className="goldmindFeaturedControls">
          <button
            type="button"
            aria-label="Önceki pratik"
            onClick={() => scrollBySlide("left")}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Sonraki pratik"
            onClick={() => scrollBySlide("right")}
          >
            →
          </button>
        </div>
      </div>

      <div className="goldmindFeaturedSlider" ref={sliderRef}>
        {slides.map((practice, index) => {
          const playable =
            practice !== null && isMeditationPlayable(practice);

          return (
            <article
              className="goldmindFeaturedSlide"
              key={practice?.id ?? `empty-${index}`}
            >
              <div className="goldmindFeaturedMedia" aria-hidden="true">
                <span>✦</span>
                {practice?.image ? (
                  <img
                    src={practice.image}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}
              </div>

              <div className="goldmindFeaturedCopy">
                <p>{practice?.category ?? "Günün pratiği"}</p>

                {practice ? (
                  <>
                    <h3>{practice.title}</h3>
                    <div className="goldmindFeaturedMeta">
                      <span>{practice.duration}</span>
                      {playable ? (
                        <button
                          type="button"
                          onClick={() => onPlay(practice)}
                        >
                          Başlat
                        </button>
                      ) : (
                        <em>Yakında</em>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <h3>Yeni pratikler hazırlanıyor</h3>
                    <div className="goldmindFeaturedMeta">
                      <span>Süre yakında</span>
                    </div>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
