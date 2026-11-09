"use client";
import { usePathname } from "next/navigation";
export default function PublicOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  return path === "/panel" || path.startsWith("/panel/") ? null : children;
}
