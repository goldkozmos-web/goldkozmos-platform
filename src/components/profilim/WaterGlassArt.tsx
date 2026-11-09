"use client";

import { useEffect, useId, useRef, useState } from "react";

function waveFill(
  phase: number,
  amp: number,
  y: number,
  freq: number,
  speed: number,
) {
  const points: string[] = [];
  for (let x = -48; x <= 120; x += 2) {
    const yy =
      y +
      Math.sin(x * freq + phase * speed) * amp +
      Math.sin(x * (freq * 2.15) + phase * (speed * 1.55) + 0.8) * amp * 0.28;
    points.push(`${x === -48 ? "M" : "L"}${x.toFixed(1)} ${yy.toFixed(2)}`);
  }
  return `${points.join(" ")} V 112 H -48 Z`;
}

function waveCrest(phase: number, amp: number, y: number, freq: number, speed: number) {
  const points: string[] = [];
  for (let x = 14; x <= 58; x += 1.5) {
    const yy =
      y +
      Math.sin(x * freq + phase * speed) * amp +
      Math.sin(x * (freq * 2.15) + phase * (speed * 1.55) + 0.8) * amp * 0.28;
    points.push(`${x === 14 ? "M" : "L"}${x.toFixed(1)} ${yy.toFixed(2)}`);
  }
  return points.join(" ");
}

