import assert from "node:assert/strict";
import test from "node:test";

import { memberSourceLabel, parseMemberInput } from "../src/lib/admin/members.ts";

test("member add needs a real email and a name", () => {
  assert.equal("error" in parseMemberInput({ email: "nope", displayName: "Ayse" }), true);
  assert.equal("error" in parseMemberInput({ email: "a@b.com", displayName: "A" }), true);
});

test("member add keeps a permanent roster row", () => {
  const parsed = parseMemberInput({
    email: " arkadas@gmail.com ",
    displayName: "Ayşe",
  });
  assert.equal("email" in parsed && parsed.email, "arkadas@gmail.com");
  assert.equal("displayName" in parsed && parsed.displayName, "Ayşe");
  assert.equal(memberSourceLabel("admin"), "Elle eklendi");
  assert.equal(memberSourceLabel("google"), "Google");
});
