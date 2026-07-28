import Link from "next/link";

const programDays = [
  {
    day: "1. GÜN",
    title: "Enerji alanını arındır",
    description:
      "Yedi ana çakra çalışması, geçmişten kalan enerji yüklerinin bırakılması ve yaşam alanı temizliğiyle sürece hazırlan.",
    topics: [
      "Yedi ana çakra çalışması",
      "Eski enerji yüklerinin bırakılması",
      "Mekân enerjisi temizliği",
    ],
  },
  {
    day: "2. GÜN",
    title: "Geçmiş bağları fark et",
    description:
      "Atalardan ve geçmiş ilişkilerden taşınan duygusal bağları fark ederek yeni bir başlangıç için alan aç.",
    topics: [
      "Atalardan gelen ilişki kalıpları",
      "Geçmiş ilişki bağları",
      "Bağ kesme çalışması",
      "Yedi ana çakra çalışması",
    ],
  },
  {
    day: "3. GÜN",
    title: "Özdeğerini yeniden hatırla",
    description:
      "Çocuklukta oluşan sevgi ve değer görme kalıplarını inceleyerek özdeğer alanını güçlendirmeye odaklan.",
    topics: [
      "Özdeğer çalışması",
      "Çocukluk izleri",
      "Onaylanma ihtiyacı",
      "Karma çalışması",
      "Yedi ana çakra çalışması",
    ],
  },
  {
    day: "4. GÜN",
    title: "Dişil ve eril enerjini dengele",
    description:
      "Alma, verme, güvenme, harekete geçme ve akışta kalma hâllerini daha dengeli kullanabilmek için enerji alanını düzenle.",
    topics: [
      "Dişil enerji çalışması",
      "Eril enerji çalışması",
      "Tali çakralar",
      "Nazar enerjisinden arınma",
      "Yedi ana çakra çalışması",
    ],
  },
  {
    day: "5. GÜN",
    title: "Yeni aşk enerjisine uyumlan",
    description:
      "Nasıl bir ilişkiye hazır olduğunu netleştirerek sevgi, uyum ve karşılıklılık taşıyan yeni bir bağ için içsel alan oluştur.",
    topics: [
      "Aşk enerjisini hayatına çağırma",
      "Yeni ilişki frekansına uyumlanma",
      "İmgeleme çalışması",
      "Aşk meditasyonu",
    ],
  },
];

const suitableFor = [
  "Hayatında şu anda romantik bir ilişkisi bulunmayanlar",
  "Geçmiş ilişkilerin etkisini hâlâ üzerinde hissedenler",
  "Benzer ilişki döngülerini tekrar tekrar yaşayanlar",
  "Güvenmekte veya yeni bir ilişkiye açılmakta zorlananlar",
  "Sevilmek için kendinden fazla ödün verdiğini fark edenler",
  "Daha dengeli ve karşılıklı bir ilişkiye hazırlanmak isteyenler",
];

const gifts = [
  {
    title: "Katılım Belgesi",
    description:
      "Beş günlük grup çalışmasını tamamlayan katılımcılar için hazırlanır.",
  },
  {
    title: "Numeroloji Analizi",
    description:
      "Kişisel numeroloji kodlarını ve ilişki alanındaki temel eğilimlerini keşfet.",
  },
  {
    title: "Yalnız Kalabilmenin Gücü",
    description:
      "Yalnızlığı eksiklik olarak görmek yerine kendinle kurduğun bağı güçlendirmeye odaklanan dijital kitap.",
  },
  {
    title: "Özdeğer ve Onay Bağımlılığı",
    description:
      "Başkalarının sevgisini kazanmak için kendinden vazgeçtiğin alanları fark etmene yardımcı olan dijital kitap.",
  },
];

