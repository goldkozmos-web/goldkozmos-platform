import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { getSupabasePublicEnv } from "./env";
import { cookieHostName, lastingCookieOptions, supabaseCookieOptions } from "./session";

export async function createSupabaseServerClient() {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  const cookieStore = await cookies();
  const headerStore = await headers();
  const host = cookieHostName(
    headerStore.get("x-forwarded-host") || headerStore.get("host"),
  );

  return createServerClient(env.url, env.publishableKey, {
    cookieOptions: supabaseCookieOptions(host),
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
