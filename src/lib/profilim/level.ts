import type { ProfilimActivity, ProfilimLevel } from "./types";

export const XP_PER_LEVEL = 100;

export const LEVEL_TITLES = [
  "Başlangıç",
  "Uyanış",
  "Yol",
  "Derinlik",
  "Rezonans",
  "Ustalık",
] as const;

export const ACTIVITY_XP: Record<ProfilimActivity["kind"], number> = {
  lesson: 20,
  content: 15,
  session: 40,
  journal: 10,
  letter: 15,
  analysis: 25,
};

export function xpFromActivities(activities: ProfilimActivity[]) {
  return activities.reduce((sum, activity) => {
    const awarded =
      typeof activity.xp === "number" && Number.isFinite(activity.xp)
        ? activity.xp
        : ACTIVITY_XP[activity.kind];

    return sum + Math.max(0, awarded);
  }, 0);
}

export function levelFromXp(xp: number): ProfilimLevel {
  const safeXp = Math.max(0, Math.floor(xp));
  const level = Math.floor(safeXp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = safeXp % XP_PER_LEVEL;
  const title =
    LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length) - 1] ?? "Ustalık";

  return {
    level,
    title,
    xp: safeXp,
    xpIntoLevel,
    xpForNextLevel: XP_PER_LEVEL,
    progress: xpIntoLevel / XP_PER_LEVEL,
  };
}
