import { useEffect, type ReactNode } from "react";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  className?: string;
  label?: string;
};

export function Modal({ onClose, children, className, label }: ModalProps) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-[rgba(11,29,56,0.35)] p-4 sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`my-auto rounded-2xl bg-white shadow-2xl ${className ?? "w-full max-w-lg"}`}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
