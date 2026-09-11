import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { htmlRedirectPage } from "../site";
import { getSupabasePublicEnv } from "./env";

type CookieToSet = {
  name: string;
  value: string;
  options?: Parameters<NextResponse["cookies"]["set"]>[2];
};

export function htmlRedirect(url: string) {
  return new NextResponse(htmlRedirectPage(url), {
    status: 302,
    headers: {
      Location: url,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export function createAuthCookieClient(request: NextRequest) {
  const env = getSupabasePublicEnv();
  if (!env) {
    return null;
  }

  const jar: CookieToSet[] = [];
  const host = request.nextUrl.hostname;
  const onGold = host.endsWith("goldkozmos.com");

  const supabase = createServerClient(env.url, env.publishableKey, {
    cookieOptions: {
      path: "/",
      sameSite: "lax",
      ...(onGold ? { domain: ".goldkozmos.com", secure: true } : {}),
    },
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          jar.push({ name, value, options });
          request.cookies.set(name, value);
        });
      },
    },
  });

  function redirect(url: string) {
    const response = htmlRedirect(url);
    for (const { name, value, options } of jar) {
      response.cookies.set(name, value, options);
    }
    return response;
  }

  return { supabase, redirect };
}

export function hasPkceVerifierCookie(request: NextRequest) {
  return request.cookies
    .getAll()
    .some((cookie) => cookie.name.includes("code-verifier"));
}
