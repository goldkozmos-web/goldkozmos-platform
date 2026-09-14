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
  "kartın iklimi",
  "mevcut dinamiklerin görünümüdür",
];

const readingBanned = [
  ...banned,
  "hikâye açılıyor",
  "hikaye açılıyor",
  "sahnenin öteki ucu",
  "kartların dokusu",
  "hikâyenin dokusu",
  "enerji haritası",
  "aynı cümleyi söyleyen",
  "aynı cümleyi paylaşmadan",
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
assert(wordCount(rThoughts) >= 70 && wordCount(rThoughts) <= 120, `TEST 1 thoughts length ${wordCount(rThoughts)}`);
assert(wordCount(rFeelings) >= 70 && wordCount(rFeelings) <= 120, `TEST 1 feelings length ${wordCount(rFeelings)}`);
assert(wordCount(rAction) >= 70 && wordCount(rAction) <= 120, `TEST 1 action length ${wordCount(rAction)}`);
assert(wordCount(synth) >= 180 && wordCount(synth) <= 520, `TEST 1 synth length ${wordCount(synth)}`);
assert(!synth.includes(rThoughts.slice(0, 80)), "TEST 1 synth copies card 1");
assert(!synth.includes(rFeelings.slice(0, 80)), "TEST 1 synth copies card 2");
assert(!/"Mevcut Durum" konumunda/.test(rThoughts), "old dictionary wrapper");

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

function assertSpread(
  label: string,
  topic: "thoughts" | "love" | "career" | "development",
  slugs: [string, string, string],
) {
  const drawn = slugs.map((slug) => getTarotCard(slug));
  assert(drawn.every(Boolean), `${label} missing cards`);
  const [a, b, c] = drawn as [NonNullable<(typeof drawn)[0]>, NonNullable<(typeof drawn)[0]>, NonNullable<(typeof drawn)[0]>];
  const p0 = cardPositionReading(a, topic, 0);
  const p1 = cardPositionReading(b, topic, 1);
  const p2 = cardPositionReading(c, topic, 2);
  const whole = spreadSynthesis([a, b, c], topic);
  assert(p0 !== p1 && p1 !== p2 && p0 !== p2, `${label} identical card blurbs`);
  assert(wordCount(p0) >= 70 && wordCount(p0) <= 120, `${label} p0 ${wordCount(p0)}`);
  assert(wordCount(p1) >= 70 && wordCount(p1) <= 120, `${label} p1 ${wordCount(p1)}`);
  assert(wordCount(p2) >= 70 && wordCount(p2) <= 120, `${label} p2 ${wordCount(p2)}`);
  assert(wordCount(whole) >= 180 && wordCount(whole) <= 520, `${label} synth ${wordCount(whole)}`);
  assert(whole.includes(a.name) && whole.includes(b.name) && whole.includes(c.name), `${label} synth missing names`);
  assert(!whole.includes(p0), `${label} synth is card 1 copy`);
  assert(!whole.includes(p1), `${label} synth is card 2 copy`);
  assert(!whole.includes(p2), `${label} synth is card 3 copy`);
  const blob = `${p0}\n${p1}\n${p2}\n${whole}`.toLocaleLowerCase("tr-TR");
  for (const phrase of readingBanned) {
    assert(!blob.includes(phrase), `${label} banned ${phrase}`);
  }
  assert(!/hikâye açılıyor|hikâyenin dokusu|aynı cümle/.test(blob), `${label} literary filler`);
  assert(
    /birlikte okuduğumda|ana mesajı/.test(whole.toLocaleLowerCase("tr-TR")),
    `${label} synth missing bakim structure`,
  );
  assert(!whole.includes("konumunda"), `${label} old wrapper`);
  assert(!whole.includes("GoldKozmos yorumunda"), `${label} old generator`);
  console.log(label, {
    p0: wordCount(p0),
    p1: wordCount(p1),
    p2: wordCount(p2),
    synth: wordCount(whole),
  });
  return whole;
}

assertSpread("SPREAD A thoughts", "thoughts", ["kupa-yedilisi", "gunes", "kilic-uclusu"]);
assertSpread("SPREAD B career", "career", ["kupa-kralicesi", "kilic-sekizlisi", "degnek-sovalyesi"]);
assertSpread("SPREAD C love", "love", ["tilsim-sekizlisi", "kilic-yedilisi", "gunes"]);

const goldLove = spreadSynthesis(
  [
    getTarotCard("kilic-dokuzlusu")!,
    getTarotCard("kilic-krali")!,
    getTarotCard("adalet")!,
  ],
  "love",
);
const goldLow = goldLove.toLocaleLowerCase("tr-TR");
assert(goldLove.includes("Kılıç Dokuzlusu") && goldLove.includes("Kılıç Kralı") && goldLove.includes("Adalet"), "GOLD missing names");
assert(/kaygı|zihinsel yük|belirsizlik/.test(goldLow), "GOLD missing anxiety reading");
assert(/kontrol|mantık|mesafe/.test(goldLow), "GOLD missing controlled other");
assert(/netleş|karar|gerçek/.test(goldLow), "GOLD missing clarification");
assert(!/kaygı \+ yargı \+ denge/.test(goldLove), "GOLD slogan triple");
for (const phrase of readingBanned) {
  assert(!goldLow.includes(phrase), `GOLD banned ${phrase}`);
}
assert(wordCount(goldLove) >= 220 && wordCount(goldLove) <= 520, `GOLD length ${wordCount(goldLove)}`);
console.log("GOLD love synth words", wordCount(goldLove));

console.log("ALL TAROT TESTS PASSED");
console.log("sample thoughts:\n", rThoughts, "\n");
console.log("sample career queen:\n", cardPositionReading(getTarotCard("kupa-kralicesi")!, "career", 0), "\n");
console.log(
  "sample career synth:\n",
  spreadSynthesis(
    [
      getTarotCard("kupa-kralicesi")!,
      getTarotCard("kilic-sekizlisi")!,
      getTarotCard("degnek-sovalyesi")!,
    ],
    "career",
  ),
  "\n",
);
