import AppointmentJourney from "../../components/energy/AppointmentJourney";
import { APPOINTMENT_WHATSAPP_URL } from "../../lib/appointments";
import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import ConsultationChoices from "../../components/energy/ConsultationChoices";
import { getEnergyWorks } from "../../data/energyWorks";
import { pageMetadata, jsonLd } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/energy-discovery.css";
import "../../styles/energy-invitation.css";
import "../../styles/energy-editorial-cards.css";
import "../../styles/cosmic-work-selection.css";
import "../../styles/cosmic-session-sales.css";

export const metadata = pageMetadata("/kozmik-enerji", "Online Kozmik Enerji Seansı — İçerik ve Ücretler", "Kozmik enerji nedir, online seans nasıl ilerler? Özge Batıgün ile 30 ve 90 dakikalık birebir çalışmaların içeriğini, ücretlerini ve randevu adımlarını incele.", "/images/page-heroes/kozmik-enerji.webp");

const questions = [
  ["Kozmik enerji nedir?", "Kozmik enerji, spiritüel yaklaşımlarda insanı evrenin bütünüyle ilişkilendiren yaşam enerjisi anlayışıdır. Bu dilde aura kişinin enerji alanını, çakralar ise enerji merkezlerini anlatır. Çalışmalar; niyet, içsel denge ve kişisel farkındalık temalarına odaklanır. Bunlar spiritüel kavramlardır; fiziksel olarak ölçülen enerjiyle aynı anlamda kullanılmaz."],
  ["Kozmik enerji nasıl uygulanır?", "Önce çalışma konusu ve niyet belirlenir. Rahat bir ortamda dikkat bedene ve iç deneyime yöneltilir. Ekole göre meditasyon, doğal nefesi izleme, görselleştirme veya çakra odaklı uygulamalar kullanılabilir; bazı yöntemlerde bunlar enerji kanalları olarak adlandırılır. Seans sonunda deneyim paylaşılır. Her uygulayıcının yöntemi ve çalışmanın kapsamı farklı olabilir."],
  ["Goldkozmos’ta online enerji seansı nasıl ilerler?", "İlgilendiğin alanı WhatsApp üzerinden birlikte netleştiririz. Online birebir enerji çalışmaları 30 dakikadır. Görüşmede mevcut halin ve niyetin konuşulur; ardından seçtiğin çalışmanın odağına göre dengeleme veya arınma uygulamasıyla ilerlenir. Gün, saat ve katılım ayrıntıları önceden paylaşılır."],
  ["Çakra dengeleme ne anlama gelir?", "Spiritüel geleneklerde çakralar, beden boyunca tanımlanan enerji merkezleridir. Çakra dengeleme çalışması bu merkezlere dikkat yöneltme ve içsel dengeyi gözlemleme amacı taşır. Goldkozmos’ta 7 Çakra Dengeleme, bu temaya odaklanan online birebir bir çalışmadır."],
  ["Enerji çalışmasına nasıl hazırlanmalıyım?", "Bölünmeyeceğin sakin bir alan, rahat bir oturuş ve uygun bir zaman ayır. Çalışmadan önce odaklanmak istediğin konuyu paylaş. Özel bir his yaşamaya çalışmak veya kendini zorlamak gerekmez; katılım koşullarını ve aklına takılanları önceden sorabilirsin."],
  ["Enerji çalışması ücreti nedir?", "30 dakikalık online birebir enerji çalışmaları 1.000 TL’dir. Konuşma ve enerji çalışmasını bir araya getiren 90 dakikalık birebir görüşme 2.000 TL, art arda beş günlük yoğun çalışma 3.600 TL, dört haftalık paket ise 6.000 TL’dir. Kapsamı ve güncel ücretleri çalışmalar sayfasında karşılaştırabilir, randevu ayrıntılarını WhatsApp üzerinden sorabilirsin."],
  ["Nasıl randevu alabilirim?", "Randevu al bağlantısı doğrudan WhatsApp sohbetimizi açar. İlgilendiğin çalışmayı ve uygun olduğun zamanı mesajında belirtebilirsin. Gün ve saat karşılıklı iletişimle netleşir."],
  ["Hangi enerji çalışmasını seçmeliyim?", "Daha önce aldığın çalışmayı desteklemek veya enerji çalışmasını deneyimlemek istiyorsan 30 dakikalık seçenekleri inceleyebilirsin. Yaşadıklarını anlatmak, kişisel gelişim desteği ve ardından enerji çalışması almak istiyorsan 90 dakikalık birebir görüşmeyi tercih edebilirsin. Daha uzun bir süreç için beş günlük yoğun çalışma ve dört haftalık paket seçenekleri bulunur. Kararsızsan WhatsApp üzerinden ihtiyacını paylaşabiliriz."],
  ["Kozmik enerji ve kişisel gelişim arasında nasıl bir bağ var?", "Enerji çalışmalarında niyetini ve dikkatini belirli bir alana yöneltirsin. Kişisel gelişim çalışmalarında ise düşüncelerini, sınırlarını ve tekrar eden örüntülerini daha yakından ele alırsın. Bu iki alan, kendi deneyimini gözlemleme ve günlük yaşamında bilinçli seçimler yapma amacıyla birlikte değerlendirilebilir."],
];

