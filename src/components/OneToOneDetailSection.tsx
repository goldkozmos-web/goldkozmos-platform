const WHATSAPP_NUMBER = "905054722153";

const singleSessionWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Merhaba, Goldkozmos Tek Birebir Seans hakkında bilgi almak ve randevu oluşturmak istiyorum."
)}`;

const intensivePackageWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Merhaba, Goldkozmos 5 Günlük Yoğun Birebir Paket hakkında bilgi almak istiyorum."
)}`;

export default function OneToOneDetailSection() {
  return (
    <section
      className="oneToOneCompactSection"
      id="birebir-seanslar"
    >
      <div className="oneToOneCompactContainer">
        {/* BAŞLIK */}

        <header className="oneToOneCompactHeader">
          <div>
            <p className="oneToOneCompactEyebrow">
              BİREBİR SEANSLAR
            </p>

            <h1>
              İhtiyacına göre
              <span> kendi çalışma biçimini seç.</span>
            </h1>
          </div>

          <p className="oneToOneCompactLead">
            Belirli bir konuya odaklanmak için tek seansla
            başlayabilir ya da aynı konu üzerinde beş günlük
            yoğun bir süreç planlayabilirsin.
          </p>
        </header>

        {/* SEÇENEKLER */}

        <div className="oneToOneCompactOptions">
          {/* TEK SEANS */}

          <article className="oneToOneCompactCard">
            <div className="oneToOneCompactCardTop">
              <span>01</span>

              <p>TEK BİREBİR SEANS</p>
            </div>

            <details className="oneToOneCompactDetails">
              <summary>
                Detaylar
                <span aria-hidden="true">+</span>
              </summary>

              <div className="oneToOneCompactDetailsBody">
                <p className="oneToOneCompactDetailsEyebrow">
                  PROGRAM DETAYI
                </p>

                <h3>
                  Tek bir konuya birlikte yakından bakıyoruz.
                </h3>

                <ul>
                  <li>
                    <span>✦</span>
                    Görüşme öncesinde çalışmak istediğin ana konu
                    belirlenir.
                  </li>

                  <li>
                    <span>✦</span>
                    Mevcut durumun ve tekrar eden örüntülerin
                    birlikte incelenir.
                  </li>

                  <li>
                    <span>✦</span>
                    Konuya eşlik eden düşünce, duygu ve davranış
                    biçimleri ele alınır.
                  </li>

                  <li>
                    <span>✦</span>
                    Seans sonunda sana uygun farkındalık ve sonraki
                    adımlar netleştirilir.
                  </li>
                </ul>

                <a
                  href={singleSessionWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oneToOneCompactWhatsapp"
                >
                  WhatsApp&apos;tan Mesajlaş
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </details>

            <h2>Tek Seans</h2>

            <p className="oneToOneCompactCardText">
              Tek bir konuya odaklanmak, mevcut durumunu daha net
              görmek ve kişisel bir yön belirlemek için.
            </p>

            <div className="oneToOneCompactMeta">
              <span>Online</span>
              <span>50–60 Dakika</span>
            </div>

            <div className="oneToOneCompactBottom">
              <strong>2.500 TL</strong>
            </div>
          </article>

          {/* 5 GÜNLÜK PAKET */}

          <article className="oneToOneCompactCard">
            <div className="oneToOneCompactCardTop">
              <span>02</span>

              <p>YOĞUN BİREBİR SÜREÇ</p>
            </div>

            <details className="oneToOneCompactDetails">
              <summary>
                Detaylar
                <span aria-hidden="true">+</span>
              </summary>

              <div className="oneToOneCompactDetailsBody">
                <p className="oneToOneCompactDetailsEyebrow">
                  PROGRAM DETAYI
                </p>

                <h3>
                  Aynı konu üzerinde beş gün boyunca ilerliyoruz.
                </h3>

                <div className="oneToOneCompactDays">
                  <div>
                    <span>01</span>

                    <p>
                      <strong>Başlangıç</strong>
                      Konunun ve mevcut durumun netleştirilmesi.
                    </p>
                  </div>

                  <div>
                    <span>02</span>

                    <p>
                      <strong>Örüntüler</strong>
                      Tekrar eden düşünce ve davranış kalıplarının
                      incelenmesi.
                    </p>
                  </div>

                  <div>
                    <span>03</span>

                    <p>
                      <strong>Derinleşme</strong>
                      Konunun altında çalışan ihtiyaç ve duygulara
                      bakılması.
                    </p>
                  </div>

                  <div>
                    <span>04</span>

                    <p>
                      <strong>Uygulama</strong>
                      Yeni bakış açılarının günlük yaşamdaki
                      karşılığının gözlemlenmesi.
                    </p>
                  </div>

                  <div>
                    <span>05</span>

                    <p>
                      <strong>Bütünleme</strong>
                      Beş günlük sürecin değerlendirilmesi ve
                      sonraki yönün belirlenmesi.
                    </p>
                  </div>
                </div>

                <a
                  href={intensivePackageWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oneToOneCompactWhatsapp"
                >
                  WhatsApp&apos;tan Mesajlaş
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </details>

            <h2>5 Günlük Paket</h2>

            <p className="oneToOneCompactCardText">
              Aynı konu üzerinde ara vermeden ilerlemek ve süreci
              birkaç güne yayarak daha yakından incelemek için.
            </p>

            <div className="oneToOneCompactMeta">
              <span>Online</span>
              <span>5 Ardışık Gün</span>
            </div>

            <div className="oneToOneCompactBottom">
              <strong>5.000 TL</strong>
            </div>
          </article>
        </div>

        {/* KISA SÜREÇ */}

        <div className="oneToOneCompactProcess">
          <div>
            <span>01</span>

            <p>
              <strong>Konunu belirle</strong>
              <small>
                Neye odaklanmak istediğini netleştir.
              </small>
            </p>
          </div>

          <div>
            <span>02</span>

            <p>
              <strong>Modelini seç</strong>
              <small>Tek seans veya 5 günlük süreç.</small>
            </p>
          </div>

          <div>
            <span>03</span>

            <p>
              <strong>Mesajını gönder</strong>
              <small>WhatsApp üzerinden süreci planla.</small>
            </p>
          </div>
        </div>

        {/* NOT */}

        <p className="oneToOneCompactNotice">
          Birebir çalışmalar kişisel farkındalık ve bireysel
          gelişim amacıyla hazırlanır. Psikoterapi, psikolojik
          danışmanlık, tıbbi teşhis veya tedavi yerine geçmez.
        </p>
      </div>
    </section>
  );
}