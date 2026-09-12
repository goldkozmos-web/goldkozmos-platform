"use client";

import { usePathname } from "next/navigation";

export default function RouteFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="gkRouteIn" key={pathname}>
      {children}
    </div>
  );
}
