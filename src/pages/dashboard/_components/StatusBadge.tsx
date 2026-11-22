import type { FilingStatus } from "../../../lib/types";

export function StatusBadge({ status }: { status: FilingStatus }) {
  const styles: Record<FilingStatus, string> = {
    Pending: "bg-[rgba(255,171,0,0.08)] text-[#b76e00]",
    Issued: "bg-[rgba(19,122,160,0.08)] text-[#137aa0]",
    Expired: "bg-[rgba(199,58,58,0.1)] text-[#c73a3a]",
    Rejected: "bg-[rgba(199,58,58,0.1)] text-[#c73a3a]",
  };
  return <span className={`inline-flex rounded-xl px-3 py-1 text-sm leading-[22px] font-semibold ${styles[status]}`}>{status}</span>;
}
