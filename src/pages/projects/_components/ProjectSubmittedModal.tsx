import { useNavigate } from "@tanstack/react-router";
import { SuccessCelebrationIcon } from "../../../components/svgs/SuccessCelebrationIcon";
import { Modal } from "../../../components/ui/Modal";

type ProjectSubmittedModalProps = {
  onClose: () => void;
};

export function ProjectSubmittedModal({ onClose }: ProjectSubmittedModalProps) {
  const navigate = useNavigate();

  function goReport() {
    onClose();
    void navigate({ to: "/projects" });
  }

  function goDashboard() {
    onClose();
    void navigate({ to: "/" });
  }

  return (
    <Modal onClose={goDashboard} label="Project Submitted" className="w-full max-w-[480px] overflow-hidden p-5 sm:p-8 animate-[modal-in_0.35s_cubic-bezier(0.22,1,0.36,1)_both]">
      <div className="flex flex-col items-center text-center">
        <SuccessCelebrationIcon />

        <h2 className="mt-2 text-2xl leading-8 font-bold tracking-[-0.4px] text-[#101828] animate-[fade-up_0.45s_ease-out_0.15s_both] sm:text-[28px] sm:leading-9">
          Project Submitted
        </h2>
        <p className="mt-3 max-w-[360px] text-sm leading-6 text-[#546071] animate-[fade-up_0.45s_ease-out_0.25s_both] sm:text-base">
          We will review your submission and notify you once the verification process is complete. This process typically takes 1–3 business days.
        </p>

        <div className="mt-6 grid w-full grid-cols-1 gap-3 animate-[fade-up_0.45s_ease-out_0.35s_both] sm:mt-8 sm:grid-cols-2">
          <button
            type="button"
            onClick={goReport}
            className="h-12 rounded-lg border border-[rgba(5,17,34,0.12)] text-base font-bold text-[#212b36]"
          >
            View Report
          </button>
          <button type="button" onClick={goDashboard} className="h-12 rounded-lg bg-[#fe6600] text-base font-bold text-white">
            View Dashboard
          </button>
        </div>
      </div>
    </Modal>
  );
}
