"use client";

import type { ReactNode } from "react";

export function AyarlarGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="ayarlarGroup">
      <p className="ayarlarGroupLabel">{label}</p>
      <div className="adminPanel ayarlarCard">{children}</div>
    </section>
  );
}

export function AyarlarLinkRow({
  href,
  label,
  tone,
}: {
  href: string;
  label: string;
  tone?: "gold" | "danger" | "mute";
}) {
  const external = href.startsWith("http");

  return (
    <a
      className={`ayarlarRow${tone ? ` is-${tone}` : ""}`}
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <span>{label}</span>
      <i aria-hidden="true">›</i>
    </a>
  );
}

export function AyarlarButtonRow({
  label,
  tone,
  onClick,
}: {
  label: string;
  tone?: "gold" | "danger" | "mute";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`ayarlarRow${tone ? ` is-${tone}` : ""}`}
      onClick={onClick}
    >
      <span>{label}</span>
      <i aria-hidden="true">›</i>
    </button>
  );
}

export function AyarlarToggle({
  label,
  on,
  locked,
  onToggle,
}: {
  label: string;
  on: boolean;
  locked?: boolean;
  onToggle: () => void;
}) {
  return (
    <label className={`ayarlarToggle${locked ? " isLocked" : ""}`}>
      <span>{label}</span>
      <input
        type="checkbox"
        checked={on}
        disabled={locked}
        onChange={() => {
          if (!locked) onToggle();
        }}
      />
    </label>
  );
}
