import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { EyeIcon } from "../../../components/svgs/EyeIcon";
import { SpinnerIcon } from "../../../components/svgs/SpinnerIcon";
import { Modal } from "../../../components/ui/Modal";
import { setFilingStatus } from "../../../lib/store";
import type { Filing, FilingStatus } from "../../../lib/types";
import { useAppState } from "../../../state";
import { StatusBadge } from "./StatusBadge";

export function ViewPermitModal({ filing, onClose }: { filing: Filing; onClose: () => void }) {
  const queryClient = useQueryClient();
  const { pushToast } = useAppState();
  const [preview, setPreview] = useState(false);
  const [pending, setPending] = useState<FilingStatus | null>(null);

  async function decide(status: FilingStatus) {
    setPending(status);
    try {
      await setFilingStatus(filing.id, status);
      await queryClient.invalidateQueries({ queryKey: ["filings"] });
      await queryClient.invalidateQueries({ queryKey: ["stats"] });
      await queryClient.invalidateQueries({ queryKey: ["filing", filing.id] });
      pushToast({
        tone: status === "Issued" ? "success" : "warning",
        title: status === "Issued" ? "Filing approved" : "Filing rejected",
        body: `${filing.permitId} is now ${status.toLowerCase()}.`,
      });
      onClose();
    } finally {
      setPending(null);
    }
  }

  function download() {
    const text = [
      `Permit & License Details`,
      filing.permitId,
      `Project ID: ${filing.projectId}`,
      `Project Name: ${filing.project}`,
      `Reporting Period: ${filing.reportingPeriod}`,
      `Filing Type: ${filing.filingType}`,
      `Issue Date: ${filing.issueDate}`,
      `Expiry Date: ${filing.expiryDate}`,
      `Validity: ${filing.validity}`,
      `Status: ${filing.status}`,
    ].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filing.documentName.replace(/\.pdf$/, ".txt");
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Modal onClose={onClose} label="Permit & License Details" className="w-full max-w-[397px] p-3">
      <div className="flex items-start justify-between gap-3 px-1 pt-3">
        <div>
          <h2 className="text-base font-bold text-[#212b36]">Permit & License Details</h2>
          <p className="text-xs text-[#546071]">{filing.permitId}</p>
        </div>
        <StatusBadge status={filing.status} />
      </div>
      <div className="mt-4 rounded-xl bg-[#f9fafb] p-3">
        <p className="text-sm font-semibold text-[#2c3036]">Project Information</p>
        <dl className="mt-3 grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <dt className="text-xs text-[#546071]">Project ID:</dt>
            <dd className="font-medium">{filing.projectId}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#546071]">Project Name:</dt>
            <dd className="font-medium">{filing.project}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#546071]">Reporting Period:</dt>
            <dd className="font-medium">{filing.reportingPeriod}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#546071]">Filing Type:</dt>
            <dd className="font-medium">{filing.filingType}</dd>
          </div>
        </dl>
      </div>
      <div className="mt-3 rounded-xl bg-[#f9fafb] p-3">
        <p className="text-sm font-semibold text-[#2c3036]">Validity Period</p>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-[#546071]">Issue Date:</dt><dd>{filing.issueDate}</dd></div>
          <div className="flex justify-between"><dt className="text-[#546071]">Expiry Date:</dt><dd>{filing.expiryDate}</dd></div>
          <div className="flex justify-between"><dt className="text-[#546071]">Validity:</dt><dd>{filing.validity}</dd></div>
        </dl>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#e4e7ec] px-4 py-3">
        <span className="grid size-7 place-items-center rounded-md bg-[#fff8f5] text-xs font-bold text-[#fe6600]">PDF</span>
        <p className="min-w-0 flex-1 truncate text-sm font-medium">{filing.documentName}</p>
        <button type="button" onClick={() => setPreview((open) => !open)} className="grid size-9 place-items-center rounded-lg border border-[#e4e7ec]" aria-label="Preview document">
          <EyeIcon />
        </button>
      </div>
      {preview ? <p className="mt-2 px-1 text-xs text-[#546071]">Preview ready. Download the report to keep a copy.</p> : null}
      {filing.status === "Pending" ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={pending !== null}
            onClick={() => void decide("Rejected")}
            className="flex h-12 items-center justify-center gap-2 rounded-lg border border-[rgba(5,17,34,0.1)] text-base font-bold disabled:opacity-70"
          >
            {pending === "Rejected" ? <SpinnerIcon /> : null}
            Reject
          </button>
          <button
            type="button"
            disabled={pending !== null}
            onClick={() => void decide("Issued")}
            className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0b1d38] text-base font-bold text-white disabled:opacity-70"
          >
            {pending === "Issued" ? <SpinnerIcon /> : null}
            Approve Filing
          </button>
        </div>
      ) : null}
      <button type="button" onClick={download} className="mt-2 h-10 w-full text-sm font-semibold text-[#fe6600]">
        Download Report
      </button>
    </Modal>
  );
}
