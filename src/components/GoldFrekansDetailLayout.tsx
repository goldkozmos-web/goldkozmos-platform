import Link from "next/link";

type GoldFrekansTopic = {
  number: string;
  title: string;
  description: string;
};

type GoldFrekansDetailLayoutProps = {
  id: string;
  title: string;
  category: string;
  headline: string;
  highlightedHeadline: string;
  description: string[];
  topics: GoldFrekansTopic[];
  suitableFor: string[];
  duration?: string;
  delivery?: string;
  purchaseHref?: string;
};

export default function GoldFrekansDetailLayout({
  id,
  title,
  category,
  headline,
  highlightedHeadline,
  description,
  topics,
  suitableFor,
  duration = "Kayıt Bilgisinde Belirtilir",
  delivery = "Dijital Ses Kaydı",
  purchaseHref = "/iletisim",
}: GoldFrekansDetailLayoutProps) {
  return (
    <section className="serviceDetailSection" id={id}>
      <div className="serviceDetailContainer">
        <div className="serviceDetailIntro">
          <div className="serviceDetailIntroText">
            <p className="sectionEyebrow">
              GOLDFREKANS · {title.toUpperCase()}
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
            <strong>{delivery}</strong>
          </div>

          <div>
            <span>KATEGORİ</span>
            <strong>{category}</strong>
          </div>

          <div>
            <span>SÜRE</span>
            <strong>{duration}</strong>
          </div>

          <div>
            <span>KULLANIM</span>
            <strong>Kişisel ve Bireysel</strong>
          </div>
        </div>

        <div className="serviceDetailSplit">
          <div className="serviceDetailContent">
            <p className="serviceDetailLabel">
              BU SES KAYDI KİMLER İÇİN?
            </p>

            <h2>
              Dinlediğin konuyu yalnızca anlama,
              <span> hayatındaki karşılığını da fark et.</span>
            </h2>

            <p>
              GoldFrekans kayıtları, belirli bir yaşam alanına daha derinden
              bakman ve kendi düşünce kalıplarını gözlemlemen için hazırlanan
              dijital ses içerikleridir.
            </p>

            <p>
              Kaydı sessiz bir ortamda, dikkatini başka bir işle bölmeden
              dinlemen önerilir. Dikkatini çeken cümleleri ve ortaya çıkan
              farkındalıkları not alabilirsin.
            </p>

            <div className="serviceDetailQuote">
              <span aria-hidden="true">“</span>

              <p>
                Bazen değişim, yeni bir cevap bulmakla değil; yıllardır doğru
                sandığın soruyu yeniden görmekle başlar.
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

            <Link href={purchaseHref}>
              Ses Kaydı İçin Bilgi Al
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>

        <div className="serviceDetailProgramHeader">
          <p className="serviceDetailLabel">
            SES KAYDININ ANA BAŞLIKLARI
          </p>

          <h2>
            Konuyu farklı katmanlarıyla
            <span> birlikte incele.</span>
          </h2>

          <p>
            Kayıt boyunca ele alınan temel düşünce duraklarını aşağıda
            inceleyebilirsin.
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

        <div className="serviceDetailGifts">
          <div className="serviceDetailGiftsIntro">
            <p className="serviceDetailLabel">
              NASIL DİNLENMELİ?
            </p>

            <h2>
              Kaydı açmadan önce
              <span> kendine gerçek bir alan hazırla.</span>
            </h2>

            <p>
              Dinleme deneyiminin daha verimli ilerlemesi için sakin ve
              güvenli bir ortam oluşturman önerilir.
            </p>
          </div>

          <div className="serviceDetailGiftGrid">
            <article className="serviceDetailGiftCard">
              <span>01</span>
              <h3>Sessiz Bir Alan Seç</h3>
              <p>
                Rahatsız edilmeyeceğin ve dikkatini kayda verebileceğin bir
                ortam oluştur.
              </p>
            </article>

            <article className="serviceDetailGiftCard">
              <span>02</span>
              <h3>Kulaklık Kullan</h3>
              <p>
                Sesleri ve anlatımı daha net duyabilmek için uygun bir
                kulaklık tercih edebilirsin.
              </p>
            </article>

            <article className="serviceDetailGiftCard">
              <span>03</span>
              <h3>Notlarını Tut</h3>
              <p>
                Dikkatini çeken düşünceleri ve yaşamındaki karşılıklarını kısa
                notlarla kaydet.
              </p>
            </article>

            <article className="serviceDetailGiftCard">
              <span>04</span>
              <h3>Kendini Gözlemle</h3>
              <p>
                Kayıt sonrasında ortaya çıkan duygu ve düşünceleri
                yargılamadan fark etmeye çalış.
              </p>
            </article>
          </div>
        </div>

        <div className="serviceDetailNotice">
          <div>
            <p className="serviceDetailLabel">
              ÖNEMLİ BİLGİLENDİRME
            </p>

            <h2>
              GoldFrekans içerikleri
              <span> profesyonel desteğin yerine geçmez.</span>
            </h2>
          </div>

          <div>
            <p>
              Ses kayıtları genel bilgilendirme, düşünme ve kişisel
              farkındalık amacıyla hazırlanır. Psikoterapi, psikolojik
              danışmanlık, tıbbi teşhis veya tedavi değildir.
            </p>

            <p>
              Para ve finans konulu içerikler finansal danışmanlık veya yatırım
              tavsiyesi niteliğinde değildir. Kayıtlar araç kullanırken veya
              yoğun dikkat gerektiren işlerde dinlenmemelidir.
            </p>
          </div>
        </div>

        <div className="serviceDetailActions">
          <Link href={purchaseHref}>
            Ses Kaydı İçin Bilgi Al
            <span aria-hidden="true">→</span>
          </Link>

          <Link href="/goldfrekans">
            GoldFrekans Kütüphanesine Dön
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}