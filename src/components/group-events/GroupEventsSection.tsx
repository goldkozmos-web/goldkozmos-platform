import { groupEventOffers } from "../../data/groupEvents";
import { selectionRegistrationEnabled, bankRegistrationEnabled, groupWhatsAppRegistrationEnabled } from "../../lib/group-events/server";
import GroupEvents from "./GroupEvents";
import s from "./GroupEvents.module.css";

export default function GroupEventsSection({ home = false }: { home?: boolean }) {
  const manualCheckout = process.env.GROUP_EVENT_CHECKOUT_MODE !== "online";
  const content = <GroupEvents carousel={home} manualCheckout={manualCheckout}
    whatsappEnabled={manualCheckout && groupWhatsAppRegistrationEnabled()}
    bankEnabled={!manualCheckout && bankRegistrationEnabled()}
    enabledSelections={manualCheckout ? [] : groupEventOffers.filter(offer => selectionRegistrationEnabled(offer.events.map(event => event.id))).map(offer => offer.key)} />;
  return home ? <div className={s.home}>{content}</div> : content;
}
