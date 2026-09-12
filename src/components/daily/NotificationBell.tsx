"use client";

import { useCallback, useEffect, useState } from "react";

import type { AppNotification } from "../../lib/daily/types";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../../lib/daily/client";
import "../../styles/daily-practice.css";

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AppNotification[]>([]);

  const reload = useCallback(async () => {
    setItems(await fetchNotifications());
  }, []);

  useEffect(() => {
    void reload();
    const timer = window.setInterval(() => {
      void reload();
    }, 60_000);
    return () => window.clearInterval(timer);
  }, [reload]);

  const unread = items.filter((item) => !item.isRead).length;

  return (
    <>
      <button
        type="button"
        className="profilimBell"
        aria-label="Bildirimler"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 22a2.4 2.4 0 0 0 2.35-1.9H9.65A2.4 2.4 0 0 0 12 22Zm8-5.2V11a8 8 0 1 0-16 0v5.8L2 19v1h20v-1l-2-2.2Z"
          />
        </svg>
        {unread > 0 ? <span className="profilimBellBadge">{unread}</span> : null}
      </button>

      {open ? (
        <div className="profilimDrawerBackdrop" onClick={() => setOpen(false)}>
          <div
            className="profilimDrawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notificationCenterTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="profilimDrawerHandle" aria-hidden="true" />
            <header className="profilimDrawerTop">
              <div>
                <p className="profilimDrawerEyebrow">BİLDİRİM</p>
                <h2 id="notificationCenterTitle">Bildirim Merkezi</h2>
              </div>
              <button
                type="button"
                className="profilimDrawerClose"
                onClick={() => setOpen(false)}
                aria-label="Kapat"
              >
                ×
              </button>
            </header>
            <div className="profilimDrawerScroll">
              {unread > 0 ? (
                <button
                  type="button"
                  className="dailyInlineAction"
                  onClick={() => {
                    void markAllNotificationsRead().then(() => reload());
                  }}
                >
                  Tümünü okundu işaretle
                </button>
              ) : null}
              {items.length === 0 ? (
                <p className="profilimDrawerNote">Henüz bildirimin yok.</p>
              ) : (
                <ul className="profilimDrawerList">
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="profilimInboxItem"
                        onClick={() => {
                          void markNotificationRead(item.id).then(() => reload());
                          if (item.link) {
                            window.location.assign(item.link);
                          }
                        }}
                      >
                        <span>{item.isRead ? "Okundu" : "Yeni"}</span>
                        <strong>{item.title}</strong>
                        <small>{formatWhen(item.createdAt)}</small>
                        <p>{item.body}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
