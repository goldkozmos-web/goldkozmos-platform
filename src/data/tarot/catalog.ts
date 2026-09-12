import { TAROT_DECK as RAW_DECK } from "./deck";
import { attachReading } from "./essence";
import type { TarotCard } from "./types";
import { foldTurkish } from "../../lib/ruya-tabirleri/search";

export const TAROT_DECK: TarotCard[] = RAW_DECK.map(attachReading);

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
