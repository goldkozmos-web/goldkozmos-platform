import { goldBlogArticles } from "../../data/goldblogArticles";
import { publishedDreams } from "../../data/ruya-tabirleri/catalog";
import { TAROT_DECK } from "../../data/tarot/deck";
import { publishedRituals } from "../../data/goldrituel/catalog";
import { energyWorks } from "../../data/energyWorks";
import { GOLDMIND_COLLECTIONS } from "../../data/meditation";
import { SIGNS, genderPageSlug } from "../../data/burclar/signs";
import { foldTurkish, scoreDreamQuery } from "../ruya-tabirleri/search";

export type SearchHit = {
  id: string;
  title: string;
  type: string;
  description: string;
  href: string;
};

const STATIC_HITS: SearchHit[] = [
  {
    id: "goldblog",
    title: "GoldBlog",
    type: "GoldBlog",
    description: "Yazılar, günlük notlar ve rezonans metinleri.",
    href: "/goldblog",
  },
  {
    id: "goldbook",
    title: "GoldBook",
    type: "GoldBook",
    description: "Dijital kitaplar.",
    href: "/goldbook",
  },
  {
    id: "goldbook-kozmos",
    title: "İçindeki Kozmosu Kucakla",
    type: "GoldBook",
    description: "Özdeğer, sınırlar ve içsel özgürlük.",
    href: "/goldbook/icindeki-kozmosu-kucakla",
  },
  {
    id: "goldbook-ask",
    title: "Aşk Manifestosu",
    type: "GoldBook",
    description: "İlişkiler, sınırlar ve tekrar eden senaryolar.",
    href: "/goldbook/ask-manifestosu",
  },
  {
    id: "goldmind",
    title: "GoldMind",
    type: "GoldMind",
    description: "Meditasyon, nefes ve farkındalık pratikleri.",
    href: "/goldmind",
  },
  {
    id: "ruya",
    title: "Rüya Tabirleri",
    type: "Rüya Tabirleri",
    description: "Semboller ve rüya sözlüğü.",
    href: "/ruya-tabirleri",
  },
  {
    id: "tarot",
    title: "Tarot Kartları",
    type: "Tarot Kartları",
    description: "Kart anlamları ve bakımlar.",
    href: "/tarot-kartlari",
  },
  {
    id: "burclar",
    title: "Burçlar",
    type: "Burçlar",
    description: "Burç profilleri ve uyum okumaları.",
    href: "/burclar",
  },
  {
    id: "rituel",
    title: "Ritüeller",
    type: "Ritüeller",
    description: "GoldRitüel uygulamaları.",
    href: "/goldrituel",
  },
  {
    id: "calismalar",
    title: "Çalışmalar",
    type: "Çalışmalar",
    description: "Enerji çalışmaları ve seanslar.",
    href: "/calismalar",
  },
  {
    id: "testler",
    title: "Testler",
    type: "Testler",
    description: "Kendini tanı testleri.",
    href: "/#kendini-tani",
  },
  {
    id: "arketip",
    title: "Arketip Testi",
    type: "Testler",
    description: "Baskın arketiplerini gör.",
    href: "/arketip-testi",
  },
  {
    id: "karakter",
    title: "Karakter Analizi",
    type: "Testler",
    description: "Sosyal enerji, sınır ve karar tarzın.",
    href: "/testler/karakter-analizi",
  },
  {
    id: "golge",
    title: "Gölge Yan Testi",
    type: "Testler",
    description: "Zorlandığın eğilimleri fark et.",
    href: "/testler/golge-yan",
  },
  {
    id: "iliski",
    title: "İlişki Örüntüsü Testi",
    type: "Testler",
    description: "Yakınlık, sınır ve çatışma tarzın.",
    href: "/testler/iliski-oruntusu",
  },
  {
    id: "yolculuk",
    title: "21 Günlük Kendilik Yolculuğu",
    type: "21 Günlük Kendilik Yolculuğu",
    description: "Günde 5–10 dakikalık gözlem ve uygulama.",
    href: "/kendilik-yolculugu",
  },
];

function extraHits(): SearchHit[] {
  const blogs = goldBlogArticles.map((article) => ({
    id: `blog-${article.slug}`,
    title: article.title,
    type: "GoldBlog",
    description: article.description,
    href: `/goldblog#${article.slug}`,
  }));

  const dreams = publishedDreams().map((dream) => ({
    id: `dream-${dream.slug}`,
    title: dream.title,
    type: "Rüya Tabirleri",
    description: dream.summary || dream.intro,
    href: `/ruya-tabirleri/${dream.slug}`,
  }));

  const cards = TAROT_DECK.map((card) => ({
    id: `tarot-${card.slug}`,
    title: card.name,
    type: "Tarot Kartları",
    description: card.brief,
    href: `/tarot-kartlari/${card.slug}`,
  }));

  const rituals = publishedRituals().map((ritual) => ({
    id: `ritual-${ritual.slug}`,
    title: ritual.title,
    type: "Ritüeller",
    description: ritual.summary,
    href: `/goldrituel/${ritual.slug}`,
  }));

  const works = energyWorks.map((work) => ({
    id: `work-${work.slug}`,
    title: work.title,
    type: "Çalışmalar",
    description: work.shortDescription,
    href: "/calismalar/enerji-calismalari",
  }));

  const mind = GOLDMIND_COLLECTIONS.map((item) => ({
    id: `mind-${item.id}`,
    title: item.title,
    type: "GoldMind",
    description: "GoldMind pratiği.",
    href: "/goldmind",
  }));

  const burclar = SIGNS.flatMap((sign) => [
    {
      id: `burc-${sign.slug}`,
      title: sign.name,
      type: "Burçlar",
      description: sign.relationshipStyle,
      href: "/burclar",
    },
    {
      id: `burc-${sign.slug}-kadin`,
      title: `${sign.name} Kadını`,
      type: "Burçlar",
      description: sign.woman.summary,
      href: `/burclar/${genderPageSlug(sign, "kadin")}`,
    },
    {
      id: `burc-${sign.slug}-erkek`,
      title: `${sign.name} Erkeği`,
      type: "Burçlar",
      description: sign.man.summary,
      href: `/burclar/${genderPageSlug(sign, "erkek")}`,
    },
  ]);

  return [...blogs, ...dreams, ...cards, ...rituals, ...works, ...mind, ...burclar];
}

let cache: SearchHit[] | null = null;

export function allSearchHits() {
  if (!cache) cache = [...STATIC_HITS, ...extraHits()];
  return cache;
}

export function searchGoldKozmos(query: string, limit = 12): SearchHit[] {
  const needle = foldTurkish(query);
  if (needle.length < 2) return [];

  return allSearchHits()
    .map((hit) => ({
      hit,
      score: scoreDreamQuery(query, [hit.title, hit.type, hit.description]),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.hit);
}
