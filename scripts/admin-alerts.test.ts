import assert from "node:assert/strict";
import test from "node:test";

import { diffAdminLive, nextLiveCursor } from "../src/lib/admin/alerts.ts";
import type { AdminOverviewMetric, AdminVisitorRow } from "../src/lib/admin/load.ts";

function metric(id: AdminOverviewMetric["id"], value: number): AdminOverviewMetric {
  return {
    id,
    title: id,
    href: "/admin",
    value,
    hasSource: true,
    empty: "",
  };
}

function visitor(id: string, path = "/"): AdminVisitorRow {
  return {
    id,
    label: "Ziyaretçi",
    location: "İstanbul, Türkiye",
    entry: "Direkt · /",
    path,
    live: true,
    lastSeenAt: new Date().toISOString(),
  };
}

test("first snapshot does not notify", () => {
  const next = {
    metrics: [metric("members", 1), metric("visits", 1)],
    visitors: [visitor("a")],
  };
  assert.deepEqual(diffAdminLive(null, next), []);
});

test("new visitor and new member raise alerts", () => {
  const prev = nextLiveCursor(
    [metric("members", 1)],
    [visitor("a")],
  );
  const alerts = diffAdminLive(prev, {
    metrics: [metric("members", 2)],
    visitors: [visitor("a"), visitor("b", "/goldmind")],
  });
  assert.equal(alerts.some((alert) => alert.kind === "member"), true);
  assert.equal(alerts.some((alert) => alert.kind === "visitor"), true);
});

test("same visitors do not alert again", () => {
  const prev = nextLiveCursor([metric("members", 1)], [visitor("a")]);
  const alerts = diffAdminLive(prev, {
    metrics: [metric("members", 1)],
    visitors: [visitor("a", "/randevu-al")],
  });
  assert.equal(alerts.length, 0);
});
