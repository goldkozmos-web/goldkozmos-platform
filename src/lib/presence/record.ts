import { isSiteAdminEmail } from "../admin/access";
import type { NextRequest } from "next/server";
import { after, NextResponse } from "next/server";

import { notifyPresencePush } from "../admin/push-server";
import { isPresenceArrival, PRESENCE_SEEN_COOKIE } from "./arrival";
import { createSupabaseAnonClient } from "../supabase/anon";
import { createSupabaseServerClient } from "../supabase/create-server-client";
import { activityKey } from "./activity";
import {
  describeReferrer,
  isPresenceBot,
  parsePresencePayload,
  shouldSkipPresencePath,
} from "./labels";

export const VISITOR_COOKIE = "gk_zid";

export type PresenceKind =
  | "page"
  | "heartbeat"
  | "whatsapp"
  | "purchase"
  | "appointment";

export type PresencePayload = {
  kind: PresenceKind;
  path?: string;
  referrer?: string;
  href?: string;
  visitorKey?: string;
};

function headerText(request: NextRequest, name: string) {
  const value = request.headers.get(name);
  if (!value) {
    return "";
  }

  try {
    return decodeURIComponent(value.replace(/\+/g, " ")).trim();
  } catch {
    return value.trim();
  }
}

export function visitorKeyFromRequest(
  request: NextRequest,
  hinted?: string,
) {
  const fromBody = hinted?.trim() || "";
  if (/^[a-zA-Z0-9_-]{8,80}$/.test(fromBody) && !fromBody.startsWith("gkmem_")) {
    return fromBody;
  }

  const existing = request.cookies.get(VISITOR_COOKIE)?.value?.trim();
  if (existing && /^[a-zA-Z0-9_-]{8,80}$/.test(existing) && !existing.startsWith("gkmem_")) {
    return existing;
  }

  return crypto.randomUUID();
}

export function withVisitorCookie(response: NextResponse, visitorKey: string) {
  response.cookies.set({ name: PRESENCE_SEEN_COOKIE, value: `${visitorKey}|${Date.now()}`, path: "/", maxAge: 60 * 60 * 24 * 400, sameSite: "lax", httpOnly: true, secure: process.env.NODE_ENV === "production" });
  response.cookies.set({
    name: VISITOR_COOKIE,
    value: visitorKey,
    path: "/",
    maxAge: 60 * 60 * 24 * 400,
    sameSite: "lax",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export { parsePresencePayload };

export async function recordPresence(
  request: NextRequest,
  payload: PresencePayload,
) {
  const visitorKey = visitorKeyFromRequest(request, payload.visitorKey);
  const ok = () =>
    withVisitorCookie(NextResponse.json({ ok: true }), visitorKey);

  if (request.cookies.get("gk_metrics_excluded")?.value === "1" || isPresenceBot(request.headers.get("user-agent"))) {
    return ok();
  }

  const path = payload.path?.trim() || request.nextUrl.pathname || "/";
  if (shouldSkipPresencePath(path) && payload.kind === "page") {
    return ok();
  }
  if (shouldSkipPresencePath(path) && payload.kind === "heartbeat") {
    return ok();
  }

  const referrer =
    payload.referrer?.trim() || request.headers.get("referer") || "";
  const supabase = createSupabaseAnonClient();

  if (!supabase) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const sessionClient = await createSupabaseServerClient();
  const claims = sessionClient ? await sessionClient.auth.getClaims() : null;
  const userId = typeof claims?.data?.claims?.sub === "string" ? claims.data.claims.sub : null;
  if (isSiteAdminEmail(typeof claims?.data?.claims?.email === "string" ? claims.data.claims.email : null)) return ok();
  const recordedKey = activityKey(visitorKey, userId);
  const arrival = payload.kind === "page" && isPresenceArrival(request.cookies.get(PRESENCE_SEEN_COOKIE)?.value, visitorKey);

  const { error } = await supabase.rpc("record_site_presence", {
    p_visitor_key: recordedKey,
    p_kind: payload.kind === "heartbeat" ? "page" : payload.kind,
    p_path: path,
    p_referrer: referrer,
    p_source: describeReferrer(referrer),
    p_href: payload.href ?? "",
    p_country: headerText(request, "x-vercel-ip-country"),
    p_region: headerText(request, "x-vercel-ip-country-region"),
    p_city: headerText(request, "x-vercel-ip-city"),
    p_heartbeat: payload.kind === "heartbeat",
  });

  if (error) {
    return withVisitorCookie(NextResponse.json({ ok: false }, { status: 503 }), visitorKey);
  }

  after(() => notifyPresencePush({
    kind: payload.kind,
    path,
    visitorKey: recordedKey,
    heartbeat: payload.kind === "heartbeat",
    arrival,
  }));

  return ok();
}
