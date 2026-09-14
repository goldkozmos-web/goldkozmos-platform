import { DREAM_LEXICON, lexiconForSlug } from "./lexicon";
import { restGuides } from "./rest-a";
import { restGuidesB } from "./rest-b";
import type { DreamGuide, DreamGuideDraft, DreamSearchHit } from "./types";
import { yilanGuide } from "./yilan";
import {
  foldTurkish,
  scoreDreamQuery,
  uniqueTerms,
} from "../../lib/ruya-tabirleri/search";

const RUYA_PATH = "/ruya-tabirleri";

export function prepareGuide(draft: DreamGuideDraft): DreamGuide {
  const linked = lexiconForSlug(draft.slug);
  const aliases = uniqueTerms([
    draft.title,
    draft.h1,
    ...draft.searchAliases,
    ...(draft.aliases ?? []),
    ...linked.flatMap((item) => item.aliases),
    ...draft.variations.map((item) => item.heading),
  ]);
  const keywords = uniqueTerms([
    ...(draft.keywords ?? []),
    ...linked.flatMap((item) => item.keywords),
  ]);
  return {
    ...draft,
    aliases,
    keywords,
    normalizedSearchTerms: uniqueTerms(
      [...aliases, ...keywords, draft.slug.replaceAll("-", " ")].map(foldTurkish),
    ),
  };
}

export const DREAM_GUIDES: DreamGuide[] = [
  yilanGuide,
  ...restGuides,
  ...restGuidesB,
].map(prepareGuide);

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

export function searchDreams(query: string, limit = 10): DreamSearchHit[] {
  const needle = foldTurkish(query);
  if (needle.length < 2) return [];

  const hits = new Map<string, DreamSearchHit & { score: number }>();

  function consider(hit: DreamSearchHit, score: number) {
    if (score <= 0) return;
    const key = hit.href ?? hit.slug;
    const current = hits.get(key);
    if (!current || score > current.score || (score === current.score && hit.ready && !current.ready)) {
      hits.set(key, { ...hit, score });
    }
  }

  for (const dream of publishedDreams()) {
    consider(
      {
        title: dream.title,
        slug: dream.slug,
        href: `${RUYA_PATH}/${dream.slug}`,
        ready: true,
      },
      scoreDreamQuery(query, dream.normalizedSearchTerms),
    );
  }

  for (const item of DREAM_LEXICON) {
    const readySlug = item.contentSlug;
    const ready = Boolean(readySlug && dreamBySlug(readySlug));
    consider(
      {
        title: item.title,
        slug: readySlug ?? item.slug,
        href: ready && readySlug ? `${RUYA_PATH}/${readySlug}` : undefined,
        ready,
      },
      scoreDreamQuery(query, item.normalizedSearchTerms),
    );
  }

  return [...hits.values()]
    .sort((a, b) => b.score - a.score || Number(b.ready) - Number(a.ready))
    .slice(0, limit)
    .map(({ score: _score, ...hit }) => hit);
}
