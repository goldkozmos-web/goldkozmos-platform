import { type NextRequest } from "next/server";

import {
  AUTH_NEXT_COOKIE,
  appOriginFromUrl,
  googleCallbackUrl,
  profilimAfterAuthUrl,
  safeAppPath,
} from "@/lib/site";
import { createAuthCookieClient, htmlRedirect } from "@/lib/supabase/auth-cookies";

export const dynamic = "force-dynamic";
export const maxDuration = 20;

export async function GET(request: NextRequest) {
  const origin = appOriginFromUrl(request.url);
  const auth = createAuthCookieClient(request);

  if (!auth) {
    return htmlRedirect(profilimAfterAuthUrl(origin, true));
  }

  const nextPath = safeAppPath(request.nextUrl.searchParams.get("next"));
  auth.appendCookie({
    name: AUTH_NEXT_COOKIE,
    value: nextPath,
    options: {
      path: "/",
      maxAge: 60 * 10,
      sameSite: "lax",
      httpOnly: true,
      secure: origin.startsWith("https:"),
    },
  });

  const { data, error } = await auth.supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: googleCallbackUrl(origin),
      skipBrowserRedirect: true,
      queryParams: {
        access_type: "offline",
        prompt: "select_account",
      },
    },
  });

  if (error || !data.url) {
    return htmlRedirect(profilimAfterAuthUrl(origin, true));
  }

  return auth.redirect(data.url);
}
