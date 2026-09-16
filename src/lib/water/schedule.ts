export function parseCustomTimes(raw: string) {
  const stamps = raw
    .split(/[,;\n]+/)
    .map((part) => part.trim())
    .map((part) => {
      const ampm = part.match(/^(\d{1,2}):(\d{2})\s*([ap]m)$/i);
      if (ampm) {
        let hour = Number(ampm[1]) % 12;
        if (ampm[3].toLowerCase() === "pm") hour += 12;
        return `${String(hour).padStart(2, "0")}:${ampm[2]}`;
      }
      const match = part.match(/^(\d{1,2}):(\d{2})$/);
      if (!match) return "";
      const hour = Math.min(23, Number(match[1]));
      const minute = Math.min(59, Number(match[2]));
      return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    })
    .filter(Boolean);
  return [...new Set(stamps)].sort();
}

export function timesBetween(
  start: string,
  end: string,
  count: number,
  intervalMinutes?: number | null,
) {
  const toMin = (value: string) => {
    const [h, m] = value.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };
  const startMin = toMin(start);
  let endMin = toMin(end);
  if (endMin <= startMin) endMin += 24 * 60;
  const stamps: string[] = [];
  if (intervalMinutes && intervalMinutes > 0) {
    for (let t = startMin; t <= endMin; t += intervalMinutes) {
      const wrap = t % (24 * 60);
      stamps.push(
        `${String(Math.floor(wrap / 60)).padStart(2, "0")}:${String(wrap % 60).padStart(2, "0")}`,
      );
    }
    return stamps;
  }
  const safe = Math.max(1, count);
  if (safe === 1) {
    return [
      `${String(Math.floor(startMin / 60)).padStart(2, "0")}:${String(startMin % 60).padStart(2, "0")}`,
    ];
  }
  const span = endMin - startMin;
  for (let i = 0; i < safe; i += 1) {
    const t = startMin + Math.round((span * i) / (safe - 1));
    const wrap = t % (24 * 60);
    stamps.push(
      `${String(Math.floor(wrap / 60)).padStart(2, "0")}:${String(wrap % 60).padStart(2, "0")}`,
    );
  }
  return [...new Set(stamps)];
}
