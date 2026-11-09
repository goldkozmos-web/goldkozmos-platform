"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PLATFORM_CATALOG } from "../../data/platformFlow";
import { usePlayback } from "./PlaybackProvider";
import SeekScrubber from "./SeekScrubber";
import PlayerEdgeTile from "./PlayerEdgeTile";

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
    playerDock: dock,
  } = usePlayback();
  const isAudio = session?.contentType === "audio" && Boolean(session.audioUrl);

  if (!session || session.youtubeId || session.spotifyEmbedUrl) {
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

  return (
    <div
      className={`platformMiniPlayer${dock.compact ? " playerEdgeDock" : minimized && !isAudio ? " isMinimized" : ""}`}
      style={dock.style}
      role="region"
      aria-label="Devam kutusu"
    >
      {dock.compact ? (
        <PlayerEdgeTile dock={dock} artwork={session.artworkUrl} title={session.title} playing={isPlaying} toggle={toggle} restore={expand} />
      ) : minimized && !isAudio ? (
        <button type="button" className="platformMiniRestore" onClick={expand}>Devam</button>
      ) : (
        <>
          {isAudio && <button type="button" className="playerDockHandle" {...dock.dragProps} onClick={(event) => { if (event.detail === 0) dock.collapse(); }} aria-label="Müzik kutusunu kenara küçült"><span aria-hidden="true" /></button>}
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
            onClick={() => { minimize(); if (isAudio) dock.collapse(); }}
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

          {isAudio ? <SeekScrubber className="platformSeek--audio" /> : null}
        </>
      )}
    </div>
  );
}
