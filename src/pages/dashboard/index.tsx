import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Asset } from "../../components/ui/Asset";
import { DropdownMenu } from "../../components/ui/DropdownMenu";
import { Pagination } from "../../components/ui/Pagination";
import { Table, type TableColumn } from "../../components/ui/Table";
import { TopBar } from "../../components/layouts/TopBar";
import { getDashboardStats, getFilingById, listFilings } from "../../lib/store";
import type { Filing } from "../../lib/types";
import { StatCard } from "./_components/StatCard";
import { StatusBadge } from "./_components/StatusBadge";
import { ViewPermitModal } from "./_components/ViewPermitModal";

const statuses = ["All", "Pending", "Issued", "Expired", "Rejected"] as const;

const filingColumns = (onView: (id: string) => void): TableColumn<Filing>[] => [
  { key: "issueDate", header: "Issue Date", width: "118px", skeleton: "h-3 w-[72px] rounded-full", className: "font-normal text-[#2c3036] italic", cell: (row) => row.issueDate },
  { key: "permitId", header: "Permit ID", width: "180px", skeleton: "h-3 w-24 rounded-full", className: "font-medium text-[#2c3036]", cell: (row) => row.permitId },
  { key: "project", header: "Project", width: "minmax(180px,1fr)", className: "truncate font-medium text-[#2c3036]", cell: (row) => row.project },
  { key: "className", header: "Class", width: "120px", className: "font-medium text-[#2c3036]", cell: (row) => row.className },
  { key: "expiryDate", header: "Expiry Date", width: "130px", skeleton: "h-3 w-[72px] rounded-full", className: "text-[#2c3036] italic", cell: (row) => row.expiryDate },
  { key: "status", header: "Status", width: "120px", skeleton: "h-[30px] w-[76px] rounded-xl", cell: (row) => <StatusBadge status={row.status} /> },
  {
    key: "action",
    header: "",
    width: "140px",
    skeleton: "h-9 w-[109px] rounded-lg",
    cell: (row) => (
      <button
        type="button"
        onClick={() => onView(row.id)}
        className="h-9 rounded-lg border border-[rgba(145,158,171,0.32)] px-3 text-sm leading-6 font-semibold text-[#2c3036]"
      >
        View Details
      </button>
    ),
  },
];

