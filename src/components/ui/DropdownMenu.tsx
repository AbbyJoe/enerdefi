import { useEffect, useRef, useState, type ReactNode } from "react";
import { Asset } from "./Asset";

type DropdownOption<T extends string> = {
  value: T;
  label: string;
};

type DropdownMenuShared = {
  label?: ReactNode;
  className?: string;
  menuClassName?: string;
  trigger?: (state: { open: boolean; toggle: () => void }) => ReactNode;
};

type DropdownMenuProps<T extends string = string> = DropdownMenuShared &
  (
    | {
        options: readonly DropdownOption<T>[];
        onSelect: (value: T) => void;
        menu?: never;
      }
    | {
        menu: (state: { close: () => void }) => ReactNode;
        options?: never;
        onSelect?: never;
      }
  );

const defaultMenuClass = "absolute top-14 right-0 z-10 w-40 rounded-lg border border-[#f2f2f2] bg-white p-1 shadow-lg";

export function DropdownMenu<T extends string = string>({ label, options, onSelect, className, menuClassName, trigger, menu }: DropdownMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggle = () => setOpen((current) => !current);

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={className ?? "relative"}>
      {trigger ? (
        trigger({ open, toggle })
      ) : (
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={toggle}
          className="flex h-12 items-center gap-2 rounded-lg bg-[rgba(145,158,171,0.08)] px-3 text-sm leading-6 font-bold text-[#2c3036]"
        >
          {label}
          <Asset src="/assets/icon-caret-sm.svg" width={20} height={20} />
        </button>
      )}
      {open ? (
        <div role="menu" className={menuClassName ?? defaultMenuClass}>
          {menu
            ? menu({ close: () => setOpen(false) })
            : options?.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="menuitem"
                  className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-[#f4f6f8]"
                  onClick={() => {
                    onSelect?.(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
        </div>
      ) : null}
    </div>
  );
}
