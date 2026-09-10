import assert from "node:assert/strict";
import test from "node:test";

import {
  levelFromXp,
  xpFromActivities,
} from "../src/lib/profilim/level.ts";
import type { ProfilimActivity } from "../src/lib/profilim/types.ts";

test("zero xp starts at level 1 with empty progress", () => {
  const level = levelFromXp(0);
  assert.equal(level.level, 1);
  assert.equal(level.title, "Başlangıç");
  assert.equal(level.progress, 0);
  assert.equal(level.xpIntoLevel, 0);
});

test("xp is summed from completed activities", () => {
  const activities: ProfilimActivity[] = [
    {
      id: "a1",
      kind: "journal",
      title: "Günlük",
      completedAt: "2026-01-02",
      xp: 10,
    },
    {
      id: "a2",
      kind: "lesson",
      title: "Ders",
      completedAt: "2026-01-03",
      xp: 20,
    },
  ];

  assert.equal(xpFromActivities(activities), 30);
  assert.equal(xpFromActivities([]), 0);
});

test("level advances from activity xp not from a purchase amount", () => {
  const purchaseAmount = 25000;
  const activityXp = xpFromActivities([
    {
      id: "a1",
      kind: "session",
      title: "Seans",
      completedAt: "2026-01-02",
      xp: 40,
    },
  ]);

  assert.equal(activityXp, 40);
  assert.notEqual(activityXp, purchaseAmount);

  const level = levelFromXp(100);
  assert.equal(level.level, 2);
  assert.equal(level.title, "Uyanış");
});
