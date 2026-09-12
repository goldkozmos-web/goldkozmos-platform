"use client";

import { useEffect, useState } from "react";

import type { DailyMessage } from "../../lib/daily/types";
import { fetchTodayMessage } from "../../lib/daily/client";
import { saveDailyMessageImage, shareDailyMessage } from "../../lib/daily/share";
import "../../styles/daily-practice.css";

function formatDay(value: string) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DailyMessageCard() {
  const [message, setMessage] = useState<DailyMessage | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    void fetchTodayMessage().then(setMessage);
  }, []);

  if (!message) {
    return null;
  }

  const dateLabel = formatDay(message.assignedOn);

  return (
    <article className="dailyMessageCard">
      <p className="dailyEyebrow">GÜNÜN MESAJI</p>
      <time dateTime={message.assignedOn}>{dateLabel}</time>
      <p className="dailyMessageBody">{message.body}</p>
      <div className="dailyMessageActions">
        <button
          type="button"
          onClick={() => {
            void shareDailyMessage(message.body).then(() => {
              setNote("Paylaşıma hazır.");
            });
          }}
        >
          Paylaş
        </button>
        <button
          type="button"
          onClick={() => {
            void saveDailyMessageImage(message.body, message.assignedOn).then(() => {
              setNote("Görsel indirildi.");
            });
          }}
        >
          Görsel olarak kaydet
        </button>
      </div>
      {note ? <p className="dailyStatus">{note}</p> : null}
    </article>
  );
}