export default function WaterGlassArt({
  glasses,
  goal,
  className = "",
}: {
  glasses: number;
  goal: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const fill = Math.max(0, Math.min(1, glasses / Math.max(1, goal)));
  const empty = fill <= 0.01;
  const full = fill >= 0.995;
  const prev = useRef<number | null>(null);
  const [splashing, setSplashing] = useState(false);
  const [clock, setClock] = useState({ t: 0, ms: 0 });
  const splashUntil = useRef(0);

  useEffect(() => {
    if (prev.current === null) {
      prev.current = glasses;
      return;
    }
    if (glasses > prev.current) {
      setSplashing(true);
      splashUntil.current = performance.now() + 820;
      const timer = window.setTimeout(() => setSplashing(false), 820);
      prev.current = glasses;
      return () => window.clearTimeout(timer);
    }
    prev.current = glasses;
    return undefined;
  }, [glasses]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || empty) return undefined;
    let frame = 0;
    let lastTick = 0;
    const tick = (now: number) => {
      if (document.visibilityState === 'visible' && now - lastTick >= 32) {
        setClock({ t: now / 1000, ms: now });
        lastTick = now;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [empty]);

  const large = className.includes("isStage");
  const phase = clock.t;
  const splashBoost = Math.min(1, Math.max(0, (splashUntil.current - clock.ms) / 820));
  const amp = (large ? 2.4 : 1.5) + splashBoost * (large ? 3.8 : 2.4);
  const surfaceY = 30;
  const slosh = large ? 0.125 : 0.15;
  const drop = (1 - fill) * 62;
  const body = `pwGlassBody-${uid}`;
  const water = `pwWater-${uid}`;
  const rim = `pwGoldRim-${uid}`;
  const clip = `pwWaterClip-${uid}`;

  return (
    <span
      className={`profilimWaterGlass${splashing ? " isSplashing" : ""}${empty ? " isEmpty" : ""} ${className}`.trim()}
      style={{ ["--pw-drop" as string]: `${drop}px` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 72 108" fill="none">
        <defs>
          <linearGradient id={body} x1="12" y1="60" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="10%" stopColor="#e9f5fa" stopOpacity="0.3" />
            <stop offset="23%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="64%" stopColor="#dceff5" stopOpacity="0.07" />
            <stop offset="88%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c3e1eb" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id={water} x1="36" y1="24" x2="36" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ceeff0" />
            <stop offset="20%" stopColor="#8acbd3" />
            <stop offset="65%" stopColor="#378da0" />
            <stop offset="100%" stopColor="#195c73" />
          </linearGradient>
          <linearGradient id={rim} x1="10" y1="10" x2="62" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f9ffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ddecef" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
          </linearGradient>
          <clipPath id={clip}>
            <path d="M15 19h42l-4.5 76q-.5 7-7.5 7H27q-7 0-7.5-7L15 19Z" />
          </clipPath>
        </defs>

        <ellipse cx="36" cy="104" rx="27" ry="3.5" fill="#000000" opacity="0.25" />
        <ellipse cx="36" cy="103" rx="21" ry="1.4" fill="#ecd7ae" opacity="0.28" />

        <path
          d="M12 16h48l-4.7 79q-.6 9-9.5 9H26.2q-8.9 0-9.5-9L12 16Z"
          fill={`url(#${body})`}
          stroke={`url(#${rim})`}
          strokeWidth="0.85"
        />
        <ellipse
          cx="36"
          cy="16.4"
          rx="24"
          ry="4.2"
          fill="rgba(255,255,255,0.08)"
          stroke={`url(#${rim})`}
          strokeWidth="1.15"
        />

        <g clipPath={`url(#${clip})`}>
          <g className="profilimWaterColumn">
            {!empty ? (
              <>
                <path
                  d={waveFill(phase, amp, surfaceY, slosh, 2.05)}
                  fill={`url(#${water})`}
                />
                <path
                  d={waveFill(phase + 1.15, amp * 0.55, surfaceY + 1.6, slosh * 1.35, -1.45)}
                  fill="rgba(255,255,255,0.26)"
                />
                <path
                  d={waveCrest(phase, amp, surfaceY, slosh, 2.05)}
                  stroke="rgba(255,255,255,0.88)"
                  strokeWidth={large ? 1.45 : 1.15}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={waveCrest(phase + 0.4, amp * 0.5, surfaceY + 1.2, slosh * 1.35, -1.45)}
                  stroke="rgba(12,70,95,0.32)"
                  strokeWidth={large ? 1 : 0.75}
                  strokeLinecap="round"
                />

                <ellipse
                  className="profilimWaterSheen"
                  cx="27.5"
                  cy={surfaceY + 12 + Math.sin(phase * 1.4) * 1.6}
                  rx="8.2"
                  ry="3"
                  fill="rgba(255,255,255,0.3)"
                />

                <ellipse
                  className="profilimWaterBubble"
                  cx={41 + Math.sin(phase * 3.1) * 1.8}
                  cy={86 - ((phase * 22) % 48)}
                  rx="1.6"
                  ry="1.85"
                  fill="rgba(255,255,255,0.62)"
                  opacity={0.25 + 0.5 * Math.abs(Math.sin(phase * 1.7))}
                />
                <ellipse
                  className="profilimWaterBubble"
                  cx={31 + Math.cos(phase * 2.4) * 1.4}
                  cy={92 - ((phase * 17 + 12) % 52)}
                  rx="1.1"
                  ry="1.25"
                  fill="rgba(255,255,255,0.5)"
                />
                <ellipse
                  className="profilimWaterBubble"
                  cx={38 + Math.sin(phase * 2.8 + 1) * 1.2}
                  cy={80 - ((phase * 26 + 7) % 44)}
                  rx="0.85"
                  ry="1"
                  fill="rgba(255,255,255,0.55)"
                />
                <ellipse
                  className="profilimWaterBubble"
                  cx={44 + Math.cos(phase * 1.9) * 1.1}
                  cy={98 - ((phase * 14 + 20) % 50)}
                  rx="1.3"
                  ry="1.45"
                  fill="rgba(255,255,255,0.42)"
                />

                {splashing ? (
                  <ellipse
                    cx="36"
                    cy={surfaceY}
                    rx={9 + splashBoost * 8}
                    ry={2.4 + splashBoost * 2.2}
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="0.9"
                    fill="none"
                    opacity={splashBoost}
                  />
                ) : null}
              </>
            ) : null}
          </g>
        </g>

        <path
          d="M16 18.5c12 4 28 4 40 0"
          stroke="rgba(255,255,255,0.78)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M16.8 25l3.7 65"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M54.8 28l-3.2 62"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.75"
          strokeLinecap="round"
        />

        <path d="M21 95q1 5 7 5h16q6 0 7-5" stroke="#effcff" strokeOpacity="0.65" strokeWidth="1.8" />
        <path d="M24 26l1 20" stroke="#fff" strokeOpacity="0.16" strokeWidth="3" strokeLinecap="round" />
        {full ? (
          <path
            className="profilimWaterBead"
            d="m30 6 4 4 8-8"
            fill="none"
            stroke="#e4c587"
            strokeWidth="1.8"
          />
        ) : null}
      </svg>
    </span>
  );
}
