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
  let visitors: AdminVisitorRow[] = [];
  let whatsapp: AdminEventRow[] = [];
  let purchases: AdminEventRow[] = [];
  let appointments: AdminEventRow[] = [];
  let membersList: AdminMemberRow[] = [];

  if (supabase) {
    const [memberRows, memberHead, visits, liveRows, events, sessionPack] =
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
    ]);

    visitCount = visits.count ?? 0;

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

    membersList = mergeMemberRows([
      memberRows,
      membersFromVisitorRows(visitorRows),
    ]);
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
    members: membersList,
  };
}

export async function loadAdminMembers(): Promise<AdminMemberRow[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  return fetchAdminMembers(supabase);
}
