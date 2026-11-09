import { monthlyClientMessages } from "../../data/monthlyClientMessages";
import "../../styles/energy-messages.css";

export default function MonthlyClientMessages() {
  return <section className="energyMessages" aria-labelledby="monthly-messages-title">
    <div className="energyMessagesInner">
      <header><p className="energyMessagesEyebrow">4 HAFTALIK ÇALIŞMA PAKETİ</p><h2 id="monthly-messages-title">Danışan <em>mesajları.</em></h2></header>
      <div className="energyMessagesRail" role="region" aria-label="4 haftalık çalışma danışan mesajları, yana kaydırılabilir" tabIndex={0}>
        {monthlyClientMessages.map((message, index) => <article className="energyMessage" key={index}>
          <div className="energyMessageTop"><span className="energyMessageAvatar" aria-hidden="true">✦</span><div><h3>Danışan mesajı</h3><span>MESAJ · {String(index+1).padStart(2,"0")}</span></div><span className="energyMessageQuote" aria-hidden="true">“</span></div>
          <details><summary><span className="energyMessagePreview">{message.text.length > 220 ? `${message.text.slice(0,220).trim()}…` : message.text}</span><span className="energyMessageRead">Mesajı aç <span aria-hidden="true">↗</span></span></summary><p>{message.text}</p></details>
          <span className="energyMessageTag">4 hafta · Online birebir</span>
        </article>)}
      </div>
      <p className="energyMessagesHint">Diğer mesajlar için yana kaydır <span aria-hidden="true">→</span></p>
    </div>
  </section>;
}
