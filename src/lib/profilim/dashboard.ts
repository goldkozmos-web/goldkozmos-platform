import { levelFromXp, xpFromActivities } from "./level";
import type {
  ProfilimDashboardData,
  ProfilimDashboardSources,
} from "./types";

export function emptyDashboardSources(
  user: ProfilimDashboardSources["user"] = null,
): ProfilimDashboardSources {
  return {
    user,
    purchases: [],
    favorites: [],
    appointments: [],
    pdfAnalyses: [],
    library: [],
    journalEntries: [],
    letters: [],
    recentActivity: [],
    continueItems: [],
    todayNeed: null,
  };
}

export function assembleDashboard(
  sources: ProfilimDashboardSources,
): ProfilimDashboardData {
  const xp = xpFromActivities(sources.recentActivity);
  const level = levelFromXp(xp);

  return {
    ...sources,
    xp,
    level,
    progress: {
      completedCount: sources.recentActivity.length,
      xp,
      recentActivity: sources.recentActivity,
    },
  };
}
