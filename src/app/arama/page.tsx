import Link from "next/link";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import { energyBlogArticles } from "../../data/energyBlogArticles";
import { searchTarot } from "../../data/tarot/catalog";
import { searchDreams } from "../../data/ruya-tabirleri/catalog";
import { foldTurkish } from "../../lib/ruya-tabirleri/search";
import { pageMetadata } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/search-premium.css";

export const metadata = pageMetadata(
  "/arama",
  "GoldKozmos'ta Ara",
  "GoldKozmos kozmik enerji, kişisel gelişim, tarot, burçlar ve rüya rehberlerinde ara.",
);

type SearchResult = { href: string; category: string; title: string; description: string };

const staticResults: SearchResult[] = [
  { href: "/kozmik-enerji", category: "KOZMİK ENERJİ", title: "Kozmik Enerji", description: "Kozmik enerji, enerji çalışmaları ve spiritüel farkındalık rehberi." },
  { href: "/ruhsal-arinma", category: "ENERJİ VE FARKINDALIK", title: "Ruhsal Arınma", description: "Enerji temizliği ve içsel denge üzerine sakin bir başlangıç." },
  { href: "/enerji-temizligi", category: "ENERJİ VE FARKINDALIK", title: "Enerji Temizliği", description: "Kişisel ve mekânsal enerji arınması hakkında rehber." },
  { href: "/cakralar", category: "ÇAKRA REHBERİ", title: "7 Çakra Rehberi", description: "Çakra dengesizliği ve dengeleme üzerine yedi merkezli rehber." },
  { href: "/tarot-kartlari", category: "TAROT", title: "Tarot Kartları", description: "78 kartın sembolik anlamlarını keşfet." },
  { href: "/tarot-bakimi", category: "TAROT", title: "Tarot Bakımı", description: "Ücretsiz açılım ve Tarot Farkındalık Okuması hakkında bilgi." },
  { href: "/burclar", category: "BURÇLAR", title: "Burçlar", description: "Burç özellikleri, ilişkiler ve uyum rehberleri." },
  { href: "/ruya-tabirleri", category: "RÜYA ATLASI", title: "Rüya Tabirleri", description: "Rüyandaki sembolleri ve olası çağrışımlarını incele." },
  { href: "/goldblog", category: "GOLDBLOG", title: "GoldBlog", description: "Kozmik enerji, kişisel gelişim ve farkındalık yazıları." },
];

function resultsFor(query: string): SearchResult[] {
  const needle = foldTurkish(query.trim());
  if (needle.length < 2) return [];
  const results = staticResults.filter((item) => foldTurkish(`${item.title} ${item.description} ${item.category}`).includes(needle));
  const blogResults = energyBlogArticles
    .filter((article) => foldTurkish(`${article.title} ${article.description} ${article.category}`).includes(needle))
    .map((article) => ({ href: `/goldblog/${article.slug}`, category: article.category, title: article.title, description: article.description }));
  const tarotResults = searchTarot(query, 12).map((card) => ({ href: `/tarot-kartlari/${card.slug}`, category: "TAROT KARTI", title: card.h1, description: card.brief }));
  const dreamResults = searchDreams(query, 12).map((dream) => ({ href: `/ruya-tabirleri/${dream.slug}`, category: "RÜYA ATLASI", title: dream.h1, description: dream.summary }));
  return [...results, ...blogResults, ...tarotResults, ...dreamResults].filter((item, index, all) => all.findIndex((candidate) => candidate.href === item.href) === index).slice(0, 36);
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const results = resultsFor(query);

  return (
    <main className="homeV3Page searchPage" id="top">
      <HomeNavbar />
      <section className="searchPremiumHero">
      <div className="searchPageInner">
        <p className="topicHubEyebrow">GOLDKOZMOS · ARAMA</p>
        <h1>Bir kelime.<br /><em>Yeni bir keşif.</em></h1>
        <p className="searchPremiumIntro">Aklındaki sorudan, rüyanda kalan sembole.<br />Sana yakın gelen anlamı bul.</p>
        <div className="searchEditorialPanel">
        <form className="searchPageForm" role="search">
          <label htmlFor="searchPageInput">Sitede ara</label>
          <div>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input id="searchPageInput" name="q" type="search" defaultValue={query} placeholder="Bir konu veya sembol yaz…" />
            <button type="submit">Ara <span aria-hidden="true">↗</span></button>
          </div>
        </form>
        <nav className="searchPremiumSuggestions" aria-label="Arama önerileri"><span>BİR BAŞLANGIÇ SEÇ</span>{['Çakra','Kozmik enerji','Tarot','Rüyada su'].map((term,index)=><Link key={term} href={`/arama?q=${encodeURIComponent(term)}`}><small>{String(index+1).padStart(2,'0')}</small>{term}<span aria-hidden="true">↗</span></Link>)}</nav>
        </div>
      </div>
      </section>
      <div className="searchPageInner searchPremiumContent">
        {query.length >= 2 ? <p className="searchPageStatus">“{query}” için {results.length} sonuç</p> : <p className="searchPageStatus">Bir konu yazarak rehberleri, yazıları ve sembol sayfalarını bul.</p>}
        {query.length >= 2 && results.length ? <div className="searchResults">{results.map((result) => <Link href={result.href} key={result.href}><span>{result.category}</span><h2>{result.title}</h2><p>{result.description}</p><b>İçeriği aç ↗</b></Link>)}</div> : null}
        {query.length >= 2 && !results.length ? <div className="searchEmpty"><h2>Bu ifadeyle eşleşen bir başlık bulamadım.</h2><p>“çakra”, “tarot”, “kozmik enerji” veya “rüyada su” gibi daha kısa bir arama deneyebilirsin.</p></div> : null}
      </div>
      <FooterSection />
    </main>
  );
}
