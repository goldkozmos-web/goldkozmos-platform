export type WorkOptionId = "intro" | "single" | "package";

export type WorkOption = {
  id: WorkOptionId;
  title: string;
  duration: string;
  price: string;
  description: string;
};

export type WorkTheme = {
  slug: "kendilik" | "iliski" | "bolluk" | "ask";
  title: string;
  eyebrow: string;
  lead: string;
  description: string;
  image: string;
  href: string;
  suitableFor: string[];
  focusAreas: string[];
  options: WorkOption[];
};

const personalOptions: WorkOption[] = [
  {
    id: "intro",
    title: "Tanışma Seansı",
    duration: "60 dakika",
    price: "1.800 TL",
    description: "Yaklaşık 20 dakikalık ön görüşmenin ardından kalan sürede seçilen alana yönelik bireysel enerji çalışması.",
  },
  {
    id: "single",
    title: "Birebir Seans",
    duration: "90 dakika",
    price: "2.500 TL",
    description: "Daha derin ve kapsamlı görüşme, kişisel gelişim ve yaşam koçluğu desteğiyle birlikte konuya yönelik enerji çalışması.",
  },
  {
    id: "package",
    title: "5 Seanslık Paket",
    duration: "5 × 90 dakika",
    price: "7.500 TL",
    description: "Her biri 90 dakika olan beş ayrı seans. Seans günleri danışanın uygunluğuna göre ayrı ayrı planlanır; art arda olma zorunluluğu yoktur.",
  },
];

