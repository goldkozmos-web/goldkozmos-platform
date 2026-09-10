import assert from "node:assert/strict";
import test from "node:test";

import {
  adminMetricValue,
  canAccessAdmin,
  emailFromAuthRecord,
  istanbulDayStartIso,
  normalizeProfileRole,
  postAuthPath,
} from "../src/lib/admin/access.ts";

test("only admin role or goldkozmos@gmail.com can enter /admin", () => {
  assert.equal(canAccessAdmin("admin"), true);
  assert.equal(canAccessAdmin("user"), false);
  assert.equal(canAccessAdmin(null), false);
  assert.equal(canAccessAdmin("superuser"), false);
  assert.equal(canAccessAdmin("user", "goldkozmos@gmail.com"), true);
  assert.equal(canAccessAdmin("user", "  GoldKozmos@gmail.com  "), true);
  assert.equal(canAccessAdmin("user", "else@gmail.com"), false);
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

test("goldkozmos@gmail.com lands on /admin after Google login", () => {
  assert.equal(postAuthPath("goldkozmos@gmail.com"), "/admin");
  assert.equal(postAuthPath("uye@example.com"), "/profilim");
  assert.equal(
    emailFromAuthRecord({
      email: null,
      user_metadata: { email: "goldkozmos@gmail.com" },
    }),
    "goldkozmos@gmail.com",
  );
});

test("Istanbul day start is a real timestamptz, not a fake clock", () => {
  assert.match(
    istanbulDayStartIso(new Date("2026-09-10T21:30:00+03:00")),
    /^2026-09-10T00:00:00\+03:00$/,
  );
});
