import AdminEmpty from "../../../components/admin/AdminEmpty";
import { listGoldBlogNotifications } from "../../../lib/goldblog/notifications";

export const dynamic = "force-dynamic";

export default async function AdminNotificationsPage() {
  const result = await listGoldBlogNotifications();
  const items =
    "notifications" in result && Array.isArray(result.notifications)
      ? result.notifications
      : [];

  if (items.length === 0) {
    return (
      <AdminEmpty
        eyebrow="Bildirimler"
        title="Yeni bildirim yok"
        text="GoldBlog yorum bildirimlerin buraya düşer."
      />
    );
  }

  return (
    <section className="adminList">
      {items.map((item) => (
        <article key={item.id} className="adminMember">
          <div className="adminMemberCopy">
            <strong>{item.actorName}</strong>
            <small>{item.excerpt}</small>
          </div>
        </article>
      ))}
    </section>
  );
}
