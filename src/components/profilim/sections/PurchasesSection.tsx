import type { ProfilimPurchase } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function PurchasesSection({
  items,
}: {
  items: ProfilimPurchase[];
}) {
  return (
    <ProfilimSectionCard eyebrow="ÇALIŞMALAR" title="Satın Aldıklarım">
      {items.length > 0 ? (
        <ul className="profilimStackList">
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.kind}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ProfilimEmptyState text="Satın aldığın bir çalışma görünmüyor. Aldığın içerikler seviye puanı yazmaz; erişimin burada durur." />
      )}
    </ProfilimSectionCard>
  );
}
