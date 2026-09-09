import { getProfilimSessionUser } from "./auth.server";
import { assembleDashboard, emptyDashboardSources } from "./dashboard";
import type { ProfilimDashboardData } from "./types";

export async function loadProfilimDashboard(): Promise<ProfilimDashboardData> {
  const user = await getProfilimSessionUser();

  return assembleDashboard(emptyDashboardSources(user));
}
