import assert from "node:assert/strict";
import test from "node:test";

import { profilimUserFromAuth } from "../src/lib/profilim/userFromAuth.ts";
import {
  appOriginFromUrl,
  googleCallbackUrl,
  googleStartUrl,
  htmlAuthMessagePage,
  htmlRedirectPage,
  phoneStepUrl,
  profilimAfterAuthUrl,
  safeAppPath,
} from "../src/lib/site.ts";
import {
  isGoogleAccountsUrl,
  isSupabaseAuthorizeUrl,
} from "../src/lib/supabase/google-authorize.ts";
import {
  maskTrPhone,
  normalizeTrPhone,
  phoneOtpMessage,
  sessionNeedsPhoneStep,
} from "../src/lib/auth/phone.ts";
import type { User } from "@supabase/supabase-js";

function fakeUser(metadata: Record<string, unknown>, email = "gold@example.com") {
  return {
    id: "user-1",
    email,
    user_metadata: metadata,
  } as User;
}

test("uses Google full name and picture", () => {
  const user = profilimUserFromAuth(
    fakeUser({
      full_name: "Gold Kozmos",
      picture: "https://lh3.googleusercontent.com/a/photo",
    }),
  );

  assert.equal(user?.displayName, "Gold Kozmos");
  assert.equal(user?.email, "gold@example.com");
  assert.equal(user?.avatarUrl, "https://lh3.googleusercontent.com/a/photo");
});

test("returns null without a session user", () => {
  assert.equal(profilimUserFromAuth(null), null);
});

test("Google returns to a live HTML callback, not an API payload", () => {
  assert.equal(
    googleCallbackUrl("https://goldkozmos.com"),
    "https://goldkozmos.com/auth/callback",
  );
  assert.equal(
    googleStartUrl("https://goldkozmos.com"),
    "https://goldkozmos.com/auth/google",
  );
  assert.equal(
    appOriginFromUrl("https://www.goldkozmos.com/profilim"),
    "https://goldkozmos.com",
  );
  assert.equal(
    appOriginFromUrl("http://localhost:3000/auth/callback?code=1"),
    "http://localhost:3000",
  );
  assert.equal(
    profilimAfterAuthUrl("https://goldkozmos.com", true),
    "https://goldkozmos.com/profilim?auth=error",
  );
});

test("auth redirects send an HTML page Chrome will not pretty-print", () => {
  const page = htmlRedirectPage("https://goldkozmos.com/profilim");
  assert.equal(page.includes("<!DOCTYPE html>"), true);
  assert.equal(page.includes("text/html"), false);
  assert.equal(page.includes('location.replace("https://goldkozmos.com/profilim")'), true);
  assert.equal(page.includes('content="0;url=https://goldkozmos.com/profilim"'), true);
});

test("auth timeout page is HTML, not JSON", () => {
  const page = htmlAuthMessagePage(
    "Google şu an yanıt vermiyor",
    "Tekrar dene.",
    "/auth/google",
    "Tekrar dene",
  );
  assert.equal(page.startsWith("<!DOCTYPE html>"), true);
  assert.equal(page.includes("application/json"), false);
  assert.equal(page.includes('{"message"'), false);
});

test("only Google account URLs are treated as the login hop", () => {
  assert.equal(
    isGoogleAccountsUrl(
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=x",
    ),
    true,
  );
  assert.equal(
    isSupabaseAuthorizeUrl(
      "https://viomlucbaiewgzeaspoz.supabase.co/auth/v1/authorize?provider=google",
    ),
    true,
  );
  assert.equal(
    isGoogleAccountsUrl(
      "https://viomlucbaiewgzeaspoz.supabase.co/auth/v1/authorize?provider=google",
    ),
    false,
  );
});

test("Turkish mobile numbers normalize to E.164", () => {
  assert.equal(normalizeTrPhone("0532 111 22 33"), "+905321112233");
  assert.equal(normalizeTrPhone("+90 532 111 22 33"), "+905321112233");
  assert.equal(normalizeTrPhone("5321112233"), "+905321112233");
  assert.equal(normalizeTrPhone("123"), null);
});

test("phone OTP errors stay human", () => {
  assert.match(phoneOtpMessage("Unsupported phone provider"), /telefonuna/);
  assert.match(phoneOtpMessage("Invalid token"), /Kod/);
});

test("Google login is not finished until phone MFA is aal2", () => {
  assert.equal(sessionNeedsPhoneStep("aal1"), true);
  assert.equal(sessionNeedsPhoneStep("aal2"), false);
  assert.equal(maskTrPhone("+905321112233"), "0532 *** ** 33");
  assert.equal(phoneStepUrl("https://goldkozmos.com"), "https://goldkozmos.com/auth/telefon");
  assert.equal(safeAppPath("/admin"), "/admin");
  assert.equal(safeAppPath("https://evil.com"), "/profilim");
});
