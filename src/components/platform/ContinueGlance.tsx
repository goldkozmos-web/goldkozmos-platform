"use client";

import { useRef, useState, type PointerEvent } from "react";
import { PLATFORM_CATALOG } from "../../data/platformFlow";
import ContinueCard from "./ContinueCard";
import { usePlayback } from "./PlaybackProvider";

type ContinueGlanceProps = {
  platformId?: (typeof PLATFORM_CATALOG)[number]["id"];
  variant?: "glance" | "page";
};

export default function ContinueGlance({
  platformId,
  variant = "glance",
}: ContinueGlanceProps) {
  const { latest, forPlatform, session, dismissContinue } = usePlayback();
  const item = platformId ? forPlatform(platformId) : latest;
  const liveRecording = Boolean(
    session?.youtubeId || session?.spotifyEmbedUrl || session?.audioUrl,
  );
  const [offset, setOffset] = useState(0);
  const [phase, setPhase] = useState<"idle" | "dragging" | "leaving">("idle");
  const start = useRef<{ x: number; y: number } | null>(null);
  const offsetRef = useRef(0);

  // Mini dock / player is the live control; the continue card is for after close.
  if (liveRecording) {
    return null;
  }

  if (variant === "page" && !item) {
    return null;
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !item || phase === "leaving") {
      return;
    }

    const target = event.target;

    if (
      target instanceof Element &&
      target.closest("button, a, input, textarea, select")
    ) {
      return;
    }

    start.current = { x: event.clientX, y: event.clientY };
    offsetRef.current = 0;
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!start.current || phase === "leaving") {
      return;
    }

    const dx = event.clientX - start.current.x;
    const dy = event.clientY - start.current.y;

    if (phase !== "dragging") {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        return;
      }

      if (Math.abs(dy) >= Math.abs(dx)) {
        start.current = null;
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      setPhase("dragging");
    }

    const next = Math.max(0, dx);
    offsetRef.current = next;
    setOffset(next);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!start.current) {
      return;
    }

    const wasDragging = phase === "dragging";
    start.current = null;

    if (!wasDragging || !item) {
      setPhase("idle");
      setOffset(0);
      offsetRef.current = 0;
      return;
    }

    const width = event.currentTarget.offsetWidth || 320;
    const traveled = offsetRef.current;

    if (traveled > Math.min(96, width * 0.28)) {
      setPhase("leaving");
      setOffset(width + 48);
      window.setTimeout(() => {
        dismissContinue(item);
      }, 220);
      return;
    }

    setPhase("idle");
    setOffset(0);
    offsetRef.current = 0;
  }

  return (
    <div
      className={`${
        variant === "glance" ? "platformGlance" : "platformPageContinue"
      } platformContinueSwipe`}
    >
      <div
        className={`platformContinueSwipeInner${
          phase === "dragging" ? " isDragging" : ""
        }${phase === "leaving" ? " isLeaving" : ""}`}
        style={{
          transform: offset ? `translate3d(${offset}px, 0, 0)` : undefined,
          opacity: phase === "leaving" ? 0 : 1,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <ContinueCard
          item={item}
          variant={variant}
        />
      </div>
    </div>
  );
}
