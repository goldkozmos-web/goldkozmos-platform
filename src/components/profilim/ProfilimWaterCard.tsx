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

export default function ProfilimWaterCard({
  userId,
  onOpen,
}: {
  userId: string;
  onOpen: () => void;
}) {
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

  const sip = useCallback(() => {
    setGlasses(writeWaterDay(userId, glasses + 1).glasses);
  }, [glasses, userId]);

  const done = glasses >= WATER_GOAL;

  return (
    <div className="profilimWaterWrap">
      <button
        type="button"
        className="profilimFeatured profilimWaterCard"
        onClick={onOpen}
        aria-label={`Su hatırlatıcısı, bugün ${glasses} / ${WATER_GOAL} bardak`}
      >
        <span className="profilimWaterAura" aria-hidden="true" />
        <span className="profilimFeaturedEyebrow">SU</span>
        <strong className="profilimFeaturedTitle">Hatırlatıcı</strong>
        <span className="profilimWaterMeta">
          {done ? "Bugün tamam" : `${glasses} / ${WATER_GOAL} bardak`}
        </span>
        <WaterGlassArt glasses={glasses} goal={WATER_GOAL} />
        <span className="profilimWaterPips" aria-hidden="true">
          {Array.from({ length: WATER_GOAL }, (_, index) => (
            <span
              key={index}
              className={`profilimWaterPip${index < glasses ? " isFilled" : ""}`}
            />
          ))}
        </span>
      </button>
      <button
        type="button"
        className="profilimWaterSip"
        onClick={sip}
        disabled={done}
        aria-label={done ? "Günün su hedefi tamam" : "Bardak ekle"}
      >
        {done ? "✓" : "+"}
      </button>
    </div>
  );
}
