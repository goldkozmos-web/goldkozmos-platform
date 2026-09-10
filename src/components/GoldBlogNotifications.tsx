"use client";

import { useEffect, useState } from "react";

import { formatRelativeTime } from "../lib/goldblog/commentValidation";

type Notice = {
  id: string;
  postId: string;
  excerpt: string;
  createdAt: string;
  readAt: string | null;
  actorName: string;
};

type GoldBlogNotificationsProps = {
  onOpenPost: (postId: string) => void;
};

export default function GoldBlogNotifications({
  onOpenPost,
}: GoldBlogNotificationsProps) {
  const [items, setItems] = useState<Notice[]>([]);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const unread = items.filter((item) => !item.readAt).length;

  async function load() {
    try {
      const response = await fetch("/api/goldblog/notifications", {
        cache: "no-store",
      });

      if (response.status === 401 || response.status === 503) {
        setVisible(false);
        setItems([]);
        return;
      }

      const data = await response.json();
      setVisible(true);
      setItems(data.notifications ?? []);
    } catch {
      setVisible(false);
    }
  }

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => {
      void load();
    }, 20000);

    return () => window.clearInterval(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="goldBlogNotify">
      <button
        type="button"
        className="goldBlogNotifyBell"
        aria-label="Yorum bildirimleri"
        onClick={async () => {
          const next = !open;
          setOpen(next);

          if (next && unread > 0) {
            await fetch("/api/goldblog/notifications", { method: "POST" });
            void load();
          }
        }}
      >
        ●
        {unread > 0 ? <span>{unread > 9 ? "9+" : unread}</span> : null}
      </button>

      {open ? (
        <div className="goldBlogNotifyPanel">
          <p>Bildirimler</p>
          {items.length === 0 ? (
            <span>Yeni bir yanıt yok.</span>
          ) : (
            items.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setOpen(false);
                  onOpenPost(item.postId);
                }}
              >
                <strong>{item.actorName}</strong> yorumuna yanıt verdi
                <em>{item.excerpt}</em>
                <small>{formatRelativeTime(item.createdAt)}</small>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
