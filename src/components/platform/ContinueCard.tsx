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

function continueArtwork(item: PlatformProgress) {
  if (item.youtubeId) {
    return `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`;
  }

  return null;
}

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
  const platformName = item
    ? (PLATFORM_CATALOG.find((entry) => entry.id === item.platform)?.name ??
      item.platform)
    : "";
  const artwork = item ? continueArtwork(item) : null;
  const percent = item ? formatProgressPercent(item.progress) : "0%";

  return (
    <section
      className={`platformContinue platformContinue--${variant}`}
      aria-label={title}
    >
      {item ? (
        <div className="platformContinueCard">
          {artwork ? (
            <img
              className="platformContinueArt"
              src={artwork}
              alt=""
            />
          ) : (
            <span className="platformContinueMark" aria-hidden="true">
              {PLATFORM_CATALOG.find((entry) => entry.id === item.platform)
                ?.mark ?? "✦"}
            </span>
          )}

          <div className="platformContinueCopy">
            <p>{platformName}</p>
            <strong>{item.title}</strong>
            {item.description ? (
              <span className="platformContinueDesc">{item.description}</span>
            ) : null}

            <div className="platformContinueMeter">
              <span className="platformContinuePercent">
                Dinlediğin yer · {percent}
              </span>
              <span className="platformProgressTrack" aria-hidden="true">
                <i style={{ width: percent }} />
              </span>
            </div>

            {canResume ? (
              <button
                type="button"
                className="platformContinueCta"
                onClick={resume}
              >
                Devam et
              </button>
            ) : (
              <Link className="platformContinueCta" href={item.href}>
                Devam et
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
