import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicEnv } from "./env";

export function createProfilimBrowserClient() {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  return createBrowserClient(env.url, env.anonKey);
}

export async function signInWithGoogle() {
  const supabase = createProfilimBrowserClient();

  if (!supabase) {
    return { error: "Giriş altyapısı henüz bağlanmadı." };
  }

  const origin = window.location.origin;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=/profilim`,
      queryParams: {
        access_type: "offline",
        prompt: "select_account",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
