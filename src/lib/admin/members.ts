export function parseMemberInput(raw: {
  email?: unknown;
  displayName?: unknown;
}) {
  const email = String(raw.email ?? "").trim().toLowerCase();
  const displayName = String(raw.displayName ?? "").trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return { error: "Geçerli bir e-posta yaz." };
  }

  if (displayName.length < 2 || displayName.length > 80) {
    return { error: "Üyenin adını yaz." };
  }

  return { email, displayName };
}

export function memberSourceLabel(source: string | null | undefined) {
  if (source === "admin") return "Elle eklendi";
  if (source === "shopier") return "Shopier";
  if (source === "phone") return "Telefon";
  return "Google";
}

export type SiteMemberRow = {
  id: string;
  displayName: string;
  role: string;
  email: string | null;
  createdAt: string | null;
  source: string;
  status: string;
  authUserId: string | null;
  city: string | null;
  age: string | null;
  phone: string | null;
  interests: string | null;
};

export function mergeMemberRows(groups: SiteMemberRow[][]) {
  const byKey = new Map<string, SiteMemberRow>();

  function fill(base: SiteMemberRow, next: SiteMemberRow): SiteMemberRow {
    return {
      id: base.id || next.id,
      displayName:
        base.displayName !== "GoldKozmos üyesi" ? base.displayName : next.displayName,
      role: base.role === "admin" || next.role === "admin" ? "admin" : "user",
      email: base.email || next.email,
      createdAt: base.createdAt || next.createdAt,
      source: base.source !== "google" ? base.source : next.source,
      status: base.status || next.status,
      authUserId: base.authUserId || next.authUserId,
      city: base.city || next.city,
      age: base.age || next.age,
      phone: base.phone || next.phone,
      interests: base.interests || next.interests,
    };
  }

  for (const group of groups) {
    for (const row of group) {
      const key = (row.email || row.authUserId || row.id).trim().toLowerCase();
      if (!key) continue;
      const prev = byKey.get(key);
      byKey.set(key, prev ? fill(prev, row) : row);
    }
  }

  return [...byKey.values()].sort((a, b) => {
    const aTime = Date.parse(a.createdAt ?? "") || 0;
    const bTime = Date.parse(b.createdAt ?? "") || 0;
    return bTime - aTime;
  });
}
