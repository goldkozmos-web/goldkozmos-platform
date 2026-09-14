import Link from "next/link";

import type { Gender, Sign, SignProfile } from "../../data/burclar/types";
import { matchHref, profileHref } from "../../lib/burclar/search";
import { signById } from "../../data/burclar/signs";

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
        <p key={item.slice(0, 40)}>{item}</p>
      ))}
    </>
  );
}

export default function ProfileArticle({
  sign,
  gender,
  profile,
}: {
  sign: Sign;
  gender: Gender;
  profile: SignProfile;
}) {
  const titled = gender === "kadin" ? "Kadını" : "Erkeği";
  const matches = sign.bestMatches
    .map((id) => signById(id))
    .filter((item): item is Sign => Boolean(item));

  return (
    <article className="burcArticle">
      {paras(profile.intro).map((item) => (
        <p key={item.slice(0, 40)}>{item}</p>
      ))}
      <Block title="Karakteri" text={profile.character} />
      <Block title="Aşkta Nasıl?" text={profile.inLove} />
      {gender === "erkek" ? (
        <>
          <Block title="Hoşlandığında Nasıl Davranır?" text={profile.whenInterested} />
          <Block title="İlişkide Neye Önem Verir?" text={profile.values} />
          <Block title="Duygularını Nasıl Gösterir?" text={profile.feelingsShown} />
        </>
      ) : (
        <>
          <Block title="İlişkide Neye Önem Verir?" text={profile.values} />
          <Block title="Hoşlandığında Nasıl Davranır?" text={profile.whenInterested} />
        </>
      )}
      <Block title="Uzaklaştığında Nasıl Davranabilir?" text={profile.whenDistant} />
      <Block title="Güçlü Yönleri" text={profile.strengths} />
      <Block title="Zorlayıcı Yönleri" text={profile.challenges} />
      <Block title="İş ve Günlük Hayatta" text={profile.workLife} />
      <h2>
        {gender === "kadin"
          ? "Hangi Burçlarla Daha Kolay Uyum Sağlayabilir?"
          : "Aşk Uyumu"}
      </h2>
      <p>
        {sign.name} {titled.toLocaleLowerCase("tr-TR")} sayfasındaki uyum bağlantıları,
        editorial bir haritadır; kader cümlesi değildir.{" "}
        {sign.name} burcunun {sign.elementLabel.toLocaleLowerCase("tr-TR")} elementi ve{" "}
        {sign.rulingPlanets.join(" / ")} damarı, özellikle şu burçlarla daha az çeviri
        isteyebilir:
      </p>
      <ul className="burcLinks">
        {matches.map((other) => (
          <li key={other.id}>
            <Link href={matchHref(sign.id, other.id)}>
              {sign.name} & {other.name} Aşk Uyumu
            </Link>
          </li>
        ))}
      </ul>
      <p>
        {sign.name} kadını ve {sign.name} erkeği profilleri ayrı yazılmıştır:{" "}
        <Link href={profileHref(sign, "kadin")}>{sign.name} Kadını Özellikleri</Link>
        {" · "}
        <Link href={profileHref(sign, "erkek")}>{sign.name} Erkeği Özellikleri</Link>
      </p>
      <Block
        title={
          gender === "kadin"
            ? `${sign.name} Kadınının Özeti`
            : "Kısa Özet"
        }
        text={profile.summary}
      />
    </article>
  );
}
