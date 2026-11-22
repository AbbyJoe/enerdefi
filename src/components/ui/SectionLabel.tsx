import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.08em] text-[#546071] uppercase">{children}</p>;
}
