import Link from "next/link";

import type { MatchArticle } from "../../data/burclar/types";
import { overviewHref, profileHref } from "../../lib/burclar/search";

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

export default function MatchArticleView({ match }: { match: MatchArticle }) {
  const { a, b, scores } = match;
  const self = a.id === b.id;

  return (
    <article className="burcArticle">
      <div className="burcScores" aria-label="Editorial uyum okuması">
        <p>
          Çekim: <span>{scores.attraction}</span>
        </p>
        <p>
          İletişim: <span>{scores.communication}</span>
        </p>
        <p>
          Duygusal Uyum: <span>{scores.emotional}</span>
        </p>
        <p>
          Güven: <span>{scores.trust}</span>
        </p>
        <p>
          Uzun vadeli denge: <span>{scores.longTerm}</span>
        </p>
        <p className="burcNote">
          Bu dereceler bilimsel ölçüm değil; astrolojik içerikteki editoryal bir
          okumadır.
        </p>
      </div>
      <Block title="Kısa Uyum Özeti" text={match.intro} />
      <Block title="İlk Çekim" text={match.attraction} />
      <Block title="Duygusal Uyum" text={match.emotional} />
      <Block title="İletişim Uyumu" text={match.communication} />
      <Block title="Güven ve Bağlılık" text={match.trust} />
      <Block title="Tutku ve Fiziksel Çekim" text={match.passion} />
      <Block title="Zorlanabilecekleri Noktalar" text={match.friction} />
      <Block title="İlişkiyi Güçlendiren Şeyler" text={match.strengthen} />
      <Block
        title={
          self
            ? `${a.name} Kadını + ${a.name} Erkeği`
            : `${a.name} Kadını + ${b.name} Erkeği`
        }
        text={match.womanAManB}
      />
      <Block
        title={
          self
            ? `${a.name} Erkeği + ${a.name} Kadını`
            : `${a.name} Erkeği + ${b.name} Kadını`
        }
        text={match.manAWomanB}
      />
      <Block title="Uzun Vadede Uyum" text={match.longTerm} />
      <Block title="Uyum Özeti" text={match.summary} />
      <h2>Burç Profilleri</h2>
      <ul className="burcLinks">
        <li>
          <Link href={overviewHref(a)}>{a.name} Burcu Özellikleri</Link>
        </li>
        <li>
          <Link href={profileHref(a, "kadin")}>{a.name} Kadını Özellikleri</Link>
        </li>
        <li>
          <Link href={profileHref(a, "erkek")}>{a.name} Erkeği Özellikleri</Link>
        </li>
        {self ? null : (
          <>
            <li>
              <Link href={overviewHref(b)}>{b.name} Burcu Özellikleri</Link>
            </li>
            <li>
              <Link href={profileHref(b, "kadin")}>{b.name} Kadını Özellikleri</Link>
            </li>
            <li>
              <Link href={profileHref(b, "erkek")}>{b.name} Erkeği Özellikleri</Link>
            </li>
          </>
        )}
      </ul>
    </article>
  );
}
