import { SIGNS, genderPageBySlug, genderPageSlug } from "../../data/burclar/signs";
import { signOverviewCopy } from "../../data/burclar/overviews";
import { mergeProfile, PROFILE_EXTRA } from "../../data/burclar/expansions";
import { SCENES } from "../../data/burclar/scenes";
import type { BurcSearchHit, Gender, Sign } from "../../data/burclar/types";
import { composeMatch } from "./compose-match";
import { foldTurkish } from "./fold";
import { allCanonicalPairs, canonicalPair } from "./pairs";

const NOISE =
  /\b(burcu|burc|ozellikleri|ozellik|askta|ask|uyumu|uyum|nasil|nedir|ile|ve)\b/g;

export function soften(query: string) {
  const folded = foldTurkish(query);
  const stripped = folded.replace(NOISE, " ").replace(/\s+/g, " ").trim();
  return stripped.length >= 2 ? stripped : folded;
}

function score(query: string, haystacks: string[]) {
  const exact = foldTurkish(query);
  const soft = soften(query);
  let best = 0;
  for (const raw of haystacks) {
    const hay = foldTurkish(raw);
    best = Math.max(best, scorePair(exact, hay), scorePair(soft, hay));
  }
  return best;
}

function hasWord(hay: string, token: string) {
  return (
    hay === token ||
    hay.startsWith(`${token} `) ||
    hay.endsWith(` ${token}`) ||
    hay.includes(` ${token} `)
  );
}

function scorePair(needle: string, hay: string) {
  if (!needle) return 0;
  if (hay === needle) return 24;
  if (needle.length >= 4 && (hay.startsWith(needle) || needle.startsWith(hay))) return 16;
  if (hasWord(hay, needle)) return 18;
  if (needle.length >= 4 && hay.includes(needle)) return 12;
  const tokens = needle.split(" ").filter((part) => part.length > 1);
  if (tokens.length > 1 && tokens.every((part) => hasWord(hay, part) || hay.includes(part))) {
    return 10;
  }
  if (tokens.length === 1 && hasWord(hay, tokens[0])) return 8;
  return 0;
}

function genderAliases(sign: Sign, gender: Gender) {
  const noun = gender === "kadin" ? "kadin" : "erkek";
  const titled = gender === "kadin" ? "kadını" : "erkeği";
  return [
    `${sign.name} ${titled}`,
    `${sign.name} ${noun}`,
    `${sign.name} burcu ${titled}`,
    `${sign.name} burcu ${noun}`,
    `${sign.name} ${titled} özellikleri`,
    `${sign.slug} ${noun}`,
    gender === "kadin" ? `${sign.slug} kadini` : `${sign.slug} erkegi`,
  ];
}

function pairAliases(a: Sign, b: Sign) {
  const names = [
    `${a.name} ${b.name}`,
    `${b.name} ${a.name}`,
    `${a.name} ${b.name} uyumu`,
    `${b.name} ${a.name} uyumu`,
    `${a.name} ${b.name} aşk uyumu`,
    `${b.name} ${a.name} aşk uyumu`,
    `${a.name} ve ${b.name}`,
    `${b.name} ve ${a.name} aşk uyumu`,
    `${a.slug} ${b.slug}`,
    `${b.slug} ${a.slug}`,
  ];
  return names;
}

