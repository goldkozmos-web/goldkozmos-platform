import assert from "node:assert/strict";
import test from "node:test";

import {
  canSubmitRandevuRequest,
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
