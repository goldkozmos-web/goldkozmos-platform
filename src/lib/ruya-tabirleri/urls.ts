import { SITE_ORIGIN } from "../site";
import { publishedDreams } from "../../data/ruya-tabirleri/catalog";

export const RUYA_HUB_PATH = "/ruya-tabirleri";

export function ruyaUrl(slug?: string) {
  if (!slug) return `${SITE_ORIGIN}${RUYA_HUB_PATH}`;
  return `${SITE_ORIGIN}${RUYA_HUB_PATH}/${slug}`;
}

export function ruyaPath(slug?: string) {
  if (!slug) return RUYA_HUB_PATH;
  return `${RUYA_HUB_PATH}/${slug}`;
}

export function publishedDreamSlugs() {
  return publishedDreams().map((dream) => dream.slug);
}
