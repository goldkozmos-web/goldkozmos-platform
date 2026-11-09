import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { getSupabasePublicEnv } from "./env";
import { lastingCookieOptions, supabaseCookieOptions } from "./session";

export async function createSupabaseServerClient() {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const hostname = (requestHeaders.get("host") ?? "").split(":")[0];

  return createServerClient(env.url, env.publishableKey, {
    cookieOptions: supabaseCookieOptions(hostname),
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
