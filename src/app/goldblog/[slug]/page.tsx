import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import FooterSection from "../../../components/FooterSection";
import GoldBlogComments from "../../../components/GoldBlogComments";
import Navbar from "../../../components/Navbar";
import { goldBlogArticles } from "../../../data/goldblogArticles";
import { blogPostingJsonLd, breadcrumbJsonLd } from "../../../lib/jsonld";
import {
  goldBlogBySlug,
  goldBlogRelatedPaths,
  relatedGoldBlogArticles,
} from "../../../lib/goldblog/posts";
import { AUTHOR_NAME, OG_IMAGE, SITE_NAME, indexFollow } from "../../../lib/seo";
import { SITE_ORIGIN } from "../../../lib/site";
import "../../../styles/home.css";
import "../../../styles/goldblog-post.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return goldBlogArticles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = goldBlogBySlug(slug);
  if (!article) {
    return { robots: { index: false, follow: false } };
  }
  const url = `${SITE_ORIGIN}/goldblog/${article.slug}`;
  return {
    title: { absolute: `${article.title} | ${SITE_NAME}` },
    description: article.description,
    alternates: { canonical: url },
    robots: indexFollow,
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      siteName: SITE_NAME,
      title: article.title,
      description: article.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function GoldBlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = goldBlogBySlug(slug);
  if (!article) notFound();

  const related = relatedGoldBlogArticles(article.slug);
  const tools = goldBlogRelatedPaths(article);
  const path = `/goldblog/${article.slug}`;
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Ana Sayfa", path: "/" },
      { name: "GoldBlog", path: "/goldblog" },
      { name: article.title, path },
    ]),
    blogPostingJsonLd({
      title: article.title,
      description: article.description,
      path,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
    }),
  ];

  return (
    <main className="homePage goldblogPage" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <article className="goldblogPost">
        <nav aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/goldblog">GoldBlog</Link>
          <span>/</span>
          <span>{article.title}</span>
        </nav>
        <p className="goldblogPostEyebrow">{article.category}</p>
        <h1>{article.title}</h1>
        <p className="goldblogPostLead">{article.description}</p>
        <p className="goldblogPostMeta">
          Yazar: {AUTHOR_NAME} · {article.readingTime} okuma
          <br />
          <time dateTime={article.publishedAt}>
            Yayın: {article.publishedAt}
          </time>
          {" · "}
          <time dateTime={article.updatedAt}>
            Güncelleme: {article.updatedAt}
          </time>
        </p>
        <div className="goldblogPostBody">
          {article.content.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        {related.length > 0 ? (
          <>
            <h2>İlgili yazılar</h2>
            <ul className="goldblogPostRelated">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/goldblog/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        <h2>İlgili çalışmalar</h2>
        <ul className="goldblogPostRelated">
          {tools.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <GoldBlogComments postId={article.slug} />
      </article>
      <FooterSection />
    </main>
  );
}
