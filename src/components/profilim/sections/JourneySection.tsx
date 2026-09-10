import type { ProfilimActivity } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function JourneySection({
  items,
}: {
  items: ProfilimActivity[];
}) {
  return (
    <ProfilimSectionCard
      eyebrow="YOLCULUK"
      title="Gelişim Yolculuğum"
    >
      {items.length > 0 ? (
        <ol className="profilimJourney">
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.kind}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ProfilimEmptyState text="Tamamladığın adımlar burada görünecek." />
      )}
    </ProfilimSectionCard>
  );
}
