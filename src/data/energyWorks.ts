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
    duration: "45–60 dk",
    format: "Online / birebir",
    shortDescription:
      "Yedi ana enerji merkezini dengeleyerek zihin, duygu ve beden arasındaki akışı netleştiren birebir çalışma.",
    suitableFor:
      "Yorgunluk, dağınıklık ve içsel dengesizlik hissedenler için.",
    howItWorks:
      "Görüşmede mevcut halin değerlendirilir, ardından çakra odaklı dengeleme uygulanır.",
    imageSrc: "/energy/7-cakra-dengeleme.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50313196",
  },
  {
    id: "karma-temizligi",
    slug: "karma-temizligi",
    title: "Karma Temizliği",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "45–60 dk",
    format: "Online / birebir",
    shortDescription:
      "Tekrar eden yaşam döngülerini ve ağırlaşmış bağları görünür kılıp bırakmaya alan açan çalışma.",
    suitableFor:
      "Aynı temaların sürekli geri geldiğini hissedenler için.",
    howItWorks:
      "Odak konu belirlenir, ardından temizleme ve kapanış niyetiyle ilerlenir.",
    imageSrc: "/energy/karma-temizligi.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50313242",
  },
  {
    id: "nazar-temizligi",
    slug: "nazar-temizligi",
    title: "Nazar Temizliği",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "45–60 dk",
    format: "Online / birebir",
    shortDescription:
      "Yoğun dış etkilerden sonra alanını toparlamak ve kendi merkezine dönmek için uygulanan arınma çalışması.",
    suitableFor:
      "Ani düşüş, ağırlık veya dışarıdan etkilenme hissi yaşayanlar için.",
    howItWorks:
      "Kısa bir ön görüşmenin ardından arındırma uygulanır ve alan kapatılır.",
    imageSrc: "/energy/nazar-temizligi.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50313516",
  },
  {
    id: "mekan-enerjisi-temizligi",
    slug: "mekan-enerjisi-temizligi",
    title: "Mekan Enerjisi Temizliği",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "45–60 dk",
    format: "Online birebir",
    shortDescription:
      "Yaşam veya çalışma alanındaki durağanlığı azaltıp daha düzenli ve ferah bir ortam hissi oluşturmaya yönelik çalışma.",
    suitableFor:
      "Evde veya iş yerinde huzursuzluk, ağırlık hissedenler için.",
    howItWorks:
      "Mekân bilgisi alınır, ardından temizleme ve niyet çalışması yapılır.",
    imageSrc: "/energy/mekan-enerjisi-temizligi.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50313275",
  },
  {
    id: "atalardan-gelen-negatif-bag",
    slug: "atalardan-gelen-negatif-bag",
    title: "Atalardan Gelen Negatif Bağı Şifalandır",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "45–60 dk",
    format: "Online / birebir",
    shortDescription:
      "Aile sisteminden taşınan ağır bağları fark edip daha sağlıklı bir içsel duruş kurmaya yardımcı olan çalışma.",
    suitableFor:
      "Aile kaynaklı tekrarlar ve yük hissi taşıyanlar için.",
    howItWorks:
      "Bağın kaynağı konuşulur, ardından şifalandırma ve kapatma uygulanır.",
    imageSrc: "/energy/atalardan-gelen-negatif-bag.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50313359",
  },
  {
    id: "ask-alanini-sifalandir",
    slug: "ask-alanini-sifalandir",
    title: "Aşk Alanını Şifalandır",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "45–60 dk",
    format: "Online / birebir",
    shortDescription:
      "İlişki alanında biriken kırılma, çekinme veya tekrarları yumuşatmaya odaklanan birebir enerji çalışması.",
    suitableFor:
      "Aşk hayatında tıkanma veya eski bağların etkisini hissedenler için.",
    howItWorks:
      "İlişki niyeti netleştirilir, ardından alan çalışması ve kapanış yapılır.",
    imageSrc: "/energy/ask-alanini-sifalandir.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50313334",
  },
  {
    id: "bolluk-servet-calismasi",
    slug: "bolluk-servet-calismasi",
    title: "Bolluk ve Servet Çalışması",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "45–60 dk",
    format: "Online / birebir",
    shortDescription:
      "Para, değer ve üretkenlik alanındaki sıkışmayı açmaya yönelik net ve uygulamalı birebir çalışma.",
    suitableFor:
      "Kazanç, değer ve bolluk konusunda durağanlık hissedenler için.",
    howItWorks:
      "Odak alan belirlenir, ardından bolluk niyetiyle dengeleme uygulanır.",
    imageSrc: "/energy/bolluk-servet-calismasi.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50313307",
  },
  {
    id: "tali-cakra-temizligi",
    slug: "tali-cakra-temizligi",
    title: "Tali Çakra Temizliği",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "45–60 dk",
    format: "Online / birebir",
    shortDescription:
      "Ana çakraları destekleyen tali enerji noktalarını temizleyerek daha ince bir denge hissi oluşturan çalışma.",
    suitableFor:
      "Ana dengeleme sonrası daha derin bir arınma isteyenler için.",
    howItWorks:
      "İhtiyaç duyulan tali alanlar belirlenir ve hedefli temizleme uygulanır.",
    imageSrc: "/energy/tali-cakra-temizligi.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50669550",
  },
  {
    id: "disil-eril-enerji-dengeleme",
    slug: "disil-eril-enerji-dengeleme",
    title: "Dişil – Eril Enerjini Dengele",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "45–60 dk",
    format: "Online / birebir",
    shortDescription:
      "Alma-verme, akış ve yön belirleme halleri arasındaki dengeyi güçlendiren birebir çalışma.",
    suitableFor:
      "Kararsızlık, aşırı kontrol veya akışta kalamama hissedenler için.",
    howItWorks:
      "Mevcut denge hali konuşulur, ardından dişil-eril uyumlama yapılır.",
    imageSrc: "/energy/disil-eril-enerji-dengeleme.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50313486",
  },
  {
    id: "sezgi-alanlarini-guclendir",
    slug: "sezgi-alanlarini-guclendir",
    title: "Sezgi Alanlarını Aç / Güçlendir",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "45–60 dk",
    format: "Online / birebir",
    shortDescription:
      "İç sesini daha net duymak ve kararlarında sezgisel netlik kazanmak için uygulanan açılım çalışması.",
    suitableFor:
      "Karar alırken bulanıklık yaşayan ve sezgisini güçlendirmek isteyenler için.",
    howItWorks:
      "Odak niyet belirlenir, ardından sezgi alanına yönelik açılım uygulanır.",
    imageSrc: "/energy/sezgi-alanlarini-guclendir.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50313453",
  },
  {
    id: "sarkac-uyumlama",
    slug: "sarkac-uyumlama",
    title: "Sarkaç Uyumlama",
    priceLabel: ENERGY_WORKS_PRICE,
    duration: "45–60 dk",
    format: "Online / birebir",
    shortDescription:
      "Sarkaç çalışmasına başlamadan önce aracı kişiselleştirip güvenilir bir kullanım zemini kuran uyumlama seansı.",
    suitableFor:
      "Sarkaç kullanmak isteyen veya mevcut aracını netleştirmek isteyenler için.",
    howItWorks:
      "Kullanım amacı netleştirilir, ardından uyumlama ve kısa uygulama yapılır.",
    imageSrc: "/energy/sarkac-uyumlama.webp.jpeg",
    shopierUrl: "https://www.shopier.com/goldkozmos/50313534",
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
