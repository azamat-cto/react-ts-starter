import {
	Link,
	Outlet,
	createRootRoute,
	useMatchRoute,
} from "@tanstack/react-router";
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
			{!matchedNoNavRoutes ? (
				<>
					<div className="p-2 flex gap-2">
						<Link to="/" className="[&.active]:font-bold">
							Home
						</Link>
					</div>
					<hr />
					<Outlet />
				</>
			) : (
				<Outlet />
			)}
			<React.Suspense fallback={null}>
				<TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
			</React.Suspense>
		</>
	);
}
