export const ANALYTICS_CONSENT_KEY = "gk-analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "gk-analytics-consent-change";
export type AnalyticsConsent = "granted" | "denied" | null;

export function analyticsAllowedPath(path: string) {
  return !/^\/(panel|admin|api|auth|profilim|ayarlar|giris|mesajlar|mesaj|randevu-al|calismalar\/kayit-takip)(\/|$)/.test(path);
}

export function conversionForLink(href: string, origin: string, label: string) {
  let url: URL;
  try { url = new URL(href, origin); } catch { return null; }
  if (!/^https?:$/.test(url.protocol)) return null;
  if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) {
    return { name: /randevu|uygun gün|uygun gun/i.test(label) ? "appointment_click" : "whatsapp_click", destination: "whatsapp" };
  }
  if (url.hostname === "shopier.com" || url.hostname.endsWith(".shopier.com")) return { name: "shopier_click", destination: "shopier" };
  if (url.origin === origin && url.pathname.startsWith("/calismalar/detay/")) return { name: "work_detail_click", destination: url.pathname };
  if (url.origin === origin && url.pathname === "/profilim" && /üye ol/i.test(label)) return { name: "membership_cta_click", destination: "profilim" };
  return null;
}

export function readAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch { return null; }
}

export function setAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>) {
  try { window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent); } catch { /* Storage unavailable: consent stays ungranted. */ }
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
}
