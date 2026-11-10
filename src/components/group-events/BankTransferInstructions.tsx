import { useState } from "react";
import { formatGroupPrice } from "../../data/groupEvents";
import s from "./GroupEvents.module.css";
export type BankInstructions = { iban: string; accountName: string; bankName: string; description: string };
export default function BankTransferInstructions({ bank, amountKurus }: { bank: BankInstructions; amountKurus: number }) {
  const [message, setMessage] = useState("");

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMessage(`${label} kopyalandı.`);
    } catch {
      setMessage("Metni seçerek kopyalayabilirsiniz.");
    }
  }

  return <div className={s.bankInstructions}>
    <h4>IBAN ile ödeme bilgilerin</h4>
    <dl><dt>Alıcı</dt><dd>{bank.accountName}</dd>{bank.bankName ? <><dt>Banka</dt><dd>{bank.bankName}</dd></> : null}
      <dt>IBAN</dt><dd>{bank.iban.replace(/(.{4})/g, "$1 ").trim()}</dd>
      <dt>Gönderilecek tutar</dt><dd><strong>{formatGroupPrice(amountKurus)}</strong></dd>
      <dt>Ödeme açıklaması</dt><dd>{bank.description}</dd></dl>
    <div className={s.actions}>
      <button className={`${s.button} ${s.secondary}`} type="button" onClick={() => void copy(bank.iban, "IBAN")}>IBAN’ı kopyala</button>
      <button className={`${s.button} ${s.secondary}`} type="button" onClick={() => void copy(bank.description, "Ödeme açıklaması")}>Açıklamayı kopyala</button>
    </div>
    {message ? <p role="status">{message}</p> : null}
    <p>Açıklamaya çalışma bilgilerini ve kayıt kodunu birlikte yaz. Ödemen banka hesabından kontrol edilip yönetici tarafından onaylanana kadar kaydın beklemede kalır.</p>
  </div>;
}
