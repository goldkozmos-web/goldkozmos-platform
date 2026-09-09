import type { ProfilimFavorite } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function FavoritesSection({
  items,
}: {
  items: ProfilimFavorite[];
}) {
  return (
    <ProfilimSectionCard eyebrow="KAYITLI" title="Favorilerim">
      {items.length > 0 ? (
        <ul className="profilimStackList">
          {items.map((item) => (
            <li key={item.id}>
              <a href={item.href}>
                <strong>{item.title}</strong>
                <span>{item.kind}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <ProfilimEmptyState text="Henüz bir favorin yok." />
      )}
    </ProfilimSectionCard>
  );
}
