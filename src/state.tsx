import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CurrencyCode } from "./lib/types";

export type ToastTone = "success" | "error" | "warning" | "info";

export type Toast = {
  id: number;
  title: string;
  body: ReactNode;
  tone: ToastTone;
};

type AppState = {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  signedIn: boolean;
  setSignedIn: (value: boolean) => void;
  toasts: Toast[];
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>("NGN");
  const [signedIn, setSignedIn] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toggleCollapsed = useCallback(() => setCollapsed((open) => !open), []);
  const openMobileNav = useCallback(() => setMobileNavOpen(true), []);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);
  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);
  const pushToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 4200);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      collapsed,
      toggleCollapsed,
      mobileNavOpen,
      openMobileNav,
      closeMobileNav,
      currency,
      setCurrency,
      signedIn,
      setSignedIn,
      toasts,
      pushToast,
      dismissToast,
    }),
    [collapsed, closeMobileNav, currency, dismissToast, mobileNavOpen, openMobileNav, pushToast, signedIn, toasts, toggleCollapsed],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const value = useContext(Ctx);
  if (!value) throw new Error("App state is missing");
  return value;
}
