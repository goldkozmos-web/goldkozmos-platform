import Image from "next/image";
const WHATSAPP_CHANNEL_URL =
  "https://www.whatsapp.com/channel/0029Vb8BNoHHwXbBIssG2k1s";

const WHATSAPP_CONTACT_URL = "https://wa.me/905054722153";

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
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "420px",
              aspectRatio: "941 / 1672",
              margin: "0 auto",
              overflow: "hidden",
              borderRadius: "34px",
              border: "1px solid rgba(190, 145, 58, 0.35)",
              boxShadow:
                "0 35px 80px rgba(61, 43, 15, 0.22), 0 10px 30px rgba(0, 0, 0, 0.12)",
              backgroundColor: "#080704",
            }}
          >
            <Image
              src="/images/services/whatsapp-kanali-v2.jpeg"
              alt="Goldkozmos WhatsApp Kanalı"
              fill
              priority
              sizes="(max-width: 768px) 88vw, 420px"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
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
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Kanalına Katıl
              <span aria-hidden="true">↗</span>
            </a>

            <a
              className="whatsAppSecondaryButton"
              href={WHATSAPP_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Goldkozmos® ile İletişime Geç
              <span aria-hidden="true">↗</span>
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