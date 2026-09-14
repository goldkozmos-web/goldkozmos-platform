import { randomInt } from "node:crypto";

import { TAROT_DECK } from "../../data/tarot/deck";
import type { TarotCard } from "../../data/tarot/types";

export function drawUniqueCards(count = 3): TarotCard[] {
  const pool = [...TAROT_DECK];
  const picked: TarotCard[] = [];
  while (picked.length < count && pool.length > 0) {
    const index = randomInt(pool.length);
    const [card] = pool.splice(index, 1);
    if (card) picked.push(card);
  }
  return picked;
}
