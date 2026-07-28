import Link from "next/link";

const analysisTypes = [
  {
    number: "01",
    eyebrow: "SEMBOLLER VE İHTİMALLER",
    title: "Tarot Analizi",
    description:
      "Yaşadığın bir konuya kartların sembolik dili üzerinden farklı bir açıdan bakmana yardımcı olan kişiye özel sesli yorum çalışması.",
    suitableFor: [
      "Belirli bir konuda zihni karışık olanlar",
      "Aşk veya ilişki dinamiklerini değerlendirmek isteyenler",
      "Bir karar öncesinde seçeneklerini gözlemleyenler",
      "Kesin cevap yerine farkındalık arayanlar",
    ],
    details: [
      "Kişiye özel tarot açılımı",
      "Seçilen konuya göre hazırlık",
      "Sesli yorum olarak teslim",
      "Aşk, ilişki, para ve kariyer alanları",
    ],
    href: "/calismalar/tarot",
    button: "Tarot Analizini İncele",
  },
  {
    number: "02",
    eyebrow: "SAYILAR VE YAŞAM TEMALARI",
    title: "Numeroloji Analizi",
    description:
      "Doğum tarihi ve isim bilgilerinden hesaplanan kişisel sayı haritanı inceleyen dijital farkındalık çalışması.",
    suitableFor: [
      "Kendini daha yakından tanımak isteyenler",
      "Güçlü yönlerini ve yeteneklerini keşfetmek isteyenler",
      "İlişkilerdeki ihtiyaçlarını gözlemleyenler",
      "Kişisel yılının temasını merak edenler",
    ],
    details: [
      "Kişiye özel sayı haritası",
      "İsim ve doğum tarihi hesaplamaları",
      "Yaşam yolu ve ifade sayıları",
      "Kişisel yıl ve dönem incelemesi",
    ],
    href: "/calismalar/numeroloji",
    button: "Numeroloji Analizini İncele",
  },
];

const comparisonItems = [
  {
    title: "Tarot neye odaklanır?",
    description:
      "İçinde bulunduğun konuya, mevcut dinamiklere, ihtimallere ve gözden kaçırdığın sembolik mesajlara odaklanır.",
  },
  {
    title: "Numeroloji neye odaklanır?",
    description:
      "Doğum tarihin ve isim bilgilerinden hareketle temel karakter eğilimlerine, yaşam temalarına ve kişisel dönemlere odaklanır.",
  },
  {
    title: "Birlikte alınabilir mi?",
    description:
      "İki analiz farklı yöntemler kullanır. Kişisel sayı haritanı öğrenirken belirli bir konu için tarot yorumu da tercih edebilirsin.",
  },
  {
    title: "Hangisini seçmelisin?",
    description:
      "Güncel ve belirli bir konuya bakmak için Tarot; kendini ve yaşam temalarını daha kapsamlı tanımak için Numeroloji daha uygun olabilir.",
  },
];

export default function AnalysisHubSection() {
  return (
    <section className="analysisHubSection" id="analizler">
      <div className="analysisHubContainer">
        <div className="analysisHubIntro">
          <div>
            <p className="sectionEyebrow">KİŞİSEL ANALİZLER</p>

            <h2>
              Cevabı dışarıda aramadan önce
              <span> kendine başka bir açıdan bak.</span>
            </h2>
          </div>

          <div className="analysisHubIntroText">
            <p>
              Goldkozmos® Enerji Ekolü içerisinde Tarot ve Numeroloji,
              birbirinden farklı yöntemler kullanan iki ayrı kişisel analiz
              alanıdır.
            </p>

            <p>
              Tarot güncel bir konuya ve mevcut ihtimallere odaklanırken,
              Numeroloji doğum tarihi ve isim bilgilerinden oluşan daha geniş
              bir kişisel harita sunar.
            </p>
          </div>
        </div>

        <div className="analysisHubGrid">
          {analysisTypes.map((analysis) => (
            <article
              className="analysisHubCard"
              key={analysis.title}
            >
              <div className="analysisHubCardTop">
                <span>{analysis.number}</span>
                <span aria-hidden="true">✦</span>
              </div>

              <p className="analysisHubCardEyebrow">
                {analysis.eyebrow}
              </p>

              <h3>{analysis.title}</h3>

              <p className="analysisHubCardDescription">
                {analysis.description}
              </p>

              <div className="analysisHubCardColumns">
                <div>
                  <h4>Kimler için?</h4>

                  <ul>
                    {analysis.suitableFor.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Analiz içeriği</h4>

                  <ul>
                    {analysis.details.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href={analysis.href}>
                {analysis.button}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="analysisHubComparison">
          <div className="analysisHubComparisonIntro">
            <p className="sectionEyebrow">
              HANGİ ANALİZ SANA UYGUN?
            </p>

            <h2>
              Aynı kapıya değil,
              <span> farklı içsel alanlara açılırlar.</span>
            </h2>
          </div>

          <div className="analysisHubComparisonGrid">
            {comparisonItems.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="analysisHubNotice">
          <div>
            <p className="sectionEyebrow">
              ÖNEMLİ BİLGİLENDİRME
            </p>

            <h2>
              Analizler yol gösterir,
              <span> hayatını senin yerine yönetmez.</span>
            </h2>
          </div>

          <div>
            <p>
              Tarot ve Numeroloji analizleri sembolik ve yorumsal
              farkındalık çalışmalarıdır. Kesin gelecek, ilişki, sağlık,
              kariyer veya maddi kazanç garantisi sunmaz.
            </p>

            <p>
              Sağlık, hukuk, psikoloji, finans ve yatırım kararlarında yetkili
              uzman desteğinin yerine kullanılmamalıdır.
            </p>
          </div>
        </div>

        <div className="analysisHubActions">
          <Link href="/sana-uygun-calismayi-bul">
            Hangi Analizin Uygun Olduğunu Bul
            <span aria-hidden="true">→</span>
          </Link>

          <Link href="/calismalar">
            Tüm Çalışmalara Dön
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}