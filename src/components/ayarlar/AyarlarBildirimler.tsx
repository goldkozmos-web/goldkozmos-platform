"use client";

import { useEffect, useState } from "react";

import type { ProfilimUser } from "../../lib/profilim/types";
import AyarlarFrame from "./AyarlarFrame";
import { AyarlarToggle } from "./AyarlarRows";
import { useAyarlarPrefs } from "./useAyarlarPrefs";
import {
  disableMemberPush,
  enableMemberPush,
  pushSupportState,
} from "../../lib/push/browser";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

function NotifyBody({ user }: { user: NonNullable<ProfilimUser> }) {
  const { prefs, save } = useAyarlarPrefs(user.id);
  const [support, setSupport] = useState(pushSupportState());
  const [subscribed, setSubscribed] = useState(false);
  const [waterOn, setWaterOn] = useState(false);

  useEffect(() => {
    setSupport(pushSupportState());
    void navigator.serviceWorker?.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setSubscribed(Boolean(sub)))
      .catch(() => setSubscribed(false));
    const supabase = createSupabaseBrowserClient();
    void supabase
      ?.from("water_reminder_settings")
      .select("enabled")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setWaterOn(Boolean(data?.enabled)));
  }, [user.id]);

  const unsupported = support === "unsupported";
  const phoneOn = !unsupported && support === "granted" && subscribed;

  return (
    <div className="adminPanel ayarlarCard">
      {unsupported ? (
        <p>Bu cihazda tarayıcı bildirimi desteklenmiyor.</p>
      ) : null}
      <AyarlarToggle
        label={`Telefon Bildirimleri · ${phoneOn ? "Aktif" : "Kapalı"}`}
        on={phoneOn}
        locked={unsupported}
        onToggle={() => {
          if (unsupported) return;
          if (phoneOn) {
            void disableMemberPush().then(() => {
              setSubscribed(false);
              void save({
                ...prefs,
                notify: { ...prefs.notify, phone: false },
              });
            });
            return;
          }
          void enableMemberPush().then((result) => {
            setSupport(pushSupportState());
            setSubscribed(result.ok);
            void save({
              ...prefs,
              notify: { ...prefs.notify, phone: result.ok },
            });
          });
        }}
      />
      <AyarlarToggle
        label={`Su Hatırlatmaları · ${waterOn ? "Aktif" : "Kapalı"}`}
        on={waterOn}
        onToggle={() => {
          const next = !waterOn;
          setWaterOn(next);
          const supabase = createSupabaseBrowserClient();
          void supabase?.from("water_reminder_settings").upsert({
            user_id: user.id,
            enabled: next,
            timezone: "Europe/Istanbul",
            updated_at: new Date().toISOString(),
          });
          if (next) void enableMemberPush();
          void save({
            ...prefs,
            notify: { ...prefs.notify, water: next },
          });
        }}
      />
      <AyarlarToggle
        label={`Randevu Hatırlatmaları · ${prefs.notify.appointment ? "Aktif" : "Kapalı"}`}
        on={prefs.notify.appointment}
        onToggle={() =>
          void save({
            ...prefs,
            notify: { ...prefs.notify, appointment: !prefs.notify.appointment },
          })
        }
      />
      <AyarlarToggle
        label="PDF hazır olduğunda"
        on={prefs.notify.pdf}
        onToggle={() =>
          void save({
            ...prefs,
            notify: { ...prefs.notify, pdf: !prefs.notify.pdf },
          })
        }
      />
      <AyarlarToggle
        label="Satın alma / erişim bildirimleri"
        on={prefs.notify.purchase}
        onToggle={() =>
          void save({
            ...prefs,
            notify: { ...prefs.notify, purchase: !prefs.notify.purchase },
          })
        }
      />
      <AyarlarToggle
        label="Yeni GoldKozmos içerikleri"
        on={prefs.notify.content}
        onToggle={() =>
          void save({
            ...prefs,
            notify: { ...prefs.notify, content: !prefs.notify.content },
          })
        }
      />
    </div>
  );
}

export default function AyarlarBildirimler() {
  return (
    <AyarlarFrame title="Bildirimler" backHref="/ayarlar">
      {(user) => <NotifyBody user={user} />}
    </AyarlarFrame>
  );
}
