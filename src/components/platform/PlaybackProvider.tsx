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
  clampProgress,
  progressKey,
  resumeOffset,
  type PlatformId,
  type PlatformProgress,
} from "../../data/platformFlow";
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

type PlaybackSession = PlatformProgress & {
  audioUrl?: string;
  youtubeId?: string;
  spotifyEmbedUrl?: string;
  artworkUrl?: string;
};

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
  const embedStartRef = useRef(0);
  const [items, setItems] = useState<PlatformProgressMap>({});
  const [session, setSession] = useState<PlaybackSession | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readPlatformProgressMap());

    const live = readLivePlayback();

    if (live?.session) {
      const startAt = resumeOffset(
        live.session.currentTime,
        live.session.durationSeconds,
      );
      embedStartRef.current = startAt;
      setSession({ ...live.session, currentTime: startAt });
      setCurrentTime(startAt);
      setDuration(live.session.durationSeconds ?? 0);
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
          durationSeconds: duration || session.durationSeconds,
        },
        minimized,
        isPlaying,
      });
      return;
    }

    writeLivePlayback(null);
  }, [currentTime, duration, isPlaying, minimized, ready, session]);

  useEffect(() => {
    const mini =
      Boolean(session?.youtubeId || session?.spotifyEmbedUrl) && minimized;
    document.body.classList.toggle("hasPlatformMiniDock", mini);
    return () => {
      document.body.classList.remove("hasPlatformMiniDock");
    };
  }, [minimized, session?.spotifyEmbedUrl, session?.youtubeId]);

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
    const startAt = resumeOffset(
      input.currentTime ?? existing?.currentTime,
      existing?.durationSeconds,
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
      durationSeconds: existing?.durationSeconds,
      lastOpenedAt: now,
      lastPlayedAt: now,
      status: "playing",
      audioUrl: input.audioUrl,
      description: input.description ?? existing?.description,
    };

    setSession(next);
    setCurrentTime(startAt);
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
    const startAt = resumeOffset(
      existing?.currentTime,
      existing?.durationSeconds,
    );
    embedStartRef.current = startAt;

    const next: PlaybackSession = {
      platform: input.platform,
      contentId: input.contentId,
      contentType: "video",
      title: input.title,
      href: input.href,
      progress: existing?.progress ?? 0,
      currentTime: startAt,
      durationSeconds: existing?.durationSeconds,
      lastOpenedAt: now,
      lastPlayedAt: now,
      status: "playing",
      youtubeId: input.youtubeId,
      artworkUrl: input.artworkUrl,
      description: input.description ?? existing?.description,
    };

    setSession(next);
    setCurrentTime(startAt);
    setMinimized(false);
    setIsPlaying(true);
    persist(next);
  }, [items, persist, session?.youtubeId]);

  const startSpotify = useCallback((input: StartSpotifyInput) => {
    const now = new Date().toISOString();
    audioRef.current?.pause();
    sendYoutubeCommand(youtubeRef.current, "pauseVideo");

    const existing = items[progressKey(input.platform, input.contentId)] ?? null;
    const startAt = resumeOffset(
      existing?.currentTime,
      existing?.durationSeconds,
    );
    embedStartRef.current = startAt;

    const embed = new URL(input.embedUrl, "https://open.spotify.com");
    embed.searchParams.set("theme", "0");
    embed.searchParams.set("autoplay", "1");

    if (startAt > 0) {
      embed.searchParams.set("t", String(Math.floor(startAt)));
    }

    if (session?.spotifyEmbedUrl?.includes(embed.pathname)) {
      setMinimized(false);
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
      durationSeconds: existing?.durationSeconds,
      lastOpenedAt: now,
      lastPlayedAt: now,
      status: "playing",
      spotifyEmbedUrl: embed.toString(),
      artworkUrl: input.artworkUrl,
      description: input.description ?? existing?.description,
    };

    setSession(next);
    setCurrentTime(startAt);
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
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = seconds;
    setCurrentTime(seconds);
  }, []);

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

    if (session) {
      const durationSeconds = duration || session.durationSeconds;
      persist({
        ...session,
        currentTime,
        durationSeconds,
        progress:
          durationSeconds && durationSeconds > 0
            ? clampProgress(currentTime / durationSeconds)
            : currentTime > 0
              ? 0.01
              : session.progress,
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

    const durationSeconds = duration || session.durationSeconds || 0;
    const next: PlatformProgress = {
      ...session,
      currentTime,
      durationSeconds,
      progress:
        durationSeconds > 0
          ? clampProgress(currentTime / durationSeconds)
          : currentTime > 0
            ? Math.max(session.progress, 0.01)
            : session.progress,
      lastPlayedAt: new Date().toISOString(),
      status: isPlaying ? "playing" : "paused",
    };

    const timer = window.setTimeout(() => {
      persist(next);
      setSession((current) =>
        current && current.contentId === next.contentId ? { ...current, ...next } : current,
      );
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
        const startAt = embedStartRef.current;
        if (startAt > 1) {
          sendYoutubeCommand(youtubeRef.current, "seekTo", [startAt, true]);
        }
      }

      const info = data.info;

      if (data.event === "infoDelivery" && info && typeof info === "object") {
        if (typeof info.currentTime === "number") {
          setCurrentTime(info.currentTime);
        }

        if (typeof info.duration === "number" && info.duration > 0) {
          setDuration(info.duration);
        }

        if (typeof info.playerState === "number") {
          setIsPlaying(info.playerState === 1);
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
          }${minimized && isPlaying ? " isPlaying" : ""}`}
        >
          {minimized ? null : (
            <div className="platformYoutubeChrome">
              <div>
                <p>
                  {session.spotifyEmbedUrl
                    ? "Spotify · GoldCast"
                    : "YouTube · GoldCast"}
                </p>
                <strong>{session.title}</strong>
              </div>
              <div>
                {session.youtubeId ? (
                  <button type="button" onClick={toggle}>
                    {isPlaying ? "Duraklat" : "Oynat"}
                  </button>
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

          <iframe
            key={session.youtubeId || session.spotifyEmbedUrl}
            ref={session.youtubeId ? youtubeRef : undefined}
            src={
              session.youtubeId
                ? youtubeEmbedSrc(
                    session.youtubeId,
                    true,
                    embedStartRef.current,
                  )
                : session.spotifyEmbedUrl
            }
            title={session.title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            onLoad={() => {
              if (session.youtubeId) {
                listenToYoutube(youtubeRef.current);
                if (embedStartRef.current > 1) {
                  sendYoutubeCommand(
                    youtubeRef.current,
                    "seekTo",
                    [embedStartRef.current, true],
                  );
                }
              }
            }}
          />

          {minimized ? (
            <div className="platformYoutubeMiniBar">
              <button
                type="button"
                className="platformYoutubeMiniTitle"
                onClick={expand}
              >
                <small>
                  {session.spotifyEmbedUrl
                    ? "Spotify · GoldCast"
                    : "YouTube · GoldCast"}
                </small>
                <strong>{session.title}</strong>
              </button>
              {session.youtubeId ? (
                <button
                  type="button"
                  className="platformYoutubeMiniPlay"
                  onClick={toggle}
                  aria-label={isPlaying ? "Duraklat" : "Oynat"}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>
              ) : (
                <button
                  type="button"
                  className="platformYoutubeMiniPlay"
                  onClick={expand}
                  aria-label="Oynatıcıyı aç"
                >
                  ▶
                </button>
              )}
              <button
                type="button"
                className="platformYoutubeMiniClose"
                onClick={stop}
                aria-label="Kapat"
              >
                ×
              </button>
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
