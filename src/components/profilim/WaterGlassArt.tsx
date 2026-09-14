"use client";

import { useId } from "react";

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
  const waterTop = 86 - fill * 58;
  const waveY = waterTop + 4;
  const body = `pwGlassBody-${uid}`;
  const water = `pwWater-${uid}`;
  const rim = `pwGoldRim-${uid}`;
  const clip = `pwWaterClip-${uid}`;

  return (
    <span className={`profilimWaterGlass ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 72 108" fill="none">
        <defs>
          <linearGradient id={body} x1="12" y1="8" x2="64" y2="100">
            <stop offset="0%" stopColor="#fffdf8" stopOpacity="0.55" />
            <stop offset="42%" stopColor="#dceef6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#b7d7e8" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={water} x1="36" y1="28" x2="36" y2="96">
            <stop offset="0%" stopColor="#9fe4f2" />
            <stop offset="38%" stopColor="#4eb8d6" />
            <stop offset="100%" stopColor="#1f7fa8" />
          </linearGradient>
          <linearGradient id={rim} x1="10" y1="10" x2="62" y2="18">
            <stop offset="0%" stopColor="#f6e7c2" />
            <stop offset="50%" stopColor="#d4a24a" />
            <stop offset="100%" stopColor="#8d6420" />
          </linearGradient>
          <clipPath id={clip}>
            <path d="M18 18h36l-5.4 74.2c-.4 5.2-4.6 9.2-9.8 9.2h-5.6c-5.2 0-9.4-4-9.8-9.2L18 18Z" />
          </clipPath>
        </defs>

        <ellipse cx="36" cy="100" rx="22" ry="5" fill="rgba(90,64,28,0.1)" />

        <path
          d="M16.5 16.5h39l-5.6 76.4c-.5 6.4-5.7 11.3-12.1 11.3h-3.6c-6.4 0-11.6-4.9-12.1-11.3L16.5 16.5Z"
          fill={`url(#${body})`}
          stroke={`url(#${rim})`}
          strokeWidth="1.7"
        />

        <g clipPath={`url(#${clip})`}>
          {!empty ? (
            <>
              <rect x="12" y={waterTop} width="48" height="78" fill={`url(#${water})`} />
              <path
                className="profilimWaterWave"
                d={`M8 ${waveY} C 18 ${waveY - 5}, 26 ${waveY + 5}, 36 ${waveY} S 54 ${waveY - 5}, 64 ${waveY} V 108 H 8 Z`}
                fill="#c6f3fb"
                opacity="0.45"
              />
              <ellipse
                cx="28"
                cy={waterTop + 14}
                rx="9"
                ry="4"
                fill="rgba(255,255,255,0.38)"
              />
              {fill > 0.25 ? (
                <>
                  <circle className="profilimWaterBubble" cx="42" cy="72" r="2.1" fill="rgba(255,255,255,0.55)" />
                  <circle className="profilimWaterBubble profilimWaterBubbleSlow" cx="31" cy="84" r="1.4" fill="rgba(255,255,255,0.45)" />
                  <circle className="profilimWaterBubble" cx="39" cy="58" r="1.1" fill="rgba(255,255,255,0.5)" />
                </>
              ) : null}
            </>
          ) : null}
        </g>

        <path
          d="M24 20c8 6 16 6 24 0"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M21 34c1.5 22 1.8 44 1.2 58"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {full ? (
          <path
            d="M28 8c2.4-6 14-6 16.4 0 1.2 3-2.4 6.4-8.2 10.2C30.4 14.4 26.8 11 28 8Z"
            fill="#7ecfe6"
            stroke="#d4a24a"
            strokeWidth="0.8"
          />
        ) : null}
      </svg>
    </span>
  );
}
