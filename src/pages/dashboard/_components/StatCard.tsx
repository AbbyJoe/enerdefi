import { Asset } from "../../../components/ui/Asset";

type StatCardProps = {
  label: string;
  value?: number;
  isLoading: boolean;
};

export function StatCard({ label, value, isLoading }: StatCardProps) {
  return (
    <div className="@container min-w-0">
      <article aria-busy={isLoading} className="flex h-full items-start gap-2 rounded-2xl border border-[#f4f6f8] bg-white p-4 @min-[180px]:p-5">
        <div className="flex min-w-0 flex-1 flex-col self-stretch">
          <p className="mb-4 text-sm leading-[22px] font-medium text-[#546071]">{label}</p>
          <div className="mt-auto text-2xl font-bold wrap-anywhere text-[#212b36]">
            {isLoading ? (
              <div className="flex h-8 items-center">
                <span className="skeleton h-6 w-16 max-w-full rounded-md" aria-hidden="true" />
                <span className="sr-only">Loading</span>
              </div>
            ) : (
              <p>{value ?? "—"}</p>
            )}
          </div>
        </div>
        <span className="hidden size-12 shrink-0 place-items-center rounded-full bg-[rgba(254,102,0,0.1)] @min-[180px]:grid">
          <Asset src="/assets/icon-chart.svg" width={24} height={24} />
        </span>
      </article>
    </div>
  );
}
