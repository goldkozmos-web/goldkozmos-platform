import { findGroupEvent } from "../../data/groupEvents";
import type { GroupTrackingStatus } from "../../lib/group-events/tracking";
import s from "./GroupEvents.module.css";

export default function GroupInviteButtons({ invites }: { invites: GroupTrackingStatus["invites"] }) {
  if (!invites.length) return <p className={s.notice}>WhatsApp grup bağlantısı hazır olduğunda burada görünecek.</p>;

  return <>
    <ul className={s.invites}>
      {invites.map(({ eventId, url }) => {
        const title = findGroupEvent(eventId)?.title ?? eventId;
        return <li key={eventId}>
          <strong>{title}</strong>
          {/* Keep private invite URLs out of outbound-link analytics on public pages. */}
          <button className={s.button} type="button" onClick={() => window.open(url, "_blank", "noopener,noreferrer")} aria-label={`WhatsApp Grubuna Katıl · ${title}`}>
            WhatsApp Grubuna Katıl
          </button>
        </li>;
      })}
    </ul>
    <p className={s.note}>Grup katılımınız yönetici onayının ardından tamamlanacaktır.</p>
  </>;
}
