export const SITE_ORIGIN = "https://goldkozmos.com";

export function appOriginFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
      return parsed.origin;
    }
  } catch {
    // Fall through to the live site.
  }

  return SITE_ORIGIN;
}

export function googleStartUrl(origin: string) {
  return `${origin.replace(/\/$/, "")}/auth/google`;
}

export function googleCallbackUrl(origin: string) {
  return `${origin.replace(/\/$/, "")}/auth/callback`;
}

export function profilimAfterAuthUrl(origin: string, failed = false) {
  return failed ? `${origin}/profilim?auth=error` : `${origin}/profilim`;
}
