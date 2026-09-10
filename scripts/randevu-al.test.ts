import assert from "node:assert/strict";
import test from "node:test";

import {
  ENERJI_SERVICE_CARDS,
  canSubmitRandevuRequest,
  randevuMinIso,
  randevuRequestSummary,
  randevuWhatsappHref,
  randevuWhatsappMessage,
} from "../src/lib/randevu-al/booking.ts";

test("WhatsApp stays closed until both date and service are chosen", () => {
  assert.equal(canSubmitRandevuRequest(null, null), false);
  assert.equal(canSubmitRandevuRequest("2026-09-18", null), false);
  assert.equal(canSubmitRandevuRequest(null, "7 Çakra Dengeleme"), false);
  assert.equal(canSubmitRandevuRequest("2026-09-18", "7 Çakra Dengeleme"), true);
});

test("18 Eylül and 7 Çakra Dengeleme appear together in the WhatsApp message", () => {
  const message = randevuWhatsappMessage("2026-09-18", "7 Çakra Dengeleme");
  assert.match(message, /18 Eylül/);
  assert.match(message, /7 Çakra Dengeleme/);
  assert.equal(
    message,
    "Merhaba, 18 Eylül 2026 tarihinde 7 Çakra Dengeleme için randevu almak istiyorum. Uygun saatleri konuşabilir miyiz?",
  );
  assert.match(
    randevuWhatsappHref("2026-09-18", "7 Çakra Dengeleme"),
    /wa\.me\/905054722153\?text=/,
  );
});

test("request copy stays a request until both fields exist", () => {
  assert.equal(randevuRequestSummary(null, null), "Önce günü seç.");
  assert.match(
    randevuRequestSummary("2026-09-18", null),
    /18 Eylül 2026 seçildi/,
  );
  assert.equal(
    randevuRequestSummary("2026-09-18", "7 Çakra Dengeleme"),
    "18 Eylül 2026 · 7 Çakra Dengeleme",
  );
});

test("energy cards keep real duration and the original WhatsApp names", () => {
  const cakra = ENERJI_SERVICE_CARDS.find(
    (service) => service.name === "7 Çakra Dengeleme",
  );
  assert.ok(cakra);
  assert.equal(cakra?.duration, "45–60 dk");
  assert.match(randevuMinIso(new Date("2026-09-10T12:00:00")), /2026-09-11/);
});
