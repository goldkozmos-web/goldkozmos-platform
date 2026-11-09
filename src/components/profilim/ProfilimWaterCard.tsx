"use client";



import { useWater } from "../../lib/profilim/useWater";
import WaterGlassArt from "./WaterGlassArt";

export default function ProfilimWaterCard({
  userId,
  onOpen,
}: {
  userId: string;
  onOpen: () => void;
}) {
  const { glasses, goal } = useWater(userId);
  const done = glasses >= goal;

  return (
    <button
      type="button"
      className="profilimFeatured profilimWaterCard"
      onClick={onOpen}
      aria-label={`Su hatırlatıcısı, bugün ${glasses} / ${goal} bardak`}
    >
      <span className="profilimWaterCopy">
        <span className="profilimFeaturedEyebrow">GÜNLÜK SU TAKİBİ</span>
        <strong className="profilimFeaturedTitle">Su molan</strong>
        <span className="profilimWaterSubtitle">Gününe küçük bir mola.</span>
        <span className="profilimWaterMeta"><b>{glasses}</b><span>/ {goal} bardak</span></span>
      </span>
      <span className="waterGlassPortrait"><WaterGlassArt glasses={glasses} goal={goal} /></span>
      <span className="waterCardFooter">
        <span className="waterCardProgress" aria-hidden="true"><i style={{width:`${Math.min(100,glasses / goal * 100)}%`}} /></span>
        <span className="profilimWaterSettingsHint">{done ? 'Bugünkü hedefin tamamlandı' : 'Hedefini ve hatırlatmanı ayarla'}<span aria-hidden="true">↗</span></span>
      </span>
    </button>
  );
}
