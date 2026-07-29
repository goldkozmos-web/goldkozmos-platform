import Navbar from "../../../components/Navbar";
import GoldBookDetailLayout from "../../../components/GoldBookDetailLayout";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const chapters = [
  {
    number: "I",
    title: "Aşkı İhtiyaçtan Seçime Taşımak",
    description:
      "Aşkı eksiklikten, yalnızlık korkusundan veya kurtarılma arzusundan istemek yerine kendi bütünlüğünden seçmeye odaklanan ilk kısım.",
    topics: [
      "Aşk Bir İhtiyaç Değil, Bir Seçimdir",
      "Geçmiş İlişkilerin Enerjisel Tortuları",
      `"Doğru İnsan Yok" İllüzyonu`,
      "Aynı Senaryo, Farklı Yüzler",
    ],
  },
  {
    number: "II",
    title: "Merkez, Ayna ve Sorumluluk",
    description:
      "Karşına çıkan insanların hangi içsel alanlarını görünür kıldığını, kendi merkezini nasıl kuracağını ve kurban rolünden çıkışı ele alan kısım.",
    topics: [
      "Karşındaki İnsan Sana Ne Anlatıyor?",
      "Kendi Merkezini İnşa Etmek",
      "Kurban Rolünden Çıkış: Hayat Sahnesinin Mutlak Egemenliği",
      "Hayatın ve Aşkın Ortak Geometrisi",
    ],
  },
  {
    number: "III",
    title: "Geçmiş Miraslar ve Özgürleşme",
    description:
      "Aileden, geçmiş kuşaklardan ve eski travmalardan taşınan ilişki kalıplarını, görünmez yeminleri ve sınırları inceleyen kısım.",
    topics: [
      "Geçmiş Kuşakların Finansal ve Duygusal Mirası",
      "Travmaların İlişki Yönetimi",
      "Gizli Sözleşmeler ve Geleceği Bağlayan Yeminler",
      "Sınırlar ve Serbest Bırakmanın Asaleti",
    ],
  },
  {
    number: "IV",
    title: "Zaman, Emek ve Aşkın Doğal Ritmi",
    description:
      "İlişkide verilen zamanın ve emeğin dengesini, sağlıksız davranışların ayıklanmasını ve aşkın acele etmeden gelişen doğasını ele alan kısım.",
    topics: [
      "Zamanın ve Emeğin Dengesi",
      "İlişkilerde Davranışsal Radikal Eliminasyon",
      "Aşkın Doğal Mimarisi ve Yeşerme Süreci",
    ],
  },
  {
    number: "V",
    title: "Flörtte Maskeler ve Gerçek İlgi",
    description:
      "Flört evresinde görünen davranışların arkasındaki niyetleri, enerjisel maskeleri ve gerçek ilgiyle fetih arzusunu ayırmaya odaklanan kısım.",
    topics: [
      "Flört Evresindeki Enerjisel Maskelerin Ötesi",
      "Gerçek İlgi ve İlkel Fetih Arzusu",
    ],
  },
  {
    number: "VI",
    title: "Seçim, Ritüel ve İlk Buluşma",
    description:
      "İlgi açlığına düşmeden kendini tanımayı, niyeti yazıyla netleştirmeyi ve ilk buluşmada merkezini koruyarak gözlem yapmayı ele alan son kısım.",
    topics: [
      "Kendini Tanıma Kriteri ve İlgi Açlığı Tuzağı",
      "Doğru Kişiyi Hayatına Çekmek İçin Yazı Ritüeli",
      "İlk Buluşmada Merkezin Korunması ve Enerji Okuma",
    ],
  },
];

const suitableFor = [
  "Aşkta sürekli aynı insanları veya aynı senaryoları yaşadığını düşünenler",
  "Yalnız kalma korkusuyla yanlış ilişkilere tutunduğunu fark edenler",
  "Geçmiş ilişkilerin etkisini hâlâ üzerinde taşıyanlar",
  "Doğru insanın olmadığına inanmaya başlayanlar",
  "Kurtarıcı olma veya kurtarılmayı bekleme döngüsünü sorgulayanlar",
  "Flörtte gerçek ilgi ile geçici fetih arzusunu ayırmak isteyenler",
  "Aşka eksiklikten değil, kendi bütünlüğünden yaklaşmak isteyenler",
];

const benefits = [
  {
    title: "Aşk Tanımını Yenilemek",
    description:
      "Aşkı ihtiyaç, bağımlılık veya tamamlanma hikâyesi olmaktan çıkarıp bilinçli bir seçim olarak değerlendirmene yardımcı olur.",
  },
  {
    title: "Tekrarlayan Senaryoları Görmek",
    description:
      "Farklı yüzlerle yeniden yaşanan ilişki döngülerini, bilinçaltı kalıplarını ve seçim mekanizmalarını daha net fark etmene alan açar.",
  },
  {
    title: "Merkezini Korumak",
    description:
      "Flört ve ilişki sürecinde aşırı vericiliğe, ilgi açlığına veya karşı tarafı merkeze koymaya kapılmadan kendi alanında kalmanı destekler.",
  },
  {
    title: "Gerçek İlgiyi Ayırt Etmek",
    description:
      "Sözlerden çok davranışları gözlemlemeyi, tutarlılığı değerlendirmeyi ve geçici heyecanla sağlıklı yakınlığı birbirinden ayırmayı destekler.",
  },
];

export default function LoveManifestoPage() {
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
            Aşkı dışarıda aramadan önce
            <span> kendi merkezine dön.</span>
          </h1>

          <p>
            Geçmiş ilişkiler, tekrar eden senaryolar, sınırlar, flört
            dinamikleri ve doğru kişiye hazırlanma üzerine Özge Batıgün
            imzalı dijital GoldBook.
          </p>

          <div className="innerPageHeroActions">
            <a href="#ask-manifestosu">
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
        id="ask-manifestosu"
        title="Aşk Manifestosu"
        category="Aşk ve İlişkiler"
        headline="Aşkı bir ihtiyaç olmaktan çıkar,"
        highlightedHeadline="bilinçli bir seçime dönüştür."
        description={[
          "Aşk Manifestosu, aşka, ilişkilere ve kendine dair tekrar eden yorucu hikâyeleri sorgulaman için hazırlanmış 20 bölümlük dijital bir GoldBook’tur.",
          "Kitap sihirli formüller veya kesin sonuçlar vaat etmez. Aşkı dışarıda aranacak bir kurtuluş değil, kişinin kendi içine kurduğu görünmez köprü olarak ele alır.",
        ]}
        suitableFor={suitableFor}
        chapters={chapters}
        benefits={benefits}
        noticeTitle="Bu kitap aşkı garanti eden bir formül sunmaz,"
        noticeDescription="Aşk Manifestosu; ilişki kalıpları, sınırlar, geçmiş bağlar, flört dinamikleri ve öz farkındalık üzerine düşünsel ve spiritüel bir rehberlik alanı sunar."
      />

      <FAQSection />

      <FooterSection />
    </main>
  );
}