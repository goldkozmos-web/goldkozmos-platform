import type { ProfilimContinueItem } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function ContinueSection({
  items,
}: {
  items: ProfilimContinueItem[];
}) {
  return (
    <ProfilimSectionCard
      eyebrow="DEVAM"
      title="Kaldığın Yerden Devam Et"
    >
      {items.length > 0 ? (
        <ul className="profilimStackList">
          {items.map((item) => (
            <li key={item.id}>
              <a href={item.href}>
                <strong>{item.title}</strong>
                <span>%{Math.round(item.progress * 100)}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <ProfilimEmptyState text="Yarım kalan bir çalışman yok." />
      )}
    </ProfilimSectionCard>
  );
}
