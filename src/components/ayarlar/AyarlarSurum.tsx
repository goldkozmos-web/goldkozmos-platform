"use client";

import AyarlarFrame from "./AyarlarFrame";

export default function AyarlarSurum() {
  return (
    <AyarlarFrame title="Sürüm Bilgisi" backHref="/ayarlar">
      {() => (
        <div className="adminPanel ayarlarCard ayarlarCopy">
          <p>GoldKozmos</p>
          <p>Sürüm 1.0</p>
        </div>
      )}
    </AyarlarFrame>
  );
}
