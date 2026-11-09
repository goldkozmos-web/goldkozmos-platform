import ProfilimIcon from "./ProfilimIcon";
import type { ReactNode } from "react";

export default function ProfilimFeaturedCard({
  eyebrow,
  title,
  children,
  onOpen,
  href,
  className,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  onOpen?: () => void;
  href?: string;
  className?: string;
}) {
  const classNames = ["profilimFeatured", className].filter(Boolean).join(" ");
  const body = (
    <>
      <span className="profilimCardArtwork" aria-hidden="true"><i /><i /><i /><i /><i /></span>
      <ProfilimIcon name={eyebrow} />
      <span className="profilimFeaturedEyebrow">{eyebrow}</span>
      <strong className="profilimFeaturedTitle">{title}</strong>
      {children ? (
        <span className="profilimFeaturedBody">{children}</span>
      ) : null}
      <span className="profilimFeaturedChevron" aria-hidden="true">
        ›
      </span>
    </>
  );

  if (href) {
    return (
      <a data-feature={eyebrow} className={classNames} href={href}>
        {body}
      </a>
    );
  }

  return (
    <button type="button" data-feature={eyebrow} className={classNames} onClick={onOpen}>
      {body}
    </button>
  );
}
