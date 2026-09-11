import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createSupabaseAnonClient } from "../supabase/anon";
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
  if (fromBody.length >= 8 && fromBody.length <= 80) {
    return fromBody;
  }

  const existing = request.cookies.get(VISITOR_COOKIE)?.value?.trim();
  if (existing && existing.length >= 8 && existing.length <= 80) {
    return existing;
  }

  return crypto.randomUUID();
}

export function withVisitorCookie(response: NextResponse, visitorKey: string) {
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

  if (isPresenceBot(request.headers.get("user-agent"))) {
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
    return ok();
  }

  const { error } = await supabase.rpc("record_site_presence", {
    p_visitor_key: visitorKey,
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
    return ok();
  }

  return ok();
}
