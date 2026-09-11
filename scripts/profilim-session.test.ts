import assert from "node:assert/strict";
import test from "node:test";

import { shouldClearProfilimUser } from "../src/lib/profilim/sessionEvents.ts";

test("empty auth events do not kick a signed-in Profilim user out", () => {
  assert.equal(shouldClearProfilimUser("INITIAL_SESSION"), false);
  assert.equal(shouldClearProfilimUser("GET_SESSION"), false);
  assert.equal(shouldClearProfilimUser("TOKEN_REFRESHED"), false);
  assert.equal(shouldClearProfilimUser(undefined), false);
});

test("only an explicit sign-out clears Profilim", () => {
  assert.equal(shouldClearProfilimUser("SIGNED_OUT"), true);
});
