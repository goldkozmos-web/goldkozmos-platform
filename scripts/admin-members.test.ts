import assert from "node:assert/strict";
import test from "node:test";

import {
  memberSourceLabel,
  mergeMemberRows,
  parseMemberInput,
  parseRemovedMemberContent,
  withoutRemovedMembers,
} from "../src/lib/admin/members.ts";
import {
  isMemberVisitorKey,
  memberRowFromAuthUser,
  memberRowFromVisitor,
  membersFromVisitorRows,
  memberVisitorKey,
  userIdFromMemberKey,
} from "../src/lib/admin/member-keys.ts";

test("member add needs a real email and a name", () => {
  assert.equal("error" in parseMemberInput({ email: "nope", displayName: "Ayse" }), true);
  assert.equal("error" in parseMemberInput({ email: "a@b.com", displayName: "A" }), true);
});

test("member add keeps a permanent roster row", () => {
  const parsed = parseMemberInput({
    email: " arkadas@gmail.com ",
    displayName: "Ayse",
  });
  assert.equal("email" in parsed && parsed.email, "arkadas@gmail.com");
  assert.equal("displayName" in parsed && parsed.displayName, "Ayse");
  assert.equal(memberSourceLabel("admin"), "Elle eklendi");
  assert.equal(memberSourceLabel("google"), "Google");
});

test("admin member desk merges empty RPC with profile rows", () => {
  const merged = mergeMemberRows([
    [],
    [
      {
        id: "u1",
        displayName: "Ayse Yilmaz",
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

test("member join is stored on the visitor log Gold already sees", () => {
  const id = "11111111-2222-3333-4444-555555555555";
  const key = memberVisitorKey(id);
  assert.equal(isMemberVisitorKey(key), true);
  assert.equal(userIdFromMemberKey(key), id);
  const row = memberRowFromVisitor({
    visitor_key: key,
    first_source: "Ayse Yilmaz",
    first_referrer: "ayse@gmail.com",
    href: "+905321112233",
    city: "Istanbul",
    created_at: "2026-09-11T17:00:00.000Z",
  });
  assert.equal(row?.email, "ayse@gmail.com");
  assert.equal(row?.displayName, "Ayse Yilmaz");
  assert.equal(row?.phone, "+905321112233");
  assert.equal(row?.city, "Istanbul");
});

test("admin member desk reads gkmem rows from the live visitor RPC", () => {
  const id = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const key = memberVisitorKey(id);
  const rows = membersFromVisitorRows([
    {
      visitor_key: key,
      first_source: "Yeni Uye",
      first_referrer: "yeni@gmail.com",
      last_seen_at: "2026-09-11T17:00:00.000Z",
    },
    {
      visitor_key: "anon-visitor-1",
      first_source: "Instagram",
    },
  ]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0]?.email, "yeni@gmail.com");
  assert.equal(rows[0]?.displayName, "Yeni Uye");
});

test("removed members drop off the admin roster", () => {
  const marker = "out:ayse@gmail.com|u1";
  const kept = withoutRemovedMembers(
    [
      {
        id: "u1",
        displayName: "Ayse",
        role: "user",
        email: "ayse@gmail.com",
        createdAt: null,
        source: "google",
        status: "active",
        authUserId: "u1",
        city: null,
        age: null,
        phone: null,
        interests: null,
      },
      {
        id: "u2",
        displayName: "Gold",
        role: "admin",
        email: "goldkozmos@gmail.com",
        createdAt: null,
        source: "google",
        status: "active",
        authUserId: "u2",
        city: null,
        age: null,
        phone: null,
        interests: null,
      },
    ],
    [{ email: "ayse@gmail.com", authUserId: "u1" }],
  );
  assert.equal(kept.length, 1);
  assert.equal(kept[0]?.email, "goldkozmos@gmail.com");
  assert.equal(parseRemovedMemberContent(marker)?.email, "ayse@gmail.com");
});

test("Google auth users map onto the admin member desk", () => {
  const row = memberRowFromAuthUser({
    id: "u-4",
    email: "arkadas@gmail.com",
    created_at: "2026-09-01T00:00:00.000Z",
    user_metadata: { full_name: "Arkadas" },
  });
  assert.equal(row?.displayName, "Arkadas");
  assert.equal(row?.email, "arkadas@gmail.com");
  assert.equal(row?.source, "google");
});
