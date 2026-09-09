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
      <p className="profilimCardEyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div className="profilimCardBody">{children}</div>
    </section>
  );
}
