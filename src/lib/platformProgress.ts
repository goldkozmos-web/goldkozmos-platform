import {
  clampProgress,
  progressKey,
  type PlatformId,
  type PlatformProgress,
} from "../data/platformFlow";

export const PLATFORM_PROGRESS_STORAGE_KEY =
  "goldkozmos-platform-progress-v1";

export type PlatformProgressMap = Record<string, PlatformProgress>;

function isProgress(value: unknown): value is PlatformProgress {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as PlatformProgress;

  return (
    typeof item.platform === "string" &&
    typeof item.contentId === "string" &&
    typeof item.title === "string" &&
    typeof item.href === "string" &&
    typeof item.progress === "number"
  );
}

export function readPlatformProgressMap(): PlatformProgressMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(PLATFORM_PROGRESS_STORAGE_KEY);

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as PlatformProgressMap;

    return Object.fromEntries(
      Object.entries(parsed).filter(([, item]) => isProgress(item)),
    );
  } catch {
    return {};
  }
}

export function writePlatformProgressMap(map: PlatformProgressMap) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      PLATFORM_PROGRESS_STORAGE_KEY,
      JSON.stringify(map),
    );
  } catch {
    // Private mode / blocked storage should not prevent in-app playback.
  }
}

export function upsertProgressEntry(
  map: PlatformProgressMap,
  entry: PlatformProgress,
): PlatformProgressMap {
  const next = { ...map };
  next[progressKey(entry.platform, entry.contentId)] = {
    ...entry,
    progress: clampProgress(entry.progress),
  };
  return next;
}

export function resetProgressEntry(
  map: PlatformProgressMap,
  entry: PlatformProgress,
): PlatformProgressMap {
  return upsertProgressEntry(map, {
    ...entry,
    progress: 0,
    currentTime: 0,
    status: "idle",
    lastPlayedAt: new Date().toISOString(),
  });
}

function isResumeCandidate(item: PlatformProgress) {
  return item.progress > 0 || (Number(item.currentTime) || 0) > 0;
}

function newestFirst(a: PlatformProgress, b: PlatformProgress) {
  const aTime = Date.parse(a.lastPlayedAt || a.lastOpenedAt || "") || 0;
  const bTime = Date.parse(b.lastPlayedAt || b.lastOpenedAt || "") || 0;
  return bTime - aTime;
}

export function getLatestProgress(
  map: PlatformProgressMap,
): PlatformProgress | null {
  const items = Object.values(map).filter(isResumeCandidate);

  if (items.length === 0) {
    return null;
  }

  return items.sort(newestFirst)[0];
}

export const LIVE_PLAYBACK_STORAGE_KEY =
  "goldkozmos-live-playback-v1";

export type LivePlaybackState = {
  session: PlatformProgress & {
    artworkUrl?: string;
    audioUrl?: string;
  };
  minimized: boolean;
  isPlaying: boolean;
};

function isLivePlayback(value: unknown): value is LivePlaybackState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const live = value as LivePlaybackState;

  return (
    isProgress(live.session) &&
    typeof live.minimized === "boolean" &&
    typeof live.isPlaying === "boolean"
  );
}

export function readLivePlayback(): LivePlaybackState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(LIVE_PLAYBACK_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as unknown;

    return isLivePlayback(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeLivePlayback(state: LivePlaybackState | null) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (!state) {
      window.sessionStorage.removeItem(LIVE_PLAYBACK_STORAGE_KEY);
      return;
    }

    window.sessionStorage.setItem(
      LIVE_PLAYBACK_STORAGE_KEY,
      JSON.stringify(state),
    );
  } catch {
    // Ignore storage failures; playback can still continue in-memory.
  }
}

export function getProgressForPlatform(
  map: PlatformProgressMap,
  platform: PlatformId,
): PlatformProgress | null {
  const items = Object.values(map).filter(
    (item) => item.platform === platform && isResumeCandidate(item),
  );

  if (items.length === 0) {
    return null;
  }

  return items.sort(newestFirst)[0];
}
