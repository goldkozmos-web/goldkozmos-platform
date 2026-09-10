import type { ReactNode } from "react";

export default function ProfilimSectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="profilimCard">
      <div className="profilimCardHead">
        <p className="profilimCardEyebrow">{eyebrow}</p>
        <span className="profilimCardHint" aria-hidden="true">
          ↘
        </span>
      </div>
      <h2>{title}</h2>
      <div className="profilimCardBody">{children}</div>
    </section>
  );
}
