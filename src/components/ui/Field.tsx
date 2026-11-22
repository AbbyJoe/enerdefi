import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex w-full flex-col gap-2 text-left">
      <span className="text-xs font-medium leading-4 text-[#212b36]">{label}</span>
      {children}
      {error ? <span className="text-sm leading-5 text-[#c73a3a]">{error}</span> : null}
      {hint && !error ? <span className="text-sm leading-5 text-[#546071]">{hint}</span> : null}
    </label>
  );
}
