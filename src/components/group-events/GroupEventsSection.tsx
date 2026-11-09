import { groupEventOffers } from "../../data/groupEvents";
import { selectionRegistrationEnabled } from "../../lib/group-events/server";
import GroupEvents from "./GroupEvents";
import s from "./GroupEvents.module.css";

export default function GroupEventsSection({ home = false }: { home?: boolean }) {
  const content = <GroupEvents carousel={home} enabledSelections={groupEventOffers.filter(offer => selectionRegistrationEnabled(offer.events.map(event => event.id))).map(offer => offer.key)} />;
  return home ? <div className={s.home}>{content}</div> : content;
}
