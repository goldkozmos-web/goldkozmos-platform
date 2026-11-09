import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { goldbookPreviews } from "../../../../data/goldbookPreviews";
import "../../../../styles/goldbook-preview.css";

export const dynamicParams = false;
export function generateStaticParams() { return goldbookPreviews.map(book => ({ slug: book.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const selected = goldbookPreviews.find(item => item.slug === slug);
  return { title: `${selected?.title ?? "GoldBook"} — Önizleme`, robots: { index: false, follow: true } };
}

export default async function BookPreview({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = goldbookPreviews.find(item => item.slug === slug);
  if (!book) notFound();
  return <main className="goldbookPreviewPage">
    <header className="goldbookPreviewBar"><Link href="/goldbook#kitaplar">← GoldBook’a dön</Link><a href={book.shopier} target="_blank" rel="noopener noreferrer">300 TL · Satın al ↗</a></header>
    <div className="goldbookPreviewIntro"><p>GOLDKOZMOS · KİTABIN İÇİNDEN</p><h1>{book.title}</h1><p>Kitabın orijinal PDF’inden seçilmiş 4 sayfa. Sayfayı büyütmek için görsele dokunabilirsin.</p></div>
    <div className="goldbookPreviewPages">{book.pages.map((page, index) => <figure key={page}>
      <figcaption>Önizleme {index + 1} / 4 <span>PDF sayfası {page}</span></figcaption>
      <a href={`/goldbook/previews/${slug}/page-${page}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${book.title}, PDF sayfası ${page} — büyük görseli aç`}><Image src={`/goldbook/previews/${slug}/page-${page}.webp`} alt={`${book.title} kitabından PDF sayfası ${page}`} width={1200} height={1700} sizes="(max-width: 800px) 96vw, 780px" preload={index === 0} /></a>
    </figure>)}</div>
    <footer className="goldbookPreviewEnd"><h2>Okumaya devam etmek ister misin?</h2><p>{book.count} sayfa · PDF · Ödeme sonrası otomatik e-posta / indirme bağlantısıyla teslim.</p><a href={book.shopier} target="_blank" rel="noopener noreferrer">Kitabın tamamını satın al · 300 TL ↗</a><Link href="/goldbook#kitaplar">Diğer GoldBook’ları keşfet</Link></footer>
  </main>;
}
