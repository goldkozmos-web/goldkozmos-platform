import { type NextRequest } from "next/server";

import { appOriginFromUrl, googleCallbackUrl, profilimAfterAuthUrl } from "@/lib/site";
import { createAuthCookieClient, htmlRedirect } from "@/lib/supabase/auth-cookies";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = appOriginFromUrl(request.url);
  const auth = createAuthCookieClient(request);

  if (!auth) {
    return htmlRedirect(profilimAfterAuthUrl(origin, true));
  }

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
