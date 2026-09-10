"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { presenceKindFromHref, shouldSkipPresencePath } from "../../lib/presence/labels";

function ping(body: Record<string, string>) {
  const payload = JSON.stringify(body);
  const blob = new Blob([payload], { type: "application/json" });

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/presence", blob);
    return;
  }

  void fetch("/api/presence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  });
}

export default function PresenceTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (shouldSkipPresencePath(pathname)) {
      return;
    }

    const path = `${pathname}${window.location.search}`;
    ping({
      kind: "page",
      path,
      referrer: document.referrer || "",
    });

    const beat = () => {
      if (document.visibilityState === "hidden") {
        return;
      }
      ping({
        kind: "heartbeat",
        path: `${window.location.pathname}${window.location.search}`,
        referrer: document.referrer || "",
      });
    };

    const timer = window.setInterval(beat, 20000);
    document.addEventListener("visibilitychange", beat);

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
      document.removeEventListener("click", onClick, true);
    };
  }, [pathname]);

  return null;
}
