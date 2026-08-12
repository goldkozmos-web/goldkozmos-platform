const journey = [
  {
    year: "2022",
    title: "İlk Eğitim",
    text: "Bioenerji temel seviye eğitimiyle yeni bir öğrenme ve farkındalık sürecine başladım.",
  },
  {
    year: "2023",
    title: "Goldkozmos®",
    text: "Öğrendiklerimi paylaşabileceğim ve kendi yaklaşımımı geliştirebileceğim alanı kurdum.",
  },
  {
    year: "BUGÜN",
    title: "≈ 450 Kişilik Deneyim",
    text: "Farklı hikâyelere, ihtiyaçlara ve bireysel gelişim süreçlerine eşlik ettim.",
  },
];

const approach = [
  {
    number: "01",
    title: "Kendilik",
    text: "Özdeğer, sınırlar, seçimler ve tekrar eden kişisel örüntüler.",
  },
  {
    number: "02",
    title: "Stoa",
    text: "Kontrol edebildiğimiz alan, kişisel sorumluluk ve içsel dayanıklılık.",
  },
  {
    number: "03",
    title: "Sosyolojik Bakış",
    text: "Aile, toplum, kültür ve öğrenilmiş rollerin insan üzerindeki etkisi.",
  },
];

export default function HakkimdaPage() {
  return (
    <main className="aboutCompactPage" id="top">
      {/* NAVBAR */}

      <header className="homeV3Nav">
        <div className="homeV3NavInner">
          <a className="homeV3Brand" href="/">
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>

            <span>ENERJİ EKOLÜ</span>
          </a>

          <nav className="homeV3Menu">
            <a href="/#rezonans">Atölyeler</a>
            <a href="/#diger">Çalışmalar</a>
            <a href="/goldbook">GoldBook</a>
            <a href="/goldcast">GoldCast</a>
            <a href="/goldblog">GoldBlog</a>
          </nav>

          <a
            className="homeV3NavTest"
            href="/sana-uygun-calismayi-bul"
          >
            Ücretsiz Test
            <span>→</span>
          </a>
        </div>
      </header>

      {/* ANA ALAN */}

      <section className="aboutCompactSection">
        <div className="aboutCompactContainer">
          <article className="aboutCompactCard">
            {/* HERO */}

            <div className="aboutCompactHero">
              <div className="aboutCompactHeroCopy">
                <p className="aboutCompactEyebrow">
                  GOLDKOZMOS®’UN ARKASINDAKİ İSİM
                </p>

                <h1>
                  Ben Özge Batıgün.
                  
                  <span> 
                      
                Kendi yolumu ararken Goldkozmos® doğdu.</span>
                </h1>

                <p className="aboutCompactLead">
                  İnsanların neden aynı ilişkileri, düşünceleri ve yaşam
                  döngülerini tekrar ettiğini anlamaya duyduğum merak,
                  zamanla bugün yaptığım çalışmaların temelini oluşturdu.
                </p>

                <p className="aboutCompactIntro">
                  Turizm ve Otelcilik eğitiminin ardından kendi yönümü
                  yeniden sorguladığım bir dönemde farklı farkındalık
                  yöntemleriyle tanıştım. Öğrendikçe insanı yalnızca
                  yaşadıklarıyla değil; düşünceleri, ilişkileri, seçimleri
                  ve içinde bulunduğu toplumsal yapı ile birlikte
                  değerlendirmenin önemini fark ettim.
                </p>

                <div className="aboutCompactHeroActions">
                  <a
                    className="homeV3PrimaryButton"
                    href="/#rezonans"
                  >
                    Çalışmaları Keşfet
                    <span>→</span>
                  </a>

                  <a
                    className="homeV3SecondaryButton"
                    href="/sana-uygun-calismayi-bul"
                  >
                    Ücretsiz Test
                  </a>
                </div>
              </div>

              {/* FOTOĞRAF */}

              <div className="aboutCompactPortrait">
                <img
                  src="/images/services/ozge-batigun-hakkimda.webp"
                  alt="Özge Batıgün"
                />

                <div className="aboutCompactPortraitTag">
                  <span>KURUCU</span>

                  <div>
                    <strong>Özge Batıgün</strong>
                    <small>Goldkozmos® Enerji Ekolü</small>
                  </div>
                </div>
              </div>
            </div>

            {/* KISA YOLCULUK */}

            <div className="aboutCompactStats">
              {journey.map((item) => (
                <div key={item.year}>
                  <span>{item.year}</span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            {/* ORTA ALAN */}

            <div className="aboutCompactMiddle">
              {/* GOLDKOZMOS NASIL DOĞDU */}

              <section className="aboutCompactStory">
                <p className="aboutCompactEyebrow">
                  GOLDKOZMOS® NASIL DOĞDU?
                </p>

                <h2>
                  “Neden kendi sayfam olmasın?”
                  <span> sorusu bir markaya dönüştü.</span>
                </h2>

                <p>
                  Eğitimlerime devam ederken öğrendiklerimi yalnızca
                  kendimde tutmak istemediğimi fark ettim. Hem öğrenmeye
                  devam edebileceğim hem de insanlarla paylaşabileceğim
                  kendi alanımı oluşturmak istedim.
                </p>

                <p>
                  İnsanlarla çalıştıkça aynı sorun gibi görünen iki
                  deneyimin altında bile bambaşka ihtiyaçlar, korkular,
                  ilişki biçimleri ve öğrenilmiş roller bulunabileceğini
                  gördüm.
                </p>

                <div className="aboutCompactQuote">
                  <span>✦</span>

                  <p>
                    Goldkozmos® benim için hazır cevaplar vermekten çok,
                    insanın kendi hayatını daha net görebileceği bir alan.
                  </p>
                </div>
              </section>

              {/* YAKLAŞIM */}

              <section className="aboutCompactApproach">
                <p className="aboutCompactEyebrow">
                  BUGÜNKÜ YAKLAŞIMIM
                </p>

                <h2>
                  İnsanı
                  <span> tek bir yerden okumamak.</span>
                </h2>

                <div className="aboutCompactApproachList">
                  {approach.map((item) => (
                    <div key={item.number}>
                      <span>{item.number}</span>

                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* MANİFESTO */}

            <div className="aboutCompactManifesto">
              <div>
                <p className="aboutCompactEyebrow">
                  GOLDKOZMOS®
                </p>

                <h2>
                  İnsan değişmeden
                  <span> hayat değişmez.</span>
                </h2>

                <p>
                  İnsan kendi sınırlarını, seçimlerini ve tekrar eden
                  örüntülerini görmeden yalnızca dışarıdaki şartları
                  değiştirmeye çalışır. Goldkozmos® bu farkındalığın
                  içeriden başlayabileceği bir alan olarak doğdu.
                </p>
              </div>

              <a
                className="aboutCompactManifestoButton"
                href="/#rezonans"
              >
                Çalışmaları Gör
                <span>→</span>
              </a>
            </div>
          </article>

          <p className="aboutCompactNote">
            Goldkozmos® içerikleri kişisel farkındalık ve bireysel gelişim
            amacıyla hazırlanır; psikolojik veya tıbbi danışmanlık yerine
            geçmez.
          </p>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="homeV3Footer">
        <div className="homeV3FooterInner">
          <div className="homeV3FooterBrand">
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>

            <span>ENERJİ EKOLÜ</span>
          </div>

          <p>
            Kişisel gelişim · Stoa · Rezonans
          </p>

          <div className="homeV3FooterLinks">
            <a href="/">Ana Sayfa</a>
            <a href="#top">Yukarı ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}