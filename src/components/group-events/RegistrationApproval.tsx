"use client";
import { useState } from "react";
import s from "./GroupEvents.module.css";

export type ApprovalRow = { id: string; full_name: string; payment_method: "bank_transfer" | "shopier"; payment_status: string; provider_order_id: string | null; approved_at: string | null; bank_payment_code: string | null };
export default function RegistrationApproval({ row, busy, act }: { row: ApprovalRow; busy: boolean; act: (body: Record<string, unknown>) => Promise<void> }) {
  const [reference, setReference] = useState(""), [amount, setAmount] = useState(""), [checked, setChecked] = useState(false), [order, setOrder] = useState("");
  if (row.approved_at) return <span>Yönetici onayladı</span>;
  if (row.payment_method === "bank_transfer") return <div className={s.bankApproval}>
    <strong>IBAN · {row.bank_payment_code}</strong>
    <label>Banka işlem numarası<input value={reference} onChange={e => setReference(e.target.value)} maxLength={100} /></label>
    <label>Hesaba geçen tutar (TL)<input inputMode="decimal" placeholder="850.00" value={amount} onChange={e => setAmount(e.target.value)} /></label>
    <label><input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />Paranın hesaba geçtiğini banka hareketlerinden kontrol ettim.</label>
    <button type="button" className={s.button} disabled={busy || !checked || !reference || !amount || row.payment_status === "refunded"} onClick={() => void act({ action: "approve-registration", registrationId: row.id, transactionReference: reference, receivedAmount: amount.replace(",", "."), confirmedInBank: checked })}>Ödemeyi ve kaydı onayla</button>
  </div>;
  return <div className={s.bankApproval}>{row.provider_order_id ?? <><input aria-label={`${row.full_name} için Shopier sipariş numarası`} inputMode="numeric" value={order} onChange={e => setOrder(e.target.value)} /><button type="button" className={s.button} disabled={busy || !order} onClick={() => void act({ action: "verify-payment", registrationId: row.id, orderId: order })}>Shopier’den doğrula</button></>}
    <button type="button" className={s.button} disabled={busy || row.payment_status !== "paid"} onClick={() => void act({ action: "approve-registration", registrationId: row.id })}>Kaydı onayla ve WhatsApp bildir</button>
  </div>;
}
