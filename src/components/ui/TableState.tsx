import type { ReactNode } from "react";

export type TableAction = {
  label: string;
  onClick: () => void;
};

const toneStyles = {
  neutral: "border border-[rgba(145,158,171,0.32)] bg-white text-[#2c3036] hover:bg-[#f4f6f8]",
  error: "bg-[#fe6600] text-white hover:bg-[#e85d00]",
};

type TableStateProps = {
  tone: keyof typeof toneStyles;
  icon: ReactNode;
  title: string;
  message: ReactNode;
  action?: TableAction;
};

export function TableState({ tone, icon, title, message, action }: TableStateProps) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className="flex min-h-[488px] flex-col items-center justify-center bg-white px-6 py-10 text-center">
      {icon}
      <p className="mt-5 text-lg leading-7 font-bold text-[#212b36]">{title}</p>
      <p className="mt-1 line-clamp-3 max-w-[400px] text-sm text-balance leading-[22px] wrap-anywhere text-[#546071]">{message}</p>
      {action ? (
        <button type="button" onClick={action.onClick} className={`mt-5 h-11 rounded-lg px-4 text-sm font-bold ${toneStyles[tone]}`}>
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
