"use client";

import { useEffect, type ReactNode } from "react";

export default function ProfilimDrawer({
  title,
  eyebrow,
  onClose,
  children,
}: {
  title: string;
  eyebrow: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="profilimDrawerBackdrop" onClick={onClose}>
      <div
        className="profilimDrawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profilimDrawerTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="profilimDrawerHandle" aria-hidden="true" />

        <header className="profilimDrawerTop">
          <div>
            <p className="profilimDrawerEyebrow">{eyebrow}</p>
            <h2 id="profilimDrawerTitle">{title}</h2>
          </div>

          <button
            type="button"
            className="profilimDrawerClose"
            onClick={onClose}
            aria-label="Kapat"
          >
            ×
          </button>
        </header>

        <div className="profilimDrawerScroll">{children}</div>
      </div>
    </div>
  );
}
