import Link from "next/link";

type BookChapter = {
  number: string;
  title: string;
  description: string;
  topics: string[];
};

type BookBenefit = {
  title: string;
  description: string;
};

type GoldBookDetailLayoutProps = {
  id: string;
  title: string;
  headline: string;
  highlightedHeadline: string;
  description: string[];
  category: string;
  suitableFor: string[];
  chapters: BookChapter[];
  benefits: BookBenefit[];
  noticeTitle?: string;
  noticeDescription?: string;
};

export default function GoldBookDetailLayout({
  id,
  title,
  headline,
  highlightedHeadline,
  description,
  category,
  suitableFor,
  chapters,
  benefits,
  noticeTitle = "Bu kitap bir farkındalık alanıdır,",
  noticeDescription = "GoldBook içerikleri kişisel farkındalık ve öz gözlem süreçlerini desteklemek amacıyla hazırlanır. Psikoterapi, psikolojik danışmanlık, tıbbi teşhis veya tedavi yerine geçmez.",
}: GoldBookDetailLayoutProps) {
  return (
    <section className="serviceDetailSection" id={id}>
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              GOLDBOOK · {title.toUpperCase()}
            </p>

            <h2>
              {headline}
              <span> {highlightedHeadline}</span>
            </h2>
          </div>

          <div className="serviceDetailLead">
            {description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="serviceDetailInfoBar">
          <div>
            <span>FORMAT</span>
            <strong>Dijital Kitap</strong>
          </div>

          <div>
            <span>KATEGORİ</span>
            <strong>{category}</strong>
          </div>

          <div>
            <span>TESLİM</span>
            <strong>Çevrim İçi Gönderim</strong>
          </div>

          <div>
            <span>KULLANIM</span>
            <strong>Kişisel ve Bireysel</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              BU GOLDBOOK KİMLER İÇİN?
            </p>

            <h2>
              Okuduklarını yalnızca bilme,
              <span> kendi hayatında da gözlemle.</span>
            </h2>

            <p>
              GoldBook içerikleri yalnızca bilgi vermek için değil, okurun
              kendi düşüncelerini, davranışlarını ve yaşamında tekrar eden
              kalıpları daha yakından incelemesi için hazırlanır.
            </p>

            <p>
              Kitabı kendi hızında okuyabilir, dikkatini çeken bölümlere
              yeniden dönebilir ve önemli farkındalıklarını not alarak
              ilerleyebilirsin.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Bazı kitaplar yeni bir şey öğretmez; zaten içinde bulunan
                hakikati görünür hâle getirir.
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

            <Link href="/iletisim">
              GoldBook Hakkında Bilgi Al
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            KİTABIN İÇERİĞİ
          </p>

          <h2>
            Her bölüm,
            <span> başka bir farkındalık kapısı açar.</span>
          </h2>

          <p>
            Kitabın bölümleri birbirini tamamlayan bir sıra içinde ilerler.
            Dilersen baştan sona okuyabilir veya o dönem ihtiyacın olan
            bölüme yeniden dönebilirsin.
          </p>
        </div>

        <div className="serviceDetailProgramGrid">
          {chapters.map((chapter) => (
            <article
              className="serviceDetailProgramCard"
              key={`${chapter.number}-${chapter.title}`}
            >
              <div className="serviceDetailProgramCardTop">
                <span>{chapter.number}</span>
                <span aria-hidden="true">✦</span>
              </div>

              <h3>{chapter.title}</h3>

              <p>{chapter.description}</p>

              <ul>
                {chapter.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="serviceDetailGifts">
          <div className="serviceDetailGiftsIntro">
            <p className="serviceDetailLabel">
              BU KİTAP SANA NE KATAR?
            </p>

            <h2>
              Okuma bittikten sonra da
              <span> farkındalığın seninle kalsın.</span>
            </h2>

            <p>
              Her GoldBook, ele aldığı konuyu yalnızca anlatmak yerine günlük
              yaşamdaki karşılıklarıyla görmene yardımcı olacak şekilde
              hazırlanır.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            {benefits.map((benefit, index) => (
              <article
                className="serviceDetailGiftCard"
                key={benefit.title}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
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
              {noticeTitle}
              <span> profesyonel desteğin yerine geçmez.</span>
            </h2>
          </div>

          <div>
            <p>{noticeDescription}</p>

            <p>
              Kitapta yer alan önerileri kendi yaşam koşullarına göre
              değerlendirmeli, sağlık veya psikolojiyle ilgili konularda
              gerektiğinde yetkili uzman desteğine başvurmalısın.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          <Link href="/iletisim">
            GoldBook İçin Bilgi Al
            <span aria-hidden="true">→</span>
          </Link>

          <Link href="/goldbook">
            GoldBook Kütüphanesine Dön
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}