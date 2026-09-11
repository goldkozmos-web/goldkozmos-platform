import { type NextRequest } from "next/server";

import { appOriginFromUrl, registerStepUrl, profilimAfterAuthUrl } from "@/lib/site";
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
  return auth.redirect(registerStepUrl(origin));
}
