"use client";

import AdminMemberList from "../../../components/admin/AdminMemberList";
import { useAdminLive } from "../../../components/admin/AdminLiveProvider";

export default function AdminUsersPage() {
  const { live } = useAdminLive();
  return <AdminMemberList members={live?.members ?? []} />;
}
