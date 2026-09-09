import type { ProfilimLibraryItem } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function LibrarySection({
  items,
}: {
  items: ProfilimLibraryItem[];
}) {
  return (
    <ProfilimSectionCard eyebrow="ARŞİV" title="Kütüphanem">
      {items.length > 0 ? (
        <ul className="profilimStackList">
          {items.map((item) => (
            <li key={item.id}>
              {item.href ? (
                <a href={item.href}>
                  <strong>{item.title}</strong>
                  <span>{item.kind}</span>
                </a>
              ) : (
                <>
                  <strong>{item.title}</strong>
                  <span>{item.kind}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <ProfilimEmptyState text="Kütüphanen şu an boş. Açtığın içerikler zamanla burada arşivlenecek." />
      )}
    </ProfilimSectionCard>
  );
}
