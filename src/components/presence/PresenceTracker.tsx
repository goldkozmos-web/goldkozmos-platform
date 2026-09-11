"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { presenceKindFromHref, shouldSkipPresencePath } from "../../lib/presence/labels";

const VISITOR_STORAGE_KEY = "gk_zid";

function visitorKey() {
  try {
    const existing = window.localStorage.getItem(VISITOR_STORAGE_KEY)?.trim();
    if (existing && existing.length >= 8) {
      return existing;
    }
    const next = window.crypto.randomUUID();
    window.localStorage.setItem(VISITOR_STORAGE_KEY, next);
    return next;
  } catch {
    return "";
  }
}

function ping(body: Record<string, string>) {
  const payload = JSON.stringify({
    ...body,
    visitorKey: visitorKey(),
  });

  void fetch("/api/presence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
    credentials: "same-origin",
  });
}

export default function PresenceTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (shouldSkipPresencePath(pathname)) {
      return;
    }

    const send = (kind: "page" | "heartbeat") => {
      ping({
        kind,
        path: `${window.location.pathname}${window.location.search}`,
        referrer: document.referrer || "",
      });
    };

    send("page");

    const beat = () => {
      if (document.visibilityState === "hidden") {
        return;
      }
      send("heartbeat");
    };

    const timer = window.setInterval(beat, 8000);
    document.addEventListener("visibilitychange", beat);
    window.addEventListener("focus", beat);

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement) || !link.href) {
        return;
      }

      const kind = presenceKindFromHref(
        link.href,
        `${window.location.pathname}${window.location.search}`,
      );
      if (!kind) {
        return;
      }

      ping({
        kind,
        path: `${window.location.pathname}${window.location.search}`,
        referrer: document.referrer || "",
        href: link.href,
      });
    }

    document.addEventListener("click", onClick, true);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", beat);
      window.removeEventListener("focus", beat);
      document.removeEventListener("click", onClick, true);
    };
  }, [pathname]);

  return null;
}
