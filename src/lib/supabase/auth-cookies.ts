import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { htmlAuthMessagePage, htmlRedirectPage } from "../site";
import { getSupabasePublicEnv } from "./env";

type CookieToSet = {
  name: string;
  value: string;
  options?: Parameters<NextResponse["cookies"]["set"]>[2];
};

function serializeCookie(cookie: CookieToSet) {
  const options = cookie.options ?? {};
  const parts = [`${cookie.name}=${cookie.value}`];
  parts.push(`Path=${options.path ?? "/"}`);
  if (options.domain) parts.push(`Domain=${options.domain}`);
  if (typeof options.maxAge === "number") parts.push(`Max-Age=${options.maxAge}`);
  if (options.expires) {
    const expires =
      options.expires instanceof Date
        ? options.expires
        : new Date(options.expires);
    parts.push(`Expires=${expires.toUTCString()}`);
  }
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  if (options.sameSite) {
    const raw =
      typeof options.sameSite === "boolean"
        ? options.sameSite
          ? "strict"
          : "lax"
        : String(options.sameSite);
    parts.push(`SameSite=${raw.charAt(0).toUpperCase()}${raw.slice(1)}`);
  }
  return parts.join("; ");
}

function htmlResponse(
  html: string,
  cookies: CookieToSet[],
  extra: { status?: number; location?: string } = {},
) {
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  if (extra.location) {
    headers.set("Location", extra.location);
  }
  for (const cookie of cookies) {
    headers.append("Set-Cookie", serializeCookie(cookie));
  }

  return new NextResponse(html, {
    status: extra.status ?? (extra.location ? 302 : 200),
    headers,
  });
}

export function htmlRedirect(url: string, cookies: CookieToSet[] = []) {
  return htmlResponse(htmlRedirectPage(url), cookies, {
    status: 302,
    location: url,
  });
}

export function htmlAuthMessage(
  title: string,
  body: string,
  href: string,
  cta: string,
  cookies: CookieToSet[] = [],
) {
  return htmlResponse(htmlAuthMessagePage(title, body, href, cta), cookies, {
    status: 200,
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
    return htmlRedirect(url, jar);
  }

  function message(title: string, body: string, href: string, cta: string) {
    return htmlAuthMessage(title, body, href, cta, jar);
  }

  return { supabase, env, redirect, message };
}

export function hasPkceVerifierCookie(request: NextRequest) {
  return request.cookies
    .getAll()
    .some((cookie) => cookie.name.includes("code-verifier"));
}
