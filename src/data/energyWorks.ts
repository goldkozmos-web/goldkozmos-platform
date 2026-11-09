export type EnergyWork = {
  id: string;
  slug: string;
  title: string;
  priceLabel: string;
  duration: string;
  format: string;
  shortDescription: string;
  suitableFor: string;
  howItWorks: string;
  imageSrc: string;
  shopierUrl: string;
};

export const ENERGY_WORKS_PRICE = "1.000 TL";

export const energyWorks: EnergyWork[] = [
  {
    id: "7-cakra-dengeleme",
    slug: "7-cakra-dengeleme",
    title: "7 Çakra Dengeleme",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online / birebir",
    shortDescription:
      "Yedi ana enerji merkezini dengeleyerek zihin, duygu ve beden arasındaki akışı netleştiren birebir çalışma.",
    suitableFor:
      "Yorgunluk, dağınıklık ve içsel dengesizlik hissedenler için.",
    howItWorks:
      "Görüşmede mevcut halin değerlendirilir, ardından çakra odaklı dengeleme uygulanır.",
    imageSrc: "/energy/7-cakra-dengeleme.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
  {
    id: "karma-temizligi",
    slug: "karma-temizligi",
    title: "Karma Temizliği",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online / birebir",
    shortDescription:
      "Tekrar eden yaşam döngülerini ve ağırlaşmış bağları görünür kılıp bırakmaya alan açan çalışma.",
    suitableFor:
      "Aynı temaların sürekli geri geldiğini hissedenler için.",
    howItWorks:
      "Odak konu belirlenir, ardından temizleme ve kapanış niyetiyle ilerlenir.",
    imageSrc: "/energy/karma-temizligi.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
  {
    id: "nazar-temizligi",
    slug: "nazar-temizligi",
    title: "Nazar Temizliği",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online / birebir",
    shortDescription:
      "Yoğun dış etkilerden sonra alanını toparlamak ve kendi merkezine dönmek için uygulanan arınma çalışması.",
    suitableFor:
      "Ani düşüş, ağırlık veya dışarıdan etkilenme hissi yaşayanlar için.",
    howItWorks:
      "Kısa bir ön görüşmenin ardından arındırma uygulanır ve alan kapatılır.",
    imageSrc: "/energy/nazar-temizligi.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
  {
    id: "mekan-enerjisi-temizligi",
    slug: "mekan-enerjisi-temizligi",
    title: "Mekan Enerjisi Temizliği",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online birebir",
    shortDescription:
      "Yaşam veya çalışma alanındaki durağanlığı azaltıp daha düzenli ve ferah bir ortam hissi oluşturmaya yönelik çalışma.",
    suitableFor:
      "Evde veya iş yerinde huzursuzluk, ağırlık hissedenler için.",
    howItWorks:
      "Mekân bilgisi alınır, ardından temizleme ve niyet çalışması yapılır.",
    imageSrc: "/energy/mekan-enerjisi-temizligi.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
  {
    id: "atalardan-gelen-negatif-bag",
    slug: "atalardan-gelen-negatif-bag",
    title: "Atalardan Gelen Negatif Bağı Şifalandır",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online / birebir",
    shortDescription:
      "Aile sisteminden taşınan ağır bağları fark edip daha sağlıklı bir içsel duruş kurmaya yardımcı olan çalışma.",
    suitableFor:
      "Aile kaynaklı tekrarlar ve yük hissi taşıyanlar için.",
    howItWorks:
      "Bağın kaynağı konuşulur, ardından şifalandırma ve kapatma uygulanır.",
    imageSrc: "/energy/atalardan-gelen-negatif-bag.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
  {
    id: "ask-alanini-sifalandir",
    slug: "ask-alanini-sifalandir",
    title: "Aşk Alanını Şifalandır",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online / birebir",
    shortDescription:
      "İlişki alanında biriken kırılma, çekinme veya tekrarları yumuşatmaya odaklanan birebir enerji çalışması.",
    suitableFor:
      "Aşk hayatında tıkanma veya eski bağların etkisini hissedenler için.",
    howItWorks:
      "İlişki niyeti netleştirilir, ardından alan çalışması ve kapanış yapılır.",
    imageSrc: "/energy/ask-alanini-sifalandir.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
  {
    id: "bolluk-servet-calismasi",
    slug: "bolluk-servet-calismasi",
    title: "Bolluk ve Servet Çalışması",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online / birebir",
    shortDescription:
      "Para, değer ve üretkenlik alanındaki sıkışmayı açmaya yönelik net ve uygulamalı birebir çalışma.",
    suitableFor:
      "Kazanç, değer ve bolluk konusunda durağanlık hissedenler için.",
    howItWorks:
      "Odak alan belirlenir, ardından bolluk niyetiyle dengeleme uygulanır.",
    imageSrc: "/energy/bolluk-servet-calismasi.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
  {
    id: "tali-cakra-temizligi",
    slug: "tali-cakra-temizligi",
    title: "Tali Çakra Temizliği",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online / birebir",
    shortDescription:
      "Ana çakraları destekleyen tali enerji noktalarını temizleyerek daha ince bir denge hissi oluşturan çalışma.",
    suitableFor:
      "Ana dengeleme sonrası daha derin bir arınma isteyenler için.",
    howItWorks:
      "İhtiyaç duyulan tali alanlar belirlenir ve hedefli temizleme uygulanır.",
    imageSrc: "/energy/tali-cakra-temizligi.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
  {
    id: "disil-eril-enerji-dengeleme",
    slug: "disil-eril-enerji-dengeleme",
    title: "Dişil – Eril Enerjini Dengele",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online / birebir",
    shortDescription:
      "Alma-verme, akış ve yön belirleme halleri arasındaki dengeyi güçlendiren birebir çalışma.",
    suitableFor:
      "Kararsızlık, aşırı kontrol veya akışta kalamama hissedenler için.",
    howItWorks:
      "Mevcut denge hali konuşulur, ardından dişil-eril uyumlama yapılır.",
    imageSrc: "/energy/disil-eril-enerji-dengeleme.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
  {
    id: "sezgi-alanlarini-guclendir",
    slug: "sezgi-alanlarini-guclendir",
    title: "Sezgi Alanlarını Aç / Güçlendir",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online / birebir",
    shortDescription:
      "İç sesini daha net duymak ve kararlarında sezgisel netlik kazanmak için uygulanan açılım çalışması.",
    suitableFor:
      "Karar alırken bulanıklık yaşayan ve sezgisini güçlendirmek isteyenler için.",
    howItWorks:
      "Odak niyet belirlenir, ardından sezgi alanına yönelik açılım uygulanır.",
    imageSrc: "/energy/sezgi-alanlarini-guclendir.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
  {
    id: "sarkac-uyumlama",
    slug: "sarkac-uyumlama",
    title: "Sarkaç Uyumlama",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "30 dk",
    format: "Online / birebir",
    shortDescription:
      "Çalışmak istediğin alana karşılık gelen doğal taşın seçilmesiyle, sana özel sarkaç uyumlaması yapılan birebir seans.",
    suitableFor:
      "Belirli bir yaşam alanına odaklanmak ve seçilen doğal taşla kişiye özel sarkaç uyumlaması yaptırmak isteyenler için.",
    howItWorks:
      "Önce çalışmak istediğin alanı birlikte netleştiririz. Bu alana karşılık gelen doğal taş seçilir ve seans, seçilen taş üzerinden sana özel uyumlama yapılarak ilerler.",
    imageSrc: "/energy/sarkac-uyumlama.webp.jpeg",
    shopierUrl: "https://wa.me/905054722153?text=Merhaba%2C%20enerji%20%C3%A7al%C4%B1%C5%9Fmas%C4%B1%20i%C3%A7in%20randevu%20almak%20istiyorum.",
  },
];

export function getEnergyWorks(): EnergyWork[] {
  return energyWorks;
}

export function getEnergyWorkById(
  id: string,
): EnergyWork | undefined {
  return energyWorks.find((work) => work.id === id);
}
