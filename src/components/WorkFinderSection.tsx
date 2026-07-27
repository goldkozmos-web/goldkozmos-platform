"use client";

import { useState } from "react";

type AnswerKey =
  | "relationship"
  | "money"
  | "personal"
  | "clarity"
  | "analysis"
  | "digital";

type Result = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
};

const questions = [
  {
    title: "Şu an en çok hangi alanda destek arıyorsun?",
    options: [
      {
        key: "relationship" as AnswerKey,
        label: "Aşk ve ilişkiler",
        description:
          "Geçmiş ilişkiler, güven, bağlanma veya yeni bir başlangıç.",
      },
      {
        key: "money" as AnswerKey,
        label: "Para ve bolluk",
        description:
          "Para algısı, görünürlük, bolluk bilinci ve tekrar eden döngüler.",
      },
      {
        key: "personal" as AnswerKey,
        label: "Kişisel dönüşüm",
        description:
          "Kendini tanıma, duygusal yükler ve içsel denge.",
      },
    ],
  },
  {
    title: "Nasıl bir çalışma biçimi sana daha uygun?",
    options: [
      {
        key: "clarity" as AnswerKey,
        label: "Bana özel ilerlesin",
        description:
          "İhtiyacıma göre şekillenen birebir bir süreç istiyorum.",
      },
      {
        key: "analysis" as AnswerKey,
        label: "Önce kendimi anlamak istiyorum",
        description:
          "Tarot veya numeroloji analiziyle mevcut durumumu görmek istiyorum.",
      },
      {
        key: "digital" as AnswerKey,
        label: "Kendi zamanımda uygulamak istiyorum",
        description:
          "Ses kayıtları ve dijital çalışmalar benim için daha uygun.",
      },
    ],
  },
];

const results: Record<AnswerKey, Result> = {
  relationship: {
    eyebrow: "ÖNERİLEN BAŞLANGIÇ",
    title: "Aşk ve İlişki Çalışmaları",
    description:
      "İlişki dinamiklerini, geçmişten kalan duygusal yükleri ve yeni bir başlangıç için ihtiyaç duyduğun içsel alanı keşfet.",
    href: "/calismalar/ask-ve-iliski",
  },
  money: {
    eyebrow: "ÖNERİLEN BAŞLANGIÇ",
    title: "Para Enerjisi Çalışmaları",
    description:
      "Para ile kurduğun ilişkiyi, bolluk algını ve tekrar eden sınırlayıcı döngülerini daha yakından incele.",
    href: "/calismalar/para-ve-bolluk",
  },
  personal: {
    eyebrow: "ÖNERİLEN BAŞLANGIÇ",
    title: "Birebir Seanslar",
    description:
      "Kişisel ihtiyacına göre planlanan, sana özel ve süreç odaklı bir çalışma alanıyla ilerle.",
    href: "/calismalar/birebir-seanslar",
  },
  clarity: {
    eyebrow: "SANA UYGUN ÇALIŞMA",
    title: "Birebir Seanslar",
    description:
      "Belirli bir alana odaklanmak ve süreci kişisel ihtiyacına göre ilerletmek için birebir çalışmalarla başlayabilirsin.",
    href: "/calismalar/birebir-seanslar",
  },
  analysis: {
    eyebrow: "SANA UYGUN ÇALIŞMA",
    title: "Tarot ve Numeroloji Analizleri",
    description:
      "Mevcut durumunu, yaşam temalarını ve tekrar eden örüntülerini farklı bir bakış açısıyla inceleyebilirsin.",
    href: "/calismalar/analizler",
  },
  digital: {
    eyebrow: "SANA UYGUN ÇALIŞMA",
    title: "Ses Kayıtları ve Frekanslar",
    description:
      "Kendi zamanında uygulayabileceğin meditasyon, dengeleme ve farkındalık odaklı dijital çalışmaları keşfet.",
    href: "/calismalar/ses-kayitlari",
  },
};

