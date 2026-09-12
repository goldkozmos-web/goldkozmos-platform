export const DUYGU_REHBERI_LEAD =
  "Hissettiğin şeyi adlandırmak, onu anlamanın ilk adımıdır.";

export const DUYGU_REHBERI_CARD_COPY =
  "Kapsamlı duygu haritası: adlandırmak, bedende fark etmek ve ihtiyacı görmek.";

export const DUYGU_REHBERI_SECTIONS = [
  { id: "nedir", title: "Duygu nedir?" },
  { id: "bastirmak", title: "Duyguları bastırmak ve anlamak arasındaki fark" },
  { id: "aileler", title: "Ana duygu aileleri" },
  { id: "alt", title: "Alt duygular" },
  { id: "yogunluk", title: "Duygu yoğunluğu" },
  { id: "beden", title: "Duyguların bedensel karşılıklarını fark etmek" },
  { id: "tetik", title: "Tetikleyiciler" },
  { id: "ihtiyac", title: "İhtiyaçlarla duygular arasındaki ilişki" },
  { id: "isimlendir", title: "Duyguyu isimlendirme çalışması" },
  { id: "egzersiz", title: "“Şu an ne hissediyorum?” egzersizi" },
  { id: "sozluk", title: "Duygu kelimeleri sözlüğü" },
  { id: "cumleler", title: "Kendini ifade etmekte zorlananlar için örnek cümleler" },
  { id: "degerlendirme", title: "Kısa öz değerlendirme sayfaları" },
] as const;

export const DUYGU_REHBERI_FAMILIES = [
  {
    id: "mutluluk",
    name: "Mutluluk",
    hint: "Açılma, paylaşım ve canlılık.",
    children: [
      "Sevinç",
      "Minnet",
      "Gurur",
      "Heyecan",
      "Umut",
      "Rahatlama",
      "Keyif",
    ],
  },
  {
    id: "uzuntu",
    name: "Üzüntü",
    hint: "Kayıp, yavaşlama ve içe çekilme.",
    children: [
      "Keder",
      "Özlem",
      "Yas",
      "Çaresizlik",
      "Kırgınlık",
      "Boşluk",
    ],
  },
  {
    id: "ofke",
    name: "Öfke",
    hint: "Sınır, adalet ve korunma.",
    children: [
      "Sinir",
      "Hınç",
      "Tahammülsüzlük",
      "İsyan",
      "Kıskanç öfke",
      "Hayal kırıklığı öfkesi",
    ],
  },
  {
    id: "korku",
    name: "Korku",
    hint: "Tehlike algısı ve korunma ihtiyacı.",
    children: [
      "Tedirginlik",
      "Panik",
      "Dehşet",
      "Güvensizlik",
      "Çekingenlik",
    ],
  },
  {
    id: "kaygi",
    name: "Kaygı",
    hint: "Henüz gelmemiş olana dönük gerilim.",
    children: [
      "Endişe",
      "Huzursuzluk",
      "Gerilim",
      "Kuşku",
      "Kontrol ihtiyacı",
    ],
  },
  {
    id: "utanc",
    name: "Utanç",
    hint: "Görülmek ve yetmemek hissi.",
    children: [
      "Mahcubiyet",
      "Küçülme",
      "Yetersizlik",
      "Kendini gizleme",
    ],
  },
  {
    id: "sucluluk",
    name: "Suçluluk",
    hint: "Bir şeyi bozmuş olma veya borçlu hissetme.",
    children: [
      "Pişmanlık",
      "Vicdan azabı",
      "Sorumluluk yükü",
      "Kendini suçlama",
    ],
  },
  {
    id: "yalnizlik",
    name: "Yalnızlık",
    hint: "Bağ kopması veya görünmeme.",
    children: [
      "Terk edilmişlik",
      "İzolasyon",
      "Anlaşılmama",
      "Uzaklık",
    ],
  },
  {
    id: "hayal-kirikligi",
    name: "Hayal kırıklığı",
    hint: "Beklenti ile gerçek arasındaki boşluk.",
    children: [
      "Düş kırıklığı",
      "Umudun sönmesi",
      "Aldanma",
      "Yorulmuş beklenti",
    ],
  },
  {
    id: "kiskanclik",
    name: "Kıskançlık",
    hint: "Karşılaştırma, yoksunluk ve bağ korkusu.",
    children: [
      "Haset",
      "Rekabet",
      "Sahip olamama",
      "Dışarıda kalma",
    ],
  },
  {
    id: "saskinlik",
    name: "Şaşkınlık",
    hint: "Ani yenilik ve yön bulamama.",
    children: [
      "Hayret",
      "Şok",
      "Kararsızlık",
      "İnanamama",
    ],
  },
  {
    id: "huzur",
    name: "Huzur",
    hint: "Yerinde olma ve iç sessizlik.",
    children: [
      "Sakinlik",
      "Güvende hissetme",
      "Doygunluk",
      "Uyum",
      "Şükran",
    ],
  },
] as const;
