import Link from "next/link";

const audioAreas = [
  {
    number: "01",
    title: "Dişil ve Eril Enerji Dengesi",
    description:
      "Alma, verme, harekete geçme, güvenme, üretme ve akışta kalma hâlleri arasındaki dengeyi gözlemlemeye odaklanan yönlendirmeli ses çalışmasıdır.",
    topics: [
      "Alma ve verme dengesi",
      "Harekete geçme alanı",
      "Güven ve akış",
      "İçsel denge",
    ],
  },
  {
    number: "02",
    title: "Özdeğer ve İçsel Güç",
    description:
      "Başkalarının onayına duyulan ihtiyacı, kendini geri plana atma alışkanlığını ve kişisel değer algısını fark etmeyi destekler.",
    topics: [
      "Özdeğer farkındalığı",
      "Onaylanma ihtiyacı",
      "Kişisel sınırlar",
      "Kendini seçme",
    ],
  },
  {
    number: "03",
    title: "Aşk ve Kalp Alanı",
    description:
      "Geçmiş ilişkilerden taşınan duyguları gözlemlemeye ve sevgi alanına daha dengeli bir yerden yaklaşmaya yönelik çalışmaları kapsar.",
    topics: [
      "Geçmiş ilişki etkileri",
      "Kalp alanı",
      "Sevgiye açılma",
      "Yeni ilişki niyeti",
    ],
  },
  {
    number: "04",
    title: "Para ve Refah Bilinci",
    description:
      "Para, üretim, alma, hak etme ve kişisel değer arasındaki ilişkiyi gözlemlemeyi destekleyen yönlendirmeli kayıtları içerir.",
    topics: [
      "Hak etme bilinci",
      "Para ve özdeğer",
      "Alma alanı",
      "Refah niyeti",
    ],
  },
  {
    number: "05",
    title: "Enerji ve İçsel Denge",
    description:
      "Günlük yaşamın yoğunluğu içinde kişinin dikkatini yeniden kendisine yöneltmesine ve içsel merkezini fark etmesine alan açar.",
    topics: [
      "Enerji alanı farkındalığı",
      "Çakra odaklanması",
      "Zihinsel sakinleşme",
      "İçsel merkez",
    ],
  },
];

const suitableFor = [
  "Çalışmaları kendi zamanında uygulamak isteyenler",
  "Canlı grup programına katılma imkânı olmayanlar",
  "Günlük yaşamında kısa bir içsel alan oluşturmak isteyenler",
  "Belirli bir konuyu düzenli olarak gözlemlemek isteyenler",
  "Meditasyon ve yönlendirmeli ses kayıtlarıyla çalışmayı sevenler",
  "Daha önce katıldığı çalışmaları desteklemek isteyenler",
  "Kendi hızında ilerlemeyi tercih edenler",
];

const usageSteps = [
  {
    title: "Kendine uygun kaydı seç",
    description:
      "O dönem üzerinde çalışmak istediğin aşk, ilişki, para, özdeğer veya enerji alanına uygun ses kaydını belirle.",
  },
  {
    title: "Sessiz bir alan hazırla",
    description:
      "Rahatsız edilmeyeceğin, rahat oturabileceğin veya uzanabileceğin sakin bir ortam oluştur.",
  },
  {
    title: "Kaydı dikkatle dinle",
    description:
      "Kaydı araç kullanırken veya yoğun dikkat gerektiren bir iş yaparken değil, yalnızca güvenli ve sakin bir ortamda dinle.",
  },
  {
    title: "Sonrasında kendini gözlemle",
    description:
      "Çalışma bittikten sonra ortaya çıkan düşünceleri, duyguları ve farkındalıkları kısa notlarla takip et.",
  },
];

const preparationItems = [
  "Rahatsız edilmeyeceğin sessiz bir ortam",
  "Rahat bir oturma veya uzanma alanı",
  "Kulaklık veya uygun bir ses sistemi",
  "Yanında su",
  "Not almak için defter ve kalem",
  "Kayıt sonrasında kısa bir dinlenme süresi",
];

