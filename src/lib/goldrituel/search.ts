import { foldTurkish } from "../ruya-tabirleri/search";
import type { Ritual, RitualChip } from "../../data/goldrituel/types";

export function matchesRitualQuery(ritual: Ritual, query: string) {
  const needle = foldTurkish(query);
  if (needle.length < 2) return true;

  const hay = foldTurkish(
    [
      ritual.title,
      ritual.summary,
      ritual.intro,
      ritual.purpose,
      ritual.tags.join(" "),
      ritual.materials.join(" "),
    ].join(" "),
  );

  return hay.includes(needle);
}

export function filterRituals(
  rituals: Ritual[],
  query: string,
  chip: RitualChip | null,
) {
  return rituals.filter((ritual) => {
    if (chip && !ritual.tags.includes(chip)) return false;
    return matchesRitualQuery(ritual, query);
  });
}

export function similarRituals(ritual: Ritual, all: Ritual[], limit = 3) {
  return all
    .filter((item) => item.slug !== ritual.slug)
    .map((item) => ({
      item,
      score: item.tags.filter((tag) => ritual.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "tr"))
    .slice(0, limit)
    .map((entry) => entry.item);
}
