import type { SupabaseClient } from "@supabase/supabase-js";

import { createSupabaseServerClient } from "../supabase/create-server-client";
import {
  ADMIN_OVERVIEW_CARDS,
  adminMetricValue,
  emptyAdminMetrics,
  istanbulDayStartIso,
  type AdminOverviewCardId,
} from "./access";
import { listGoogleAuthMembers } from "../supabase/service";
import {
  isMemberVisitorKey,
  membersFromVisitorRows,
} from "./member-keys";
import {
  mergeMemberRows,
  parseRemovedMemberContent,
  REMOVED_MEMBERS_POST,
  withoutRemovedMembers,
  type SiteMemberRow,
} from "./members";
import {
  VISITOR_LABEL,
  describeEntry,
  describeLocation,
  isLiveAt,
} from "../presence/labels";
import { SUGGESTIONS_POST } from "./suggestions";

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

export type AdminActivityItem = {
  id: string;
  at: string;
  who: string;
  text: string;
};

export type AdminRangeStats = {
  visits: number;
  uniques: number;
  members: number;
  appointments: number;
  whatsapp?: number;
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

export type AdminMemberRow = SiteMemberRow;

function mapMemberRow(row: Record<string, unknown>): AdminMemberRow {
  return {
    id: asText(row.id) || asText(row.auth_user_id),
    displayName:
      asText(row.display_name) || asText(row.displayName) || "GoldKozmos üyesi",
    role: asText(row.role) === "admin" ? "admin" : "user",
    email: asText(row.email) || null,
    createdAt: asText(row.created_at) || asText(row.createdAt) || null,
    source: asText(row.source) || "google",
    status: asText(row.status) || "active",
    authUserId: asText(row.auth_user_id) || asText(row.authUserId) || null,
    city: asText(row.city) || null,
    age: asText(row.age) || (typeof row.age === "number" ? String(row.age) : null),
    phone: asText(row.phone) || null,
    interests: asText(row.interests) || null,
    lastSignInAt: asText(row.last_sign_in_at) || asText(row.lastSignInAt) || null,
    lastActiveAt: asText(row.last_active_at) || asText(row.lastActiveAt) || null,
    avatarUrl: asText(row.avatar_url) || asText(row.avatarUrl) || null,
  };
}

async function rpcRows(supabase: SupabaseClient, name: string) {
  const rpc = await supabase.rpc(name);
  if (rpc.error || !Array.isArray(rpc.data)) return [];
  return rpc.data.map((row) => mapMemberRow(row as Record<string, unknown>));
}

export const MEMBER_LOG_SINCE = "2020-01-01T00:00:00.000Z";

async function fetchRemovedMembers(supabase: SupabaseClient) {
  const pack = await supabase
    .from("comments")
    .select("content")
    .eq("post_id", REMOVED_MEMBERS_POST)
    .limit(500);
  if (pack.error || !Array.isArray(pack.data)) return [];
  return pack.data
    .map((row) => parseRemovedMemberContent(asText(row.content)))
    .filter((row): row is { email: string; authUserId: string } => Boolean(row));
}

async function fetchLoggedMembers(supabase: SupabaseClient) {
  const live = await supabase.rpc("list_live_visitors", {
    p_since: MEMBER_LOG_SINCE,
  });
  if (live.error || !Array.isArray(live.data)) return [];
  return membersFromVisitorRows(live.data as Record<string, unknown>[]);
}

async function fetchAdminMembers(
  supabase: SupabaseClient,
): Promise<AdminMemberRow[]> {
  const listed = await supabase.rpc("admin_list_members");
  if (!listed.error && Array.isArray(listed.data) && listed.data.length > 0) {
    return listed.data.map((row) =>
      mapMemberRow({
        ...(row as Record<string, unknown>),
        auth_user_id: (row as { id?: string }).id,
        source: "google",
        status: "active",
      }),
    );
  }
  if (listed.error) {
    console.warn("admin_list_members", listed.error.message);
  }
  const [roster, classic, authUsers, loggedLive, removed] = await Promise.all([
    rpcRows(supabase, "list_admin_roster"),
    rpcRows(supabase, "list_site_members"),
    listGoogleAuthMembers(),
    fetchLoggedMembers(supabase),
    fetchRemovedMembers(supabase),
  ]);

  const wide = await supabase
    .from("site_members")
    .select(
      "id, display_name, email, source, status, auth_user_id, created_at, first_name, last_name, city, age, interests, phone",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  const table = wide.error
    ? await supabase
        .from("site_members")
        .select("id, display_name, email, source, status, auth_user_id, created_at")
        .order("created_at", { ascending: false })
        .limit(200)
    : wide;

  const profiles = await supabase
    .from("profiles")
    .select("id, display_name, role, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const logged = await supabase
    .from("site_visitors")
    .select(
      "visitor_key, first_path, first_referrer, first_source, href, city, created_at, last_seen_at",
    )
    .like("visitor_key", "gkmem_%")
    .order("created_at", { ascending: false })
    .limit(200);

  return withoutRemovedMembers(
    mergeMemberRows([
      authUsers,
      roster,
      classic,
      loggedLive,
      (table.data ?? []).map((row) => mapMemberRow(row as Record<string, unknown>)),
      membersFromVisitorRows(
        (logged.data ?? []) as Record<string, unknown>[],
      ),
      (profiles.data ?? []).map((row) =>
        mapMemberRow({
          ...(row as Record<string, unknown>),
          auth_user_id: row.id,
          source: "google",
          status: "active",
        }),
      ),
    ]),
    removed,
  );
}

function describeAnalytics(name: string, path: string) {
  if (name === "page_view") {
    if (path.includes("goldblog")) return "GoldBlog yazısı açtı";
    if (path.includes("ruya")) return "Rüya Tabirleri";
    if (path.includes("goldact") || path === "/") return "Ana sayfa";
    return path;
  }
  if (name === "whatsapp_click") return "WhatsApp geçişi";
  if (name === "booking_intent") return "Randevu talebi";
  if (name === "daily_action_complete") return "GoldAct tamamladı";
  if (name === "test_complete") return "Test tamamladı";
  if (name === "shopier_click") return "Shopier geçişi";
  if (name === "user_login") return "Giriş yaptı";
  return name;
}

export { emptyAdminMetrics };

export async function loadAdminLive(client?: SupabaseClient | null) {
  const supabase = client ?? (await createSupabaseServerClient());
  const memberStart = istanbulDayStartIso();

  let memberCount = 0;
  let visitCount = 0;
  let liveCount = 0;
  let appointmentCount = 0;
  let whatsappCount = 0;
  let purchaseCount = 0;
  let notificationCount = 0;
  let suggestionCount = 0;
  let visitors: AdminVisitorRow[] = [];
  let whatsapp: AdminEventRow[] = [];
  let purchases: AdminEventRow[] = [];
  let appointments: AdminEventRow[] = [];
  let membersList: AdminMemberRow[] = [];
  let todayStats: AdminRangeStats = { visits: 0, uniques: 0, members: 0, appointments: 0, whatsapp: 0 };
  let last30: AdminRangeStats = { visits: 0, uniques: 0, members: 0, appointments: 0 };
  let activity: AdminActivityItem[] = [];

  if (supabase) {
    const thirtyStart = new Date(Date.parse(memberStart) - 29 * 24 * 60 * 60 * 1000).toISOString();
    const [memberRows, memberHead, visits, liveRows, events, sessionPack, suggestionHead, analyticsPack, suggestionTable] =
      await Promise.all([
        fetchAdminMembers(supabase),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase
        .from("site_visitors")
        .select("visitor_key", { count: "exact", head: true })
        .gte("last_seen_at", memberStart),
      supabase.rpc("list_live_visitors", { p_since: memberStart }),
      supabase
        .from("site_events")
        .select("id, kind, path, source, href, country, region, city, created_at")
        .gte("created_at", memberStart)
        .in("kind", ["whatsapp", "purchase", "appointment"])
        .order("created_at", { ascending: false })
        .limit(120),
      supabase.auth.getSession(),
      supabase
        .from("suggestions")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("analytics_events")
        .select("id, user_id, anonymous_session_id, event_name, path, created_at")
        .gte("created_at", thirtyStart)
        .order("created_at", { ascending: false })
        .limit(4000),
      supabase
        .from("comments")
        .select("id", { count: "exact", head: true })
        .eq("post_id", SUGGESTIONS_POST),
    ]);

    visitCount = visits.count ?? 0;

    const analyticsRows = (analyticsPack.data ?? []) as {
      id?: string;
      user_id?: string | null;
      anonymous_session_id?: string | null;
      event_name?: string;
      path?: string | null;
      created_at?: string;
    }[];
    const todayMs = Date.parse(memberStart);
    function uniqueKey(row: (typeof analyticsRows)[number]) {
      return row.user_id || row.anonymous_session_id || row.id || "";
    }
    const pageToday = analyticsRows.filter(
      (row) => row.event_name === "page_view" && Date.parse(row.created_at ?? "") >= todayMs,
    );
    const page30 = analyticsRows.filter((row) => row.event_name === "page_view");
    if (pageToday.length || page30.length) {
      visitCount = pageToday.length;
    }

    let visitorRows: Record<string, unknown>[] =
      !liveRows.error && Array.isArray(liveRows.data)
        ? (liveRows.data as Record<string, unknown>[])
        : [];
    if (liveRows.error) {
      const fallback = await supabase
        .from("site_visitors")
        .select(
          "visitor_key, first_path, first_referrer, country, region, city, last_path, last_seen_at",
        )
        .gte("last_seen_at", new Date(Date.now() - 10 * 60 * 1000).toISOString())
        .order("last_seen_at", { ascending: false })
        .limit(80);
      visitorRows = (fallback.data ?? []) as Record<string, unknown>[];
    }

    membersList = memberRows;
    memberCount = membersList.length || memberHead.count || 0;

    visitors = visitorRows
      .filter((row) => !isMemberVisitorKey(asText(row.visitor_key)))
      .map((row) => {
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
        live: isLiveAt(lastSeenAt) && !path.startsWith("/admin") && path !== "/uyelik",
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

    suggestionCount = suggestionHead.count ?? suggestionTable.count ?? 0;

    const waToday = analyticsRows.filter(
      (row) => row.event_name === "whatsapp_click" && Date.parse(row.created_at ?? "") >= todayMs,
    );
    const bookToday = analyticsRows.filter(
      (row) => row.event_name === "booking_intent" && Date.parse(row.created_at ?? "") >= todayMs,
    );
    const book30 = analyticsRows.filter((row) => row.event_name === "booking_intent");
    if (waToday.length) whatsappCount = waToday.length;
    if (bookToday.length) appointmentCount = bookToday.length;

    todayStats = {
      visits: pageToday.length,
      uniques: new Set(pageToday.map(uniqueKey)).size,
      members: membersList.filter(
        (row) => row.createdAt && Date.parse(row.createdAt) >= todayMs,
      ).length,
      appointments: bookToday.length,
      whatsapp: waToday.length,
    };
    last30 = {
      visits: page30.length,
      uniques: new Set(page30.map(uniqueKey)).size,
      members: membersList.filter(
        (row) => row.createdAt && Date.parse(row.createdAt) >= Date.parse(thirtyStart),
      ).length,
      appointments: book30.length,
    };
    activity = analyticsRows.slice(0, 24).map((row) => ({
      id: String(row.id),
      at: String(row.created_at ?? ""),
      who: row.user_id ? "Üye" : "Anonim",
      text: describeAnalytics(String(row.event_name ?? ""), row.path ?? "/"),
    }));
  }

  const counts: Record<AdminOverviewCardId, number> = {
    visits: visitCount,
    live: liveCount,
    members: memberCount,
    appointments: appointmentCount,
    whatsapp: whatsappCount,
    purchases: purchaseCount,
    notifications: notificationCount,
    suggestions: suggestionCount,
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
    members: membersList,
    todayStats,
    last30,
    activity,
  };
}

export async function loadAdminMembers(): Promise<AdminMemberRow[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  return fetchAdminMembers(supabase);
}
