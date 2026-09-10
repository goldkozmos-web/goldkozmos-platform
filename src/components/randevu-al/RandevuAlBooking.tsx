"use client";

import { useMemo, useState } from "react";

import {
  BIREBIR_SERVICES,
  ENERJI_SERVICES,
  canSubmitRandevuRequest,
  formatRandevuDate,
  randevuWhatsappHref,
} from "../../lib/randevu-al/booking";

const WEEKDAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function todayIso() {
  return toIsoDate(new Date());
}

function calendarCells(year: number, month: number) {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ iso: string | null; day: number | null }> = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push({ iso: null, day: null });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      iso: `${year}-${pad(month + 1)}-${pad(day)}`,
      day,
    });
  }

  return cells;
}

function monthLabel(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
  });
}

export default function RandevuAlBooking() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const minIso = todayIso();
  const cells = useMemo(
    () => calendarCells(cursor.year, cursor.month),
    [cursor.month, cursor.year],
  );
  const ready = canSubmitRandevuRequest(selectedDate, selectedService);

  function selectDate(iso: string) {
    setSelectedDate(iso);
  }

  function selectService(service: string) {
    setSelectedService(service);
  }

  return (
    <section className="randevuAlBooking">
      <header className="randevuAlHeader">
        <p className="randevuAlEyebrow">RANDEVU</p>
        <h1>Randevu al</h1>
        <p>Önce günü, sonra hizmeti seç. WhatsApp yalnızca en alttaki butondan açılır.</p>
      </header>

      <div className="randevuAlCalendar">
        <div className="randevuAlCalendarNav">
          <button
            type="button"
            aria-label="Önceki ay"
            onClick={() =>
              setCursor((current) => {
                const date = new Date(current.year, current.month - 1, 1);
                return { year: date.getFullYear(), month: date.getMonth() };
              })
            }
          >
            ‹
          </button>
          <strong>{monthLabel(cursor.year, cursor.month)}</strong>
          <button
            type="button"
            aria-label="Sonraki ay"
            onClick={() =>
              setCursor((current) => {
                const date = new Date(current.year, current.month + 1, 1);
                return { year: date.getFullYear(), month: date.getMonth() };
              })
            }
          >
            ›
          </button>
        </div>

        <div className="randevuAlWeek">
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="randevuAlGrid">
          {cells.map((cell, index) => {
            if (!cell.iso || !cell.day) {
              return <span key={`empty-${index}`} className="randevuAlDay isMuted" />;
            }

            const disabled = cell.iso < minIso;

            return (
              <button
                key={cell.iso}
                type="button"
                className={`randevuAlDay${selectedDate === cell.iso ? " isOn" : ""}`}
                disabled={disabled}
                onClick={() => selectDate(cell.iso as string)}
              >
                {cell.day}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate ? (
        <div className="randevuAlServices">
          <h2>Hangi hizmet için randevu almak istiyorsunuz?</h2>
          <p>
            Seçilen gün: <strong>{formatRandevuDate(selectedDate)}</strong>
          </p>

          <p className="randevuAlGroupLabel">Birebir</p>
          <div className="randevuAlServiceGrid">
            {BIREBIR_SERVICES.map((service) => (
              <button
                key={service}
                type="button"
                className={`randevuAlServiceCard${
                  selectedService === service ? " isOn" : ""
                }`}
                onClick={() => selectService(service)}
              >
                <span>{service}</span>
                {selectedService === service ? (
                  <span className="randevuAlCheck" aria-hidden="true">
                    ✓
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <p className="randevuAlGroupLabel">Enerji Çalışmaları</p>
          <div className="randevuAlServiceGrid">
            {ENERJI_SERVICES.map((service) => (
              <button
                key={service}
                type="button"
                className={`randevuAlServiceCard${
                  selectedService === service ? " isOn" : ""
                }`}
                onClick={() => selectService(service)}
              >
                <span>{service}</span>
                {selectedService === service ? (
                  <span className="randevuAlCheck" aria-hidden="true">
                    ✓
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {ready && selectedDate && selectedService ? (
        <a
          className="randevuAlWhatsapp"
          href={randevuWhatsappHref(selectedDate, selectedService)}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp’tan Randevu Talebi Oluştur
        </a>
      ) : (
        <button type="button" className="randevuAlWhatsapp isOff" disabled>
          WhatsApp’tan Randevu Talebi Oluştur
        </button>
      )}
    </section>
  );
}
