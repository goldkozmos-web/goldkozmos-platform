"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  progressKey,
  resumeOffset,
  type PlatformId,
  type PlatformProgress,
} from "../../data/platformFlow";
import {
  capTimeToWallClock,
  isTrustedDuration,
  mergePlaybackFields,
  normalizePlaybackClocks,
  pickTrustedDuration,
  secondsFromYoutubeClock,
  sanitizeStoredSeconds,
  youtubeResumeStart,
} from "../../lib/mediaTime";
import {
  getLatestProgress,
  getProgressForPlatform,
  readLivePlayback,
  readPlatformProgressMap,
  upsertProgressEntry,
  writeLivePlayback,
  writePlatformProgressMap,
  type PlatformProgressMap,
} from "../../lib/platformProgress";
import { usePathname, useRouter } from "next/navigation";
import { listenToYoutube, sendYoutubeCommand, youtubeEmbedSrc } from "../../lib/youtube";
import SeekScrubber from "./SeekScrubber";
import { useMiniDockDrag } from "./useMiniDockDrag";
import {
  loadSpotifyIframeApi,
  spotifyEmbedSrc,
  spotifyEpisodePageUrl,
  spotifyEpisodeUri,
  type SpotifyEmbedController,
} from "../../lib/spotify";

type PlaybackSession = PlatformProgress & {
  audioUrl?: string;
  youtubeId?: string;
  spotifyEmbedUrl?: string;
  artworkUrl?: string;
};

function playbackSourceLabel(session: PlaybackSession) {
  if (session.spotifyEmbedUrl) {
    return "Spotify · GoldCast";
  }

  if (session.platform === "goldfrekans") {
    return "YouTube · GoldFrekans";
  }

  return "YouTube · GoldCast";
}

type StartAudioInput = {
  platform: PlatformId;
  contentId: string;
  title: string;
  href: string;
  audioUrl: string;
  description?: string;
  currentTime?: number;
};

type StartYoutubeInput = {
  platform: PlatformId;
  contentId: string;
  title: string;
  href: string;
  youtubeId: string;
  description?: string;
  artworkUrl?: string;
  resume?: boolean;
};

type StartSpotifyInput = {
  platform: PlatformId;
  contentId: string;
  title: string;
  href: string;
  embedUrl: string;
  description?: string;
  artworkUrl?: string;
};

type PlaybackContextValue = {
  items: PlatformProgressMap;
  session: PlaybackSession | null;
  minimized: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  startAudio: (input: StartAudioInput) => void;
  startYoutube: (input: StartYoutubeInput) => void;
  startSpotify: (input: StartSpotifyInput) => void;
  toggle: () => void;
  seek: (seconds: number) => void;
  minimize: () => void;
  expand: () => void;
  stop: () => void;
  latest: PlatformProgress | null;
  forPlatform: (platform: PlatformId) => PlatformProgress | null;
};

const PlaybackContext = createContext<PlaybackContextValue | null>(null);

