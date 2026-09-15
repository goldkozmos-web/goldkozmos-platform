import Link from "next/link";

import { TAROT_CARE_PATH, tarotCardPath } from "../../lib/tarot/urls";
import { tarotGroupedBySuit } from "../../data/tarot/catalog";

export default function TarotHubIntro() {
  const groups = tarotGroupedBySuit();

  return (
    <>
      <div className="hubSeoIntro tarotArticle">
        <h2>Tarot kartları nedir?</h2>
        <p>
          Tarot kartları, 78 görselin sembolik dilidir. GoldKozmos’ta kart bir
          kehanet makinesi değil, mevcut enerjinin ayna dilidir. Destede Büyük
          Arkana’nın arketip sahneleri ile Küçük Arkana’nın gündelik ritimleri
          yan yana durur. Sözlük sayfası tarot bakımı değildir; her kartın
          kendi canonical adresinde okunur.
        </p>
        <h2>Büyük Arkana ve Küçük Arkana</h2>
        <p>
          Büyük Arkana, yolun eşiklerini taşır: Güneş, Ay, Aziz, Büyücü gibi
          kartlar kimlik ve yön değişiminin dilini kurar. Küçük Arkana dört
          suit üzerinden yürür. Kupalar duygu ve bağ, Kılıçlar zihin ve dil,
          Değnekler irade ve hareket, Tılsımlar emek ve madde alanını okur.
          Aynı niyet, suit değişince başka bir sahneye oturur.
        </p>
        <h2>Aşk, düşünce, duygu, kariyer ve tavsiye</h2>
        <p>
          Kart sayfasında aşk ve ilişkiler, birinin düşüncelerinde, birinin
          duygularında, olası hareket, kariyer ve para, tavsiye ayrı H2
          bölümleridir. Bunlar için ayrı URL üretilmez. Güneş tarot kartı
          anlamı, Güneş kartı aşk veya Güneş tarot ters anlamı aynı sayfanın
          bölümlerinden okunur.
        </p>
        <h2>Ters kart anlamları</h2>
        <p>
          Ters geldiğinde kart yok olmaz; gölge, gecikme, içe çekilme veya
          abartı tonu öne çıkar. Ters anlam, düz anlamın zıttı sloganı değil,
          aynı sembolün sıkışmış halidir. Detay her kartın “Ters Anlamı”
          bölümündedir. Online açılım için{" "}
          <Link href={TAROT_CARE_PATH}>Tarot Bakımı</Link> sayfasına geçebilirsin.
        </p>
      </div>
      {groups.map((group) => (
        <section className="tarotSuitBlock" key={group.suit}>
          <h2>{group.title}</h2>
          <ul className="tarotSuitList">
            {group.cards.map((card) => (
              <li key={card.slug}>
                <Link href={tarotCardPath(card.slug)}>{card.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
