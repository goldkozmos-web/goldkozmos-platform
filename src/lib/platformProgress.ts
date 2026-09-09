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

export function getLatestProgress(
  map: PlatformProgressMap,
): PlatformProgress | null {
  const items = Object.values(map).filter((item) => item.progress > 0);

  if (items.length === 0) {
    return null;
  }

  return items.sort((a, b) => {
    const aTime = Date.parse(a.lastPlayedAt || a.lastOpenedAt || "") || 0;
    const bTime = Date.parse(b.lastPlayedAt || b.lastOpenedAt || "") || 0;
    return bTime - aTime;
  })[0];
}

export function getProgressForPlatform(
  map: PlatformProgressMap,
  platform: PlatformId,
): PlatformProgress | null {
  const items = Object.values(map).filter(
    (item) => item.platform === platform && item.progress > 0,
  );

  if (items.length === 0) {
    return null;
  }

  return items.sort((a, b) => {
    const aTime = Date.parse(a.lastPlayedAt || a.lastOpenedAt || "") || 0;
    const bTime = Date.parse(b.lastPlayedAt || b.lastOpenedAt || "") || 0;
    return bTime - aTime;
  })[0];
}
