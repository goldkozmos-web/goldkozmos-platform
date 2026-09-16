export const SESSION_MAX_AGE = 60 * 60 * 24 * 400;

export function cookieHostName(hostHeader?: string | null) {
  return String(hostHeader ?? "").split(",")[0].split(":")[0].trim();
}

export function supabaseCookieOptions(hostname?: string | null) {
  const host = cookieHostName(hostname);
  const onGold = host === "goldkozmos.com" || host.endsWith(".goldkozmos.com");

  return {
    path: "/",
    sameSite: "lax" as const,
    maxAge: SESSION_MAX_AGE,
    ...(onGold ? { domain: ".goldkozmos.com" as const, secure: true } : {}),
  };
}

export function lastingCookieOptions<T extends Record<string, unknown>>(
  options?: T,
  value?: string,
) {
  if (!value) {
    return options;
  }

  const maxAge =
    typeof options?.maxAge === "number" && options.maxAge > 0
      ? Math.max(options.maxAge, SESSION_MAX_AGE)
      : SESSION_MAX_AGE;

  return {
    ...options,
    path: typeof options?.path === "string" ? options.path : "/",
    sameSite:
      (options?.sameSite as "lax" | "strict" | "none" | boolean | undefined) ??
      "lax",
    maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
  };
}
