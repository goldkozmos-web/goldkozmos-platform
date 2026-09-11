"use client";

import type { ProfilimUser } from "../../lib/profilim/types";
import AyarlarFrame from "./AyarlarFrame";
import { AyarlarToggle } from "./AyarlarRows";
import { useAyarlarPrefs } from "./useAyarlarPrefs";

function NotifyBody({ user }: { user: NonNullable<ProfilimUser> }) {
  const { prefs, save } = useAyarlarPrefs(user.id);

  return (
    <div className="adminPanel ayarlarCard">
      <AyarlarToggle
        label="Randevu hatırlatmaları"
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
