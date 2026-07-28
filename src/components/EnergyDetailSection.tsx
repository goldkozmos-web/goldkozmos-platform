import Link from "next/link";

const energyAreas = [
  {
    number: "01",
    title: "Çakra ve Enerji Dengesi",
    description:
      "Yedi ana çakra ve tali enerji bölgeleri üzerinden kişinin kendi içsel dengesini gözlemlemesine alan açar.",
    topics: [
      "Yedi ana çakra çalışmaları",
      "Tali çakralar",
      "Enerji merkezlerini fark etme",
      "İçsel denge niyeti",
    ],
  },
  {
    number: "02",
    title: "Aura ve Enerji Alanı",
    description:
      "Kişinin çevresel etkiler, yoğun duygular ve günlük yaşam içinde kendi enerji alanını daha yakından gözlemlemesine odaklanır.",
    topics: [
      "Aura farkındalığı",
      "Enerji alanını arındırma",
      "Kişisel sınırlar",
      "Enerji alanını güçlendirme",
    ],
  },
  {
    number: "03",
    title: "Dişil ve Eril Enerji",
    description:
      "Alma, verme, güvenme, harekete geçme, üretme ve akışta kalma hâlleri arasındaki dengeyi incelemeye yardımcı olur.",
    topics: [
      "Dişil enerji alanı",
      "Eril enerji alanı",
      "Alma ve verme dengesi",
      "Üretim ve akış dengesi",
    ],
  },
  {
    number: "04",
    title: "Geçmiş Bağlar ve Karma",
    description:
      "Geçmiş deneyimlerden, ilişkilerden ve aile sisteminden taşındığı düşünülen tekrarları fark etmeye odaklanır.",
    topics: [
      "Geçmiş bağları fark etme",
      "Bağ kesme çalışmaları",
      "Atalardan gelen kalıplar",
      "Karma farkındalığı",
    ],
  },
  {
    number: "05",
    title: "Mekân ve Çevresel Enerji",
    description:
      "Yaşam ve çalışma alanlarının kişide oluşturduğu duygusal ve zihinsel etkileri fark ederek daha düzenli bir alan kurmayı destekler.",
    topics: [
      "Mekân enerjisi temizliği",
      "Yaşam alanını düzenleme",
      "Çalışma alanı farkındalığı",
      "Mekân niyeti oluşturma",
    ],
  },
];

const suitableFor = [
  "Kendini uzun süredir yorgun veya dağınık hissedenler",
  "Duygusal sınırlarını korumakta zorlananlar",
  "Başkalarının ruh hâlinden kolay etkilendiğini düşünenler",
  "Hayatının belirli alanlarında sürekli aynı döngüleri yaşayanlar",
  "Dişil ve eril enerji dengesini keşfetmek isteyenler",
  "Yaşam alanının kendisini olumsuz etkilediğini hissedenler",
  "Kendisiyle daha güçlü bir içsel bağ kurmak isteyenler",
];

const workTypes = [
  "Yedi Çakra Dengeleme",
  "Aura Arınma",
  "Frekans Yükselişi",
  "Dişil ve Eril Enerji Dengeleme",
  "Derin Karma Çalışması",
  "Nazar Enerjisinden Arınma",
  "Mekân Enerjisi Temizliği",
  "Sezgisel Alan Aktivasyonu",
  "GoldChi Enerji Aktivasyonu",
  "Bağ Kesme Çalışmaları",
];

const principles = [
  {
    title: "Kişisel Farkındalık",
    description:
      "Çalışmalar kişinin kendi duygularını, davranışlarını ve içsel tekrarlarını daha yakından gözlemlemesini destekler.",
  },
  {
    title: "Bütüncül Yaklaşım",
    description:
      "Enerji alanı; düşünceler, duygular, ilişkiler, yaşam alışkanlıkları ve çevresel etkilerle birlikte değerlendirilir.",
  },
  {
    title: "Kişiye Özgü Süreç",
    description:
      "Her katılımcının ihtiyacı, yaşam deneyimi ve çalışmadan aldığı farkındalık birbirinden farklı olabilir.",
  },
  {
    title: "Gerçekçi Sınırlar",
    description:
      "Çalışmalar kesin sonuç, sağlık, ilişki veya gelecek garantisi sunmadan kişisel dönüşüm sürecine alan açar.",
  },
];

