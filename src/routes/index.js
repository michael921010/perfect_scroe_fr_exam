import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingScreen } from "components/common";

export const routes = [
  {
    path: "/",
    key: "home",
    Component: lazy(() => import("views/Home")),
  },
  {
    path: "/results",
    key: "results",
    Component: lazy(() => import("views/Results")),
  },
  {
    path: "/tags",
    key: "tags",
    Component: lazy(() => import("views/Tags")),
  },
  {
    path: "/component",
    key: "component",
    Component: lazy(() => import("views/Components")),
  },
  {
    path: "*",
    key: "not_found",
    Component: lazy(() => import("views/NotFound")),
  },
];

export default function MyRoutes() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen />}>
      <Routes>
        {routes.map(({ path, key, Component }) => (
          <Route key={key} path={path} element={<Component />} />
        ))}
      </Routes>
    </Suspense>
  );
}
