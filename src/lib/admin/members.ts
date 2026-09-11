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
