import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingScreen } from "components/common";

const routes = [
  {
    path: "/",
    key: "home",
    Component: lazy(() => import("views/Home")),
  },
  {
    path: "/component",
    key: "component",
    Component: lazy(() => import("views/Components")),
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
