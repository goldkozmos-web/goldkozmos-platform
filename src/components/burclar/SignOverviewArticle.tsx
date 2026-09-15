import Link from "next/link";

import type { Sign } from "../../data/burclar/types";
import { signOverviewCopy } from "../../data/burclar/overviews";
import { signById } from "../../data/burclar/signs";
import { matchHref, profileHref } from "../../lib/burclar/search";

function paras(text: string) {
  return text
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h2>{title}</h2>
      {paras(text).map((item) => (
        <p key={item.slice(0, 48)}>{item}</p>
      ))}
    </>
  );
}

export default function SignOverviewArticle({ sign }: { sign: Sign }) {
  const copy = signOverviewCopy(sign);
  const matches = sign.bestMatches
    .map((id) => signById(id))
    .filter((item): item is Sign => Boolean(item));
  const planets = sign.rulingPlanets.join(" ve ");

  return (
    <article className="burcArticle">
      <Block title={`${sign.name} Burcu Kısaca`} text={copy.brief} />
      <Block title="Tarih Aralığı" text={copy.dateRange} />
      <Block title="Elementi" text={copy.element} />
      <Block title="Niteliği" text={copy.modality} />
      <Block title="Yönetici Gezegeni" text={copy.ruling} />
      <Block title="Temel Karakter Özellikleri" text={copy.character} />
      <Block title="Güçlü Yönleri" text={copy.strengths} />
      <Block title="Zorlayıcı Yönleri" text={copy.challenges} />
      <Block title={`Aşkta ${sign.name}`} text={copy.love} />
      <Block title={`İlişkilerde ${sign.name}`} text={copy.relationships} />
      <Block title={`Arkadaşlıkta ${sign.name}`} text={copy.friendship} />
      <Block title="İş ve Kariyerde" text={copy.career} />

      <h2>{sign.name} Kadını</h2>
      {paras(copy.woman).map((item) => (
        <p key={item.slice(0, 48)}>{item}</p>
      ))}
      <p>
        <Link href={profileHref(sign, "kadin")}>
          {sign.name} Burcu Kadını Özellikleri
        </Link>
      </p>

      <h2>{sign.name} Erkeği</h2>
      {paras(copy.man).map((item) => (
        <p key={item.slice(0, 48)}>{item}</p>
      ))}
      <p>
        <Link href={profileHref(sign, "erkek")}>
          {sign.name} Burcu Erkeği Özellikleri
        </Link>
      </p>

      <h2>{sign.name} Burcu Aşk Uyumu</h2>
      {paras(copy.compatibility).map((item) => (
        <p key={item.slice(0, 48)}>{item}</p>
      ))}
      <p>
        {sign.name} burcunun {sign.elementLabel.toLocaleLowerCase("tr-TR")} elementi ve{" "}
        {planets} damarı, editorial haritada özellikle şu burçlarla daha az çeviri
        isteyebilir:
      </p>
      <ul className="burcLinks">
        {matches.map((other) => (
          <li key={other.id}>
            <Link href={matchHref(sign.id, other.id)}>
              {sign.name} ve {other.name} Aşk Uyumu
            </Link>
          </li>
        ))}
      </ul>
      <p>
        Tüm kombinasyonlar için{" "}
        <Link href="/burc-uyumu">Burç Aşk Uyumu</Link> sayfasına dön.
      </p>
    </article>
  );
}
