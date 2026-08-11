import Link from "next/link";

const suitableFor = [
  "Belirli bir konuda netlik kazanmak isteyenler",
  "Aşk, ilişki, para, özdeğer veya kişisel sınırlar alanında derinleşmek isteyenler",
  "Tek seansla mevcut durumunu analiz etmek isteyenler",
  "Ay içinde düzenli birebir destek almak isteyenler",
  "Bir konuyu ara vermeden yoğun biçimde çalışmak isteyenler",
  "Kişiye özel yönlendirme ve çalışma planı arayanlar",
];

const singleSessionDetails = [
  "50–60 dakikalık birebir görüşme",
  "Tek bir ana konuya odaklanma",
  "Kişiye özel analiz ve yönlendirme",
  "Ayda 3 veya 4 kez planlanabilir",
];

const intensivePackageDetails = [
  "Ardışık 5 gün birebir çalışma",
  "Her gün aynı ana konu üzerinde ilerleme",
  "Kişiye özel uygulama ve yönlendirmeler",
  "Paket indirimiyle toplam 5.000 TL",
];

const processSteps = [
  {
    number: "01",
    title: "Konuyu Belirleme",
    description:
      "İlk görüşmede çalışmak istediğin ana konu, mevcut durumun ve süreçten beklentin netleştirilir.",
  },
  {
    number: "02",
    title: "Kişiye Özel Analiz",
    description:
      "Yaşadığın döngüler, düşünce kalıpları ve konuya eşlik eden duygusal alanlar birlikte incelenir.",
  },
  {
    number: "03",
    title: "Uygulama ve Yönlendirme",
    description:
      "Seansın odağına göre farkındalık çalışmaları, enerji uygulamaları ve kişisel yönlendirmeler sunulur.",
  },
  {
    number: "04",
    title: "Süreci Takip Etme",
    description:
      "Tek seans sonrasında yeni randevu planlanabilir veya konu daha yoğun çalışılacaksa 5 günlük paket seçilebilir.",
  },
];

