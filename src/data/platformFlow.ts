export const PLATFORM_IDS = [
  "goldbook",
  "goldcast",
  "goldfrekans",
  "goldmind",
  "goldblog",
] as const;

export type PlatformId = (typeof PLATFORM_IDS)[number];

export type PlatformContentType = "audio" | "reading" | "video";

export type PlatformProgressStatus =
  | "idle"
  | "playing"
  | "paused"
  | "completed";

export type PlatformProgress = {
  platform: PlatformId;
  contentId: string;
  contentType: PlatformContentType;
  title: string;
  href: string;
  progress: number;
  currentTime?: number;
  durationSeconds?: number;
  lastOpenedAt: string;
  lastPlayedAt?: string | null;
  status: PlatformProgressStatus;
  audioUrl?: string;
  youtubeId?: string;
  spotifyEmbedUrl?: string;
  description?: string;
};

export type PlatformDefinition = {
  id: PlatformId;
  name: string;
  tagline: string;
  href: string;
  contentType: PlatformContentType;
  tone: "cream" | "taupe" | "cocoa" | "gold";
  mark: string;
};

export const PLATFORM_CATALOG: PlatformDefinition[] = [
  {
    id: "goldbook",
    name: "GoldBook",
    tagline: "Dijital kitaplar",
    href: "/goldbook",
    contentType: "reading",
    tone: "cream",
    mark: "✦",
  },
  {
    id: "goldcast",
    name: "GoldCast",
    tagline: "Sohbet ve yayınlar",
    href: "/goldcast",
    contentType: "video",
    tone: "taupe",
    mark: "◎",
  },
  {
    id: "goldfrekans",
    name: "GoldFrekans",
    tagline: "Frekans ve doğa sesleri",
    href: "/goldfrekans",
    contentType: "audio",
    tone: "cocoa",
    mark: "◌",
  },
  {
    id: "goldmind",
    name: "GoldMind",
    tagline: "Meditasyon & Nefes Alanı",
    href: "/goldmind",
    contentType: "audio",
    tone: "gold",
    mark: "✧",
  },
  {
    id: "goldblog",
    name: "GoldBlog",
    tagline: "Yazılar ve farkındalık",
    href: "/goldblog",
    contentType: "reading",
    tone: "cream",
    mark: "◇",
  },
];

export function progressKey(platform: PlatformId, contentId: string) {
  return `${platform}:${contentId}`;
}

export function clampProgress(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(1, Math.max(0, value));
}

export function formatProgressPercent(progress: number) {
  return `${Math.round(clampProgress(progress) * 100)}%`;
}

export function resumeOffset(currentTime?: number, durationSeconds?: number) {
  let duration = Number(durationSeconds) || 0;
  if (duration > 10_000) {
    duration /= 1000;
  }

  let time = Number(currentTime) || 0;
  if (time > 10_000) {
    time /= 1000;
  }

  const trusted = duration >= 90;

  if (trusted && time > duration + 2) {
    const asMs = time / 1000;
    time = asMs <= duration + 1.5 ? asMs : 0;
  }

  if (time < 2) {
    return 0;
  }

  // Only treat as finished when duration looks like a real episode, not a
  // leftover / preview clock that would restart the recording at 100%.
  if (
    trusted &&
    time >= Math.max(duration - 8, duration * 0.97) &&
    time <= duration + 1.5
  ) {
    return 0;
  }

  if (trusted) {
    return Math.min(time, Math.max(0, duration - 1));
  }

  return time;
}