export default function AudioWorkDetailSection() {
  return (
    <section
      className="serviceDetailSection"
      id="ses-kayitlari"
    >
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              DİJİTAL SES ÇALIŞMALARI
            </p>

            <h2>
              Kendi zamanını seç,
              <span> içsel alanına kulak ver.</span>
            </h2>
          </div>

          <div className="serviceDetailLead">
            <p>
              Goldkozmos® Enerji Ekolü dijital ses çalışmaları; aşk,
              ilişki, para, özdeğer ve enerji alanlarında kişinin kendi
              zamanında uygulayabileceği yönlendirmeli kayıtlardan oluşur.
            </p>

            <p>
              Her kayıt farklı bir konuya odaklanır. Çalışmalar günlük yaşamın
              içinde kendine alan açmanı, duygularını gözlemlemeni ve belirli
              bir niyet üzerinde düzenli olarak çalışmanı destekler.
            </p>
          </div>
        </div>

        <div className="serviceDetailInfoBar">
          <div>
            <span>FORMAT</span>
            <strong>Dijital Ses Kaydı</strong>
          </div>

          <div>
            <span>TESLİM</span>
            <strong>Çevrim İçi Gönderim</strong>
          </div>

          <div>
            <span>KULLANIM</span>
            <strong>Kişisel ve Bireysel</strong>
          </div>

          <div>
            <span>UYGULAMA</span>
            <strong>Kendi Zamanında</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              SES ÇALIŞMALARI KİMLER İÇİN?
            </p>

            <h2>
              Bazen ihtiyacın daha fazla bilgi değil,
              <span> kendini duyabileceğin bir sessizliktir.</span>
            </h2>

            <p>
              Günlük hayatın temposu içinde kişinin kendi duygularını ve
              ihtiyaçlarını fark etmesi zorlaşabilir. Yönlendirmeli ses
              çalışmaları, dikkati bir süreliğine dış dünyadan içsel alana
              çevirmeye yardımcı olur.
            </p>

            <p>
              Bu kayıtlar canlı bir seansın veya grup çalışmasının aynısı
              değildir. Kendi başına ve kendi hızında ilerlemek isteyenler
              için destekleyici bir çalışma alanı sunar.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Kendini duymak için hayatın tamamen susması gerekmez;
                bazen yalnızca dikkatini kendine çevirmen yeterlidir.
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
              Ses Kayıtları Hakkında Bilgi Al
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            SES ÇALIŞMASI ALANLARI
          </p>

          <h2>
            Her kayıt,
            <span> başka bir içsel alana odaklanır.</span>
          </h2>

          <p>
            İçerikler farklı dönemlerde yaşanan ihtiyaçlara göre seçilebilir.
            Aynı kayıt, düzenli aralıklarla yeniden uygulanabilir.
          </p>
        </div>

        <div className="serviceDetailProgramGrid">
          {audioAreas.map((area) => (
            <article
              className="serviceDetailProgramCard"
              key={area.number}
            >
              <div className="serviceDetailProgramCardTop">
                <span>{area.number}</span>
                <span aria-hidden="true">✦</span>
              </div>

              <h3>{area.title}</h3>

              <p>{area.description}</p>

              <ul>
                {area.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="serviceDetailGifts">
          <div className="serviceDetailGiftsIntro">
            <p className="serviceDetailLabel">
              NASIL UYGULANIR?
            </p>

            <h2>
              Kaydı açmadan önce
              <span> kendine gerçek bir alan hazırla.</span>
            </h2>

            <p>
              Çalışmadan alınan deneyim yalnızca kaydın içeriğine değil,
              dinleme sırasında oluşturduğun ortama ve verdiğin dikkate de
              bağlıdır.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            {usageSteps.map((step, index) => (
              <article
                className="serviceDetailGiftCard"
                key={step.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              DİNLEME ÖNCESİ HAZIRLIK
            </p>

            <h2>
              Birkaç küçük hazırlık,
              <span> deneyimin niteliğini değiştirebilir.</span>
            </h2>

            <p>
              Ses kaydını dinlerken bölünmeyeceğin ve kendini güvende
              hissedeceğin bir ortam seçmen önerilir.
            </p>

            <p>
              Yoğun duygular oluşması hâlinde çalışmayı durdurabilir,
              dikkatini nefesine ve bulunduğun ortama yöneltebilirsin.
            </p>
          </div>

          <aside className="serviceDetailListCard">
            <p>HAZIRLIK LİSTESİ</p>

            <h3>Kaydı açmadan önce bunları hazırla.</h3>

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
              Ses çalışmaları,
              <span> profesyonel sağlık desteğinin yerine geçmez.</span>
            </h2>
          </div>

          <div>
            <p>
              Dijital ses kayıtları kişisel farkındalık ve içsel denge
              süreçlerini desteklemek amacıyla sunulur. Psikoterapi, tıbbi
              teşhis, tedavi veya psikolojik danışmanlık değildir.
            </p>

            <p>
              Kayıtlar araç kullanırken, makine kullanırken veya yüksek dikkat
              gerektiren bir faaliyet sırasında dinlenmemelidir. Her kişinin
              çalışma deneyimi kendine özgüdür.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          <Link href="/randevu">
            Ses Kaydı İçin Bilgi Al
            <span aria-hidden="true">→</span>
          </Link>

          <Link href="/calismalar">
            Tüm Çalışmalara Dön
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}