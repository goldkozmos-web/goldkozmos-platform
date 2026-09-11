import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabasePublicEnv } from "./env";

export function createCallbackSupabase(
  request: NextRequest,
  response: NextResponse,
) {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  return createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });
}

export function hasPkceVerifierCookie(request: NextRequest) {
  return request.cookies.getAll().some((cookie) => cookie.name.includes("code-verifier"));
}
