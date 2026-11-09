const landscapes = {
  calm: ["lake", "forest"],
  growth: ["mountain", "ocean"],
  care: ["meadow", "garden"],
} as const;

export function dailyMessageVisual(body: string, day: string) {
  const normalized = body.toLocaleLowerCase("tr-TR");
  const theme = /şefkat|sevgi|iyilik|teşekkür|değer|kendine|ilişki|bağ|kalp/.test(normalized)
    ? "care"
    : /adım|cesaret|başla|yol|hedef|ilerle|karar|dene|güç|değiş/.test(normalized)
      ? "growth" : "calm";
  const stamp = Date.parse(`${day}T00:00:00Z`);
  const index = Number.isFinite(stamp) ? ((Math.floor(stamp / 86400000) % 2) + 2) % 2 : 0;
  return `/images/daily-message-${landscapes[theme][index]}.webp`;
}

export function istanbulMessageDay(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}
