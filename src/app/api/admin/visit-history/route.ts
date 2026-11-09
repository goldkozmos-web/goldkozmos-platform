import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { resolveAdminRequest } from "@/lib/admin/auth.server";
import { activityIdentity } from "@/lib/presence/activity";
import { describeLocation, shouldSkipPresencePath } from "@/lib/presence/labels";
import { isDeploymentTraffic, parseVisitCursor, visitSince, type VisitHistoryRow } from "@/lib/admin/visit-history";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const { access, client } = await resolveAdminRequest(request);
  if (access.status !== "ok" || !client) return NextResponse.json({ error: "Yönetici oturumu gerekli." }, { status: 401, headers });
  const params = new URL(request.url).searchParams;
  let since: string | null;
  let cursor: ReturnType<typeof parseVisitCursor>;
  const type = params.get("type") || "all";
  const country = params.get("country") || "all";
  try {
    since = visitSince(params.get("period") || "7");
    cursor = parseVisitCursor(params.get("before"));
    if (!["all", "member", "anonymous"].includes(type)) throw Error("Geçersiz ziyaretçi filtresi.");
    if (!["all", "TR", "other"].includes(country)) throw Error("Geçersiz ülke filtresi.");
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400, headers });
  }
  let query = client.from("site_events").select("id, visitor_key, path, source, country, region, city, created_at")
    .eq("kind", "page").not("visitor_key", "like", "gkmem_%")
    .not("visitor_key", "like", `gklive:${access.actor.id}:%`)
    .order("created_at", { ascending: false }).order("id", { ascending: false }).limit(101);
  if (since) query = query.gte("created_at", since);
  if (type === "member") query = query.like("visitor_key", "gklive:%");
  if (type === "anonymous") query = query.not("visitor_key", "like", "gklive:%");
  if (country === "TR") query = query.eq("country", "TR");
  if (country === "other") query = query.neq("country", "TR").neq("country", "").not("country", "is", null);
  if (cursor) query = query.or(`created_at.lt.${cursor.at},and(created_at.eq.${cursor.at},id.lt.${cursor.id})`);
  const events = await query;
  if (events.error) return NextResponse.json({ error: "Ziyaret geçmişi alınamadı. Lütfen yeniden dene." }, { status: 503, headers });
  const page = (events.data ?? []).slice(0, 100);
  const ids = [...new Set(page.map(row => activityIdentity(row.visitor_key).userId).filter((id): id is string => Boolean(id)))];
  const profiles = ids.length ? await client.from("profiles").select("id, display_name, role").in("id", ids) : { data: [], error: null };
  if (profiles.error) return NextResponse.json({ error: "Üye bilgileri alınamadı. Lütfen yeniden dene." }, { status: 503, headers });
  const names = new Map((profiles.data ?? []).map(row => [row.id, row]));
  const rows: VisitHistoryRow[] = page.filter(row => !shouldSkipPresencePath(row.path) && row.path !== "/uyelik" && !isDeploymentTraffic(row.source)).flatMap(row => {
    const identity = activityIdentity(row.visitor_key);
    const person = identity.userId ? names.get(identity.userId) : null;
    if (person?.role === "admin") return [];
    return [{ id: row.id, label: identity.userId ? person?.display_name || "Üye" : "Ziyaretçi", member: Boolean(identity.userId),
      code: createHash("sha256").update(identity.visitorId).digest("hex").slice(0, 8).toUpperCase(),
      at: row.created_at, path: (row.path || "/").split(/[?#]/)[0], source: row.source || "Direkt", location: describeLocation(row.city, row.region, row.country) }];
  });
  const last = page.at(-1);
  return NextResponse.json({ rows, next: events.data!.length > 100 && last ? `${last.created_at}|${last.id}` : null, updatedAt: new Date().toISOString() }, { headers });
}
