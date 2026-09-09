import type { ProfilimLetter } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function LetterSection({
  items,
}: {
  items: ProfilimLetter[];
}) {
  return (
    <ProfilimSectionCard eyebrow="MEKTUP" title="Kendime Mektup">
      {items.length > 0 ? (
        <ul className="profilimStackList">
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <ProfilimEmptyState text="Kendine yazılmış bir mektup yok. İlk mektubun burada saklanacak." />
      )}
    </ProfilimSectionCard>
  );
}