export default function OneToOneDetailSection() {
  return (
    <section className="serviceDetailSection" id="birebir-seanslar">
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">BİREBİR SEANSLAR</p>

            <h2>
              İhtiyacına göre tek seans seç,
              <span> ya da dönüşümü beş güne yay.</span>
            </h2>
          </div>

          <div className="serviceDetailLead">
            <p>
              Birebir seanslar, hayatında öne çıkan belirli bir konuya
              odaklanmak, yaşadığın durumu daha net görmek ve sana özel bir
              yol haritası oluşturmak için hazırlanır.
            </p>

            <p>
              Tek seansla başlayabilir, ay içinde 3 veya 4 görüşmeyle düzenli
              ilerleyebilir ya da aynı konu üzerinde ardışık 5 gün çalışmak
              için yoğun birebir paketi seçebilirsin.
            </p>
          </div>
        </div>

        <div className="serviceDetailInfoBar">
          <div>
            <span>FORMAT</span>
            <strong>Online Birebir</strong>
          </div>

          <div>
            <span>TEK SEANS</span>
            <strong>2.500 TL</strong>
          </div>

          <div>
            <span>YOĞUN PAKET</span>
            <strong>5 Gün · 5.000 TL</strong>
          </div>

          <div>
            <span>SÜRE</span>
            <strong>50–60 Dakika</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">BİREBİR ÇALIŞMA</p>

            <h2>
              Herkes için aynı reçete değil,
              <span> sana özel bir çalışma alanı.</span>
            </h2>

            <p>
              Seansın içeriği, çalışmak istediğin konuya ve o sırada
              ihtiyaç duyduğun desteğe göre şekillenir. Amaç yalnızca
              konuşmak değil; yaşadığın döngüyü anlamak, görünmeyen
              nedenleri fark etmek ve uygulanabilir bir yön oluşturmaktır.
            </p>

            <p>
              Tek seans belirli bir konuya netlik kazandırmak için
              kullanılabilir. Daha düzenli ilerlemek isteyenler ay içinde
              3 veya 4 ayrı randevu planlayabilir.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Bazen tek bir görüşme yönünü gösterir; bazen dönüşüm,
                aynı konunun birkaç gün boyunca kesintisiz çalışılmasını ister.
              </p>
            </div>
          </div>

          <aside className="serviceDetailListCard">
            <p>SANA UYGUN OLABİLİR</p>

            <h3>Bu çalışma alanlarından birine ihtiyaç duyuyor musun?</h3>

            <ul>
              {suitableFor.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✦</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/randevu">
              Randevu Oluştur
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">SEANS SEÇENEKLERİ</p>

          <h2>
            İhtiyacına uygun
            <span> iki farklı birebir çalışma modeli.</span>
          </h2>

          <p>
            Tek seans ve yoğun paket aynı amaca hizmet eder; aralarındaki
            fark, çalışmanın süresi ve ilerleme yoğunluğudur.
          </p>
        </div>

        <div className="serviceDetailGiftGrid">
          <article className="serviceDetailGiftCard">
            <span>01</span>

            <p className="serviceDetailLabel">TEK BİREBİR SEANS</p>

            <h3>2.500 TL</h3>

            <p>
              Belirli bir konuya odaklanmak, mevcut durumunu analiz etmek ve
              sana özel bir yön belirlemek için hazırlanmıştır.
            </p>

            <ul>
              {singleSessionDetails.map((detail) => (
                <li key={detail}>
                  <span aria-hidden="true">✦</span>
                  {detail}
                </li>
              ))}
            </ul>

            <Link href="/randevu">
              Tek Seans Randevusu
              <span aria-hidden="true">→</span>
            </Link>
          </article>

          <article className="serviceDetailGiftCard">
            <span>02</span>

            <p className="serviceDetailLabel">5 GÜNLÜK YOĞUN PAKET</p>

            <h3>5.000 TL</h3>

            <p>
              Tek görüşmeyle sınırlı kalmadan, aynı konu üzerinde ardışık
              5 gün boyunca derinleşmek ve süreci bölmeden ilerlemek isteyenler
              için hazırlanmıştır.
            </p>

            <ul>
              {intensivePackageDetails.map((detail) => (
                <li key={detail}>
                  <span aria-hidden="true">✦</span>
                  {detail}
                </li>
              ))}
            </ul>

            <p>
              Beş seansın tek tek toplam değeri 12.500 TL’dir. Yoğun paket,
              süreci ardışık tamamlayan danışanlara özel 5.000 TL olarak sunulur.
            </p>

            <Link href="/iletisim">
              Yoğun Paket İçin Bilgi Al
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>

        <div className="serviceDetailGifts">
          <div className="serviceDetailGiftsIntro">
            <p className="serviceDetailLabel">SÜREÇ NASIL İLERLER?</p>

            <h2>
              Konuyu belirle,
              <span> kendi hızına uygun modeli seç.</span>
            </h2>

            <p>
              Birebir çalışma, önce ihtiyacın netleştirilerek ardından sana
              uygun seans modeli belirlenerek ilerler.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            {processSteps.map((step) => (
              <article
                className="serviceDetailGiftCard"
                key={`${step.number}-${step.title}`}
              >
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="serviceDetailNotice">
          <div>
            <p className="serviceDetailLabel">ÖNEMLİ BİLGİLENDİRME</p>

            <h2>
              Birebir çalışmalar
              <span> profesyonel sağlık hizmetinin yerine geçmez.</span>
            </h2>
          </div>

          <div>
            <p>
              Sunulan çalışmalar kişisel farkındalık, enerji çalışması ve
              bireysel gelişim amacıyla hazırlanır. Psikoterapi, psikolojik
              danışmanlık, tıbbi teşhis veya tedavi değildir.
            </p>

            <p>
              Ödeme sonrasında randevu planlaması yapılır. Ardışık 5 günlük
              paket seçildiğinde günlerin önceden birlikte belirlenmesi gerekir.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          <Link href="/randevu">
            Tek Seans Randevusu
            <span aria-hidden="true">→</span>
          </Link>

          <Link href="/iletisim">
            5 Günlük Paket İçin Bilgi Al
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}