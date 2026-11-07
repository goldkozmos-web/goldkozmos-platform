import type { Metadata } from "next";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import { energyWorks } from "../../data/energyWorks";
import "../../styles/home.css";
import "../../styles/calismalar-only.css";

export const metadata: Metadata = {
  title: { absolute: "Çalışmalar | GoldKozmos" },
  description:
    "GoldKozmos'ta Enerji Rezonansı, Kendilik Rezonansı, Aşk Rezonansı, İlişki Rezonansı ve Bolluk Rezonansı. Seans içeriklerini, süreleri ve fiyatları inceleyin.",
  alternates: { canonical: "https://goldkozmos.com/calismalar" },
};

type Plan = {
  title: string;
  duration: string;
  price: string;
  text: string;
};

type Area = {
  id: string;
  title: string;
  tag: string;
  image: string;
  intro: string;
  focus: string[];
  plans: Plan[];
};

const individualPlans: Plan[] = [
  {
    title: "Tanışma Seansı",
    duration: "60 dakika",
    price: "1.800 TL",
    text: "Yaklaşık 20 dakika konuşma, kalan sürede konuya özel bireysel enerji çalışması.",
  },
  {
    title: "Birebir Seans",
    duration: "90 dakika",
    price: "2.500 TL",
    text: "Daha kapsamlı görüşme, kişisel gelişim ve yaşam koçluğu desteği, ardından enerji çalışması.",
  },
  {
    title: "5 Seanslık Paket",
    duration: "5 × 90 dakika",
    price: "7.500 TL",
    text: "Beş seans, sana uygun günlerde ayrı ayrı planlanır. Art arda yapılma şartı yoktur.",
  },
];

const areas: Area[] = [
  {
    id: "kendilik",
    title: "Kendilik Rezonansı",
    tag: "BİREYSEL · ÖZDEĞER VE ÖZGÜVEN",
    image: "/images/services/kendilik-rezonansi.webp",
    intro:
      "Kendinle kurduğun ilişkiye odaklanan birebir çalışma. Özdeğer, özgüven, kişisel sınırlar, onay ihtiyacı ve kendilik algısında zorlandığın alanları birlikte belirliyoruz.",
    focus: ["Özdeğer ve özgüven", "Onay ihtiyacı ve sınırlar", "Kendilik algısı ve motivasyon"],
    plans: individualPlans,
  },
  {
    id: "ask",
    title: "Aşk Rezonansı",
    tag: "BİREYSEL · GEÇMİŞ İLİŞKİLER",
    image: "/energy/ask-alanini-sifalandir.webp.jpeg",
    intro:
      "Ayrılık sonrası kırgınlıklar, güven sorunları, eski ilişkiyi geride bırakma, tekrar eden ilişki döngüleri ve yeni bir ilişkiye alan açma niyeti üzerine bireysel görüşme ve enerji çalışması.",
    focus: ["Ayrılık ve duygusal kırgınlıklar", "Güven ve eski bağları bırakma", "Tekrarlayan ilişki döngüleri"],
    plans: individualPlans,
  },
  {
    id: "iliski",
    title: "İlişki Rezonansı",
    tag: "ÇİFTLERE ÖZEL · İKİ KİŞİ BİRLİKTE",
    image: "/images/services/iliski-rezonansi.webp",
    intro:
      "Birbirini seven ancak anlaşmakta zorlanan çiftler için ortak çalışma alanı. İletişim, sık tartışmalar, güven, evde huzursuzluk ve sevgiyi gösterme ya da hissetme konularına birlikte odaklanıyoruz. İki partner de seansa katılır.",
    focus: ["İletişim ve birbirini anlama", "Tartışmalar ve alma-verme dengesi", "Sevgi, güven ve ortak niyet"],
    plans: [
      {
        title: "Tanışma Seansı",
        duration: "60 dakika · iki kişi",
        price: "2.500 TL",
        text: "İki partnerle ilk görüşme ve çiftin belirlediği alana yönelik enerji çalışması.",
      },
      {
        title: "Çift Seansı",
        duration: "90 dakika · iki kişi",
        price: "3.500 TL",
        text: "İki tarafın da kendini anlatabildiği kapsamlı görüşme ve ortak enerji çalışması.",
      },
      {
        title: "5 Seanslık Çift Paketi",
        duration: "5 × 90 dakika · iki kişi",
        price: "10.000 TL",
        text: "Beş ortak seans, çiftin uygun olduğu günlere ayrı ayrı planlanır.",
      },
    ],
  },
  {
    id: "bolluk",
    title: "Bolluk Rezonansı",
    tag: "BİREYSEL · PARA VE BEREKET",
    image: "/images/services/bolluk-rezonansi.webp",
    intro:
      "Parayla kurduğun ilişki, hak etme ve bereket algısı, kazanma ve biriktirme konusunda hissettiğin sıkışmalar üzerine enerji odaklı bireysel çalışma.",
    focus: ["Parayla kurduğun ilişki", "Hak etme ve bereket algısı", "Bolluk niyeti ve sınırlayıcı düşünceler"],
    plans: [
      {
        title: "Tanışma Seansı",
        duration: "30 dakika",
        price: "1.000 TL",
        text: "Kısa ön görüşme ve ağırlıklı olarak bolluk alanına yönelik enerji çalışması.",
      },
      {
        title: "Birebir Seans",
        duration: "60 dakika",
        price: "1.800 TL",
        text: "Belirlenen konuya yönelik bireysel bolluk rezonansı çalışması.",
      },
      {
        title: "5 Günlük Yoğun Paket",
        duration: "5 gün üst üste · günde 40 dakika",
        price: "4.500 TL",
        text: "Beş gün art arda, her gün 40 dakika. Bu pakette günler arasında ara verilmez.",
      },
    ],
  },
];