export default function EnergyDetailSection() {
  return (
    <section
      className="serviceDetailSection"
      id="enerji-calismalari"
    >
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              ENERJİ ÇALIŞMALARI
            </p>

            <h2>
              Dış dünyayı düzenlemeden önce,
              <span> kendi alanını fark et.</span>
            </h2>
          </div>

          <div className="serviceDetailLead">
            <p>
              Goldkozmos® Enerji Ekolü enerji çalışmaları; kişinin kendi
              içsel dengesini, duygusal sınırlarını ve yaşamında tekrar eden
              enerji kalıplarını daha yakından gözlemlemesine alan açar.
            </p>

            <p>
              Her çalışma farklı bir ihtiyaca odaklanır. Çakralardan aura
              alanına, dişil-eril dengeden mekân enerjisine kadar çeşitli
              çalışma seçenekleri bulunur.
            </p>
          </div>
        </div>

        <div className="serviceDetailInfoBar">
          <div>
            <span>ÇALIŞMA TÜRÜ</span>
            <strong>Grup ve Birebir</strong>
          </div>

          <div>
            <span>UYGULAMA</span>
            <strong>Çevrim İçi</strong>
          </div>

          <div>
            <span>YAKLAŞIM</span>
            <strong>Bütüncül Farkındalık</strong>
          </div>

          <div>
            <span>SEÇENEKLER</span>
            <strong>İhtiyaca Göre Belirlenir</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              BU ÇALIŞMALAR KİMLER İÇİN?
            </p>

            <h2>
              Yaşadığın etkiyi anlamadan
              <span> onu dönüştürmek zor olabilir.</span>
            </h2>

            <p>
              Günlük yaşamda karşılaşılan ilişkiler, ortamlar ve yoğun
              duygular kişinin kendisini dağınık, yorgun veya kendi
              merkezinden uzak hissetmesine neden olabilir.
            </p>

            <p>
              Enerji çalışmaları, yaşanan her sorunu görünmeyen bir nedene
              bağlamak yerine kişinin kendi duygu, düşünce ve davranışlarını
              daha geniş bir çerçevede gözlemlemesini amaçlar.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Kendi alanını fark etmek, dış dünyadan kaçmak değil;
                onun içinde kendin olarak kalabilmektir.
              </p>
            </div>
          </div>

          <aside className="serviceDetailListCard">
            <p>SANA UYGUN OLABİLİR</p>

            <h3>Kendini bu alanlardan birinde görüyor musun?</h3>

            <ul>
              {suitableFor.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✦</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/sana-uygun-calismayi-bul">
              Sana Uygun Çalışmayı Bul
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            ENERJİ ÇALIŞMASI ALANLARI
          </p>

          <h2>
            Her çalışma,
            <span> başka bir içsel alana dokunur.</span>
          </h2>

          <p>
            İhtiyaca göre tek bir çalışma seçilebileceği gibi, birbirini
            tamamlayan farklı çalışmalarla daha kapsamlı bir süreç de
            oluşturulabilir.
          </p>
        </div>

        <div className="serviceDetailProgramGrid">
          {energyAreas.map((area) => (
            <article
              className="serviceDetailProgramCard"
              key={area.number}
            >
              <div className="serviceDetailProgramCardTop">
                <span>{area.number}</span>
                <span aria-hidden="true">✦</span>
              </div>

              <h3>{area.title}</h3>

              <p>{area.description}</p>

              <ul>
                {area.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="serviceDetailGifts">
          <div className="serviceDetailGiftsIntro">
            <p className="serviceDetailLabel">
              ÇALIŞMA SEÇENEKLERİ
            </p>

            <h2>
              İhtiyacına göre
              <span> kendi yolunu oluştur.</span>
            </h2>

            <p>
              Goldkozmos® Enerji Ekolü içerisinde farklı ihtiyaçlara göre
              hazırlanan enerji çalışmaları bulunur.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            {workTypes.map((workType, index) => (
              <article
                className="serviceDetailGiftCard"
                key={workType}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>

                <h3>{workType}</h3>

                <p>
                  Çalışmanın kapsamı, süresi ve uygulama biçimi ihtiyaca göre
                  ayrıca açıklanır.
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            GOLDKOZMOS® ENERJİ EKOLÜ YAKLAŞIMI
          </p>

          <h2>
            Enerjiyi yalnızca hissetme,
            <span> hayatındaki karşılığını da gözlemle.</span>
          </h2>
        </div>

        <div className="serviceDetailGiftGrid">
          {principles.map((principle, index) => (
            <article
              className="serviceDetailGiftCard"
              key={principle.title}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>

              <h3>{principle.title}</h3>

              <p>{principle.description}</p>
            </article>
          ))}
        </div>

        <div className="serviceDetailNotice">
          <div>
            <p className="serviceDetailLabel">
              ÖNEMLİ BİLGİLENDİRME
            </p>

            <h2>
              Enerji çalışmaları
              <span> profesyonel sağlık desteğinin yerine geçmez.</span>
            </h2>
          </div>

          <div>
            <p>
              Çalışmalar kişisel farkındalık ve içsel denge süreçlerini
              desteklemek amacıyla sunulur. Tıbbi veya psikolojik teşhis,
              tedavi ya da terapi niteliğinde değildir.
            </p>

            <p>
              Fiziksel veya ruhsal bir sağlık sorununda doktor, psikolog,
              psikiyatrist veya ilgili yetkili uzmandan profesyonel destek
              alınmalıdır.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          <Link href="/sana-uygun-calismayi-bul">
            Çalışmamı Bul
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