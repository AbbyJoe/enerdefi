import { MenuIcon } from "../svgs/MenuIcon";
import { useAppState } from "../../state";

export function MobileNavButton({ className }: { className?: string }) {
  const { openMobileNav } = useAppState();

  return (
    <button
      type="button"
      onClick={openMobileNav}
      aria-label="Open menu"
      className={`grid size-10 shrink-0 place-items-center rounded-xl bg-[#f4f6f8] text-[#0b1d38] transition-colors hover:bg-[#e8ecf0] active:scale-[0.97] lg:hidden ${className ?? ""}`}
    >
      <MenuIcon />
    </button>
  );
}
