import { after, type NextRequest } from "next/server";

import { recordMemberJoin } from "@/lib/admin/member-log";
import { isMemberProfileComplete } from "@/lib/auth/membership";
import { isSiteAdminEmail } from "@/lib/admin/access";
import {
  AUTH_NEXT_COOKIE,
  appOriginFromUrl,
  registerStepUrl,
  profilimAfterAuthUrl,
  safeAppPath,
} from "@/lib/site";
import {
  createAuthCookieClient,
  hasPkceVerifierCookie,
  htmlRedirect,
} from "@/lib/supabase/auth-cookies";

export const dynamic = "force-dynamic";
export const maxDuration = 20;

export async function GET(request: NextRequest) {
  const origin = appOriginFromUrl(request.url);
  const code = request.nextUrl.searchParams.get("code");
  const flowId = request.nextUrl.searchParams.get("sb_flow_id");
  const oauthError = request.nextUrl.searchParams.get("error");

  if (oauthError) {
    return htmlRedirect(profilimAfterAuthUrl(origin, true));
  }

  if (!code) {
    return htmlRedirect(profilimAfterAuthUrl(origin));
  }

  if (!hasPkceVerifierCookie(request, flowId)) {
    const next = new URL("/auth/oturum", origin);
    next.search = request.nextUrl.search;
    next.searchParams.set("next", safeAppPath(request.cookies.get(AUTH_NEXT_COOKIE)?.value));
    return htmlRedirect(next.toString());
  }

  const auth = createAuthCookieClient(request);
  if (!auth) {
    const next = new URL("/auth/oturum", origin);
    next.search = request.nextUrl.search;
    next.searchParams.set("next", safeAppPath(request.cookies.get(AUTH_NEXT_COOKIE)?.value));
    return htmlRedirect(next.toString());
  }

  const { data, error } = await auth.supabase.auth.exchangeCodeForSession(code, flowId ? { flowId } : undefined);
  if (error) {
    const next = new URL("/auth/oturum", origin);
    next.search = request.nextUrl.search;
    next.searchParams.set("next", safeAppPath(request.cookies.get(AUTH_NEXT_COOKIE)?.value));
    return htmlRedirect(next.toString());
  }

  // Persist the authenticated redirect immediately; bookkeeping must not block it.
  after(async () => {
    await Promise.allSettled([
      auth.supabase.rpc("ensure_own_membership"),
      recordMemberJoin(data.user ?? null, undefined, auth.supabase),
    ]);
  });
  const nextPath = safeAppPath(request.cookies.get(AUTH_NEXT_COOKIE)?.value);
  auth.appendCookie({
    name: AUTH_NEXT_COOKIE,
    value: "",
    options: { path: "/", maxAge: 0 },
  });
  return auth.redirect(isSiteAdminEmail(data.user?.email) || isMemberProfileComplete(data.user)
    ? new URL(nextPath, origin).toString()
    : registerStepUrl(origin, nextPath));
}
