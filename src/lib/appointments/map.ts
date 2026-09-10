import { isAppointmentStatus } from "./status";
import type { AppointmentRecord, AppointmentRow } from "./types";

export function mapAppointmentRow(
  row: AppointmentRow,
): AppointmentRecord | null {
  if (!isAppointmentStatus(row.status)) {
    return null;
  }

  return {
    id: row.id,
    userId: row.user_id,
    serviceId: row.service_id ?? "",
    serviceName: row.service_name,
    appointmentDate: row.appointment_date,
    startTime: row.start_time,
    endTime: row.end_time,
    status: row.status,
    clientName: row.client_name?.trim() || "Danışan",
    clientEmail: row.client_email?.trim() || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const APPOINTMENT_SELECT =
  "id, user_id, service_id, service_name, appointment_date, start_time, end_time, status, client_name, client_email, created_at, updated_at";
