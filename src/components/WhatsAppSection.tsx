const communityBenefits = [
  {
    number: "01",
    title: "Yeni Çalışma Duyuruları",
    description:
      "Grup çalışmaları, birebir seanslar ve yeni program tarihlerini ilk öğrenenlerden ol.",
  },
  {
    number: "02",
    title: "Ücretsiz İçerikler",
    description:
      "Olumlamalar, kısa farkındalık çalışmaları ve günlük yaşamına eşlik edecek içeriklere ulaş.",
  },
  {
    number: "03",
    title: "Goldkozmos® Gündemi",
    description:
      "GoldBook, GoldCast, GoldBlog ve GoldFrekans içeriklerinden haberdar ol.",
  },
];

export default function WhatsAppSection() {
  return (
    <section className="whatsAppSection" id="whatsapp">
      <div className="whatsAppContainer">
        <div className="whatsAppVisual">
          <div className="whatsAppPhonePlaceholder">
            <div className="whatsAppPhoneTop">
              <span className="whatsAppPhoneAvatar">G</span>

              <div>
                <strong>
                  Goldkozmos
                  <sup className="registeredSymbol">®</sup>
                </strong>

                <small>Enerji Ekolü • WhatsApp Kanalı</small>
              </div>
            </div>

            <div className="whatsAppMessages">
              <div className="whatsAppMessage">
                <span>
                  GOLDKOZMOS
                  <sup className="registeredSymbol">®</sup>
                  <br />
                  ENERJİ EKOLÜ
                </span>

                <p>
                  Yeni çalışmalar, ücretsiz içerikler ve topluluğa özel
                  duyurular burada paylaşılır.
                </p>
              </div>

              <div className="whatsAppMessage whatsAppMessageSecondary">
                <span>BUGÜNÜN NOTU</span>

                <p>
                  İnsan değişmeden hayat değişmez. Değişim, kendini fark
                  ettiğin yerde başlar.
                </p>
              </div>
            </div>

            <small className="whatsAppVisualNote">
              Kanal görseli daha sonra eklenecek
            </small>
          </div>
        </div>

        <div className="whatsAppContent">
          <p className="sectionEyebrow">
            <span>
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup>
            </span>

            <br />

            <span>ENERJİ EKOLÜ TOPLULUĞU</span>
          </p>

          <h2>
            Duyuruları kaçırma,
            <span> topluluğun içinde kal.</span>
          </h2>

          <p className="whatsAppDescription">
            Goldkozmos® Enerji Ekolü WhatsApp Kanalı; yeni çalışmaların,
            ücretsiz etkinliklerin, özel içeriklerin ve önemli duyuruların
            paylaşıldığı topluluk alanıdır.
          </p>

          <div className="whatsAppBenefits">
            {communityBenefits.map((benefit) => (
              <div className="whatsAppBenefit" key={benefit.number}>
                <span>{benefit.number}</span>

                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="whatsAppActions">
            <a
              className="whatsAppPrimaryButton"
              href="/whatsapp-kanali"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Kanalına Katıl
              <span aria-hidden="true">↗</span>
            </a>

            <a className="whatsAppSecondaryButton" href="/iletisim">
              Goldkozmos® ile İletişime Geç
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <p className="whatsAppNote">
            Kanal bildirimlerini açarak yeni program ve içerik duyurularını
            takip edebilirsin.
          </p>
        </div>
      </div>
    </section>
  );
}