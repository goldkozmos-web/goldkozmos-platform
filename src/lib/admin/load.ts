import { createSupabaseServerClient } from "../supabase/create-server-client";
import {
  ADMIN_OVERVIEW_CARDS,
  adminMetricValue,
  istanbulDayStartIso,
  type AdminOverviewCardId,
} from "./access";

export type AdminOverviewMetric = {
  id: AdminOverviewCardId;
  title: string;
  href: string;
  value: number;
  hasSource: boolean;
  empty: string;
};

export async function loadAdminOverviewMetrics(): Promise<AdminOverviewMetric[]> {
  const supabase = await createSupabaseServerClient();
  const memberStart = istanbulDayStartIso();
  let memberCount = 0;

  if (supabase) {
    const { count } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .gte("created_at", memberStart);

    memberCount = count ?? 0;
  }

  return ADMIN_OVERVIEW_CARDS.map((card) => ({
    id: card.id,
    title: card.title,
    href: card.href,
    hasSource: card.hasSource,
    empty: card.empty,
    value: adminMetricValue(
      card.hasSource,
      card.id === "members" ? memberCount : 0,
    ),
  }));
}

export type AdminMemberRow = {
  id: string;
  displayName: string;
  role: string;
  createdAt: string | null;
};

export async function loadAdminMembers(): Promise<AdminMemberRow[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data } = await supabase
    .from("profiles")
    .select("id, display_name, role, created_at")
    .order("created_at", { ascending: false })
    .limit(80);

  return (data ?? []).map((row) => ({
    id: String(row.id),
    displayName:
      (typeof row.display_name === "string" && row.display_name.trim()) ||
      "GoldKozmos üyesi",
    role: row.role === "admin" ? "admin" : "user",
    createdAt: typeof row.created_at === "string" ? row.created_at : null,
  }));
}
