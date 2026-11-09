import { groupEvents } from "../../data/groupEvents";
import { registrationEnabled } from "../../lib/group-events/server";
import GroupEvents from "./GroupEvents";
import s from "./GroupEvents.module.css";

export default function GroupEventsSection({ home = false }: { home?: boolean }) {
  const content = <GroupEvents enabledIds={groupEvents.filter(event => registrationEnabled(event.id)).map(event => event.id)} />;
  return home ? <div className={s.home}>{content}</div> : content;
}
