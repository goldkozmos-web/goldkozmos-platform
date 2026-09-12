/** Normalize player clocks so progress never races ahead of the real recording. */

export const MIN_TRUSTED_DURATION_SECONDS = 15;
const MS_CLOCK_THRESHOLD = 10_000;
const MAX_EPISODE_SECONDS = 4 * 60 * 60;

/**
 * Spotify IFrame API documents duration/position in milliseconds.
 * Some events (and YouTube) already send seconds. Treat large values as ms.
 * Values just above a trusted duration are also treated as leftover ms
 * (e.g. 4500 meaning 4.5s, not 4500s).
 */
export function secondsFromPlayerClock(
  value: unknown,
  trustedDuration?: number,
): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return undefined;
  }

  if (value > MS_CLOCK_THRESHOLD) {
    return value / 1000;
  }

  if (
    trustedDuration != null &&
    trustedDuration >= MIN_TRUSTED_DURATION_SECONDS &&
    value > trustedDuration + 2
  ) {
    const asMs = value / 1000;
    if (asMs <= trustedDuration + 1.5) {
      return asMs;
    }
    return undefined;
  }

  if (value > MAX_EPISODE_SECONDS) {
    return value / 1000;
  }

  return value;
}

export function sanitizeStoredSeconds(value: unknown, trustedDuration?: number): number {
  return secondsFromPlayerClock(value, trustedDuration) ?? 0;
}

/**
 * Spotify `playback_update` always reports position and duration in milliseconds,
 * including values under 10s (1500 === 1.5s, not 1500s).
 */
export function secondsFromSpotifyClock(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return undefined;
  }

  return value / 1000;
}

export function normalizePlaybackClocks(data: {
  position?: unknown;
  duration?: unknown;
  currentTime?: unknown;
}): { position?: number; duration?: number } {
  return {
    position: secondsFromSpotifyClock(data.position ?? data.currentTime),
    duration: secondsFromSpotifyClock(data.duration),
  };
}

/** Keep a plausible episode length; ignore tiny / preview clocks that inflate %. */
export function pickTrustedDuration(current: number, incoming?: number): number {
  if (incoming == null || !Number.isFinite(incoming) || incoming < MIN_TRUSTED_DURATION_SECONDS) {
    return current;
  }
  if (current >= 60 && incoming < current * 0.25) {
    return current;
  }
  return incoming;
}

export function isTrustedDuration(duration: number): boolean {
  return Number.isFinite(duration) && duration >= MIN_TRUSTED_DURATION_SECONDS;
}

/**
 * Progress for storage / continue card.
 * Never reports 100% unless we are actually near the end of a trusted duration.
 */
export function progressFromPlayback(currentTime: number, duration: number): number | undefined {
  if (!isTrustedDuration(duration) || !Number.isFinite(currentTime) || currentTime < 0) {
    return undefined;
  }
  // Stale leftover duration from a previous clip — do not mark complete.
  if (currentTime > duration + 1.5) {
    return undefined;
  }
  const ratio = currentTime / duration;
  const remaining = duration - currentTime;
  if (remaining <= 8 && ratio >= 0.97) {
    return 1;
  }
  return Math.min(0.99, Math.max(0, ratio));
}

export function mergePlaybackFields(
  session: { progress: number; durationSeconds?: number },
  currentTime: number,
  duration: number,
): { currentTime: number; durationSeconds: number; progress: number } {
  const durationSeconds = pickTrustedDuration(session.durationSeconds ?? 0, duration);
  const progress = progressFromPlayback(currentTime, durationSeconds);
  return {
    currentTime,
    durationSeconds,
    progress:
      progress ??
      displayProgressFromItem({
        progress: session.progress,
        currentTime,
        durationSeconds,
      }),
  };
}

export function displayProgressFromItem(item: {
  progress?: number;
  currentTime?: number;
  durationSeconds?: number;
}): number {
  const live = progressFromPlayback(item.currentTime ?? 0, item.durationSeconds ?? 0);
  if (live != null) {
    return live;
  }
  const stored = item.progress;
  if (typeof stored !== "number" || !Number.isFinite(stored)) {
    return 0;
  }
  if (!isTrustedDuration(item.durationSeconds ?? 0) && stored >= 0.97) {
    return item.currentTime && item.currentTime > 0 ? 0.01 : 0;
  }
  return Math.min(1, Math.max(0, stored));
}
