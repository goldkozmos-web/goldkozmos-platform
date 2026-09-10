import assert from "node:assert/strict";
import test from "node:test";

import {
  VISITOR_LABEL,
  describeEntry,
  describeLocation,
  describeReferrer,
  isLiveAt,
  presenceKindFromHref,
  shouldSkipPresencePath,
} from "../src/lib/presence/labels.ts";
import { parsePresencePayload } from "../src/lib/presence/labels.ts";

test("anonymous visitors are labeled Ziyaretçi", () => {
  assert.equal(VISITOR_LABEL, "Ziyaretçi");
});

test("entry source comes from referrer and landing path", () => {
  assert.equal(describeReferrer(""), "Direkt");
  assert.equal(describeReferrer("https://www.instagram.com/goldkozmos"), "Instagram");
  assert.equal(describeReferrer("https://www.google.com/search?q=goldkozmos"), "Google");
  assert.equal(describeEntry("/goldmind", "https://www.instagram.com/p/1"), "Instagram · /goldmind");
});

test("location prefers city and country without storing an IP", () => {
  assert.equal(describeLocation("Istanbul", null, "TR"), "Istanbul, Türkiye");
  assert.equal(describeLocation(null, null, null), "Konum yok");
});

test("live window is 45 seconds", () => {
  const now = Date.parse("2026-09-10T17:00:00.000Z");
  assert.equal(isLiveAt("2026-09-10T16:59:20.000Z", now), true);
  assert.equal(isLiveAt("2026-09-10T16:58:00.000Z", now), false);
});

test("admin and auth routes are not counted as public presence", () => {
  assert.equal(shouldSkipPresencePath("/admin"), true);
  assert.equal(shouldSkipPresencePath("/auth/callback"), true);
  assert.equal(shouldSkipPresencePath("/"), false);
});

test("outbound links map to the matching admin box", () => {
  assert.equal(
    presenceKindFromHref("https://www.shopier.com/goldkozmos/1", "/"),
    "purchase",
  );
  assert.equal(
    presenceKindFromHref("https://wa.me/905054722153?text=Merhaba", "/"),
    "whatsapp",
  );
  assert.equal(
    presenceKindFromHref(
      "https://wa.me/905054722153?text=Merhaba%20randevu%20almak",
      "/",
    ),
    "appointment",
  );
});

test("presence payload rejects unknown kinds", () => {
  assert.equal(parsePresencePayload({ kind: "page", path: "/" })?.kind, "page");
  assert.equal(parsePresencePayload({ kind: "spy" }), null);
});
