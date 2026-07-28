import Link from "next/link";

const relationshipPaths = [
  {
    number: "01",
    eyebrow: "YENİ BİR İLİŞKİYE HAZIRLAN",
    title: "Aşkı Hayatına Çağır",
    description:
      "Hayatında şu anda romantik bir ilişkisi olmayan ve yeni bir ilişkiye içsel olarak hazırlanmak isteyen kişiler için oluşturulan beş günlük grup çalışması.",
    suitableFor: [
      "Hayatında mevcut bir ilişkisi olmayanlar",
      "Geçmiş ilişkilerin etkisini taşıyanlar",
      "Yeni birine güvenmekte zorlananlar",
      "Benzer ilişki döngülerini tekrarlayanlar",
    ],
    details: [
      "Geçmiş ilişki bağları",
      "Özdeğer ve çocukluk izleri",
      "Dişil ve eril enerji dengesi",
      "Yeni aşk enerjisine uyumlanma",
    ],
    href: "/calismalar/ask",
    button: "Aşkı Hayatına Çağır",
  },
  {
    number: "02",
    eyebrow: "MEVCUT İLİŞKİNİ DÖNÜŞTÜR",
    title: "İlişkini Şifalandır",
    description:
      "Mevcut romantik ilişkisinde iletişim, güven, kırgınlık veya duygusal uzaklık yaşayan kişiler için hazırlanan beş günlük grup çalışması.",
    suitableFor: [
      "Mevcut romantik ilişkisi olanlar",
      "Aynı tartışmaları tekrar yaşayanlar",
      "İlişkisinde güven sorunu bulunanlar",
      "Duygusal mesafe hissedenler",
    ],
    details: [
      "İlişki dinamikleri",
      "İletişim ve ihtiyaçlar",
      "Güven ve kırgınlık alanı",
      "İlişkide dişil ve eril denge",
    ],
    href: "/calismalar/iliski",
    button: "İlişkini Şifalandır",
  },
];

const comparisonItems = [
  {
    title: "Aşk çalışması kimler için?",
    description:
      "Hayatında mevcut bir romantik ilişkisi bulunmayan ve yeni bir ilişkiye hazırlanmak isteyen kişiler içindir.",
  },
  {
    title: "İlişki çalışması kimler için?",
    description:
      "Şu anda romantik bir ilişkisi bulunan ve mevcut bağındaki sorunları dönüştürmek isteyen kişiler içindir.",
  },
  {
    title: "Partner katılmalı mı?",
    description:
      "İlişkini Şifalandır çalışmasına tek başına katılabilirsin. Partnerinin programa katılması gerekmez.",
  },
  {
    title: "İki çalışma aynı mı?",
    description:
      "Hayır. Aşk çalışması yeni bir ilişkiye hazırlanır; ilişki çalışması mevcut romantik bağın dinamiklerine odaklanır.",
  },
];

export default function LoveRelationshipChoiceSection() {
  return (
    <section
      className="analysisHubSection"
      id="ask-ve-iliski-secimi"
    >
      <div className="analysisHubContainer">
        <div className="analysisHubIntro">
          <div>
            <p className="sectionEyebrow">
              AŞK VE İLİŞKİ ÇALIŞMALARI
            </p>

            <h2>
              Önce bulunduğun yeri seç,
              <span> sonra doğru çalışmaya ilerle.</span>
            </h2>
          </div>

          <div className="analysisHubIntroText">
            <p>
              Aşkı Hayatına Çağır ve İlişkini Şifalandır birbirinden bağımsız
              iki ayrı Goldkozmos® Enerji Ekolü programıdır.
            </p>

            <p>
              Doğru çalışmayı seçebilmek için hayatında şu anda romantik bir
              ilişkinin bulunup bulunmadığını dikkate almalısın.
            </p>
          </div>
        </div>

        <div className="analysisHubGrid">
          {relationshipPaths.map((path) => (
            <article
              className="analysisHubCard"
              key={path.title}
            >
              <div className="analysisHubCardTop">
                <span>{path.number}</span>
                <span aria-hidden="true">✦</span>
              </div>

              <p className="analysisHubCardEyebrow">
                {path.eyebrow}
              </p>

              <h3>{path.title}</h3>

              <p className="analysisHubCardDescription">
                {path.description}
              </p>

              <div className="analysisHubCardColumns">
                <div>
                  <h4>Kimler için?</h4>

                  <ul>
                    {path.suitableFor.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Çalışmanın odağı</h4>

                  <ul>
                    {path.details.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href={path.href}>
                {path.button}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="analysisHubComparison">
          <div className="analysisHubComparisonIntro">
            <p className="sectionEyebrow">
              İKİ ÇALIŞMA ARASINDAKİ FARK
            </p>

            <h2>
              Benzer görünseler de
              <span> farklı ihtiyaçlara açılırlar.</span>
            </h2>
          </div>

          <div className="analysisHubComparisonGrid">
            {comparisonItems.map((item, index) => (
              <article key={item.title}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="analysisHubNotice">
          <div>
            <p className="sectionEyebrow">
              KARAR VEREMEDİN Mİ?
            </p>

            <h2>
              Çalışmayı rastgele seçme,
              <span> ihtiyacını netleştir.</span>
            </h2>
          </div>

          <div>
            <p>
              Hayatında mevcut bir romantik ilişki bulunmuyorsa Aşkı Hayatına
              Çağır çalışmasını incelemelisin.
            </p>

            <p>
              Mevcut ilişkin üzerinde çalışmak istiyorsan İlişkini Şifalandır
              programı sana daha uygun olacaktır.
            </p>
          </div>
        </div>

        <div className="analysisHubActions">
          <Link href="/sana-uygun-calismayi-bul">
            Sana Uygun Çalışmayı Bul
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