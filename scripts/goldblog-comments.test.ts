import assert from "node:assert/strict";
import test from "node:test";

import {
  canDeleteComment,
  canEditComment,
  sanitizeCommentContent,
  validateCommentContent,
} from "../src/lib/goldblog/commentValidation.ts";

test("rejects empty and whitespace comments", () => {
  assert.equal(validateCommentContent("").ok, false);
  assert.equal(validateCommentContent("    \n\t").ok, false);
});

test("strips html and keeps text", () => {
  const result = validateCommentContent("Merhaba <script>alert(1)</script> dünya");
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.content.includes("<script>"), false);
    assert.match(result.content, /Merhaba/);
  }
});

test("rejects too many links", () => {
  const result = validateCommentContent(
    "bak https://a.com https://b.com https://c.com",
  );
  assert.equal(result.ok, false);
});

test("accepts a normal comment", () => {
  const result = validateCommentContent("Bu yazı bende iz bıraktı.");
  assert.equal(result.ok, true);
});

test("caps length at 1000", () => {
  const result = validateCommentContent("a".repeat(1001));
  assert.equal(result.ok, false);
});

test("sanitize trims", () => {
  assert.equal(sanitizeCommentContent("  merhaba  "), "merhaba");
});

test("edit only own comment", () => {
  assert.equal(canEditComment("u1", "u1"), true);
  assert.equal(canEditComment("u1", "u2"), false);
});

test("delete own or admin", () => {
  assert.equal(canDeleteComment("u1", "u2", false), false);
  assert.equal(canDeleteComment("u1", "u1", false), true);
  assert.equal(canDeleteComment("admin", "u2", true), true);
});