const whatsappNumber = "905054722153";

function bookingHref(area: string, plan: string) {
  const message =
    "Merhaba, GoldKozmos web sitesinden " +
    area +
    " / " +
    plan +
    " için randevu talep etmek istiyorum. Uygun gün ve saatleri öğrenebilir miyim?";
  return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
}

export default function CalismalarPage() {
  return (
    <main className="homeV3Page gkWorksOnly" id="top">
      <HomeNavbar />

      <section className="gkWorksHero" aria-labelledby="gkWorksHeading">
        <div className="gkWorksHeroInner">
          <p className="gkWorksEyebrow">GOLDKOZMOS® · KOZMİK ENERJİ VE REZONANS</p>
          <h1 id="gkWorksHeading">
            İhtiyacına uygun <em>çalışmayı seç.</em>
          </h1>
          <p className="gkWorksHeroLead">
            Beş net çalışma alanı. Her biri için kimlere yönelik olduğunu,
            seans kapsamını, süreyi ve ücreti önceden görebilirsin.
          </p>
          <nav className="gkWorksQuickNav" aria-label="Çalışma alanlarına git">
            <a href="#enerji-rezonansi">Enerji Rezonansı</a>
            {areas.map((area) => (
              <a key={area.id} href={"#" + area.id}>{area.title}</a>
            ))}
          </nav>
        </div>
      </section>

      <div className="gkWorksContainer">
        <section className="gkWorksEnergy" id="enerji-rezonansi" aria-labelledby="gkEnergyHeading">
          <div className="gkWorksEnergyHeader">
            <div>
              <p className="gkWorksEyebrow">01 · ÖNCEKİ DANIŞANLARA ÖZEL</p>
              <h2 id="gkEnergyHeading">Enerji <em>Rezonansı</em></h2>
              <p>
                Bu alan yalnızca daha önce GoldKozmos&apos;tan çalışma almış
                danışanlarım için. Çakra, nazar, karma, mekân enerjisi ve diğer
                konular arasından ihtiyacına uygun olanı seçebilirsin.
              </p>
              <p className="gkWorksEnergyNote">
                Tekil çalışmalar 1.000 TL. Birden fazla çalışmayı birlikte
                planlamak istersen paket kapsamını ve ücretini görüşerek belirliyoruz.
              </p>
            </div>
            <span className="gkWorksEnergyMark" aria-hidden="true">✦</span>
          </div>

          <details className="gkWorksEnergyDetails">
            <summary>Enerji çalışması konularını gör <span aria-hidden="true">↓</span></summary>
            <div className="gkWorksEnergyGrid">
              {energyWorks.map((work) => (
                <article key={work.id} className="gkWorksEnergyItem">
                  <img src={work.imageSrc} alt="" loading="lazy" />
                  <div className="gkWorksEnergyItemText">
                    <h3>{work.title}</h3>
                    <p>{work.shortDescription}</p>
                    <div className="gkWorksEnergyItemFoot">
                      <strong>{work.priceLabel}</strong>
                      <a href={work.shopierUrl} target="_blank" rel="noopener noreferrer">
                        Satın al ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <a
              className="gkWorksEnergyPackageLink"
              href={bookingHref("Enerji Rezonansı", "Paket çalışması")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Birden fazla çalışma için paket talep et →
            </a>
          </details>
        </section>

        <div className="gkWorksSectionIntro">
          <p className="gkWorksEyebrow">02–05 · REZONANS ALANLARI</p>
          <h2>Hangi alanda ilerlemek istiyorsun?</h2>
          <p>
            Her alanda üç seans seçeneği bulunur. Kendilik ve Aşk bireyseldir;
            İlişki Rezonansı iki partnerin birlikte katıldığı bir çalışmadır.
          </p>
        </div>

        <div className="gkWorksAreas">
          {areas.map((area, index) => (
            <section className="gkWorksArea" id={area.id} key={area.id} aria-labelledby={area.id + "-heading"}>
              <div className="gkWorksAreaHero">
                <img src={area.image} alt="" loading="lazy" />
                <div className="gkWorksAreaInfo">
                  <p className="gkWorksEyebrow">
                    {String(index + 2).padStart(2, "0")} · {area.tag}
                  </p>
                  <h2 id={area.id + "-heading"}>{area.title}</h2>
                  <p>{area.intro}</p>
                  <ul className="gkWorksFocus">
                    {area.focus.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <div className="gkWorksPlans">
                {area.plans.map((plan) => (
                  <article className="gkWorksPlan" key={plan.title}>
                    <p className="gkWorksPlanDuration">{plan.duration}</p>
                    <h3>{plan.title}</h3>
                    <p className="gkWorksPlanText">{plan.text}</p>
                    <div className="gkWorksPlanFoot">
                      <strong>{plan.price}</strong>
                      <a
                        href={bookingHref(area.title, plan.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={area.title + " " + plan.title + " için randevu talep et"}
                      >
                        Randevu talep et →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="gkWorksClosing">
          <p className="gkWorksEyebrow">ÇALIŞMA BİLGİLERİ</p>
          <h2>Randevu nasıl ilerler?</h2>
          <p>
            Sana uygun çalışma ve seans seçeneğini belirleyip randevu talebi
            gönderebilirsin. Görüşme tarihi, saat ve katılım bilgileri birlikte
            netleştirilir. Kendilik, Aşk ve İlişki paketlerinin günleri esnektir.
            Bolluk paketinin beş günü ise art arda planlanır.
          </p>
          <p className="gkWorksDisclaimer">
            Bu çalışmalar spiritüel farkındalık ve kişisel gelişim amaçlıdır;
            tıbbi tedavi veya psikoterapi yerine geçmez. İlişki Rezonansı çift
            terapisi değildir. Belirli bir sonuç vaat edilmez.
          </p>
        </section>
      </div>

      <FooterSection />
    </main>
  );
}
