import Link from "next/link";

const readingAreas = [
  {
    number: "01",
    title: "Aşk ve İlişkiler",
    description:
      "İlişkinin mevcut dinamiklerini, aradaki duygusal atmosferi ve kendi ilişki örüntülerini farklı bir açıdan değerlendirmene yardımcı olur.",
    topics: [
      "Mevcut ilişkinin dinamikleri",
      "İletişim ve duygusal mesafe",
      "Geçmiş ilişkinin etkileri",
      "Yeni ilişkilere yaklaşım",
    ],
  },
  {
    number: "02",
    title: "Kariyer ve Üretim",
    description:
      "İş, kariyer, üretkenlik ve karar süreçlerinde gözden kaçırdığın noktaları fark etmene alan açar.",
    topics: [
      "Kariyer yönü",
      "İş değişikliği düşüncesi",
      "Üretkenlik ve motivasyon",
      "Karar seçenekleri",
    ],
  },
  {
    number: "03",
    title: "Para ve Refah",
    description:
      "Parayla kurduğun ilişkiyi, kazanç alanındaki tutumlarını ve finansal kararların arkasındaki duygusal kalıpları gözlemlemene destek olur.",
    topics: [
      "Para algısı",
      "Kazanç ve özdeğer",
      "Finansal kararlar",
      "Refah alanındaki içsel engeller",
    ],
  },
  {
    number: "04",
    title: "Kişisel Yolculuk",
    description:
      "İçinde bulunduğun dönemi, tekrar eden yaşam temalarını ve önündeki seçenekleri daha bütüncül biçimde değerlendirmene yardımcı olur.",
    topics: [
      "Mevcut yaşam dönemi",
      "Tekrar eden döngüler",
      "İçsel ihtiyaçlar",
      "Alternatif yollar",
    ],
  },
  {
    number: "05",
    title: "Belirli Bir Konu",
    description:
      "Aklındaki tek bir soru veya belirli bir yaşam alanı üzerinden daha odaklı bir tarot açılımı yapılabilir.",
    topics: [
      "Tek konu açılımı",
      "Karar süreci",
      "İki seçenek arasında değerlendirme",
      "Konunun görünmeyen yönleri",
    ],
  },
];

const suitableFor = [
  "Belirli bir konuda zihni karışık olanlar",
  "İlişkisindeki dinamikleri farklı bir açıdan görmek isteyenler",
  "Bir kararın öncesinde kendi duygularını netleştirmek isteyenler",
  "Tekrar eden yaşam döngülerini fark etmek isteyenler",
  "Kariyer veya para alanındaki seçeneklerini değerlendirenler",
  "İçinde bulunduğu dönemin temasını anlamak isteyenler",
  "Kesin cevap yerine farkındalık ve yön arayanlar",
];

const readingSteps = [
  {
    title: "Sorunu netleştir",
    description:
      "Tarot yorumunun dağılmaması için öncelikle üzerinde durmak istediğin konu veya sorular belirlenir.",
  },
  {
    title: "Bilgilerini paylaş",
    description:
      "Açılımın doğru kişiye ve konuya odaklanabilmesi için gerekli temel bilgiler güvenli iletişim kanalı üzerinden alınır.",
  },
  {
    title: "Açılım hazırlanır",
    description:
      "Kartlar seçilen konu doğrultusunda açılır ve ortaya çıkan semboller bir bütün hâlinde değerlendirilir.",
  },
  {
    title: "Sesli yorum teslim edilir",
    description:
      "Açılımın yorumu, kartların anlattığı ana temalar ve dikkat edilmesi gereken noktalar ses kaydı olarak paylaşılır.",
  },
];

const requiredInformation = [
  "Ad ve soyad",
  "Üzerinde çalışılmasını istediğin konu",
  "Net ve anlaşılır sorular",
  "İlişki açılımında partnerin adı ve soyadı",
  "Gerekli görülen açılımlarda güncel fotoğraf",
  "Yorumun gönderileceği iletişim bilgisi",
];

