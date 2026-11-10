import { formatGroupPrice } from "../../data/groupEvents";
import { GOLDKOZMOS_WHATSAPP_CHAT } from "../../lib/appointments";
import type { GroupWhatsAppRequest as RequestDetails } from "../../lib/group-events/tracking";
import s from "./GroupEvents.module.css";

export default function GroupWhatsAppRequest({ title, request }: { title: string; request: RequestDetails }) {
  const message = [
    "Merhaba, GoldKozmos’ta seçtiğim aşağıdaki grup çalışmalarını satın almak istiyorum.",
    ...title.split(" + ").map(eventTitle => `• ${eventTitle}`),
    `Toplam tutar: ${formatGroupPrice(request.amountKurus)}`,
    `Başvuru kodu: ${request.code}`,
    "Ödeme ve katılım için bilgi alabilir miyim?",
  ].join("\n");
  const whatsappUrl = `${GOLDKOZMOS_WHATSAPP_CHAT}?text=${encodeURIComponent(message)}`;

  return <div className={s.whatsappRequest}>
    <p>Başvurun kaydedildi. Ödeme ve katılımı görüşmek için aşağıdaki hazır mesajı WhatsApp’tan gönder.</p>
    <div className={`${s.notice} ${s.whatsappDraft}`}>{message}</div>
    <button type="button" className={s.button} onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}>
      WhatsApp’tan İlet
    </button>
  </div>;
}
