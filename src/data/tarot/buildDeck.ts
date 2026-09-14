import type { TarotCard } from "./types";
import { MAJOR_MEANINGS } from "./meanings/major";
import { CUP_MEANINGS } from "./meanings/cups";
import { SWORD_MEANINGS } from "./meanings/swords";
import { WAND_MEANINGS } from "./meanings/wands";
import { PENTACLE_MEANINGS } from "./meanings/pentacles";
import type { MeaningKernel } from "./meanings/schema";

const ALL: MeaningKernel[] = [
  ...MAJOR_MEANINGS,
  ...CUP_MEANINGS,
  ...SWORD_MEANINGS,
  ...WAND_MEANINGS,
  ...PENTACLE_MEANINGS,
];

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

function toCard(k: MeaningKernel, pool: MeaningKernel[]): TarotCard {
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
    symbols: k.symbols,
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
