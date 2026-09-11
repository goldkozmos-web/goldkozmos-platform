import { createSupabaseBrowserClient } from "../supabase/browser";
import { googleCallbackUrl, SITE_ORIGIN } from "../site";

export function createProfilimBrowserClient() {
  return createSupabaseBrowserClient();
}

export async function signInWithGoogle() {
  const supabase = createProfilimBrowserClient();

  if (!supabase) {
    return { error: "Giriş altyapısı henüz bağlanmadı." };
  }

  const origin =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? window.location.origin
      : SITE_ORIGIN;

  const { data, error } = await supabase.auth.signInWithOAuth({
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
    return { error: error?.message || "Google girişi açılamadı." };
  }

  window.location.assign(data.url);
  return { error: null };
}
