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
      <a className={classNames} href={href}>
        {body}
      </a>
    );
  }

  return (
    <button type="button" className={classNames} onClick={onOpen}>
      {body}
    </button>
  );
}
