import { intensiveClientMessages } from "../../data/intensiveClientMessages";
import "../../styles/energy-messages.css";

export default function IntensiveClientMessages() {
  return <section className="energyMessages" aria-labelledby="intensive-messages-title">
    <div className="energyMessagesInner">
      <header><p className="energyMessagesEyebrow">5 GÜNLÜK YOĞUN ÇALIŞMA</p><h2 id="intensive-messages-title">Danışan <em>mesajları.</em></h2></header>
      <div className="energyMessagesRail" role="region" aria-label="5 günlük çalışma danışan mesajları, yana kaydırılabilir" tabIndex={0}>
        {intensiveClientMessages.map((message, index) => <article className="energyMessage" key={index}>
          <div className="energyMessageTop"><span className="energyMessageAvatar" aria-hidden="true">✦</span><div><h3>Danışan mesajı</h3><span>MESAJ · {String(index+1).padStart(2,"0")}</span></div><span className="energyMessageQuote" aria-hidden="true">“</span></div>
          <details><summary><span className="energyMessagePreview">{message.text.length > 220 ? `${message.text.slice(0,220).trim()}…` : message.text}</span><span className="energyMessageRead">Mesajı aç <span aria-hidden="true">↗</span></span></summary><p>{message.text}</p></details>
          <span className="energyMessageTag">5 gün · Online birebir</span>
        </article>)}
      </div>
      <p className="energyMessagesHint">Diğer mesajlar için yana kaydır <span aria-hidden="true">→</span></p>
    </div>
  </section>;
}
