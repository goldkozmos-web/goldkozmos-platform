import Link from "next/link";

const programDays = [
  {
    day: "1. GÜN",
    title: "İlişkinin enerji alanını fark et",
    description:
      "İlişkide tekrar eden dinamikleri, üstlendiğin rolleri ve bağın mevcut enerjisini daha geniş bir açıdan gözlemle.",
    topics: [
      "İlişki dinamiklerini fark etme",
      "İlişki niyeti oluşturma",
      "Mekân enerjisi temizliği",
      "Yedi ana çakra çalışması",
    ],
  },
  {
    day: "2. GÜN",
    title: "Kırgınlık ve güven alanını düzenle",
    description:
      "İlişkide biriken kırgınlıkları, geçmişten taşınan duygusal yükleri ve güveni zorlayan deneyimleri fark etmeye odaklan.",
    topics: [
      "Geçmiş kırgınlıkları fark etme",
      "Güven alanı çalışması",
      "Kalp alanını destekleme",
      "Geçmişten taşınan bağları düzenleme",
      "Yedi ana çakra çalışması",
    ],
  },
  {
    day: "3. GÜN",
    title: "İletişim ve ihtiyaçlarını netleştir",
    description:
      "İlişki içinde söyleyemediklerini, karşılanmayan ihtiyaçlarını ve sınırlarının bulanıklaştığı alanları gözlemle.",
    topics: [
      "İletişim kalıpları",
      "Duygusal ihtiyaçlar",
      "Sınırlar ve özdeğer",
      "Çocukluktan gelen ilişki örüntüleri",
      "Yedi ana çakra çalışması",
    ],
  },
  {
    day: "4. GÜN",
    title: "Dişil ve eril dengeyi güçlendir",
    description:
      "İlişki içinde alma, verme, güvenme, sorumluluk alma ve akışta kalma hâllerinin daha dengeli kullanılmasına odaklan.",
    topics: [
      "Dişil enerji çalışması",
      "Eril enerji çalışması",
      "İlişkide alma ve verme dengesi",
      "Tali çakralar",
      "Nazar enerjisinden arınma",
      "Yedi ana çakra çalışması",
    ],
  },
  {
    day: "5. GÜN",
    title: "İlişkiyi yeni bir niyetle destekle",
    description:
      "İlişkide nasıl bir bağ kurmak istediğini netleştirerek sevgi, iletişim, karşılıklılık ve uyum alanına odaklan.",
    topics: [
      "Yedi çakraya sevgi yükleme",
      "İlişki uyumlanma çalışması",
      "Ortak bağ için imgeleme",
      "İlişki meditasyonu",
      "Yeni ilişki niyeti oluşturma",
    ],
  },
];

const suitableFor = [
  "Mevcut ilişkisinde iletişim sorunları yaşayanlar",
  "Aynı tartışmaların tekrar ettiğini hissedenler",
  "İlişkide kırgınlıkların biriktiğini fark edenler",
  "Güven alanı zedelenmiş olanlar",
  "İlişkide bütün yükü kendisinin taşıdığını düşünenler",
  "Partneriyle arasındaki duygusal mesafeyi azaltmak isteyenler",
  "Mevcut bağını daha sağlıklı bir yerden güçlendirmek isteyenler",
];

const focusAreas = [
  {
    title: "İlişki Dinamikleri",
    description:
      "İlişki içinde hangi rolü üstlendiğini ve tekrar eden çatışmaların hangi kalıplarla beslendiğini fark et.",
  },
  {
    title: "İletişim ve Sınırlar",
    description:
      "Kendini ifade etme, ihtiyaçlarını dile getirme ve ilişkide sağlıklı sınırlar oluşturma alanını gözlemle.",
  },
  {
    title: "Güven ve Kırgınlıklar",
    description:
      "Geçmişte yaşanan olayların bugünkü ilişkiye nasıl yansıdığını ve güven alanını nasıl etkilediğini fark et.",
  },
  {
    title: "Dişil ve Eril Denge",
    description:
      "Alma, verme, yön verme, güvenme ve sorumluluk paylaşımı arasındaki dengeyi daha yakından incele.",
  },
];

