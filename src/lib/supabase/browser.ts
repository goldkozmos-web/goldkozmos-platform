"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "./env";
import { supabaseCookieOptions } from "./session";

let browserClient: SupabaseClient | null = null;

export function createSupabaseBrowserClient() {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  if (typeof window === "undefined") {
    return createBrowserClient(env.url, env.publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  if (browserClient) {
    return browserClient;
  }

  const host = window.location.hostname;
  const secure = window.location.protocol === "https:";

  browserClient = createBrowserClient(env.url, env.publishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
    cookieOptions: {
      ...supabaseCookieOptions(host),
      secure,
    },
  });

  return browserClient;
}
