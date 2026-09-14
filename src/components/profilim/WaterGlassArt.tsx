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
  for (let x = -48; x <= 120; x += 3) {
    const yy =
      y +
      Math.sin(x * freq + phase * speed) * amp +
      Math.sin(x * freq * 0.53 + phase * (speed * 0.62) + 1.1) * amp * 0.42;
    points.push(`${x === -48 ? "M" : "L"}${x.toFixed(1)} ${yy.toFixed(2)}`);
  }
  return `${points.join(" ")} V 112 H -48 Z`;
}

function waveCrest(phase: number, amp: number, y: number, freq: number, speed: number) {
  const points: string[] = [];
  for (let x = 17; x <= 55; x += 2) {
    const yy =
      y +
      Math.sin(x * freq + phase * speed) * amp +
      Math.sin(x * freq * 0.53 + phase * (speed * 0.62) + 1.1) * amp * 0.42;
    points.push(`${x === 17 ? "M" : "L"}${x.toFixed(1)} ${yy.toFixed(2)}`);
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
    if (reduce) return undefined;
    let frame = 0;
    const tick = (now: number) => {
      setClock({ t: now / 1000, ms: now });
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const phase = clock.t;
  const splashBoost = Math.max(0, (splashUntil.current - clock.ms) / 820);
  const amp = 2.15 + splashBoost * 4.8;
  const surfaceY = 30;
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
          <linearGradient id={body} x1="14" y1="10" x2="62" y2="102">
            <stop offset="0%" stopColor="#fffdf8" stopOpacity="0.42" />
            <stop offset="45%" stopColor="#d7eaf3" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#9ec4d6" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id={water} x1="36" y1="24" x2="36" y2="100">
            <stop offset="0%" stopColor="#c5f3fb" />
            <stop offset="16%" stopColor="#5ec8e6" />
            <stop offset="52%" stopColor="#1c88b0" />
            <stop offset="100%" stopColor="#0a4e68" />
          </linearGradient>
          <linearGradient id={rim} x1="10" y1="10" x2="62" y2="18">
            <stop offset="0%" stopColor="#f6e7c2" />
            <stop offset="50%" stopColor="#d4a24a" />
            <stop offset="100%" stopColor="#8d6420" />
          </linearGradient>
          <clipPath id={clip}>
            <path d="M19.2 19.5h33.6l-5.15 73.4c-.42 5.4-4.85 9.6-10.28 9.6h-2.74c-5.43 0-9.86-4.2-10.28-9.6L19.2 19.5Z" />
          </clipPath>
        </defs>

        <ellipse cx="36" cy="100.5" rx="21" ry="4.2" fill="rgba(90,64,28,0.12)" />

        <path
          d="M16.2 16.2h39.6l-5.55 76.8c-.5 6.5-5.75 11.5-12.3 11.5h-3.9c-6.55 0-11.8-5-12.3-11.5L16.2 16.2Z"
          fill={`url(#${body})`}
          stroke={`url(#${rim})`}
          strokeWidth="1.65"
        />
        <ellipse
          cx="36"
          cy="16.4"
          rx="19.6"
          ry="3.4"
          fill="rgba(255,255,255,0.18)"
          stroke={`url(#${rim})`}
          strokeWidth="1.35"
        />

        <g clipPath={`url(#${clip})`}>
          <g className="profilimWaterColumn">
            {!empty ? (
              <>
                <path
                  d={waveFill(phase, amp, surfaceY, 0.21, 2.35)}
                  fill={`url(#${water})`}
                />
                <path
                  d={waveFill(phase + 0.9, amp * 0.7, surfaceY + 1.4, 0.27, -1.7)}
                  fill="rgba(255,255,255,0.22)"
                />
                <path
                  d={waveCrest(phase, amp, surfaceY, 0.21, 2.35)}
                  stroke="rgba(255,255,255,0.82)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={waveCrest(phase + 0.35, amp * 0.55, surfaceY + 1.1, 0.27, -1.7)}
                  stroke="rgba(12,70,95,0.28)"
                  strokeWidth="0.8"
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
          d="M23.5 20.5c7.5 4.6 17.5 4.6 25 0"
          stroke="rgba(255,255,255,0.78)"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <path
          d="M21.2 34c1.35 20 1.6 40 1.05 54"
          stroke="rgba(255,255,255,0.32)"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M49.8 36c-.4 18-.2 36 .6 52"
          stroke="rgba(30,70,90,0.12)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {full ? (
          <path
            className="profilimWaterBead"
            d="M29 7.2c2.2-5.6 12.6-5.6 14.8 0 1.1 2.8-2.2 5.8-7.4 9.4C31.2 13 27.9 10 29 7.2Z"
            fill="#7ecfe6"
            stroke="#d4a24a"
            strokeWidth="0.75"
          />
        ) : null}
      </svg>
    </span>
  );
}
