import { applyDreamExpansion } from "./expansions";
import { restGuides } from "./rest-a";
import { restGuidesB } from "./rest-b";
import type { DreamGuide } from "./types";
import { yilanGuide } from "./yilan";
import { foldTurkish, scoreDreamQuery } from "../../lib/ruya-tabirleri/search";

export const DREAM_GUIDES: DreamGuide[] = [
  yilanGuide,
  ...restGuides,
  ...restGuidesB,
].map(applyDreamExpansion);

export function publishedDreams() {
  return DREAM_GUIDES.filter((dream) => dream.published);
}

export function dreamBySlug(slug: string) {
  return publishedDreams().find((dream) => dream.slug === slug) ?? null;
}

export function relatedDreamsOf(dream: DreamGuide) {
  return dream.relatedDreams
    .map((slug) => dreamBySlug(slug))
    .filter((item): item is DreamGuide => Boolean(item));
}

export function searchDreams(query: string, limit = 8) {
  const needle = foldTurkish(query);
  if (needle.length < 2) return [];

  return publishedDreams()
    .map((dream) => ({
      dream,
      score: scoreDreamQuery(query, [
        dream.title,
        dream.h1,
        ...dream.searchAliases,
        ...dream.variations.map((item) => item.heading),
      ]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.dream);
}
