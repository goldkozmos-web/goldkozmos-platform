export const APPOINTMENT_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export type AppointmentRecord = {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  appointmentDate: string;
  startTime: string;
  endTime: string | null;
  status: AppointmentStatus;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  updatedAt: string;
};

export type AppointmentRow = {
  id: string;
  user_id: string;
  service_id: string | null;
  service_name: string;
  appointment_date: string;
  start_time: string;
  end_time: string | null;
  status: string;
  client_name: string | null;
  client_email: string | null;
  created_at: string;
  updated_at: string;
};

export type AppointmentSummary = {
  today: number;
  upcoming: number;
  pending: number;
  completed: number;
  cancelled: number;
};

export type CustomerAppointmentGroups = {
  upcoming: AppointmentRecord[];
  past: AppointmentRecord[];
  cancelled: AppointmentRecord[];
};
