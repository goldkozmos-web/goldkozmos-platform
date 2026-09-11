"use client";

import AyarlarFrame from "./AyarlarFrame";

export default function AyarlarSss() {
  return (
    <AyarlarFrame title="Sıkça Sorulan Sorular" backHref="/ayarlar">
      {() => (
        <div className="ayarlarCard ayarlarCopy">
          <p>Sık sorulanlar ana sayfadaki SSS bölümünde durur.</p>
          <a href="/#sss">SSS’ye git ›</a>
        </div>
      )}
    </AyarlarFrame>
  );
}
