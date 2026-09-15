import {
  goldBlogArticles,
  type GoldBlogArticle,
} from "../../data/goldblogArticles";

const GOLD_BLOG_POST_IDS = new Set(
  goldBlogArticles.map((article) => article.slug),
);

export function isGoldBlogPostId(postId: string) {
  return GOLD_BLOG_POST_IDS.has(postId);
}

export function listGoldBlogPostIds() {
  return [...GOLD_BLOG_POST_IDS];
}

export function goldBlogBySlug(slug: string) {
  return goldBlogArticles.find((article) => article.slug === slug) ?? null;
}

export function relatedGoldBlogArticles(slug: string, limit = 4) {
  const current = goldBlogBySlug(slug);
  if (!current) return [];
  const rest = goldBlogArticles.filter((article) => article.slug !== slug);
  const same = rest.filter((article) => article.categoryKey === current.categoryKey);
  const other = rest.filter((article) => article.categoryKey !== current.categoryKey);
  return [...same, ...other].slice(0, limit);
}

export function goldBlogRelatedPaths(article: GoldBlogArticle) {
  if (article.categoryKey === "iliski-rezonansi") {
    return [
      { href: "/testler/iliski-oruntusu", label: "İlişki Örüntüsü Testi" },
      { href: "/calismalar/iliski", label: "İlişki Rezonansı" },
    ];
  }
  if (article.categoryKey === "kendilik-rezonansi") {
    return [
      { href: "/arketip-testi", label: "Arketip Testi" },
      { href: "/testler/karakter-analizi", label: "Karakter Analizi Testi" },
    ];
  }
  if (article.categoryKey === "bolluk-rezonansi") {
    return [
      { href: "/calismalar/para", label: "Para ve Bolluk Çalışmaları" },
      { href: "/goldrituel", label: "GoldRitüel" },
    ];
  }
  return [
    { href: "/tarot-kartlari", label: "Tarot Kartları" },
    { href: "/ruya-tabirleri", label: "Rüya Tabirleri" },
  ];
}
