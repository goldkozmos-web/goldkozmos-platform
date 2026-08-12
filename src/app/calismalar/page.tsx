const journey = [
  {
    year: "2022",
    title: "İlk Eğitim",
    text: "Bioenerji temel seviye eğitimiyle yeni bir öğrenme sürecine başladım.",
  },
  {
    year: "2023",
    title: "Rehberlik Yolculuğu",
    text: "Öğrendiklerimi önce yakın çevremle, ardından danışanlarımla çalışmaya başladım.",
  },
  {
    year: "BUGÜN",
    title: "≈ 450 Kişilik Deneyim",
    text: "Farklı hikâyelere, ihtiyaçlara ve kişisel dönüşüm süreçlerine eşlik ettim.",
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

      {/* ANA KART */}

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
                  <span> Kendi yolumu ararken Goldkozmos® doğdu.</span>
                </h1>

                <p className="aboutCompactLead">
                  İnsanların neden aynı ilişkileri, aynı düşünceleri
                  ve aynı yaşam döngülerini tekrar ettiğini anlamaya
                  duyduğum merak zamanla bugün yaptığım çalışmaların
                  temelini oluşturdu.
                </p>

                <p className="aboutCompactIntro">
                  Turizm ve Otelcilik eğitiminin ardından kendi yönümü
                  yeniden sorguladığım bir dönemde farklı farkındalık
                  yöntemleriyle tanıştım. Öğrendikçe, yalnızca bireysel
                  deneyimin değil; düşünce biçimimizin, ilişkilerimizin
                  ve içinde yaşadığımız toplumun da bizi şekillendirdiğini
                  daha net görmeye başladım.
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

              {/* PORTRE */}

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

            {/* KISA ZAMAN ÇİZGİSİ */}

            <div className="aboutCompactStats">
              {journey.map((item) => (
                <div key={item.year}>
                  <span>{item.year}</span>

                  <strong>{item.title}</strong>

                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            {/* HİKÂYE + YAKLAŞIM */}

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
                  bir alan oluşturmak istedim.
                </p>

                <p>
                  Zaman içinde farklı insanların benzer görünen
                  sorunlarının altında aslında çok farklı ihtiyaçlar,
                  korkular, alışkanlıklar ve toplumsal etkiler
                  bulunabildiğini gördüm.
                </p>

                <div className="aboutCompactQuote">
                  <span>✦</span>

                  <p>
                    Benim için Goldkozmos®, insanlara hazır cevaplar
                    vermekten çok kendi hayatlarına daha net
                    bakabilecekleri bir alan oluşturmak demek.
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
                  Çünkü insan kendi sınırlarını, seçimlerini ve
                  tekrar eden örüntülerini görmeden yalnızca
                  dışarıdaki şartları değiştirmeye çalışır.
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
            Goldkozmos® içerikleri kişisel farkındalık ve bireysel
            gelişim amacıyla hazırlanır; psikolojik veya tıbbi
            danışmanlık yerine geçmez.
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

          <p>Kişisel gelişim · Stoa · Rezonans</p>

          <div className="homeV3FooterLinks">
            <a href="/">Ana Sayfa</a>
            <a href="#top">Yukarı ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}