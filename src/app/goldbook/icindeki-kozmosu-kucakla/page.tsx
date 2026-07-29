import Navbar from "../../../components/Navbar";
import GoldBookDetailLayout from "../../../components/GoldBookDetailLayout";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const chapters = [
  {
    number: "I",
    title: "Uyanışın İlk Adımları",
    description:
      "Kendi değerini başkalarının yargılarından ayırmaya, içsel ışığını fark etmeye ve sınırlarını yeniden tanımlamaya davet eden ilk bölüm.",
    topics: [
      "Tozlu Aynalar",
      "Karanlıktaki Yıldızlar",
      "Dişil Alıcı Makamı",
      "Sınırların Altın Çizgisi",
      "Kozmik Kavuşma",
    ],
  },
  {
    number: "II",
    title: "Derinleşme ve Aynalar",
    description:
      "İlişkilerde ve yaşamda karşılaştığın yansımaları, kelimelerin etkisini ve geçmişten taşınan görünmez bağları inceleyen bölüm.",
    topics: [
      "Yansımalar ve Ayna Yasası",
      "Kelimelerin Büyüsü",
      "Miras Kalan Zincirleri Kırmak",
      `Dramın Cazibesi ve "Bırakmanın" Zaferi`,
    ],
  },
  {
    number: "III",
    title: "Kökler ve Arınma",
    description:
      "Sabır, yalnızlık ve kişisel sınırlar üzerinden kendi içsel limanını kurmaya odaklanan bölüm.",
    topics: [
      "Sabır: Tohumun Toprak Altındaki Sessizliği",
      "Yalnızlık Korkusu ve Kendi Limanına Sığınmak",
      "Kendi Evinin Anahtarı: Sınırlar",
    ],
  },
  {
    number: "IV",
    title: "Ruhsal Rehberlik",
    description:
      "Maskeleri, sezgiyi, teslimiyeti ve yetersizlik duygusunun köklerini daha yakından görmeye alan açan bölüm.",
    topics: [
      "Maskeler ve Aynadaki Yabancı",
      "Sezginin Pusulası ve Teslimiyetin Gücü",
      "Yetersizlik İllüzyonu ve Okul Sıralarındaki Hayaletler",
    ],
  },
  {
    number: "V",
    title: "Özgürlük ve Estetik",
    description:
      "Kurban rolünden, kontrol ihtiyacından ve zamana karşı verilen mücadeleden özgürleşmeye davet eden bölüm.",
    topics: [
      "Kurban Rolünün Zehirli Konforu",
      "Kırılmanın Kutsal Mimarisi",
      "Bilmemenin Kutsal Boşluğu",
      "Zamanın Son Şakası",
    ],
  },
  {
    number: "20",
    title: "Kozmik Mühür",
    description:
      "Kitap boyunca açılan farkındalık kapılarını bir araya getirerek içsel yolculuğu bütünleyen son söz.",
    topics: [
      "İçsel yolculuğu bütünleştirmek",
      "Kendi ışığını yeniden hatırlamak",
      "Başkalarının hikâyelerinden özgürleşmek",
      "İçindeki kozmosu sahiplenmek",
    ],
  },
];

const suitableFor = [
  "Başkalarının yargılarıyla kendi değerini ölçtüğünü fark edenler",
  "Kendini kaybolmuş, yetersiz veya amaçsız hissedenler",
  "Geçmişten taşınan kalıpları ve görünmez zincirleri fark etmek isteyenler",
  "Yalnızlık, sabır ve belirsizlikle kurduğu ilişkiyi dönüştürmek isteyenler",
  "Dişil alıcılık, sınırlar ve teslimiyet üzerine derinleşmek isteyenler",
  "Kurban bilinci ve onay ihtiyacı döngülerini sorgulayanlar",
  "Kendi iç sesine ve sezgisine yeniden yaklaşmak isteyenler",
];

const benefits = [
  {
    title: "Kendi Aynanı Temizlemek",
    description:
      "Başkalarının düşüncelerini kendi gerçeğin sanmadan, kendine hangi yargılar üzerinden baktığını fark etmene yardımcı olur.",
  },
  {
    title: "Sınırlarını Hatırlamak",
    description:
      "Kendini korumak ile sevgiyi kapatmak arasındaki farkı görerek daha bilinçli sınırlar kurmanı destekler.",
  },
  {
    title: "Geçmiş Zincirleri Görmek",
    description:
      "Aileden, çocukluktan ve geçmiş deneyimlerden taşınan kalıpların bugünkü yaşamına nasıl yansıdığını incelemene alan açar.",
  },
  {
    title: "Sezgine Yaklaşmak",
    description:
      "Kontrol etme ihtiyacı, belirsizlik korkusu ve teslimiyet arasındaki ilişkiyi daha geniş bir açıdan değerlendirmeni destekler.",
  },
];

export default function EmbraceYourInnerCosmosPage() {
  return (
    <main className="homePage" id="top">
      <Navbar />

      <section className="innerPageHero">
        <div className="innerPageHeroContainer">
          <p className="sectionEyebrow">
            <span>
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup>
            </span>

            <br />

            <span>ENERJİ EKOLÜ</span>

            <br />

            <span>GOLDBOOK</span>
          </p>

          <h1>
            Başkalarının aynasından çık,
            <span> kendi kozmosuna dön.</span>
          </h1>

          <p>
            Özdeğer, sınırlar, dişil alıcılık, geçmişten taşınan kalıplar,
            sezgi ve içsel özgürlük üzerine hazırlanan Özge Batıgün imzalı
            dijital GoldBook.
          </p>

          <div className="innerPageHeroActions">
            <a href="#icindeki-kozmosu-kucakla">
              Kitabı İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/iletisim">
              GoldBook İçin Bilgi Al
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <GoldBookDetailLayout
        id="icindeki-kozmosu-kucakla"
        title="İçindeki Kozmosu Kucakla"
        category="Kişisel Dönüşüm"
        headline="Başkalarının yazdığı hikâyeyi bırak,"
        highlightedHeadline="içindeki kozmosla buluş."
        description={[
          "İçindeki Kozmosu Kucakla, kendine başkalarının yargıları üzerinden bakmayı bırakıp içsel değerini, sınırlarını ve yaşamındaki tekrarları daha derinden fark etmen için hazırlanmış dijital bir GoldBook’tur.",
          "Kitap sana hazır bir yol çizmek yerine, kendi yolunu görmeni engelleyen sahte ışıkları söndürmeye ve içindeki kadim sesi yeniden duymaya davet eder.",
        ]}
        suitableFor={suitableFor}
        chapters={chapters}
        benefits={benefits}
        noticeTitle="Bu kitap kendi iç dünyanı gözlemlemen için hazırlanmıştır,"
        noticeDescription="İçindeki Kozmosu Kucakla; özdeğer, sınırlar, sezgi, geçmiş kalıplar ve kişisel dönüşüm üzerine düşünsel ve spiritüel bir farkındalık alanı sunar."
      />

      <FAQSection />

      <FooterSection />
    </main>
  );
}