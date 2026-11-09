import type { TarotCard } from "./types";
import { MAJOR_MEANINGS } from "./meanings/major";
import { CUP_MEANINGS } from "./meanings/cups";
import { SWORD_MEANINGS } from "./meanings/swords";
import { WAND_MEANINGS } from "./meanings/wands";
import { PENTACLE_MEANINGS } from "./meanings/pentacles";
import type { MeaningKernel } from "./meanings/schema";
import { minorEditorial } from "./editorial";

const ALL: MeaningKernel[] = [
  ...MAJOR_MEANINGS,
  ...CUP_MEANINGS,
  ...SWORD_MEANINGS,
  ...WAND_MEANINGS,
  ...PENTACLE_MEANINGS,
];

const suitSymbolNotes: Record<string, string> = {
  wands: "Değnek, geleneksel tarot dilinde Ateş elementiyle ilişkilendirilir: isteğin nasıl harekete geçtiğine, ilhamın hangi çabayla taşındığına bakılır. Açılımdaki soru, bu hareketin yaratıcı mı yoksa tüketici mi yaşandığını ayırt etmene yardımcı olur.",
  cups: "Kupa, Su elementi ve duygusal alışverişle ilişkilendirilir. Kabın dolu, boş veya paylaşılmış olması yakınlığın nasıl yaşandığını düşünmek için bir çerçevedir. Bir duygu ile o duygunun davranıştaki karşılığını ayrı ayrı değerlendir.",
  swords: "Kılıç, Hava elementi ve zihinsel ayrımla ilişkilendirilir. Keskinlik hem net kararın hem inciten sözün sembolü olabilir. Kartı okurken düşünceyi, söylenen sözü ve gerçek davranışı birbirine karıştırmadan ele al.",
  pentacles: "Tılsım, Toprak elementi ve somut yaşamla ilişkilendirilir. Emek, zaman, kaynak ve gündelik düzen birlikte düşünülür. Bu sembolün değeri yalnızca para değildir; bir ilişkiyi veya işi sürdüren gerçek katkıları da görünür kılar.",
};
const rankNotes: Record<string, string> = {
  "1": "As, destenin bu alanında henüz gelişebilecek bir imkânı temsil eder; potansiyel ile gerçekleşmiş sonuç aynı şey değildir.",
  "2": "İki, karşılıklılık veya iki seçenek arasında durma temasını açar; kartın kendi sahnesi bu ikiliğin nasıl yaşandığını belirler.",
  "3": "Üç, tek başına başlayan şeyin bir ilişki, grup veya yeni aşamaya açılması üzerine okunabilir.",
  "4": "Dört, bir düzenin yerleşmesi kadar o düzende fazla kalma ihtimalini de düşündürür; rahatlık ile hareketsizlik ayrımına bak.",
  "5": "Beş, alışılmış dengenin zorlandığı bir alanı görünür kılabilir. Çatışmanın kaynağını ve ihtiyaç duyulan desteği birlikte değerlendir.",
  "6": "Altı, zorlanma sonrasında ilişkinin veya düzenin nasıl kurulduğuna bakmayı sağlar; karşılıklılık ve ilerleyiş kartın bağlamıyla okunur.",
  "7": "Yedi, mevcut durumu sorgulama ve seçilen yönü gözden geçirme alanıdır. İlk görünenle daha derindeki ihtiyacı ayırmak önemlidir.",
  "8": "Sekiz, bir hareketin tekrarına veya ivmesine bakmayı sağlar. Tekrarın beceri mi, sıkışma mı yarattığını kartın sahnesiyle değerlendir.",
  "9": "Dokuz, bir sürecin kişide bıraktığı birikime yaklaşır; tamamlanmaya yaklaşırken hangi ihtiyacın görünür olduğuna bak.",
  "10": "On, bir alanın büyümüş sonucunu ve bu sonucun nasıl taşındığını düşündürür. Tamamlanma her zaman hafiflik anlamına gelmez.",
};