export function DashboardPage() {
  const [q, setQ] = useState("");
  const [by, setBy] = useState<"permit" | "project">("permit");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [page, setPage] = useState(1);
  const [filingId, setFilingId] = useState<string | null>(null);

  const [lastPageCount, setLastPageCount] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("enerdefi.openFiling");
    if (!raw) return;
    sessionStorage.removeItem("enerdefi.openFiling");
    try {
      const parsed = JSON.parse(raw) as { q?: string; id?: string };
      if (parsed.q) {
        setQ(parsed.q);
        setBy("permit");
        setPage(1);
      }
      if (parsed.id) setFilingId(parsed.id);
    } catch {
      sessionStorage.removeItem("enerdefi.openFiling");
    }
  }, []);

  const stats = useQuery({ queryKey: ["stats"], queryFn: getDashboardStats });
  const filings = useQuery({
    queryKey: ["filings", q, status, page, by],
    queryFn: () => listFilings({ q, status, page, by }),
  });
  const detail = useQuery({
    queryKey: ["filing", filingId],
    queryFn: () => getFilingById(filingId as string),
    enabled: Boolean(filingId),
  });

  // Each page is its own query with no data while loading, so remember the count to keep pagination steady.
  const loadedPageCount = filings.data?.pageCount;
  useEffect(() => {
    if (loadedPageCount !== undefined) setLastPageCount(loadedPageCount);
  }, [loadedPageCount]);

  const term = q.trim();
  const isFiltered = term !== "" || status !== "All";
  const filingsLabel = status === "All" ? "filings" : `${status.toLowerCase()} filings`;
  const emptyMessage = term
    ? `We couldn’t find any ${filingsLabel} with a ${by === "permit" ? "permit ID" : "project name"} matching “${term}”.`
    : isFiltered
      ? `There are no ${filingsLabel} right now. Clear the filter to see all filings.`
      : "New filings will show up here.";

  function clearFilters() {
    setQ("");
    setStatus("All");
    setPage(1);
    // The clear button unmounts with the empty state, so hand focus back to the search field.
    searchRef.current?.focus();
  }

  const cards = [
    { label: "Total Filings", value: stats.data?.total },
    { label: "Pending Filings", value: stats.data?.pending },
    { label: "Issued Filings", value: stats.data?.issued },
    { label: "Expired Filings", value: stats.data?.expired },
  ];

  return (
    <>
      <TopBar title="Permits & Licenses" />
      <main className="px-4 py-4 sm:px-6 sm:py-6">
        {/* Container queries, because collapsing the sidebar changes the available width but not the viewport. */}
        <div className="@container">
          <div className="grid grid-cols-1 gap-3 @min-[420px]:grid-cols-2 @min-[420px]:gap-4 @min-[860px]:grid-cols-4">
            {cards.map((card) => (
              <StatCard key={card.label} label={card.label} value={card.value} isLoading={stats.isLoading} />
            ))}
          </div>
        </div>

        <section className="mt-4 rounded-2xl bg-white p-4 sm:mt-6 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex h-12 min-h-12 w-full min-w-0 shrink-0 items-center rounded-lg border border-[rgba(145,158,171,0.2)] px-3.5 sm:flex-1">
              <Asset src="/assets/icon-search-field.svg" width={24} height={24} className="shrink-0" />
              <input
                ref={searchRef}
                value={q}
                onChange={(event) => {
                  setQ(event.target.value);
                  setPage(1);
                }}
                placeholder={by === "permit" ? "Search by permit ID" : "Search by project"}
                className="ml-2 h-full min-w-0 flex-1 bg-transparent text-sm leading-[22px] outline-none placeholder:text-[#7A8794]"
              />
              <DropdownMenu
                className="relative shrink-0"
                menuClassName="absolute top-9 right-0 z-10 w-44 rounded-lg border border-[#f2f2f2] bg-white p-1 shadow-lg"
                options={[
                  { value: "permit", label: "Permit ID" },
                  { value: "project", label: "Project name" },
                ]}
                onSelect={setBy}
                trigger={({ open, toggle }) => (
                  <button
                    type="button"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-haspopup="menu"
                    aria-label="Choose search field"
                    className="grid size-8 place-items-center rounded-md"
                  >
                    <Asset src="/assets/icon-caret.svg" width={20} height={20} />
                  </button>
                )}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DropdownMenu
                label={status === "All" ? "Status" : status}
                options={statuses.map((option) => ({ value: option, label: option }))}
                onSelect={(option) => {
                  setStatus(option);
                  setPage(1);
                }}
              />
              <Link
                to="/projects/new"
                className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#fe6600] px-4 text-base leading-[26px] font-bold text-white sm:flex-none"
              >
                Create Project
              </Link>
            </div>
          </div>

          <Table
            className="mt-6"
            columns={filingColumns(setFilingId)}
            rows={filings.data?.items ?? []}
            rowKey={(row) => row.id}
            // A retry with cached data stays in the error state, so count it as loading to show feedback.
            isLoading={filings.isLoading || (filings.isError && filings.isFetching)}
            isError={filings.isError}
            loadingMessage="Loading filings…"
            errorTitle="Couldn’t load filings"
            errorMessage="Something went wrong on our end. Please try again in a moment."
            onRetry={() => void filings.refetch()}
            emptyTitle={isFiltered ? "No match found" : "No filings yet"}
            emptyMessage={emptyMessage}
            emptyAction={isFiltered ? { label: term && status === "All" ? "Clear search" : "Clear filters", onClick: clearFilters } : undefined}
          />

          <Pagination
            className="mt-5"
            page={page}
            pageCount={filings.data?.pageCount ?? (filings.isLoading ? lastPageCount : 1)}
            onPageChange={setPage}
          />
        </section>
      </main>
      {detail.data ? <ViewPermitModal filing={detail.data} onClose={() => setFilingId(null)} /> : null}
    </>
  );
}
