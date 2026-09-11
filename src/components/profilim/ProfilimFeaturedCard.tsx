import type { ReactNode } from "react";

export default function ProfilimFeaturedCard({
  eyebrow,
  title,
  children,
  onOpen,
  className,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={["profilimFeatured", className].filter(Boolean).join(" ")}
      onClick={onOpen}
    >
      <span className="profilimFeaturedEyebrow">{eyebrow}</span>
      <strong className="profilimFeaturedTitle">{title}</strong>
      {children ? (
        <span className="profilimFeaturedBody">{children}</span>
      ) : null}
      <span className="profilimFeaturedChevron" aria-hidden="true">
        ›
      </span>
    </button>
  );
}
