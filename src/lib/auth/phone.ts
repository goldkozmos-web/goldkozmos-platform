export function normalizeTrPhone(raw: string) {
  const digits = String(raw ?? "").replace(/\D/g, "");

  if (digits.startsWith("90") && digits.length === 12) {
    return `+${digits}`;
  }

  if (digits.startsWith("0") && digits.length === 11) {
    return `+90${digits.slice(1)}`;
  }

  if (digits.length === 10 && digits.startsWith("5")) {
    return `+90${digits}`;
  }

  return null;
}

export function phoneOtpMessage(error: string | null | undefined) {
  const text = String(error ?? "").toLowerCase();
  if (!text) return "Kod gönderilemedi. Numarayı kontrol edip tekrar dene.";
  if (text.includes("sms") || text.includes("provider") || text.includes("unsupported")) {
    return "Telefon kodu henüz açık değil. Google ile girebilirsin.";
  }
  if (text.includes("token") || text.includes("otp") || text.includes("expired")) {
    return "Kod yanlış veya süresi doldu. Yeni kod iste.";
  }
  if (text.includes("invalid") || text.includes("phone")) {
    return "Geçerli bir Türkiye cep numarası yaz.";
  }
  return "Kod şu an gönderilemedi. Google ile devam edebilirsin.";
}
