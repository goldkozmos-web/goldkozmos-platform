"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicEnv } from "./env";
import { supabaseCookieOptions } from "./session";

export function createSupabaseBrowserClient() {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  const host = typeof window !== "undefined" ? window.location.hostname : "";
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:";

  return createBrowserClient(env.url, env.publishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // The callback route (or /auth/oturum fallback) exchanges the code once.
      detectSessionInUrl: false,
    },
    cookieOptions: {
      ...supabaseCookieOptions(host),
      secure,
    },
  });
}
