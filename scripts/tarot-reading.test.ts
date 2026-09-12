import assert from "node:assert/strict";
import test from "node:test";

import { TAROT_DECK } from "../src/data/tarot/catalog.ts";
import {
  cardPositionReading,
  spreadSynthesis,
} from "../src/lib/tarot/reading.ts";
import type { TarotTopicId } from "../src/data/tarot/types.ts";

const banned =
  /enerji haritasıdır|öğreti damgasını vurur|ritmini bu tondan geçirir|ilk kart sahnenin zeminini kurar|ikinci kart o zemine|üçüncü kart ise mevcut dinamikler|kartın tonu|kartların ritmi|ikinci bir ritim|iklim oluşturur|mevcut dinamiklerin .+ aracılığıyla görünmesidir|mevcut dinamikler/i;

function byId(id: string) {
  const card = TAROT_DECK.find((item) => item.id === id);
  assert.ok(card, id);
  assert.ok(card.loveMeaning, `${id} loveMeaning`);
  assert.ok(card.thoughtsMeaning, `${id} thoughtsMeaning`);
  assert.ok(card.feelingsMeaning, `${id} feelingsMeaning`);
  assert.ok(card.actionMeaning, `${id} actionMeaning`);
  assert.ok(card.careerMeaning, `${id} careerMeaning`);
  assert.ok(card.generalMeaning, `${id} generalMeaning`);
  assert.ok(card.adviceMeaning, `${id} adviceMeaning`);
  assert.ok(card.futurePotential, `${id} futurePotential`);
  return card;
}

test("every live deck card has reading fields", () => {
  assert.equal(TAROT_DECK.length, 78);
  for (const card of TAROT_DECK) {
    byId(card.id);
  }
});

test("love spread Aziz + Tılsım Üçlüsü + Tılsım Prensi is a real reading", () => {
  const cards = [byId("aziz"), byId("tilsim-uclusu"), byId("tilsim-prensi")];
  const now = cardPositionReading(cards[0], "love", 0);
  const other = cardPositionReading(cards[1], "love", 1);
  const path = cardPositionReading(cards[2], "love", 2);
  const synth = spreadSynthesis(cards, "love");

  assert.match(now, /ciddiyet|değer|çerçeve|güven/i);
  assert.doesNotMatch(now, /öğreti enerjisini taşır/i);
  assert.match(other, /emek|inşa|süreklilik/i);
  assert.match(path, /somut|yavaş|küçük|adım/i);
  assert.match(synth, /ciddiyet|emek|yavaş/i);
  assert.doesNotMatch(now, banned);
  assert.doesNotMatch(other, banned);
  assert.doesNotMatch(path, banned);
  assert.doesNotMatch(synth, banned);
  assert.doesNotMatch(synth, /birinci kart|ikinci kart|üçüncü kart/i);
});

test("same card changes by position and topic", () => {
  const lovers = byId("asiklar");
  const asThought = cardPositionReading(lovers, "thoughts", 0);
  const asFeeling = cardPositionReading(lovers, "thoughts", 1);
  assert.notEqual(asThought, asFeeling);
  const ace = byId("kupa-asi");
  assert.notEqual(
    cardPositionReading(ace, "love", 0),
    cardPositionReading(ace, "career", 0),
  );
});

test("no banned filler in sample readings", () => {
  const topics: TarotTopicId[] = [
    "love",
    "thoughts",
    "career",
    "general",
    "development",
    "decision",
  ];
  for (const card of TAROT_DECK.filter((_, index) => index % 6 === 0)) {
    for (const topic of topics) {
      for (const index of [0, 1, 2]) {
        const text = cardPositionReading(card, topic, index);
        assert.doesNotMatch(text, banned, `${card.id} ${topic} ${index}`);
      }
    }
  }
});
