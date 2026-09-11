import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabasePublicEnv } from "./lib/supabase/env";
import { lastingCookieOptions, supabaseCookieOptions } from "./lib/supabase/session";

export async function proxy(request: NextRequest) {
  const env = getSupabasePublicEnv();

  if (!env) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });
  const host = request.nextUrl.hostname;

  const supabase = createServerClient(env.url, env.publishableKey, {
    cookieOptions: supabaseCookieOptions(host),
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, {
            ...options,
            ...lastingCookieOptions(options as Record<string, unknown>, value),
          });
        });
      },
    },
  });

  // Refresh cookies if auth is fast; never stall HTML if Supabase hangs.
  await Promise.race([
    supabase.auth.getUser(),
    new Promise<void>((resolve) => {
      setTimeout(resolve, 600);
    }),
  ]);

  return response;
}

export const config = {
  matcher: ["/profilim", "/profilim/:path*", "/auth/telefon", "/auth/kayit"],
};
