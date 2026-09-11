"use client";

import AyarlarFrame from "./AyarlarFrame";

export default function AyarlarGizlilik() {
  return (
    <AyarlarFrame title="Gizlilik ve Güvenlik" backHref="/ayarlar">
      {() => (
        <div className="adminPanel ayarlarCard ayarlarCopy">
          <p>
            Google hesabın yalnızca giriş içindir. Profilindeki bilgiler senin
            kozmosunda kalır; yönetim yalnızca senin hesabını görür.
          </p>
          <a href="/gizlilik-politikasi">Gizlilik politikasını oku ›</a>
          <a href="/kvkk-aydinlatma-metni">KVKK aydınlatma metni ›</a>
        </div>
      )}
    </AyarlarFrame>
  );
}
