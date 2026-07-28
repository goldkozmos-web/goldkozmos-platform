import Link from "next/link";

const analysisAreas = [
  {
    number: "01",
    title: "Yaşam Yolu Sayısı",
    description:
      "Doğum tarihinden hesaplanan bu sayı, yaşam yolculuğundaki temel eğilimleri, öğrenme alanlarını ve kişisel gelişim temalarını anlamaya yardımcı olur.",
    topics: [
      "Yaşamın ana teması",
      "Temel karakter eğilimleri",
      "Öğrenilmesi gereken dersler",
      "Doğal yetenek alanları",
    ],
  },
  {
    number: "02",
    title: "İfade ve Kader Sayısı",
    description:
      "İsim ve soyisimde bulunan harflerin sayısal karşılıklarından hareketle kişinin kendini ifade etme biçimini ve potansiyel yönlerini inceler.",
    topics: [
      "Kendini ifade etme biçimi",
      "Doğal yetenekler",
      "Dış dünyaya yansıyan yönler",
      "Üretim ve gelişim alanları",
    ],
  },
  {
    number: "03",
    title: "Ruh Arzusu Sayısı",
    description:
      "İsmin sesli harflerinden hesaplanan bu sayı, kişinin içsel ihtiyaçlarını, duygusal motivasyonlarını ve kalpten gelen isteklerini anlamaya yardımcı olur.",
    topics: [
      "İçsel motivasyonlar",
      "Duygusal ihtiyaçlar",
      "Kalpten gelen arzular",
      "Tatmin ve doyum alanları",
    ],
  },
  {
    number: "04",
    title: "Kişilik Sayısı",
    description:
      "İsmin sessiz harflerinden hesaplanarak kişinin çevresi tarafından nasıl algılanabileceğine ve dış dünyaya yansıttığı özelliklere odaklanır.",
    topics: [
      "İlk izlenim",
      "Dış dünyaya yansıyan karakter",
      "Sosyal yaklaşım",
      "İnsanlarla kurulan iletişim",
    ],
  },
  {
    number: "05",
    title: "Kişisel Yıl ve Dönemler",
    description:
      "İçinde bulunulan yılın ve yaşam döneminin ana temasını inceleyerek hangi konuların daha görünür hâle gelebileceğini değerlendirmeye yardımcı olur.",
    topics: [
      "Kişisel yıl sayısı",
      "Dönemin ana teması",
      "Odaklanılabilecek alanlar",
      "Geçiş ve kapanış süreçleri",
    ],
  },
];

const suitableFor = [
  "Kendini ve temel karakter eğilimlerini daha yakından tanımak isteyenler",
  "Yaşamında tekrar eden bazı temaları anlamaya çalışanlar",
  "Yeteneklerini ve güçlü yönlerini keşfetmek isteyenler",
  "İlişkilerdeki ihtiyaçlarını daha net görmek isteyenler",
  "Kariyer veya üretim alanında yön arayanlar",
  "İçinde bulunduğu kişisel yılın temasını merak edenler",
  "Kendi sayı haritasını bütüncül biçimde incelemek isteyenler",
];

const analysisSteps = [
  {
    title: "Bilgilerini paylaş",
    description:
      "Analizin hazırlanabilmesi için doğum tarihin, doğumda verilen adın ve güncel isim bilgilerin alınır.",
  },
  {
    title: "Temel sayılar hesaplanır",
    description:
      "Doğum tarihi ve isim bilgileri kullanılarak numeroloji haritandaki temel sayılar belirlenir.",
  },
  {
    title: "Sayılar birlikte yorumlanır",
    description:
      "Her sayı tek başına değil, diğer sayılarla kurduğu bağlantılar ve oluşturduğu bütünlük içinde değerlendirilir.",
  },
  {
    title: "Kişisel analiz hazırlanır",
    description:
      "Hesaplamalar, açıklamalar ve öne çıkan yaşam temaları kişiye özel dijital analiz hâline getirilir.",
  },
];

const requiredInformation = [
  "Doğumda verilen ad ve soyad",
  "Güncel olarak kullanılan ad ve soyad",
  "Doğum tarihi",
  "Varsa sonradan değişen isim veya soyisim bilgisi",
  "Analizin gönderileceği iletişim bilgisi",
  "Özellikle incelenmesini istediğin yaşam alanı",
];

const focusCards = [
  {
    title: "Kendini Tanıma",
    description:
      "Doğal eğilimlerini, güçlü yönlerini ve seni zorlayabilecek içsel temaları daha yakından incele.",
  },
  {
    title: "Aşk ve İlişkiler",
    description:
      "İlişkilerdeki duygusal ihtiyaçlarını, iletişim biçimini ve bağ kurma eğilimlerini gözlemle.",
  },
  {
    title: "Kariyer ve Üretim",
    description:
      "Yeteneklerini, çalışma biçimini ve kendini daha rahat ortaya koyabileceğin alanları keşfet.",
  },
  {
    title: "Kişisel Dönemler",
    description:
      "İçinde bulunduğun yılın ana temasını ve yaşamında öne çıkabilecek konuları değerlendirmeye alan aç.",
  },
];

