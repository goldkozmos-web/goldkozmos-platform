"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicEnv } from "./env";

export function createSupabaseBrowserClient() {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  const onGold =
    typeof window !== "undefined" &&
    window.location.hostname.endsWith("goldkozmos.com");

  return createBrowserClient(env.url, env.publishableKey, {
    cookieOptions: {
      path: "/",
      sameSite: "lax",
      secure: typeof window !== "undefined" && window.location.protocol === "https:",
      ...(onGold ? { domain: ".goldkozmos.com" } : {}),
    },
  });
}
