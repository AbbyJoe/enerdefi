import type { TableColumn } from "./Table";

const ROWS = 8;
// Uneven widths read as text, where identical bars read as a grid of boxes.
const TEXT_WIDTHS = ["w-4/5", "w-3/5", "w-11/12", "w-2/3", "w-3/4"];

type TableSkeletonProps<T> = {
  columns: TableColumn<T>[];
  template: string;
};

export function TableSkeleton<T>({ columns, template }: TableSkeletonProps<T>) {
  return (
    <div aria-hidden="true">
      {Array.from({ length: ROWS }, (_, row) => (
        <div
          key={row}
          className="grid items-center border-b border-[rgba(3,16,35,0.1)] bg-white"
          style={{ gridTemplateColumns: template }}
        >
          {columns.map((column, index) => (
            <div key={column.key} className="min-w-0 px-3 py-3">
              <div className="flex min-h-[22px] items-center">
                <span
                  className={`skeleton block max-w-full ${column.skeleton ?? `h-3 rounded-full ${TEXT_WIDTHS[(row + index) % TEXT_WIDTHS.length]}`}`}
                  // Each row starts a little later, so the shimmer flows down the table.
                  style={{ animationDelay: `${row * 80}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
