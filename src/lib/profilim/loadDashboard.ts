import { assembleDashboard, emptyDashboardSources } from "./dashboard";
import type { ProfilimDashboardData } from "./types";

export async function loadProfilimDashboard(): Promise<ProfilimDashboardData> {
  // Session is resolved in the browser. Waiting on getUser here kept /profilim
  // from ever sending HTML when Supabase was slow.
  return assembleDashboard(emptyDashboardSources(null));
}
