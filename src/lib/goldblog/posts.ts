import { goldBlogArticles } from "../../data/goldblogArticles";

const GOLD_BLOG_POST_IDS = new Set(
  goldBlogArticles.map((article) => article.slug),
);

export function isGoldBlogPostId(postId: string) {
  return GOLD_BLOG_POST_IDS.has(postId);
}

export function listGoldBlogPostIds() {
  return [...GOLD_BLOG_POST_IDS];
}