export function PlaybackProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const youtubeRef = useRef<HTMLIFrameElement>(null);
  const spotifyHostRef = useRef<HTMLDivElement>(null);
  const spotifyControllerRef = useRef<SpotifyEmbedController | null>(null);
  const spotifyShouldPlayRef = useRef(false);
  const embedStartRef = useRef(0);
  const durationRef = useRef(0);
  const clockGuardRef = useRef({ wall: 0, time: 0 });
  const playOpenedAtRef = useRef(0);
  const pendingSeekRef = useRef(0);
  const [items, setItems] = useState<PlatformProgressMap>({});
  const [session, setSession] = useState<PlaybackSession | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  durationRef.current = duration;

  useEffect(() => {
    setItems(readPlatformProgressMap());

    const live = readLivePlayback();

    if (live?.session) {
      const storedDuration = sanitizeStoredSeconds(live.session.durationSeconds);
      const startAt = resumeOffset(
        sanitizeStoredSeconds(live.session.currentTime, storedDuration || undefined),
        storedDuration,
      );
      embedStartRef.current = startAt;
      playOpenedAtRef.current = Date.now();
      clockGuardRef.current = { wall: Date.now(), time: startAt };
      setSession({
        ...live.session,
        currentTime: startAt,
        durationSeconds: storedDuration || live.session.durationSeconds,
        spotifyEmbedUrl: live.session.spotifyEmbedUrl
          ? spotifyEmbedSrc(live.session.spotifyEmbedUrl)
          : live.session.spotifyEmbedUrl,
      });
      setCurrentTime(startAt);
      setDuration(storedDuration);
      setMinimized(true);
      setIsPlaying(Boolean(live.isPlaying));
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (session?.youtubeId || session?.spotifyEmbedUrl || session?.audioUrl) {
      writeLivePlayback({
        session: {
          ...session,
          currentTime,
          durationSeconds: pickTrustedDuration(
            session.durationSeconds ?? 0,
            duration,
          ),
        },
        minimized,
        isPlaying,
      });
      return;
    }

    writeLivePlayback(null);
  }, [currentTime, duration, isPlaying, minimized, ready, session]);

  const miniDock =
    Boolean(session?.youtubeId || session?.spotifyEmbedUrl) && minimized;
  const dockDrag = useMiniDockDrag(miniDock);

  useEffect(() => {
    const miniBar = miniDock && !dockDrag.bubble;
    document.body.classList.toggle("hasPlatformMiniDock", miniBar);
    return () => {
      document.body.classList.remove("hasPlatformMiniDock");
    };
  }, [dockDrag.bubble, miniDock]);

  const persist = useCallback(
    (entry: PlatformProgress) => {
      setItems((current) => {
        const next = upsertProgressEntry(current, entry);
        writePlatformProgressMap(next);
        return next;
      });
    },
    [],
  );

  const startAudio = useCallback((input: StartAudioInput) => {
    const now = new Date().toISOString();
    const existing = items[progressKey(input.platform, input.contentId)] ?? null;
    const storedDuration = sanitizeStoredSeconds(existing?.durationSeconds);
    const startAt = resumeOffset(
      sanitizeStoredSeconds(
        input.currentTime ?? existing?.currentTime,
        storedDuration || undefined,
      ),
      storedDuration,
    );

    if (
      session?.audioUrl === input.audioUrl &&
      session.contentId === input.contentId
    ) {
      setMinimized(false);
      const audio = audioRef.current;
      if (audio) {
        void audio.play().then(
          () => setIsPlaying(true),
          () => setIsPlaying(false),
        );
      }
      return;
    }

    const next: PlaybackSession = {
      platform: input.platform,
      contentId: input.contentId,
      contentType: "audio",
      title: input.title,
      href: input.href,
      progress: existing?.progress ?? 0,
      currentTime: startAt,
      durationSeconds: storedDuration || existing?.durationSeconds,
      lastOpenedAt: now,
      lastPlayedAt: now,
      status: "playing",
      audioUrl: input.audioUrl,
      description: input.description ?? existing?.description,
    };

    setSession(next);
    setCurrentTime(startAt);
    setDuration(storedDuration);
    setMinimized(false);
    persist(next);

    const audio = audioRef.current;

    if (audio) {
      if (audio.getAttribute("src") !== input.audioUrl) {
        audio.src = input.audioUrl;
      }

      audio.currentTime = startAt;
      void audio.play().then(
        () => setIsPlaying(true),
        () => setIsPlaying(false),
      );
    }

    sendYoutubeCommand(youtubeRef.current, "pauseVideo");
  }, [items, persist, session]);

  const startYoutube = useCallback((input: StartYoutubeInput) => {
    const now = new Date().toISOString();
    audioRef.current?.pause();

    if (session?.youtubeId === input.youtubeId) {
      setMinimized(false);
      setIsPlaying(true);
      sendYoutubeCommand(youtubeRef.current, "playVideo");
      return;
    }

    const existing = items[progressKey(input.platform, input.contentId)] ?? null;
    const storedDuration = sanitizeStoredSeconds(existing?.durationSeconds);
    const resumeAt =
      input.resume === false
        ? 0
        : resumeOffset(
            sanitizeStoredSeconds(existing?.currentTime, storedDuration || undefined),
            storedDuration,
          );
    const startAt = youtubeResumeStart(resumeAt, storedDuration);
    embedStartRef.current = startAt;
    pendingSeekRef.current = resumeAt;
    clockGuardRef.current = { wall: Date.now(), time: startAt };
    playOpenedAtRef.current = Date.now();

    const next: PlaybackSession = {
      platform: input.platform,
      contentId: input.contentId,
      contentType: "video",
      title: input.title,
      href: input.href,
      progress: existing?.progress ?? 0,
      currentTime: startAt,
      durationSeconds: storedDuration || existing?.durationSeconds,
      lastOpenedAt: now,
      lastPlayedAt: now,
      status: "playing",
      youtubeId: input.youtubeId,
      artworkUrl: input.artworkUrl,
      description: input.description ?? existing?.description,
    };

    setSession(next);
    setCurrentTime(startAt);
    setDuration(storedDuration);
    setMinimized(false);
    setIsPlaying(true);
    persist(next);
  }, [items, persist, session?.youtubeId]);

  const startSpotify = useCallback((input: StartSpotifyInput) => {
    const now = new Date().toISOString();
    audioRef.current?.pause();
    sendYoutubeCommand(youtubeRef.current, "pauseVideo");

    const existing = items[progressKey(input.platform, input.contentId)] ?? null;
    const storedDuration = sanitizeStoredSeconds(existing?.durationSeconds);
    const startAt = resumeOffset(
      sanitizeStoredSeconds(existing?.currentTime, storedDuration || undefined),
      storedDuration,
    );
    embedStartRef.current = startAt;
    clockGuardRef.current = { wall: Date.now(), time: startAt };
    playOpenedAtRef.current = Date.now();

    const embedUrl = spotifyEmbedSrc(input.embedUrl);
    spotifyShouldPlayRef.current = true;

    if (
      session?.contentId === input.contentId &&
      session.spotifyEmbedUrl === embedUrl
    ) {
      setMinimized(false);
      spotifyControllerRef.current?.resume();
      setIsPlaying(true);
      return;
    }

    const next: PlaybackSession = {
      platform: input.platform,
      contentId: input.contentId,
      contentType: "audio",
      title: input.title,
      href: input.href,
      progress: existing?.progress ?? 0,
      currentTime: startAt,
      durationSeconds: storedDuration || existing?.durationSeconds,
      lastOpenedAt: now,
      lastPlayedAt: now,
      status: "playing",
      spotifyEmbedUrl: embedUrl,
      artworkUrl: input.artworkUrl,
      description: input.description ?? existing?.description,
    };

    setSession(next);
    setCurrentTime(startAt);
    setDuration(storedDuration);
    setMinimized(false);
    setIsPlaying(true);
    persist(next);
  }, [items, persist, session?.spotifyEmbedUrl]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;

    if (!session) {
      return;
    }

    if (session.youtubeId) {
      sendYoutubeCommand(
        youtubeRef.current,
        isPlaying ? "pauseVideo" : "playVideo",
      );
      setIsPlaying((current) => !current);
      return;
    }

    if (session.spotifyEmbedUrl) {
      if (isPlaying) {
        spotifyControllerRef.current?.pause();
        setIsPlaying(false);
      } else {
        spotifyShouldPlayRef.current = true;
        spotifyControllerRef.current?.resume();
        setIsPlaying(true);
      }
      return;
    }

    if (!audio) {
      return;
    }

    if (audio.paused) {
      void audio.play().then(
        () => setIsPlaying(true),
        () => setIsPlaying(false),
      );
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, [session, isPlaying]);

  const seek = useCallback((seconds: number) => {
    const time = Math.max(0, seconds);

    if (session?.youtubeId) {
      sendYoutubeCommand(youtubeRef.current, "seekTo", [time, true]);
      setCurrentTime(time);
      return;
    }

    if (session?.spotifyEmbedUrl) {
      spotifyControllerRef.current?.seek(Math.floor(time));
      setCurrentTime(time);
      return;
    }

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = time;
    setCurrentTime(time);
  }, [session?.spotifyEmbedUrl, session?.youtubeId]);

  const minimize = useCallback(() => {
    setMinimized(true);
  }, []);

  const expand = useCallback(() => {
    setMinimized(false);
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    audio?.pause();
    sendYoutubeCommand(youtubeRef.current, "pauseVideo");
    spotifyShouldPlayRef.current = false;
    spotifyControllerRef.current?.pause();
    spotifyControllerRef.current?.destroy();
    spotifyControllerRef.current = null;

    if (session) {
      const fields = mergePlaybackFields(session, currentTime, duration);
      persist({
        ...session,
        ...fields,
        progress: fields.progress > 0 ? fields.progress : 0.01,
        status: "paused",
        lastPlayedAt: new Date().toISOString(),
      });
    }

    setIsPlaying(false);
    setSession(null);
    setMinimized(false);
    writeLivePlayback(null);
  }, [currentTime, duration, persist, session]);

  useEffect(() => {
    if (!session || !ready) {
      return;
    }

    const next: PlatformProgress = {
      ...session,
      ...mergePlaybackFields(session, currentTime, duration),
      lastPlayedAt: new Date().toISOString(),
      status: isPlaying ? "playing" : "paused",
    };

    const timer = window.setTimeout(() => {
      persist(next);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [currentTime, duration, isPlaying, ready, persist, session]);

  useEffect(() => {
    if (!session?.youtubeId) {
      return;
    }

    function onMessage(event: MessageEvent) {
      const origin = event.origin || "";

      if (!origin.includes("youtube.com") && !origin.includes("youtube-nocookie.com")) {
        return;
      }

      let data = event.data;

      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (!data || typeof data !== "object") {
        return;
      }

      if (data.event === "onReady" || data.event === "initialDelivery") {
        listenToYoutube(youtubeRef.current);
      }

      const info = data.info;

      if (data.event === "infoDelivery" && info && typeof info === "object") {
        const trusted = durationRef.current;
        const extra = info as {
          duration?: number;
          currentTime?: number;
          playerState?: number;
          videoData?: { lengthSeconds?: number; length_seconds?: number };
        };
        const length = secondsFromYoutubeClock(
          extra.duration ??
            extra.videoData?.lengthSeconds ??
            extra.videoData?.length_seconds,
        );
        if (length != null && isTrustedDuration(length)) {
          setDuration((current) => pickTrustedDuration(current, length));
          durationRef.current = pickTrustedDuration(trusted, length);

          const resumeAt = youtubeResumeStart(
            pendingSeekRef.current,
            length,
          );
          if (resumeAt > 1 && Math.abs(resumeAt - embedStartRef.current) > 2) {
            pendingSeekRef.current = 0;
            embedStartRef.current = resumeAt;
            playOpenedAtRef.current = Date.now();
            sendYoutubeCommand(youtubeRef.current, "seekTo", [resumeAt, true]);
            setCurrentTime(resumeAt);
          } else {
            pendingSeekRef.current = 0;
          }
        }

        const time = secondsFromYoutubeClock(extra.currentTime);
        if (time != null) {
          const next = capTimeToWallClock({
            playerTime: time,
            startAt: embedStartRef.current,
            openedAtMs: playOpenedAtRef.current,
            nowMs: Date.now(),
          });
          if (next != null) {
            const cap = durationRef.current;
            const clamped =
              isTrustedDuration(cap) ? Math.min(next, cap) : next;
            setCurrentTime(clamped);
            clockGuardRef.current = { wall: Date.now(), time: clamped };
          }
        }

        if (typeof extra.playerState === "number") {
          if (
            extra.playerState === 0 &&
            Date.now() - playOpenedAtRef.current < 8000
          ) {
            embedStartRef.current = 0;
            pendingSeekRef.current = 0;
            playOpenedAtRef.current = Date.now();
            clockGuardRef.current = { wall: Date.now(), time: 0 };
            setCurrentTime(0);
            sendYoutubeCommand(youtubeRef.current, "seekTo", [0, true]);
            sendYoutubeCommand(youtubeRef.current, "playVideo");
            setIsPlaying(true);
            return;
          }

          setIsPlaying(extra.playerState === 1);
        }
      }
    }

    window.addEventListener("message", onMessage);
    const poll = window.setInterval(() => {
      listenToYoutube(youtubeRef.current);
    }, 2000);

    return () => {
      window.removeEventListener("message", onMessage);
      window.clearInterval(poll);
    };
  }, [session?.youtubeId]);

  useEffect(() => {
    const host = spotifyHostRef.current;
    const uri = session?.spotifyEmbedUrl
      ? spotifyEpisodeUri(session.spotifyEmbedUrl)
      : null;

    if (!host || !uri) {
      return;
    }

    let cancelled = false;
    const startAt = embedStartRef.current;
    const child = document.createElement("div");
    host.replaceChildren(child);

    void loadSpotifyIframeApi().then((api) => {
      if (cancelled) {
        return;
      }

      api.createController(
        child,
        {
          uri,
          width: "100%",
          height: 352,
        },
        (controller) => {
          if (cancelled) {
            controller.destroy();
            return;
          }

          spotifyControllerRef.current = controller;
          controller.loadUri(uri, false, startAt > 1 ? startAt : 0, "dark");

          controller.addListener("ready", () => {
            if (spotifyShouldPlayRef.current) {
              controller.resume();
            }
          });

          controller.addListener("playback_started", () => {
            setIsPlaying(true);
          });

          controller.addListener("playback_update", (event) => {
            const clocks = normalizePlaybackClocks(event.data ?? {});

            if (clocks.duration != null) {
              setDuration((current) => pickTrustedDuration(current, clocks.duration));
            }

            if (clocks.position != null) {
              const next = capTimeToWallClock({
                playerTime: clocks.position,
                startAt: embedStartRef.current,
                openedAtMs: playOpenedAtRef.current,
                nowMs: Date.now(),
              });
              if (next != null) {
                setCurrentTime(next);
                clockGuardRef.current = { wall: Date.now(), time: next };
              }
            }

            if (typeof event.data?.isPaused === "boolean") {
              setIsPlaying(!event.data.isPaused);
            }
          });
        },
      );
    });

    return () => {
      cancelled = true;
      spotifyControllerRef.current?.destroy();
      spotifyControllerRef.current = null;
    };
  }, [session?.spotifyEmbedUrl]);

  useEffect(() => {
    if (!session?.audioUrl) {
      return;
    }

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.getAttribute("src") !== session.audioUrl) {
      audio.src = session.audioUrl;
      audio.currentTime = session.currentTime ?? 0;
      if (isPlaying) {
        void audio.play().then(
          () => setIsPlaying(true),
          () => setIsPlaying(false),
        );
      }
    }
  }, [isPlaying, session?.audioUrl, session?.currentTime, session?.contentId]);

  const value = useMemo<PlaybackContextValue>(
    () => ({
      items,
      session,
      minimized,
      isPlaying,
      currentTime,
      duration,
      startAudio,
      startYoutube,
      startSpotify,
      toggle,
      seek,
      minimize,
      expand,
      stop,
      latest: getLatestProgress(items),
      forPlatform: (platform) => getProgressForPlatform(items, platform),
    }),
    [
      items,
      session,
      minimized,
      isPlaying,
      currentTime,
      duration,
      startAudio,
      startYoutube,
      startSpotify,
      toggle,
      seek,
      minimize,
      expand,
      stop,
    ],
  );

  return (
    <PlaybackContext.Provider value={value}>
      <audio
        ref={audioRef}
        preload="metadata"
        style={{ display: "none" }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration || 0);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      {session?.youtubeId || session?.spotifyEmbedUrl ? (
        <div
          className={`platformYoutubeShell${minimized ? " isMini" : " isStage"}${
            session.spotifyEmbedUrl ? " isSpotify" : ""
          }${minimized && isPlaying ? " isPlaying" : ""}${
            miniDock && dockDrag.bubble ? " isBubble" : ""
          }${miniDock && dockDrag.dragging ? " isDragging" : ""}`}
          style={dockDrag.style}
          onPointerDown={miniDock ? dockDrag.onPointerDown : undefined}
          onPointerMove={miniDock ? dockDrag.onPointerMove : undefined}
          onPointerUp={miniDock ? dockDrag.onPointerUp : undefined}
          onPointerCancel={miniDock ? dockDrag.onPointerUp : undefined}
          onClickCapture={miniDock ? dockDrag.onClickCapture : undefined}
        >
          {minimized ? null : (
            <div className="platformYoutubeChrome">
              <div>
                <p>
                  {playbackSourceLabel(session)}
                </p>
                <strong>{session.title}</strong>
              </div>
              <div>
                {session.youtubeId || session.spotifyEmbedUrl ? (
                  <button type="button" onClick={toggle}>
                    {isPlaying ? "Duraklat" : "Oynat"}
                  </button>
                ) : null}
                {session.spotifyEmbedUrl ? (
                  <a
                    className="platformYoutubeChromeLink"
                    href={spotifyEpisodePageUrl(session.spotifyEmbedUrl)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Spotify’da aç
                  </a>
                ) : null}
                <button type="button" onClick={minimize}>
                  Küçült
                </button>
                <button type="button" onClick={stop}>
                  Kapat
                </button>
              </div>
            </div>
          )}

          {minimized ? (
            <img
              className="platformYoutubeMiniArt"
              src={
                session.artworkUrl ||
                (session.youtubeId
                  ? `https://i.ytimg.com/vi/${session.youtubeId}/hqdefault.jpg`
                  : undefined)
              }
              alt=""
            />
          ) : null}

          {session.youtubeId ? (
          <iframe
            key={session.youtubeId}
            ref={youtubeRef}
            src={youtubeEmbedSrc(
              session.youtubeId,
              true,
              embedStartRef.current,
              session.durationSeconds ?? duration,
            )}
            title={session.title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            onLoad={() => {
              listenToYoutube(youtubeRef.current);
            }}
          />
          ) : (
            <div className="platformSpotifyHost" ref={spotifyHostRef} />
          )}

          {minimized ? (
            <div className="platformYoutubeMiniBar">
              <button
                type="button"
                className="platformYoutubeMiniTitle"
                onClick={expand}
              >
                <small>
                  {playbackSourceLabel(session)}
                </small>
                <strong>{session.title}</strong>
              </button>
              {session.youtubeId || session.spotifyEmbedUrl ? (
                <button
                  type="button"
                  className="platformYoutubeMiniPlay"
                  onClick={toggle}
                  aria-label={isPlaying ? "Duraklat" : "Oynat"}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>
              ) : null}
              <button
                type="button"
                className="platformYoutubeMiniClose"
                onClick={stop}
                aria-label="Kapat"
              >
                ×
              </button>
              <SeekScrubber className="platformSeek--mini" />
            </div>
          ) : null}
        </div>
      ) : null}
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  const context = useContext(PlaybackContext);

  if (!context) {
    throw new Error("usePlayback must be used within PlaybackProvider");
  }

  return context;
}

export function KeepPlayingOnNavigate() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, minimize } = usePlayback();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (
      previousPath.current !== pathname &&
      (session?.youtubeId || session?.spotifyEmbedUrl)
    ) {
      minimize();
    }

    previousPath.current = pathname;
  }, [minimize, pathname, session?.spotifyEmbedUrl, session?.youtubeId]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (anchor.target && anchor.target !== "_self") {
        return;
      }

      if (anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (
        !href ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      let url: URL;

      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) {
        return;
      }

      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      event.preventDefault();
      router.push(`${url.pathname}${url.search}${url.hash}`);
    }

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
    };
  }, [router]);

  return null;
}
