import { ComingSoonIcon } from "../svgs/ComingSoonIcon";

export function ComingSoon({ title }: { title?: string }) {
  return (
    <main className="grid min-h-[calc(100vh-73px)] place-items-center px-4 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <ComingSoonIcon />
        <h2 className="mt-5 text-xl font-bold tracking-[-0.3px] text-[#101828] sm:text-2xl">{title ?? "Coming Soon"}</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[#546071] sm:text-base">This section is still being built. Check back soon.</p>
      </div>
    </main>
  );
}
