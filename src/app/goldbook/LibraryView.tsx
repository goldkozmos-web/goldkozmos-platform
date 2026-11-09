import Image from "next/image";
import Link from "next/link";
import { goldbookPreviews } from "../../data/goldbookPreviews";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import ContinueGlance from "../../components/platform/ContinueGlance";
import "../../styles/goldbook-library.css";

type Book = { number: string; category: string; title: string; description: string; image: string; price: string; shopier: string; focus: string[]; info: string[] };

const audiences: Record<string, string> = {
  "01": "Kendi ihtiyaçlarını tanımak, sınırları üzerine düşünmek ve iç dünyasını keşfetmek isteyenler için.",
  "02": "İlişkilerinde tekrar eden seçimleri fark etmek ve flörtte kendi ihtiyaçlarını daha iyi anlamak isteyenler için.",
  "03": "Başkalarının onayını bekleme ve herkesi memnun etme alışkanlığını sorgulamak; hayır demek üzerine düşünmek isteyenler için.",
};

export default function GoldBookLibrary({ books }: { books: Book[] }) {
  return (
    <main className="homeV3Page goldbookLibraryPage" id="top">
      <HomeNavbar />
      <section className="goldbookLibraryHero">
        <div className="goldbookLibraryHeroArt" aria-hidden="true"><Image src="/images/platform/goldbook-premium.webp" alt="" fill sizes="(max-width: 700px) 100vw, 55vw" priority /></div>
        <div className="goldbookLibraryContainer goldbookLibraryHeroContent">
          <p className="goldbookLibraryEyebrow">GOLDBOOK · ÖZGE BATIGÜN</p>
          <h1>Okudukça kendine <span>biraz daha yaklaş.</span></h1>
          <p>Kendilik, ilişkiler ve içsel dönüşüm üzerine. Kendi zamanında okuyabileceğin, kendine dönmen için hazırlanmış dijital kitaplar.</p>
          <a className="goldbookLibraryExplore" href="#kitaplar">Koleksiyonu keşfet <span aria-hidden="true">↓</span></a>
          <div className="goldbookLibraryHeroMeta"><span>{books.length} GoldBook</span><i aria-hidden="true" /><span>Dijital kitap koleksiyonu</span></div>
        </div>
      </section>
      <div className="goldbookLibraryContainer"><ContinueGlance platformId="goldbook" variant="page" /></div>
      <section className="goldbookLibraryCollection goldbookLibraryContainer" id="kitaplar" aria-labelledby="goldbook-collection-title">
        <header className="goldbookLibraryCollectionHeader"><div><p className="goldbookLibraryEyebrow">KENDİNE AYIRDIĞIN SAYFALAR</p><h2 id="goldbook-collection-title">Bir kitap, <span>yeni bir bakış.</span></h2></div><p>İhtiyacına yakın olan alanı seç.</p></header>
        <p className="goldbookMobileSwipeHint">Kitapları keşfetmek için yana kaydır ↔</p>
        <div className="goldbookLibraryGrid" role="region" aria-label="GoldBook kitapları, mobilde yana kaydırılabilir" tabIndex={0}>
          {books.map((book) => <article className="goldbookLibraryCard" key={book.title}>
            <div className={`goldbookLibraryStage goldbookLibraryStage--${book.number}`}>
              <span className="goldbookLibraryEdition">GOLDKOZMOS · DİJİTAL KOLEKSİYON</span>
              <div className="goldbookLibraryCover"><Image src={book.image} alt={book.title} width={440} height={440} sizes="(max-width: 700px) 240px, 280px" /></div>
              <span className="goldbookLibrarySignature">Özge Batıgün</span>
            </div>
            <div className="goldbookLibraryCardContent">
              <p className="goldbookLibraryEyebrow">{book.category}</p>
              <h3>{book.title}</h3>
              <p className="goldbookLibraryDescription">{book.description}</p>
              <section className="goldbookAudience"><h4>Kimler için uygun?</h4><p>{audiences[book.number]}</p></section>
              <div className="goldbookLibraryFacts"><span>{book.info[0]}</span><span>Dijital kitap</span></div>
              <div className="goldbookLibraryDetails">
                <details open><summary>İçinde neler var?<span aria-hidden="true">+</span></summary><ul>{(goldbookPreviews.find(item => item.number === book.number)?.practices ?? book.focus).map(item=><li key={item}>{item}</li>)}</ul></details>
                <details><summary>Kitap bilgileri<span aria-hidden="true">+</span></summary><ul>{book.info.map(item=><li key={item}>{item}</li>)}</ul></details>
              </div>
              <Link className="goldbookPreviewLink" href={`/goldbook/onizleme/${goldbookPreviews.find(item => item.number === book.number)?.slug}`}><span><strong>Kitabın içinden oku</strong><small>4 gerçek sayfayla tanış</small></span><span aria-hidden="true">↗</span></Link>
              <div className="goldbookDelivery"><span aria-hidden="true">✧</span><p><strong>PDF · Otomatik teslimat</strong>Ödeme sonrası kitabın otomatik e-posta / indirme bağlantısıyla sana ulaşır. Basılı ürün gönderilmez. Satın alma işlemi Shopier üzerinden tamamlanır.</p></div>
              <div className="goldbookLibraryPurchase"><div><small>GoldBook</small><strong>{book.price}</strong></div><a href={book.shopier} target="_blank" rel="noopener noreferrer" aria-label={`${book.title} — ${book.price}, Shopier’den satın al`}>Satın al <span aria-hidden="true">↗</span></a></div>
              <p className="goldbookPurchaseNote">Shopier ödeme sayfası yeni sekmede açılır.</p>
            </div>
          </article>)}
        </div>
        <p className="goldbookLibraryNote">Yeni GoldBook’lar yayımlandıkça koleksiyona eklenecek.</p>
      </section>
      <FooterSection />
    </main>
  );
}
