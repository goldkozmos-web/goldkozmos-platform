"use client";

import AdminRemoveDesk from "../../../components/admin/AdminRemoveDesk";
import { useAdminLive } from "../../../components/admin/AdminLiveProvider";

export default function AdminRemovePage() {
  const { live } = useAdminLive();
  return <AdminRemoveDesk members={live?.members ?? []} />;
}