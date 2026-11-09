"use client";

import { useEffect, useState } from "react";

import { monthlyDailyMessage } from "../../lib/daily/monthly";
import { saveDailyMessageImage, shareDailyMessage } from "../../lib/daily/share";
import "../../styles/daily-practice.css";
import { istanbulMessageDay } from "../../lib/daily/visual";

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
  const [message, setMessage] = useState<ReturnType<typeof monthlyDailyMessage> | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    let active = true;
    let loadedDay = "";
    async function refresh() {
      const day = istanbulMessageDay();
      if (day === loadedDay) return;
      const next = monthlyDailyMessage(day);
      if (active && next) { setMessage(next); setNote(""); loadedDay = day; }
    }
    void refresh();
    const timer = window.setInterval(() => { if (document.visibilityState === "visible") void refresh(); }, 60000);
    const focus = () => { void refresh(); };
    window.addEventListener("focus", focus);
    return () => { active = false; window.clearInterval(timer); window.removeEventListener("focus", focus); };
  }, []);

  if (!message) {
    return null;
  }

  const dateLabel = formatDay(message.assignedOn);

  return (
    <article className="dailyMessageCard dailyLandscapeCard dailyPortraitCard" style={{ backgroundImage: `linear-gradient(180deg,rgba(15,24,20,.18),rgba(15,24,20,.12) 25%,rgba(15,24,20,.65) 60%,rgba(15,24,20,.85)),url('${message.image}')` }}>
      <div className="dailyLandscapeHeading">
      <p className="dailyEyebrow">GÜNÜN MESAJI</p>
      <time dateTime={message.assignedOn}>{dateLabel}</time>
      </div>
      <span className="dailyLandscapeQuote" aria-hidden="true">“</span>
      <p className="dailyMessageBody">{message.body}</p>
      <div className="dailyMessageActions">
        <button
          type="button"
          onClick={() => {
            void shareDailyMessage(message.body, message.assignedOn).then((result) => {
              setNote(result === "aborted" ? "" : result === "saved" ? "Görsel indirildi." : result === "copied" ? "Mesaj kopyalandı." : "Mesaj paylaşıldı.");
            }).catch(() => setNote("Paylaşım hazırlanamadı. Yeniden deneyebilirsin."));
          }}
        >
          Paylaş
        </button>
        <button
          type="button"
          onClick={() => {
            void saveDailyMessageImage(message.body, message.assignedOn).then(() => {
              setNote("Görsel indirildi.");
            }).catch(() => setNote("Görsel kaydedilemedi. Yeniden deneyebilirsin."));
          }}
        >
          Görseli kaydet
        </button>
      </div>
      {note ? <p className="dailyStatus" role="status">{note}</p> : null}
    </article>
  );
}
