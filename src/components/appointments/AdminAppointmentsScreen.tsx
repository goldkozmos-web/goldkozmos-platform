"use client";

import { useState } from "react";

import {
  adminStatusActions,
  appointmentStatusLabel,
  formatAppointmentClock,
  formatAppointmentCreatedAt,
  formatAppointmentDate,
  sortAdminAppointments,
  summarizeAppointments,
} from "../../lib/appointments/status";
import type { AppointmentRecord, AppointmentStatus } from "../../lib/appointments/types";
import { useLiveAppointments } from "./useLiveAppointments";

export default function AdminAppointmentsScreen() {
  const [toast, setToast] = useState<AppointmentRecord | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const { appointments, loading } = useLiveAppointments({
    enabled: true,
    mineOnly: false,
    onInsert: (appointment) => {
      setToast(appointment);
      window.setTimeout(() => {
        setToast((current) => (current?.id === appointment.id ? null : current));
      }, 4200);
    },
  });

  const summary = summarizeAppointments(appointments);
  const list = sortAdminAppointments(appointments);

  async function updateStatus(id: string, status: AppointmentStatus) {
    setBusyId(id);
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusyId(null);
  }

  return (
    <section className="appointmentsAdminShell">
      <header className="appointmentsAdminHeader">
        <p className="appointmentsAdminEyebrow">CANLI RANDEVU</p>
        <h1>Randevu Takibi</h1>
        <p>Yeni kayıtlar ve durum değişiklikleri sayfa yenilenmeden görünür.</p>
      </header>

      <div className="appointmentsAdminSummary">
        <article className="appointmentsAdminStat">
          <span>Bugünkü Randevular</span>
          <strong>{summary.today}</strong>
        </article>
        <article className="appointmentsAdminStat">
          <span>Yaklaşanlar</span>
          <strong>{summary.upcoming}</strong>
        </article>
        <article className="appointmentsAdminStat">
          <span>Onay Bekleyenler</span>
          <strong>{summary.pending}</strong>
        </article>
        <article className="appointmentsAdminStat">
          <span>Tamamlananlar</span>
          <strong>{summary.completed}</strong>
        </article>
        <article className="appointmentsAdminStat">
          <span>İptal Edilenler</span>
          <strong>{summary.cancelled}</strong>
        </article>
      </div>

      {loading && list.length === 0 ? (
        <p className="appointmentsAdminEmpty">Randevular açılıyor…</p>
      ) : null}

      {!loading && list.length === 0 ? (
        <p className="appointmentsAdminEmpty">
          Henüz kayıtlı bir randevu yok. Yeni bir randevu oluşunca burada anında görünür.
        </p>
      ) : null}

      <div className="appointmentsAdminList">
        {list.map((item) => {
          const actions = adminStatusActions(item.status);

          return (
            <article key={item.id} className="appointmentsAdminCard">
              <div className="appointmentsAdminCardTop">
                <div>
                  <p className="appointmentsAdminEyebrow">{item.serviceName}</p>
                  <h2>{item.clientName}</h2>
                  <small>{item.clientEmail || "E-posta yok"}</small>
                </div>
                <span className={`appointmentsAdminStatus is${item.status[0].toUpperCase()}${item.status.slice(1)}`}>
                  {appointmentStatusLabel(item.status)}
                </span>
              </div>

              <div className="appointmentsAdminMeta">
                <div>
                  <span>Hizmet</span>
                  <strong>{item.serviceName}</strong>
                </div>
                <div>
                  <span>Tarih</span>
                  <strong>{formatAppointmentDate(item.appointmentDate)}</strong>
                </div>
                <div>
                  <span>Saat</span>
                  <strong>{formatAppointmentClock(item.startTime)}</strong>
                </div>
                <div>
                  <span>Durum</span>
                  <strong>{appointmentStatusLabel(item.status)}</strong>
                </div>
                <div>
                  <span>Oluşturulma</span>
                  <strong>{formatAppointmentCreatedAt(item.createdAt)}</strong>
                </div>
              </div>

              {actions.length ? (
                <div className="appointmentsAdminActions">
                  {actions.map((action) => (
                    <button
                      key={action.status}
                      type="button"
                      className={action.status === "cancelled" ? "isDanger" : ""}
                      disabled={busyId === item.id}
                      onClick={() => updateStatus(item.id, action.status)}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {toast ? (
        <aside className="appointmentsAdminToast" role="status">
          <p className="appointmentsAdminEyebrow">YENİ RANDEVU</p>
          <strong>{toast.serviceName}</strong>
          <p>
            {formatAppointmentDate(toast.appointmentDate)} •{" "}
            {formatAppointmentClock(toast.startTime)}
          </p>
        </aside>
      ) : null}
    </section>
  );
}
