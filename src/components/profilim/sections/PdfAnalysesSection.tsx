import type { ProfilimPdfAnalysis } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function PdfAnalysesSection({
  items,
}: {
  items: ProfilimPdfAnalysis[];
}) {
  return (
    <ProfilimSectionCard eyebrow="ANALİZ" title="PDF Analizlerim">
      {items.length > 0 ? (
        <ul className="profilimStackList">
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <ProfilimEmptyState text="Yüklenmiş bir PDF analiz yok." />
      )}
    </ProfilimSectionCard>
  );
}
