import Link from "next/link";

const sessionSteps = [
  {
    number: "01",
    title: "İhtiyacını netleştir",
    description:
      "Seans öncesinde üzerinde çalışmak istediğin alanı, yaşadığın tekrarları ve süreçten beklentini birlikte belirleriz.",
  },
  {
    number: "02",
    title: "Sürecin temelini incele",
    description:
      "Yaşadığın konuyu yalnızca görünen olay üzerinden değil; duygu, düşünce, davranış ve ilişki örüntüleriyle birlikte ele alırız.",
  },
  {
    number: "03",
    title: "Sana uygun çalışmayı uygula",
    description:
      "Seansın içeriği ihtiyacına göre enerji alanı, özdeğer, ilişki, para, sınırlar veya geçmiş bağlar üzerine şekillenebilir.",
  },
  {
    number: "04",
    title: "Farkındalığını günlük hayata taşı",
    description:
      "Seans sırasında fark edilen noktaları günlük yaşamında nasıl gözlemleyebileceğin ve süreci nasıl destekleyebileceğin üzerine konuşuruz.",
  },
];

const suitableFor = [
  "Grup ortamı yerine kişisel bir alan tercih edenler",
  "Belirli bir konuya daha derinlemesine odaklanmak isteyenler",
  "Aşk, ilişki veya para alanında tekrar eden döngüler yaşayanlar",
  "Özdeğer ve sınır sorunlarını daha yakından incelemek isteyenler",
  "Duygusal olarak kendini dağınık veya sıkışmış hissedenler",
  "Kendi ihtiyaçlarına göre şekillenen bir süreç isteyenler",
  "Düzenli aralıklarla ilerlemek isteyenler",
];

const sessionAreas = [
  {
    title: "Aşk ve Yeni İlişki",
    description:
      "Geçmiş ilişkilerden kalan etkileri, güven sorunlarını ve yeni bir bağa hazırlanma sürecini gözlemlemeye odaklanır.",
  },
  {
    title: "Mevcut İlişki",
    description:
      "İletişim, kırgınlık, sınırlar, güven ve ilişki içinde tekrar eden davranışları daha yakından incelemeye alan açar.",
  },
  {
    title: "Para ve Özdeğer",
    description:
      "Ücret isteme, alma, üretme, hak etme ve para tutma alanındaki içsel kalıpları fark etmeyi destekler.",
  },
  {
    title: "Enerji ve İçsel Denge",
    description:
      "Duygusal sınırlar, enerji alanı, çakralar, dişil-eril denge ve yaşam alanına ilişkin farkındalık çalışmalarını kapsayabilir.",
  },
];

const preparationItems = [
  "Sessiz ve yalnız kalabileceğin bir ortam hazırla",
  "İnternet bağlantını, kamera ve mikrofonunu kontrol et",
  "Seans sırasında rahatsız edilmeyeceğin bir zaman seç",
  "Rahat kıyafetler tercih et",
  "Yanında su ve not almak için defter bulundur",
  "Seans sonrasında kendine dinlenebileceğin bir alan bırak",
];

