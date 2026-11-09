import { groupEvents } from "../../data/groupEvents";
import { registrationEnabled } from "../../lib/group-events/server";
import GroupEvents from "./GroupEvents";

export default function GroupEventsSection() {
  return <GroupEvents enabledIds={groupEvents.filter(event => registrationEnabled(event.id)).map(event => event.id)} />;
}
