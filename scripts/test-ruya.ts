import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DREAM_GUIDES } from "../src/data/ruya-tabirleri/catalog";

const bannedHeadings = [
  "enerji mesajı",
  "spiritüel temsili",
  "enerji ve dönüşüm",
  "bu rüya sana ne",
  "sembolün enerjisi",
  "kendine sorabileceğin",
];

const bannedPhrases = [
  "psikolojik",
  "bilinçaltı",
  "travma",
  "terapi",
  "kesin gelecek",
  "kesin para gelecek",
];

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function body(dream: (typeof DREAM_GUIDES)[number]) {
  return [
    dream.intro,
    dream.spiritualMeaning,
    ...dream.variations.flatMap((item) => [item.heading, item.body]),
    dream.emotionMeaning,
    dream.relationshipMeaning,
    dream.careerMoneyMeaning,
    dream.colorMeaning,
    dream.placeMeaning,
    dream.peopleMeaning,
    dream.summary,
  ]
    .filter(Boolean)
    .join("\n");
}

const article = readFileSync("src/components/ruya/RuyaArticle.tsx", "utf8").toLowerCase();
for (const heading of bannedHeadings) {
  assert.equal(article.includes(heading), false, `article still has ${heading}`);
}

assert.equal(DREAM_GUIDES.length, 10);

for (const dream of DREAM_GUIDES) {
  const text = body(dream);
  const lower = text.toLowerCase();
  const count = words(text);
  assert.ok(count >= 300, `${dream.slug} too short: ${count}`);
  assert.ok(count <= 1100, `${dream.slug} too long: ${count}`);
  for (const phrase of bannedPhrases) {
    assert.equal(lower.includes(phrase), false, `${dream.slug} has ${phrase}`);
  }
  const starts = dream.spiritualMeaning
    .split(/\n+/)
    .filter(Boolean)
    .filter((para) => /^rüyada /i.test(para)).length;
  assert.ok(starts <= 1, `${dream.slug} spiritual paras start with Rüyada`);
}

console.log(
  DREAM_GUIDES.map((dream) => `${dream.slug} ${words(body(dream))}`).join("\n"),
);
console.log("ok");
