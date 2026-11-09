import { type PanelRecord, istanbulDate } from "./model";
export function dashboard(records: PanelRecord[], today = istanbulDate()) {
  const active = records.filter((r) => !r.deleted_at),
    clients = active.filter((r) => r.kind === "clients"),
    works = active.filter((r) => r.kind === "works"),
    tasks = active.filter((r) => r.kind === "tasks");
  const paid = (prefix: string) =>
    works
      .filter((r) => r.data.paidDate?.startsWith(prefix))
      .reduce((n, r) => n + Number(r.data.paid || 0), 0);
  const counts = new Map<string, number>();
  works.forEach((r) =>
    counts.set(r.data.clientId, (counts.get(r.data.clientId) || 0) + 1),
  );
  const month = today.slice(0, 7),
    year = today.slice(0, 4);
  const firstDates = clients.map(
    (c) =>
      active
        .filter((w) => w.kind === "works" && w.data.clientId === c.id)
        .map((w) => w.data.date)
        .filter(Boolean)
        .concat(c.data.firstDate || [])
        .sort()[0] || c.created_at.slice(0, 10),
  );
  const newClients = firstDates.filter((d) => d.startsWith(month)).length;
  const monthly = Array.from({ length: 12 }, (_, i) => {
    const key = `${year}-${String(i + 1).padStart(2, "0")}`;
    return {
      label: new Intl.DateTimeFormat("tr-TR", { month: "short" }).format(
        new Date(`${key}-15T12:00:00Z`),
      ),
      value: paid(key),
    };
  });
  const popular = new Map<string, number>();
  works.forEach((w) =>
    popular.set(w.data.title, (popular.get(w.data.title) || 0) + 1),
  );
  return {
    clients: clients.length,
    newClients,
    works: works.filter((w) => w.data.status === "Tamamlandı").length,
    repeat: [...counts.values()].filter((n) => n > 1).length,
    monthlyIncome: paid(month),
    yearlyIncome: paid(year),
    monthly,
    popular: [...popular].sort((a, b) => b[1] - a[1]),
    done: tasks.filter((r) => r.data.status === "Tamamlandı").length,
    pending: tasks.filter(
      (r) => !["Tamamlandı", "İptal"].includes(r.data.status),
    ).length,
    platforms: ["instagram", "youtube"].map((kind) => ({
      label: kind === "instagram" ? "Instagram" : "YouTube",
      value: active.filter(
        (r) => r.kind === kind && r.data.status === "Yayınlandı",
      ).length,
    })),
  };
}
export function weekDays(day: string) {
  const start = new Date(day + "T12:00:00Z");
  start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) =>
    new Date(start.getTime() + i * 86400000).toISOString().slice(0, 10),
  );
}
export function csv(rows: string[][]) {
  return (
    "\uFEFF" +
    rows
      .map((row) =>
        row
          .map(
            (v) =>
              '"' +
              (/^[=+@\-\t\r]/.test(v) ? "'" : "") +
              v.replaceAll('"', '""') +
              '"',
          )
          .join(";"),
      )
      .join("\r\n")
  );
}
export function parseCsv(text: string) {
  const delimiter = text.split(/\r?\n/)[0].includes(";") ? ";" : ",";
  const rows: string[][] = [];
  let row: string[] = [],
    cell = "",
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else quoted = !quoted;
    } else if (c === delimiter && !quoted) {
      row.push(cell);
      cell = "";
    } else if (c === "\n" && !quoted) {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (quoted) throw Error("CSV tırnakları kapatılmamış.");
  if (cell || row.length) {
    row.push(cell.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows.filter((r) => r.some(Boolean));
}