export const WORK_THEMES: WorkTheme[] = [
  {
    slug: "kendilik",
    title: "Kendilik Rezonansı",
    eyebrow: "ÖZDEĞER · ÖZGÜVEN · KİŞİSEL SINIRLAR",
    lead: "Kendinle kurduğun ilişkiye yeniden bak.",
    description: "Özdeğer, özgüven, onay ihtiyacı, kişisel sınırlar ve kendilik algısı üzerine birebir görüşme ve kozmik enerji çalışması.",
    image: "/images/services/kendilik-rezonansi.webp",
    href: "/calismalar/kendilik",
    suitableFor: [
      "Kendi değerini başkalarının onayına bağladığını hissediyorsan",
      "Özgüven ve kişisel sınırlarla ilgili zorlanıyorsan",
      "Kendi istek ve ihtiyaçlarını sürekli geri plana atıyorsan",
    ],
    focusAreas: ["Özdeğer ve özgüven", "Onay ihtiyacı ve kişisel sınırlar", "Kendilik algısı, motivasyon ve içsel kalıplar"],
    options: personalOptions,
  },
  {
    slug: "iliski",
    title: "İlişki Rezonansı",
    eyebrow: "ÇİFTLERE ÖZEL · İLETİŞİM · SEVGİ",
    lead: "Birbirinizi duyabileceğiniz ortak bir alan oluşturun.",
    description: "Birlikte katılan çiftlere yönelik bu çalışmada iletişim, tekrarlayan tartışmalar, evde huzursuzluk, güven ve sevgiyi gösterme veya hissetme güçlükleri üzerine konuşma alanı ve kozmik enerji çalışması sunulur. Çift terapisi değildir.",
    image: "/images/services/iliski-rezonansi.webp",
    href: "/calismalar/iliski",
    suitableFor: [
      "Birbirinizi sevmenize rağmen anlaşmakta zorlanıyorsanız",
      "Sürekli tartışma, güvensizlik ya da huzursuzluk yaşıyorsanız",
      "Sevginizi ve ihtiyaçlarınızı birbirinize ifade etmekte zorlanıyorsanız",
    ],
    focusAreas: ["Çiftler arasında iletişim ve dinleme", "Tartışmalar, sevgi ve alma-verme dengesi", "İki kişinin birlikte niyet ettiği enerjisel arınma alanları"],
    options: [
      {id: "intro", title: "Tanışma Seansı", duration: "60 dakika · çift katılımı", price: "2.500 TL", description: "İki partnerin birlikte katıldığı ilk görüşme ve ilişki odaklı enerji çalışması."},
      {id: "single", title: "Çift Seansı", duration: "90 dakika · çift katılımı", price: "3.500 TL", description: "İletişime daha fazla alan açılan, iki tarafın da kendini ifade ettiği kapsamlı çift çalışması ve enerji seansı."},
      {id: "package", title: "5 Seanslık Çift Paketi", duration: "5 × 90 dakika · çift katılımı", price: "10.000 TL", description: "Çiftin birlikte katıldığı beş ayrı 90 dakikalık seans; günler karşılıklı uygunluğa göre planlanır."},
    ],
  },
  {
    slug: "bolluk",
    title: "Bolluk Rezonansı",
    eyebrow: "PARA İLİŞKİSİ · BOLLUK · BEREKET",
    lead: "Parayla kurduğun ilişkiye yeni bir açıdan yaklaş.",
    description: "Para biriktirme, hak etme ve bereket algısı üzerine kozmik enerji odaklı çalışma. Danışanın para ve bolluk alanında zorlandığını hissettiği konular birlikte belirlenir.",
    image: "/images/services/bolluk-rezonansi.webp",
    href: "/calismalar/para",
    suitableFor: [
      "Para kazanma, harcama veya biriktirme alışkanlıklarını gözden geçirmek istiyorsan",
      "Bolluk ve bereket alanında kendini sıkışmış hissediyorsan",
      "Parayla ilgili hak etme ve değer algını ele almak istiyorsan",
    ],
    focusAreas: ["Parayla kurulan kişisel ilişki", "Bolluk ve bereket niyeti", "Hak etme, değer algısı ve sınırlayıcı inançlar"],
    options: [
      {id: "intro", title: "Tanışma Seansı", duration: "30 dakika", price: "1.000 TL", description: "Kısa ön bilgilendirme ve ağırlıklı olarak bolluk-bereket alanına yönelik enerji çalışması."},
      {id: "single", title: "Birebir Seans", duration: "60 dakika", price: "1.800 TL", description: "Parayla kurduğun ilişki ve belirlediğin bolluk alanına yönelik bireysel çalışma."},
      {id: "package", title: "5 Günlük Yoğun Paket", duration: "5 gün üst üste × 40 dakika", price: "4.500 TL", description: "Her gün 40 dakika olmak üzere, beş gün art arda yapılan yoğun enerji çalışması. Günler arasında ara verilmez."},
    ],
  },
  {
    slug: "ask",
    title: "Aşk Rezonansı",
    eyebrow: "BİREYSEL · GEÇMİŞ İLİŞKİLER · GÜVEN",
    lead: "Geçmiş ilişkilerin izlerini ele al, yeniye alan aç.",
    description: "Ayrılık sonrası kırgınlıklar, yas süreci, güven sorunları, eski ilişkiye zihinsel olarak takılı kalma, enerjisel bağı bırakma niyeti ve tekrar eden partner seçimleri üzerine bireysel görüşme ve kozmik enerji çalışması.",
    image: "/energy/ask-alanini-sifalandir.webp.jpeg",
    href: "/calismalar/ask-ve-iliski",
    suitableFor: [
      "Geçmiş ilişkinden kalan kırgınlıklarla ilgilenmek istiyorsan",
      "Ayrılık sonrası yeni birine güvenmekte zorlanıyorsan",
      "Benzer ilişki döngülerini tekrar ettiğini düşünüyorsan",
    ],
    focusAreas: ["Ayrılık, kırgınlık ve yas sürecinde kişisel farkındalık", "Güven ve yeni bir ilişkiye açıklık", "Eski bağları bırakma niyeti ve tekrar eden ilişki örüntüleri"],
    options: personalOptions,
  },
];

export function bookingServiceName(theme: WorkTheme, option: WorkOptionId) {
  const chosen = theme.options.find((item) => item.id === option);
  if (!chosen) throw new Error(`Unknown option: ${option}`);
  return `${theme.title} · ${chosen.title}`;
}

export function bookingHref(theme: WorkTheme, option: WorkOptionId) {
  return `/randevu-al?service=${encodeURIComponent(bookingServiceName(theme, option))}`;
}

export function themeBySlug(slug: WorkTheme["slug"]): WorkTheme {
  const theme = WORK_THEMES.find((entry) => entry.slug === slug);
  if (!theme) throw new Error(`Unknown work theme: ${slug}`);
  return theme;
}
