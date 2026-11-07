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
};

export const WORK_THEMES: WorkTheme[] = [
  {
    slug: "kendilik",
    title: "Kendilik Rezonansı",
    eyebrow: "ÖZDEĞER · SINIRLAR · KENDİLİK",
    lead: "Kendinle kurduğun ilişkiye yeniden bak.",
    description:
      "Özdeğerini sorguluyor, sürekli onay bekliyor veya hayır demekte zorlanıyorsan; kendine ve ihtiyaçlarına daha çok yer açmaya odaklanan bir çalışma alanı.",
    image: "/images/services/kendilik-rezonansi.webp",
    href: "/calismalar/kendilik",
    suitableFor: [
      "Kendi değerini başkalarının onayına bağladığını hissediyorsan",
      "Sınır koyarken suçluluk yaşıyorsan",
      "Kendi istek ve ihtiyaçlarını geri plana atıyorsan",
    ],
    focusAreas: ["Özdeğer ve kendilik algısı", "Onay ihtiyacı ve kişisel sınırlar", "Tekrarlayan içsel kalıplar"],
  },
  {
    slug: "iliski",
    title: "İlişki Rezonansı",
    eyebrow: "ALMA–VERME · GÜVEN · İLETİŞİM",
    lead: "İlişkilerindeki tekrarları ve dengeleri fark et.",
    description:
      "İlişkilerinde sürekli aynı döngülere giriyor, alma-verme dengesini kurmakta veya güven geliştirmekte zorlanıyorsan; geçmiş deneyimlerinin bugünkü ilişkilerine yansımalarını fark etmeye odaklanan bir alan.",
    image: "/images/services/iliski-rezonansi.webp",
    href: "/calismalar/iliski",
    suitableFor: [
      "İlişkilerinde hep benzer çatışmalar yaşadığını düşünüyorsan",
      "Çok verip az aldığını veya yakınlık kurmakta zorlandığını hissediyorsan",
      "Geçmişte yaşadığın kırgınlıklar bugünkü iletişimini etkiliyorsa",
    ],
    focusAreas: ["İlişkilerde alma-verme dengesi", "Güven, iletişim ve sınırlar", "Tekrarlayan ilişki örüntüleri"],
  },
  {
    slug: "bolluk",
    title: "Bolluk Rezonansı",
    eyebrow: "PARA İLİŞKİSİ · BEREKET · DEĞER",
    lead: "Parayla kurduğun ilişkiyi gözlemle.",
    description:
      "Para biriktirmekte zorlanıyor, para söz konusu olduğunda sürekli kaygı veya yetersizlik hissediyor ya da bereket alanının kapalı olduğunu düşünüyorsan; para inançlarını, değer algını ve alışkanlıklarını incelemeye odaklanan bir çalışma.",
    image: "/images/services/bolluk-rezonansi.webp",
    href: "/calismalar/para",
    suitableFor: [
      "Para kazanma, harcama veya biriktirme alışkanlıklarını gözden geçirmek istiyorsan",
      "Bolluk ve bereket konusunda sınırlayıcı düşünceler taşıdığını hissediyorsan",
      "Kazancı, değeri ve hak etme duygusunu birlikte değerlendirmek istiyorsan",
    ],
    focusAreas: ["Para ile kurulan kişisel ilişki", "Kıtlık ve bolluk algısı", "Değer, hak etme ve alışkanlıklar"],
  },
  {
    slug: "ask",
    title: "Aşk Çalışması",
    eyebrow: "KALP ALANI · GEÇMİŞ KIRGINLIKLAR · YENİ BAĞLAR",
    lead: "Yeni bir sevgiye yer açmak için kendine dön.",
    description:
      "Geçmiş ilişkilerden kalan kırgınlıkları taşıyor, yeniden güvenmekte veya birini hayatına almakta zorlanıyorsan; kalp alanı ve sevgiyle kurduğun ilişki üzerine spiritüel farkındalığa odaklanan çalışma.",
    image: "/energy/ask-alanini-sifalandir.webp.jpeg",
    href: "/calismalar/ask-ve-iliski",
    suitableFor: [
      "Geçmiş bir ilişkinin duygusal izlerini taşıdığını hissediyorsan",
      "Yeni bir ilişkiye açılmakta veya güvenmekte zorlanıyorsan",
      "Kalp alanına ve sevgiyle kurduğun ilişkiye odaklanmak istiyorsan",
    ],
    focusAreas: ["Geçmiş kırgınlıklar ve ilişki beklentileri", "Güven ve duygusal açıklık", "Kalp alanı ve sevgiye niyet"],
  },
];

export function bookingServiceName(theme: WorkTheme, option: "single" | "package") {
  return `${theme.title} · ${option === "single" ? "Tek Günlük Çalışma" : "Paket Çalışması"}`;
}

export function bookingHref(theme: WorkTheme, option: "single" | "package") {
  return `/randevu-al?service=${encodeURIComponent(bookingServiceName(theme, option))}`;
}

export function themeBySlug(slug: WorkTheme["slug"]): WorkTheme {
  const theme = WORK_THEMES.find((entry) => entry.slug === slug);
  if (!theme) throw new Error(`Unknown work theme: ${slug}`);
  return theme;
}
