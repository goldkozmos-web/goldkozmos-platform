import assert from "node:assert/strict";
import test from "node:test";

import { TAROT_DECK } from "../src/data/tarot/deck.ts";
import { CARD_ESSENCE } from "../src/data/tarot/essence.ts";
import {
  cardPositionReading,
  spreadSynthesis,
} from "../src/lib/tarot/reading.ts";
import type { TarotTopicId } from "../src/data/tarot/types.ts";

const banned =
  /enerji haritası|kartın tonu|kartların iklimi|açılıma ritim|mevcut dinamik|yanındaki kart/i;

function byId(id: string) {
  const card = TAROT_DECK.find((item) => item.id === id);
  assert.ok(card, id);
  return card;
}

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

test("every deck card has a real essence", () => {
  for (const card of TAROT_DECK) {
    assert.ok(CARD_ESSENCE[card.id], card.id);
  }
});

test("thoughts spread for 7 of cups, sun, 3 of swords is specific", () => {
  const cards = [byId("kupa-yedilisi"), byId("gunes"), byId("kilic-uclusu")];
  const mind = cardPositionReading(cards[0], "thoughts", 0);
  const heart = cardPositionReading(cards[1], "thoughts", 1);
  const move = cardPositionReading(cards[2], "thoughts", 2);
  const synth = spreadSynthesis(cards, "thoughts");

  assert.match(mind, /ihtimal|hayal|karar/i);
  assert.doesNotMatch(mind, /sıcaklık|ferahlık|kırgınlık/);
  assert.match(heart, /sıcak|açık|mutluluk|çekim/i);
  assert.match(move, /kırgın|incin|mesafe|temkin/i);
  assert.match(synth, /düşünce|duygu|yavaşlat/i);
  assert.doesNotMatch(mind, banned);
  assert.doesNotMatch(heart, banned);
  assert.doesNotMatch(move, banned);
  assert.doesNotMatch(synth, banned);
  assert.ok(words(mind) >= 70 && words(mind) <= 160, `mind ${words(mind)}`);
  assert.ok(words(heart) >= 70 && words(heart) <= 160, `heart ${words(heart)}`);
  assert.ok(words(move) >= 70 && words(move) <= 160, `move ${words(move)}`);
  assert.ok(words(synth) >= 220 && words(synth) <= 480, `synth ${words(synth)}`);
});

test("same card changes by position", () => {
  const lovers = byId("asiklar");
  const asThought = cardPositionReading(lovers, "thoughts", 0);
  const asFeeling = cardPositionReading(lovers, "thoughts", 1);
  assert.notEqual(asThought, asFeeling);
  assert.match(asThought, /düşünce/i);
  assert.match(asFeeling, /duygu/i);
});

test("same card changes by topic", () => {
  const ace = byId("kupa-asi");
  const love = cardPositionReading(ace, "love", 0);
  const career = cardPositionReading(ace, "career", 0);
  assert.notEqual(love, career);
  assert.match(love, /bağ|kalp|çekim|duygusal/i);
  assert.match(career, /iş|emek|değer/i);
});

test("no banned filler across topics for a sample of cards", () => {
  const topics: TarotTopicId[] = [
    "love",
    "thoughts",
    "career",
    "general",
    "development",
    "decision",
  ];
  const sample = TAROT_DECK.filter((_, index) => index % 7 === 0);
  for (const card of sample) {
    for (const topic of topics) {
      for (const index of [0, 1, 2]) {
        const text = cardPositionReading(card, topic, index);
        assert.doesNotMatch(text, banned, `${card.id} ${topic} ${index}`);
        assert.ok(words(text) >= 55, `${card.id} ${topic} ${index} ${words(text)}`);
      }
    }
  }
});
