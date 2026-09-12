import { SITE_ORIGIN } from "../site";
import { publishedRituals } from "../../data/goldrituel/catalog";

export const GOLDRITUEL_HUB_PATH = "/goldrituel";

export function goldrituelUrl(slug?: string) {
  if (!slug) return `${SITE_ORIGIN}${GOLDRITUEL_HUB_PATH}`;
  return `${SITE_ORIGIN}${GOLDRITUEL_HUB_PATH}/${slug}`;
}

export function goldrituelPath(slug?: string) {
  if (!slug) return GOLDRITUEL_HUB_PATH;
  return `${GOLDRITUEL_HUB_PATH}/${slug}`;
}

export function publishedRitualSlugs() {
  return publishedRituals().map((ritual) => ritual.slug);
}
