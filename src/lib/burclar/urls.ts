import { SITE_ORIGIN } from "../site";

export const BURCLAR_HUB = "/burclar";
export const UYUM_HUB = "/burc-uyumu";

export function burclarUrl(slug?: string) {
  if (!slug) return `${SITE_ORIGIN}${BURCLAR_HUB}`;
  return `${SITE_ORIGIN}${BURCLAR_HUB}/${slug}`;
}

export function uyumUrl(slug?: string) {
  if (!slug) return `${SITE_ORIGIN}${UYUM_HUB}`;
  return `${SITE_ORIGIN}${UYUM_HUB}/${slug}`;
}
