import { resonances } from "./calismalar/resonance-options";
import { resonanceHref } from "./calismalar/resonance-seo";
import type { MetadataRoute } from "next";
import { zodiacReadings } from "../data/zodiacReadings";

import { publishedDreams } from "../data/ruya-tabirleri/catalog";
import { publishedRituals } from "../data/goldrituel/catalog";
import { TAROT_DECK } from "../data/tarot/deck";
import { getWorkDetails } from "../data/workDetails";
import { goldBlogArticles } from "../data/goldblogArticles";
import { chakraGuides } from "../data/chakras";

const baseUrl = "https://goldkozmos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const dreams = publishedDreams().map((dream) => ({
    url: `${baseUrl}/ruya-tabirleri/${dream.slug}`,
    lastModified: dream.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const rituals = publishedRituals().map((ritual) => ({
    url: `${baseUrl}/goldrituel/${ritual.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tarotCards = TAROT_DECK.map((card) => ({
    url: `${baseUrl}/tarot-kartlari/${card.slug}`,
    ...(["degnek-prensi", "tilsim-prensi", "degnek-yedilisi"].includes(card.slug) ? { lastModified: "2026-10-28" } : {}),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...resonances.map(item=>({url:`${baseUrl}${resonanceHref(item.id)}`,lastModified:"2026-11-08",changeFrequency:"monthly" as const,priority:0.9})),
    { url: `${baseUrl}/kisisel-gelisim`, lastModified: "2026-10-17", changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/testler/golge-yan`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/burclar`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/randevu`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/kozmik-enerji`, lastModified: "2026-11-05", changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/ruhsal-arinma`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/enerji-temizligi`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/cakralar`, changeFrequency: "monthly", priority: 0.9 },
    ...chakraGuides.map((chakra) => ({ url: `${baseUrl}/cakralar/${chakra.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...goldBlogArticles.map((article) => ({
      url: `${baseUrl}/goldblog/${article.slug}`,
      ...(article.publishedAt ? { lastModified: article.updatedAt ?? article.publishedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getWorkDetails().map((work) => ({
      url: `${baseUrl}${work.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${baseUrl}/enerji-ekolu`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/sana-uygun-calismayi-bul`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/calismalar`,
      changeFrequency: "monthly",
      priority: 0.8,
    },




    {
      url: `${baseUrl}/calismalar/enerji-calismalari`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/goldmind`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/calismalar/tarot`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/calismalar/numeroloji`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/calismalar/ses-kayitlari`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/rezonans-egitimleri`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/goldbook`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/goldcast`,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/goldblog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/ruya-tabirleri`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/goldrituel`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/kendilik-yolculugu`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/arketip-testi`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/tarot-bakimi`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/tarot-kartlari`,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/goldfrekans`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/etkinlikler`,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/hakkimda`,
      lastModified: "2026-10-17",
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/whatsapp-kanali`,
      changeFrequency: "monthly",
      priority: 0.5,
    },


    {
      url: `${baseUrl}/iletisim`,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/gizlilik-politikasi`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${baseUrl}/kvkk-aydinlatma-metni`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${baseUrl}/kullanim-kosullari`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${baseUrl}/iptal-ve-iade-politikasi`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${baseUrl}/mesafeli-satis-sozlesmesi`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${baseUrl}/erisilebilirlik`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...zodiacReadings.map(sign => ({ url: `${baseUrl}/burclar/${sign.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...dreams,
    ...rituals,
    ...tarotCards,
  ];
}

