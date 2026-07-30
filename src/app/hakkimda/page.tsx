import Image from "next/image";

import FooterSection from "../../components/FooterSection";
import Navbar from "../../components/Navbar";

import "../../styles/home.css";

const identityFacts = [
  {
    label: "Doğum",
    value: "1997 · İstanbul",
  },
  {
    label: "Kökler",
    value: "Erzincan",
  },
  {
    label: "Yaş",
    value: "29",
  },
  {
    label: "Eğitim",
    value: "Turizm ve Otelcilik",
  },
];

const journeyTimeline = [
  {
    year: "2022",
    title: "İlk Eğitim",
    description:
      "Bioenerji temel seviye eğitimiyle başladım. Bu eğitim, yalnızca yeni bir alan öğrenmek değil; kendi iç dünyamla başka bir dilden ilişki kurmak anlamına geliyordu.",
  },
  {
    year: "2022–2023",
    title: "Eğitimlerin Devamı",
    description:
      "Bir eğitimle yetinmedim. Enerji, tarot, numeroloji ve farklı spiritüel çalışma alanlarında eğitimlerimin üzerine yenilerini ekledim.",
  },
  {
    year: "2023",
    title: "Rehberlik Yolculuğu",
    description:
      "Önce yakın çevreme, ardından danışanlarıma rehberlik etmeye başladım. Eğitim alırken aynı zamanda öğrendiklerimi uyguladım ve deneyimimi büyüttüm.",
  },
  {
    year: "BUGÜN",
    title: "Yaklaşık 450 Kişilik Deneyim",
    description:
      "Bugüne kadar yaklaşık 450 kişiye çalışmalarım, analizlerim ve danışmanlık süreçlerimle eşlik ettim. Her hikâye bana insanın dönüşümünün tek bir kalıba sığmadığını yeniden gösterdi.",
  },
];

const approachPillars = [
  {
    number: "01",
    title: "Spiritüel Yaklaşım",
    description:
      "İnsanın yalnızca görünen davranışlarını değil; anlam arayışını, sezgilerini, içsel boşluklarını ve ruhsal ihtiyaçlarını da dikkate alıyorum.",
  },
  {
    number: "02",
    title: "Stoa Felsefesi",
    description:
      "Spiritüelliğin zaman zaman gerçeklikten uzaklaşabildiğini gördüğüm için yaklaşımıma Stoacı bakışı ekledim. Kontrol edebildiğimiz alanı, sorumluluğu ve içsel dayanıklılığı önemsiyorum.",
  },
  {
    number: "03",
    title: "Sosyolojik Bakış",
    description:
      "Sosyolojiye duyduğum ilgi sayesinde insanı yalnızca bireysel geçmişiyle değil; aile, toplum, kültür, ilişkiler ve öğrenilmiş rollerle birlikte değerlendirmeye çalışıyorum.",
  },
  {
    number: "04",
    title: "Goldkozmos® Enerji Sistemi",
    description:
      "Aldığım eğitimleri, kişisel deneyimlerimi ve danışan süreçlerinden öğrendiklerimi tek bir yaklaşımda bir araya getirerek Goldkozmos®’a özgü bir çalışma sistemi oluşturdum.",
  },
];

const values = [
  {
    title: "Hazır cevaplar vermek değil",
    description:
      "Kişinin kendi cevaplarını fark edebileceği güvenli ve düşünsel bir alan açmak.",
  },
  {
    title: "Gerçeklikten kopmak değil",
    description:
      "Spiritüel farkındalığı günlük yaşam, sorumluluk ve bilinçli seçimlerle buluşturmak.",
  },
  {
    title: "Herkesi aynı kalıba sokmak değil",
    description:
      "Her insanın ihtiyacına, hikâyesine ve dönüşüm hızına saygı duymak.",
  },
];

