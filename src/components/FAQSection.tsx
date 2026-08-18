"use client";

import { useRef, useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const whatsappUrl =
  "https://wa.me/905054722153?text=Merhaba%2C%20Goldkozmos%20%C3%A7al%C4%B1%C5%9Fmalar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

const faqItems: FAQItem[] = [
  {
    question: "Rezonans çalışmaları nasıl gerçekleşir?",
    answer:
      "Goldkozmos® Rezonans Ekolü çalışmaları; seçilen çalışmanın yapısına ve kişinin ele almak istediği konuya göre ilerler. Birebir ve grup çalışmalarının akışı birbirinden farklı olabilir.",
  },
  {
    question: "Online veya uzaktan çalışma yapılabilir mi?",
    answer:
      "Evet. Goldkozmos çalışmalarının büyük bölümü çevrim içi olarak gerçekleştirilebilir. Çalışmanın türüne göre Google Meet, WhatsApp veya ilgili dijital platform kullanılır.",
  },
  {
    question: "Kaç seans veya çalışma gerekir?",
    answer:
      "Tek bir sayı herkes için geçerli değildir. Ele alınan konuya ve çalışma biçimine göre tek seans, kısa süreli bir program veya daha uzun bir süreç tercih edilebilir.",
  },
  {
    question: "İlk çalışmada ne hissederim?",
    answer:
      "Her kişinin deneyimi farklıdır. Bazı kişiler düşüncelerinde netleşme veya duygusal farkındalık yaşarken bazı kişiler daha sakin ve gözlemleyici bir süreç deneyimleyebilir.",
  },
  {
    question: "Herkes aynı deneyimi mi yaşar?",
    answer:
      "Hayır. Yaşam deneyimleri, ihtiyaçlar, düşünce kalıpları ve kişinin çalışmaya yaklaşımı farklı olduğu için süreç de kişiden kişiye değişebilir.",
  },
  {
    question: "Hangi çalışmanın bana uygun olduğunu nasıl seçebilirim?",
    answer:
      "Kendilik, ilişki, bolluk, birebir çalışmalar ve diğer içerikler farklı ihtiyaçlara hitap eder. Kararsızsan Sana Uygun Çalışmayı Bul testini kullanarak başlangıç alanını görebilirsin.",
  },
  {
    question: "Rezonans Atölyeleri kimler için uygun?",
    answer:
      "Kendini, ilişkilerini, seçimlerini veya tekrar eden yaşam örüntülerini daha yakından incelemek isteyen kişiler için hazırlanmıştır.",
  },
  {
    question: "Kendilik Rezonansı ile mi başlamalıyım?",
    answer:
      "Kendilik Rezonansı, özdeğer, sınırlar, seçimler ve kişinin kendisiyle kurduğu ilişkiyi ele aldığı için diğer alanlara geçmeden önce güçlü bir başlangıç noktası olabilir.",
  },
  {
    question: "İlişki Rezonansı yalnızca ilişkisi olanlar için mi?",
    answer:
      "Hayır. Mevcut ilişki kadar partner seçimleri, geçmiş ilişkiler, tekrar eden ilişki örüntüleri ve kişinin ilişkiler içinde kendini nasıl konumlandırdığı da ele alınabilir.",
  },
  {
    question: "Bolluk Rezonansı yalnızca para üzerine mi?",
    answer:
      "Hayır. Para algısının yanında değer, üretkenlik, alışkanlıklar, kazanma biçimleri ve bollukla kurulan kişisel ilişki de incelenebilir.",
  },
  {
    question: "Birebir seans ile atölye arasındaki fark nedir?",
    answer:
      "Birebir çalışma belirli bir konuya daha kişisel biçimde odaklanır. Atölyelerde ise önceden belirlenmiş bir tema ve yapı üzerinden ilerlenir.",
  },
  {
    question: "Birebir seansa nasıl hazırlanmalıyım?",
    answer:
      "Görüşme sırasında rahatça konuşabileceğin, dikkatin dağılmayacağı sakin bir ortam oluşturman yeterlidir. Görüşmek istediğin konuyu önceden düşünmen de süreci kolaylaştırabilir.",
  },
  {
    question: "Tarot ve numeroloji geleceği kesin olarak söyler mi?",
    answer:
      "Hayır. Tarot ve numeroloji kesin gelecek garantisi sunmaz. Mevcut durumunu, eğilimlerini ve yaşamındaki bazı temaları farklı bir açıdan değerlendirmeye yardımcı olan farkındalık araçları olarak kullanılır.",
  },
  {
    question: "Kayıtlı çalışmaları kendi zamanımda izleyebilir miyim?",
    answer:
      "Satışa kayıtlı içerik olarak sunulan çalışmalar kendi zamanında erişip izleyebileceğin veya dinleyebileceğin şekilde hazırlanır.",
  },
  {
    question: "GoldBook ve GoldCast içerikleri çalışmaların yerine geçer mi?",
    answer:
      "GoldBook ve GoldCast bağımsız farkındalık içerikleridir. Atölye veya birebir çalışma ile aynı yapıda değildir ancak ele alınan konuları farklı açılardan düşünmek için kullanılabilir.",
  },
  {
    question: "Bu çalışmalar terapi veya tıbbi tedavi yerine geçer mi?",
    answer:
      "Hayır. Goldkozmos® içerikleri ve çalışmaları kişisel farkındalık ve bireysel gelişim amacı taşır. Psikoterapi, psikolojik danışmanlık, tıbbi teşhis veya tedavi yerine geçmez.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const wrappingRef = useRef(false);

  function handleToggle(index: number) {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  }

  function handleScroll() {
    const slider = sliderRef.current;

    if (!slider || wrappingRef.current) return;

    const reachedEnd =
      slider.scrollLeft + slider.clientWidth >=
      slider.scrollWidth - 12;

    if (reachedEnd) {
      wrappingRef.current = true;

      window.setTimeout(() => {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        window.setTimeout(() => {
          wrappingRef.current = false;
        }, 650);
      }, 180);
    }
  }

  return (
    <section
      className="faqSection"
      id="sikca-sorulan-sorular"
    >
      <div className="faqContainer">
        <header className="faqHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
              </span>

              <br />

              <span>REZONANS EKOLÜ</span>

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
              Çalışmalar, atölyeler ve Goldkozmos
              içerikleri hakkında en çok merak edilen
              soruların yanıtlarını burada bulabilirsin.
            </p>
          </div>
        </header>

        <div className="faqQuickContact">
          <div>
            <span>YANITINI BULAMADIN MI?</span>

            <p>
              Merak ettiğin farklı bir konu varsa
              doğrudan WhatsApp üzerinden yazabilirsin.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            İletişime Geç
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="faqSwipeHeader">
          <span>16 SORU</span>
          <p>Yana kaydır</p>
          <span aria-hidden="true">→</span>
        </div>

        <div
          className="faqList faqSliderList"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const questionId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <article
                className={`faqItem faqSliderItem ${
                  isOpen ? "faqItemOpen" : ""
                }`}
                key={item.question}
              >
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    className="faqQuestion"
                    onClick={() =>
                      handleToggle(index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="faqQuestionNumber">
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span className="faqQuestionText">
                      {item.question}
                    </span>

                    <span
                      className="faqQuestionIcon"
                      aria-hidden="true"
                    >
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
    </section>
  );
}