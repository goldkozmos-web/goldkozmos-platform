import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import { jsonLd } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/about-editorial.css";

const journey = [
  { year: "2022", title: "Öğrenmeye ilk adım", text: "Bioenerji temel seviye eğitimiyle yeni bir öğrenme ve farkındalık sürecine başladım." },
  { year: "2023", title: "Goldkozmos® doğdu", text: "Öğrendiklerimi paylaşabileceğim ve kendi yaklaşımımı geliştirebileceğim alanı kurdum." },
  { year: "BUGÜN", title: "Her hikâyede yeni bir bakış", text: "Yaklaşık 450 kişinin farklı hikâyelerine, ihtiyaçlarına ve kişisel gelişim süreçlerine eşlik ettim." },
];
const certificates = [
  { id: 1, title: "Kozmik Enerji Uzman Uygulayıcı", year: "2023" },
  { id: 5, title: "Spiritüel Danışmanlık", year: "2023" },
  { id: 2, title: "Nefes Koçluğu", year: "2024" },
  { id: 3, title: "Bioprofil · Enerjisel Davranış Uzmanlığı", year: "2024" },
  { id: 4, title: "Numeroloji", year: "2024" },
  { id: 6, title: "Tarot", year: "2023" },
  { id: 7, title: "Sarkaç", year: "2023" },
  { id: 8, title: "İlişki ve Aşk Enerjisi", year: "2024" },
];
const approach = [
  { title: "Önce seni dinlemek", text: "Yaşadıklarını, kimseyle konuşamadıklarını ve seni zorlayan konuları kendi kelimelerinle anlatabilmen için alan açarım." },
  { title: "Birlikte anlamlandırmak", text: "İlişkilerini, sınırlarını ve tekrar eden örüntülerini birlikte ele alırız. Tavsiye, motivasyon ve konuna uygun uygulamalarla kendi kararlarını verebilmene eşlik ederim." },
  { title: "Enerji çalışmasıyla desteklemek", text: "Anlattıklarının ardından, üzerinde durduğumuz konulara yönelik enerji çalışması yaparım. Ruhsal olarak arınmana ve taşıdığını hissettiğin yükleri bırakmana destek olmayı amaçlarım." },
];

