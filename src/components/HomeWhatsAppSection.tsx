import Link from "next/link";

export default function HomeWhatsAppSection() {
  return (
    <section className="homeWhatsAppSection" id="whatsapp">
      <div className="homeWhatsAppContainer">
        <div className="homeWhatsAppCard">
          <div className="homeWhatsAppCopy">
            <p className="sectionEyebrow">WHATSAPP KANALI</p>

            <h2>
              Yeni çalışmaları ve duyuruları
              <span> kaçırma.</span>
            </h2>

            <p>
              Goldkozmos® WhatsApp kanalında yeni atölyeler, GoldBook
              içerikleri, GoldCast yayınları ve güncel duyurular paylaşılır.
            </p>

            <div className="homeWhatsAppActions">
              <Link className="homeWhatsAppPrimary" href="/whatsapp-kanali">
                WhatsApp Kanalına Katıl
                <span aria-hidden="true">→</span>
              </Link>

              <span>Ücretsiz kanal · Duyuru odaklı</span>
            </div>
          </div>

          <div className="homeWhatsAppVisual" aria-hidden="true">
            <div className="homeWhatsAppPhone">
              <div className="homeWhatsAppPhoneTop">
                <span className="homeWhatsAppAvatar">G</span>

                <div>
                  <strong>Goldkozmos®</strong>
                  <small>WhatsApp Kanalı</small>
                </div>
              </div>

              <div className="homeWhatsAppMessage">
                <span>Yeni çalışma</span>
                <p>Goldkozmos®’taki yeni içerik ve duyurular burada.</p>
              </div>

              <div className="homeWhatsAppMessage homeWhatsAppMessageAlt">
                <span>GoldBook</span>
                <p>Yeni yayınlar ve dijital içerikler kanalda paylaşılır.</p>
              </div>

              <div className="homeWhatsAppSignal">
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}