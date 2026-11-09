import { goldBlogArticles } from "../data/goldblogArticles";
import { pageMetadata } from "../lib/seo";
import HomePageClient from "./HomePageClient";
import GroupEventsSection from "../components/group-events/GroupEventsSection";

export const metadata = pageMetadata("/", "Kozmik Enerji ve Kişisel Gelişim — Özge Batıgün", "Özge Batıgün ile online enerji çalışmaları, çakra dengeleme ve birebir kişisel gelişim desteğini keşfet. Süre ve ücretleri incele, WhatsApp’tan randevu al.");

export default function HomePage() {
  const featuredArticles = [...goldBlogArticles].sort((a,b)=>{const date=(value:string|undefined)=>value?Date.parse(value)||0:0;return date(b.updatedAt??b.publishedAt)-date(a.updatedAt??a.publishedAt);}).slice(0,3).map(({slug,title,description,image})=>({slug,title,description,image}));
  return <HomePageClient featuredArticles={featuredArticles} upcomingEvents={<GroupEventsSection home />} />;
}
