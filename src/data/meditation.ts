export const MEDITATION_CATEGORIES = [
  "Meditasyon",
  "Nefes",
  "Gevşeme",
  "Uyku",
  "Odaklanma",
] as const;

export type MeditationCategory =
  (typeof MEDITATION_CATEGORIES)[number];

export const MEDITATION_FILTERS = [
  "Tümü",
  ...MEDITATION_CATEGORIES,
] as const;

export type MeditationFilter =
  (typeof MEDITATION_FILTERS)[number];

export const GOLDMIND_FOCUS_QUERY: Record<string, MeditationFilter> = {
  sakinles: "Gevşeme",
  odaklanma: "Odaklanma",
  nefes: "Nefes",
  dinlenme: "Uyku",
};

export function meditationFilterFromFocus(
  focus: string | null | undefined,
): MeditationFilter | null {
  if (!focus) {
    return null;
  }

  return GOLDMIND_FOCUS_QUERY[focus] ?? null;
}

export type MeditationPractice = {
  id: string;
  title: string;
  category: MeditationCategory;
  duration: string;
  description: string;
  image: string;
  audioUrl: string;
  isAvailable: boolean;
  isFeatured?: boolean;
  progress?: number;
  lastPlayedAt?: string | null;
  currentTime?: number;
  durationSeconds?: number;
};

export type GoldMindMoodId =
  | "calm"
  | "focus"
  | "tired"
  | "sleep"
  | "breath";

export const GOLDMIND_MOODS: {
  id: GoldMindMoodId;
  label: string;
  filter: MeditationFilter;
}[] = [
  {
    id: "calm",
    label: "Sakinleşmek istiyorum",
    filter: "Gevşeme",
  },
  {
    id: "focus",
    label: "Odaklanmak istiyorum",
    filter: "Odaklanma",
  },
  {
    id: "tired",
    label: "Yoruldum",
    filter: "Gevşeme",
  },
  {
    id: "sleep",
    label: "Uykuya hazırlanıyorum",
    filter: "Uyku",
  },
  {
    id: "breath",
    label: "Nefes almak istiyorum",
    filter: "Nefes",
  },
];

export const GOLDMIND_QUICK_ACCESS = [
  { label: "Meditasyon", filter: "Meditasyon", icon: "✦", tone: "cream" },
  { label: "Nefes", filter: "Nefes", icon: "○", tone: "taupe" },
  { label: "Sakinleş", filter: "Gevşeme", icon: "◌", tone: "cocoa" },
  { label: "Odaklan", filter: "Odaklanma", icon: "◇", tone: "gold" },
  { label: "Uyku", filter: "Uyku", icon: "☾", tone: "cocoa" },
  { label: "Gevşeme", filter: "Gevşeme", icon: "✧", tone: "taupe" },
] as const;

export const GOLDMIND_COLLECTIONS = [
  {
    id: "uyku",
    title: "Uyku İçin",
    category: "Uyku" as MeditationCategory,
  },
  {
    id: "5-dakika",
    title: "5 Dakikalık Pratikler",
    category: null,
  },
  {
    id: "nefes",
    title: "Nefes Egzersizleri",
    category: "Nefes" as MeditationCategory,
  },
  {
    id: "odaklanma",
    title: "Odaklanma",
    category: "Odaklanma" as MeditationCategory,
  },
  {
    id: "gevşeme",
    title: "Gevşeme",
    category: "Gevşeme" as MeditationCategory,
  },
] as const;

export const meditationPractices: MeditationPractice[] = [];

export function getMeditationPractices(): MeditationPractice[] {
  return meditationPractices;
}

export function getMeditationPracticesByFilter(
  filter: MeditationFilter,
): MeditationPractice[] {
  if (filter === "Tümü") {
    return meditationPractices;
  }

  return meditationPractices.filter(
    (practice) => practice.category === filter,
  );
}

export function isMeditationPlayable(
  practice: MeditationPractice,
): boolean {
  if (!practice.isAvailable) {
    return false;
  }

  const url = practice.audioUrl.trim();

  return (
    url.startsWith("/audio/") ||
    url.startsWith("https://") ||
    url.startsWith("http://")
  );
}

export function getPracticeProgress(
  practice: MeditationPractice,
): number {
  if (
    typeof practice.progress === "number" &&
    Number.isFinite(practice.progress)
  ) {
    return Math.min(1, Math.max(0, practice.progress));
  }

  const duration = practice.durationSeconds ?? 0;
  const current = practice.currentTime ?? 0;

  if (duration <= 0 || current <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, current / duration));
}

export function getRemainingListenLabel(
  practice: MeditationPractice,
): string | null {
  const duration = practice.durationSeconds;
  const current = practice.currentTime;

  if (
    typeof duration !== "number" ||
    typeof current !== "number" ||
    duration <= 0 ||
    current < 0 ||
    current >= duration
  ) {
    return null;
  }

  const remainingMinutes = Math.max(
    1,
    Math.ceil((duration - current) / 60),
  );

  return `${remainingMinutes} dk kaldı`;
}

export function getFeaturedPractices(): MeditationPractice[] {
  return meditationPractices.filter(
    (practice) => practice.isFeatured,
  );
}

export function getContinueListening(): MeditationPractice[] {
  return meditationPractices
    .filter((practice) => {
      const progress = getPracticeProgress(practice);

      return Boolean(practice.lastPlayedAt) && progress > 0 && progress < 1;
    })
    .sort((a, b) => {
      const aTime = a.lastPlayedAt ? Date.parse(a.lastPlayedAt) : 0;
      const bTime = b.lastPlayedAt ? Date.parse(b.lastPlayedAt) : 0;

      return bTime - aTime;
    });
}

export function getTodaysPicks(
  filter: MeditationFilter = "Tümü",
): MeditationPractice[] {
  return getMeditationPracticesByFilter(filter);
}

export function getCollectionPractices(
  collectionId: (typeof GOLDMIND_COLLECTIONS)[number]["id"],
): MeditationPractice[] {
  const collection = GOLDMIND_COLLECTIONS.find(
    (item) => item.id === collectionId,
  );

  if (!collection) {
    return [];
  }

  if (collection.id === "5-dakika") {
    return meditationPractices.filter((practice) =>
      /(?:^|\s)5(?:\s|-)?(?:dk|dakika)/i.test(practice.duration),
    );
  }

  if (!collection.category) {
    return [];
  }

  return meditationPractices.filter(
    (practice) => practice.category === collection.category,
  );
}
