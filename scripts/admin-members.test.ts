import assert from "node:assert/strict";
import test from "node:test";

import { memberSourceLabel, mergeMemberRows, parseMemberInput } from "../src/lib/admin/members.ts";

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

test("admin member desk merges empty RPC with profile rows", () => {
  const merged = mergeMemberRows([
    [],
    [
      {
        id: "u1",
        displayName: "Ayşe Yılmaz",
        role: "user",
        email: "ayse@gmail.com",
        createdAt: "2026-09-11T10:00:00.000Z",
        source: "google",
        status: "active",
        authUserId: "u1",
        city: null,
        age: null,
        phone: null,
        interests: null,
      },
    ],
  ]);
  assert.equal(merged.length, 1);
  assert.equal(merged[0]?.email, "ayse@gmail.com");
});
