export function waterCalendar(now: Date, interval: number, startHour: number, endHour: number) {
  const local = new Date(now.getTime() + 3 * 3600000);
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//GoldKozmos//Su Molasi//TR', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:GoldKozmos Su Molaları'];
  for (let minute = startHour * 60; minute < endHour * 60; minute += interval) {
    let start = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), 0, minute - 180));
    if (start <= now) start = new Date(start.getTime() + 86400000);
    lines.push('BEGIN:VEVENT', `UID:water-${start.getTime()}-${minute}@goldkozmos.com`, `DTSTAMP:${stamp(now)}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(new Date(start.getTime() + 300000))}`, 'RRULE:FREQ=DAILY;COUNT=30', 'SUMMARY:Su molası · GoldKozmos', 'DESCRIPTION:Kendine kısa bir su molası ayır. Takibini GoldKozmos Profilim bölümünden güncelle.', 'URL:https://goldkozmos.com/profilim?open=water', 'BEGIN:VALARM', 'TRIGGER:PT0M', 'ACTION:DISPLAY', 'DESCRIPTION:Su molası zamanı', 'END:VALARM', 'END:VEVENT');
  }
  return [...lines, 'END:VCALENDAR', ''].join('\r\n');
}
