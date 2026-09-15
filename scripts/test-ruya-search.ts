import assert from "node:assert/strict";
import { DREAM_GUIDES, dreamBySlug, searchDreams } from "../src/data/ruya-tabirleri/catalog";
import { DREAM_LEXICON } from "../src/data/ruya-tabirleri/lexicon";
import { foldTurkish } from "../src/lib/ruya-tabirleri/search";

assert.equal(DREAM_GUIDES.length, 10);
assert.ok(DREAM_LEXICON.length >= 180, `lexicon titles ${DREAM_LEXICON.length}`);

const aliasCount = DREAM_LEXICON.reduce((sum, item) => sum + item.aliases.length, 0);
assert.ok(aliasCount >= 400, `alias count ${aliasCount}`);

assert.equal(foldTurkish("kırmızı elbise"), foldTurkish("kirmizi elbise"));

const red = searchDreams("kirmizi elbise");
assert.ok(
  red.some((hit) => /kirmizi elbise|kırmızı elbise/i.test(hit.title)),
  `kirmizi elbise -> ${red.map((hit) => hit.title).join(", ")}`,
);

const cat = searchDreams("siyah kedi");
assert.ok(cat[0]?.href?.includes("ruyada-kedi-gormek"), `siyah kedi ${JSON.stringify(cat[0])}`);

const talk = searchDreams("eski sevgiliyle konuşmak");
assert.ok(talk[0]?.href?.includes("eski-sevgili"), `eski sevgili ${JSON.stringify(talk[0])}`);

const swim = searchDreams("denizde yüzmek");
assert.ok(swim[0]?.href?.includes("deniz"), `deniz ${JSON.stringify(swim[0])}`);

const soldier = searchDreams("asker");
assert.ok(soldier.some((hit) => /asker/i.test(hit.title)), `asker ${soldier.map((h) => h.title)}`);
assert.equal(soldier.find((hit) => /asker/i.test(hit.title))?.ready, false);
assert.equal(dreamBySlug("ruyada-asker-gormek"), null);

const plane = searchDreams("uçakta olmak");
assert.ok(plane.some((hit) => /uçakta/i.test(hit.title)), `ucakta ${plane.map((h) => h.title)}`);
assert.equal(plane.find((hit) => /uçakta/i.test(hit.title))?.ready, false);

const door = searchDreams("kapının açılması");
assert.ok(door.some((hit) => /kapı/i.test(hit.title)));

const news = searchDreams("askerden haber almak");
assert.ok(news.some((hit) => /asker/i.test(hit.title) && !hit.ready));

for (const dream of DREAM_GUIDES) {
  assert.ok(dream.aliases.length > 3, dream.slug);
  assert.ok(dream.normalizedSearchTerms.length > 3, dream.slug);
}

console.log(`lexicon ${DREAM_LEXICON.length} titles, ${aliasCount} aliases`);
console.log("ok");
