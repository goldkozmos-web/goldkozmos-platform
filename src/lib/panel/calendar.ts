import { type PanelRecord } from "./model";
const escape = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r/g, "");
export function calendarIcs(records: PanelRecord[], remind = false) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GoldKozmos//Private Panel//TR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  for (const row of records) {
    if (
      row.deleted_at ||
      !row.data.date ||
      !["appointments", "broadcasts", "tasks", "instagram", "youtube"].includes(
        row.kind,
      ) ||
      row.data.status === "İptal"
    )
      continue;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${row.id}@goldkozmos.com`,
      `DTSTAMP:${new Date(row.updated_at)
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "")}`,
      `SUMMARY:${escape(row.data.title || "GoldKozmos")}`,
    );
    if (row.data.time) {
      const date = new Date(`${row.data.date}T${row.data.time}:00+03:00`);
      const end = row.data.endTime
        ? new Date(`${row.data.date}T${row.data.endTime}:00+03:00`)
        : new Date(date.getTime() + 30 * 60000);
      const stamp = (d: Date) =>
        d
          .toISOString()
          .replace(/[-:]/g, "")
          .replace(/\.\d{3}/, "");
      lines.push(`DTSTART:${stamp(date)}`, `DTEND:${stamp(end)}`);
    } else
      lines.push(`DTSTART;VALUE=DATE:${row.data.date.replaceAll("-", "")}`);
    if (remind)
      lines.push(
        "BEGIN:VALARM",
        "TRIGGER:-PT15M",
        "ACTION:DISPLAY",
        "DESCRIPTION:GoldKozmos hatırlatma",
        "END:VALARM",
      );
    lines.push("END:VEVENT");
  }
  return [...lines, "END:VCALENDAR"].join("\r\n");
}
