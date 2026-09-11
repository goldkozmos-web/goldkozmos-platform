export const PHONE_STEP_COOKIE = "gk_phone_step";

export const PHONE_COUNTRIES = [
  { dial: "90", label: "Türkiye", flag: "TR" },
  { dial: "49", label: "Almanya", flag: "DE" },
  { dial: "31", label: "Hollanda", flag: "NL" },
  { dial: "44", label: "İngiltere", flag: "GB" },
  { dial: "1", label: "ABD / Kanada", flag: "US" },
  { dial: "33", label: "Fransa", flag: "FR" },
  { dial: "32", label: "Belçika", flag: "BE" },
  { dial: "43", label: "Avusturya", flag: "AT" },
  { dial: "41", label: "İsviçre", flag: "CH" },
  { dial: "994", label: "Azerbaycan", flag: "AZ" },
  { dial: "7", label: "Rusya / Kazakistan", flag: "RU" },
  { dial: "39", label: "İtalya", flag: "IT" },
  { dial: "34", label: "İspanya", flag: "ES" },
  { dial: "30", label: "Yunanistan", flag: "GR" },
  { dial: "357", label: "Kıbrıs", flag: "CY" },
  { dial: "966", label: "Suudi Arabistan", flag: "SA" },
  { dial: "971", label: "BAE", flag: "AE" },
  { dial: "964", label: "Irak", flag: "IQ" },
  { dial: "98", label: "İran", flag: "IR" },
  { dial: "40", label: "Romanya", flag: "RO" },
  { dial: "359", label: "Bulgaristan", flag: "BG" },
  { dial: "46", label: "İsveç", flag: "SE" },
  { dial: "47", label: "Norveç", flag: "NO" },
] as const;

export function normalizeTrPhone(raw: string) {
  return toE164("90", raw);
}

export function toE164(dialRaw: string, localRaw: string) {
  const dial = String(dialRaw ?? "").replace(/\D/g, "");
  let digits = String(localRaw ?? "").replace(/\D/g, "");

  if (!dial || !digits) {
    return null;
  }

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith(dial) && digits.length > dial.length + 5) {
    digits = digits.slice(dial.length);
  }

  if (dial === "90") {
    if (digits.startsWith("0")) digits = digits.slice(1);
    if (digits.length !== 10 || !digits.startsWith("5")) {
      return null;
    }
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (digits.length < 6 || digits.length > 12) {
    return null;
  }

  return `+${dial}${digits}`;
}

export function sessionNeedsPhoneStep(currentLevel: string | null | undefined) {
  return currentLevel !== "aal2";
}

export function maskTrPhone(phone: string) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  const local =
    digits.startsWith("90") && digits.length >= 12 ? digits.slice(2) : digits;
  if (local.length < 8) {
    return "kayıtlı telefonun";
  }
  if (digits.startsWith("90")) {
    return `0${local.slice(0, 3)} *** ** ${local.slice(-2)}`;
  }
  return `+${digits.slice(0, digits.length - 4)} ** ${local.slice(-2)}`;
}

export function otpCodeFromInput(raw: string) {
  return String(raw ?? "").replace(/\D/g, "");
}

export function splitE164(phone: string) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  const countries = [...PHONE_COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);
  for (const country of countries) {
    if (digits.startsWith(country.dial) && digits.length > country.dial.length) {
      return { dial: country.dial, local: digits.slice(country.dial.length) };
    }
  }
  return { dial: "90", local: digits.replace(/^0/, "") };
}

function jwtPayload(token: string) {
  try {
    const part = String(token ?? "").split(".")[1] ?? "";
    if (!part) return null;
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const json =
      typeof atob === "function"
        ? atob(padded)
        : Buffer.from(padded, "base64").toString("utf8");
    return JSON.parse(json) as {
      aal?: string;
      amr?: { method?: string; timestamp?: number }[];
    };
  } catch {
    return null;
  }
}

export function accessTokenHasFreshPhone(token: string, nowMs = Date.now()) {
  const payload = jwtPayload(token);
  if (!payload) return false;
  if (payload.aal === "aal2") return true;
  const amr = Array.isArray(payload.amr) ? payload.amr : [];
  const nowSec = nowMs / 1000;
  return amr.some((item) => {
    const method = String(item.method ?? "").toLowerCase();
    const ts = Number(item.timestamp ?? 0);
    if (!Number.isFinite(ts) || nowSec - ts > 10 * 60) return false;
    return method === "phone" || method === "otp" || method.includes("mfa/phone");
  });
}

export function phoneSendMessage(error: string | null | undefined) {
  const text = String(error ?? "").toLowerCase();
  if (!text) return "Kod gönderilemedi. Numarayı kontrol edip tekrar dene.";
  if (
    text.includes("invalid phone") ||
    text.includes("invalid number") ||
    text.includes("not a valid phone")
  ) {
    return "Bu numara formatı kabul edilmedi. Ülke kodunu seçip numarayı boşluksuz dene.";
  }
  if (text.includes("sms") || text.includes("provider") || text.includes("unsupported") || text.includes("twilio")) {
    return "SMS şu an gönderilemedi. Biraz sonra yeni kod iste.";
  }
  if (text.includes("mfa") && text.includes("disabled")) {
    return "Telefon doğrulaması henüz açık değil. Biraz sonra tekrar dene.";
  }
  return "Kod gönderilemedi. Numarayı kontrol edip tekrar dene.";
}

export function phoneVerifyMessage(error: string | null | undefined) {
  const text = String(error ?? "").toLowerCase();
  if (!text) return "Kod doğrulanamadı. Gelen son kodu dene.";
  if (text.includes("expired")) {
    return "Kodun süresi doldu. Yeni kod iste.";
  }
  if (text.includes("token") || text.includes("otp") || text.includes("invalid")) {
    return "Bu kod eşleşmedi. SMS’teki son 6 haneyi boşluksuz yaz.";
  }
  return "Kod doğrulanamadı. SMS’teki son kodu dene.";
}

export function phoneOtpMessage(error: string | null | undefined) {
  return phoneSendMessage(error);
}

export function phoneStepCookieHeader(userId: string, hostname?: string | null) {
  const onGold = String(hostname ?? "").endsWith("goldkozmos.com");
  const parts = [
    `${PHONE_STEP_COOKIE}=${userId}`,
    "Path=/",
    "Max-Age=43200",
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (onGold) {
    parts.push("Domain=.goldkozmos.com", "Secure");
  }
  return parts.join("; ");
}

export function clearPhoneStepCookieHeader(hostname?: string | null) {
  const onGold = String(hostname ?? "").endsWith("goldkozmos.com");
  const parts = [
    `${PHONE_STEP_COOKIE}=`,
    "Path=/",
    "Max-Age=0",
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (onGold) {
    parts.push("Domain=.goldkozmos.com", "Secure");
  }
  return parts.join("; ");
}