function relatedFor(card: MeaningKernel, pool: MeaningKernel[]): string[] {
  const others = pool.filter((item) => item.slug !== card.slug);
  const sameSuit = others.filter((item) => item.suit === card.suit);
  const n = Number(card.number);
  const next =
    sameSuit.find((item) => Number(item.number) === n + 1) ?? sameSuit[0];
  const prev =
    sameSuit.find((item) => Number(item.number) === n - 1) ?? sameSuit[1];
  const major = others.find((item) => item.arcana === "major");
  return [next?.slug, prev?.slug, major?.slug].filter(
    (slug, index, list): slug is string => Boolean(slug) && list.indexOf(slug) === index,
  ).slice(0, 3);
}

function toCard(kernel: MeaningKernel, pool: MeaningKernel[]): TarotCard {
  const k = { ...kernel, ...minorEditorial[kernel.slug] };
  const brief = `${k.name} tarot kartı ${k.coreThemes.slice(0, 3).join(", ")} temalarını taşır.`;
  const searchAliases = [
    k.name,
    k.slug.replaceAll("-", " "),
    ...(k.aliases ?? []),
    ...k.coreThemes,
  ];
  return {
    id: k.slug,
    slug: k.slug,
    name: k.name,
    arcana: k.arcana,
    suit: k.suit,
    number: k.number,
    rank: k.rank,
    h1: `${k.name} Tarot Kartı Anlamı`,
    seoTitle: `${k.name} Tarot Kartı Anlamı | GoldKozmos`,
    metaDescription: `${k.name} tarot kartı anlamı: ${k.coreThemes.slice(0, 4).join(", ")}. Aşk, düşünceler, duygular, kariyer, tavsiye ve ters anlam.`,
    searchAliases,
    brief,
    generalMeaning: k.generalMeaning,
    coreThemes: k.coreThemes,
    loveMeaning: k.loveMeaning,
    relationshipMeaning: k.relationshipMeaning,
    thoughtsMeaning: k.thoughtsMeaning,
    feelingsMeaning: k.feelingsMeaning,
    actionMeaning: k.actionMeaning,
    careerMeaning: k.careerMeaning,
    moneyMeaning: k.moneyMeaning,
    futurePotential: k.futurePotential,
    adviceMeaning: k.adviceMeaning,
    shadowMeaning: k.shadowMeaning,
    reversedMeaning: k.reversedMeaning,
    symbols: k.arcana === "major" ? k.symbols : `${k.symbols}\n\n${suitSymbolNotes[k.suit]}\n\n${rankNotes[k.number] ?? "Saray kartları bir kişi kadar bir yaklaşım biçimini de temsil edebilir. Kartı yalnızca yaş veya cinsiyetle eşleştirmek yerine, anlatılan tutumun bu konuda kimde ve nasıl göründüğüne bak."}`,
    spiritualMeaning: k.spiritualMeaning,
    polar: k.polar,
    related: relatedFor(k, pool),
    general: k.generalMeaning,
    love: k.loveMeaning,
    career: k.careerMeaning,
    spiritual: k.spiritualMeaning,
    energy: `${k.name} pratikte ${k.coreThemes.join(", ")} üzerinden işler. Bu, soyut bir etiket değil; kartın hayatta hangi malzemeyle göründüğüdür.`,
    otherFeelings: k.feelingsMeaning,
    future: k.futurePotential,
    advice: k.adviceMeaning,
    reversed: k.reversedMeaning,
    topics: {
      love: k.loveMeaning,
      thoughts: k.thoughtsMeaning,
      career: k.careerMeaning,
      general: k.generalMeaning,
      development: k.spiritualMeaning,
      decision: k.adviceMeaning,
    },
    blend: k.coreThemes.slice(0, 3).join("; "),
  };
}

export const TAROT_DECK: TarotCard[] = ALL.map((k) => toCard(k, ALL));

export function getTarotCard(slug: string) {
  return TAROT_DECK.find((card) => card.slug === slug);
}
