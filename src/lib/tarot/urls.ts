import { SITE_ORIGIN } from "../site";

export const TAROT_CARE_PATH = "/tarot-bakimi";
export const TAROT_CARDS_PATH = "/tarot-kartlari";
export const TAROT_SHOP_PATH = "/calismalar/tarot";
export const TAROT_RANDEVU_PATH = "/randevu-al?service=tarot";

export const TAROT_WHATSAPP_HREF = `https://wa.me/905054722153?text=${encodeURIComponent(
  "Merhaba, kişisel Tarot bakımı hakkında bilgi almak istiyorum.",
)}`;

export function tarotCareUrl() {
  return `${SITE_ORIGIN}${TAROT_CARE_PATH}`;
}

export function tarotCardsUrl(slug?: string) {
  if (!slug) return `${SITE_ORIGIN}${TAROT_CARDS_PATH}`;
  return `${SITE_ORIGIN}${TAROT_CARDS_PATH}/${slug}`;
}

export function tarotCardPath(slug: string) {
  return `${TAROT_CARDS_PATH}/${slug}`;
}

export function tarotImagePath(slug: string) {
  return `/images/tarot/${slug}.svg`;
}
