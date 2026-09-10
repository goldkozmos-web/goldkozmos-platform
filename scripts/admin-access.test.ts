import assert from "node:assert/strict";
import test from "node:test";

import {
  adminMetricValue,
  canAccessAdmin,
  istanbulDayStartIso,
  normalizeProfileRole,
} from "../src/lib/admin/access.ts";
import {
  canShowMemberProfilim,
  isAdminProfile,
  postLoginPath,
} from "../src/lib/admin/profile.ts";

test("admin access comes from profile role or is_admin, not email", () => {
  assert.equal(canAccessAdmin("admin"), true);
  assert.equal(canAccessAdmin("ADMIN"), true);
  assert.equal(canAccessAdmin("user", true), true);
  assert.equal(canAccessAdmin("user", false), false);
  assert.equal(canAccessAdmin(null), false);
  assert.equal(canAccessAdmin("superuser"), false);
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

test("Istanbul day start is a real timestamptz, not a fake clock", () => {
  assert.match(
    istanbulDayStartIso(new Date("2026-09-10T21:30:00+03:00")),
    /^2026-09-10T00:00:00\+03:00$/,
  );
});