export default function CosmicEnergyPage() {
  const works = getEnergyWorks().slice(0, 3);
  const schema = [
    { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://goldkozmos.com/kozmik-enerji#page", url: "https://goldkozmos.com/kozmik-enerji", name: "Online Kozmik Enerji Seansı — İçerik ve Ücretler", description: "Kozmik enerjinin spiritüel anlamı, çakra odaklı uygulamalar ve Goldkozmos online birebir enerji seansları.", inLanguage: "tr-TR", dateModified: "2026-11-05", about: { "@type": "Service", name: "Online birebir kozmik enerji çalışmaları", serviceType: "Kozmik enerji ve kişisel farkındalık çalışmaları", provider: { "@id": "https://goldkozmos.com/#organization" }, url: "https://goldkozmos.com/calismalar/enerji-calismalari" } },
    { "@context": "https://schema.org", "@type": "FAQPage", "@id": "https://goldkozmos.com/kozmik-enerji#sorular", mainEntity: questions.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://goldkozmos.com/" }, { "@type": "ListItem", position: 2, name: "Kozmik Enerji", item: "https://goldkozmos.com/kozmik-enerji" }] },
  ];
  return <main className="homeV3Page energyDiscovery" id="top">
    <HomeNavbar />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <header className="energyDiscoveryHero">
      <div className="energyDiscoveryHeroArt"><Image src="/images/page-heroes/kozmik-enerji.webp" alt="Altın ışıklarla kozmik gökyüzü" fill priority sizes="100vw" /></div>
      <div className="energyDiscoveryInner">
        <p className="energyDiscoveryEyebrow">ÖZGE BATIGÜN · ONLINE BİREBİR ÇALIŞMALAR</p>
        <h1>Online Kozmik Enerji Seansı.<br /><span>Bugün kendine bir alan ayır.</span></h1>
        <p>Seni yoran konuyu paylaş; ihtiyacına uygun çalışmayı birlikte seçelim. Özge Batıgün ile seçtiğin alana odaklanan enerji çalışması veya konuşma ve enerji uygulamasını birleştiren birebir görüşme.</p>
        <div className="cosmicSessionFacts"><span>30 dk · 1.000 TL</span><span>90 dk · 2.000 TL</span><span>Online · Birebir</span></div>
        <div className="energyDiscoveryActions"><a href={APPOINTMENT_WHATSAPP_URL}>Seans için randevu iste ↗</a><a href="#gorusme-secenekleri">Seansları ve ücretleri karşılaştır ↓</a></div>
        <p className="energyDiscoveryNote">Kararsızsan önce sorabilirsin. Uygun gün ve saat karşılıklı teyitle belirlenir.</p>
      </div>
    </header>
    <div className="energyDiscoveryInner energyDiscoveryBody">
      <section className="cosmicSessionFit" aria-labelledby="cosmic-session-fit-title">
        <div className="cosmicSessionGuide"><Image src="/images/basla/ozge-portre.webp" alt="Özge Batıgün" width={72} height={72}/><div><p>ÖZGE BATIGÜN İLE</p><strong>Önce seni ve ihtiyacını tanıyalım.</strong><Link href="/hakkimda">Eğitimlerimi ve yaklaşımımı incele ↗</Link></div></div>
        <p className="energyDiscoveryEyebrow">BU ALAN SANA GÖRE Mİ?</p><h2 id="cosmic-session-fit-title">Hangi konuya alan açmak istiyorsun?</h2>
        <p>Spiritüel bir çalışma arıyor, kendine zaman ayırmak ve yaşadıklarına farklı bir açıdan bakmak istiyorsan şu konular üzerinden başlayabiliriz.</p>
        <div className="cosmicSessionTopics">{[
          ["Özdeğer ve sınırlar", "Kendini geri plana attığın, onay beklediğin veya hayır demekte zorlandığın alanlara odaklan."],
          ["Aileden gelen kalıplar", "Aile hikâyenle ilişkilendirdiğin tekrarları ve taşıdığını hissettiğin yükleri spiritüel farkındalıkla ele al."],
          ["Aşk ve ilişkiler", "Geçmiş bağlar, yakınlık ve ilişkilerde kendini nasıl konumlandırdığın üzerine bir niyet belirle."],
          ["Bolluk ve para algısı", "Almak, vermek ve kendi emeğine değer biçmekle ilgili inançlarını gözlemle."],
        ].map(([title,text],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="cosmicSessionDecision"><strong>Yalnızca enerji çalışması mı, konuşmak için de zaman mı?</strong><p>Belirli bir alana odaklanmak için 30 dakika; önce anlatmak ve ardından enerji çalışmasıyla ilerlemek için 90 dakikalık görüşmeyi incele. Paketlere geçmeden tek görüşmeyle başlayabilirsin.</p><a href="#gorusme-secenekleri">Sana uygun başlangıcı seç ↓</a></div>
      </section>
      <ConsultationChoices energy />
    <AppointmentJourney />
      <section className="energyDiscoverySection">
        <p className="energyDiscoveryEyebrow">KOZMİK ENERJİYİ ANLAMAK</p><h2>Kozmik enerji nedir?</h2>
        <p>Kozmik enerji, spiritüel öğretilerde insanı evrenin bütünüyle bağlantılı kabul eden bir yaşam enerjisi anlayışıdır. Bu bakışta insan; bedeni, duyguları, düşünceleri ve iç dünyasıyla birlikte ele alınır. Enerji çalışması, kişinin bu alanlara dikkat yöneltmesi ve kendi deneyimiyle daha bilinçli bir ilişki kurması için bir alan sunar.</p>
        <p>Bu anlatımda <strong>aura</strong> kişinin enerji alanını, <strong>çakralar</strong> ise farklı yaşam temalarıyla ilişkilendirilen enerji merkezlerini ifade eder. Bazı kozmik enerji ekollerinde uygulama, “kanal” veya “frekans” olarak adlandırılan spiritüel kavramlar üzerinden açıklanır. Bu terimler öğretinin kendi diline aittir; fiziksel olarak ölçülen enerji veya frekansla aynı anlamda kullanılmaz. Farklı ekollerin yöntemleri ve çalışma biçimleri de birbirinden ayrılabilir.</p>
        <h3>Arınma ve denge ne anlama gelir?</h3>
        <p>Spiritüel enerji çalışmalarında arınma, kişinin üzerinde ağırlık hissettiği deneyimleri ve kendini yoran örüntüleri ele almak için kullanılan bir ifadedir. Denge ise günlük hayatın içinde kendi ihtiyaçlarını duyabilmek, sınırlarını fark etmek ve yaşadıklarına daha bilinçli yaklaşmakla birlikte düşünülebilir. Örneğin bir ilişkide sürekli kendini geri plana attığını fark etmek veya iş hayatında dinlenmeye yer bırakmadığını görmek, bu içsel gözlemin günlük karşılıkları olabilir.</p>
        <p>Goldkozmos’ta enerji çalışmalarını, seçtiğin konuya odaklanabileceğin kişisel ve spiritüel bir deneyim olarak ele alıyoruz. Çalışmanın sana ne ifade ettiğini anlamak için yalnızca seans sırasındaki hislerine değil, sonrasında kendi ihtiyaçların ve seçimlerin hakkında neler fark ettiğine de bakabilirsin.</p>
        <h3>Kozmik enerji seansı nasıl ilerler?</h3>
        <p>Önce çalışmak istediğin alan ve niyetin netleştirilir. İçsel denge, çakra odaklı farkındalık veya arınma gibi başlıklar arasından seçtiğin çalışmanın kapsamı konuşulur. Ardından bölünmeyeceğin sakin bir ortamda uygulayıcının yönlendirmesini takip edersin. Kullanılan yönteme göre dikkatini bedenine yöneltme, doğal nefesini izleme, görselleştirme veya enerji merkezlerine odaklanma gibi uygulamalar yer alabilir.</p>
        <p>Goldkozmos’un online birebir enerji çalışmaları 30 dakika sürer. Gün, saat ve katılım ayrıntıları önceden netleştirilir. Seans boyunca özel bir duygu yaşamaya ya da bir şeyleri başarmaya çalışman gerekmez; rahatsız olduğunda bunu paylaşabilir ve ara isteyebilirsin.</p>
        <h3>Çalışmadan ne beklemelisin?</h3>
        <p>Deneyim kişiden kişiye değişir. Bazı kişiler sakinlik veya kendilerine dönme hissi tarif ederken bazıları belirgin bir değişim hissetmeyebilir. Yoğun bir his yaşamak çalışmanın başarılı olduğunun ölçüsü değildir. Enerji çalışmalarının hastalıkları tedavi ettiği veya yaşam olaylarını kesin olarak değiştirdiği yönünde bir sonuç vaat edilmez; bu alan tıbbi bakımın ya da psikoterapinin yerine geçmez.</p>
        <p>Başlangıç için kendine şu soruyu sorabilirsin: “Şu anda hayatımın hangi alanına daha fazla dikkat ve özen vermek istiyorum?” Yanıtın, ihtiyacına uygun çalışmanın kapsamını incelemek ve beklentilerini görüşme öncesinde paylaşmak için bir başlangıç noktası olabilir.</p>
      </section>
      <section className="energyDiscoverySection" id="enerji-calismalari"><p className="energyDiscoveryEyebrow">30 DAKİKA · ONLINE BİREBİR</p><h2>Kendine uygun çalışmayı keşfet.</h2>
        <p className="energyEditorialScrollHint">Çalışmaları yana kaydırarak keşfet <span aria-hidden="true">⟷</span></p>
        <div className="energyEditorialGrid" role="region" aria-label="Enerji çalışmaları, yana kaydırılabilir kartlar" tabIndex={0}>{works.map((work, index) => <article className="energyEditorialCard" key={work.id}>
          <Link href={`/calismalar/detay/${work.slug}`} className="energyEditorialMedia"><Image src={work.imageSrc} alt="" fill sizes="(max-width:700px) 90vw, 350px" /><span className="energyEditorialBadge">ONLINE · BİREBİR</span><span className="energyEditorialNumber" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div className="energyEditorialTitle"><span>{["İÇSEL DENGE", "YENİ BİR ALAN", "ARINMA & YENİLENME"][index]}</span><h3>{work.title}</h3></div></Link>
          <div className="energyEditorialBody"><p>{work.shortDescription}</p><div className="energyEditorialMeta"><div><span>ÇALIŞMA ÜCRETİ</span><strong>{work.priceLabel}</strong></div><span className="energyEditorialDuration"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7" /><path d="M10 6v4l3 2" /></svg>{work.duration}</span></div><Link className="energyEditorialAction" href={`/calismalar/detay/${work.slug}`}><span>Çalışmayı incele</span><span aria-hidden="true">↗</span></Link></div>
        </article>)}</div>
        <Link href="/calismalar" className="energyAllWorksCard">
          <span className="energyAllWorksSymbol" aria-hidden="true"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="14" /><circle cx="18" cy="18" r="6" /><path d="M18 4v28M4 18h28M8 8l20 20M8 28 28 8" /></svg></span>
          <div><h3>Tüm çalışmalarımı keşfet</h3><span className="energyAllWorksLabel">Çalışma koleksiyonuna git</span></div>
          <span className="energyAllWorksArrow" aria-hidden="true">↗</span>
        </Link>
      </section>
      <section className="energyDiscoverySection energyInvitation" id="birlikte-baslayalim" aria-labelledby="energy-invitation-title">
        <Image className="energyInvitationArt" src="/images/page-heroes/kozmik-enerji.webp" alt="" fill sizes="(max-width:700px) 90vw, 1120px" />
        <span className="energyInvitationOrbit" aria-hidden="true"><span>✦</span></span>
        <div className="energyInvitationInner">
          <div className="energyInvitationIdentity"><div className="energyInvitationPortrait"><Image src="/images/ozge-batigun-home-portrait.webp" alt="Özge Batıgün" width={140} height={140} sizes="70px" /></div><div><p>ÖZGE BATIGÜN</p><span>Goldkozmos’un kurucusu</span></div></div>
          <div className="energyInvitationCopy"><p className="energyInvitationKicker">ONLINE · BİREBİR ÇALIŞMALAR</p><h2 id="energy-invitation-title">Kendi alanına<br /><em>birlikte dönelim.</em></h2><p>Kozmik enerji çalışmaları hakkında konuşalım; ihtiyacına uygun alanı birlikte netleştirelim.</p><Link className="energyInvitationAbout" href="/hakkimda">Yaklaşımımı tanı <span aria-hidden="true">↗</span></Link></div>
          <div className="energyInvitationActions"><a className="energyInvitationPrimary" href={APPOINTMENT_WHATSAPP_URL}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.7a8 8 0 0 1-11.7 7.1L4 20l1.2-4.2A8 8 0 1 1 20 11.7Z" /><path d="M9 8c-.6 1.9 2.1 5.1 4.1 5.7l1.2-1.1 1.5.9c-.2 1.4-1.4 1.7-2.6 1.2-2.7-1.1-4.6-3-5.2-5.3-.3-1 .2-1.7 1-1.8Z" /></svg><span>WhatsApp’tan randevu al</span><span aria-hidden="true">↗</span></a><a className="energyInvitationSecondary" href={`https://wa.me/905054722153?text=${encodeURIComponent("Merhaba, kozmik enerji çalışmaları hakkında bilgi almak istiyorum.")}`}>Önce bilgi almak istiyorum <span aria-hidden="true">→</span></a></div>
        </div>
      </section>
      <section className="energyDiscoverySection energyDiscoveryFaq" id="sorular"><h2>Kozmik enerji hakkında kısa yanıtlar</h2>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<p className="energyDiscoveryNote">Bu çalışmalar kişisel ve spiritüel farkındalık amacı taşır; tıbbi teşhis, tedavi veya psikoterapi yerine geçmez. Deneyimler kişiye göre değişir.</p></section>
      <section className="energyDiscoverySection"><h2>Okuyarak ve keşfederek devam et.</h2><div className="energyDiscoveryRelated"><Link href="/goldblog/kozmik-enerji-nedir">Kozmik enerji nedir?</Link><Link href="/goldblog/cakralar-nedir-yedi-cakra">7 çakra rehberi</Link><Link href="/goldblog/online-enerji-seansina-hazirlik">Seans öncesi hazırlık</Link><Link href="/goldblog/enerji-calismasi-nasil-secilir">Hangi çalışma bana uygun?</Link><Link href="/goldblog/birebir-kisisel-gelisim-calismasi">Birebir kişisel gelişim</Link><Link href="/goldbook">Kişisel gelişim kitapları</Link><Link href="/tarot-kartlari">Tarot kartlarının anlamları</Link><Link href="/ruya-tabirleri">Rüya yorumları</Link><Link href="/burclar">Burçlar rehberi</Link></div></section>
    </div>
    <FooterSection />
  </main>;
}


