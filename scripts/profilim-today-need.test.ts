import assert from "node:assert/strict";
import test from "node:test";

import { meditationFilterFromFocus } from "../src/data/meditation.ts";
import {
  TODAY_NEED_CHOICES,
  goldmindUrlForFocus,
  isTodayNeedChoiceId,
} from "../src/lib/profilim/todayNeed.ts";

test("today-need choices include the six dashboard options", () => {
  const labels = TODAY_NEED_CHOICES.map((choice) => choice.label);
  assert.deepEqual(labels, [
    "Sakinleşmek",
    "Odaklanmak",
    "Kendimi anlamak",
    "Yazmak",
    "Nefes almak",
    "Dinlenmek",
  ]);
  assert.equal(isTodayNeedChoiceId("calm"), true);
  assert.ok(TODAY_NEED_CHOICES.every((choice) => choice.action));
});

test("today-need choices route to GoldMind, journal, or awareness", () => {
  const byId = Object.fromEntries(
    TODAY_NEED_CHOICES.map((choice) => [choice.id, choice.action]),
  );

  assert.deepEqual(byId.calm, { type: "goldmind", focus: "sakinles" });
  assert.deepEqual(byId.focus, { type: "goldmind", focus: "odaklanma" });
  assert.deepEqual(byId.breathe, { type: "goldmind", focus: "nefes" });
  assert.deepEqual(byId.rest, { type: "goldmind", focus: "dinlenme" });
  assert.deepEqual(byId.write, { type: "journal" });
  assert.deepEqual(byId.understand, { type: "awareness" });
  assert.equal(goldmindUrlForFocus("nefes"), "/goldmind?focus=nefes");
});

test("GoldMind focus query maps to the matching category filter", () => {
  assert.equal(meditationFilterFromFocus("sakinles"), "Gevşeme");
  assert.equal(meditationFilterFromFocus("odaklanma"), "Odaklanma");
  assert.equal(meditationFilterFromFocus("nefes"), "Nefes");
  assert.equal(meditationFilterFromFocus("dinlenme"), "Uyku");
  assert.equal(meditationFilterFromFocus("unknown"), null);
});
