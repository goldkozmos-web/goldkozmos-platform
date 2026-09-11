import { NextResponse, type NextRequest } from "next/server";

import { appOriginFromUrl, profilimAfterAuthUrl } from "@/lib/site";
import {
  createAuthCookieClient,
  hasPkceVerifierCookie,
} from "@/lib/supabase/auth-cookies";

export const dynamic = "force-dynamic";

function oturumHandoff(request: NextRequest, origin: string) {
  const next = new URL("/auth/oturum", origin);
  next.search = request.nextUrl.search;
  return NextResponse.redirect(next);
}

export async function GET(request: NextRequest) {
  const origin = appOriginFromUrl(request.url);
  const code = request.nextUrl.searchParams.get("code");
  const oauthError = request.nextUrl.searchParams.get("error");

  if (oauthError) {
    return NextResponse.redirect(profilimAfterAuthUrl(origin, true));
  }

  if (!code) {
    return NextResponse.redirect(profilimAfterAuthUrl(origin));
  }

  if (!hasPkceVerifierCookie(request)) {
    return oturumHandoff(request, origin);
  }

  const auth = createAuthCookieClient(request);
  if (!auth) {
    return oturumHandoff(request, origin);
  }

  const { error } = await auth.supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return oturumHandoff(request, origin);
  }

  return auth.redirect(profilimAfterAuthUrl(origin));
}
