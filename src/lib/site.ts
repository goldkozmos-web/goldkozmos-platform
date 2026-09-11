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

export function phoneStepUrl(origin: string, next = "/profilim") {
  const url = new URL("/auth/telefon", `${origin.replace(/\/$/, "")}/`);
  if (next && next !== "/profilim") {
    url.searchParams.set("next", next);
  }
  return url.toString();
}

export function safeAppPath(raw: string | null | undefined, fallback = "/profilim") {
  const path = String(raw ?? "").trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://")) {
    return fallback;
  }
  return path;
}

const AUTH_PAGE_STYLE =
  'html,body{margin:0;min-height:100dvh;background:#fffdf9;color:#211811;font-family:Georgia,"Times New Roman",serif}p,h1{padding:0 24px;text-align:center}main{padding:64px 24px}h1{font-size:28px}a{color:#8d6728}';

export function htmlRedirectPage(url: string) {
  const safe = url
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${safe}"><title>Yönlendiriliyor</title><style>${AUTH_PAGE_STYLE}</style></head><body><p>Yönlendiriliyor… <a href="${safe}">Devam et</a></p><script>location.replace(${JSON.stringify(url)})</script></body></html>`;
}

export function htmlAuthMessagePage(title: string, body: string, href: string, cta: string) {
  const safeHref = href.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const safeTitle = title.replace(/</g, "&lt;");
  const safeBody = body.replace(/</g, "&lt;");
  const safeCta = cta.replace(/</g, "&lt;");
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${safeTitle}</title><style>${AUTH_PAGE_STYLE}</style></head><body><main><h1>${safeTitle}</h1><p>${safeBody}</p><p><a href="${safeHref}">${safeCta}</a></p></main></body></html>`;
}
