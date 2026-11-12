"use client";

import { isTrustedDuration } from "../../lib/mediaTime";
import { usePlayback } from "./PlaybackProvider";

type SeekScrubberProps = {
  className?: string;
};

export default function SeekScrubber({ className }: SeekScrubberProps) {
  const { currentTime, duration, seek } = usePlayback();
  const max = isTrustedDuration(duration) ? duration : 0;
  const value = max > 0 ? Math.min(Math.max(0, currentTime), max) : 0;

  return (
    <input
      type="range"
      className={`platformSeek${className ? ` ${className}` : ""}`}
      min={0}
      max={max || 1}
      step={0.5}
      value={value}
      disabled={max <= 0}
      aria-label="Kaldığın yeri seç"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      onChange={(event) => seek(Number(event.target.value))}
    />
  );
}
