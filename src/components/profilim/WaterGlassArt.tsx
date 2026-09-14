"use client";

import { useEffect, useId, useRef, useState } from "react";

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

  useEffect(() => {
    if (prev.current === null) {
      prev.current = glasses;
      return;
    }
    if (glasses > prev.current) {
      setSplashing(true);
      const timer = window.setTimeout(() => setSplashing(false), 780);
      prev.current = glasses;
      return () => window.clearTimeout(timer);
    }
    prev.current = glasses;
    return undefined;
  }, [glasses]);

  const drop = (1 - fill) * 62;
  const body = `pwGlassBody-${uid}`;
  const water = `pwWater-${uid}`;
  const rim = `pwGoldRim-${uid}`;
  const clip = `pwWaterClip-${uid}`;
  const caustic = `pwCaustic-${uid}`;
  const foam = `pwFoam-${uid}`;

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
            <stop offset="0%" stopColor="#b9eef8" />
            <stop offset="18%" stopColor="#5ec6e4" />
            <stop offset="55%" stopColor="#1f90b8" />
            <stop offset="100%" stopColor="#0b5874" />
          </linearGradient>
          <linearGradient id={rim} x1="10" y1="10" x2="62" y2="18">
            <stop offset="0%" stopColor="#f6e7c2" />
            <stop offset="50%" stopColor="#d4a24a" />
            <stop offset="100%" stopColor="#8d6420" />
          </linearGradient>
          <linearGradient id={foam} x1="36" y1="24" x2="36" y2="44">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <pattern id={caustic} patternUnits="userSpaceOnUse" width="28" height="18">
            <path
              className="profilimWaterCausticBand"
              d="M0 10 C 7 4, 14 16, 21 10 S 35 4, 42 10"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.4"
              fill="none"
            />
          </pattern>
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
            <rect x="10" y="26" width="52" height="82" fill={`url(#${water})`} />
            <rect x="10" y="26" width="52" height="82" fill={`url(#${caustic})`} opacity="0.55" />
            <rect x="10" y="26" width="52" height="18" fill={`url(#${foam})`} />

            <g className="profilimWaterSurfWrap">
              <g className="profilimWaterSurf profilimWaterSurfA">
                <path
                  d="M-36 30 C -24 24, -12 36, 0 30 S 24 24, 36 30 S 60 36, 72 30 S 96 24, 108 30 V 108 H -36 Z"
                  fill="rgba(210,246,255,0.38)"
                />
              </g>
              <g className="profilimWaterSurf profilimWaterSurfB">
                <path
                  d="M-36 32 C -27 38, -15 26, -3 32 S 21 38, 33 32 S 57 26, 69 32 S 93 38, 105 32 V 108 H -36 Z"
                  fill="rgba(255,255,255,0.16)"
                />
              </g>
            </g>

            <path
              className="profilimWaterMeniscus"
              d="M18.8 31.2 C 24 27.4, 48 27.4, 53.2 31.2"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.15"
              strokeLinecap="round"
            />

            <ellipse
              className="profilimWaterSheen"
              cx="27"
              cy="42"
              rx="8.5"
              ry="3.2"
              fill="rgba(255,255,255,0.28)"
            />

            {!empty ? (
              <>
                <ellipse className="profilimWaterBubble b1" cx="41" cy="78" rx="1.7" ry="1.9" fill="rgba(255,255,255,0.62)" />
                <ellipse className="profilimWaterBubble b2" cx="30" cy="86" rx="1.15" ry="1.3" fill="rgba(255,255,255,0.5)" />
                <ellipse className="profilimWaterBubble b3" cx="38" cy="70" rx="0.9" ry="1.05" fill="rgba(255,255,255,0.55)" />
                <ellipse className="profilimWaterBubble b4" cx="44" cy="90" rx="1.35" ry="1.5" fill="rgba(255,255,255,0.45)" />
                <ellipse className="profilimWaterBubble b5" cx="33" cy="74" rx="0.8" ry="0.9" fill="rgba(255,255,255,0.5)" />
              </>
            ) : null}

            {splashing ? (
              <ellipse
                className="profilimWaterRippleRing"
                cx="36"
                cy="32"
                rx="11"
                ry="3.4"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="0.9"
                fill="none"
              />
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
