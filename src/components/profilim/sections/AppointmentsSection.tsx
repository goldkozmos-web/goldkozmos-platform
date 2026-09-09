import type { ProfilimAppointment } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function AppointmentsSection({
  items,
}: {
  items: ProfilimAppointment[];
}) {
  return (
    <ProfilimSectionCard eyebrow="SEANSLAR" title="Randevularım">
      {items.length > 0 ? (
        <ul className="profilimStackList">
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ProfilimEmptyState text="Planlanmış bir randevun yok. Alınan seanslar burada görünecek." />
      )}
    </ProfilimSectionCard>
  );
}
