"use client";

import { readAnalyticsConsent, setAnalyticsConsent } from "../../lib/analytics";
import { useSyncExternalStore } from "react";
import type { ProfilimUser } from "../../lib/profilim/types";
import AyarlarFrame from "./AyarlarFrame";
import { AyarlarToggle } from "./AyarlarRows";
import { useAyarlarPrefs } from "./useAyarlarPrefs";

function CookieBody({ user }: { user: NonNullable<ProfilimUser> }) {
  const { prefs, save } = useAyarlarPrefs(user.id);
  const analyticsConsent = useSyncExternalStore(callback => { window.addEventListener("gk-analytics-consent-change", callback); return () => window.removeEventListener("gk-analytics-consent-change", callback); }, readAnalyticsConsent, () => null);

  return (
    <div className="adminPanel ayarlarCard">
      <AyarlarToggle
        label="Zorunlu çerezler"
        on
        locked
        onToggle={() => undefined}
      />
      <AyarlarToggle
        label="Analiz çerezleri"
        on={analyticsConsent === "granted"}
        onToggle={() => {
          const enabled = analyticsConsent !== "granted";
          setAnalyticsConsent(enabled ? "granted" : "denied");
          void save({ ...prefs, cookies: { ...prefs.cookies, analytics: enabled } });
        }}
      />
      <AyarlarToggle
        label="Pazarlama çerezleri"
        on={prefs.cookies.marketing}
        onToggle={() =>
          void save({
            ...prefs,
            cookies: { ...prefs.cookies, marketing: !prefs.cookies.marketing },
          })
        }
      />
    </div>
  );
}

export default function AyarlarCerez() {
  return (
    <AyarlarFrame title="Çerez Tercihleri" backHref="/ayarlar">
      {(user) => <CookieBody user={user} />}
    </AyarlarFrame>
  );
}
