import Link from "next/link";

type EpisodeTopic = {
  number: string;
  title: string;
  description: string;
};

type GoldCastEpisodeLayoutProps = {
  id: string;
  episodeNumber: string;
  title: string;
  headline: string;
  highlightedHeadline: string;
  description: string[];
  duration?: string;
  category: string;
  topics: EpisodeTopic[];
  suitableFor: string[];
  spotifyUrl?: string;
  youtubeUrl?: string;
};

export default function GoldCastEpisodeLayout({
  id,
  episodeNumber,
  title,
  headline,
  highlightedHeadline,
  description,
  duration = "Yakında",
  category,
  topics,
  suitableFor,
  spotifyUrl,
  youtubeUrl,
}: GoldCastEpisodeLayoutProps) {
  return (
    <section className="serviceDetailSection" id={id}>
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              GOLDCAST · BÖLÜM {episodeNumber}
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
            <span>PROGRAM</span>
            <strong>GoldCast</strong>
          </div>

          <div>
            <span>BÖLÜM</span>
            <strong>{episodeNumber}</strong>
          </div>

          <div>
            <span>KATEGORİ</span>
            <strong>{category}</strong>
          </div>

          <div>
            <span>SÜRE</span>
            <strong>{duration}</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              BU BÖLÜMDE
            </p>

            <h2>
              Dinlerken yalnızca konuyu değil,
              <span> kendini de gözlemle.</span>
            </h2>

            <p>
              GoldCast bölümleri; ilişkiler, kişisel dönüşüm, sosyoloji,
              Spiritüel Stoa ve enerji farkındalığı konularını günlük
              yaşamın içinden örneklerle ele alır.
            </p>

            <p>
              Bu bölümde anlatılanları kesin doğrular olarak almak yerine
              kendi deneyimlerin, seçimlerin ve yaşamındaki karşılıklarıyla
              birlikte değerlendirebilirsin.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Bazen duyduğun tek bir cümle, uzun süredir kapalı duran bir
                düşünce kapısını sessizce aralar.
              </p>
            </div>
          </div>

          <aside className="serviceDetailListCard">
            <p>SANA UYGUN OLABİLİR</p>

            <h3>Bu bölüm sana dokunabilir.</h3>

            <ul>
              {suitableFor.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✦</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/goldcast">
              Tüm GoldCast Bölümleri
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            BÖLÜMÜN ANA BAŞLIKLARI
          </p>

          <h2>
            Konuyu katman katman
            <span> birlikte açalım.</span>
          </h2>

          <p>
            Bölüm boyunca ele alınan temel fikirleri ve düşünce duraklarını
            aşağıda inceleyebilirsin.
          </p>
        </div>

        <div className="serviceDetailGiftGrid">
          {topics.map((topic) => (
            <article
              className="serviceDetailGiftCard"
              key={`${topic.number}-${topic.title}`}
            >
              <span>{topic.number}</span>

              <h3>{topic.title}</h3>

              <p>{topic.description}</p>
            </article>
          ))}
        </div>

        <div className="serviceDetailNotice">
          <div>
            <p className="serviceDetailLabel">
              ÖNEMLİ BİLGİLENDİRME
            </p>

            <h2>
              GoldCast içerikleri
              <span> profesyonel desteğin yerine geçmez.</span>
            </h2>
          </div>

          <div>
            <p>
              Podcast bölümleri genel bilgilendirme, düşünme ve kişisel
              farkındalık amacıyla hazırlanır. Psikoterapi, psikolojik
              danışmanlık, tıbbi teşhis veya tedavi değildir.
            </p>

            <p>
              Fiziksel veya ruhsal bir sağlık sorunun bulunuyorsa ilgili
              yetkili uzmandan profesyonel destek almalısın.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          {spotifyUrl && (
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noreferrer"
            >
              Spotify’da Dinle
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
            >
              YouTube’da İzle
              <span aria-hidden="true">↗</span>
            </a>
          )}

          <Link href="/goldcast">
            GoldCast’e Dön
            <span aria-hidden="true">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}