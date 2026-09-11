import type { User } from "@supabase/supabase-js";

export const MEMBER_INTERESTS = [
  { id: "tarot", label: "Tarot" },
  { id: "numeroloji", label: "Numeroloji" },
  { id: "meditasyon", label: "Meditasyon ve nefes" },
  { id: "iliski", label: "Aşk ve ilişki" },
  { id: "para", label: "Para ve bolluk" },
  { id: "enerji", label: "Enerji çalışmaları" },
  { id: "kendilik", label: "Kendilik" },
  { id: "seans", label: "Birebir seanslar" },
] as const;

export type MemberProfile = {
  firstName: string;
  lastName: string;
  city: string;
  age: number;
  interests: string[];
  phone: string;
  privacyAccepted: true;
};

function cleanName(raw: unknown, label: string): { error: string } | { value: string } {
  const value = String(raw ?? "").replace(/\s+/g, " ").trim();
  if (value.length < 2 || value.length > 40) {
    return { error: `${label} yaz.` };
  }
  return { value };
}

export function parseMemberProfile(raw: {
  firstName?: unknown;
  lastName?: unknown;
  city?: unknown;
  age?: unknown;
  interests?: unknown;
  phone?: unknown;
  dial?: unknown;
  privacyAccepted?: unknown;
}): { error: string } | MemberProfile {
  const firstName = cleanName(raw.firstName, "Adını");
  if ("error" in firstName) return { error: firstName.error };
  const lastName = cleanName(raw.lastName, "Soyadını");
  if ("error" in lastName) return { error: lastName.error };

  const city = String(raw.city ?? "").replace(/\s+/g, " ").trim();
  if (city.length < 2 || city.length > 80) {
    return { error: "Nerede yaşadığını yaz." };
  }

  const age = Number.parseInt(String(raw.age ?? "").replace(/\D/g, ""), 10);
  if (!Number.isFinite(age) || age < 18 || age > 99) {
    return { error: "Yaşını 18 veya üzeri yaz." };
  }

  const interestIds = new Set<string>(MEMBER_INTERESTS.map((item) => item.id));
  const interests = (
    Array.isArray(raw.interests)
      ? raw.interests
      : String(raw.interests ?? "")
          .split(",")
          .map((item) => item.trim())
  )
    .map((item) => String(item).trim())
    .filter((item) => interestIds.has(item));

  if (interests.length < 1) {
    return { error: "En az bir ilgi alanı seç." };
  }

  const phone = String(raw.phone ?? "").replace(/\s/g, "");
  if (!/^\+\d{8,15}$/.test(phone)) {
    return { error: "Cep numaranı ülke koduyla yaz." };
  }

  if (raw.privacyAccepted !== true && raw.privacyAccepted !== "true") {
    return { error: "Devam etmek için gizlilik onayını işaretle." };
  }

  return {
    firstName: firstName.value,
    lastName: lastName.value,
    city,
    age,
    interests,
    phone,
    privacyAccepted: true,
  };
}

export function memberDisplayName(profile: Pick<MemberProfile, "firstName" | "lastName">) {
  return `${profile.firstName} ${profile.lastName}`.trim();
}

export function isMemberProfileComplete(user: User | null | undefined) {
  const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;
  return metadata.gk_member_complete === true || metadata.gk_member_complete === "true";
}

export function prefillFromGoogle(user: User | null | undefined) {
  const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const given = String(metadata.given_name ?? "").trim();
  const family = String(metadata.family_name ?? "").trim();
  const full = String(metadata.full_name ?? metadata.name ?? "").trim();
  const parts = full.split(/\s+/).filter(Boolean);
  return {
    firstName: given || parts[0] || "",
    lastName: family || parts.slice(1).join(" ") || "",
  };
}

export function memberProfileMetadata(profile: MemberProfile) {
  const displayName = memberDisplayName(profile);
  return {
    first_name: profile.firstName,
    last_name: profile.lastName,
    full_name: displayName,
    display_name: displayName,
    city: profile.city,
    age: profile.age,
    interests: profile.interests.join(","),
    phone: profile.phone,
    gk_member_complete: true,
    privacy_accepted_at: new Date().toISOString(),
  };
}
