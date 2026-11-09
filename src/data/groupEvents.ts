export const GROUP_EVENT_PRICE_KURUS = 60_000;
export const GROUP_EVENT_CONSENT_VERSION = "2026-11-09-v1";

export type GroupEvent = {
  id: string;
  title: string;
  startsAt: string;
  purpose: string;
  scope: string[];
  suitableFor: string;
  productEnv: string;
  cover?: { src: string; alt: string };
};

export const groupEvents: readonly GroupEvent[] = [
  {
    id: "karmalarindan-arin-20261114", title: "Karmalarından Arın",
    cover: { src: "/images/group-events/v1/karmalarindan-arin.png", alt: "Krem taş üzerinde açılarak yükselen altın şerit düğümü" },
    startsAt: "2026-11-14T20:30:00+03:00", productEnv: "SHOPIER_EVENT_KARMA_PRODUCT_ID",
    purpose: "Tekrar eden yaşam örüntülerini fark etmek ve kendine yeni bir başlangıç için alan açmak.",
    scope: ["Tekrar eden düşünce ve davranış örüntülerini gözlemleme", "Geçmişten taşınan yükler üzerine niyet ve farkındalık", "Rehberli enerji çalışması ve kişisel değerlendirme"],
    suitableFor: "Hayatında tekrar ettiğini düşündüğün konulara spiritüel farkındalık açısından bakmak istiyorsan bu çalışmayı inceleyebilirsin.",
  },
  {
    id: "mekan-enerjisi-arinmasi-20261117", title: "Mekân Enerjisi Arınması",
    cover: { src: "/images/group-events/v1/mekan-enerjisi-arinmasi.png", alt: "Altın ışığın kemerli krem bir mekâna yayıldığı sakin iç alan" },
    startsAt: "2026-11-17T20:30:00+03:00", productEnv: "SHOPIER_EVENT_MEKAN_PRODUCT_ID",
    purpose: "Yaşadığın alanla kurduğun ilişkiyi gözlemlemek ve mekânında daha sakin bir alan oluşturma niyetine odaklanmak.",
    scope: ["Ev veya çalışma alanıyla kurduğun bağ üzerine farkındalık", "Mekân için niyet belirleme ve rehberli enerji çalışması", "Çalışma sonrasında sürdürülebilecek küçük farkındalık adımları"],
    suitableFor: "Evinde veya çalışma alanında yeni bir başlangıç yapmak, mekânına daha bilinçli yaklaşmak istiyorsan katılabilirsin.",
  },
  {
    id: "disil-eril-enerji-dengeleme-20261120", title: "Dişil–Eril Enerji Dengeleme",
    cover: { src: "/images/group-events/v1/disil-eril-enerji-dengeleme.png", alt: "Birbirini dengeleyen fildişi ve altın renkli iki kıvrımlı form" },
    startsAt: "2026-11-20T20:30:00+03:00", productEnv: "SHOPIER_EVENT_DENGE_PRODUCT_ID",
    purpose: "Almak ve vermek, dinlenmek ve harekete geçmek arasındaki kişisel dengeyi spiritüel bir çerçevede keşfetmek.",
    scope: ["Dişil ve eril kavramlarına sembolik bir bakış", "Gündelik hayatta almak, vermek ve sınır koymak üzerine farkındalık", "Denge niyetine odaklanan rehberli enerji çalışması"],
    suitableFor: "Kendi ritmini, ihtiyaçlarını ve yaşamındaki dengeyi keşfetmek isteyen herkes için hazırlanmıştır; herhangi bir cinsiyetle sınırlı değildir.",
  },
  {
    id: "iliskisel-blokajlardan-arinma-20261122", title: "İlişkisel Blokajlardan Arınma",
    cover: { src: "/images/group-events/v1/iliskisel-blokajlardan-arinma.png", alt: "Ortak bir bağ oluştururken aralarında alan bırakan iki altın şerit" },
    startsAt: "2026-11-22T20:30:00+03:00", productEnv: "SHOPIER_EVENT_ILISKI_PRODUCT_ID",
    purpose: "İlişkilerde tekrar eden örüntüleri, kişisel sınırları ve ihtiyaçlarını daha açık görebilmek için alan oluşturmak.",
    scope: ["İlişkilere taşınan beklenti ve tekrarları gözlemleme", "Güven, sınırlar ve kendi ihtiyaçlarına odaklanma", "Bırakma niyetiyle rehberli enerji çalışması"],
    suitableFor: "Bir ilişkide olsan da olmasan da, ilişkilerle kurduğun bağı ve kişisel örüntülerini fark etmek istiyorsan katılabilirsin.",
  },
];

export function findGroupEvent(id: unknown) {
  return typeof id === "string" ? groupEvents.find(event => event.id === id) : undefined;
}

export function formatGroupEventDate(startsAt: string) {
  return new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", day: "numeric", month: "long", weekday: "long" }).format(new Date(startsAt));
}
