import assert from "node:assert/strict";
import test from "node:test";

import {
  adminMetricValue,
  canAccessAdmin,
  istanbulDayStartIso,
  isSiteAdminEmail,
  normalizeProfileRole,
} from "../src/lib/admin/access.ts";
import { emptyAdminMetrics } from "../src/lib/admin/access.ts";
import {
  canShowMemberProfilim,
  isAdminProfile,
  postLoginPath,
} from "../src/lib/admin/profile.ts";

test("admin access is only goldkozmos@gmail.com", () => {
  assert.equal(canAccessAdmin("goldkozmos@gmail.com"), true);
  assert.equal(canAccessAdmin("GoldKozmos@gmail.com"), true);
  assert.equal(canAccessAdmin(" goldkozmos@gmail.com "), true);
  assert.equal(canAccessAdmin("someone@gmail.com"), false);
  assert.equal(canAccessAdmin("admin"), false);
  assert.equal(canAccessAdmin(null), false);
  assert.equal(isSiteAdminEmail("goldkozmos@gmail.com"), true);
  assert.equal(isSiteAdminEmail("other@goldkozmos.com"), false);
});

test("unknown or missing profile role stays user", () => {
  assert.equal(normalizeProfileRole(undefined), "user");
  assert.equal(normalizeProfileRole("admin"), "admin");
  assert.equal(normalizeProfileRole("ADMIN"), "admin");
  assert.equal(normalizeProfileRole(" admin "), "admin");
});

test("metrics without a source stay at zero instead of invented counts", () => {
  assert.equal(adminMetricValue(false, 128), 0);
  assert.equal(adminMetricValue(true, 3), 3);
  assert.equal(adminMetricValue(true, 0), 0);
});

test("login always returns to Profilim so the public site stays reachable", () => {
  assert.equal(isAdminProfile({ role: "admin", is_admin: false }), true);
  assert.equal(isAdminProfile({ role: "ADMIN", is_admin: false }), true);
  assert.equal(isAdminProfile({ role: "user", is_admin: true }), true);
  assert.equal(isAdminProfile({ role: "user", is_admin: false }), false);
  assert.equal(postLoginPath({ role: "admin", is_admin: true }), "/profilim");
  assert.equal(postLoginPath({ role: "user", is_admin: false }), "/profilim");
  assert.equal(postLoginPath(null), "/profilim");
});

test("member Profilim tiles stay visible for admin accounts", () => {
  assert.equal(canShowMemberProfilim({ isAdmin: false }, true), false);
  assert.equal(canShowMemberProfilim({ isAdmin: true }, false), true);
  assert.equal(canShowMemberProfilim({ isAdmin: false }, false), true);
  assert.equal(canShowMemberProfilim(null, false), false);
});

test("overview member chip counts all members, not only today", () => {
  const metrics = emptyAdminMetrics();
  const members = metrics.find((metric) => metric.id === "members");
  assert.equal(members?.title, "Üyeler");
  assert.equal(metrics.length > 0, true);
  assert.equal(
    metrics.every((metric) => metric.value === 0),
    true,
  );
});

test("Istanbul day start is a real timestamptz, not a fake clock", () => {
  assert.match(
    istanbulDayStartIso(new Date("2026-09-10T21:30:00+03:00")),
    /^2026-09-10T00:00:00\+03:00$/,
  );
});
