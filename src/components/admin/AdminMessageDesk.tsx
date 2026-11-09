"use client";
import { useState } from "react";
import type { AdminMemberRow } from "../../lib/admin/load";
import type { MemberMessage } from "../../lib/messages/types";
export default function AdminMessageDesk({ members, sent }: { members: AdminMemberRow[]; sent: MemberMessage[] }) {
  const [recipientId, setRecipientId] = useState("all");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [outbox, setOutbox] = useState(sent);
  const recipients = members.filter((member) => member.authUserId && member.status === "active");
  const count = recipientId === "all" ? new Set(recipients.map((member) => member.authUserId)).size : 1;
  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;
    setPending(true); setStatus("");
    try {
      const response = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ recipientId, title: title.trim(), body: body.trim() }) });
      const data = await response.json() as { error?: string; count?: number; sent?: MemberMessage[] };
      if (!response.ok) throw new Error(data.error || "Gönderilemedi.");
      setStatus(`${data.count ?? 0} üyeye gönderildi. Mesaj kişisel gelen kutularında ve bildirim merkezinde görünür.`);
      const name = recipientId === "all" ? "Üye duyurusu" : recipients.find((member) => member.authUserId === recipientId)?.displayName;
      setOutbox((current) => [...(data.sent ?? []).map((item) => ({ ...item, recipientName: name })), ...current]);
      setTitle(""); setBody("");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Bağlantı kurulamadı. Yeniden dene."); }
    finally { setPending(false); }
  }
  return <div className="adminStack">
    <form className="adminCompose" onSubmit={(event) => void send(event)}>
      <header className="adminPanelHead"><div><p className="adminSectionLabel">ÜYE DUYURULARI</p><h2>Yenilikleri paylaş.</h2><p className="adminHint">Yeni bir içerik, çalışma veya özellik eklendiğinde üyelerinin kişisel alanına mesaj gönder.</p></div></header>
      <label>Alıcı<select disabled={pending} value={recipientId} onChange={(event) => setRecipientId(event.target.value)}><option value="all">Tüm aktif üyeler</option>{recipients.map((member) => <option key={member.id} value={member.authUserId!}>{member.displayName}</option>)}</select></label>
      <label>Başlık<input required disabled={pending} value={title} maxLength={80} onChange={(event) => setTitle(event.target.value)} placeholder="Goldkozmos’ta yeni bir keşif seni bekliyor" /></label>
      <label>Mesaj<textarea required disabled={pending} value={body} maxLength={2000} rows={6} onChange={(event) => setBody(event.target.value)} placeholder="Yeniliği anlat. Üyelerin keşfetmesi için sayfanın bağlantısını da ekleyebilirsin." /></label>
      <small>{body.length} / 2000 karakter · {count} alıcı</small>
      {title.trim() && body.trim() ? <section className="adminAnnouncementPreview" aria-label="Mesaj önizlemesi"><p className="adminSectionLabel">ÜYENİN GÖRECEĞİ MESAJ</p><strong>{title}</strong><p>{body}</p></section> : null}
      <button type="submit" disabled={pending || count === 0 || !title.trim() || !body.trim()}>{pending ? "Gönderiliyor…" : recipientId === "all" ? "Duyuruyu tüm aktif üyelere gönder" : "Üyeye gönder"}</button>
      {status ? <p role="status">{status}</p> : null}
    </form>
    <section className="adminList"><p className="adminSectionLabel">GÖNDERİLEN MESAJLAR</p>{outbox.length === 0 ? <p className="adminHint">İlk duyurun burada görünecek.</p> : outbox.map((item) => <article key={item.id} className="adminMember"><div className="adminMemberCopy"><strong>{item.title}</strong><small>{item.recipientName || "Üye"} · {new Date(item.createdAt).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })} · {item.readAt ? "Okundu" : "Gönderildi"}</small><p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{item.body}</p></div></article>)}</section>
  </div>;
}
