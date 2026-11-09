"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { ANALYTICS_CONSENT_EVENT, analyticsAllowedPath, conversionForLink, readAnalyticsConsent, setAnalyticsConsent } from "../../lib/analytics";

type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [key: `ga-disable-${string}`]: boolean | undefined };
const subscribe = (callback: () => void) => {
  window.addEventListener(ANALYTICS_CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener(ANALYTICS_CONSENT_EVENT, callback); window.removeEventListener("storage", callback); };
};

export default function SiteAnalytics({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribe, readAnalyticsConsent, () => null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const configured = useRef(false);
  const validId = /^G-[A-Z0-9]+$/.test(measurementId ?? "") ? measurementId : undefined;
  const publicPage = analyticsAllowedPath(pathname);
  const enabled = !!validId && consent === "granted" && publicPage;

  useEffect(() => {
    const open = () => setPreferencesOpen(true);
    window.addEventListener("gk-open-cookie-preferences", open);
    return () => window.removeEventListener("gk-open-cookie-preferences", open);
  }, []);

  useEffect(() => {
    if (!validId) return;
    const analyticsWindow = window as unknown as AnalyticsWindow;
    analyticsWindow[`ga-disable-${validId}`] = !enabled;
    if (!enabled) {
      analyticsWindow.gtag?.("consent", "update", { analytics_storage: "denied" });
      if (consent === "denied") {
        for (const cookie of document.cookie.split(";")) {
          const name = cookie.split("=")[0].trim();
          if (/^_ga(?:_|$)/.test(name)) for (const domain of ["", `;domain=${location.hostname}`, ";domain=.goldkozmos.com"]) document.cookie = `${name}=;max-age=0;path=/${domain}`;
        }
      }
      return;
    }
    if (!analyticsWindow.gtag) {
      analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
      // gtag expects arguments-like queue entries, rather than nested arrays.
      // The official gtag queue uses the Arguments object.
      // eslint-disable-next-line prefer-rest-params
      analyticsWindow.gtag = function () { analyticsWindow.dataLayer!.push(arguments); };
    }
    const gtag = analyticsWindow.gtag;
    let referrer = "";
    try { referrer = new URL(document.referrer).origin; } catch { /* Direct visit. */ }
    if (!configured.current) {
      gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      gtag("js", new Date());
      gtag("config", validId, { send_page_view: false, page_location: `${location.origin}${pathname}`, page_referrer: referrer, allow_google_signals: false, allow_ad_personalization_signals: false });
      configured.current = true;
    }
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("set", { page_location: `${location.origin}${pathname}`, page_referrer: referrer });
    gtag("event", "page_view", { page_location: `${location.origin}${pathname}`, page_title: document.title, page_referrer: referrer });
    if (pathname.startsWith("/calismalar/detay/")) gtag("event", "work_detail_view", { page_path: pathname });
    const onClick = (event: MouseEvent) => {
      if (readAnalyticsConsent() !== "granted") return;
      const element = event.target instanceof Element ? event.target.closest("a,button") : null;
      if (!element) return;
      const label = element.textContent ?? "";
      const conversion = element instanceof HTMLAnchorElement ? conversionForLink(element.href, location.origin, label) : /randevu/i.test(label) ? { name: "appointment_click", destination: "whatsapp" } : null;
      if (conversion) gtag("event", conversion.name, { destination: conversion.destination, page_path: pathname, transport_type: "beacon" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [consent, enabled, pathname, validId]);

  if (!validId) return null;
  const choose = (choice: "granted" | "denied") => { setAnalyticsConsent(choice); setPreferencesOpen(false); };
  return <>
    {enabled && <Script id="goldkozmos-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${validId}`} strategy="afterInteractive" />}
    {publicPage && (consent === null || preferencesOpen) && <section className="gkAnalyticsConsent" aria-label="Çerez tercihleri"><div><strong>Deneyimini iyileştirmemize yardımcı olur musun?</strong><p>İzninle ziyaretleri ve çalışma bağlantılarına tıklamaları ölçüyoruz. <Link href="/gizlilik-politikasi">Gizlilik bilgileri</Link></p></div><div className="gkAnalyticsConsentActions"><button type="button" onClick={() => choose("denied")}>Yalnızca gerekli</button><button type="button" onClick={() => choose("granted")}>Analize izin ver</button></div></section>}
  </>;
}
