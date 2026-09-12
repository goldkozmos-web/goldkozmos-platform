"use client";

import { useEffect, useState } from "react";

import type { DailyMessage } from "../../lib/daily/types";
import { fetchTodayMessage } from "../../lib/daily/client";
import { saveDailyMessageImage, shareDailyMessage } from "../../lib/daily/share";
import "../../styles/daily-practice.css";

function dismissKey(day: string) {
  return `gk-daily-message-closed-${day}`;
}

export default function DailyMessageExperience() {
  const [message, setMessage] = useState<DailyMessage | null>(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    void fetchTodayMessage().then((next) => {
      if (!next) return;
      setMessage(next);
      try {
        if (window.localStorage.getItem(dismissKey(next.assignedOn)) !== "1") {
          setOpen(true);
        }
      } catch {
        setOpen(true);
      }
    });
  }, []);

  if (!message) return null;

  function close() {
    if (!message) return;
    setOpen(false);
    try {
      window.localStorage.setItem(dismissKey(message.assignedOn), "1");
    } catch {
      // ignore
    }
  }

  return (
    <>
      <button
        type="button"
        className="dailyMessageDock"
        onClick={() => setOpen(true)}
      >
        <span>BUGÜN</span>
        <strong>Günün Mesajını Gör</strong>
      </button>

      {open ? (
        <div className="dailyStoryBack" onClick={close}>
          <article
            className="dailyStoryCard"
            role="dialog"
            aria-labelledby="dailyStoryTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="dailyEyebrow" id="dailyStoryTitle">
              BUGÜN
            </p>
            <p className="dailyStoryBody">{message.body}</p>
            <div className="dailyMessageActions">
              <button
                type="button"
                onClick={() => {
                  void shareDailyMessage(message.body).then((result) => {
                    setNote(
                      result === "saved"
                        ? "Görsel kaydedildi."
                        : result === "copied"
                          ? "Metin kopyalandı."
                          : "Paylaşıma hazır.",
                    );
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
                Görseli Kaydet
              </button>
              <button type="button" onClick={close}>
                Kapat
              </button>
            </div>
            {note ? <p className="dailyStatus">{note}</p> : null}
          </article>
        </div>
      ) : null}
    </>
  );
}
