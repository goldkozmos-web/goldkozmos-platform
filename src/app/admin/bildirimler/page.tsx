"use client";

import { useAdminLive } from "../../../components/admin/AdminLiveProvider";
import AdminEmpty from "../../../components/admin/AdminEmpty";

export default function AdminNotificationsPage() {
  const { live } = useAdminLive();
  const items = [
    ...(live?.members ?? []).filter((member) => member.createdAt).map((member) => ({
      id: `member-${member.id}`, title: "Yeni üye", body: `${member.displayName} aramıza katıldı.`,
      date: member.createdAt!, href: "/admin/kullanicilar",
    })),
    ...(live?.whatsapp ?? []).map((item) => ({ id: `whatsapp-${item.id}`, title: "WhatsApp’a geçiş", body: item.path, date: item.createdAt, href: "/admin/whatsapp" })),
    ...(live?.appointments ?? []).map((item) => ({ id: `appointment-${item.id}`, title: "Randevu sayfasına geçiş", body: item.path, date: item.createdAt, href: "/admin/randevular" })),
    ...(live?.purchases ?? []).map((item) => ({ id: `purchase-${item.id}`, title: "Shopier’e geçiş", body: item.path, date: item.createdAt, href: "/admin/satin-almalar" })),
    ...(live?.commentNotifications ?? []).map((item) => ({ id: `comment-${item.id}`, title: "Yeni yorum", body: item.excerpt, date: item.createdAt, href: "/goldblog" })),
  ].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 40);

  if (!items.length) return <AdminEmpty eyebrow="Bildirimler" title="Henüz etkinlik yok" text="Yeni üyeler, yorumlar ve site üzerindeki yönlendirmeler burada görünür." />;
  return <section className="adminList" aria-label="Son bildirimler">
    {items.map((item) => <a className="adminMember adminNotificationItem" href={item.href} key={item.id}>
      <div className="adminMemberCopy"><strong>{item.title}</strong><small>{item.body}</small>
        <time dateTime={item.date}>{new Date(item.date).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul", dateStyle: "medium", timeStyle: "short" })}</time>
      </div><span aria-hidden="true">→</span>
    </a>)}
  </section>;
}
