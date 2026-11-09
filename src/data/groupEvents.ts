export const GROUP_EVENT_PRICE_KURUS = 60_000;
export const GROUP_EVENT_CONSENT_VERSION = "2026-11-10-v3-bank-whatsapp";

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
    cover: { src: "/images/group-events/v2-posters/karmalarindan-arin.jpg", alt: "GoldKozmos Karmalarından Arın grup çalışması afişi" },
    startsAt: "2026-11-14T20:30:00+03:00", productEnv: "SHOPIER_EVENT_KARMA_PRODUCT_ID",
    purpose: "Tekrar eden yaşam örüntülerini fark etmek ve kendine yeni bir başlangıç için alan açmak.",
    scope: ["Tekrar eden düşünce ve davranış örüntülerini gözlemleme", "Geçmişten taşınan yükler üzerine niyet ve farkındalık", "Rehberli enerji çalışması ve kişisel değerlendirme"],
    suitableFor: "Hayatında tekrar ettiğini düşündüğün konulara spiritüel farkındalık açısından bakmak istiyorsan bu çalışmayı inceleyebilirsin.",
  },
  {
    id: "mekan-enerjisi-arinmasi-20261117", title: "Mekân Enerjisi Arınması",
    cover: { src: "/images/group-events/v2-posters/mekan-enerjisi-arinmasi.jpg", alt: "GoldKozmos Mekân Enerjisi Temizliği grup çalışması afişi" },
    startsAt: "2026-11-17T20:30:00+03:00", productEnv: "SHOPIER_EVENT_MEKAN_PRODUCT_ID",
    purpose: "Yaşadığın alanla kurduğun ilişkiyi gözlemlemek ve mekânında daha sakin bir alan oluşturma niyetine odaklanmak.",
    scope: ["Ev veya çalışma alanıyla kurduğun bağ üzerine farkındalık", "Mekân için niyet belirleme ve rehberli enerji çalışması", "Çalışma sonrasında sürdürülebilecek küçük farkındalık adımları"],
    suitableFor: "Evinde veya çalışma alanında yeni bir başlangıç yapmak, mekânına daha bilinçli yaklaşmak istiyorsan katılabilirsin.",
  },
  {
    id: "disil-eril-enerji-dengeleme-20261120", title: "Dişil–Eril Enerji Dengeleme",
    cover: { src: "/images/group-events/v2-posters/disil-eril-enerji-dengeleme.jpg", alt: "GoldKozmos Dişil Eril Enerjini Dengele grup çalışması afişi" },
    startsAt: "2026-11-20T20:30:00+03:00", productEnv: "SHOPIER_EVENT_DENGE_PRODUCT_ID",
    purpose: "Almak ve vermek, dinlenmek ve harekete geçmek arasındaki kişisel dengeyi spiritüel bir çerçevede keşfetmek.",
    scope: ["Dişil ve eril kavramlarına sembolik bir bakış", "Gündelik hayatta almak, vermek ve sınır koymak üzerine farkındalık", "Denge niyetine odaklanan rehberli enerji çalışması"],
    suitableFor: "Kendi ritmini, ihtiyaçlarını ve yaşamındaki dengeyi keşfetmek isteyen herkes için hazırlanmıştır; herhangi bir cinsiyetle sınırlı değildir.",
  },
  {
    id: "iliskisel-blokajlardan-arinma-20261122", title: "İlişkisel Blokajlardan Arınma",
    cover: { src: "/images/group-events/v2-posters/iliskisel-blokajlardan-arinma.jpg", alt: "GoldKozmos İlişkideki Blokajlarından Arın grup çalışması afişi" },
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

// Fixed package prices supplied by the site owner; never accept a browser total.
export function groupEventPrice(count: number) {
  const totals = [0, 60_000, 85_000, 155_000, 200_000];
  if (!Number.isInteger(count) || count < 0 || count > 4) throw new Error("Geçersiz etkinlik sayısı.");
  return { subtotalKurus: count * GROUP_EVENT_PRICE_KURUS, totalKurus: totals[count], discountKurus: count * GROUP_EVENT_PRICE_KURUS - totals[count] };
}

export function groupEventSelection(raw: unknown) {
  if (!Array.isArray(raw) || raw.length < 1 || raw.length > groupEvents.length || new Set(raw).size !== raw.length || raw.some(id => !findGroupEvent(id))) throw new Error("Katılmak istediğin çalışmaları kontrol et.");
  const events = groupEvents.filter(event => raw.includes(event.id));
  const key = events.map(event => groupEvents.indexOf(event) + 1).join("");
  return { events, key, productEnv: events.length === 1 ? events[0].productEnv : `SHOPIER_EVENT_PACKAGE_${key}_PRODUCT_ID`, ...groupEventPrice(events.length) };
}

export const groupEventOffers = Array.from({ length: (1 << groupEvents.length) - 1 }, (_, index) =>
  groupEventSelection(groupEvents.filter((_, bit) => (index + 1) & (1 << bit)).map(event => event.id)));

export function formatGroupPrice(kurus: number) {
  return `${new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(kurus / 100)} TL`;
}
