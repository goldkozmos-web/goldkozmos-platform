export type GoldBook = {
  slug: string;
  number: string;
  category: string;
  title: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  description: string;
  landing: string[];
  image: string;
  price: string;
  shopier: string;
  focus: string[];
  info: string[];
};

export const GOLDBOOKS: GoldBook[] = [
  {
    slug: "icindeki-kozmosu-kucakla",
    number: "01",
    category: "KİŞİSEL DÖNÜŞÜM",
    title: "İçindeki Kozmosu Kucakla",
    h1: "İçindeki Kozmosu Kucakla",
    seoTitle: "İçindeki Kozmosu Kucakla | GoldBook – GoldKozmos",
    metaDescription:
      "Özdeğer, sınırlar, sezgi ve içsel özgürlük üzerine GoldBook. Dijital rehberin public tanıtım sayfası; satın alınan PDF indexlenmez.",
    description:
      "Özdeğer, sınırlar, sezgi, geçmişten taşınan kalıplar ve içsel özgürlük üzerine hazırlanmış dijital GoldBook.",
    landing: [
      "İçindeki Kozmosu Kucakla, GoldKozmos içindeki dijital rehber alanının ilk kitabıdır. Blog yazısı veya meditasyon uygulaması değildir; okunarak ilerlenen bir çalışma kitabıdır.",
      "Public sayfa yalnızca odağı, bölüm yapısını ve satın alma kapısını anlatır. Satın alınan PDF, özel dosya olarak kalır ve arama motoruna açılmaz.",
      "Özdeğerini başkasının yargısından ayırmak, sınır koymak ve sezgiyi abartısız bir dikkat haline getirmek isteyen okur için yazılmıştır.",
    ],
    image: "/goldbook/icindeki-kozmosu-kucakla.webp",
    price: "300 TL",
    shopier: "https://www.shopier.com/goldkozmos/46435030",
    focus: [
      "Başkalarının yargılarından özgürleşmek",
      "Kendi değerini yeniden hatırlamak",
      "Sağlıklı sınırlar oluşturmak",
      "Sezgi ve teslimiyet alanını keşfetmek",
    ],
    info: [
      "20 bölümlük içsel yolculuk",
      "5 ana kısım ve son söz",
      "Dijital kitap formatı",
      "Özge Batıgün imzalı",
    ],
  },
  {
    slug: "ask-manifestosu",
    number: "02",
    category: "AŞK VE İLİŞKİLER",
    title: "Aşk Manifestosu",
    h1: "Aşk Manifestosu",
    seoTitle: "Aşk Manifestosu | GoldBook – GoldKozmos",
    metaDescription:
      "Tekrar eden ilişki senaryoları, sınırlar ve doğru bağı seçme üzerine GoldBook tanıtımı. Satın alınan içerik private kalır.",
    description:
      "Geçmiş ilişkiler, tekrar eden senaryolar, sınırlar, flört dinamikleri ve doğru ilişkiyi seçme üzerine hazırlanmış dijital GoldBook.",
    landing: [
      "Aşk Manifestosu, GoldBook içinde ilişki ve bağ seçimine ayrılmış dijital rehberdir. Tarot bakımı veya ilişki testi değildir; okuma ve uygulama notlarıyla ilerler.",
      "Bu sayfa kitabın temasını ve formatını tanıtır. Satın alındıktan sonra erişilen PDF Google’a açılmaz.",
      "Flörtte merkezini kaybetmeden ilerlemek, tanıdık acıyı aşk sanmamak ve gerçek ilgiyi ayırt etmek üzerine kuruludur.",
    ],
    image: "/goldbook/ask-manifestosu.webp",
    price: "300 TL",
    shopier: "https://www.shopier.com/goldkozmos/47631093",
    focus: [
      "Aşk ihtiyacını seçime taşımak",
      "Tekrarlayan ilişki döngülerini görmek",
      "Flörtte kendi merkezini korumak",
      "Gerçek ilgiyi ayırt etmek",
    ],
    info: [
      "20 bölümlük ilişki rehberi",
      "6 ana kısım",
      "Dijital kitap formatı",
      "Özge Batıgün imzalı",
    ],
  },
];

export function goldBookBySlug(slug: string) {
  return GOLDBOOKS.find((book) => book.slug === slug) ?? null;
}

export function otherGoldBooks(slug: string) {
  return GOLDBOOKS.filter((book) => book.slug !== slug);
}
