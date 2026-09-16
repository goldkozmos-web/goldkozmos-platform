import assert from "node:assert/strict";
import test from "node:test";

import { shouldClearProfilimUser } from "../src/lib/profilim/sessionEvents.ts";
import {
  cookieHostName,
  lastingCookieOptions,
  SESSION_MAX_AGE,
  supabaseCookieOptions,
} from "../src/lib/supabase/session.ts";

test("empty auth events do not kick a signed-in Profilim user out", () => {
  assert.equal(shouldClearProfilimUser("INITIAL_SESSION"), false);
  assert.equal(shouldClearProfilimUser("GET_SESSION"), false);
  assert.equal(shouldClearProfilimUser("GET_SESSION_EMPTY"), false);
  assert.equal(shouldClearProfilimUser("TOKEN_REFRESHED"), false);
  assert.equal(shouldClearProfilimUser(undefined), false);
});

test("only an explicit sign-out clears Profilim", () => {
  assert.equal(shouldClearProfilimUser("SIGNED_OUT"), true);
});

test("live GoldKozmos cookies cover www and apex and last until logout", () => {
  assert.equal(cookieHostName("www.goldkozmos.com:443"), "www.goldkozmos.com");
  assert.equal(supabaseCookieOptions("www.goldkozmos.com").domain, ".goldkozmos.com");
  assert.equal(supabaseCookieOptions("goldkozmos.com").domain, ".goldkozmos.com");
  const lasting = lastingCookieOptions({ path: "/", maxAge: 3600 }, "token");
  assert.equal(lasting?.maxAge, SESSION_MAX_AGE);
  assert.equal(lasting?.expires instanceof Date, true);
});
