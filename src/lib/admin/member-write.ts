export type PersistMemberInput = {
  authUserId: string;
  email: string;
  displayName?: string | null;
  source?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  age?: number | string | null;
  phone?: string | null;
  interests?: string | null;
  avatarUrl?: string | null;
  profileCompleted?: boolean;
};

export type SiteMemberWrite = {
  email: string;
  display_name: string;
  auth_user_id: string;
  source: "google" | "admin" | "shopier";
  status: "active";
  updated_at: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  age?: number;
  phone?: string;
  interests?: string;
  privacy_accepted_at?: string;
  profile_completed_at?: string;
};

function asText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

export function normalizeMemberWrite(input: PersistMemberInput): SiteMemberWrite | null {
  const email = asText(input.email).toLowerCase();
  const authUserId = asText(input.authUserId);
  if (!email || !email.includes("@") || !authUserId) return null;

  const source =
    input.source === "admin" || input.source === "shopier" ? input.source : "google";
  const firstName = asText(input.firstName);
  const lastName = asText(input.lastName);
  const displayName =
    asText(input.displayName) ||
    `${firstName} ${lastName}`.trim() ||
    email.split("@")[0] ||
    "GoldKozmos üyesi";
  const ageRaw = input.age;
  const age =
    typeof ageRaw === "number"
      ? ageRaw
      : Number.parseInt(String(ageRaw ?? "").replace(/\D/g, ""), 10);
  const now = new Date().toISOString();
  const row: SiteMemberWrite = {
    email,
    display_name: displayName.slice(0, 80),
    auth_user_id: authUserId,
    source,
    status: "active",
    updated_at: now,
  };
  if (firstName) row.first_name = firstName.slice(0, 40);
  if (lastName) row.last_name = lastName.slice(0, 40);
  if (asText(input.city)) row.city = asText(input.city).slice(0, 80);
  if (Number.isFinite(age) && age >= 18 && age <= 99) row.age = age;
  if (asText(input.phone)) row.phone = asText(input.phone).slice(0, 20);
  if (asText(input.interests)) row.interests = asText(input.interests).slice(0, 200);
  if (input.profileCompleted) {
    row.privacy_accepted_at = now;
    row.profile_completed_at = now;
  }
  return row;
}

export function coreMemberWrite(row: SiteMemberWrite) {
  return {
    email: row.email,
    display_name: row.display_name,
    auth_user_id: row.auth_user_id,
    source: row.source,
    status: row.status,
    updated_at: row.updated_at,
  };
}
