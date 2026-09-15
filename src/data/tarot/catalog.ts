import { TAROT_DECK } from "./deck";
import type { TarotCard, TarotSuit } from "./types";
import { foldTurkish } from "../../lib/ruya-tabirleri/search";

export const TAROT_SUIT_GROUPS: { suit: TarotSuit; title: string }[] = [
  { suit: "major", title: "Büyük Arkana" },
  { suit: "cups", title: "Kupalar" },
  { suit: "swords", title: "Kılıçlar" },
  { suit: "wands", title: "Değnekler" },
  { suit: "pentacles", title: "Tılsımlar" },
];

export function tarotGroupedBySuit() {
  return TAROT_SUIT_GROUPS.map((group) => ({
    ...group,
    cards: TAROT_DECK.filter((card) => card.suit === group.suit),
  }));
}

export function tarotBySlug(slug: string) {
  return TAROT_DECK.find((card) => card.slug === slug) ?? null;
}

export function relatedTarotOf(card: TarotCard) {
  return card.related
    .map((slug) => tarotBySlug(slug))
    .filter((item): item is TarotCard => Boolean(item));
}

export function searchTarot(query: string, limit = 78) {
  const needle = foldTurkish(query);
  if (!needle) return TAROT_DECK;
  return TAROT_DECK.filter((card) =>
    [card.name, card.h1, ...card.searchAliases, card.brief].some((item) =>
      foldTurkish(item).includes(needle),
    ),
  ).slice(0, limit);
}
