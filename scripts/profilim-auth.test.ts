import assert from "node:assert/strict";
import test from "node:test";

import { profilimUserFromAuth } from "../src/lib/profilim/userFromAuth.ts";
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
