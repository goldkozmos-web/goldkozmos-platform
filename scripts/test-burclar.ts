import assert from "node:assert/strict";
import { SIGNS, genderPageSlug } from "../src/data/burclar/signs";
import { composeMatch, matchBySlug } from "../src/lib/burclar/compose-match";
import { allCanonicalPairs, canonicalPair, pairSlug } from "../src/lib/burclar/pairs";
import { composeProfileMeta, searchBurclar } from "../src/lib/burclar/search";

assert.equal(SIGNS.length, 12);
assert.equal(allCanonicalPairs().length, 78);

const akrepKoc = canonicalPair("akrep", "koc");
assert.equal(akrepKoc.slug, "akrep-koc");
assert.equal(pairSlug("koc", "akrep"), "akrep-koc");
assert.equal(matchBySlug("koc-akrep"), null);
assert.equal(matchBySlug("akrep-koc")?.h1, "Akrep ve Koç Aşk Uyumu");

const man = searchBurclar("akrep erkek");
assert.ok(
  man[0]?.href.endsWith("/burclar/akrep-erkegi"),
  `akrep erkek -> ${man[0]?.href}`,
);

const woman = searchBurclar("akrep kadını");
assert.ok(woman[0]?.href.endsWith("/burclar/akrep-kadini"), woman[0]?.href);

const matchSearch = searchBurclar("Akrep Koç aşk uyumu");
assert.ok(
  matchSearch[0]?.href.endsWith("/burc-uyumu/akrep-koc"),
  matchSearch[0]?.href,
);

const reverseSearch = searchBurclar("Koç Akrep uyumu");
assert.ok(
  reverseSearch[0]?.href.endsWith("/burc-uyumu/akrep-koc"),
  reverseSearch[0]?.href,
);

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function profileWords(sign: (typeof SIGNS)[number], gender: "kadin" | "erkek") {
  const page = composeProfileMeta(sign, gender);
  const p = page.profile;
  return words(
    [
      p.intro,
      p.character,
      p.inLove,
      p.values,
      p.whenInterested,
      p.whenDistant,
      p.feelingsShown,
      p.strengths,
      p.challenges,
      p.workLife,
      p.summary,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

const akrepW = profileWords(SIGNS.find((s) => s.id === "akrep")!, "kadin");
const akrepM = profileWords(SIGNS.find((s) => s.id === "akrep")!, "erkek");
const kocW = profileWords(SIGNS.find((s) => s.id === "koc")!, "kadin");
const kocM = profileWords(SIGNS.find((s) => s.id === "koc")!, "erkek");
assert.ok(akrepW >= 600, `akrep kadin ${akrepW}`);
assert.ok(akrepM >= 600, `akrep erkek ${akrepM}`);
assert.ok(kocW >= 600, `koc kadin ${kocW}`);
assert.ok(kocM >= 600, `koc erkek ${kocM}`);

for (const sign of SIGNS) {
  for (const gender of ["kadin", "erkek"] as const) {
    const n = profileWords(sign, gender);
    assert.ok(n >= 250, `${sign.id} ${gender} ${n}`);
  }
}

const akrepWomanIntro = composeProfileMeta(
  SIGNS.find((s) => s.id === "akrep")!,
  "kadin",
).profile.intro;
const akrepManIntro = composeProfileMeta(
  SIGNS.find((s) => s.id === "akrep")!,
  "erkek",
).profile.intro;
assert.notEqual(akrepWomanIntro, akrepManIntro.replaceAll("erkeği", "kadını"));

const match = composeMatch(akrepKoc.a, akrepKoc.b);
const matchWords = words(
  [
    match.intro,
    match.attraction,
    match.emotional,
    match.communication,
    match.trust,
    match.passion,
    match.friction,
    match.strengthen,
    match.womanAManB,
    match.manAWomanB,
    match.longTerm,
    match.summary,
  ].join(" "),
);
assert.ok(matchWords >= 700, `akrep-koc words ${matchWords}`);
assert.notEqual(match.womanAManB, match.manAWomanB);

const other = composeMatch(
  SIGNS.find((s) => s.id === "akrep")!,
  SIGNS.find((s) => s.id === "boga")!,
);
assert.notEqual(match.friction, other.friction);
assert.notEqual(match.intro, other.intro);

const metas = new Set<string>();
for (const sign of SIGNS) {
  for (const gender of ["kadin", "erkek"] as const) {
    const meta = composeProfileMeta(sign, gender).metaDescription;
    assert.ok(!metas.has(meta), `dup meta ${sign.id} ${gender}`);
    metas.add(meta);
    assert.equal(
      genderPageSlug(sign, gender),
      gender === "kadin" ? `${sign.slug}-kadini` : `${sign.slug}-erkegi`,
    );
  }
}

console.log("akrep kadin", akrepW, "erkek", akrepM, "koc kadin", kocW, "erkek", kocM);
console.log("akrep-koc words", matchWords);
console.log("ok");
