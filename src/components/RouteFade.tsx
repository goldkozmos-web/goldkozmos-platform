"use client";

import { usePathname } from "next/navigation";

export default function RouteFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/panel" || pathname.startsWith("/panel/")) return children;
  return (
    <div className="gkRouteIn" key={pathname}>
      {children}
    </div>
  );
}
