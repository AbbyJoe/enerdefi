type PageItem = number | "…";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const count = Math.max(pageCount, 1);
  const pages = pageList(page, count);

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-8 ${className ?? ""}`}>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className="h-9 rounded-lg bg-[#f2f2f2] px-3 text-sm leading-6 font-bold text-[#2c3036] disabled:opacity-40"
      >
        Previous
      </button>
      <div className="flex gap-0.5">
        {pages.map((item, index) =>
          item === "…" ? (
            <span key={`gap-${index}`} className="grid size-8 place-items-center text-sm text-[#546071] sm:size-10 sm:text-base">…</span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={`grid size-8 place-items-center rounded-lg text-sm sm:size-10 sm:text-base ${item === page ? "bg-[#fff8f5] text-[#fe6600]" : "text-[#546071]"}`}
            >
              {item}
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        disabled={page >= count}
        onClick={() => onPageChange(page + 1)}
        className="h-9 rounded-lg bg-[#f2f2f2] px-3 text-sm leading-6 font-bold text-[#2c3036] disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

function pageList(current: number, count: number): PageItem[] {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1);
  if (current <= 3) return [1, 2, 3, "…", count - 2, count - 1, count];
  if (current >= count - 2) return [1, 2, 3, "…", count - 2, count - 1, count];
  return [1, "…", current - 1, current, current + 1, "…", count];
}