export default function NumerologyDetailSection() {
  return (
    <section
      className="serviceDetailSection"
      id="numeroloji-analizi"
    >
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              NUMEROLOJİ ANALİZİ
            </p>

            <h2>
              Sayılarını öğren,
              <span> kendi hikâyeni başka bir dilden oku.</span>
            </h2>
          </div>

          <div className="serviceDetailLead">
            <p>
              Numeroloji analizi, doğum tarihi ve isim bilgilerinden
              hesaplanan sayıların oluşturduğu kişisel haritayı inceleyen
              dijital bir farkındalık çalışmasıdır.
            </p>

            <p>
              Analizin amacı seni tek bir sayı veya karakter tanımına
              hapsetmek değil; güçlü yönlerini, içsel ihtiyaçlarını ve
              yaşamında tekrar eden temel temaları daha geniş bir çerçeveden
              gözlemlemene yardımcı olmaktır.
            </p>
          </div>
        </div>

        <div className="serviceDetailInfoBar">
          <div>
            <span>ÇALIŞMA</span>
            <strong>Kişiye Özel Numeroloji</strong>
          </div>

          <div>
            <span>HAZIRLIK</span>
            <strong>İsim ve Doğum Tarihi</strong>
          </div>

          <div>
            <span>TESLİM</span>
            <strong>Dijital Analiz</strong>
          </div>

          <div>
            <span>ODAK</span>
            <strong>Kişisel Sayı Haritası</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              NUMEROLOJİ ANALİZİ KİMLER İÇİN?
            </p>

            <h2>
              Kendini anlamak için
              <span> başka bir aynaya bak.</span>
            </h2>

            <p>
              İnsan bazen güçlü yönlerini sıradan, zorlandığı alanları ise
              değişmez bir kader olarak görebilir. Numeroloji, bu özellikleri
              farklı sayı temaları üzerinden yeniden değerlendirmeye alan
              açar.
            </p>

            <p>
              Kişisel haritada bulunan sayılar; karakter, duygusal ihtiyaç,
              ifade biçimi, üretim alanı ve yaşam dönemleri gibi farklı
              başlıklarla birlikte incelenir.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Sayılar sana kim olman gerektiğini söylemez; kendinde henüz
                fark etmediğin yönleri görmen için yeni bir dil sunar.
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
              Numeroloji Analizi İçin Bilgi Al
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            NUMEROLOJİ HARİTASINDA NELER VAR?
          </p>

          <h2>
            Her sayı,
            <span> başka bir yönünü anlatır.</span>
          </h2>

          <p>
            Kişisel numeroloji haritası, doğum tarihi ve isimden hesaplanan
            sayıların birbiriyle oluşturduğu bütün üzerinden yorumlanır.
          </p>
        </div>

        <div className="serviceDetailProgramGrid">
          {analysisAreas.map((area) => (
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
              ANALİZ NASIL HAZIRLANIR?
            </p>

            <h2>
              Bilgilerinden kişisel haritana
              <span> dört aşamalı bir yolculuk.</span>
            </h2>

            <p>
              Hesaplamaların doğru yapılabilmesi için isim ve doğum tarihi
              bilgilerinin eksiksiz paylaşılması önemlidir.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            {analysisSteps.map((step, index) => (
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

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            ANALİZİN ODAK ALANLARI
          </p>

          <h2>
            Haritanı yalnızca hesaplama olarak değil,
            <span> hayatındaki karşılığıyla incele.</span>
          </h2>
        </div>

        <div className="serviceDetailGiftGrid">
          {focusCards.map((focusCard, index) => (
            <article
              className="serviceDetailGiftCard"
              key={focusCard.title}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>

              <h3>{focusCard.title}</h3>

              <p>{focusCard.description}</p>
            </article>
          ))}
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              ANALİZ İÇİN GEREKLİ BİLGİLER
            </p>

            <h2>
              Doğru bilgiler,
              <span> doğru hesaplamanın temelidir.</span>
            </h2>

            <p>
              Numeroloji hesaplamalarında doğum tarihi kadar isimlerin doğru
              yazılması da önemlidir. Doğumda verilen isim ile günümüzde
              kullanılan isim farklıysa her ikisi de paylaşılmalıdır.
            </p>

            <p>
              Paylaşılan bilgiler yalnızca analizin hazırlanması ve teslim
              sürecinin yürütülmesi amacıyla kullanılmalıdır.
            </p>
          </div>

          <aside className="serviceDetailListCard">
            <p>HAZIRLIK LİSTESİ</p>

            <h3>Analiz öncesinde bunları hazırla.</h3>

            <ul>
              {requiredInformation.map((item) => (
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
              Numeroloji bir farkındalık aracıdır,
              <span> değişmez bir kader tanımı değildir.</span>
            </h2>
          </div>

          <div>
            <p>
              Numeroloji yorumları sembolik ve yorumsal niteliktedir. Belirli
              bir olayın gerçekleşeceğini, kesin bir ilişki veya kariyer
              sonucunu garanti etmez.
            </p>

            <p>
              Sağlık, hukuk, psikoloji, finans ve yatırım konularında
              profesyonel danışmanlığın yerine kullanılmamalıdır. Yaşamına
              ilişkin kararların sorumluluğu sana aittir.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          <Link href="/randevu">
            Numeroloji Analizi İçin Başvur
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