import { formatGroupPrice } from "../../data/groupEvents";
import s from "./GroupEvents.module.css";
export type BankInstructions = { iban: string; accountName: string; bankName: string; description: string };
export default function BankTransferInstructions({ bank, amountKurus }: { bank: BankInstructions; amountKurus: number }) {
  return <div className={s.bankInstructions}>
    <h4>IBAN ile ödeme bilgilerin</h4>
    <dl><dt>Alıcı</dt><dd>{bank.accountName}</dd>{bank.bankName ? <><dt>Banka</dt><dd>{bank.bankName}</dd></> : null}
      <dt>IBAN</dt><dd>{bank.iban.replace(/(.{4})/g, "$1 ").trim()}</dd>
      <dt>Gönderilecek tutar</dt><dd><strong>{formatGroupPrice(amountKurus)}</strong></dd>
      <dt>Ödeme açıklaması</dt><dd>{bank.description}</dd></dl>
    <p>Açıklamaya çalışma bilgilerini ve kayıt kodunu birlikte yaz. Ödemen banka hesabından kontrol edilip yönetici tarafından onaylanana kadar kaydın beklemede kalır.</p>
  </div>;
}
