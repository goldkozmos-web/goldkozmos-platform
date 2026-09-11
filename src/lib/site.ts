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

export function htmlRedirectPage(url: string) {
  const safe = url
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${safe}"><title>Yönlendiriliyor</title><style>html,body{margin:0;min-height:100dvh;background:#fffdf9;color:#211811;font-family:Georgia,"Times New Roman",serif}p{padding:48px 24px;text-align:center}a{color:#8d6728}</style></head><body><p>Yönlendiriliyor… <a href="${safe}">Devam et</a></p><script>location.replace(${JSON.stringify(url)})</script></body></html>`;
}
