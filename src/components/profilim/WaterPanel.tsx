"use client";

import { useWater } from "../../lib/profilim/useWater";
import WaterGlassArt from "./WaterGlassArt";
import WaterReminderSettings from "./WaterReminderSettings";

export default function WaterPanel({ userId }: { userId: string }) {
  const { glasses, goal, status, pending, save } = useWater(userId);
  const setCount = (next: number) => void save(next);
  const done = glasses >= goal;
  const fillLabel = done
    ? "Günün su ritüeli tamam."
    : `Kalan ${goal - glasses} bardak.`;

  return (
    <div className="profilimWaterDesk"><p className="waterPanelIntro">İçtiğin suyu kaydet. Gününü küçük molalarla tamamla.</p>
      <div className="profilimWaterStage">
        <div className="waterStageCopy">
        <span className="waterStageEyebrow">BUGÜNKÜ TAKİBİN</span>
        <p className="profilimWaterCount">
          <strong>{glasses}</strong>
          <span>/ {goal}</span>
        </p>
        <p className="profilimWaterHint">{fillLabel}</p>
        <div className="waterStageProgress" role="progressbar" aria-label="Günlük su hedefi" aria-valuemin={0} aria-valuemax={goal} aria-valuenow={Math.min(glasses,goal)}><i style={{width:`${Math.min(100,glasses / goal * 100)}%`}} /></div>
        </div>
        <div className="waterStagePortrait">
        <WaterGlassArt
          glasses={glasses}
          goal={goal}
          className="isStage"
        />
        </div>
      </div>

      <div className="profilimWaterActions">
        <button
          type="button"
          className="profilimWaterPrimary"
          onClick={() => setCount(glasses + 1)}
          disabled={done || pending}
        >
          <span aria-hidden="true">＋</span> Bir bardak içtim
        </button>
        <button
          type="button"
          className="profilimWaterGhost"
          onClick={() => setCount(glasses - 1)}
          disabled={glasses <= 0 || pending}
        >
          Geri al
        </button>
      </div>

      <div className="profilimWaterMarks" role="group" aria-label="Bardak sayısı">
        {Array.from({ length: goal }, (_, index) => {
          const value = index + 1;
          return (
            <button
              key={value}
              type="button"
              className={`profilimWaterMark${index < glasses ? " isFilled" : ""}`}
              onClick={() => setCount(value === glasses ? value - 1 : value)}
              disabled={pending}
              aria-pressed={index < glasses}
            >
              {value}
            </button>
          );
        })}
      </div>

      {status ? <p role="status" className="profilimDrawerNote">{status}</p> : null}
      <WaterReminderSettings userId={userId} />
      <p className="profilimWaterNote">
        Seçtiğin bardak sayısı kişisel takip hedefidir; su ihtiyacın değişebilir. Sayaç İstanbul gününde yenilenir.
      </p>
    </div>
  );
}
