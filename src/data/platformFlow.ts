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
