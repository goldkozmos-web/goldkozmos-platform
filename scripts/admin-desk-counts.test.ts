import assert from "node:assert/strict";
import test from "node:test";

import {
  lifetimeEventCount,
  lifetimeVisitCount,
  rangeCount,
} from "../src/lib/admin/desk-counts.ts";

test("visit overview keeps the all-time unique visitors, not today's page views", () => {
  assert.equal(lifetimeVisitCount(42, 0), 42);
  assert.equal(lifetimeVisitCount(42, 8), 42);
  assert.equal(lifetimeVisitCount(0, 8), 0);
});

test("WhatsApp overview keeps the lifetime click count overnight", () => {
  assert.equal(lifetimeEventCount(19, 0), 19);
  assert.equal(lifetimeEventCount(0, 3), 3);
});

test("today and 30-day ranges prefer the presence table, then analytics", () => {
  assert.equal(rangeCount(7, 2), 7);
  assert.equal(rangeCount(0, 4), 4);
});
