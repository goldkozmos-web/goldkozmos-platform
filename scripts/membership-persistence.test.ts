import assert from "node:assert/strict";
import test from "node:test";
import { persistMemberProfile, type MemberProfile } from "../src/lib/auth/membership.ts";
import { lastingCookieOptions, supabaseCookieOptions, SESSION_MAX_AGE } from "../src/lib/supabase/session.ts";

const profile: MemberProfile = { firstName: "Test", lastName: "Üye", city: "İstanbul", age: 30, interests: ["enerji"], phone: "+905000000000", privacyAccepted: true };
function storage(failSave = false, failConfirm = false) {
  const calls: string[] = [];
  const client = {
    rpc: async () => { calls.push("save"); return { error: failSave ? { code: "42501" } : null }; },
    auth: { updateUser: async () => { calls.push("confirm"); return { error: failConfirm ? { code: "network" } : null }; } },
  } as unknown as Parameters<typeof persistMemberProfile>[0];
  return { client, calls };
}
test("a failed database write never marks a membership complete", async () => {
  const { client, calls } = storage(true);
  assert.equal((await persistMemberProfile(client, profile)).ok, false);
  assert.deepEqual(calls, ["save"]);
});
test("membership confirmation follows durable database persistence", async () => {
  const { client, calls } = storage();
  assert.equal((await persistMemberProfile(client, profile)).ok, true);
  assert.deepEqual(calls, ["save", "confirm"]);
});
test("confirmation failure is surfaced rather than treated as successful registration", async () => {
  const { client } = storage(false, true);
  assert.equal((await persistMemberProfile(client, profile)).ok, false);
});
test("session cookies are shared by the site's own hosts only", () => {
  assert.equal(supabaseCookieOptions("goldkozmos.com").domain, ".goldkozmos.com");
  assert.equal(supabaseCookieOptions("www.goldkozmos.com").domain, ".goldkozmos.com");
  assert.equal(supabaseCookieOptions("notgoldkozmos.com").domain, undefined);
  assert.equal(supabaseCookieOptions("localhost").domain, undefined);
});
test("refresh keeps session cookies lasting while revocation stays immediate", () => {
  assert.equal(lastingCookieOptions({ maxAge: 3600 }, "session")?.maxAge, SESSION_MAX_AGE);
  assert.equal(lastingCookieOptions({ maxAge: 0 }, "")?.maxAge, 0);
});
