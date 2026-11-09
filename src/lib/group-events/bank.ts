export function normalizeTurkishIban(value: unknown) {
  if (typeof value !== "string") return null;
  const iban = value.replace(/\s/g, "").toUpperCase();
  if (!/^TR\d{24}$/.test(iban)) return null;
  const digits = `${iban.slice(4)}2927${iban.slice(2, 4)}`;
  let remainder = 0;
  for (const digit of digits) remainder = (remainder * 10 + Number(digit)) % 97;
  return remainder === 1 ? iban : null;
}

export function bankPaymentDetails(env: Record<string, string | undefined> = process.env) {
  const iban = normalizeTurkishIban(env.GROUP_EVENT_BANK_IBAN);
  const accountName = env.GROUP_EVENT_BANK_ACCOUNT_NAME?.trim();
  const bankName = env.GROUP_EVENT_BANK_NAME?.trim();
  return iban && accountName ? { iban, accountName, bankName: bankName ?? "" } : null;
}

export function whatsappPhone(value: string) {
  let phone = value.replace(/[\s().+-]/g, "");
  if (/^05\d{9}$/.test(phone)) phone = `9${phone}`;
  else if (/^5\d{9}$/.test(phone)) phone = `90${phone}`;
  return /^[1-9]\d{9,14}$/.test(phone) ? phone : null;
}

export const APPROVAL_WHATSAPP_TEXT = "Ödemeniz ve kaydınız onaylandı. Katılım bağlantınız bu WhatsApp numarası üzerinden iletilecektir. GoldKozmos";
