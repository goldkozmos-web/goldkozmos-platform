import type { SiteMemberRow } from "./members";

export const MEMBER_VISITOR_PREFIX = "gkmem_";

export function memberVisitorKey(userId: string) {
  const hex = String(userId ?? "").replace(/-/g, "").toLowerCase();
  if (hex.length < 8) return "";
  return `${MEMBER_VISITOR_PREFIX}${hex}`.slice(0, 80);
}

export function isMemberVisitorKey(key: string) {
  return String(key ?? "").startsWith(MEMBER_VISITOR_PREFIX);
}

export function userIdFromMemberKey(key: string) {
  const hex = String(key ?? "")
    .replace(MEMBER_VISITOR_PREFIX, "")
    .replace(/-/g, "")
    .toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(hex)) return "";
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function memberRowFromVisitor(row: Record<string, unknown>): SiteMemberRow | null {
  const key = typeof row.visitor_key === "string" ? row.visitor_key : "";
  if (!isMemberVisitorKey(key)) return null;
  const userId = userIdFromMemberKey(key);
  const email =
    (typeof row.first_referrer === "string" && row.first_referrer.includes("@")
      ? row.first_referrer.trim()
      : "") || null;
  const phone =
    typeof row.href === "string" && row.href.startsWith("+") ? row.href.trim() : null;
  const displayName =
    (typeof row.first_source === "string" && row.first_source.trim() && row.first_source !== "Direkt"
      ? row.first_source.trim()
      : "") ||
    email?.split("@")[0] ||
    "GoldKozmos üyesi";

  return {
    id: userId || key,
    displayName,
    role: email === "goldkozmos@gmail.com" ? "admin" : "user",
    email,
    createdAt:
      (typeof row.created_at === "string" && row.created_at) ||
      (typeof row.last_seen_at === "string" && row.last_seen_at) ||
      null,
    source: "google",
    status: "active",
    authUserId: userId || null,
    city: typeof row.city === "string" && row.city.trim() ? row.city.trim() : null,
    age: null,
    phone,
    interests: null,
  };
}

export function membersFromVisitorRows(
  rows: Record<string, unknown>[] | null | undefined,
): SiteMemberRow[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => memberRowFromVisitor(row))
    .filter((row): row is SiteMemberRow => Boolean(row));
}

export function memberRowFromAuthUser(user: {
  id?: string;
  email?: string | null;
  phone?: string | null;
  created_at?: string;
  user_metadata?: Record<string, unknown> | null;
}): SiteMemberRow | null {
  const id = String(user.id ?? "").trim();
  const email = String(user.email ?? "").trim().toLowerCase() || null;
  if (!id || !email) return null;
  const metadata = user.user_metadata ?? {};
  const displayName =
    (typeof metadata.full_name === "string" && metadata.full_name.trim()) ||
    (typeof metadata.name === "string" && metadata.name.trim()) ||
    (typeof metadata.display_name === "string" && metadata.display_name.trim()) ||
    email.split("@")[0] ||
    "GoldKozmos üyesi";
  const city = typeof metadata.city === "string" && metadata.city.trim() ? metadata.city.trim() : null;
  const age =
    typeof metadata.age === "number"
      ? String(metadata.age)
      : typeof metadata.age === "string" && metadata.age.trim()
        ? metadata.age.trim()
        : null;
  const phone =
    (typeof user.phone === "string" && user.phone.trim()) ||
    (typeof metadata.phone === "string" && metadata.phone.trim()) ||
    null;
  const interests =
    typeof metadata.interests === "string" && metadata.interests.trim()
      ? metadata.interests.trim()
      : null;

  return {
    id,
    displayName,
    role: email === "goldkozmos@gmail.com" ? "admin" : "user",
    email,
    createdAt: user.created_at ?? null,
    source: "google",
    status: "active",
    authUserId: id,
    city,
    age,
    phone,
    interests,
  };
}
