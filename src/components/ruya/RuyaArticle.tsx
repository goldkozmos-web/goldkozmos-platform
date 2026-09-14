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

function Block({ title, text }: { title: string; text?: string }) {
  if (!text?.trim()) return null;
  return (
    <>
      <h2>{title}</h2>
      {paras(text).map((item) => (
        <p key={item.slice(0, 48)}>{item}</p>
      ))}
    </>
  );
}

export default function RuyaArticle({ dream }: { dream: DreamGuide }) {
  const related = relatedDreamsOf(dream);

  return (
    <article className="ruyaArticle">
      {paras(dream.intro).map((item) => (
        <p key={item.slice(0, 48)}>{item}</p>
      ))}

      <Block title="Spiritüel Anlamı" text={dream.spiritualMeaning} />

      {dream.variations.length > 0 ? (
        <>
          <h2>Rüyanın Detayına Göre Anlamı</h2>
          {dream.variations.map((item) => (
            <section key={item.heading}>
              <h3>{item.heading}</h3>
              <p>{item.body}</p>
            </section>
          ))}
        </>
      ) : null}

      <Block title="Rüyadaki Duygu Ne Anlatıyor?" text={dream.emotionMeaning} />
      <Block title="Aşk ve İlişkiler" text={dream.relationshipMeaning} />
      <Block title="Para, İş ve Yaşam Yolu" text={dream.careerMoneyMeaning} />
      <Block title="Renk, Mekân ve Kişiler" text={combinedContext(dream)} />
      <Block title="Rüyanın Özeti" text={dream.summary} />

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

function combinedContext(dream: DreamGuide) {
  const parts = [dream.colorMeaning, dream.placeMeaning, dream.peopleMeaning]
    .map((item) => item?.trim())
    .filter(Boolean);
  return parts.length ? parts.join("\n\n") : undefined;
}
