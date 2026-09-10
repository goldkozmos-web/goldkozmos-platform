import type { ProfilimTodayNeed } from "../../../lib/profilim/types";
import ProfilimEmptyState from "../ProfilimEmptyState";
import ProfilimSectionCard from "../ProfilimSectionCard";

export default function TodayNeedSection({
  todayNeed,
}: {
  todayNeed: ProfilimTodayNeed;
}) {
  return (
    <ProfilimSectionCard
      eyebrow="BUGÜN"
      title="Bugün Neye İhtiyacın Var?"
    >
      {todayNeed ? (
        <>
          <p className="profilimCardLead">{todayNeed.title}</p>
          <p className="profilimCardText">{todayNeed.text}</p>
        </>
      ) : (
        <ProfilimEmptyState text="Bugün için henüz bir yönlendirme yok." />
      )}
    </ProfilimSectionCard>
  );
}
