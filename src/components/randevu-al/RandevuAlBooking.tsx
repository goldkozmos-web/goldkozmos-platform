"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  BIREBIR_SERVICE_CARDS,
  ENERJI_SERVICE_CARDS,
  TAROT_SERVICE_CARD,
  canSubmitRandevuRequest,
  formatRandevuDate,
  formatRandevuWeekday,
  randevuMinIso,
  randevuRequestSummary,
  randevuWhatsappHref,
  serviceFromQuery,
  type RandevuServiceCard,
} from "../../lib/randevu-al/booking";

const WEEKDAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

function pad(value: number) {
  return String(value).padStart(2, "0");
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

function ServiceCard({
  service,
  selected,
  onSelect,
}: {
  service: RandevuServiceCard;
  selected: boolean;
  onSelect: (name: string) => void;
}) {
  return (
    <button
      type="button"
      className={`randevuAlServiceCard${selected ? " isOn" : ""}`}
      onClick={() => onSelect(service.name)}
      aria-pressed={selected}
    >
      <span className="randevuAlServiceCopy">
        <strong>{service.name}</strong>
        <em>
          {service.duration} · {service.format}
        </em>
        <span>{service.note}</span>
      </span>
      <span className="randevuAlCheck" aria-hidden="true">
        {selected ? "✓" : ""}
      </span>
    </button>
  );
}

export default function RandevuAlBooking() {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(() =>
    serviceFromQuery(searchParams.get("service")),
  );
  const minIso = randevuMinIso();
  const [cursor, setCursor] = useState(() => {
    const [year, month] = minIso.split("-").map(Number);
    return { year, month: month - 1 };
  });

  useEffect(() => {
    const next = serviceFromQuery(searchParams.get("service"));
    if (next) setSelectedService(next);
  }, [searchParams]);

  const cells = useMemo(
    () => calendarCells(cursor.year, cursor.month),
    [cursor.month, cursor.year],
  );
  const ready = canSubmitRandevuRequest(selectedDate, selectedService);
  const summary = randevuRequestSummary(selectedDate, selectedService);
  const minMonth = minIso.slice(0, 7);
  const cursorMonth = `${cursor.year}-${pad(cursor.month + 1)}`;
  const prevMonthDisabled = cursorMonth <= minMonth;

  return (
    <section className="randevuAlBooking">
      <header className="randevuAlHeader">
        <p className="randevuAlEyebrow">GOLDKOZMOS RANDEVU</p>
        <h1>Günü ve çalışmayı seç</h1>
        <p>
          Bu bir talep formudur. Uygun saat Gold ile WhatsApp’ta netleşir;
          takvimdeki gün henüz rezervasyon kilidi değildir.
        </p>
      </header>

      <ol className="randevuAlSteps">
        <li className={selectedDate ? "isDone" : "isNow"}>
          <span>01</span>
          Gün
        </li>
        <li
          className={
            selectedService ? "isDone" : selectedDate ? "isNow" : undefined
          }
        >
          <span>02</span>
          Çalışma
        </li>
        <li className={ready ? "isNow" : undefined}>
          <span>03</span>
          Talep
        </li>
      </ol>

      <div className="randevuAlCalendar">
        <div className="randevuAlPanelHead">
          <span>01</span>
          <div>
            <h2>Günü seç</h2>
            <p>Yarın ve sonrası açık. Bugün için yer bırakılmıyor.</p>
          </div>
        </div>

        <div className="randevuAlCalendarNav">
          <button
            type="button"
            aria-label="Önceki ay"
            disabled={prevMonthDisabled}
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
                onClick={() => setSelectedDate(cell.iso as string)}
              >
                {cell.day}
              </button>
            );
          })}
        </div>

        {selectedDate ? (
          <p className="randevuAlDateChip">
            <strong>{formatRandevuDate(selectedDate)}</strong>
            <span>{formatRandevuWeekday(selectedDate)}</span>
          </p>
        ) : null}
      </div>

      {selectedDate ? (
        <div className="randevuAlServices">
          <div className="randevuAlPanelHead">
            <span>02</span>
            <div>
              <h2>Çalışmayı seç</h2>
              <p>
                Kartlar yalnızca seçim içindir; WhatsApp açılmaz. Saat, talep
                mesajında konuşulur.
              </p>
            </div>
          </div>

          <p className="randevuAlGroupLabel">Tarot</p>
          <div className="randevuAlServiceGrid isPair">
            <ServiceCard
              service={TAROT_SERVICE_CARD}
              selected={selectedService === TAROT_SERVICE_CARD.name}
              onSelect={setSelectedService}
            />
          </div>

          <p className="randevuAlGroupLabel">Birebir</p>
          <div className="randevuAlServiceGrid isPair">
            {BIREBIR_SERVICE_CARDS.map((service) => (
              <ServiceCard
                key={service.name}
                service={service}
                selected={selectedService === service.name}
                onSelect={setSelectedService}
              />
            ))}
          </div>

          <p className="randevuAlGroupLabel">Enerji çalışmaları</p>
          <div className="randevuAlServiceGrid">
            {ENERJI_SERVICE_CARDS.map((service) => (
              <ServiceCard
                key={service.name}
                service={service}
                selected={selectedService === service.name}
                onSelect={setSelectedService}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className={`randevuAlCta${ready ? " isReady" : ""}`}>
        <p>{summary}</p>
        {ready && selectedDate && selectedService ? (
          <a
            className="randevuAlWhatsapp"
            href={randevuWhatsappHref(selectedDate, selectedService)}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp’tan talep ilet
          </a>
        ) : (
          <button type="button" className="randevuAlWhatsapp isOff" disabled>
            WhatsApp’tan talep ilet
          </button>
        )}
      </div>
    </section>
  );
}
