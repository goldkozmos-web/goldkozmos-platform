import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  userCanInsertAppointment,
  userCanReadAppointment,
  userCanUpdateAppointmentStatus,
} from "../src/lib/appointments/access.ts";
import {
  adminStatusActions,
  appointmentStatusLabel,
  groupCustomerAppointments,
  hasActiveSlotConflict,
  summarizeAppointments,
} from "../src/lib/appointments/status.ts";
import type { AppointmentRecord } from "../src/lib/appointments/types.ts";

const now = new Date("2026-09-10T12:00:00+03:00");

function appt(
  patch: Partial<AppointmentRecord> & Pick<AppointmentRecord, "id" | "status">,
): AppointmentRecord {
  return {
    userId: "user-1",
    serviceId: "chakra",
    serviceName: "7 Çakra Dengeleme",
    appointmentDate: "2026-09-10",
    startTime: "18:00:00",
    endTime: "19:00:00",
    clientName: "Ayşe",
    clientEmail: "ayse@example.com",
    createdAt: "2026-09-10T08:00:00.000Z",
    updatedAt: "2026-09-10T08:00:00.000Z",
    ...patch,
  };
}

test("admin can read every appointment; a customer only sees their own", () => {
  assert.equal(
    userCanReadAppointment({
      viewerId: "admin",
      viewerIsAdmin: true,
      appointmentUserId: "user-1",
    }),
    true,
  );
  assert.equal(
    userCanReadAppointment({
      viewerId: "user-1",
      viewerIsAdmin: false,
      appointmentUserId: "user-1",
    }),
    true,
  );
  assert.equal(
    userCanReadAppointment({
      viewerId: "user-2",
      viewerIsAdmin: false,
      appointmentUserId: "user-1",
    }),
    false,
  );
  assert.equal(
    userCanReadAppointment({
      viewerId: null,
      viewerIsAdmin: false,
      appointmentUserId: "user-1",
    }),
    false,
  );
});

test("only admin can change status; customers can only insert their own row", () => {
  assert.equal(userCanUpdateAppointmentStatus({ viewerIsAdmin: true }), true);
  assert.equal(userCanUpdateAppointmentStatus({ viewerIsAdmin: false }), false);
  assert.equal(
    userCanInsertAppointment({ viewerId: "user-1", appointmentUserId: "user-1" }),
    true,
  );
  assert.equal(
    userCanInsertAppointment({ viewerId: "user-1", appointmentUserId: "user-2" }),
    false,
  );
});

test("customer groups split upcoming, past, and cancelled", () => {
  const groups = groupCustomerAppointments(
    [
      appt({ id: "a", status: "pending", startTime: "18:00:00" }),
      appt({ id: "b", status: "confirmed", appointmentDate: "2026-09-09" }),
      appt({ id: "c", status: "completed" }),
      appt({ id: "d", status: "cancelled" }),
    ],
    now,
  );

  assert.deepEqual(
    groups.upcoming.map((item) => item.id),
    ["a"],
  );
  assert.deepEqual(
    groups.past.map((item) => item.id),
    ["b", "c"],
  );
  assert.deepEqual(
    groups.cancelled.map((item) => item.id),
    ["d"],
  );
});

test("admin summary cards count today, upcoming, pending, completed, cancelled", () => {
  const summary = summarizeAppointments(
    [
      appt({ id: "1", status: "pending" }),
      appt({ id: "2", status: "confirmed", appointmentDate: "2026-09-11" }),
      appt({ id: "3", status: "completed", appointmentDate: "2026-09-10" }),
      appt({ id: "4", status: "cancelled", appointmentDate: "2026-09-10" }),
    ],
    now,
  );

  assert.equal(summary.today, 2);
  assert.equal(summary.upcoming, 2);
  assert.equal(summary.pending, 1);
  assert.equal(summary.completed, 1);
  assert.equal(summary.cancelled, 1);
});

test("the same date and time cannot be reserved twice while active", () => {
  const existing = [
    appt({ id: "open", status: "confirmed", appointmentDate: "2026-09-10", startTime: "18:00:00" }),
    appt({ id: "free", status: "cancelled", appointmentDate: "2026-09-10", startTime: "19:00:00" }),
  ];

  assert.equal(
    hasActiveSlotConflict(existing, "2026-09-10", "18:00:00"),
    true,
  );
  assert.equal(
    hasActiveSlotConflict(existing, "2026-09-10", "19:00:00"),
    false,
  );
  assert.equal(
    hasActiveSlotConflict(existing, "2026-09-10", "18:00:00", "open"),
    false,
  );
});

test("admin card actions match pending and confirmed states", () => {
  assert.deepEqual(
    adminStatusActions("pending").map((item) => item.label),
    ["Onayla", "İptal Et"],
  );
  assert.deepEqual(
    adminStatusActions("confirmed").map((item) => item.label),
    ["Tamamlandı", "İptal Et"],
  );
  assert.deepEqual(adminStatusActions("completed"), []);
  assert.equal(appointmentStatusLabel("pending"), "Onay bekliyor");
});

test("migration keeps RLS, unique active slots, and realtime on the existing project", () => {
  const sql = fs.readFileSync(
    path.join(
      process.cwd(),
      "supabase/migrations/20260910120000_appointments.sql",
    ),
    "utf8",
  );

  assert.match(sql, /appointments_active_slot_idx/);
  assert.match(sql, /is_appointment_admin/);
  assert.match(sql, /appointments_select_own_or_admin/);
  assert.match(sql, /appointments_update_admin/);
  assert.match(sql, /supabase_realtime/);
  assert.doesNotMatch(sql, /create table if not exists public.profiles/);
});
