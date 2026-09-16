import assert from "node:assert/strict";
import test from "node:test";

import { goldActFromApi } from "../src/lib/daily/goldact-state.ts";

test("GoldAct API treats a Google cookie session as signed in", () => {
  const pack = goldActFromApi({
    signedIn: true,
    userId: "u1",
    action: {
      id: "a1",
      title: "İki dakikalık nefes",
      body: "Nefesine eşlik et.",
      category: "oz_bakim",
      assigned_on: "2026-09-16",
      completed_at: null,
    },
  });
  assert.equal(pack.signedIn, true);
  assert.equal(pack.userId, "u1");
  assert.equal(pack.action?.title, "İki dakikalık nefes");
});

test("GoldAct API does not ask for Google when the session is present without a row", () => {
  const pack = goldActFromApi({ signedIn: true, userId: "u1", action: null });
  assert.equal(pack.signedIn, true);
  assert.equal(pack.action, null);
});

test("GoldAct API stays signed out only when the cookie session is missing", () => {
  const pack = goldActFromApi({ signedIn: false, action: null });
  assert.equal(pack.signedIn, false);
  assert.equal(pack.action, null);
});
