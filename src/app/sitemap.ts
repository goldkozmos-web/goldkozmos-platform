import type { MetadataRoute } from "next";

import { publishedDreams } from "../data/ruya-tabirleri/catalog";
import { publishedRituals } from "../data/goldrituel/catalog";
import { goldBlogArticles } from "../data/goldblogArticles";
import { TAROT_DECK } from "../data/tarot/deck";
import { SIGNS } from "../data/burclar/signs";
import { allCanonicalPairs } from "../lib/burclar/pairs";
import { SITE_ORIGIN } from "../lib/site";

const baseUrl = SITE_ORIGIN;

function loc(
  path: string,
  extras: Partial<MetadataRoute.Sitemap[number]> = {},
): MetadataRoute.Sitemap[number] {
  return {
    url: path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`,
    ...extras,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const hubs: MetadataRoute.Sitemap = [
    loc("/", { changeFrequency: "weekly", priority: 1 }),
    loc("/enerji-ekolu", { changeFrequency: "monthly", priority: 0.9 }),
    loc("/sana-uygun-calismayi-bul", { changeFrequency: "monthly", priority: 0.9 }),
    loc("/calismalar", { changeFrequency: "monthly", priority: 0.8 }),
    loc("/calismalar/kendilik", { changeFrequency: "monthly", priority: 0.9 }),
    loc("/calismalar/iliski", { changeFrequency: "monthly", priority: 0.9 }),
    loc("/calismalar/para", { changeFrequency: "monthly", priority: 0.9 }),
    loc("/calismalar/ask-ve-iliski", { changeFrequency: "monthly", priority: 0.7 }),
    loc("/calismalar/analizler", { changeFrequency: "monthly", priority: 0.7 }),
    loc("/calismalar/birebir-seanslar", { changeFrequency: "monthly", priority: 0.8 }),
    loc("/calismalar/enerji-calismalari", { changeFrequency: "monthly", priority: 0.8 }),
    loc("/calismalar/enerji", { changeFrequency: "monthly", priority: 0.6 }),
    loc("/goldmind", { changeFrequency: "monthly", priority: 0.8 }),
    loc("/calismalar/tarot", { changeFrequency: "monthly", priority: 0.8 }),
    loc("/calismalar/numeroloji", { changeFrequency: "monthly", priority: 0.8 }),
    loc("/calismalar/ses-kayitlari", { changeFrequency: "monthly", priority: 0.7 }),
    loc("/rezonans-egitimleri", { changeFrequency: "monthly", priority: 0.8 }),
    loc("/goldbook", { changeFrequency: "monthly", priority: 0.8 }),
    loc("/goldcast", { changeFrequency: "weekly", priority: 0.8 }),
    loc("/goldblog", { changeFrequency: "weekly", priority: 0.9 }),
    loc("/ruya-tabirleri", { changeFrequency: "weekly", priority: 0.9 }),
    loc("/burclar", { changeFrequency: "weekly", priority: 0.9 }),
    loc("/burc-uyumu", { changeFrequency: "weekly", priority: 0.8 }),
    loc("/goldrituel", { changeFrequency: "weekly", priority: 0.9 }),
    loc("/kendilik-yolculugu", { changeFrequency: "monthly", priority: 0.7 }),
    loc("/arketip-testi", { changeFrequency: "monthly", priority: 0.7 }),
    loc("/testler/iliski-oruntusu", { changeFrequency: "monthly", priority: 0.7 }),
    loc("/testler/karakter-analizi", { changeFrequency: "monthly", priority: 0.7 }),
    loc("/testler/golge-yan", { changeFrequency: "monthly", priority: 0.6 }),
    loc("/tarot-bakimi", { changeFrequency: "weekly", priority: 0.9 }),
    loc("/tarot-kartlari", { changeFrequency: "weekly", priority: 0.8 }),
    loc("/goldfrekans", { changeFrequency: "monthly", priority: 0.7 }),
    loc("/etkinlikler", { changeFrequency: "weekly", priority: 0.7 }),
    loc("/hakkimda", { changeFrequency: "monthly", priority: 0.7 }),
    loc("/whatsapp-kanali", { changeFrequency: "monthly", priority: 0.5 }),
    loc("/randevu", { changeFrequency: "monthly", priority: 0.6 }),
    loc("/iletisim", { changeFrequency: "monthly", priority: 0.5 }),
    loc("/yasal-bilgiler", { changeFrequency: "yearly", priority: 0.3 }),
    loc("/gizlilik-politikasi", { changeFrequency: "yearly", priority: 0.2 }),
    loc("/kvkk-aydinlatma-metni", { changeFrequency: "yearly", priority: 0.2 }),
    loc("/kullanim-kosullari", { changeFrequency: "yearly", priority: 0.2 }),
    loc("/iptal-ve-iade-politikasi", { changeFrequency: "yearly", priority: 0.2 }),
    loc("/mesafeli-satis-sozlesmesi", { changeFrequency: "yearly", priority: 0.2 }),
  ];

  const blogs = goldBlogArticles.map((article) =>
    loc(`/goldblog/${article.slug}`, {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const dreams = publishedDreams().map((dream) =>
    loc(`/ruya-tabirleri/${dream.slug}`, {
      lastModified: dream.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const rituals = publishedRituals().map((ritual) =>
    loc(`/goldrituel/${ritual.slug}`, {
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const tarotCards = TAROT_DECK.map((card) =>
    loc(`/tarot-kartlari/${card.slug}`, {
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const signs = SIGNS.flatMap((sign) => [
    loc(`/burclar/${sign.slug}-kadini`, {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    loc(`/burclar/${sign.slug}-erkegi`, {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  ]);

  const pairs = allCanonicalPairs().map((pair) =>
    loc(`/burc-uyumu/${pair.slug}`, {
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...hubs, ...blogs, ...dreams, ...rituals, ...tarotCards, ...signs, ...pairs];
}