export default function OneToOneDetailSection() {
  return (
    <section
      className="serviceDetailSection"
      id="birebir-seanslar"
    >
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              BİREBİR SEANSLAR
            </p>

            <h2>
              Sürecin sana özel,
              <span> çalışma alanın da sana ait.</span>
            </h2>
          </div>

          <div className="serviceDetailLead">
            <p>
              Birebir seanslar, yaşadığın belirli bir konuya daha kişisel ve
              derinlemesine odaklanmak için oluşturulan çevrim içi
              çalışmalardır.
            </p>

            <p>
              Her seans aynı içerikte ilerlemez. Çalışmanın odağı, o dönem
              yaşadığın ihtiyaçlara ve fark etmek istediğin alana göre
              şekillenir.
            </p>
          </div>
        </div>

        <div className="serviceDetailInfoBar">
          <div>
            <span>SEANS SÜRESİ</span>
            <strong>60 Dakika</strong>
          </div>

          <div>
            <span>UYGULAMA</span>
            <strong>Çevrim İçi ve Görüntülü</strong>
          </div>

          <div>
            <span>SEANS PLANI</span>
            <strong>Ayda 2 veya 3 Seans</strong>
          </div>

          <div>
            <span>SEANS ARALIĞI</span>
            <strong>Yaklaşık 10–15 Gün</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              BİREBİR SEANS KİMLER İÇİN?
            </p>

            <h2>
              Her şeyi tek başına çözmeye çalışmak
              <span> zorunda değilsin.</span>
            </h2>

            <p>
              Bazen yaşanan konu bellidir fakat nereden başlanacağı net
              değildir. Aynı ilişkinin, korkunun veya davranış biçiminin
              neden tekrar ettiğini anlamak için daha geniş bir bakış
              gerekebilir.
            </p>

            <p>
              Birebir seans, seni hazır bir kalıba yerleştirmek yerine kendi
              hikâyeni, ihtiyaçlarını ve sınırlarını merkeze alan kişisel bir
              çalışma alanı sunar.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Dönüşüm, kendini zorla değiştirmek değil; neden aynı yerde
                kaldığını dürüstçe görebilmektir.
              </p>
            </div>
          </div>

          <aside className="serviceDetailListCard">
            <p>SANA UYGUN OLABİLİR</p>

            <h3>Kendini bu alanlardan birinde görüyor musun?</h3>

            <ul>
              {suitableFor.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✦</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/randevu">
              Randevu ve Bilgi Al
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            SEANS SÜRECİ
          </p>

          <h2>
            Süreç rastgele değil,
            <span> ihtiyacına göre ilerler.</span>
          </h2>

          <p>
            Her seans kişiye özel olsa da çalışma süreci genel olarak dört
            temel aşama üzerinden şekillenir.
          </p>
        </div>

        <div className="serviceDetailGiftGrid">
          {sessionSteps.map((step) => (
            <article
              className="serviceDetailGiftCard"
              key={step.number}
            >
              <span>{step.number}</span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="serviceDetailGifts">
          <div className="serviceDetailGiftsIntro">
            <p className="serviceDetailLabel">
              ÇALIŞILABİLECEK ALANLAR
            </p>

            <h2>
              Tek bir konuya değil,
              <span> hayatındaki bağlantılara bak.</span>
            </h2>

            <p>
              Seansın odağı yaşadığın ihtiyaca göre belirlenir. Birbiriyle
              bağlantılı birden fazla alan aynı süreç içinde ele alınabilir.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            {sessionAreas.map((area, index) => (
              <article
                className="serviceDetailGiftCard"
                key={area.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>

                <h3>{area.title}</h3>

                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              SEANS ÖNCESİ HAZIRLIK
            </p>

            <h2>
              Kendine ayırdığın zamanı
              <span> gerçekten kendine bırak.</span>
            </h2>

            <p>
              Seansın daha rahat ilerleyebilmesi için görüşme öncesinde
              fiziksel ortamını hazırlaman ve sonrasında kendine kısa bir
              dinlenme alanı bırakman önerilir.
            </p>
          </div>

          <aside className="serviceDetailListCard">
            <p>HAZIRLIK LİSTESİ</p>

            <h3>Seans öncesinde bunları tamamla.</h3>

            <ul>
              {preparationItems.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="serviceDetailNotice">
          <div>
            <p className="serviceDetailLabel">
              ÖNEMLİ BİLGİLENDİRME
            </p>

            <h2>
              Bu çalışma,
              <span> terapi veya tıbbi tedavi değildir.</span>
            </h2>
          </div>

          <div>
            <p>
              Birebir seanslar kişisel farkındalık ve içsel denge süreçlerini
              desteklemek amacıyla sunulur. Psikoterapi, psikolojik
              danışmanlık, tıbbi teşhis veya tedavi yerine geçmez.
            </p>

            <p>
              Fiziksel ya da ruhsal sağlık sorunlarında doktor, psikolog,
              psikiyatrist veya ilgili yetkili uzmandan profesyonel destek
              alınmalıdır. Her kişinin seans deneyimi kendine özgüdür.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          <Link href="/randevu">
            Birebir Seans Randevusu
            <span aria-hidden="true">→</span>
          </Link>

          <Link href="/sana-uygun-calismayi-bul">
            Önce Çalışmamı Bul
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}