import { TAROT_DECK, getTarotCard } from "../src/data/tarot/deck";
import {
  cardPositionReading,
  spreadSynthesis,
  wordCount,
} from "../src/lib/tarot/compose";

const banned = [
  "enerji haritası",
  "kartların ritmi",
  "kartın tonu",
  "sahnenin zemini",
  "ikinci bir ritim",
  "damgasını vurur",
];

function fail(message: string): never {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function assert(cond: boolean, message: string) {
  if (!cond) fail(message);
}

const seven = getTarotCard("kupa-yedilisi");
const sun = getTarotCard("gunes");
const three = getTarotCard("kilic-uclusu");
const pent8 = getTarotCard("tilsim-sekizlisi");
const sword7 = getTarotCard("kilic-yedilisi");

assert(TAROT_DECK.length === 78, `deck size ${TAROT_DECK.length}`);
assert(Boolean(seven && sun && three && pent8 && sword7), "missing test cards");
if (!seven || !sun || !three || !pent8 || !sword7) fail("cards");

const slugs = new Set(TAROT_DECK.map((card) => card.slug));
assert(slugs.size === 78, "duplicate slugs");

for (const card of TAROT_DECK) {
  const fields = [
    card.generalMeaning,
    card.coreThemes.join(" "),
    card.loveMeaning,
    card.relationshipMeaning,
    card.thoughtsMeaning,
    card.feelingsMeaning,
    card.actionMeaning,
    card.careerMeaning,
    card.moneyMeaning,
    card.futurePotential,
    card.adviceMeaning,
    card.shadowMeaning,
    card.reversedMeaning,
    card.symbols,
    card.spiritualMeaning,
  ];
  assert(fields.every(Boolean), `${card.slug} missing field`);
  assert(
    card.thoughtsMeaning !== card.feelingsMeaning,
    `${card.slug} thoughts==feelings`,
  );
  assert(card.loveMeaning !== card.careerMeaning, `${card.slug} love==career`);
  const blob = fields.join("\n").toLocaleLowerCase("tr-TR");
  for (const phrase of banned) {
    assert(!blob.includes(phrase), `${card.slug} banned: ${phrase}`);
  }
}

const rThoughts = cardPositionReading(seven, "thoughts", 0);
const rFeelings = cardPositionReading(sun, "thoughts", 1);
const rAction = cardPositionReading(three, "thoughts", 2);
const synth = spreadSynthesis([seven, sun, three], "thoughts");

console.log("TEST 1 word counts", {
  thoughts: wordCount(rThoughts),
  feelings: wordCount(rFeelings),
  action: wordCount(rAction),
  synth: wordCount(synth),
});

assert(rThoughts !== rFeelings && rFeelings !== rAction && rThoughts !== rAction, "TEST 1 same paragraphs");
assert(rThoughts.includes("Kupa Yedilisi") || rThoughts.toLocaleLowerCase("tr-TR").includes("düşün"), "TEST 1 thoughts not about mind");
assert(rFeelings.toLocaleLowerCase("tr-TR").includes("duyg"), "TEST 1 feelings missing duygu");
assert(
  rAction.toLocaleLowerCase("tr-TR").includes("davran") ||
    rAction.toLocaleLowerCase("tr-TR").includes("yaklaş") ||
    rAction.toLocaleLowerCase("tr-TR").includes("adım"),
  "TEST 1 action missing behavior",
);
assert(wordCount(rThoughts) >= 90 && wordCount(rThoughts) <= 170, `TEST 1 thoughts length ${wordCount(rThoughts)}`);
assert(wordCount(rFeelings) >= 90 && wordCount(rFeelings) <= 170, `TEST 1 feelings length ${wordCount(rFeelings)}`);
assert(wordCount(rAction) >= 90 && wordCount(rAction) <= 170, `TEST 1 action length ${wordCount(rAction)}`);
assert(wordCount(synth) >= 250 && wordCount(synth) <= 450, `TEST 1 synth length ${wordCount(synth)}`);

const sevenFeel = cardPositionReading(seven, "thoughts", 1);
assert(rThoughts !== sevenFeel, "TEST 2 same paragraph for seven of cups");
assert(
  rThoughts.toLocaleLowerCase("tr-TR").includes("zihin") ||
    rThoughts.toLocaleLowerCase("tr-TR").includes("senaryo") ||
    rThoughts.toLocaleLowerCase("tr-TR").includes("düşün"),
  "TEST 2 thoughts not mind-specific",
);
assert(
  sevenFeel.toLocaleLowerCase("tr-TR").includes("duyg") ||
    sevenFeel.toLocaleLowerCase("tr-TR").includes("his"),
  "TEST 2 feelings not heart-specific",
);

const love8 = cardPositionReading(pent8, "love", 0);
const career8 = cardPositionReading(pent8, "career", 0);
assert(love8 !== career8, "TEST 3 same love/career paragraph");
assert(
  love8.toLocaleLowerCase("tr-TR").includes("ilişki") ||
    love8.toLocaleLowerCase("tr-TR").includes("aşk") ||
    love8.toLocaleLowerCase("tr-TR").includes("bağ"),
  "TEST 3 love missing relationship lens",
);
assert(
  career8.toLocaleLowerCase("tr-TR").includes("iş") ||
    career8.toLocaleLowerCase("tr-TR").includes("emek") ||
    career8.toLocaleLowerCase("tr-TR").includes("ustal"),
  "TEST 3 career missing work lens",
);

const dict = [
  sword7.generalMeaning,
  sword7.loveMeaning,
  sword7.thoughtsMeaning,
  sword7.feelingsMeaning,
  sword7.actionMeaning,
  sword7.careerMeaning,
  sword7.futurePotential,
  sword7.adviceMeaning,
];
const uniqueDict = new Set(dict);
assert(uniqueDict.size === dict.length, "TEST 4 duplicate dictionary sections");
assert(
  sword7.generalMeaning.toLocaleLowerCase("tr-TR").includes("giz") ||
    sword7.generalMeaning.toLocaleLowerCase("tr-TR").includes("strateji"),
  "TEST 4 seven of swords weak general",
);
assert(!sword7.generalMeaning.includes("yalnızca strateji enerjisini temsil eder"), "TEST 4 generic leftover");

const production = [rThoughts, rFeelings, rAction, sevenFeel, love8, career8, synth, ...TAROT_DECK.flatMap((card) => [
  card.generalMeaning,
  card.loveMeaning,
  card.thoughtsMeaning,
  card.feelingsMeaning,
  card.actionMeaning,
])].join("\n");
for (const phrase of banned) {
  assert(!production.toLocaleLowerCase("tr-TR").includes(phrase), `TEST 5 banned in production: ${phrase}`);
}

const prince = getTarotCard("kupa-prensi");
const knight = getTarotCard("kupa-sovalyesi");
assert(Boolean(prince && knight && prince.generalMeaning !== knight.generalMeaning), "court cups cloned");

console.log("ALL TAROT TESTS PASSED");
console.log("sample thoughts:\n", rThoughts, "\n");
console.log("sample feelings seven:\n", sevenFeel, "\n");
console.log("sample sun feelings:\n", rFeelings, "\n");
console.log("sample action:\n", rAction, "\n");
console.log("synth words", wordCount(synth));
