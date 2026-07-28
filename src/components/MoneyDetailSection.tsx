import Link from "next/link";

const programDays = [
  {
    day: "1. GÜN",
    title: "Enerji alanını arındır",
    description:
      "Para ve refah alanını etkileyebilecek eski enerji yüklerini fark ederek sürece temiz bir zeminle başla.",
    topics: [
      "Yedi ana çakra çalışması",
      "Eski enerji yüklerinin bırakılması",
      "Mekân enerjisi temizliği",
      "Para alanı için niyet oluşturma",
    ],
  },
  {
    day: "2. GÜN",
    title: "Atalardan gelen para kalıplarını fark et",
    description:
      "Aileden ve geçmiş kuşaklardan taşınabilecek kıtlık, kayıp, borç ve para korkusu kalıplarını gözlemle.",
    topics: [
      "Atalardan gelen para inançları",
      "Kıtlık bilinci",
      "Para kaybetme korkusu",
      "Aile içindeki refah kalıpları",
      "Yedi ana çakra çalışması",
    ],
  },
  {
    day: "3. GÜN",
    title: "Özdeğer ve alma alanını güçlendir",
    description:
      "Kazanç, değer görme ve hak etme duygusunu etkileyen çocukluk izlerine ve içsel sınırlara odaklan.",
    topics: [
      "Özdeğer çalışması",
      "Hak etme bilinci",
      "Çocuklukta öğrenilen para kalıpları",
      "Alma ve kabul etme alanı",
      "Karma çalışması",
      "Yedi ana çakra çalışması",
    ],
  },
  {
    day: "4. GÜN",
    title: "Dişil ve eril para dengesini kur",
    description:
      "Üretmek, harekete geçmek, kazanmak, kabul etmek ve parayı korumak arasındaki dengeyi fark et.",
    topics: [
      "Dişil enerji ve alma hâli",
      "Eril enerji ve harekete geçme",
      "Üretim ve kabul dengesi",
      "Tali çakralar",
      "Nazar enerjisinden arınma",
      "Yedi ana çakra çalışması",
    ],
  },
  {
    day: "5. GÜN",
    title: "Para ve refah alanını aktive et",
    description:
      "Parayla kurmak istediğin yeni ilişkiyi netleştirerek bolluk, üretkenlik ve refah alanına uyumlan.",
    topics: [
      "Para enerjisi aktivasyonu",
      "Refah bilinci",
      "Parayı var etme çalışması",
      "Bolluk imgelemesi",
      "Para meditasyonu",
    ],
  },
];

const suitableFor = [
  "Para kazanmasına rağmen elinde tutmakta zorlananlar",
  "Kazanç konusunda kendini sürekli yetersiz hissedenler",
  "Para istemekten veya ücret söylemekten çekinenler",
  "Ailesindeki kıtlık ve borç kalıplarını tekrar ettiğini düşünenler",
  "Üretmesine rağmen karşılığını alamadığını hissedenler",
  "Para geldiğinde kaybetme korkusu yaşayanlar",
  "Parayla daha dengeli ve güvenli bir ilişki kurmak isteyenler",
];

const gifts = [
  {
    title: "Katılım Belgesi",
    description:
      "Beş günlük grup çalışmasını tamamlayan katılımcılar için hazırlanır.",
  },
  {
    title: "Numeroloji Analizi",
    description:
      "Kişisel numeroloji kodlarını ve para alanındaki temel eğilimlerini keşfet.",
  },
  {
    title: "Refah Bilinci",
    description:
      "Para, değer, üretim ve bollukla kurduğun ilişkiyi gözlemlemene yardımcı olan dijital kitap.",
  },
  {
    title: "Mekân Kodları",
    description:
      "Yaşam ve çalışma alanının enerjisini daha düzenli ve destekleyici hâle getirmeye odaklanan dijital kitap.",
  },
];

