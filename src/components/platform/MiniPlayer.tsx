"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PLATFORM_CATALOG } from "../../data/platformFlow";
import { usePlayback } from "./PlaybackProvider";

export default function MiniPlayer() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    session,
    minimized,
    isPlaying,
    toggle,
    minimize,
    expand,
    stop,
  } = usePlayback();

  if (!session) {
    return null;
  }

  const onGoldMindPlayer =
    pathname === "/goldmind" &&
    session.platform === "goldmind" &&
    !minimized;

  if (onGoldMindPlayer) {
    return null;
  }

  const platformName =
    PLATFORM_CATALOG.find((item) => item.id === session.platform)?.name ??
    session.platform;

  const isAudio = session.contentType === "audio" && Boolean(session.audioUrl);

  return (
    <div
      className={`platformMiniPlayer${minimized ? " isMinimized" : ""}`}
      role="region"
      aria-label="Devam kutusu"
    >
      {minimized ? (
        <button
          type="button"
          className="platformMiniRestore"
          onClick={expand}
        >
          Devam
        </button>
      ) : (
        <>
          <button
            type="button"
            className="platformMiniBody"
            onClick={() => router.push(session.href)}
          >
            <p>{platformName}</p>
            <strong>{session.title}</strong>
            <span>
              {isAudio
                ? isPlaying
                  ? "Şimdi dinleniyor"
                  : "Duraklatıldı"
                : "Okumaya devam et"}
            </span>
          </button>

          {isAudio ? (
            <button
              type="button"
              className="platformMiniToggle"
              aria-label={isPlaying ? "Duraklat" : "Oynat"}
              onClick={toggle}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
          ) : (
            <Link
              className="platformMiniToggle"
              href={session.href}
              aria-label="Devam et"
            >
              →
            </Link>
          )}

          <button
            type="button"
            className="platformMiniIcon"
            aria-label="Küçült"
            onClick={minimize}
          >
            –
          </button>

          <button
            type="button"
            className="platformMiniIcon"
            aria-label="Kapat"
            onClick={stop}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
}
