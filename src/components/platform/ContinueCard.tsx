"use client";

import Link from "next/link";
import {
  PLATFORM_CATALOG,
  formatProgressPercent,
  type PlatformProgress,
} from "../../data/platformFlow";
import { usePlayback } from "./PlaybackProvider";

type ContinueCardProps = {
  item: PlatformProgress | null;
  title?: string;
  variant?: "glance" | "page";
};

export default function ContinueCard({
  item,
  title = "Kaldığın Yeri Gör",
  variant = "glance",
}: ContinueCardProps) {
  const { startAudio, startYoutube, startSpotify } = usePlayback();

  function resume() {
    if (!item) {
      return;
    }

    if (item.youtubeId) {
      startYoutube({
        platform: item.platform,
        contentId: item.contentId,
        title: item.title,
        href: item.href,
        youtubeId: item.youtubeId,
        description: item.description,
      });
      return;
    }

    if (item.spotifyEmbedUrl) {
      startSpotify({
        platform: item.platform,
        contentId: item.contentId,
        title: item.title,
        href: item.href,
        embedUrl: item.spotifyEmbedUrl,
        description: item.description,
      });
      return;
    }

    if (item.audioUrl) {
      startAudio({
        platform: item.platform,
        contentId: item.contentId,
        title: item.title,
        href: item.href,
        audioUrl: item.audioUrl,
        description: item.description,
        currentTime: item.currentTime,
      });
    }
  }

  const canResume = Boolean(
    item?.youtubeId || item?.spotifyEmbedUrl || item?.audioUrl,
  );

  return (
    <section
      className={`platformContinue platformContinue--${variant}`}
      aria-label={title}
    >
      <h2>{variant === "page" ? "Kaldığın Yerden Devam Et" : title}</h2>

      {item ? (
        <div className="platformContinueCard">
          <div className="platformContinueCopy">
            <p>
              {PLATFORM_CATALOG.find((entry) => entry.id === item.platform)
                ?.name ?? item.platform}
            </p>
            <strong>{item.title}</strong>
            {item.description ? <span>{item.description}</span> : null}
            <span className="platformContinuePercent">
              {formatProgressPercent(item.progress)}
            </span>
            <span className="platformProgressTrack" aria-hidden="true">
              <i style={{ width: formatProgressPercent(item.progress) }} />
            </span>
          </div>

          {canResume ? (
            <button
              type="button"
              className="platformContinueCta"
              onClick={resume}
            >
              Kaldığın yerden devam
            </button>
          ) : (
            <Link
              className="platformContinueCta"
              href={item.href}
            >
              Devam Et
            </Link>
          )}
        </div>
      ) : null}
    </section>
  );
}
