"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.2 7.2 16.8 16.8M16.8 7.2 7.2 16.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("hasProfilimDrawer");

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.body.classList.remove("hasProfilimDrawer");
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
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
            <p className="profilimDrawerEyebrow">
              <i />
              {eyebrow}
            </p>
            <h2 id="profilimDrawerTitle">{title}</h2>
          </div>

          <button
            type="button"
            className="profilimDrawerClose"
            onClick={onClose}
            aria-label="Kapat"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="profilimDrawerScroll">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
