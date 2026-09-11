import { createSupabaseServerClient } from "../supabase/create-server-client";
import {
  ADMIN_OVERVIEW_CARDS,
  adminMetricValue,
  emptyAdminMetrics,
  istanbulDayStartIso,
  type AdminOverviewCardId,
} from "./access";
import {
  VISITOR_LABEL,
  describeEntry,
  describeLocation,
  isLiveAt,
} from "../presence/labels";

export type AdminOverviewMetric = {
  id: AdminOverviewCardId;
  title: string;
  href: string;
  value: number;
  hasSource: boolean;
  empty: string;
};

export type AdminVisitorRow = {
  id: string;
  label: string;
  location: string;
  entry: string;
  path: string;
  live: boolean;
  lastSeenAt: string | null;
};

export type AdminEventRow = {
  id: string;
  label: string;
  path: string;
  source: string;
  location: string;
  createdAt: string;
  href: string | null;
};

function asText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

export { emptyAdminMetrics };

export async function loadAdminLive() {
  const supabase = await createSupabaseServerClient();
  const memberStart = istanbulDayStartIso();

  let memberCount = 0;
  let visitCount = 0;
  let liveCount = 0;
  let appointmentCount = 0;
  let whatsappCount = 0;
  let purchaseCount = 0;
  let notificationCount = 0;
  let visitors: AdminVisitorRow[] = [];
  let whatsapp: AdminEventRow[] = [];
  let purchases: AdminEventRow[] = [];
  let appointments: AdminEventRow[] = [];

  if (supabase) {
    const [members, visits, liveRows, events, sessionPack] = await Promise.all([
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .gte("created_at", memberStart),
      supabase
        .from("site_visitors")
        .select("visitor_key", { count: "exact", head: true })
        .gte("last_seen_at", memberStart),
      supabase
        .from("site_visitors")
        .select(
          "visitor_key, first_path, first_referrer, country, region, city, last_path, last_seen_at",
        )
        .gte("last_seen_at", memberStart)
        .order("last_seen_at", { ascending: false })
        .limit(80),
      supabase
        .from("site_events")
        .select("id, kind, path, source, href, country, region, city, created_at")
        .gte("created_at", memberStart)
        .in("kind", ["whatsapp", "purchase", "appointment"])
        .order("created_at", { ascending: false })
        .limit(120),
      supabase.auth.getSession(),
    ]);

    memberCount = members.count ?? 0;
    visitCount = visits.count ?? 0;

    const visitorRows = liveRows.data ?? [];
    visitors = visitorRows.map((row) => {
      const lastSeenAt = asText(row.last_seen_at) || null;
      const path = asText(row.last_path) || "/";
      return {
        id: asText(row.visitor_key),
        label: VISITOR_LABEL,
        location: describeLocation(
          asText(row.city) || null,
          asText(row.region) || null,
          asText(row.country) || null,
        ),
        entry: describeEntry(
          asText(row.first_path) || "/",
          asText(row.first_referrer) || null,
        ),
        path,
        live: isLiveAt(lastSeenAt) && !path.startsWith("/admin"),
        lastSeenAt,
      };
    });
    liveCount = visitors.filter((row) => row.live).length;

    const mapped = (events.data ?? []).map((row) => {
      const item: AdminEventRow = {
        id: asText(row.id),
        label: VISITOR_LABEL,
        path: asText(row.path) || "/",
        source: asText(row.source) || "Direkt",
        location: describeLocation(
          asText(row.city) || null,
          asText(row.region) || null,
          asText(row.country) || null,
        ),
        createdAt: asText(row.created_at),
        href: asText(row.href) || null,
      };
      return { kind: asText(row.kind), item };
    });

    whatsapp = mapped.filter((row) => row.kind === "whatsapp").map((row) => row.item);
    purchases = mapped.filter((row) => row.kind === "purchase").map((row) => row.item);
    appointments = mapped
      .filter((row) => row.kind === "appointment")
      .map((row) => row.item);
    whatsappCount = whatsapp.length;
    purchaseCount = purchases.length;
    appointmentCount = appointments.length;

    const userId = sessionPack.data.session?.user?.id;
    if (userId) {
      const notes = await supabase
        .from("comment_notifications")
        .select("id", { count: "exact", head: true })
        .eq("recipient_id", userId)
        .is("read_at", null);
      notificationCount = notes.count ?? 0;
    }
  }

  const counts: Record<AdminOverviewCardId, number> = {
    visits: visitCount,
    live: liveCount,
    members: memberCount,
    appointments: appointmentCount,
    whatsapp: whatsappCount,
    purchases: purchaseCount,
    notifications: notificationCount,
    suggestions: 0,
  };

  const metrics = ADMIN_OVERVIEW_CARDS.map((card) => ({
    id: card.id,
    title: card.title,
    href: card.href,
    hasSource: card.hasSource,
    empty: card.empty,
    value: adminMetricValue(card.hasSource, counts[card.id]),
  }));

  return {
    metrics,
    visitors,
    whatsapp,
    purchases,
    appointments,
  };
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
