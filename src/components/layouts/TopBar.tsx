import { Link } from "@tanstack/react-router";
import { Asset } from "../ui/Asset";
import { DropdownMenu } from "../ui/DropdownMenu";
import { useAppState } from "../../state";
import type { CurrencyCode } from "../../lib/types";
import { MobileNavButton } from "./MobileNavButton";

const currencies: { code: CurrencyCode; flag: string }[] = [
  { code: "NGN", flag: "/assets/flag-ng.svg" },
  { code: "USD", flag: "/assets/flag-us.svg" },
  { code: "GBP", flag: "/assets/flag-gb.svg" },
];

const currencyFlag: Record<CurrencyCode, string> = {
  NGN: "/assets/flag-ng.svg",
  USD: "/assets/flag-us.svg",
  GBP: "/assets/flag-gb.svg",
};

// Menus line up with the whole row of controls until there is room to line up with their own button.
const menuAnchor = "@min-[520px]:relative";
const iconButton = "grid size-8 shrink-0 place-items-center rounded-full bg-[#fffdf5] @min-[520px]:size-10";

export function TopBar({ title }: { title: string }) {
  const { currency, setCurrency, setSignedIn } = useAppState();

  return (
    <header className="@container sticky top-0 z-30 border-b border-[#f2f2f2] bg-white">
      {/* Stays 72px tall by stacking tighter or wrapping the title, as page heights are based on it. */}
      <div className="flex min-h-18 flex-col justify-center gap-1 px-3 py-2 @min-[280px]:flex-row @min-[280px]:items-center @min-[280px]:justify-between @min-[280px]:gap-2 @min-[520px]:gap-4 @min-[520px]:px-6 @min-[520px]:py-3 @min-[820px]:px-10">
        <div className="flex min-w-0 items-center gap-2">
          <MobileNavButton />
          <h1
            title={title}
            className="min-w-0 truncate text-base leading-5 font-bold text-[#212b36] @min-[280px]:line-clamp-2 @min-[280px]:whitespace-normal @min-[520px]:text-xl @min-[520px]:leading-6 @min-[820px]:line-clamp-1 @min-[820px]:text-2xl @min-[820px]:leading-9"
          >
            {title}
          </h1>
        </div>
        <div className="relative flex flex-wrap items-center justify-end gap-0.5 @min-[280px]:shrink-0 @min-[280px]:flex-nowrap @min-[400px]:gap-2 @min-[820px]:gap-4">
          <DropdownMenu
            className={menuAnchor}
            menuClassName="absolute top-full right-0 mt-2 z-20 w-36 rounded-xl border border-[#f2f2f2] bg-white p-1 shadow-lg"
            menu={({ close }) => (
              <>
                {currencies.map(({ code, flag }) => (
                  <button
                    key={code}
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm hover:bg-[#f4f6f8]"
                    onClick={() => {
                      setCurrency(code);
                      close();
                    }}
                  >
                    <Asset src={flag} width={22} height={16} alt="" />
                    <span>{code}</span>
                  </button>
                ))}
              </>
            )}
            trigger={({ open, toggle }) => (
              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-haspopup="menu"
                className="flex size-8 shrink-0 items-center justify-center rounded-3xl bg-white @min-[520px]:h-12 @min-[520px]:w-auto @min-[520px]:gap-2.5 @min-[520px]:px-4"
              >
                <Asset src={currencyFlag[currency]} width={22} height={16} alt="" />
                <span className="sr-only text-base leading-6 font-medium text-[#2c3036] @min-[520px]:not-sr-only">{currency}</span>
                <Asset src="/assets/icon-chevron-down.svg" width={16} height={16} className="hidden @min-[520px]:block" />
              </button>
            )}
          />
          <Link to="/notifications" className={`relative ${iconButton}`} aria-label="Notifications">
            <Asset src="/assets/icon-bell.svg" width={20} height={20} />
            <span className="absolute top-1 right-1 rounded-full bg-[#ef4444] px-0.5 text-[8px] leading-none font-semibold text-white @min-[520px]:top-2 @min-[520px]:right-2">9+</span>
          </Link>
          <DropdownMenu
            className={menuAnchor}
            menuClassName="absolute top-full right-0 mt-2 z-20 w-56 rounded-xl border border-[#f2f2f2] bg-white p-3 text-sm shadow-lg"
            menu={({ close }) => (
              <>
                <p className="font-semibold text-[#2c3036]">Need a hand?</p>
                <p className="mt-1 text-[#546071]">Regulator support answers filing and permit questions.</p>
                <Link to="/support" className="mt-2 inline-block font-semibold text-[#fe6600]" onClick={close}>
                  Open support
                </Link>
              </>
            )}
            trigger={({ open, toggle }) => (
              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-haspopup="menu"
                className={iconButton}
                aria-label="Help"
              >
                <Asset src="/assets/icon-help.svg" width={20} height={20} />
              </button>
            )}
          />
          <DropdownMenu
            className={menuAnchor}
            menuClassName="absolute top-full right-0 mt-2 z-20 w-44 rounded-xl border border-[#f2f2f2] bg-white p-1 shadow-lg"
            menu={({ close }) => (
              <>
                <Link to="/settings" className="block rounded-md px-3 py-2 text-sm hover:bg-[#f4f6f8]" onClick={close}>
                  Profile settings
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-[#f4f6f8]"
                  onClick={() => {
                    close();
                    setSignedIn(false);
                  }}
                >
                  Logout
                </button>
              </>
            )}
            trigger={({ open, toggle }) => (
              <button type="button" onClick={toggle} aria-expanded={open} aria-haspopup="menu" className="flex shrink-0 items-center gap-2">
                <img src="/assets/avatar.png" width={40} height={40} alt="" className="size-8 shrink-0 rounded-full border border-[#d9d9d9] object-cover @min-[520px]:size-10" />
                <span className="sr-only text-left @min-[820px]:not-sr-only">
                  <span className="block text-sm leading-4 font-semibold text-[#2c3036]">Matthew Smith</span>
                  <span className="block text-[10px] leading-[14px] text-[#546071]">Core Regulator</span>
                </span>
                <Asset src="/assets/icon-chevron-down-lg.svg" width={16} height={26} className="hidden @min-[520px]:block" />
              </button>
            )}
          />
        </div>
      </div>
    </header>
  );
}
