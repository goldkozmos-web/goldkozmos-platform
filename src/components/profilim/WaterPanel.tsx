"use client";

import { useCallback, useEffect, useState } from "react";

import {
  WATER_EVENT,
  WATER_GOAL,
  readWaterDay,
  writeWaterDay,
  type WaterDayState,
} from "../../lib/profilim/waterStore";
import WaterGlassArt from "./WaterGlassArt";

export default function WaterPanel({ userId }: { userId: string }) {
  const [glasses, setGlasses] = useState(0);

  useEffect(() => {
    setGlasses(readWaterDay(userId).glasses);
    const sync = (event: Event) => {
      const detail = (event as CustomEvent<WaterDayState>).detail;
      if (detail?.glasses != null) setGlasses(detail.glasses);
    };
    window.addEventListener(WATER_EVENT, sync);
    return () => window.removeEventListener(WATER_EVENT, sync);
  }, [userId]);

  const setCount = useCallback(
    (next: number) => {
      setGlasses(writeWaterDay(userId, next).glasses);
    },
    [userId],
  );

  const done = glasses >= WATER_GOAL;
  const fillLabel = done
    ? "Günün su ritüeli tamam."
    : `Kalan ${WATER_GOAL - glasses} bardak.`;

  return (
    <div className="profilimWaterDesk">
      <div className="profilimWaterStage">
        <p className="profilimWaterCount">
          <strong>{glasses}</strong>
          <span>/ {WATER_GOAL}</span>
        </p>
        <p className="profilimWaterHint">{fillLabel}</p>
        <WaterGlassArt
          glasses={glasses}
          goal={WATER_GOAL}
          className="isStage"
        />
      </div>

      <div className="profilimWaterActions">
        <button
          type="button"
          className="profilimWaterPrimary"
          onClick={() => setCount(glasses + 1)}
          disabled={done}
        >
          Bir bardak içtim
        </button>
        <button
          type="button"
          className="profilimWaterGhost"
          onClick={() => setCount(glasses - 1)}
          disabled={glasses <= 0}
        >
          Geri al
        </button>
      </div>

      <div className="profilimWaterMarks" role="group" aria-label="Bardak sayısı">
        {Array.from({ length: WATER_GOAL }, (_, index) => {
          const value = index + 1;
          return (
            <button
              key={value}
              type="button"
              className={`profilimWaterMark${index < glasses ? " isFilled" : ""}`}
              onClick={() => setCount(value === glasses ? value - 1 : value)}
              aria-pressed={index < glasses}
            >
              {value}
            </button>
          );
        })}
      </div>

      <p className="profilimWaterNote">
        Hedef her gün 8 bardak. Sayaç İstanbul gününde sıfırlanır.
      </p>
    </div>
  );
}
