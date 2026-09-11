"use client";

import type { ProfilimUser } from "../../lib/profilim/types";
import AyarlarFrame from "./AyarlarFrame";
import { AyarlarToggle } from "./AyarlarRows";
import { useAyarlarPrefs } from "./useAyarlarPrefs";

function CookieBody({ user }: { user: NonNullable<ProfilimUser> }) {
  const { prefs, save } = useAyarlarPrefs(user.id);

  return (
    <div className="ayarlarCard">
      <AyarlarToggle
        label="Zorunlu çerezler"
        on
        locked
        onToggle={() => undefined}
      />
      <AyarlarToggle
        label="Analiz çerezleri"
        on={prefs.cookies.analytics}
        onToggle={() =>
          void save({
            ...prefs,
            cookies: { ...prefs.cookies, analytics: !prefs.cookies.analytics },
          })
        }
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
