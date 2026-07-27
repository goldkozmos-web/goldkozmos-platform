const frequencyTracks = [
  {
    number: "01",
    category: "DENGE",
    title: "Dişil ve Eril Enerji Dengeleme",
    description:
      "Dişil ve eril yönlerin arasındaki dengeyi fark etmeye ve günlük yaşamındaki içsel uyumu desteklemeye yönelik ses çalışması.",
    duration: "30–45 Dakika",
    href: "/goldfrekans/disil-eril-enerji",
  },
  {
    number: "02",
    category: "ENERJİ ALANI",
    title: "Alanını Güçlendir",
    description:
      "Kendi sınırlarını, enerjini ve kişisel alanını daha bilinçli biçimde fark etmeyi destekleyen yönlendirmeli çalışma.",
    duration: "30–45 Dakika",
    href: "/goldfrekans/alanini-guclendir",
  },
  {
    number: "03",
    category: "İÇSEL SAKİNLİK",
    title: "Uyku ve Zihinsel Sakinlik",
    description:
      "Günün yoğunluğundan uzaklaşmaya, zihni yavaşlatmaya ve dinlenme alanı oluşturmaya yönelik ses kaydı.",
    duration: "30–45 Dakika",
    href: "/goldfrekans/uyku-ve-sakinlik",
  },
];

export default function GoldFrekansSection() {
  return (
    <section className="goldFrekansSection" id="goldfrekans">
      <div className="goldFrekansContainer">
        <header className="goldFrekansHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
              </span>

              <br />

              <span>ENERJİ EKOLÜ</span>

              <br />

              <span>GOLDFREKANS</span>
            </p>

            <h2>
              Dinle, alanını kur
              <span> ve kendine dön.</span>
            </h2>
          </div>

          <div className="goldFrekansHeadingContent">
            <p>
              Goldkozmos® Enerji Ekolü’nün kendi zamanında
              uygulayabileceğin yönlendirmeli ses kayıtlarını, meditasyonlarını
              ve farkındalık odaklı dijital çalışmalarını keşfet.
            </p>

            <a href="/goldfrekans">
              Tüm Ses Çalışmalarını Gör
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </header>

        <div className="goldFrekansFeatured">
          <div className="goldFrekansVisual">
            <div className="goldFrekansCoverPlaceholder">
              <span>Kapak görseli daha sonra eklenecek</span>

              <div className="goldFrekansWave" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="goldFrekansFeaturedContent">
            <p className="goldFrekansFeaturedEyebrow">
              ÖNE ÇIKAN SES ÇALIŞMASI
            </p>

            <h3>Kendi Alanına Geri Dön</h3>

            <p>
              Dış dünyanın yoğunluğundan uzaklaşarak kendi duygularını,
              sınırlarını ve içsel ihtiyaçlarını yeniden fark etmene eşlik eden
              yönlendirmeli bir ses çalışması.
            </p>

            <div className="goldFrekansMeta">
              <span>Yönlendirmeli Ses Kaydı</span>
              <span>30–45 Dakika</span>
              <span>Dijital İçerik</span>
            </div>

            <a href="/goldfrekans/kendi-alanina-geri-don">
              Çalışmayı İncele
              <span aria-hidden="true">▶</span>
            </a>
          </div>
        </div>

        <div className="goldFrekansList">
          {frequencyTracks.map((track) => (
            <article className="goldFrekansTrack" key={track.number}>
              <span className="goldFrekansTrackNumber">
                {track.number}
              </span>

              <div className="goldFrekansTrackContent">
                <p>{track.category}</p>

                <h3>{track.title}</h3>

                <span>{track.description}</span>
              </div>

              <div className="goldFrekansTrackAction">
                <small>{track.duration}</small>

                <a
                  href={track.href}
                  aria-label={`${track.title} çalışmasını incele`}
                >
                  <span aria-hidden="true">▶</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="goldFrekansNote">
          <p>
            GoldFrekans içerikleri, kişisel farkındalık ve rahatlama sürecini
            desteklemek amacıyla Goldkozmos® Enerji Ekolü tarafından
            hazırlanır.
          </p>

          <a href="/goldfrekans">
            GoldFrekans Kütüphanesini Keşfet
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}