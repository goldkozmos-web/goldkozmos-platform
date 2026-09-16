import { type NextRequest } from "next/server";

import { persistSiteMemberFromUser } from "@/lib/admin/persist-member";
import { recordMemberJoin } from "@/lib/admin/member-log";
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

export async function GET(request: NextRequest) {
  const origin = appOriginFromUrl(request.url);
  const code = request.nextUrl.searchParams.get("code");
  const oauthError = request.nextUrl.searchParams.get("error");

  if (oauthError) {
    return htmlRedirect(profilimAfterAuthUrl(origin, true));
  }

  if (!code) {
    return htmlRedirect(profilimAfterAuthUrl(origin));
  }

  if (!hasPkceVerifierCookie(request)) {
    const next = new URL("/auth/oturum", origin);
    next.search = request.nextUrl.search;
    return htmlRedirect(next.toString());
  }

  const auth = createAuthCookieClient(request);
  if (!auth) {
    const next = new URL("/auth/oturum", origin);
    next.search = request.nextUrl.search;
    return htmlRedirect(next.toString());
  }

  const { error } = await auth.supabase.auth.exchangeCodeForSession(code);
  if (error) {
    const next = new URL("/auth/oturum", origin);
    next.search = request.nextUrl.search;
    return htmlRedirect(next.toString());
  }

  await auth.supabase.rpc("ensure_own_membership");
  const { data: userPack } = await auth.supabase.auth.getUser();
  await persistSiteMemberFromUser(userPack.user ?? null);
  await recordMemberJoin(userPack.user ?? null, undefined, auth.supabase);
  const nextPath = safeAppPath(request.cookies.get(AUTH_NEXT_COOKIE)?.value);
  auth.appendCookie({
    name: AUTH_NEXT_COOKIE,
    value: "",
    options: { path: "/", maxAge: 0 },
  });
  return auth.redirect(registerStepUrl(origin, nextPath));
}
