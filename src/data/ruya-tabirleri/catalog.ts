import { restGuides } from "./rest-a";
import { scenarioDreamGuides } from "./scenarios";
import { restGuidesB } from "./rest-b";
import type { DreamGuide } from "./types";
import { yilanGuide } from "./yilan";
import { expandedDreamGuides } from "./expanded";
import { dictionaryExtension } from "./dictionary-extension";
import { foldTurkish, scoreDreamQuery } from "../../lib/ruya-tabirleri/search";

export const DREAM_GUIDES: DreamGuide[] = [
  yilanGuide,
  ...restGuides,
  ...restGuidesB,
  ...expandedDreamGuides,
  ...dictionaryExtension,
  ...scenarioDreamGuides,
];

export function publishedDreams() {
  return DREAM_GUIDES.filter((dream) => dream.published);
}

export function dreamBySlug(slug: string) {
  return publishedDreams().find((dream) => dream.slug === slug) ?? null;
}

export function relatedDreamsOf(dream: DreamGuide) {
  const explicit = dream.relatedDreams
    .map((slug) => dreamBySlug(slug))
    .filter((item): item is DreamGuide => Boolean(item));
  if (explicit.length) return explicit;
  const groups = [
    ["su", "deniz", "balık", "dalga", "göl", "nehir", "ırmak", "sel", "yağmur", "yüzmek", "boğulmak", "şelale"],
    ["anne", "baba", "aile", "kardeş", "abla", "ağabey", "dede", "anneanne", "amca", "akraba", "çocuk", "bebek"],
    ["araba", "uçak", "tren", "otobüs", "vapur", "gemi", "bisiklet", "taksi", "yol", "valiz", "bilet"],
    ["ev", "oda", "kapı", "anahtar", "pencere", "duvar", "balkon", "dolap", "banyo", "yatak"],
    ["sevgili", "ayrılık", "aldatılmak", "aldatmak", "evlilik", "nikâh", "alyans", "yüzük", "düğün", "gelin"],
    ["yılan", "akrep", "örümcek", "köpek", "kedi", "kuş", "kartal", "arı", "tilki", "kurt", "at"],
  ];
  const title = dream.title.toLocaleLowerCase("tr-TR");
  const group = groups.find(items => items.some(word => title.includes(word)));
  if (!group) return [];
  return publishedDreams().filter(item => item.slug !== dream.slug && group.some(word => item.title.toLocaleLowerCase("tr-TR").includes(word))).slice(0, 4);
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
