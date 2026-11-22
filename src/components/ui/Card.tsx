import type { ReactNode } from "react";

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {title ? <h2 className="text-xl leading-6 font-bold tracking-[-0.4px] text-[#212b36]">{title}</h2> : null}
      <div className={title ? "mt-6" : ""}>{children}</div>
    </section>
  );
}
