import { Link } from "@tanstack/react-router";
import { MobileNavButton } from "../../../components/layouts/MobileNavButton";
import { SpinnerIcon } from "../../../components/svgs/SpinnerIcon";
import { Asset } from "../../../components/ui/Asset";
import { STEPS } from "../../../lib/types";

type CreateProjectHeaderProps = {
  step: number;
  saving: boolean;
  submitting: boolean;
  onSave: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export function CreateProjectHeader({ step, saving, submitting, onSave, onPrev, onNext, onSubmit }: CreateProjectHeaderProps) {
  const last = step >= STEPS.length - 1;

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 sm:px-6">
      <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
        <MobileNavButton />
        <Link to="/projects" className="flex h-10 items-center gap-1 rounded-lg border border-[rgba(5,17,34,0.1)] px-2.5 text-sm font-bold text-[#212b36] sm:h-12 sm:px-3 sm:text-base">
          <Asset src="/assets/icon-arrow-left.svg" width={20} height={20} />
          <span className="hidden sm:inline">Projects</span>
        </Link>
        <button
          type="button"
          disabled={saving}
          onClick={onSave}
          className="flex h-10 items-center gap-1 rounded-lg bg-[#212b36] px-2.5 text-sm font-bold text-white shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] disabled:opacity-70 sm:h-12 sm:px-3 sm:text-base"
        >
          {saving ? <SpinnerIcon /> : <Asset src="/assets/icon-save.svg" width={20} height={20} />}
          <span className="hidden sm:inline">{saving ? "Saving…" : "Save changes"}</span>
        </button>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          disabled={step === 0}
          onClick={onPrev}
          className="flex h-10 items-center gap-1 rounded-lg border border-[rgba(5,17,34,0.1)] px-2.5 text-sm font-bold text-[#212b36] disabled:opacity-40 sm:h-12 sm:px-3 sm:text-base"
        >
          <Asset src="/assets/icon-arrow-left.svg" width={20} height={20} />
          <span className="hidden sm:inline">Prev</span>
        </button>
        {last ? (
          <button
            type="button"
            disabled={submitting}
            onClick={onSubmit}
            className="flex h-10 items-center gap-1 rounded-lg bg-[#fe6600] px-3 text-sm font-bold text-white disabled:opacity-70 sm:h-12 sm:px-4 sm:text-base"
          >
            {submitting ? <SpinnerIcon /> : null}
            {submitting ? "Submitting…" : "Submit"}
            {submitting ? null : <Asset src="/assets/icon-arrow-right.svg" width={20} height={20} />}
          </button>
        ) : (
          <button type="button" onClick={onNext} className="flex h-10 items-center gap-1 rounded-lg bg-[#fe6600] px-3 text-sm font-bold text-white sm:h-12 sm:px-4 sm:text-base">
            Next
            <Asset src="/assets/icon-arrow-right.svg" width={20} height={20} />
          </button>
        )}
      </div>
    </header>
  );
}