export default function MoneyDetailSection() {
  return (
    <section
      className="serviceDetailSection"
      id="para-calismasi"
    >
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              PARA ENERJİSİ AKTİVASYONU
            </p>

            <h2>
              Parayla savaşmak yerine,
              <span> onunla kurduğun ilişkiyi fark et.</span>
            </h2>
          </div>

          <div className="serviceDetailLead">
            <p>
              Para Enerjisi Aktivasyonu, para kazanma, alma, tutma ve
              değerlendirme alanındaki içsel kalıplarını fark etmek isteyen
              kişiler için hazırlanan beş günlük çevrim içi grup çalışmasıdır.
            </p>

            <p>
              Çalışmanın amacı hiçbir emek göstermeden para kazanmayı vaat
              etmek değil; özdeğer, üretim, hak etme ve refah alanına daha
              bilinçli bir yerden yaklaşmanı desteklemektir.
            </p>
          </div>
        </div>

        <div className="serviceDetailInfoBar">
          <div>
            <span>PROGRAM</span>
            <strong>5 Günlük Grup Çalışması</strong>
          </div>

          <div>
            <span>SÜRE</span>
            <strong>Her Gün 1,5 Saat</strong>
          </div>

          <div>
            <span>PLATFORM</span>
            <strong>Google Meet</strong>
          </div>

          <div>
            <span>KATILIM</span>
            <strong>Çevrim İçi ve Görüntülü</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              BU ÇALIŞMA KİMLER İÇİN?
            </p>

            <h2>
              Para alanındaki görünmeyen
              <span> tekrarlarını fark et.</span>
            </h2>

            <p>
              Para yalnızca gelir ve giderlerden oluşmaz. Kişinin kendine
              biçtiği değer, ailesinden öğrendiği para dili, kaybetme korkusu
              ve alma konusundaki sınırları da finansal davranışlarını
              etkileyebilir.
            </p>

            <p>
              Bu çalışma, parayı tek başına bir hedef olarak görmek yerine
              üretim, değer, sorumluluk ve refah ilişkisinin bir parçası
              olarak incelemene alan açar.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Para alanındaki dönüşüm, yalnızca daha fazlasını istemekle
                değil; sahip olduğun değeri kabul etmekle başlar.
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
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            BEŞ GÜNLÜK PROGRAM AKIŞI
          </p>

          <h2>
            Para alanındaki her katmana
            <span> başka bir yerden yaklaş.</span>
          </h2>

          <p>
            Program birbirini tamamlayan beş aşamadan oluşur. Enerji alanı,
            aile kalıpları, özdeğer, dişil-eril denge ve refah bilinci
            birlikte ele alınır.
          </p>
        </div>

        <div className="serviceDetailProgramGrid">
          {programDays.map((programDay) => (
            <article
              className="serviceDetailProgramCard"
              key={programDay.day}
            >
              <div className="serviceDetailProgramCardTop">
                <span>{programDay.day}</span>
                <span aria-hidden="true">✦</span>
              </div>

              <h3>{programDay.title}</h3>

              <p>{programDay.description}</p>

              <ul>
                {programDay.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="serviceDetailGifts">
          <div className="serviceDetailGiftsIntro">
            <p className="serviceDetailLabel">
              PROGRAM HEDİYELERİ
            </p>

            <h2>
              Çalışma tamamlandığında
              <span> refah yolculuğun devam etsin.</span>
            </h2>

            <p>
              Program katılımcılarına para ve yaşam alanı farkındalığını
              destekleyen özel içerikler sunulur.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            {gifts.map((gift, index) => (
              <article
                className="serviceDetailGiftCard"
                key={gift.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>

                <h3>{gift.title}</h3>

                <p>{gift.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="serviceDetailNotice">
          <div>
            <p className="serviceDetailLabel">
              ÖNEMLİ BİLGİLENDİRME
            </p>

            <h2>
              Amaç parayı sihirle çoğaltmak değil,
              <span> para alanındaki yaklaşımını dönüştürmektir.</span>
            </h2>
          </div>

          <div>
            <p>
              Bu çalışma belirli bir gelir, satış, yatırım sonucu veya
              finansal kazanç garantisi sunmaz. Finansal danışmanlık ya da
              yatırım tavsiyesi niteliğinde değildir.
            </p>

            <p>
              Çalışmalar kişisel farkındalık ve içsel denge süreçlerini
              destekler. Her katılımcının deneyimi ve yaşam koşulları
              kendine özgüdür.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          <Link href="/randevu">
            Kayıt ve Bilgi Al
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