import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicDetailPage } from "../../../components/seo/TopicHubPage";
import { chakraGuides, getChakraGuide } from "../../../data/chakras";
import { pageMetadata } from "../../../lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return chakraGuides.map((chakra) => ({ slug: chakra.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chakra = getChakraGuide(slug);
  if (!chakra) return {};
  return pageMetadata(
    `/cakralar/${chakra.slug}`,
    `${chakra.name}: Anlamı, Dengesizlik ve Farkındalık Pratiği`,
    `${chakra.name} için ${chakra.focus.toLowerCase()} odağında sembolik farkındalık, günlük sinyaller ve küçük bir pratik rehberi.`,
    "/images/goldblog/yedi-cakra-editorial.webp",
  );
}

export default async function ChakraDetailPage({ params }: Props) {
  const { slug } = await params;
  const chakra = getChakraGuide(slug);
  if (!chakra) notFound();

  const related = chakraGuides
    .filter((item) => item.slug !== chakra.slug)
    .slice(0, 3)
    .map((item) => ({ href: `/cakralar/${item.slug}`, eyebrow: item.sanskrit.toUpperCase(), title: item.name, description: item.summary }));

  return <TopicDetailPage
    url={`https://goldkozmos.com/cakralar/${chakra.slug}`}
    breadcrumb="7 Çakra Rehberi"
    eyebrow={`ÇAKRA REHBERİ · ${chakra.sanskrit.toUpperCase()}`}
    title={chakra.name}
    subtitle={chakra.focus}
    color={chakra.color}
    description={chakra.summary}
    signals={chakra.dailySignals}
    practice={chakra.practice}
    related={related}
  />;
}
