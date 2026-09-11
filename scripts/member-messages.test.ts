import assert from "node:assert/strict";
import test from "node:test";

import { parseMemberMessageInput } from "../src/lib/messages/validate.ts";

test("member messages need a title, body and recipient", () => {
  assert.equal(
    "error" in parseMemberMessageInput({ title: "", body: "Merhaba", recipientId: "all" }),
    true,
  );
  assert.equal(
    "error" in parseMemberMessageInput({ title: "Not", body: "", recipientId: "all" }),
    true,
  );
  assert.equal(
    "error" in parseMemberMessageInput({ title: "Not", body: "Merhaba", recipientId: "nope" }),
    true,
  );
});

test("all members or a uuid recipient is accepted", () => {
  const all = parseMemberMessageInput({
    title: "Merhaba",
    body: "GoldKozmos notu",
    recipientId: "all",
  });
  assert.equal("title" in all && all.title, "Merhaba");

  const one = parseMemberMessageInput({
    title: "Merhaba",
    body: "GoldKozmos notu",
    recipientId: "11111111-1111-1111-1111-111111111111",
  });
  assert.equal("recipientId" in one && one.recipientId.endsWith("1111"), true);
});