export default function LoveDetailSection() {
  return (
    <section className="serviceDetailSection" id="ask-calismasi">
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              AŞKI HAYATINA ÇAĞIR
            </p>

            <h2>
              Aşkı beklemek yerine,
              <span> ona iç dünyanda yer aç.</span>
            </h2>
          </div>

          <div className="serviceDetailLead">
            <p>
              Aşkı Hayatına Çağır, hayatında mevcut bir ilişkisi olmayan ve
              yeni bir ilişkiye içsel olarak hazırlanmak isteyen kişiler için
              oluşturulan beş günlük çevrim içi grup çalışmasıdır.
            </p>

            <p>
              Çalışmanın amacı yalnızca hayatına birini çekmek değil, geçmişten
              taşıdığın duygusal yükleri fark etmek, özdeğer alanını
              güçlendirmek ve daha sağlıklı bir ilişkiye hazırlanmanı
              desteklemektir.
            </p>
          </div>
        </div>

        <div className="serviceDetailInfoBar">
          <div>
            <span>PROGRAM</span>
            <strong>5 Günlük Grup Çalışması</strong>
          </div>

          <div>
            <span>SÜRE</span>
            <strong>Her Gün 1,5 Saat</strong>
          </div>

          <div>
            <span>PLATFORM</span>
            <strong>Google Meet</strong>
          </div>

          <div>
            <span>KATILIM</span>
            <strong>Çevrim İçi ve Görüntülü</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              BU ÇALIŞMA KİMLER İÇİN?
            </p>

            <h2>
              Yeni bir ilişkiye başlamadan önce
              <span> kendinle olan bağını güçlendir.</span>
            </h2>

            <p>
              Bazen yeni bir ilişki istemek yeterli olmaz. Geçmiş
              kırgınlıklar, güven sorunları ve fark edilmeden oluşturulan
              duygusal duvarlar, yeni bir bağ kurmayı zorlaştırabilir.
            </p>

            <p>
              Bu çalışma, kişinin kendini daha yakından gözlemlemesine ve
              ilişkilerde tekrar eden içsel kalıplarını fark etmesine alan
              açar.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Yeni bir aşkı hayatına almak, önce geçmişin kapladığı alanı
                fark etmekle başlar.
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
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            BEŞ GÜNLÜK PROGRAM AKIŞI
          </p>

          <h2>
            Her gün başka bir katmanı
            <span> birlikte dönüştür.</span>
          </h2>

          <p>
            Program birbirini tamamlayan beş aşamadan oluşur. Her gün yapılan
            çalışmalar, bir sonraki günün içsel zeminini hazırlar.
          </p>
        </div>

        <div className="serviceDetailProgramGrid">
          {programDays.map((programDay) => (
            <article
              className="serviceDetailProgramCard"
              key={programDay.day}
            >
              <div className="serviceDetailProgramCardTop">
                <span>{programDay.day}</span>
                <span aria-hidden="true">✦</span>
              </div>

              <h3>{programDay.title}</h3>

              <p>{programDay.description}</p>

              <ul>
                {programDay.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="serviceDetailGifts">
          <div className="serviceDetailGiftsIntro">
            <p className="serviceDetailLabel">
              PROGRAM HEDİYELERİ
            </p>

            <h2>
              Çalışma tamamlandığında
              <span> yolculuğun devam etsin.</span>
            </h2>

            <p>
              Program katılımcılarına çalışma sürecini destekleyen özel
              içerikler sunulur.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            {gifts.map((gift, index) => (
              <article
                className="serviceDetailGiftCard"
                key={gift.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>

                <h3>{gift.title}</h3>

                <p>{gift.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="serviceDetailNotice">
          <div>
            <p className="serviceDetailLabel">
              ÖNEMLİ BİLGİLENDİRME
            </p>

            <h2>
              Amaç bir kişiyi değil,
              <span> kendi alanını dönüştürmektir.</span>
            </h2>
          </div>

          <div>
            <p>
              Bu çalışma belirli bir kişiyi geri döndürmeyi, birini kendine
              bağlamayı veya kesin bir ilişki sonucu oluşturmayı amaçlamaz.
            </p>

            <p>
              Çalışmalar kişisel farkındalık ve içsel denge süreçlerini
              destekler; tıbbi ya da psikolojik teşhis ve tedavi yerine
              geçmez. Her katılımcının deneyimi kendine özgüdür.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          <Link href="/randevu">
            Kayıt ve Bilgi Al
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