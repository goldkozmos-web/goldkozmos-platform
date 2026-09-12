import Link from "next/link";

import type { DreamGuide } from "../../data/ruya-tabirleri/types";
import { relatedDreamsOf } from "../../data/ruya-tabirleri/catalog";
import { ruyaPath } from "../../lib/ruya-tabirleri/urls";

function paras(text: string) {
  return text
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function RuyaArticle({ dream }: { dream: DreamGuide }) {
  const related = relatedDreamsOf(dream);

  return (
    <article className="ruyaArticle">
      {paras(dream.intro).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>{spiritualHeading(dream)}</h2>
      {paras(dream.spiritualMeaning).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>Rüyanın Enerji Mesajı</h2>
      {paras(dream.energyMessage).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>{headingForSymbol(dream)} Spiritüel Temsili</h2>
      {paras(dream.symbolism).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      {dream.variations.length > 0 ? (
        <>
          <h2>Rüyanın Detayına Göre Yorumları</h2>
          {dream.variations.map((item) => (
            <section key={item.heading}>
              <h3>{item.heading}</h3>
              <p>{item.body}</p>
            </section>
          ))}
        </>
      ) : null}

      <h2>Renklerin Spiritüel Anlamı</h2>
      {paras(dream.colorMeaning).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>Rüyadaki Mekanın Anlamı</h2>
      {paras(dream.placeMeaning).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>Rüyadaki Kişilerin veya Varlıkların Anlamı</h2>
      {paras(dream.peopleMeaning).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>Rüyada Hissettiğin Duygunun Spiritüel Anlamı</h2>
      {paras(dream.emotionMeaning).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>Aşk ve İlişkiler Açısından Anlamı</h2>
      {paras(dream.relationshipMeaning).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>İş, Para ve Yaşam Yolu Açısından Anlamı</h2>
      {paras(dream.careerMoneyMeaning).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>Enerji ve Dönüşüm Açısından Anlamı</h2>
      {paras(dream.transformationMeaning).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>Bu Rüya Sana Ne Anlatıyor Olabilir?</h2>
      {paras(dream.reflection).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      <h2>Kendine Sorabileceğin Sorular</h2>
      <ul>
        {dream.questions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Rüyanın Özeti</h2>
      {paras(dream.summary).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}

      {related.length > 0 ? (
        <>
          <h2>Benzer Rüyalar</h2>
          <ul className="ruyaRelated">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={ruyaPath(item.slug)}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  );
}

function spiritualHeading(dream: DreamGuide) {
  const map: Record<string, string> = {
    "ruyada-yilan-gormek": "Rüyada Yılan Görmenin Spiritüel Anlamı",
    "ruyada-eski-sevgiliyi-gormek": "Rüyada Eski Sevgiliyi Görmenin Spiritüel Anlamı",
    "ruyada-bebek-gormek": "Rüyada Bebek Görmenin Spiritüel Anlamı",
    "ruyada-deniz-gormek": "Rüyada Deniz Görmenin Spiritüel Anlamı",
    "ruyada-para-gormek": "Rüyada Para Görmenin Spiritüel Anlamı",
    "ruyada-kopek-gormek": "Rüyada Köpek Görmenin Spiritüel Anlamı",
    "ruyada-kedi-gormek": "Rüyada Kedi Görmenin Spiritüel Anlamı",
    "ruyada-dis-dokulmesi": "Rüyada Diş Dökülmesinin Spiritüel Anlamı",
    "ruyada-aglamak": "Rüyada Ağlamanın Spiritüel Anlamı",
    "ruyada-olmus-birini-gormek": "Rüyada Ölmüş Birini Görmenin Spiritüel Anlamı",
  };
  return map[dream.slug] ?? "Spiritüel Anlamı";
}

function headingForSymbol(dream: DreamGuide) {
  if (dream.slug === "ruyada-yilan-gormek") return "Yılan Sembolünün";
  if (dream.slug === "ruyada-eski-sevgiliyi-gormek") return "Eski Sevgili Sembolünün";
  if (dream.slug === "ruyada-bebek-gormek") return "Bebek Sembolünün";
  if (dream.slug === "ruyada-deniz-gormek") return "Deniz Sembolünün";
  if (dream.slug === "ruyada-para-gormek") return "Para Sembolünün";
  if (dream.slug === "ruyada-kopek-gormek") return "Köpek Sembolünün";
  if (dream.slug === "ruyada-kedi-gormek") return "Kedi Sembolünün";
  if (dream.slug === "ruyada-dis-dokulmesi") return "Diş Sembolünün";
  if (dream.slug === "ruyada-aglamak") return "Ağlamak Sembolünün";
  if (dream.slug === "ruyada-olmus-birini-gormek") return "Bu Ziyaretin";
  return "Sembolün";
}
