import AppointmentJourney from "../../components/energy/AppointmentJourney";
import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import ConsultationChoices from "../../components/energy/ConsultationChoices";
import { consultationWhatsapp } from "../../data/consultationOptions";
import { pageMetadata, jsonLd } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/energy-discovery.css";

export const metadata = pageMetadata("/kisisel-gelisim", "Online Birebir Kişisel Gelişim Desteği — Özge Batıgün", "Konuşma, kişisel gelişim desteği ve enerji çalışmasını bir araya getiren online birebir görüşmeler. Tek görüşme ve paketlerin süre, içerik ve ücretlerini karşılaştır.", "/images/services/ozge-batigun-hakkimda.webp");
const faqs = [
  ["Birebir kişisel gelişim görüşmesinde ne konuşabilirim?", "Seni yoran ilişkileri, sınır koymakta zorlandığın durumları, özgüvenini, kararsızlıklarını veya kimseyle paylaşamadıklarını anlatabilirsin. Konunu önceden kusursuz biçimde toparlaman gerekmez."],
  ["Görüşme nasıl ilerler?", "Önce sen anlatırsın, ben seni dinlerim. Yaşadıklarını ve ihtiyaçlarını birlikte ele alırız. Tavsiye, motivasyon ve konuna uygun uygulamalarla kendi yönünü belirlemene eşlik ederim. Ardından anlattıkların doğrultusunda enerji çalışması yaparım."],
  ["Benim yerime karar verilir mi?", "Hayır. Amaç senin yerine karar vermek değil; seçeneklerini, ihtiyaçlarını ve sınırlarını daha net görebilmene destek olmaktır. Seçimlerin ve günlük hayatta atacağın adımlar sana aittir."],
  ["Tek görüşme mi, paket mi seçmeliyim?", "Belirli bir konuya ilk kez alan açmak için tek görüşmeyi inceleyebilirsin. Konunu art arda günlerde ele almak istiyorsan beş günlük yoğun çalışma; görüşmeler arasında uygulamaya zaman ayırmak istiyorsan dört haftalık paket uygun bir seçenek olabilir."],
  ["Bu çalışma terapi midir?", "Hayır. Kişisel gelişim ve spiritüel farkındalık çalışmasıdır; psikoterapi, tıbbi değerlendirme veya tedavi hizmeti değildir. Sağlıkla ilgili ihtiyaçların için ilgili uzmandan destek almalısın."],
];
export default function PersonalDevelopmentPage() {
  return <main className="homeV3Page energyDiscovery" id="top"><HomeNavbar />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([
      { "@context": "https://schema.org", "@type": "Service", name: "Online birebir kişisel gelişim desteği", url: "https://goldkozmos.com/kisisel-gelisim", description: "Konuşma, kişisel gelişim desteği ve enerji çalışmasını bir araya getiren birebir görüşmeler.", provider: { "@id": "https://goldkozmos.com/hakkimda#ozge-batigun" }, offers: { "@type": "Offer", price: "2000", priceCurrency: "TRY", url: "https://goldkozmos.com/calismalar/detay/tek-birebir-seans" } },
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question,answer])=>({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://goldkozmos.com/" }, { "@type": "ListItem", position: 2, name: "Birebir kişisel gelişim", item: "https://goldkozmos.com/kisisel-gelisim" }] },
    ]) }} />
    <header className="energyDiscoveryHero"><div className="energyDiscoveryHeroArt"><Image src="/images/page-heroes/kozmik-enerji.webp" alt="" fill priority sizes="100vw" /></div><div className="energyDiscoveryInner"><p className="energyDiscoveryEyebrow">ÖZGE BATIGÜN · ONLINE BİREBİR</p><h1>Kişisel gelişim desteği.<br /><span>Önce seni dinleyelim.</span></h1><p>İçine attıklarını, seni yoran ilişkileri ve kimseyle konuşamadıklarını anlat. Konuşma, kendi yönünü belirleme ve enerji çalışmasını bir araya getiren bir görüşmede kendine alan aç.</p><div className="energyDiscoveryActions"><a href={consultationWhatsapp("birebir kişisel gelişim görüşmesi")}>WhatsApp’tan randevu al ↗</a><Link href="#gorusme-secenekleri">Süre ve ücretleri incele ↓</Link></div></div></header>
    <div className="energyDiscoveryInner energyDiscoveryBody"><section className="energyDiscoverySection"><p className="energyDiscoveryEyebrow">ANLAT · FARK ET · RAHATLA</p><h2>Kendi kararlarına yer açan bir çalışma.</h2><p>Bir ilişkide sürekli kendini geri plana atıyor, bir konuda karar vermekte zorlanıyor veya neye ihtiyacın olduğunu anlamak istiyor olabilirsin. Burada güçlü görünmek ya da konuşacaklarını önceden hazırlamak zorunda değilsin.</p><p>Önce yaşadıklarını dinlerim. Sonra seni neyin zorladığını birlikte anlamaya çalışır; tavsiye, motivasyon ve konuna uygun günlük uygulamalarla kendi yolunu kurmana eşlik ederim. Görüşmenin sonunda ele aldığımız konulara yönelik enerji çalışması yapar, ruhsal olarak arınmana destek olmayı amaçlarım.</p><Link href="/hakkimda">Özge Batıgün’ü ve çalışma yaklaşımını tanı →</Link></section>
    <ConsultationChoices />
    <AppointmentJourney />
    <section className="energyDiscoverySection energyDiscoveryFaq"><h2>İlk görüşmeden önce merak ettiklerin</h2>{faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    <section className="energyDiscoverySection"><h2>Karar vermeden önce oku</h2><div className="energyDiscoveryRelated"><Link href="/goldblog/birebir-kisisel-gelisim-calismasi">Birebir kişisel gelişim görüşmesinin içeriği</Link><Link href="/goldblog/tek-gorusme-mi-calisma-paketi-mi">Tek görüşme mi, çalışma paketi mi?</Link><Link href="/kozmik-enerji">Kozmik enerji yaklaşımı</Link></div><p>Çalışmalar kişisel gelişim ve spiritüel farkındalık içindir; psikolojik veya tıbbi danışmanlık yerine geçmez.</p></section></div><FooterSection /></main>;
}
