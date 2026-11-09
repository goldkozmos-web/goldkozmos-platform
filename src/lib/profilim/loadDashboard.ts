import { assembleDashboard, emptyDashboardSources } from "./dashboard";
import type { ProfilimDashboardData } from "./types";
import { getProfilimSessionUser } from "./auth.server";
import { createSupabaseServerClient } from "../supabase/create-server-client";
import { mapProfileActivity } from "./activity";

export async function loadProfilimDashboard(): Promise<ProfilimDashboardData> {
  const user = await getProfilimSessionUser();
  const sources = emptyDashboardSources(user);
  const client = user ? await createSupabaseServerClient() : null;
  if (client && user) {
    const activity = await client.from("user_activity").select("id,kind,title,created_at").eq("user_id",user.id).order("created_at", {ascending:false}).limit(500);
    if (activity.data) sources.recentActivity = activity.data.map(mapProfileActivity);
  }
  return assembleDashboard(sources);
}
