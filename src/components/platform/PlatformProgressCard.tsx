"use client";

import Link from "next/link";
import Image from "next/image";
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

  if (className === "goldsPopupCard") {
    return <Link className={`goldsPopupCard goldsArea--${platform.id}`} href={platform.href} onClick={onOpen}>
      <span className="goldsAreaIcon"><Image src={`/images/platform/${platform.id}-premium.webp`} alt="" width={128} height={160} sizes="64px" /></span>
      <span className="goldsAreaCopy">
        <strong>{platform.name}</strong>
        <span className="goldsAreaTagline">{platform.tagline}</span>
        {progress ? <span className="goldsAreaResume">{progress.title}</span> : <span className="goldsAreaDiscover">Alanı keşfet</span>}
        {progress ? <span className="goldsAreaProgress"><span className="goldsAreaTrack" aria-hidden="true"><i style={{ width: percent ?? "0%" }} /></span><small>{percent}</small></span> : null}
      </span>
      <span className="goldsAreaArrow" aria-hidden="true">↗</span>
    </Link>;
  }

  return (
    <Link
      className={
        className ??
        `platformRailCard platformRailCard--${platform.tone}`
      }
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
