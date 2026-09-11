"use client";

import AyarlarFrame from "./AyarlarFrame";

export default function AyarlarHakkinda() {
  return (
    <AyarlarFrame title="GoldKozmos Hakkında" backHref="/ayarlar">
      {() => (
        <div className="ayarlarCard ayarlarCopy">
          <p>
            GoldKozmos® Rezonans Ekolü; kendilik, ilişkiler, bolluk ve farkındalık
            alanlarını bir araya getirir.
          </p>
          <a href="/hakkimda">Hakkımda ›</a>
        </div>
      )}
    </AyarlarFrame>
  );
}
