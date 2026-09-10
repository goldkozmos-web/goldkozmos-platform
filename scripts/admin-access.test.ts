import assert from "node:assert/strict";
import test from "node:test";

import {
  adminMetricValue,
  canAccessAdmin,
  istanbulDayStartIso,
  normalizeProfileRole,
} from "../src/lib/admin/access.ts";

test("only the admin role can enter /admin", () => {
  assert.equal(canAccessAdmin("admin"), true);
  assert.equal(canAccessAdmin("user"), false);
  assert.equal(canAccessAdmin(null), false);
  assert.equal(canAccessAdmin("superuser"), false);
});

test("unknown or missing profile role stays user", () => {
  assert.equal(normalizeProfileRole(undefined), "user");
  assert.equal(normalizeProfileRole("admin"), "admin");
  assert.equal(normalizeProfileRole("ADMIN"), "user");
});

test("metrics without a source stay at zero instead of invented counts", () => {
  assert.equal(adminMetricValue(false, 128), 0);
  assert.equal(adminMetricValue(true, 3), 3);
  assert.equal(adminMetricValue(true, 0), 0);
});

test("Istanbul day start is a real timestamptz, not a fake clock", () => {
  assert.match(
    istanbulDayStartIso(new Date("2026-09-10T21:30:00+03:00")),
    /^2026-09-10T00:00:00\+03:00$/,
  );
});
