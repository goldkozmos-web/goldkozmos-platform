import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  DREAM_GUIDES,
  dictionaryStats,
  resolveDreamSearch,
  indexableDreams,
} from "../src/data/ruya-tabirleri/catalog.ts";

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

const editorial = indexableDreams();
assert.equal(editorial.length, 10);

const stats = dictionaryStats();
assert.ok(stats.canonical >= 1500, `canonical ${stats.canonical}`);
assert.ok(stats.aliases >= 5000, `aliases ${stats.aliases}`);
assert.ok(stats.categories >= 8, `categories ${stats.categories}`);
assert.equal(stats.indexable, 10);

for (const dream of editorial) {
  const text = body(dream);
  const lower = text.toLowerCase();
  const count = words(text);
  assert.ok(count >= 300, `${dream.slug} too short: ${count}`);
  assert.ok(count <= 1100, `${dream.slug} too long: ${count}`);
  for (const phrase of bannedPhrases) {
    assert.equal(lower.includes(phrase), false, `${dream.slug} has ${phrase}`);
  }
}

const mustHit = [
  "araba",
  "araba sürmek",
  "araba kazası",
  "siyah araba",
  "bebek",
  "erkek bebek",
  "kız bebek",
  "bebek emzirmek",
  "bebek arabası",
  "asker",
  "askere gitmek",
  "asker üniforması",
  "elbise",
  "kırmızı elbise",
  "siyah elbise",
  "balkon",
  "ayna",
  "anahtar",
  "çanta",
  "valiz",
  "anne",
  "baba",
  "kuzen",
  "hala",
  "teyze",
  "telefon",
  "bilgisayar",
  "Instagram",
  "hastane",
  "okul",
  "iş yeri",
  "ekmek",
  "kahve",
  "elma",
  "kedi",
  "köpek",
  "at",
  "kurt",
  "aslan",
  "balina",
  "arı",
  "kelebek",
  "yağmur",
  "kar",
  "deprem",
  "yangın",
];

for (const query of mustHit) {
  const { hits } = resolveDreamSearch(query, 8);
  assert.ok(hits.length > 0, `no hit for ${query}`);
}

console.log(JSON.stringify(stats, null, 2));
console.log("ok");