export default function HakkimdaPage() {
  return (
    <main className="aboutPage">
      <Navbar />

      <section className="aboutPageHero">
        <div className="aboutPageHeroInner">
          <div className="aboutPageHeroContent">
            <p className="aboutPageEyebrow">
              GOLDKOZMOS®’UN ARKASINDAKİ İSİM
            </p>

            <h1>
              Ben Özge Batıgün.
              <span> Kendi yolumu ararken Goldkozmos®’u buldum.</span>
            </h1>

            <p className="aboutPageHeroLead">
              İçsel olarak kaybolduğum bir dönemde, yalnızca mesleğimi değil;
              nasıl bir hayat yaşamak istediğimi de sorgulamaya başladım.
            </p>

            <p className="aboutPageHeroDescription">
              Bugün Goldkozmos® Enerji Ekolü çatısı altında enerji çalışmaları,
              tarot, numeroloji, Spiritüel Stoa ve sosyolojik bakışı bir araya
              getirerek insanlara kendi iç dünyalarını daha derinden
              görebilecekleri bir alan sunuyorum.
            </p>

            <div className="aboutPageHeroActions">
              <a href="#ben-kimim" className="aboutPagePrimaryButton">
                Hikâyemi Oku
                <span aria-hidden="true">↓</span>
              </a>

              <a href="/calismalar" className="aboutPageSecondaryButton">
                Çalışmaları İncele
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="aboutPagePortrait">
            <div className="aboutPagePortraitFrame">
              <Image
                src="/images/services/ozge-batigun-hakkimda.webp"
                alt="Özge Batıgün, Goldkozmos® Enerji Ekolü kurucusu"
                fill
                priority
                sizes="(max-width: 900px) 92vw, 560px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />

              <div className="aboutPagePortraitShade" />

              <div className="aboutPageFounderCard">
                <span>KURUCU</span>
                <strong>Özge Batıgün</strong>
                <small>Goldkozmos® Enerji Ekolü</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="personalIdentitySection" id="ben-kimim">
        <div className="personalIdentityContainer">
          <div className="personalIdentityHeading">
            <p className="aboutPageEyebrow">BEN KİMİM?</p>

            <h2>
              İstanbul’da başlayan,
              <span> içsel bir arayışla yön değiştiren bir hikâye.</span>
            </h2>
          </div>

          <div className="personalIdentityGrid">
            <div className="personalIdentityText">
              <p>
                1997 yılında İstanbul’da doğdum. Erzincan kökenliyim ve bugün
                29 yaşındayım. Turizm ve Otelcilik eğitimi aldım. Fakat eğitim
                aldığım ve çalıştığım alan, zamanla bana ait hissettirmemeye
                başladı.
              </p>

              <p>
                Mesleğimden memnun olmadığım, kendimi içeriden kaybolmuş
                hissettiğim bir dönemde hayatım için iki farklı yol gördüm.
                Ya takı üretip satacaktım ya da enerji ve spiritüel çalışmalar
                alanında kendimi eğiterek bambaşka bir yola girecektim.
              </p>

              <p>
                Takı üretmek daha kolay, daha güvenli ve daha tanıdık bir
                seçimdi. Fakat ruhsal rehberlik alanı bana yalnızca bir iş
                değil, gerçek bir şey yaptığımı ve kendi doğama daha uygun bir
                yerde durduğumu hissettirdi.
              </p>
            </div>

            <div className="personalIdentityFacts">
              {identityFacts.map((fact) => (
                <div className="personalIdentityFact" key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="personalStorySection">
        <div className="personalStoryFlow">
          <div className="personalStoryFlowHeading">
            <p className="aboutPageEyebrow">BU ALANI NASIL KEŞFETTİM?</p>

            <h2>
              Önce tarotla başlayan merakım,
              <span> zamanla bir yaşam yönüne dönüştü.</span>
            </h2>

            <p>
              Bu bölüm benim için birbirinden ayrılmış başlıklardan değil,
              birbiriyle devam eden tek bir içsel yolculuktan oluşuyor.
            </p>
          </div>

          <article className="personalStoryArticle">
            <p>
              İçsel olarak kaybolduğum dönemde yaşadıklarımı yalnızca mantıkla
              açıklamak bana yeterli gelmiyordu. O günlerde enerji alanını
              henüz tanımıyordum. İlk ilgimi çeken alan tarot oldu. Tarot,
              benim için yalnızca geleceği merak etmek değil; insanın
              korkularını, beklentilerini ve tekrar eden döngülerini görünür
              kılan sembolik bir dil hâline geldi.
            </p>

            <p>
              Daha manevi ve sezgisel bir anlatım bana yakın geliyordu. Fakat
              bu alana yalnızca inanmak ya da uzaktan hayranlık duymak
              istemedim. Eğitim almadan önce farklı çalışmalara katıldım,
              yöntemleri kendi üzerimde deneyimledim ve bende nasıl bir
              karşılık oluşturduğunu gözlemledim.
            </p>

            <p>
              Kendimde fark ettiğim değişimler arttıkça enerji çalışmaları bana
              adeta sihir gibi gelmeye başlamıştı. Fakat ilgimi büyüten şey
              yalnızca kendi deneyimim değildi. Çalışmaların ardından
              insanlarda gördüğüm farkındalıkları, değişimleri ve kendi
              hayatlarıyla başka bir ilişki kurmaya başlamalarını izledikçe bu
              alana daha güçlü biçimde yöneldim.
            </p>

            <blockquote>
              “Bir şeyin yalnızca etkileyici görünmesi bana yetmedi. Onu
              öğrenmek, deneyimlemek ve hangi sınırlar içinde gerçek bir
              karşılık oluşturduğunu anlamak istedim.”
            </blockquote>

            <p>
              Bu yüzden deneyimin ardından eğitim almaya karar verdim. 2022
              yılında Bioenerji Temel Seviye ile profesyonel eğitim
              yolculuğuma başladım. Bir eğitim aldım ve durmadım.
              Eğitimlerimin üzerine yenilerini ekledim; enerji, tarot,
              numeroloji ve spiritüel çalışmaların farklı katmanlarını
              öğrenmeye devam ettim.
            </p>

            <p>
              Öğrendikçe daha fazla soru sordum. Her yeni eğitim, önceki
              bilgilerimi yeniden değerlendirmeme ve kendi yaklaşımımı
              oluşturmama yardım etti. İnsanların deneyimlerini gördükçe
              ilgim daha da büyüdü; fakat zamanla spiritüelliğin tek başına
              bırakıldığında gerçeklikten uzaklaşabildiğini de fark ettim.
            </p>

            <p>
              Tam bu noktada felsefeye duyduğum ilgiden beslenen Spiritüel
              Stoa yaklaşımını ve uzun süredir okuyucu olarak ilgi duyduğum
              sosyolojik bakışı sistemime dâhil ettim. Amacım, yalnızca manevi
              alanda kalan ya da insanlara hayal satan bir yapı kurmak değildi.
              Hem gerçekliğin içinde kalmayı hem de insanın manevi dünyasını
              göz ardı etmemeyi sağlayan, temeli daha sağlam bir sistem
              oluşturmak istedim.
            </p>

            <p>
              Böylece Goldkozmos® Enerji Ekolü; enerji çalışmalarını,
              sembolik farkındalığı, Stoacı sorumluluk anlayışını ve
              sosyolojinin insana toplumsal bağlam içinde bakma biçimini aynı
              zeminde buluşturan bir yaklaşıma dönüştü. Benim için bu sistem,
              kişiye neye inanması gerektiğini söylemekten çok, kendi
              hayatına daha açık, daha gerçekçi ve daha bilinçli bakabileceği
              bir alan açmak anlamına geliyor.
            </p>
          </article>
        </div>
      </section>

      <section className="aboutTimelineSection">
        <div className="aboutTimelineContainer">
          <div className="aboutTimelineHeading">
            <p className="aboutPageEyebrow">YOLCULUĞUN DÖNÜM NOKTALARI</p>

            <h2>
              Bir meraktan,
              <span> yüzlerce insana eşlik eden bir alana.</span>
            </h2>
          </div>

          <div className="aboutTimelineGrid">
            {journeyTimeline.map((item) => (
              <article className="aboutTimelineCard" key={item.year}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aboutGoldkozmosBirthSection">
        <div className="aboutGoldkozmosBirthContainer">
          <div className="aboutGoldkozmosBirthText">
            <p className="aboutPageEyebrow">GOLDKOZMOS® NASIL DOĞDU?</p>

            <h2>
              “Neden kendi sayfam olmasın?”
              <span> sorusu bir markaya dönüştü.</span>
            </h2>

            <p>
              Eğitimlerime devam ederken öğrendiklerimi yalnızca kendimde
              tutmak istemediğimi fark ettim. Kendi sayfamı kurarak hem
              öğrenmeye devam edebileceğim hem de insanlara rehberlik
              edebileceğim bir alan oluşturmak istedim.
            </p>

            <p>
              Böylece eğitim alırken aynı zamanda danışmanlık vermeye başladım.
              2023 yılından bu yana hem yakın çevreme hem de danışanlarıma
              farklı çalışmalarla destek oldum. Bugüne kadar yaklaşık 450
              kişiye hizmet sundum.
            </p>

            <p>
              Bu süreç bana hiçbir insanın hikâyesinin bir diğerine
              benzemediğini öğretti. Aynı sorun gibi görünen iki deneyimin
              altında bambaşka ihtiyaçlar, korkular, toplumsal etkiler ve
              ilişki örüntüleri bulunabiliyor.
            </p>
          </div>

          <aside className="aboutExperienceCard">
            <span>BUGÜNE KADAR</span>
            <strong>≈ 450</strong>
            <p>
              Danışmanlık, analiz ve enerji çalışmalarıyla eşlik edilen kişi.
            </p>
          </aside>
        </div>
      </section>

      <section className="aboutApproachPageSection">
        <div className="aboutApproachPageContainer">
          <div className="aboutApproachPageHeading">
            <p className="aboutPageEyebrow">
              NEDEN SPİRİTÜEL STOA VE SOSYOLOJİ?
            </p>

            <h2>
              Yalnızca enerji değil,
              <span> insanı bütün katmanlarıyla anlamak.</span>
            </h2>

            <p className="aboutApproachIntro">
              Zamanla spiritüelliğin insana iyi gelirken bazen gerçeklikten
              uzaklaşabildiğini gördüm. Felsefeye duyduğum ilgi sayesinde Stoa
              düşüncesini; sosyolojiye duyduğum güçlü merak sayesinde de
              toplumsal bakışı çalışmalarımın içine kattım.
            </p>
          </div>

          <div className="aboutApproachPageGrid aboutApproachPageGridFour">
            {approachPillars.map((pillar) => (
              <article className="aboutApproachPageCard" key={pillar.number}>
                <span>{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aboutValuesSection">
        <div className="aboutValuesContainer">
          <div className="aboutValuesHeading">
            <p className="aboutPageEyebrow">ÇALIŞMALARIMDA NEYİ ÖNEMSİYORUM?</p>

            <h2>
              Rehberlik,
              <span> kişinin yerine karar vermek değildir.</span>
            </h2>
          </div>

          <div className="aboutValuesGrid">
            {values.map((value, index) => (
              <article className="aboutValueCard" key={value.title}>
                <span>0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aboutManifestoPageSection">
        <div className="aboutManifestoPageInner">
          <p className="aboutPageEyebrow">GOLDKOZMOS® MANİFESTOSU</p>

          <blockquote>
            “İnsan değişmeden hayat değişmez.”
          </blockquote>

          <p>
            Çünkü insan kendini, sınırlarını, seçimlerini ve tekrar eden
            döngülerini görmeden yalnızca dışarıdaki şartları değiştirmeye
            çalışır. Goldkozmos® bu değişimin içeriden başlayabileceği bir alan
            oluşturmak için doğdu.
          </p>

          <span>Kendi Kozmosunu Bul.</span>
        </div>
      </section>

      <section className="aboutPageClosing">
        <div className="aboutPageClosingInner">
          <p className="aboutPageEyebrow">BURADAN SONRA</p>

          <h2>
            Benim yolculuğum bir arayışla başladı.
            <span> Belki seninki de bir soruyla başlayacak.</span>
          </h2>

          <p>
            Grup çalışmaları, birebir seanslar, tarot, numeroloji, ses
            kayıtları ve dijital içerikler farklı ihtiyaçlara eşlik etmek üzere
            hazırlanır. Amaç, sana kim olman gerektiğini söylemek değil; kendi
            iç sesini daha net duyabileceğin bir alan açmaktır.
          </p>

          <div className="aboutPageClosingActions">
            <a href="/sana-uygun-calismayi-bul">
              Sana Uygun Çalışmayı Bul
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="https://wa.me/905054722153"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp&apos;tan Bilgi Al
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}