export default function RelationshipHealingDetailSection() {
  return (
    <section
      className="serviceDetailSection"
      id="iliski-calismasi"
    >
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              İLİŞKİNİ ŞİFALANDIR
            </p>

            <h2>
              İlişkiyi değiştirmeden önce,
              <span> içindeki dinamiği fark et.</span>
            </h2>
          </div>

          <div className="serviceDetailLead">
            <p>
              İlişkini Şifalandır, mevcut romantik ilişkisinde iletişim,
              güven, kırgınlık veya duygusal uzaklık yaşayan kişiler için
              hazırlanan beş günlük çevrim içi grup çalışmasıdır.
            </p>

            <p>
              Çalışmaya tek başına katılabilirsin. Partnerinin programa
              katılması gerekmez. Süreç, öncelikle senin ilişki içindeki
              duygularını, sınırlarını, seçimlerini ve davranış kalıplarını
              fark etmene odaklanır.
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
            <strong>Partner Katılımı Gerekmez</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              BU ÇALIŞMA KİMLER İÇİN?
            </p>

            <h2>
              Mevcut ilişkine
              <span> daha bilinçli bir yerden bak.</span>
            </h2>

            <p>
              Bir ilişkide sorun yaşamak her zaman sevginin bittiği anlamına
              gelmez. Bazen söylenmeyen ihtiyaçlar, biriken kırgınlıklar,
              güven sorunları ve tekrar eden davranış biçimleri ilişkinin
              üzerini ağır bir sis gibi kaplayabilir.
            </p>

            <p>
              Bu çalışma partnerini kontrol etmeye veya değiştirmeye değil,
              senin ilişki içinde nasıl hissettiğini, neye ihtiyaç duyduğunu
              ve hangi döngüleri tekrar ettiğini fark etmene alan açar.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                İlişkiyi güçlendirmek, yalnızca karşı tarafın değişmesini
                beklemek değil; kendi duruşunu da yeniden görmektir.
              </p>
            </div>
          </div>

          <aside className="serviceDetailListCard">
            <p>SANA UYGUN OLABİLİR</p>

            <h3>İlişkinde bunlardan birini yaşıyor musun?</h3>

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
            İlişkideki her katmana
            <span> başka bir yerden yaklaş.</span>
          </h2>

          <p>
            Programın her günü bir önceki çalışmayı tamamlar. İlişkinin
            enerji alanından iletişime, kırgınlıklardan dişil-eril dengeye
            uzanan bütüncül bir süreç oluşturulur.
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
              ÇALIŞMANIN TEMEL ODAKLARI
            </p>

            <h2>
              Soruna yalnızca yüzeyden değil,
              <span> ilişkinin bütününden bak.</span>
            </h2>

            <p>
              İlişki içindeki görünür sorunların altında farklı duygusal
              ihtiyaçlar, roller ve öğrenilmiş davranış biçimleri bulunabilir.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            {focusAreas.map((focusArea, index) => (
              <article
                className="serviceDetailGiftCard"
                key={focusArea.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>

                <h3>{focusArea.title}</h3>

                <p>{focusArea.description}</p>
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
              Amaç partnerini kontrol etmek değil,
              <span> ilişki içindeki alanını fark etmektir.</span>
            </h2>
          </div>

          <div>
            <p>
              Bu çalışma partnerin davranışlarını değiştirmeyi, bir kişiyi
              ilişkide tutmayı veya ilişkinin kesin olarak devam etmesini
              sağlamayı vaat etmez.
            </p>

            <p>
              Şiddet, tehdit, baskı veya istismar içeren ilişkilerde öncelik
              ilişkinin sürdürülmesi değil, kişinin güvenliğidir. Çalışmalar
              psikolojik destek veya çift terapisi yerine geçmez.
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