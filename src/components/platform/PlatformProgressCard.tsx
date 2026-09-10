"use client";

import Link from "next/link";
import {
  formatProgressPercent,
  type PlatformDefinition,
  type PlatformProgress,
} from "../../data/platformFlow";
import { displayProgressFromItem } from "../../lib/mediaTime";

type PlatformProgressCardProps = {
  platform: PlatformDefinition;
  progress: PlatformProgress | null;
  className?: string;
  onOpen?: () => void;
};

export default function PlatformProgressCard({
  platform,
  progress,
  className,
  onOpen,
}: PlatformProgressCardProps) {
  const percent = progress
    ? formatProgressPercent(displayProgressFromItem(progress))
    : null;

  return (
    <Link
      className={`platformRailCard platformRailCard--${platform.tone}${
        className ? ` ${className}` : ""
      }`}
      href={platform.href}
      onClick={onOpen}
    >
      <span className="platformRailMark" aria-hidden="true">
        {platform.mark}
      </span>
      <strong>{platform.name}</strong>
      <span className="platformRailTagline">{platform.tagline}</span>
      {progress ? (
        <>
          <span className="platformRailResume">
            Kaldığın içerik: “{progress.title}”
          </span>
          <span className="platformRailPercent">{percent}</span>
          <span className="platformProgressTrack" aria-hidden="true">
            <i style={{ width: percent ?? "0%" }} />
          </span>
        </>
      ) : (
        <span className="platformRailEmpty">Henüz başlanmadı</span>
      )}
    </Link>
  );
}
