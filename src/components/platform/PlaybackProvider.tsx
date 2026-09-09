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
  type PlatformId,
  type PlatformProgress,
} from "../../data/platformFlow";
import {
  getLatestProgress,
  getProgressForPlatform,
  readPlatformProgressMap,
  upsertProgressEntry,
  writePlatformProgressMap,
  type PlatformProgressMap,
} from "../../lib/platformProgress";
import { sendYoutubeCommand, youtubeEmbedSrc } from "../../lib/youtube";

type PlaybackSession = PlatformProgress & {
  audioUrl?: string;
  youtubeId?: string;
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
  const [items, setItems] = useState<PlatformProgressMap>({});
  const [session, setSession] = useState<PlaybackSession | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readPlatformProgressMap());
    setReady(true);
  }, []);

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

    setItems((current) => {
      const existing = current[`${input.platform}:${input.contentId}`] ?? null;
      const next: PlaybackSession = {
        platform: input.platform,
        contentId: input.contentId,
        contentType: "audio",
        title: input.title,
        href: input.href,
        progress: existing?.progress ?? 0,
        currentTime: input.currentTime ?? existing?.currentTime ?? 0,
        durationSeconds: existing?.durationSeconds,
        lastOpenedAt: now,
        lastPlayedAt: now,
        status: "playing",
        audioUrl: input.audioUrl,
        description: input.description ?? existing?.description,
      };

      setSession(next);
      setMinimized(false);

      const audio = audioRef.current;

      if (audio) {
        if (audio.getAttribute("src") !== input.audioUrl) {
          audio.src = input.audioUrl;
        }

        audio.currentTime = next.currentTime ?? 0;
        void audio.play().then(
          () => setIsPlaying(true),
          () => setIsPlaying(false),
        );
      }

      sendYoutubeCommand(youtubeRef.current, "pauseVideo");

      const map = upsertProgressEntry(current, next);
      writePlatformProgressMap(map);
      return map;
    });
  }, []);

  const startYoutube = useCallback((input: StartYoutubeInput) => {
    const now = new Date().toISOString();
    const audio = audioRef.current;
    audio?.pause();

    setItems((current) => {
      const existing = current[`${input.platform}:${input.contentId}`] ?? null;
      const next: PlaybackSession = {
        platform: input.platform,
        contentId: input.contentId,
        contentType: "video",
        title: input.title,
        href: input.href,
        progress: existing?.progress ?? 0,
        currentTime: existing?.currentTime ?? 0,
        durationSeconds: existing?.durationSeconds,
        lastOpenedAt: now,
        lastPlayedAt: now,
        status: "playing",
        youtubeId: input.youtubeId,
        description: input.description ?? existing?.description,
      };

      setSession(next);
      setMinimized(false);
      setIsPlaying(true);

      const map = upsertProgressEntry(current, next);
      writePlatformProgressMap(map);
      return map;
    });
  }, []);

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
    sendYoutubeCommand(youtubeRef.current, "stopVideo");
    setIsPlaying(false);
    setSession(null);
    setMinimized(false);
  }, []);

  useEffect(() => {
    if (!session || !ready || session.youtubeId) {
      return;
    }

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const next: PlatformProgress = {
      ...session,
      currentTime,
      durationSeconds: duration || session.durationSeconds,
      progress: duration > 0 ? clampProgress(currentTime / duration) : session.progress,
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
      {session?.youtubeId ? (
        <div
          className={`platformYoutubeShell${minimized ? " isMini" : " isStage"}`}
        >
          {minimized ? null : (
            <div className="platformYoutubeChrome">
              <div>
                <p>YouTube · GoldCast</p>
                <strong>{session.title}</strong>
              </div>
              <div>
                <button type="button" onClick={toggle}>
                  {isPlaying ? "Duraklat" : "Oynat"}
                </button>
                <button type="button" onClick={minimize}>
                  Küçült
                </button>
                <button type="button" onClick={stop}>
                  Kapat
                </button>
              </div>
            </div>
          )}

          <iframe
            ref={youtubeRef}
            src={youtubeEmbedSrc(session.youtubeId, true)}
            title={session.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />

          {minimized ? (
            <div className="platformYoutubeMiniBar">
              <button type="button" onClick={expand}>
                {session.title}
              </button>
              <button type="button" onClick={toggle}>
                {isPlaying ? "❚❚" : "▶"}
              </button>
              <button type="button" onClick={stop} aria-label="Kapat">
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
