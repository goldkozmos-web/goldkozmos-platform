"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "Enerji çalışmaları nasıl gerçekleşir?",
    answer:
      "Goldkozmos® Enerji Ekolü çalışmaları; kişinin ihtiyacına, seçilen programın içeriğine ve çalışma biçimine göre ilerler. Birebir seanslar kişiye özel planlanırken grup çalışmaları ortak bir tema etrafında gerçekleştirilir. Süreç, farkındalık ve içsel denge alanını desteklemeyi amaçlar.",
  },
  {
    question: "Online veya uzaktan çalışma yapılabilir mi?",
    answer:
      "Evet. Birebir seanslar ve grup çalışmaları çevrim içi olarak gerçekleştirilebilir. Çalışmanın türüne göre Google Meet, WhatsApp veya belirtilen dijital platformlar kullanılır. Katılım için sessiz, rahat ve bölünmeyeceğin bir ortam hazırlaman önerilir.",
  },
  {
    question: "Kaç seans veya çalışma gerekir?",
    answer:
      "Her kişinin ihtiyacı ve süreci farklıdır. Bazı konular tek bir çalışmada ele alınabilirken bazı konularda düzenli ve aralıklı bir süreç daha uygun olabilir. İlk görüşme veya çalışma sonrasında ihtiyaçların birlikte değerlendirilir.",
  },
  {
    question: "İlk çalışmada ne hissederim?",
    answer:
      "Çalışma sırasında veya sonrasında rahatlama, sakinlik, duygusal farkındalık, düşüncelerde netleşme ya da bedensel gevşeme hissedilebilir. Hiçbir belirgin his yaşamamak da mümkündür. Hissedilenler kişiden kişiye değişir ve çalışmanın değerini tek başına belirlemez.",
  },
  {
    question: "Herkes aynı deneyimi mi yaşar?",
    answer:
      "Hayır. Her insanın yaşam deneyimi, duygusal yapısı, ihtiyaçları ve sürece verdiği tepki farklıdır. Bu nedenle çalışmaların etkisi, hissedilme biçimi ve dönüşüm süreci kişiye özel olarak ilerler.",
  },
  {
    question: "Hangi çalışmanın bana uygun olduğunu nasıl seçebilirim?",
    answer:
      "Aşk ve ilişki, para ve bolluk, kişisel dönüşüm, birebir seans, tarot, numeroloji ve dijital ses çalışmaları arasından ihtiyacına uygun olanı seçebilirsin. Kararsız kaldığında Sana Uygun Çalışmayı Bul yönlendirmesini kullanarak başlangıç noktanı belirleyebilirsin.",
  },
  {
    question: "Tarot ve numeroloji geleceği kesin olarak söyler mi?",
    answer:
      "Tarot ve numeroloji, kesin gelecek garantisi sunan uygulamalar olarak ele alınmaz. Mevcut durumunu, yaşam temalarını, eğilimlerini ve tekrar eden örüntülerini farklı bir bakış açısıyla değerlendirmene yardımcı olan farkındalık araçlarıdır.",
  },
  {
    question: "Birebir seansa nasıl hazırlanmalıyım?",
    answer:
      "Seans öncesinde sessiz ve sakin bir ortam oluşturman, mümkünse yalnız kalman, rahat kıyafetler tercih etmen ve dikkatini dağıtacak bildirimleri kapatman önerilir. Çalışma sonrasında dinlenebilmek için kendine küçük bir zaman alanı bırakman da faydalı olabilir.",
  },
  {
    question: "Ses kayıtlarını ne zaman ve kaç kez dinleyebilirim?",
    answer:
      "Ses kayıtlarını açıklamalarında belirtilen kullanım önerilerine göre kendi zamanında dinleyebilirsin. Rahat ve güvenli bir ortam seçmen, araç kullanırken veya dikkat gerektiren bir iş yaparken dinlememen önemlidir.",
  },
  {
    question: "Bu çalışmalar terapi veya tıbbi tedavi yerine geçer mi?",
    answer:
      "Hayır. Goldkozmos® Enerji Ekolü çalışmaları kişisel farkındalık ve içsel denge sürecini desteklemeyi amaçlar. Tıbbi teşhis, psikoterapi veya sağlık tedavisi yerine geçmez. Fiziksel ya da ruhsal bir sağlık sorununda ilgili sağlık uzmanına başvurulmalıdır.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function handleToggle(index: number) {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  }

  return (
    <section className="faqSection" id="sikca-sorulan-sorular">
      <div className="faqContainer">
        <header className="faqHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
              </span>

              <br />

              <span>ENERJİ EKOLÜ</span>

              <br />

              <span>SIKÇA SORULAN SORULAR</span>
            </p>

            <h2>
              Merak ettiklerini
              <span> birlikte netleştirelim.</span>
            </h2>
          </div>

          <div className="faqHeadingContent">
            <p>
              Çalışmaların ilerleyişi, seans süreci ve uygulamalar hakkında
              en sık sorulan soruların yanıtlarını burada bulabilirsin.
            </p>

            <a href="/iletisim">
              Farklı Bir Sorun mu Var?
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </header>

        <div className="faqLayout">
          <div className="faqIntroCard">
            <span className="faqIntroNumber">10</span>

            <p>EN ÇOK MERAK EDİLEN KONU</p>

            <h3>Başlamadan önce ihtiyaç duyduğun temel bilgiler.</h3>

            <span className="faqIntroLine" />

            <small>
              Yanıtını bulamadığın konular için iletişim sayfasından bize
              ulaşabilirsin.
            </small>

            <a href="/iletisim">
              İletişime Geç
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="faqList">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const questionId = `faq-question-${index}`;
              const answerId = `faq-answer-${index}`;

              return (
                <article
                  className={`faqItem ${isOpen ? "faqItemOpen" : ""}`}
                  key={item.question}
                >
                  <h3>
                    <button
                      id={questionId}
                      type="button"
                      className="faqQuestion"
                      onClick={() => handleToggle(index)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="faqQuestionNumber">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="faqQuestionText">
                        {item.question}
                      </span>

                      <span className="faqQuestionIcon" aria-hidden="true">
                        <span />
                        <span />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={answerId}
                    className="faqAnswer"
                    role="region"
                    aria-labelledby={questionId}
                    hidden={!isOpen}
                  >
                    <p>{item.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="faqFooter">
          <div>
            <p>HÂLÂ KARARSIZ MISIN?</p>

            <h3>
              İhtiyacına uygun başlangıç noktasını birlikte keşfet.
            </h3>
          </div>

          <a href="/sana-uygun-calismayi-bul">
            Sana Uygun Çalışmayı Bul
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}