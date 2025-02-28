import { AppSidebar } from "@/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, createRootRoute, useMatchRoute } from "@tanstack/react-router";
import * as React from "react";

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null // Render nothing in production
		: React.lazy(() =>
				// Lazy load in development
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
				})),
			);

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const matchRoute = useMatchRoute();
	const hideNavRoutes = ["/login", "/register"];

	const matchedNoNavRoutes = hideNavRoutes.some((route) =>
		matchRoute({ to: route }),
	);

	return (
		<>
			{matchedNoNavRoutes ? (
				<Outlet />
			) : (
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>
						<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
							<div className="flex items-center gap-2 px-4">
								<SidebarTrigger className="-ml-1" />
							</div>
						</header>
						<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
							<div className="grid auto-rows-min gap-4 md:grid-cols-3">
								<div className="aspect-video rounded-xl bg-muted/50" />
								<div className="aspect-video rounded-xl bg-muted/50" />
								<div className="aspect-video rounded-xl bg-muted/50" />
							</div>
							<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
								<Outlet />
							</div>
						</div>
					</SidebarInset>
				</SidebarProvider>
			)}
			<React.Suspense fallback={null}>
				<TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
			</React.Suspense>
		</>
	);
}
