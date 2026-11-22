import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CloseIcon } from "../svgs/CloseIcon";
import { Asset } from "../ui/Asset";
import { countUnreadNotifications, getNotifications, listFilings } from "../../lib/store";
import { useAppState } from "../../state";

const items = [
  { to: "/", label: "Dashboard", icon: "/assets/icon-dashboard.svg", exact: true },
  { to: "/projects", label: "Projects", icon: "/assets/icon-projects.svg" },
  { to: "/bids", label: "Bids & Service Requests", icon: "/assets/icon-bids.svg" },
  { to: "/messages", label: "Messages", icon: "/assets/icon-messages.svg" },
  { to: "/wallet", label: "Wallet", icon: "/assets/icon-wallet.svg" },
  { to: "/notifications", label: "Notifications", icon: "/assets/icon-bell-nav.svg", badge: true },
  { to: "/settings", label: "Settings", icon: "/assets/icon-settings.svg", chevron: true },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const { collapsed, toggleCollapsed, mobileNavOpen, closeMobileNav, setSignedIn } = useAppState();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const notifications = useQuery({ queryKey: ["notifications"], queryFn: getNotifications });
  const filings = useQuery({
    queryKey: ["sidebar-search", query],
    queryFn: () => listFilings({ q: query, status: "All", page: 1, by: "permit" }),
    enabled: query.trim().length > 1,
  });
  const unread = countUnreadNotifications(notifications.data ?? []);
  const badgeLabel = unread > 9 ? "9+" : String(unread);
  // On mobile the drawer is always full-width; collapse only applies on desktop.
  const compact = collapsed;

  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileNav();
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (collapsed) toggleCollapsed();
        window.requestAnimationFrame(() => {
          document.getElementById("sidebar-search")?.focus();
          setSearchOpen(true);
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMobileNav, collapsed, toggleCollapsed]);

  const visible = items.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));

  function goTo(path: string) {
    setSearchOpen(false);
    setQuery("");
    closeMobileNav();
    void navigate({ to: path });
  }

  const panel = (
    <aside
      className={`flex h-full flex-col bg-[#0b1d38] py-6 text-white will-change-transform lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:transition-[width] lg:duration-200 lg:ease-out ${
        compact ? "lg:w-[88px]" : "lg:w-[280px]"
      } fixed inset-y-0 left-0 z-50 w-[min(280px,88vw)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        mobileNavOpen ? "translate-x-0 shadow-[8px_0_32px_rgba(11,29,56,0.28)]" : "-translate-x-full shadow-none"
      } lg:static lg:translate-x-0 lg:shadow-none`}
    >
      <div className="flex flex-col gap-5 px-4">
        <div className={`flex items-center gap-2 ${compact ? "lg:justify-center" : "justify-between"}`}>
          <Link to="/" onClick={closeMobileNav} className="flex min-w-0 items-center gap-1">
            <Asset src="/assets/logo-mark.png" width={36} height={36} alt="EnerDeFi" />
            {compact ? null : <Asset src="/assets/wordmark.svg" width={78} height={15} alt="EnerDeFi" className="hidden lg:block" />}
            <Asset src="/assets/wordmark.svg" width={78} height={15} alt="EnerDeFi" className="lg:hidden" />
          </Link>
          <div className={`flex shrink-0 items-center ${compact ? "lg:hidden" : ""}`}>
            <button type="button" onClick={closeMobileNav} aria-label="Close menu" className="grid size-9 place-items-center rounded-lg text-white lg:hidden">
              <CloseIcon className="size-5" />
            </button>
            {compact ? null : (
              <button type="button" onClick={toggleCollapsed} aria-label="Collapse sidebar" className="hidden size-9 place-items-center lg:grid">
                <Asset src="/assets/icon-collapse.svg" width={24} height={24} />
              </button>
            )}
          </div>
        </div>
        <div className={`relative ${compact ? "lg:hidden" : ""}`}>
          <label className="flex items-center gap-2 rounded-lg border border-white/12 bg-white/6 px-3 py-2 shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
            <Asset src="/assets/icon-search.svg" width={20} height={20} />
            <input
              id="sidebar-search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search"
              className="w-full bg-transparent text-sm leading-5 text-white/80 outline-none placeholder:text-white/70"
            />
            <span className="hidden rounded bg-white/12 px-1 text-xs leading-4.5 font-medium text-white/60 sm:inline">⌘K</span>
          </label>
          {searchOpen && query.trim() ? (
            <div className="absolute top-12 right-0 left-0 z-20 overflow-hidden rounded-lg border border-white/10 bg-[#122846] shadow-xl">
              {visible.map((item) => (
                <button
                  key={item.to}
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
                  onClick={() => goTo(item.to)}
                >
                  {item.label}
                </button>
              ))}
              {(filings.data?.items ?? []).slice(0, 4).map((filing) => (
                <button
                  key={filing.id}
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                    closeMobileNav();
                    sessionStorage.setItem("enerdefi.openFiling", JSON.stringify({ q: filing.permitId, id: filing.id }));
                    void navigate({ to: "/" });
                  }}
                >
                  {filing.permitId} · {filing.project}
                </button>
              ))}
              {visible.length === 0 && (filings.data?.items.length ?? 0) === 0 ? (
                <p className="px-3 py-2 text-sm text-white/60">No matches</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-2.5 overflow-y-auto px-4">
        {compact ? (
          <button
            type="button"
            onClick={toggleCollapsed}
            title="Search"
            aria-label="Expand sidebar to search"
            className="hidden w-full items-center justify-center rounded-lg bg-white/12 border border-white/12 px-0 py-2 text-white/80 lg:flex h-9 hover:bg-white/10"
          >
            <Asset src="/assets/icon-search.svg" width={20} height={20} />
          </button>
        ) : null}
        {items.map((item) => {
          const active = "exact" in item && item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <Link
              key={item.to}
              to={item.to}
              title={item.label}
              onClick={closeMobileNav}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base leading-6 font-medium text-white/80 ${active ? "bg-white/12" : "hover:bg-white/6"} ${compact ? "lg:justify-center lg:px-0" : ""}`}
            >
              <Asset src={item.icon} width={24} height={24} />
              <span className={`flex min-w-0 flex-1 items-center justify-between gap-2 ${compact ? "lg:hidden" : ""}`}>
                <span className="truncate">{item.label}</span>
                {"badge" in item && item.badge && unread > 0 ? (
                  <span className="rounded-full bg-[#c73a3a] px-1.5 py-0.5 text-xs leading-4 text-white">{badgeLabel}</span>
                ) : null}
                {"chevron" in item && item.chevron ? <Asset src="/assets/icon-chevron-right.svg" width={24} height={24} /> : null}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/12 px-4 pt-2">
        <Link
          to="/support"
          onClick={closeMobileNav}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-white/80 ${compact ? "lg:justify-center lg:px-0" : ""}`}
        >
          <Asset src="/assets/icon-support.svg" width={24} height={24} />
          <span className={compact ? "lg:hidden" : undefined}>Support</span>
        </Link>
        <button
          type="button"
          onClick={() => {
            closeMobileNav();
            setSignedIn(false);
          }}
          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-white/80 ${compact ? "lg:justify-center lg:px-0" : ""}`}
        >
          <Asset src="/assets/icon-logout.svg" width={24} height={24} />
          <span className={compact ? "lg:hidden" : undefined}>Logout</span>
        </button>
        <div className={`mt-2 flex items-center gap-2 rounded-xl bg-white/12 p-3 ${compact ? "lg:justify-center" : ""}`}>
          <img src="/assets/avatar.png" width={40} height={40} alt="" className="size-10 rounded-full border border-[#d9d9d9] object-cover" />
          <div className={`min-w-0 flex-1 text-sm leading-5 ${compact ? "lg:hidden" : ""}`}>
            <p className="truncate font-bold text-white">George Brown</p>
            <p className="truncate text-white/80">Energy Operator</p>
          </div>
          <Asset src="/assets/icon-chevrons.svg" width={24} height={24} className={compact ? "lg:hidden" : undefined} />
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Close menu overlay"
        tabIndex={mobileNavOpen ? 0 : -1}
        onClick={closeMobileNav}
        className={`fixed inset-0 z-40 bg-[rgba(11,29,56,0.45)] transition-opacity duration-300 ease-out lg:hidden ${
          mobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {panel}
    </>
  );
}
