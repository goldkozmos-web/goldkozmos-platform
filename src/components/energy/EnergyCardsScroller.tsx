"use client";

import { useRef, useState, type ReactNode } from "react";

export default function EnergyCardsScroller({ children }: { children: ReactNode }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStart = useRef<{ x: number; y: number; atEnd: boolean } | null>(null);
  const wheelGesture = useRef({ lastAt: 0, startedAtEnd: false, distance: 0 });

  function isAtEnd() {
    const row = rowRef.current;
    return !!row && row.scrollWidth > row.clientWidth &&
      row.scrollWidth - row.clientWidth - row.scrollLeft <= 2;
  }

  function returnToStart() {
    setPullDistance(0);
    wheelGesture.current.startedAtEnd = false;
    wheelGesture.current.distance = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rowRef.current?.scrollTo({ left: 0, behavior: reducedMotion ? "instant" : "smooth" });
  }

  return (
    <div className="energyCatalogScroller">
    <div
      ref={rowRef}
      className="energyCatalogGrid"
      role="region"
      aria-label="Enerji çalışmaları, yana kaydırılabilir kartlar"
      tabIndex={0}
      onTouchStart={(event) => {
        setPullDistance(0);
        const touch = event.touches[0];
        touchStart.current = touch ? { x: touch.clientX, y: touch.clientY, atEnd: isAtEnd() } : null;
      }}
      onTouchMove={(event) => {
        const start = touchStart.current;
        const touch = event.touches[0];
        if (!start?.atEnd || !touch) return;
        const distance = start.x - touch.clientX;
        setPullDistance(distance > Math.abs(start.y - touch.clientY) ? Math.max(0, distance) : 0);
      }}
      onTouchEnd={(event) => {
        setPullDistance(0);
        const start = touchStart.current;
        const touch = event.changedTouches[0];
        touchStart.current = null;
        if (!start?.atEnd || !touch) return;
        const distance = start.x - touch.clientX;
        if (distance > 120 && distance > Math.abs(start.y - touch.clientY)) returnToStart();
      }}
      onTouchCancel={() => { touchStart.current = null; setPullDistance(0); }}
      onScroll={() => {
        if (!isAtEnd()) setPullDistance(0);
      }}
      onWheel={(event) => {
        const delta = event.deltaX || (event.shiftKey ? event.deltaY : 0);
        if (!delta) return;
        const now = performance.now();
        const gesture = wheelGesture.current;
        if (now - gesture.lastAt > 600) {
          gesture.startedAtEnd = isAtEnd();
          gesture.distance = 0;
        }
        gesture.lastAt = now;
        if (gesture.startedAtEnd && isAtEnd()) {
          gesture.distance = Math.max(0, gesture.distance + delta);
          setPullDistance(gesture.distance);
          if (gesture.distance > 160) returnToStart();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" && isAtEnd()) {
          event.preventDefault();
          returnToStart();
        }
      }}
    >
      {children}
      <div className="energyCatalogEndSpace" aria-hidden="true" />
    </div>
    {pullDistance > 16 && (
      <span
        className="energyCatalogPullArrow"
        aria-hidden="true"
        style={{ opacity: Math.max(0.55, Math.min(1, pullDistance / 120)), transform: `rotate(${-Math.min(pullDistance, 120) / 3}deg)` }}
      >
        ↶
      </span>
    )}
    </div>
  );
}
