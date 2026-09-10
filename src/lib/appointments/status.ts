import type {
  AppointmentRecord,
  AppointmentStatus,
  AppointmentSummary,
  CustomerAppointmentGroups,
} from "./types";

export const APPOINTMENT_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

const TIME_ZONE = "Europe/Istanbul";

export function isAppointmentStatus(
  value: string,
): value is AppointmentStatus {
  return (APPOINTMENT_STATUSES as readonly string[]).includes(value);
}

export function appointmentStatusLabel(status: string) {
  if (status === "pending") return "Onay bekliyor";
  if (status === "confirmed") return "Onaylandı";
  if (status === "completed") return "Tamamlandı";
  if (status === "cancelled") return "İptal";
  if (status === "upcoming") return "Yaklaşan";
  if (status === "past") return "Geçmiş";
  return status;
}

export function formatAppointmentDate(date: string) {
  const parsed = new Date(`${date}T00:00:00+03:00`);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    timeZone: TIME_ZONE,
  });
}

export function formatAppointmentClock(time: string) {
  return time.slice(0, 5);
}

export function formatAppointmentCreatedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: TIME_ZONE,
  });
}

export function istanbulDateParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const pick = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  return {
    date: `${pick("year")}-${pick("month")}-${pick("day")}`,
    time: `${pick("hour")}:${pick("minute")}`,
  };
}

export function isUpcomingAppointment(
  appointment: Pick<
    AppointmentRecord,
    "appointmentDate" | "startTime" | "status"
  >,
  now = new Date(),
) {
  if (appointment.status === "cancelled" || appointment.status === "completed") {
    return false;
  }

  const { date, time } = istanbulDateParts(now);
  const start = formatAppointmentClock(appointment.startTime);

  if (appointment.appointmentDate > date) return true;
  if (appointment.appointmentDate < date) return false;
  return start >= time;
}

export function summarizeAppointments(
  items: AppointmentRecord[],
  now = new Date(),
): AppointmentSummary {
  const { date } = istanbulDateParts(now);

  return {
    today: items.filter(
      (item) =>
        item.appointmentDate === date && item.status !== "cancelled",
    ).length,
    upcoming: items.filter((item) => isUpcomingAppointment(item, now)).length,
    pending: items.filter((item) => item.status === "pending").length,
    completed: items.filter((item) => item.status === "completed").length,
    cancelled: items.filter((item) => item.status === "cancelled").length,
  };
}

export function groupCustomerAppointments(
  items: AppointmentRecord[],
  now = new Date(),
): CustomerAppointmentGroups {
  const upcoming: AppointmentRecord[] = [];
  const past: AppointmentRecord[] = [];
  const cancelled: AppointmentRecord[] = [];

  for (const item of items) {
    if (item.status === "cancelled") {
      cancelled.push(item);
      continue;
    }

    if (item.status === "completed" || !isUpcomingAppointment(item, now)) {
      past.push(item);
      continue;
    }

    upcoming.push(item);
  }

  return { upcoming, past, cancelled };
}

export function adminStatusActions(status: AppointmentStatus) {
  if (status === "pending") {
    return [
      { status: "confirmed" as const, label: "Onayla" },
      { status: "cancelled" as const, label: "İptal Et" },
    ];
  }

  if (status === "confirmed") {
    return [
      { status: "completed" as const, label: "Tamamlandı" },
      { status: "cancelled" as const, label: "İptal Et" },
    ];
  }

  return [];
}

export function activeSlotKey(date: string, startTime: string) {
  return `${date}|${formatAppointmentClock(startTime)}`;
}

export function hasActiveSlotConflict(
  items: Array<{
    appointmentDate: string;
    startTime: string;
    status: string;
    id?: string;
  }>,
  date: string,
  startTime: string,
  ignoreId?: string,
) {
  const key = activeSlotKey(date, startTime);

  return items.some((item) => {
    if (ignoreId && item.id === ignoreId) return false;
    if (item.status !== "pending" && item.status !== "confirmed") return false;
    return activeSlotKey(item.appointmentDate, item.startTime) === key;
  });
}

export function sortAdminAppointments(items: AppointmentRecord[]) {
  const rank = (status: AppointmentStatus) => {
    if (status === "pending") return 0;
    if (status === "confirmed") return 1;
    if (status === "completed") return 2;
    return 3;
  };

  return [...items].sort((a, b) => {
    const byStatus = rank(a.status) - rank(b.status);
    if (byStatus !== 0) return byStatus;
    if (a.appointmentDate !== b.appointmentDate) {
      return a.appointmentDate.localeCompare(b.appointmentDate);
    }
    return a.startTime.localeCompare(b.startTime);
  });
}
