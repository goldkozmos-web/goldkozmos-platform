"use client";

import { useState } from "react";
import type { EnergyWork } from "../../data/energyWorks";

type EnergyWorkImageProps = {
  work: EnergyWork;
  className: string;
};

export default function EnergyWorkImage({
  work,
  className,
}: EnergyWorkImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${className} energyWorkImageFallback`}
        aria-hidden="true"
      >
        <span>✦</span>
        <strong>{work.title}</strong>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={work.imageSrc}
      alt={work.title}
      onError={() => setFailed(true)}
    />
  );
}
