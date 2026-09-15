export type GoldFrekansTrack = {
  slug: string;
  number: string;
  category: string;
  title: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  description: string;
  about: string;
  howToListen: string;
  context: string;
  youtubeUrl: string;
  thumbnail: string;
};

export const GOLDFREKANS_TRACKS: GoldFrekansTrack[] = [
  {
    slug: "yagmur-sesi",
    number: "01",
    category: "NATURE · YAĞMUR",
    title: "Nature · Yağmur Sesi",
    h1: "Yağmur Sesi",
    seoTitle: "Yağmur Sesi | GoldFrekans – GoldKozmos",
    metaDescription:
      "GoldFrekans yağmur sesi kaydı: dinlenmek, çalışırken arka plan veya zihni yavaşlatmak için doğa sesi. Tedavi iddiası yoktur.",
    description:
      "Yağmurın doğal ritmiyle dinlenmek, çalışırken arka planda sakin bir alan kurmak veya zihni yavaşlatmak için hazırlanmış doğa sesi.",
    about:
      "Bu kayıt, GoldFrekans kütüphanesindeki yağmur atmosferidir. Melodik bir şarkı veya rehberli meditasyon değildir; yağmurun sürekliliğini dinleme nesnesi olarak sunar. GoldMind’deki nefes ve farkındalık pratiklerinden ayrı durur: burada metin veya yönlendirme yoktur, yalnızca ses vardır.",
    howToListen:
      "Karttan veya bu sayfadaki oynatıcıdan YouTube kaydını açabilirsin. Kulaklık ya da hoparlör fark etmez. Ses seviyesini odanın gerisinde tutmak, yağmuru sahne değil zemin haline getirir.",
    context:
      "Okuma, yazma, ev işi veya uykuya yaklaşırken arka plan olarak kullanılabilir. Uyku, odak veya gevşeme için ayrı bir GoldFrekans kategorisi yoktur; bu kayıt yağmur temalı tek parçadır. Sağlık tedavisinin yerine geçmez.",
    youtubeUrl: "https://youtu.be/qeS29ftEtho",
    thumbnail: "https://i.ytimg.com/vi/qeS29ftEtho/hqdefault.jpg",
  },
  {
    slug: "deniz-meditasyon",
    number: "02",
    category: "NATURE · DENİZ · MEDİTASYON",
    title: "Nature · Deniz · Meditasyon Müziği",
    h1: "Deniz ve Meditasyon Müziği",
    seoTitle: "Deniz Meditasyon Müziği | GoldFrekans – GoldKozmos",
    metaDescription:
      "Deniz atmosferi ve meditasyon müziğini bir araya getiren GoldFrekans kaydı. Sakinleşme ve kendi alanına dönme anlarına eşlik eder.",
    description:
      "Deniz atmosferi ve meditasyon müziğini bir araya getiren, sakinleşme ve kendi alanına dönme anlarına eşlik eden kayıt.",
    about:
      "Kıyı sesi ile yavaş bir müzik katmanının birlikte durduğu bir GoldFrekans parçasıdır. Rehberli bir beden taraması veya nefes sayımı içermez. Deniz imgesi buradan GoldMind uygulamasına taşınmaz; bu sayfa yalnızca dinleme deneyimini tanımlar.",
    howToListen:
      "Oynatıcı kaydı YouTube üzerinden açar. Gözlerini kapatmak zorunlu değildir. Kısa bir aralık veya daha uzun bir oturuş aynı kaydı farklı sürelerde kullanabilir.",
    context:
      "Günün temposunu düşürmek, yürüyüşte kulaklıkla dinlemek veya GoldMind öncesi bir geçiş sesi olarak kullanılabilir. Hastalık, uyku bozukluğu veya kaygı tedavisi vaat etmez.",
    youtubeUrl: "https://youtu.be/pIU5_-U9uCo",
    thumbnail: "https://i.ytimg.com/vi/pIU5_-U9uCo/hqdefault.jpg",
  },
  {
    slug: "528-hz",
    number: "03",
    category: "528 HZ · SEVGİ · DÖNÜŞÜM",
    title: "528 Hz · Sevgi, Dönüşüm ve DNA Onarımı",
    h1: "528 Hz Frekans Müziği",
    seoTitle: "528 Hz Frekans Müziği | GoldFrekans – GoldKozmos",
    metaDescription:
      "528 Hz temasıyla hazırlanan GoldFrekans müziği. Sevgi ve dönüşüm niyetiyle dinlenen bir ses deneyimidir; tıbbi iddia taşımaz.",
    description:
      "528 Hz temasıyla hazırlanan sevgi, dönüşüm ve içsel farkındalık odaklı frekans müziği.",
    about:
      "Kütüphanede 432 Hz kaydı yoktur. Bu parça, 528 Hz etiketli mevcut YouTube içeriğidir. Başlıktaki DNA onarımı ifadesi kaydın orijinal adından gelir; GoldKozmos bunu bilimsel bir tedavi kanıtı olarak sunmaz. Frekans müziği bir dinleme tercihidir, klinik müdahale değildir.",
    howToListen:
      "Sayfadaki oynatıcı veya GoldFrekans hub’ındaki kart kaydı açar. Süreyi sen belirlersin. Başka bir Hz değerine ait ayrı bir sayfa yoktur.",
    context:
      "Niyet tutma, yazı yazma veya sessiz oturuş sırasında arka plan olarak dinlenebilir. Hastalığı iyileştirmez, bedeni onarmaz, DNA’yı değiştirmez. Benzer tonda kalp çakrası kaydı ayrı bir sayfada durur.",
    youtubeUrl: "https://youtu.be/zs4WsgOI3Hg",
    thumbnail: "https://i.ytimg.com/vi/zs4WsgOI3Hg/hqdefault.jpg",
  },
  {
    slug: "7-cakra",
    number: "04",
    category: "7 ÇAKRA · DENGELEME",
    title: "7 Çakra Dengeleme Frekans Müziği",
    h1: "7 Çakra Frekans Müziği",
    seoTitle: "7 Çakra Frekans Müziği | GoldFrekans – GoldKozmos",
    metaDescription:
      "Yedi çakra temalı GoldFrekans müziği. Meditasyon ve enerji farkındalığına eşlik eden bir dinleme kaydıdır; tıbbi dengeleme iddiası yoktur.",
    description:
      "Yedi çakra temasını merkezine alan, meditasyon ve enerji farkındalığı pratiğine eşlik eden frekans müziği.",
    about:
      "Parça, yedi çakra dilini müzikal bir çerçeve olarak kullanır. Çakra dengeleme seansı veya 7 Çakra Dengeleme Çalışması bu sayfada satılmaz; o hizmet Çalışmalar hub’ındadır. Burada yalnızca ses kaydı vardır.",
    howToListen:
      "YouTube oynatıcısından dinle. Görselleştirme yapmak isteğe bağlıdır. GoldMind’de henüz ayrı bir çakra meditasyonu yayınlanmadığı için bu kayıt ses katmanı olarak kalır.",
    context:
      "Oturarak dinleme, hafif hareket veya GoldRitüel öncesi bir eşlik sesi olarak kullanılabilir. Organ, hormon veya hastalık üzerinde kanıtlanmış etkisi iddia edilmez.",
    youtubeUrl: "https://youtu.be/T9C5Vo3hYiE",
    thumbnail: "https://i.ytimg.com/vi/T9C5Vo3hYiE/hqdefault.jpg",
  },
  {
    slug: "kalp-cakrasi",
    number: "05",
    category: "KALP ÇAKRASI · AŞK",
    title: "Kalp Çakrası Frekans Müziği · Aşkı Hayatına Çağır",
    h1: "Kalp Çakrası Frekans Müziği",
    seoTitle: "Kalp Çakrası Frekans Müziği | GoldFrekans – GoldKozmos",
    metaDescription:
      "Kalp çakrası ve sevgi temalı GoldFrekans müziği. İlişki niyeti için dinlenebilir; büyü veya tedavi vaadi yoktur.",
    description:
      "Kalp çakrası, sevgi ve ilişki niyetleri temasına odaklanan meditasyon ve frekans müziği.",
    about:
      "Sevgi ve bağ dilini taşıyan bir frekans kaydıdır. Birini geri getirme, ilişkiyi garanti etme veya kalp çakrasını tıbben açma iddiası yoktur. Aşk tarot bakımı ve ilişki yazıları ayrı hub’lardadır; bu sayfa yalnızca müziği tanımlar.",
    howToListen:
      "Hub kartından veya bu sayfadaki oynatıcıdan aç. Niyet cümlesi eklemek isteğe bağlıdır; kayıt konuşmaz.",
    context:
      "Yazı, yürüyüş veya sakin bir akşam aralığında dinlenebilir. 528 Hz kaydıyla tematik olarak komşudur ama aynı dosya değildir.",
    youtubeUrl: "https://youtu.be/FNUfK4BcsgU",
    thumbnail: "https://i.ytimg.com/vi/FNUfK4BcsgU/hqdefault.jpg",
  },
];

export function goldFrekansBySlug(slug: string) {
  return GOLDFREKANS_TRACKS.find((track) => track.slug === slug) ?? null;
}

export function relatedGoldFrekans(slug: string, limit = 3) {
  return GOLDFREKANS_TRACKS.filter((track) => track.slug !== slug).slice(
    0,
    limit,
  );
}
