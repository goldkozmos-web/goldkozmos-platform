const WHATSAPP_CONTACT_URL = "https://wa.me/905054722153";

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
        <div className="heroContent">
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
              marginTop: "27px",
              display: "flex",
              flexWrap: "wrap",
              gap: "22px",
            }}
          >
            <a
              href={WHATSAPP_CONTACT_URL}
              className="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 0 }}
            >
              WhatsApp&apos;tan Bilgi Al
            </a>

            <a
              href={WHATSAPP_CHANNEL_URL}
              className="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 0 }}
            >
              WhatsApp Kanalına Katıl
            </a>
          </div>

          <p className="heroNote">KENDİ KOZMOSUNU BUL</p>
        </div>

        <div
          className="heroVisual"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "108%",
              maxWidth: "680px",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: "32px",
              border: "1px solid rgba(201, 154, 63, 0.32)",
              backgroundColor: "#090806",
              boxShadow:
                "0 38px 100px rgba(0, 0, 0, 0.34), 0 0 70px rgba(190, 139, 48, 0.1)",
            }}
          >
            <img
              src="/images/services/7.png?v=3"
              alt="Özge Batıgün, Goldkozmos® Enerji Ekolü kurucusu"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />

            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                background:
                  "linear-gradient(180deg, transparent 58%, rgba(5, 4, 3, 0.08) 72%, rgba(5, 4, 3, 0.72) 100%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "26px",
                right: "26px",
                bottom: "24px",
                zIndex: 3,
                padding: "16px 19px",
                border: "1px solid rgba(218, 174, 85, 0.36)",
                borderRadius: "16px",
                background: "rgba(10, 8, 5, 0.78)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)",
              }}
            >
              <span
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#d6a94e",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                }}
              >
                KURUCU
              </span>

              <strong
                style={{
                  display: "block",
                  color: "#ffffff",
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: "25px",
                  fontWeight: 500,
                  lineHeight: 1.15,
                }}
              >
                Özge Batıgün
              </strong>

              <small
                style={{
                  display: "block",
                  marginTop: "7px",
                  color: "rgba(255, 255, 255, 0.72)",
                  fontSize: "11px",
                  letterSpacing: "0.07em",
                }}
              >
                Goldkozmos® Enerji Ekolü
              </small>
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
            Beş günlük canlı online grup çalışmalarından sana uygun olanı seç,
            program detaylarını incele ve kayıt sürecine geç.
          </p>
        </div>

        <div className="activeGroupsGrid">
          {activeGroups.map((group) => (
            <article className="activeGroupCard" key={group.number}>
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