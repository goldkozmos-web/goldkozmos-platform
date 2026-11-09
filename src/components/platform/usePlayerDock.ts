"use client";

import { useRef, useState, type MouseEvent, type PointerEvent } from "react";

export function usePlayerDock(enabled: boolean, contentId?: string, onCollapse?: () => void) {
  const [compactId, setCompactId] = useState<string | null>(null);
  const sessionKey = contentId ?? "player";
  const compact = enabled && compactId === sessionKey;
  const [edge, setEdge] = useState<"left" | "right">("left");
  const [top, setTop] = useState(240);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const gesture = useRef<{ x: number; y: number; compact: boolean } | null>(null);
  const moved = useRef(false);

  function position(y: number) {
    setTop(Math.max(90, Math.min(y - 42, window.innerHeight - 200)));
  }
  function collapse() {
    position(window.innerHeight * .62);
    setCompactId(sessionKey);
    onCollapse?.();
  }
  function restore(event?: MouseEvent) {
    if (event?.detail && moved.current) return false;
    setCompactId(null);
    return true;
  }
  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    moved.current = false;
    gesture.current = { x: event.clientX, y: event.clientY, compact };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!gesture.current) return;
    const x = event.clientX - gesture.current.x, y = event.clientY - gesture.current.y;
    if (Math.hypot(x, y) > 8) moved.current = true;
    if (moved.current) setOffset({ x, y });
  }
  function onPointerUp(event: PointerEvent<HTMLButtonElement>) {
    const start = gesture.current;
    gesture.current = null;
    setOffset({ x: 0, y: 0 });
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!start || !moved.current) return;
    if (start.compact || event.clientY - start.y < -28 || Math.abs(event.clientX - start.x) > 40) {
      setEdge(event.clientX < window.innerWidth / 2 ? "left" : "right");
      position(event.clientY);
      setCompactId(sessionKey);
      onCollapse?.();
    }
  }
  function onPointerCancel() {
    gesture.current = null;
    setOffset({ x: 0, y: 0 });
  }
  return {
    compact, edge, collapse, restore,
    style: {
      ...(compact ? { top: `clamp(90px, ${top}px, calc(100dvh - 200px))`, left: edge === "left" ? "10px" : "auto", right: edge === "right" ? "10px" : "auto" } : {}),
      ...(offset.x || offset.y ? { transform: `translate(${offset.x}px, ${offset.y}px)`, transition: "none" } : {}),
    },
    dragProps: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel },
  };
}
