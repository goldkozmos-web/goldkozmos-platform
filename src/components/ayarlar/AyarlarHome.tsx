"use client";

import { createProfilimBrowserClient } from "../../lib/profilim/auth.client";
import type { ProfilimUser } from "../../lib/profilim/types";
import AyarlarFrame from "./AyarlarFrame";
import {
  AyarlarButtonRow,
  AyarlarGroup,
  AyarlarLinkRow,
} from "./AyarlarRows";

function List({ user }: { user: NonNullable<ProfilimUser> }) {
  async function signOut() {
    const supabase = createProfilimBrowserClient();
    await supabase?.auth.signOut();
    window.location.replace("/profilim");
  }

  return (
    <>
      {user.isAdmin ? (
        <section className="ayarlarGroup">
          <div className="adminPanel ayarlarCard">
            <a className="ayarlarRow is-gold" href="/admin">
              <span>Yönetim Merkezine Git</span>
              <i aria-hidden="true">→</i>
            </a>
          </div>
        </section>
      ) : null}

      <AyarlarGroup label="Hesap">
        <AyarlarLinkRow href="/ayarlar/hesap" label="Hesap Bilgileri" />
        <AyarlarLinkRow href="/ayarlar/bildirimler" label="Bildirimler" />
        <AyarlarLinkRow href="/ayarlar/icerik" label="İçerik Tercihlerim" />
      </AyarlarGroup>

      <AyarlarGroup label="Gizlilik">
        <AyarlarLinkRow href="/ayarlar/gizlilik" label="Gizlilik ve Güvenlik" />
        <AyarlarLinkRow href="/gizlilik-politikasi" label="KVKK / Gizlilik Politikası" />
        <AyarlarLinkRow href="/ayarlar/cerez" label="Çerez Tercihleri" />
      </AyarlarGroup>

      <AyarlarGroup label="Destek">
        <AyarlarLinkRow href="/ayarlar/sss" label="Sıkça Sorulan Sorular" />
        <AyarlarLinkRow href="/ayarlar/sorun" label="Sorun Bildir" />
        <AyarlarLinkRow
          href="https://wa.me/905054722153?text=Merhaba%2C%20GoldKozmos%20destek"
          label="WhatsApp Destek"
        />
      </AyarlarGroup>

      <AyarlarGroup label="GoldKozmos">
        <AyarlarLinkRow href="/ayarlar/hakkinda" label="GoldKozmos Hakkında" />
        <AyarlarLinkRow href="/kullanim-kosullari" label="Kullanım Koşulları" />
        <AyarlarLinkRow href="/ayarlar/surum" label="Sürüm Bilgisi" />
      </AyarlarGroup>

      <AyarlarGroup label="Hesap İşlemleri">
        <AyarlarButtonRow label="Çıkış Yap" onClick={() => void signOut()} />
        <AyarlarLinkRow href="/ayarlar/sil" label="Hesabımı Sil" tone="danger" />
      </AyarlarGroup>
    </>
  );
}

export default function AyarlarHome() {
  return (
    <AyarlarFrame title="Ayarlar" backHref="/profilim">
      {(user) => <List user={user} />}
    </AyarlarFrame>
  );
}
