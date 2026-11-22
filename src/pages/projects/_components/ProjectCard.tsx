import type { ReactNode } from "react";
import { Asset } from "../../../components/ui/Asset";
import type { ProjectCategory, SavedProject } from "../../../lib/types";

const categoryIcons: Record<ProjectCategory, string> = {
  Renewable: "/assets/icon-sun.svg",
  "Oil & Gas": "/assets/icon-flame.svg",
  Power: "/assets/icon-power.svg",
};

const statusStyles: Record<SavedProject["status"], string> = {
  Draft: "bg-[#f4f6f8] text-[#546071]",
  Submitted: "bg-[rgba(255,171,0,0.08)] text-[#b76e00]",
};

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

const styles = {
  header: "flex flex-wrap items-start justify-between gap-3",
  details: "mt-auto flex flex-wrap justify-between gap-x-4 gap-y-3 border-t border-[rgba(3,16,35,0.1)] pt-4 text-sm leading-[22px]",
};

// The card and its skeleton share this shell so their sizing cannot drift apart.
function CardShell({ children }: { children: ReactNode }) {
  return (
    <div className="@container h-full">
      <article className="flex h-full flex-col rounded-2xl border border-[#f4f6f8] bg-white p-4 @min-[180px]:p-5">{children}</article>
    </div>
  );
}

export function ProjectCard({ project }: { project: SavedProject }) {
  const { name, category, status, permitId, updatedAt } = project;

  return (
    <CardShell>
      <div className={styles.header}>
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[rgba(254,102,0,0.1)]">
          <Asset src={categoryIcons[category]} width={24} height={24} />
        </span>
        <span className={`rounded-xl px-3 py-1 text-sm leading-[22px] font-semibold ${statusStyles[status]}`}>{status}</span>
      </div>

      <h2 title={name} className="mt-4 line-clamp-2 text-lg leading-6 font-bold wrap-anywhere text-[#212b36]">
        {name}
      </h2>
      <p className="mt-1 mb-5 text-sm leading-[22px] font-medium text-[#546071]">{category}</p>

      <dl className={styles.details}>
        <div>
          <dt className="text-[#546071]">Permit ID</dt>
          <dd className={permitId ? "font-semibold text-[#2c3036]" : "text-[#546071] italic"}>{permitId ?? "Not assigned"}</dd>
        </div>
        <div>
          <dt className="text-[#546071]">{status === "Draft" ? "Last saved" : "Submitted on"}</dt>
          <dd className="font-semibold text-[#2c3036]">
            <time dateTime={updatedAt}>{dateFormat.format(new Date(updatedAt))}</time>
          </dd>
        </div>
      </dl>
    </CardShell>
  );
}

export function ProjectCardSkeleton() {
  return (
    <CardShell>
      <div className={styles.header}>
        <span className="skeleton size-12 shrink-0 rounded-full" />
        <span className="skeleton h-[30px] w-[94px] max-w-full rounded-xl" />
      </div>

      <div className="mt-4 flex h-6 items-center">
        <span className="skeleton h-4 w-3/5 rounded-full" />
      </div>
      <div className="mt-1 mb-5 flex h-[22px] items-center">
        <span className="skeleton h-3 w-20 max-w-full rounded-full" />
      </div>

      <div className={styles.details}>
        {/* Each column is as wide as the real text, so the two wrap at the same point. */}
        <div className="w-[108px] max-w-full">
          <div className="flex h-[22px] items-center">
            <span className="skeleton h-3 w-16 max-w-full rounded-full" />
          </div>
          <div className="flex h-[22px] items-center">
            <span className="skeleton h-3 w-full rounded-full" />
          </div>
        </div>
        <div className="w-[88px] max-w-full">
          <div className="flex h-[22px] items-center">
            <span className="skeleton h-3 w-16 max-w-full rounded-full" />
          </div>
          <div className="flex h-[22px] items-center">
            <span className="skeleton h-3 w-full rounded-full" />
          </div>
        </div>
      </div>
    </CardShell>
  );
}
