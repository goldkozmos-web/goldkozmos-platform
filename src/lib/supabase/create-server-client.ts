import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { getSupabasePublicEnv } from "./env";
import { lastingCookieOptions, supabaseCookieOptions } from "./session";

export async function createSupabaseServerClient() {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");

  return createServerClient(env.url, env.publishableKey, {
    cookieOptions: supabaseCookieOptions(host?.split(":")[0]),
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, {
              ...options,
              ...lastingCookieOptions(options as Record<string, unknown>, value),
            });
          });
        } catch {
          // Server Components cannot always set cookies; proxy refreshes the session.
        }
      },
    },
  });
}
