"use client";

import { AdminMemberDesk } from "../../../components/admin/AdminMemberList";
import { useAdminLive } from "../../../components/admin/AdminLiveProvider";

export default function AdminUsersPage() {
  const { live } = useAdminLive();
  return <AdminMemberDesk members={live?.members ?? []} />;
}
