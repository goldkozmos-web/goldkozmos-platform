"use client";

import type { EnergyWork } from "../../data/energyWorks";
import EnergyWorkImage from "./EnergyWorkImage";

type EnergyWorkCardProps = {
  work: EnergyWork;
  index: number;
  onOpen: (work: EnergyWork, opener: HTMLElement) => void;
};

export default function EnergyWorkCard({
  work,
  index,
  onOpen,
}: EnergyWorkCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="energyWorkCard">
      <div className="energyWorkCardMedia">
        <EnergyWorkImage
          work={work}
          className="energyWorkCardImage"
        />

        <span className="energyWorkCardNumber">
          {number}
        </span>
      </div>

      <div className="energyWorkCardBody">
        <h3>{work.title}</h3>

        <p className="energyWorkCardPrice">
          {work.priceLabel}
        </p>

        <button
          type="button"
          className="energyWorkCardCta"
          onClick={(event) => onOpen(work, event.currentTarget)}
        >
          Detayları İncele
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
