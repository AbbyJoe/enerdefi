import { STEPS } from "../../../lib/types";

const progressFor = [56, 62, 68, 74, 80, 84, 90, 95, 100];

export function ProjectStepper({ step, onStep }: { step: number; onStep: (step: number) => void }) {
  const progress = progressFor[step] ?? 56;

  return (
    <section className="rounded-2xl bg-white px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex h-1.5 items-center rounded-full bg-[#f4f6f8]">
        <div className="h-full rounded-full border border-[rgba(26,128,247,0.8)] bg-[rgba(26,128,247,0.8)]" style={{ width: `${progress}%` }} />
        <span className="-ml-6 rounded-full border border-[rgba(26,128,247,0.8)] bg-white px-1.5 text-sm leading-5 font-bold text-[#212b36]">{progress}%</span>
      </div>
      <div className="mt-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {STEPS.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => onStep(index)}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm leading-5 sm:px-3.5 sm:py-2.5 sm:text-base sm:leading-6 ${index === step ? "bg-[rgba(5,17,34,0.1)] font-bold text-[#212b36]" : "font-medium text-[#546071]"}`}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
