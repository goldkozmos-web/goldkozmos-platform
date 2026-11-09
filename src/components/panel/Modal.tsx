"use client";
import {useEffect,useRef} from "react";
import {createPortal} from "react-dom";

export default function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    el?.showModal();
    return () => el?.close();
  }, []);
  return createPortal(
    <dialog
      ref={ref}
      className="panelDialog"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      aria-label={title}
    >
      <header>
        <h2>{title}</h2>
        <button onClick={onClose} aria-label="Pencereyi kapat">
          ×
        </button>
      </header>
      {children}
    </dialog>,
    document.body,
  );
}