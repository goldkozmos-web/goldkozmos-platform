import { restGuides } from "./rest-a";
import { restGuidesB } from "./rest-b";
import type { DreamConcept, DreamGuide } from "./types";
import { yilanGuide } from "./yilan";
import generatedConcepts from "./generated/concepts.json";
import { buildSearchIndex, queryDreamIndex } from "../../lib/ruya-tabirleri/engine";
import { foldTurkish } from "../../lib/ruya-tabirleri/search";
import { colorMeaningLine, actionMeaningLine } from "../../lib/ruya-tabirleri/modifiers";

const EDITORIAL: DreamGuide[] = [
  { ...yilanGuide, indexable: true, category: "animal", mainSymbol: "yılan" },
  ...restGuides.map((dream) => ({ ...dream, indexable: true })),
  ...restGuidesB.map((dream) => ({ ...dream, indexable: true })),
];

const editorialSlugs = new Set(EDITORIAL.map((dream) => dream.slug));

export function conceptToGuide(concept: DreamConcept): DreamGuide {
  return {
    id: concept.id,
    title: concept.title,
    slug: concept.slug,
    h1: concept.h1,
    seoTitle: concept.seoTitle,
    metaDescription: concept.metaDescription,
    searchAliases: concept.aliases,
    intro: concept.shortAnswer,
    spiritualMeaning: concept.spiritualMeaning,
    variations: concept.variants,
    summary: concept.shortAnswer.split("\n\n")[0] ?? concept.shortAnswer,
    relatedDreams: concept.relatedSymbols,
    faqs: [],
    published: concept.published,
    updatedAt: "2026-09-19",
    category: concept.category,
    mainSymbol: concept.mainSymbol,
    indexable: concept.indexable,
  };
}

const dictionaryGuides = (generatedConcepts as DreamConcept[])
  .filter((concept) => !editorialSlugs.has(concept.slug))
  .map(conceptToGuide);

export const DREAM_GUIDES: DreamGuide[] = [...EDITORIAL, ...dictionaryGuides];

export function publishedDreams() {
  return DREAM_GUIDES.filter((dream) => dream.published);
}

export function indexableDreams() {
  return publishedDreams().filter((dream) => dream.indexable !== false);
}

export function dreamBySlug(slug: string) {
  return publishedDreams().find((dream) => dream.slug === slug) ?? null;
}

export function relatedDreamsOf(dream: DreamGuide) {
  return dream.relatedDreams
    .map((slug) => dreamBySlug(slug))
    .filter((item): item is DreamGuide => Boolean(item));
}

const searchIndex = buildSearchIndex(
  publishedDreams().map((dream) => ({
    slug: dream.slug,
    title: dream.title,
    aliases: dream.searchAliases,
    folded: [dream.title, dream.h1, dream.mainSymbol ?? "", ...dream.searchAliases]
      .map((item) => foldTurkish(item))
      .filter(Boolean),
  })),
);

export function resolveDreamSearch(query: string, limit = 8) {
  return queryDreamIndex(searchIndex, query, limit);
}

export function searchDreams(query: string, limit = 8) {
  const { hits, parsed } = resolveDreamSearch(query, limit);
  const dreams = hits
    .map((hit) => dreamBySlug(hit.slug))
    .filter((item): item is DreamGuide => Boolean(item));
  return dreams.map((dream) =>
    withParsedOverlay(dream, parsed.color, parsed.action, parsed.gender),
  );
}

export function withParsedOverlay(
  dream: DreamGuide,
  color?: string,
  action?: string,
  gender?: string,
) {
  const extra = [color ? colorMeaningLine(color) : "", action ? actionMeaningLine(action) : ""]
    .filter(Boolean)
    .join(" ");
  if (!extra && !gender) return dream;
  const genderLine = gender
    ? gender === "erkek"
      ? "Erkek suret, aktif ve dışa akan bir kuvvet katmanı taşır."
      : "Kız veya kadın suret, içe akan, koruyan veya doğuran bir katmanı boyar."
    : "";
  return {
    ...dream,
    intro: [dream.intro, extra, genderLine].filter(Boolean).join("\n\n"),
  };
}

export function dreamsByLetter(letter: string) {
  const needle = foldTurkish(letter).charAt(0);
  return publishedDreams().filter((dream) => {
    const source = dream.mainSymbol || dream.title.replace(/^rüyada\s+/i, "");
    return foldTurkish(source).charAt(0) === needle;
  });
}

export function dictionaryStats() {
  const published = publishedDreams();
  const aliases = published.reduce((sum, dream) => sum + dream.searchAliases.length, 0);
  const categories = new Set(published.map((dream) => dream.category).filter(Boolean));
  return {
    canonical: published.length,
    aliases,
    categories: categories.size,
    indexable: indexableDreams().length,
  };
}
