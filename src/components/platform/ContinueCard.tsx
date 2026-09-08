"use client";

import Link from "next/link";
import {
  PLATFORM_CATALOG,
  formatProgressPercent,
  type PlatformProgress,
} from "../../data/platformFlow";

type ContinueCardProps = {
  item: PlatformProgress | null;
  title?: string;
  variant?: "glance" | "page";
};

export default function ContinueCard({
  item,
  title = "Kaldığın Yeri Gör",
  variant = "glance",
}: ContinueCardProps) {
  return (
    <section
      className={`platformContinue platformContinue--${variant}`}
      aria-label={title}
    >
      <h2>{variant === "page" ? "Kaldığın Yerden Devam Et" : title}</h2>

      {item ? (
        <div className="platformContinueCard">
          <div className="platformContinueCopy">
            <p>
              {PLATFORM_CATALOG.find((entry) => entry.id === item.platform)
                ?.name ?? item.platform}
            </p>
            <strong>{item.title}</strong>
            {item.description ? <span>{item.description}</span> : null}
            <span className="platformContinuePercent">
              {formatProgressPercent(item.progress)}
            </span>
            <span className="platformProgressTrack" aria-hidden="true">
              <i style={{ width: formatProgressPercent(item.progress) }} />
            </span>
          </div>

          <Link
            className="platformContinueCta"
            href={item.href}
          >
            Devam Et
          </Link>
        </div>
      ) : null}
    </section>
  );
}
