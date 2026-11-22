import type { ReactNode } from "react";
import { LoadErrorIcon } from "../svgs/LoadErrorIcon";
import { NoMatchIcon } from "../svgs/NoMatchIcon";
import { TableSkeleton } from "./TableSkeleton";
import { TableState, type TableAction } from "./TableState";

export type TableColumn<T> = {
  key: string;
  header: string;
  width: string;
  className?: string;
  /** Size and shape classes for this column's loading placeholder. Defaults to a line of text. */
  skeleton?: string;
  cell: (row: T) => ReactNode;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  minWidth?: string;
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
  loadingMessage?: string;
  errorTitle?: string;
  errorMessage?: ReactNode;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyMessage?: ReactNode;
  emptyAction?: TableAction;
};

export function Table<T>({
  columns,
  rows,
  rowKey,
  minWidth = "1020px",
  className,
  isLoading = false,
  isError = false,
  loadingMessage = "Loading…",
  errorTitle = "Something went wrong",
  errorMessage = "This table could not be loaded.",
  onRetry,
  emptyTitle = "Nothing to show",
  emptyMessage = "There are no records here yet.",
  emptyAction,
}: TableProps<T>) {
  const template = columns.map((column) => column.width).join(" ");

  const showRows = !isLoading && !isError && rows.length > 0;

  return (
    <div aria-busy={isLoading} className={`overflow-hidden rounded-lg border border-[#e4e7ec] ${className ?? ""}`}>
      <div className="overflow-x-auto">
        <div style={{ minWidth }}>
          <div
            className="grid bg-[#f9fafb] text-sm leading-[22px] font-semibold text-[#2c3036]"
            style={{ gridTemplateColumns: template }}
          >
            {columns.map((column) => (
              <div key={column.key} className="px-3 py-3">
                {column.header}
              </div>
            ))}
          </div>
          {isLoading ? <TableSkeleton columns={columns} template={template} /> : null}
          {showRows
            ? rows.map((row) => (
                <div
                  key={rowKey(row)}
                  className="grid items-center border-b border-[rgba(3,16,35,0.1)] bg-white text-sm leading-[22px]"
                  style={{ gridTemplateColumns: template }}
                >
                  {columns.map((column) => (
                    <div key={column.key} className={`min-w-0 px-3 py-3 ${column.className ?? ""}`}>
                      {column.cell(row)}
                    </div>
                  ))}
                </div>
              ))
            : null}
        </div>
      </div>

      {/* These sit outside the scroll area so they center on the visible width, not on minWidth. */}
      {isLoading ? (
        <p role="status" className="sr-only">
          {loadingMessage}
        </p>
      ) : isError ? (
        <TableState
          tone="error"
          icon={<LoadErrorIcon />}
          title={errorTitle}
          message={errorMessage}
          action={onRetry ? { label: "Try again", onClick: onRetry } : undefined}
        />
      ) : rows.length === 0 ? (
        <TableState tone="neutral" icon={<NoMatchIcon />} title={emptyTitle} message={emptyMessage} action={emptyAction} />
      ) : null}
    </div>
  );
}
