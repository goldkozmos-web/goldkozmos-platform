import { type NextRequest } from "next/server";

import { appOriginFromUrl, googleCallbackUrl, profilimAfterAuthUrl } from "@/lib/site";
import { createAuthCookieClient, htmlRedirect } from "@/lib/supabase/auth-cookies";
import { resolveGoogleAuthorizeUrl } from "@/lib/supabase/google-authorize";

export const dynamic = "force-dynamic";
export const maxDuration = 20;

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

  const googleUrl = await resolveGoogleAuthorizeUrl(
    data.url,
    auth.env.publishableKey,
  );

  if (!googleUrl) {
    return auth.message(
      "Google şu an yanıt vermiyor",
      "Giriş servisi zaman aşımına uğradı. Siyah JSON ekranı bu yüzden çıkıyordu. Birkaç saniye sonra tekrar dene.",
      "/auth/google",
      "Tekrar dene",
    );
  }

  return auth.redirect(googleUrl);
}
