export const VISITOR_LABEL = "Ziyaretçi";
export const LIVE_WINDOW_MS = 45_000;

const COUNTRY_NAMES: Record<string, string> = {
  TR: "Türkiye",
  US: "ABD",
  GB: "Birleşik Krallık",
  DE: "Almanya",
  FR: "Fransa",
  NL: "Hollanda",
  AZ: "Azerbaycan",
  CY: "Kıbrıs",
};

function cleanPart(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  try {
    return decodeURIComponent(value.replace(/\+/g, " ")).trim();
  } catch {
    return value.trim();
  }
}

export function describeReferrer(referrer: string | null | undefined) {
  const raw = referrer?.trim();
  if (!raw) {
    return "Direkt";
  }

  let host = "";
  try {
    host = new URL(raw).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "Direkt";
  }

  if (!host) {
    return "Direkt";
  }
  if (host.includes("instagram")) {
    return "Instagram";
  }
  if (host.includes("facebook") || host === "fb.com") {
    return "Facebook";
  }
  if (host.includes("google")) {
    return "Google";
  }
  if (host.includes("t.co") || host.includes("twitter") || host.includes("x.com")) {
    return "X";
  }
  if (host.includes("youtube")) {
    return "YouTube";
  }
  if (host.includes("tiktok")) {
    return "TikTok";
  }
  if (host.includes("whatsapp")) {
    return "WhatsApp";
  }
  if (host.includes("goldkozmos.com") || host === "localhost" || host.startsWith("127.")) {
    return "Site içi";
  }

  return host;
}

export function describeLocation(
  city?: string | null,
  region?: string | null,
  country?: string | null,
) {
  const countryName =
    COUNTRY_NAMES[cleanPart(country).toUpperCase()] || cleanPart(country);
  const parts = [cleanPart(city), cleanPart(region), countryName].filter(Boolean);
  return parts.length ? parts.join(", ") : "Konum yok";
}

export function describeEntry(
  path: string | null | undefined,
  referrer: string | null | undefined,
) {
  const landing = path?.trim() || "/";
  return `${describeReferrer(referrer)} · ${landing}`;
}

export function isLiveAt(lastSeenAt: string | null | undefined, now = Date.now()) {
  if (!lastSeenAt) {
    return false;
  }

  const at = Date.parse(lastSeenAt);
  return Number.isFinite(at) && now - at <= LIVE_WINDOW_MS;
}

export function shouldSkipPresencePath(path: string | null | undefined) {
  const value = path?.trim() || "/";
  return (
    value.startsWith("/admin") ||
    value.startsWith("/auth") ||
    value.startsWith("/api/")
  );
}

export function presenceKindFromHref(href: string, path = "/") {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  const dest = `${url.pathname}${url.search}`.toLowerCase();

  if (host.includes("shopier.com")) {
    return "purchase" as const;
  }

  const whatsapp =
    host.includes("wa.me") ||
    host.includes("whatsapp.com") ||
    dest.startsWith("/go/whatsapp");

  if (!whatsapp) {
    return null;
  }

  if (path.includes("randevu-al") || dest.includes("randevu")) {
    return "appointment" as const;
  }

  return "whatsapp" as const;
}

export function isPresenceBot(userAgent: string | null | undefined) {
  const ua = userAgent?.toLowerCase() ?? "";
  return /bot|crawler|spider|preview|facebookexternalhit/i.test(ua);
}

export function parsePresencePayload(raw: unknown): {
  kind: "page" | "heartbeat" | "whatsapp" | "purchase" | "appointment";
  path?: string;
  referrer?: string;
  href?: string;
} | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const body = raw as Record<string, unknown>;
  const kind = body.kind;
  if (
    kind !== "page" &&
    kind !== "heartbeat" &&
    kind !== "whatsapp" &&
    kind !== "purchase" &&
    kind !== "appointment"
  ) {
    return null;
  }

  return {
    kind,
    path: typeof body.path === "string" ? body.path.slice(0, 300) : "/",
    referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 500) : "",
    href: typeof body.href === "string" ? body.href.slice(0, 500) : "",
  };
}
