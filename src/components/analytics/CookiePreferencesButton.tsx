"use client";

export default function CookiePreferencesButton() {
  if (!/^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "")) return null;
  return <button className="gkCookiePreferencesButton" type="button" onClick={() => window.dispatchEvent(new Event("gk-open-cookie-preferences"))}>Çerez tercihleri</button>;
}