export default function TarotDetailSection() {
  return (
    <section
      className="serviceDetailSection"
      id="tarot-analizi"
    >
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              TAROT ANALİZİ
            </p>

            <h2>
              Kartlardan kesin bir gelecek değil,
              <span> yeni bir bakış açısı al.</span>
            </h2>
          </div>

          <div className="serviceDetailLead">
            <p>
              Tarot analizi, yaşadığın bir konuya farklı semboller ve
              ihtimaller üzerinden bakmana yardımcı olan sesli yorum
              çalışmasıdır.
            </p>

            <p>
              Amaç hayatına ilişkin kararları senin yerine vermek değil;
              mevcut durumu, duygularını ve gözden kaçırdığın noktaları daha
              geniş bir çerçeveden değerlendirmene alan açmaktır.
            </p>
          </div>
        </div>

        <div className="serviceDetailInfoBar">
          <div>
            <span>ÇALIŞMA</span>
            <strong>Kişiye Özel Tarot Açılımı</strong>
          </div>

          <div>
            <span>TESLİM</span>
            <strong>Sesli Yorum</strong>
          </div>

          <div>
            <span>İLETİŞİM</span>
            <strong>Çevrim İçi</strong>
          </div>

          <div>
            <span>ODAK</span>
            <strong>Seçilen Konuya Göre</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              TAROT ANALİZİ KİMLER İÇİN?
            </p>

            <h2>
              Bazen ihtiyacın bir cevap değil,
              <span> doğru soruyu görebilmektir.</span>
            </h2>

            <p>
              Zihin aynı konu etrafında uzun süre döndüğünde seçenekleri
              birbirinden ayırmak zorlaşabilir. Tarot, mevcut duruma sembolik
              bir ayna tutarak konunun farklı yönlerini fark etmene yardımcı
              olabilir.
            </p>

            <p>
              Yorum sırasında yalnızca kartların tek tek anlamlarına değil,
              kartların birbiriyle oluşturduğu bütünsel hikâyeye ve sorunun
              bağlamına da odaklanılır.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Tarot geleceği senin yerine yazmaz; bulunduğun yeri başka bir
                ışık altında görmene yardım eder.
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
              Tarot Analizi İçin Bilgi Al
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            TAROT AÇILIMI ALANLARI
          </p>

          <h2>
            Her soru,
            <span> başka bir pencere açar.</span>
          </h2>

          <p>
            Tarot açılımı aşk, ilişki, kariyer, para veya kişisel yolculuk
            gibi farklı yaşam alanları üzerinden hazırlanabilir.
          </p>
        </div>

        <div className="serviceDetailProgramGrid">
          {readingAreas.map((area) => (
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
              TAROT ANALİZİ NASIL İLERLER?
            </p>

            <h2>
              Sorundan sesli yoruma
              <span> dört aşamalı bir süreç.</span>
            </h2>

            <p>
              Açılımın daha net ve odaklı ilerlemesi için konu, sorular ve
              gerekli bilgiler analiz öncesinde belirlenir.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            {readingSteps.map((step, index) => (
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
              ANALİZ İÇİN GEREKLİ BİLGİLER
            </p>

            <h2>
              Sorun ne kadar netse,
              <span> yorum da o kadar odaklı olur.</span>
            </h2>

            <p>
              Tarot analizinin doğru kişiye ve doğru konuya odaklanabilmesi
              için gerekli bilgiler çalışma öncesinde paylaşılır.
            </p>

            <p>
              Yalnızca analiz için ihtiyaç duyulan bilgiler istenir. Başka
              kişilere ait bilgi veya fotoğraf paylaşırken ilgili kişinin
              mahremiyetine dikkat edilmelidir.
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
              Tarot bir rehberlik alanıdır,
              <span> kesin gelecek garantisi değildir.</span>
            </h2>
          </div>

          <div>
            <p>
              Tarot yorumları sembolik ve yorumsal niteliktedir. Belirli bir
              olayın gerçekleşeceğini, bir kişinin geri döneceğini veya
              ilişkinin kesin olarak devam edeceğini garanti etmez.
            </p>

            <p>
              Sağlık, hukuk, yatırım ve finans konularında profesyonel
              danışmanlık yerine kullanılmamalıdır. Hayatına ilişkin
              kararların sorumluluğu sana aittir.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          <Link href="/randevu">
            Tarot Analizi İçin Başvur
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