export function searchBurclar(query: string, limit = 8): BurcSearchHit[] {
  const needle = foldTurkish(query);
  if (needle.length < 2) return [];
  const hits: Array<BurcSearchHit & { score: number }> = [];

  for (const sign of SIGNS) {
    hits.push({
      title: `${sign.name} Burcu Özellikleri`,
      href: `/burclar/${sign.slug}`,
      hint: `${sign.symbol} ${sign.elementLabel}`,
      score: score(query, [
        sign.name,
        `${sign.name} burcu`,
        `${sign.name} burcu özellikleri`,
        `${sign.name} özellikleri`,
        sign.slug,
        `${sign.slug} burcu`,
      ]),
    });
    for (const gender of ["kadin", "erkek"] as const) {
      const aliases = genderAliases(sign, gender);
      hits.push({
        title: `${sign.name} Burcu ${gender === "kadin" ? "Kadını" : "Erkeği"} Özellikleri`,
        href: `/burclar/${genderPageSlug(sign, gender)}`,
        hint: `${sign.symbol} ${sign.elementLabel}`,
        score: score(query, aliases),
      });
    }
    hits.push({
      title: `${sign.name} Aşk Uyumu`,
      href: `/burc-uyumu`,
      hint: "Uyumu seç",
      score: score(query, [
        `${sign.name} uyumu`,
        `${sign.name} aşk uyumu`,
        `${sign.slug} uyum`,
      ]),
    });
  }

  for (const pair of allCanonicalPairs()) {
    let pairScore = score(query, pairAliases(pair.a, pair.b));
    const mentioned = SIGNS.filter(
      (sign) =>
        hasWord(needle, foldTurkish(sign.name)) || hasWord(needle, sign.slug),
    );
    if (
      mentioned.length >= 2 &&
      mentioned.some((sign) => sign.id === pair.a.id) &&
      mentioned.some((sign) => sign.id === pair.b.id)
    ) {
      pairScore += 20;
    }
    hits.push({
      title: pair.a.id === pair.b.id
        ? `${pair.a.name} ve ${pair.a.name} Aşk Uyumu`
        : `${pair.a.name} ve ${pair.b.name} Aşk Uyumu`,
      href: `/burc-uyumu/${pair.slug}`,
      hint: "Aşk uyumu",
      score: pairScore,
    });
  }

  return hits
    .filter((hit) => hit.score > 0)
    .sort((x, y) => y.score - x.score || x.title.localeCompare(y.title, "tr"))
    .slice(0, limit)
    .map(({ score: _s, ...hit }) => hit);
}

export function overviewHref(sign: Sign) {
  return `/burclar/${sign.slug}`;
}

export function profileHref(sign: Sign, gender: Gender) {
  return `/burclar/${genderPageSlug(sign, gender)}`;
}

export function composeOverviewMeta(sign: Sign) {
  const copy = signOverviewCopy(sign);
  return {
    sign,
    slug: sign.slug,
    h1: `${sign.name} Burcu Özellikleri`,
    seoTitle: `${sign.name} Burcu Özellikleri: Aşk, Karakter ve İlişkiler | GoldKozmos`,
    metaDescription: copy.metaDescription,
  };
}

export function matchHref(a: Sign["id"], b: Sign["id"]) {
  return `/burc-uyumu/${canonicalPair(a, b).slug}`;
}

export function resolveGenderPage(slug: string) {
  return genderPageBySlug(slug);
}

export function composeProfileMeta(sign: Sign, gender: Gender) {
  const titled = gender === "kadin" ? "Kadını" : "Erkeği";
  const slug = genderPageSlug(sign, gender);
  const who = `${sign.name} ${titled.toLocaleLowerCase("tr-TR")}`;
  return {
    sign,
    gender,
    slug,
    title: `${sign.name} Burcu ${titled} Özellikleri`,
    h1: `${sign.name} Burcu ${titled} Özellikleri`,
    seoTitle: `${sign.name} ${titled} Özellikleri: Aşk, İlişkiler ve Karakteri | GoldKozmos`,
    metaDescription: (gender === "kadin" ? sign.woman.intro : sign.man.intro)
      .replace(/\s+/g, " ")
      .slice(0, 158),
    profile: mergeProfile(
      mergeProfile(
        gender === "kadin" ? sign.woman : sign.man,
        PROFILE_EXTRA[sign.id][gender],
      ),
      { character: SCENES[sign.id][gender] },
    ),
    who,
  };
}

export function allMatchArticles() {
  return allCanonicalPairs().map((pair) => composeMatch(pair.a, pair.b));
}
