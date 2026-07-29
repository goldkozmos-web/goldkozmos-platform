const WHATSAPP_CONTACT_URL =
  "https://api.whatsapp.com/send?phone=905054722153";

const WHATSAPP_CHANNEL_URL =
  "https://www.whatsapp.com/channel/0029Vb8BNoHHwXbBIssG2k1s";

const activeGroups = [
  {
    number: "01",
    badge: "KAYITLAR AÇIK",
    title: "Aşkı Hayatına Çağır",
    audience: "Şu anda ilişkisi olmayanlar için",
    date: "03–07 Ağustos 2026",
    href: "/calismalar/ask",
  },
  {
    number: "02",
    badge: "KAYITLAR AÇIK",
    title: "İlişkini Şifalandır",
    audience: "Mevcut ilişkisini dönüştürmek isteyenler için",
    date: "10–14 Ağustos 2026",
    href: "/calismalar/iliski",
  },
  {
    number: "03",
    badge: "KAYITLAR AÇIK",
    title: "Para Enerjisi Aktivasyonu",
    audience: "Para ve bolluk alanını güçlendirmek isteyenler için",
    date: "17–21 Ağustos 2026",
    href: "/calismalar/para",
  },
];

export default function Hero() {
  return (
    <section className="heroSection">
      <div className="heroContainer">
        <div
          className="heroContent"
          style={{
            position: "relative",
            zIndex: 50,
            pointerEvents: "auto",
          }}
        >
          <p className="brandName">
            GOLDKOZMOS
            <sup className="registeredSymbol">®</sup>
            <br />
            ENERJİ EKOLÜ
          </p>

          <h1 className="heroTitle">
            İnsan Değişmeden
            <span>Hayat Değişmez.</span>
          </h1>

          <p className="heroDescription">
            Goldkozmos® Enerji Ekolü, Spiritüel Stoa ve sosyoloji bakış
            açısıyla geliştirilen, Goldkozmos®’a özgü enerji sistemiyle
            farkındalık odaklı içsel dönüşümünü desteklemeyi amaçlayan özgün
            bir yaklaşımdır.
          </p>

          <div className="heroButtons">
            <a
              href="/sana-uygun-calismayi-bul"
              className="primaryButton"
            >
              Sana Uygun Çalışmayı Bul
            </a>

            <a href="/calismalar" className="secondaryButton">
              Çalışmaları Keşfet
            </a>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 9999,
              marginTop: "27px",
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              pointerEvents: "auto",
            }}
          >
            <a
              href={WHATSAPP_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "relative",
                zIndex: 9999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "46px",
                padding: "0 22px",
                border: "1px solid rgba(167, 125, 48, 0.45)",
                borderRadius: "999px",
                backgroundColor: "#ffffff",
                color: "#8b6828",
                fontFamily: "inherit",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              WhatsApp&apos;tan Bilgi Al
            </a>

            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "relative",
                zIndex: 9999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "46px",
                padding: "0 22px",
                border: "1px solid rgba(167, 125, 48, 0.45)",
                borderRadius: "999px",
                backgroundColor: "#ffffff",
                color: "#8b6828",
                fontFamily: "inherit",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              WhatsApp Kanalına Katıl
            </a>
          </div>

          <p className="heroNote">KENDİ KOZMOSUNU BUL</p>
        </div>

        <div className="heroVisual">
          <div className="heroImagePlaceholder">
            <div className="heroBrandPanel">
              <span className="heroPanelEyebrow">
                ÖZGÜN DÖNÜŞÜM YAKLAŞIMI
              </span>

              <h2>
                Goldkozmos
                <sup className="registeredSymbol">®</sup>

                <span className="heroBrandSubline">
                  Enerji Ekolü
                </span>
              </h2>

              <p>
                Spiritüel Stoa
                <span>•</span>
                Sosyoloji
                <span>•</span>
                Enerji
              </p>

              <div className="heroPanelLine" />

              <small>Kendi Kozmosunu Bul.</small>
            </div>
          </div>
        </div>
      </div>

      <div className="activeGroupsSection">
        <div className="activeGroupsHeader">
          <div>
            <p className="activeGroupsEyebrow">
              GÜNCEL GRUP ÇALIŞMALARI
            </p>

            <h2>
              Ağustos programlarında
              <span> yerini ayır.</span>
            </h2>
          </div>

          <p>
            Beş günlük canlı online grup çalışmalarından sana uygun olanı
            seç, program detaylarını incele ve kayıt sürecine geç.
          </p>
        </div>

        <div className="activeGroupsGrid">
          {activeGroups.map((group) => (
            <article
              className="activeGroupCard"
              key={group.number}
            >
              <div className="activeGroupCardTop">
                <span className="activeGroupNumber">
                  {group.number}
                </span>

                <span className="activeGroupBadge">
                  {group.badge}
                </span>
              </div>

              <div className="activeGroupCardContent">
                <p className="activeGroupDate">
                  {group.date}
                </p>

                <h3>{group.title}</h3>

                <p className="activeGroupAudience">
                  {group.audience}
                </p>

                <a href={group.href}>
                  Programı İncele
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="trustBar">
        <span>Online Çalışmalar</span>
        <span>Google Meet</span>
        <span>Bireysel ve Grup Programları</span>
        <span>Tarot ve Numeroloji</span>
        <span>Dijital İçerik Ekosistemi</span>
      </div>
    </section>
  );
}