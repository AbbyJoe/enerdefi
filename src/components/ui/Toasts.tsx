import type { ComponentType, ReactNode } from "react";
import { AlertTriangleIcon } from "../svgs/AlertTriangleIcon";
import { CheckCircleIcon } from "../svgs/CheckCircleIcon";
import { CloseIcon } from "../svgs/CloseIcon";
import { InfoCircleIcon } from "../svgs/InfoCircleIcon";
import { XCircleIcon } from "../svgs/XCircleIcon";
import { useAppState, type ToastTone } from "../../state";

const tones: Record<
  ToastTone,
  {
    card: string;
    bar: string;
    icon: string;
    Icon: ComponentType;
  }
> = {
  success: {
    card: "bg-[#ecfdf3]",
    bar: "bg-[#12b76a]",
    icon: "text-[#039855]",
    Icon: CheckCircleIcon,
  },
  info: {
    card: "bg-[#eff8ff]",
    bar: "bg-[#2e90fa]",
    icon: "text-[#1570ef]",
    Icon: InfoCircleIcon,
  },
  error: {
    card: "bg-[#fef3f2]",
    bar: "bg-[#f04438]",
    icon: "text-[#d92d20]",
    Icon: XCircleIcon,
  },
  warning: {
    card: "bg-[#fffaeb]",
    bar: "bg-[#f79009]",
    icon: "text-[#dc6803]",
    Icon: AlertTriangleIcon,
  },
};

export function Toasts() {
  const { toasts, dismissToast } = useAppState();
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed top-[72px] right-3 z-[70] flex w-[419px] max-w-[calc(100vw-1.5rem)] flex-col gap-3 sm:top-[88px] sm:right-6">
      {toasts.map((toast) => {
        const tone = tones[toast.tone];
        const Icon = tone.Icon;
        return (
          <article
            key={toast.id}
            role="status"
            className={`pointer-events-auto relative flex overflow-hidden rounded-lg ${tone.card}`}
          >
            <span className={`w-1.5 shrink-0 ${tone.bar}`} aria-hidden="true" />
            <div className="flex min-w-0 flex-1 items-start gap-3 px-4 py-3.5">
              <span className={`mt-0.5 shrink-0 ${tone.icon}`}>
                <Icon />
              </span>
              <div className="min-w-0 flex-1 pr-5">
                <p className="text-sm leading-5 font-semibold text-[#101828]">{toast.title}</p>
                <p className="mt-1 text-sm leading-5 text-[#475467]">{toast.body}</p>
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="absolute top-3 right-3 text-[#7A8794] hover:text-[#546071]"
                aria-label="Dismiss"
              >
                <CloseIcon />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export type ToastBody = ReactNode;
