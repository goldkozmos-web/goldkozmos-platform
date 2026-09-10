import type { ProfilimProgress } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function ProgressSection({
  progress,
}: {
  progress: ProfilimProgress;
}) {
  const hasProgress = progress.completedCount > 0 || progress.xp > 0;

  return (
    <ProfilimSectionCard eyebrow="GELİŞİM" title="İlerlemen">
      {hasProgress ? (
        <ul className="profilimStatRow">
          <li>
            <strong>{progress.completedCount}</strong>
            <span>Tamamlanan aktivite</span>
          </li>
          <li>
            <strong>{progress.xp}</strong>
            <span>Kazanılan XP</span>
          </li>
        </ul>
      ) : (
        <ProfilimEmptyState text="Seviye, tamamladığın içeriklerle ilerler." />
      )}
    </ProfilimSectionCard>
  );
}
