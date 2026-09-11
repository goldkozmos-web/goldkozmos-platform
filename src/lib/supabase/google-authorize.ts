function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function isGoogleAccountsUrl(url: string) {
  try {
    const host = new URL(url).hostname;
    return (
      host === "accounts.google.com" ||
      host.endsWith(".google.com") ||
      host === "accounts.google.com.tr"
    );
  } catch {
    return false;
  }
}

export function isSupabaseAuthorizeUrl(url: string) {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname.endsWith(".supabase.co") &&
      parsed.pathname.includes("/auth/v1/authorize")
    );
  } catch {
    return false;
  }
}

export async function resolveGoogleAuthorizeUrl(
  authorizeUrl: string,
  apiKey: string,
) {
  let current = authorizeUrl;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    if (isGoogleAccountsUrl(current)) {
      return current;
    }

    if (!isHttpUrl(current)) {
      return null;
    }

    try {
      const response = await fetch(current, {
        method: "GET",
        redirect: "manual",
        headers: {
          Accept: "text/html,application/xhtml+xml",
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
        signal: AbortSignal.timeout(7000),
      });

      const location = response.headers.get("location");
      if (location) {
        current = new URL(location, current).toString();
        continue;
      }

      if (response.status >= 500) {
        continue;
      }

      return null;
    } catch {
      continue;
    }
  }

  return isGoogleAccountsUrl(current) ? current : null;
}
