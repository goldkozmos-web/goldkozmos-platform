"use client";

import { useEffect, useId, useRef } from "react";
import type { EnergyWork } from "../../data/energyWorks";
import EnergyWorkImage from "./EnergyWorkImage";

type EnergyWorkModalProps = {
  work: EnergyWork;
  onClose: () => void;
};

export default function EnergyWorkModal({
  work,
  onClose,
}: EnergyWorkModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="energyWorkModalRoot">
      <button
        type="button"
        className="energyWorkModalOverlay"
        aria-label="Detayı kapat"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        className="energyWorkModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="energyWorkModalClose"
          aria-label="Kapat"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="energyWorkModalMedia">
          <EnergyWorkImage
            work={work}
            className="energyWorkModalImage"
          />
        </div>

        <div className="energyWorkModalBody">
          <p className="energyWorkModalEyebrow">
            BİREBİR ENERJİ ÇALIŞMASI
          </p>

          <h2 id={titleId}>{work.title}</h2>

          <p className="energyWorkModalPrice">
            {work.priceLabel}
          </p>

          <p
            id={descriptionId}
            className="energyWorkModalLead"
          >
            {work.shortDescription}
          </p>

          <dl className="energyWorkModalMeta">
            <div>
              <dt>Süre</dt>
              <dd>{work.duration}</dd>
            </div>
            <div>
              <dt>Uygulama</dt>
              <dd>{work.format}</dd>
            </div>
            <div>
              <dt>Kimler için</dt>
              <dd>{work.suitableFor}</dd>
            </div>
            <div>
              <dt>Nasıl ilerler</dt>
              <dd>{work.howItWorks}</dd>
            </div>
          </dl>

          <a
            className="energyWorkModalBuy"
            href={work.shopierUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Şimdi Satın Al
            <span aria-hidden="true">→</span>
          </a>

          <p className="energyWorkModalCheckoutNote">
            Satın alma işlemi Shopier üzerinden güvenli şekilde tamamlanır.
          </p>
        </div>
      </div>
    </div>
  );
}
