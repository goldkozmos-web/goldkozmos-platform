import type { ProfilimJournalEntry } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function JournalSection({
  items,
}: {
  items: ProfilimJournalEntry[];
}) {
  return (
    <ProfilimSectionCard eyebrow="YAZI" title="Kişisel Günlüğüm">
      {items.length > 0 ? (
        <ul className="profilimStackList">
          {items.map((item) => (
            <li key={item.id}>
              <p>{item.excerpt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ProfilimEmptyState text="Henüz bir günlük kaydın yok. Yazdıkların gelişim yolculuğuna XP olarak da yansır." />
      )}
    </ProfilimSectionCard>
  );
}
