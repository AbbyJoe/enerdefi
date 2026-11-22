import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { EmptyProjectsIcon } from "../../components/svgs/EmptyProjectsIcon";
import { TopBar } from "../../components/layouts/TopBar";
import { listProjects } from "../../lib/store";
import { ProjectCard, ProjectCardSkeleton } from "./_components/ProjectCard";

const SKELETON_CARDS = 3;
const gridClass = "grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4";

export function ProjectsPage() {
  const projects = useQuery({ queryKey: ["projects"], queryFn: listProjects });
  return (
    <>
      <TopBar title="Projects" />
      <main className="flex min-h-[calc(100vh-73px)] flex-col px-4 py-4 sm:px-6 sm:py-6">
        <div className="mb-4 flex justify-stretch sm:justify-end">
          <Link to="/projects/new" className="flex h-12 w-full items-center justify-center rounded-lg bg-[#fe6600] px-4 text-base font-bold text-white sm:w-auto">
            Create Project
          </Link>
        </div>
        {projects.isLoading ? (
          <div role="status">
            <span className="sr-only">Loading projects…</span>
            <div aria-hidden="true" className={gridClass}>
              {Array.from({ length: SKELETON_CARDS }, (_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : null}
        {!projects.isLoading && (projects.data?.length ?? 0) === 0 ? (
          // pb-16 offsets the Create Project row above, so this centers on the whole page area.
          <div className="flex flex-1 flex-col items-center justify-center pb-16 text-center">
            <EmptyProjectsIcon />
            <p className="mt-5 text-lg font-bold text-[#212b36]">No projects yet</p>
            <p className="mt-2 text-sm text-[#546071]">Saved drafts and submitted filings will show up here.</p>
          </div>
        ) : null}
        {projects.data?.length ? (
          <ul className={gridClass}>
            {projects.data.map((project) => (
              <li key={project.id} className="min-w-0">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : null}
      </main>
    </>
  );
}
