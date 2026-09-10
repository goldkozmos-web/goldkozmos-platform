import type { ReactNode } from "react";

export default function ProfilimFeaturedCard({
  eyebrow,
  title,
  children,
  onOpen,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className="profilimFeatured"
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
