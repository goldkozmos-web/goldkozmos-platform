import { xpForKind } from "./activityXp";
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

export { ACTIVITY_XP } from "./activityXp";

export function xpFromActivities(activities: ProfilimActivity[]) {
  return activities.reduce((sum, activity) => {
    const awarded =
      typeof activity.xp === "number" && Number.isFinite(activity.xp)
        ? activity.xp
        : xpForKind(activity.kind);

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
