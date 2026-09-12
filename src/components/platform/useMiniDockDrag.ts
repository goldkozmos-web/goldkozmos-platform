"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";

const BUBBLE = 64;
const MARGIN = 10;
const DRAG_THRESHOLD = 18;
const NAV_CLEARANCE = 108;

function guardNextClick() {
  const block = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    window.removeEventListener("click", block, true);
  };

  window.addEventListener("click", block, true);
}

type DockPoint = { left: number; top: number };

function clampBubble(left: number, top: number): DockPoint {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const minTop = 72;
  const maxTop = Math.max(minTop, height - BUBBLE - NAV_CLEARANCE);
  const snapLeft = left + BUBBLE / 2 < width / 2 ? MARGIN : width - BUBBLE - MARGIN;

  return {
    left: snapLeft,
    top: Math.min(maxTop, Math.max(minTop, top)),
  };
}

function isControl(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(
      target.closest(
        ".platformYoutubeMiniPlay, .platformYoutubeMiniClose, .platformSeek, input",
      ),
    )
  );
}

export function useMiniDockDrag(active: boolean) {
  const [bubble, setBubble] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [point, setPoint] = useState<DockPoint>({ left: 10, top: 120 });
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originLeft: number;
    originTop: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    if (!active) {
      setBubble(false);
      setDragging(false);
      dragRef.current = null;
    }
  }, [active]);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!active || event.button !== 0) {
        return;
      }

      if (!bubble && isControl(event.target)) {
        return;
      }

      if (bubble) {
        event.preventDefault();
      }

      const rect = event.currentTarget.getBoundingClientRect();
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originLeft: bubble ? rect.left : event.clientX - BUBBLE / 2,
        originTop: bubble ? rect.top : event.clientY - BUBBLE / 2,
        moved: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [active, bubble],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;

      if (!drag || event.pointerId !== drag.pointerId) {
        return;
      }

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;

      if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) {
        return;
      }

      drag.moved = true;
      setDragging(true);
      setBubble(true);
      setPoint({
        left: drag.originLeft + dx,
        top: drag.originTop + dy,
      });
    },
    [],
  );

  const onPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;

      if (!drag || event.pointerId !== drag.pointerId) {
        return;
      }

      const moved = drag.moved;
      dragRef.current = null;
      setDragging(false);

      if (moved) {
        suppressClickRef.current = true;
        guardNextClick();
        setPoint((current) => clampBubble(current.left, current.top));
        return;
      }

      if (bubble) {
        suppressClickRef.current = true;
        guardNextClick();
        setBubble(false);
      }
    },
    [bubble],
  );

  const onClickCapture = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }, []);

  return {
    bubble,
    dragging,
    style:
      active && bubble
        ? ({
            left: `${point.left}px`,
            top: `${point.top}px`,
          } as const)
        : undefined,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onClickCapture,
  };
}
