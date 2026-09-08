"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type MouseEvent,
} from "react";
import { getEnergyWorks, type EnergyWork } from "../../data/energyWorks";
import EnergyWorkCard from "./EnergyWorkCard";
import EnergyWorkModal from "./EnergyWorkModal";

export default function EnergyWorksCatalog() {
  const works = getEnergyWorks();
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    moved: false,
  });
  const [selectedWork, setSelectedWork] =
    useState<EnergyWork | null>(null);
  const lastOpenerRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const updateScrollState = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const maxScroll = Math.max(
      0,
      slider.scrollWidth - slider.clientWidth,
    );
    const left = slider.scrollLeft;

    setProgress(maxScroll === 0 ? 1 : left / maxScroll);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    updateScrollState();
    slider.addEventListener("scroll", updateScrollState, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollState);

    return () => {
      slider.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  function scrollByCard(direction: "left" | "right") {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const cards = slider.querySelectorAll<HTMLElement>(".energyWorkCard");
    const firstCard = cards[0];
    const lastCard = cards[cards.length - 1];
    const gap = Number.parseFloat(
      getComputedStyle(slider).columnGap || "16",
    ) || 16;
    const amount = firstCard
      ? firstCard.offsetWidth + gap
      : slider.clientWidth * 0.8;
    const maxScroll = Math.max(
      0,
      slider.scrollWidth - slider.clientWidth,
    );
    const sliderRect = slider.getBoundingClientRect();
    const atStart = firstCard
      ? firstCard.getBoundingClientRect().left >= sliderRect.left - 20
      : slider.scrollLeft <= 8;
    const atEnd = lastCard
      ? lastCard.getBoundingClientRect().right <= sliderRect.right + 20
      : slider.scrollLeft >= maxScroll - 8;

    if (direction === "right" && atEnd) {
      slider.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    if (direction === "left" && atStart) {
      slider.scrollTo({
        left: maxScroll,
        behavior: "smooth",
      });
      return;
    }

    slider.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }

  function openWork(work: EnergyWork, opener: HTMLElement) {
    lastOpenerRef.current = opener;
    setSelectedWork(work);
  }

  function closeWork() {
    setSelectedWork(null);
    lastOpenerRef.current?.focus();
  }

  function handlePointerDown(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    if ((event.target as HTMLElement).closest("button")) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: slider.scrollLeft,
      moved: false,
    };

    slider.setPointerCapture(event.pointerId);
    slider.classList.add("isDragging");
  }

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    const slider = sliderRef.current;
    const drag = dragRef.current;

    if (!slider || drag.pointerId !== event.pointerId) {
      return;
    }

    const delta = event.clientX - drag.startX;

    if (Math.abs(delta) > 6) {
      drag.moved = true;
    }

    if (drag.moved) {
      slider.scrollLeft = drag.startScroll - delta;
    }
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const slider = sliderRef.current;
    const drag = dragRef.current;

    if (!slider || drag.pointerId !== event.pointerId) {
      return;
    }

    if (slider.hasPointerCapture(event.pointerId)) {
      slider.releasePointerCapture(event.pointerId);
    }

    slider.classList.remove("isDragging");
    drag.pointerId = -1;
  }

  function handleClickCapture(
    event: MouseEvent<HTMLDivElement>,
  ) {
    if (!dragRef.current.moved) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragRef.current.moved = false;
  }

  return (
    <>
      <div className="energyWorksHeadingRow">
        <header className="energyWorksHeader">
          <p className="energyWorksEyebrow">
            BİREBİR ENERJİ ÇALIŞMALARI
          </p>

          <h1>11 Enerji Çalışması</h1>

          <p>
            Kısa bilgi alın, size uygun çalışmayı seçin ve
            doğrudan satın almaya geçin.
          </p>
        </header>

        <div className="energyWorksCarouselControls">
          <button
            type="button"
            aria-label="Önceki çalışmalar"
            onClick={() => scrollByCard("left")}
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Sonraki çalışmalar"
            onClick={() => scrollByCard("right")}
          >
            →
          </button>
        </div>
      </div>

      <div
        className="energyWorksSlider"
        ref={sliderRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
      >
        {works.map((work, index) => (
          <EnergyWorkCard
            key={work.id}
            work={work}
            index={index}
            onOpen={openWork}
          />
        ))}
      </div>

      <div
        className="energyWorksProgress"
        aria-hidden="true"
      >
        <span style={{ width: `${Math.max(progress, 0.08) * 100}%` }} />
      </div>

      {selectedWork ? (
        <EnergyWorkModal
          work={selectedWork}
          onClose={closeWork}
        />
      ) : null}
    </>
  );
}
