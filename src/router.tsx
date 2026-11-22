import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { Sidebar } from "./components/layouts/Sidebar";
import { Toasts } from "./components/ui/Toasts";
import { SignedOut } from "./pages/auth";
import { BidsPage } from "./pages/bids";
import { DashboardPage } from "./pages/dashboard";
import { MessagesPage } from "./pages/messages";
import { NotificationsPage } from "./pages/notifications";
import { CreateProjectPage } from "./pages/projects/create";
import { ProjectsPage } from "./pages/projects";
import { SettingsPage } from "./pages/settings";
import { SupportPage } from "./pages/support";
import { WalletPage } from "./pages/wallet";
import { useAppState } from "./state";

function Shell() {
  const { signedIn } = useAppState();
  if (!signedIn) return <SignedOut />;
  return (
    <div className="flex min-h-screen bg-[#f4f6f8]">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
      <Toasts />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Shell });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: ProjectsPage,
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/new",
  component: CreateProjectPage,
});

const bidsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/bids", component: BidsPage });
const messagesRoute = createRoute({ getParentRoute: () => rootRoute, path: "/messages", component: MessagesPage });
const walletRoute = createRoute({ getParentRoute: () => rootRoute, path: "/wallet", component: WalletPage });
const notificationsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/notifications", component: NotificationsPage });
const settingsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/settings", component: SettingsPage });
const supportRoute = createRoute({ getParentRoute: () => rootRoute, path: "/support", component: SupportPage });

const catchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$",
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  projectsRoute,
  createRoute_,
  bidsRoute,
  messagesRoute,
  walletRoute,
  notificationsRoute,
  settingsRoute,
  supportRoute,
  catchRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