export default function HakkimdaPage() {
  return (
    <main className="homeV3Page aboutEditorial" id="top">
      <HomeNavbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([
        { "@context": "https://schema.org", "@type": "AboutPage", "@id": "https://goldkozmos.com/hakkimda#page", url: "https://goldkozmos.com/hakkimda", name: "Özge Batıgün ve Goldkozmos", inLanguage: "tr-TR", mainEntity: { "@id": "https://goldkozmos.com/hakkimda#ozge-batigun" } },
        { "@context": "https://schema.org", "@type": "Person", "@id": "https://goldkozmos.com/hakkimda#ozge-batigun", name: "Özge Batıgün", url: "https://goldkozmos.com/hakkimda", image: "https://goldkozmos.com/images/services/ozge-batigun-hakkimda.webp", jobTitle: "Goldkozmos kurucusu", worksFor: { "@id": "https://goldkozmos.com/#organization" } },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://goldkozmos.com/" }, { "@type": "ListItem", position: 2, name: "Hakkımda", item: "https://goldkozmos.com/hakkimda" }] },
      ]) }} />
      <section className="aboutEditorialHero" aria-labelledby="about-title">
        <div className="aboutEditorialWrap aboutEditorialHeroGrid">
          <div className="aboutEditorialHeroCopy">
            <p className="aboutEditorialEyebrow">ÖZGE BATIGÜN · GOLDKOZMOS® KURUCUSU</p>
            <h1 id="about-title">Ben Özge.<br /><span>Kendi yolumu ararken<br />Goldkozmos doğdu.</span></h1>
            <p className="aboutEditorialLead">İnsanı, yaşadıklarını ve aynı döngülere neden geri döndüğünü anlamaya duyduğum merakla başladım.</p>
            <p>Bugün konuşmayı, kişisel gelişim desteğini ve enerji çalışmalarını bir araya getirerek kendi yolunu bulmak isteyen insanlara eşlik ediyorum.</p>
            <a className="aboutEditorialStoryLink" href="#hikayem">Hikâyemi tanı <span aria-hidden="true">↓</span></a>
          </div>
          <figure className="aboutEditorialPortrait">
            <Image src="/images/services/ozge-batigun-hakkimda.webp" alt="Goldkozmos kurucusu Özge Batıgün" fill priority sizes="(max-width: 760px) 90vw, 480px" />
            <figcaption><span>GOLDKOZMOS® REZONANS EKOLÜ</span><strong>Kendi Kozmosunu Bul.</strong></figcaption>
          </figure>
        </div>
      </section>

      <section className="aboutEditorialStory aboutEditorialWrap" id="hikayem" aria-labelledby="story-title">
        <div><p className="aboutEditorialEyebrow">HİKÂYEM</p><h2 id="story-title">Bir meraktan,<br /><span>paylaşılan bir yolculuğa.</span></h2></div>
        <div className="aboutEditorialProse">
          <p>Turizm ve Otelcilik eğitiminin ardından kendi yönümü yeniden sorguladığım bir dönemde farklı farkındalık yöntemleriyle tanıştım. Öğrendikçe insanı yalnızca yaşadıklarıyla değil; düşünceleri, ilişkileri, seçimleri ve içinde bulunduğu toplumsal yapıyla birlikte değerlendirmenin önemini fark ettim.</p>
          <p>Eğitimlerime devam ederken öğrendiklerimi yalnızca kendimde tutmak istemediğimi anladım. Hem öğrenebileceğim hem de insanlarla paylaşabileceğim bir alan kurma isteği, 2023 yılında Goldkozmos’a dönüştü.</p>
          <p>İnsanlarla çalıştıkça benzer görünen iki deneyimin altında bile farklı ihtiyaçlar, korkular ve öğrenilmiş roller bulunabileceğini gördüm. Bu yüzden her çalışmada önce karşımdaki insanı ve onun hikâyesini dinlemeyi önemsiyorum.</p>
        </div>
      </section>

      <section className="aboutEditorialJourney" aria-label="Yolculuğum">
        <div className="aboutEditorialWrap aboutEditorialTimeline">{journey.map((item) => <article key={item.year}><span>{item.year}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="aboutCertificates" aria-labelledby="certificates-title">
        <div className="aboutEditorialWrap">
          <header><p className="aboutEditorialEyebrow">ÖĞRENME YOLCULUĞUM</p><h2 id="certificates-title">Eğitimlerim ve <span>sertifikalarım.</span></h2><p>Çalışma yaklaşımımı besleyen eğitimlerden belgeler. Yakından incelemek için bir sertifikaya dokunabilirsin.</p></header>
          <div className="aboutCertificatesRail" role="region" aria-label="Sertifika galerisi" tabIndex={0}>
            {certificates.map((certificate) => <a className="aboutCertificate" href={`/images/certificates/certificate-${certificate.id}.webp`} target="_blank" rel="noopener noreferrer" key={certificate.id} aria-label={`${certificate.title} sertifikasını büyük aç (yeni sekme)`}>
              <div className="aboutCertificateImage"><Image src={`/images/certificates/certificate-${certificate.id}.webp`} alt={`Özge Batıgün — ${certificate.title} sertifikası`} fill sizes="(max-width:760px) 80vw, 400px" /></div>
              <div className="aboutCertificateCaption"><small>{certificate.year}</small><h3>{certificate.title}</h3><span>Belgeyi incele <span aria-hidden="true">↗</span></span></div>
            </a>)}
          </div>
          <p className="aboutCertificatesHint">Tüm belgeleri görmek için yana kaydır <span aria-hidden="true">→</span></p>
        </div>
      </section>

      <section className="aboutEditorialMethod aboutEditorialWrap" aria-labelledby="method-title">
        <header><p className="aboutEditorialEyebrow">NASIL ÇALIŞIYORUM?</p><h2 id="method-title">Önce anlatırsın.<br /><span>Birlikte yol açarız.</span></h2><p>Hazır cevaplar sunmak yerine, kendi hayatını daha net görebilmen ve kendi seçimlerini yapabilmen için sana eşlik ederim.</p></header>
        <div className="aboutEditorialSteps">{approach.map((item, index) => <article key={item.title}><span aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
      </section>

      <section className="aboutEditorialPerspective">
        <div className="aboutEditorialWrap"><p className="aboutEditorialEyebrow">YAKLAŞIMIMI BESLEYEN ALANLAR</p><h2>İnsana <span>bir bütün olarak bakmak.</span></h2><div className="aboutEditorialPerspectiveGrid">
          <article><h3>Kendilik</h3><p>Özdeğer, sınırlar, seçimler ve kendinle kurduğun ilişki.</p></article>
          <article><h3>Stoa</h3><p>Kontrol edebildiğin alanı görmek, sorumluluk almak ve içsel dayanıklılık.</p></article>
          <article><h3>Sosyolojik bakış</h3><p>Ailenin, toplumun ve öğrenilmiş rollerin hayatındaki etkisini anlamak.</p></article>
        </div></div>
      </section>

      <section className="aboutEditorialClosing aboutEditorialWrap" aria-labelledby="closing-title">
        <p className="aboutEditorialEyebrow">SENİN YOLCULUĞUN</p><h2 id="closing-title">Kendine ayıracağın alan,<br /><span>bir adımla başlar.</span></h2><p>Konuşmak, kendini anlamak veya enerji çalışmalarını tanımak istiyorsan, ihtiyacına uygun bir başlangıç seçebilirsin.</p>
        <div className="aboutEditorialActions"><Link href="/calismalar">Tüm çalışmalarımı incele <span aria-hidden="true">↗</span></Link><Link href="/sana-uygun-calismayi-bul">Bana uygun çalışmayı bul <span aria-hidden="true">→</span></Link></div>
        <p className="aboutEditorialNote">Goldkozmos® içerikleri kişisel farkındalık ve bireysel gelişim amacıyla hazırlanır; psikolojik veya tıbbi danışmanlık yerine geçmez.</p>
      </section>
      <FooterSection />
    </main>
  );
}
