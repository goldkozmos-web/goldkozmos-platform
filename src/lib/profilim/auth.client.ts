import { createSupabaseBrowserClient } from "../supabase/browser";

export function createProfilimBrowserClient() {
  return createSupabaseBrowserClient();
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
      redirectTo: `${origin}/auth/callback`,
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