export default function WorkFinderSection() {
  const [step, setStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] =
    useState<AnswerKey | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const currentQuestion = questions[step];

  function handleSelect(answer: AnswerKey) {
    setSelectedAnswer(answer);
  }

  function handleContinue() {
    if (!selectedAnswer) return;

    if (step < questions.length - 1) {
      setStep((currentStep) => currentStep + 1);
      setSelectedAnswer(null);
      return;
    }

    setResult(results[selectedAnswer]);
  }

  function handleRestart() {
    setStep(0);
    setSelectedAnswer(null);
    setResult(null);
  }

  return (
    <section className="workFinderSection" id="calisma-bul">
      <div className="workFinderContainer">
        <header className="workFinderHeading">
          <p className="sectionEyebrow">
            <span>
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup>
            </span>

            <br />

            <span>ENERJİ EKOLÜ</span>

            <br />

            <span>SANA UYGUN ÇALIŞMAYI BUL</span>
          </p>

          <h2>
            Nereden başlayacağını
            <span> birlikte netleştirelim.</span>
          </h2>

          <p>
            Birkaç kısa seçim yap. Goldkozmos® Enerji Ekolü içindeki
            çalışmalar arasından ihtiyacına en yakın başlangıç noktasını
            keşfet.
          </p>
        </header>

        <div className="workFinderPanel">
          {!result ? (
            <>
              <div className="workFinderProgress">
                <div className="workFinderProgressText">
                  <span>
                    Adım {step + 1} / {questions.length}
                  </span>

                  <span>
                    %{Math.round(((step + 1) / questions.length) * 100)}
                  </span>
                </div>

                <div className="workFinderProgressBar">
                  <span
                    style={{
                      width: `${((step + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="workFinderQuestion">
                <p className="workFinderQuestionLabel">
                  KISA YÖNLENDİRME
                </p>

                <h3>{currentQuestion.title}</h3>
              </div>

              <div className="workFinderOptions">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.key;

                  return (
                    <button
                      className={`workFinderOption ${
                        isSelected ? "workFinderOptionSelected" : ""
                      }`}
                      type="button"
                      key={option.key}
                      onClick={() => handleSelect(option.key)}
                      aria-pressed={isSelected}
                    >
                      <span className="workFinderOptionCircle" />

                      <span className="workFinderOptionContent">
                        <strong>{option.label}</strong>
                        <small>{option.description}</small>
                      </span>

                      <span
                        className="workFinderOptionArrow"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="workFinderActions">
                {step > 0 ? (
                  <button
                    className="workFinderBackButton"
                    type="button"
                    onClick={() => {
                      setStep((currentStep) => currentStep - 1);
                      setSelectedAnswer(null);
                    }}
                  >
                    ← Geri Dön
                  </button>
                ) : (
                  <span />
                )}

                <button
                  className="workFinderContinueButton"
                  type="button"
                  disabled={!selectedAnswer}
                  onClick={handleContinue}
                >
                  {step === questions.length - 1
                    ? "Sonucumu Göster"
                    : "Devam Et"}

                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </>
          ) : (
            <div className="workFinderResult">
              <div className="workFinderResultIcon" aria-hidden="true">
                <span />
                <span />
              </div>

              <p className="workFinderResultEyebrow">
                {result.eyebrow}
              </p>

              <h3>{result.title}</h3>

              <p className="workFinderResultDescription">
                {result.description}
              </p>

              <div className="workFinderResultActions">
                <a href={result.href}>
                  Çalışmayı İncele
                  <span aria-hidden="true">↗</span>
                </a>

                <button type="button" onClick={handleRestart}>
                  Seçimleri Yeniden Yap
                </button>
              </div>

              <p className="workFinderResultNote">
                Bu yönlendirme genel bir başlangıç önerisidir. Çalışmaların
                detaylarını inceleyerek sana uygun seçeneği
                değerlendirebilirsin.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}