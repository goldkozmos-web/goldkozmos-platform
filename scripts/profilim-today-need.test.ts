import assert from "node:assert/strict";
import test from "node:test";

import { TODAY_NEED_CHOICES, isTodayNeedChoiceId } from "../src/lib/profilim/todayNeed.ts";

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
  assert.ok(TODAY_NEED_CHOICES.every((choice) => choice.recommendation));
});
