import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";

const DefaultLayout = lazy(() => import("@/layout/DefaultLayout"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="h-screen"></div>}>
        <DefaultLayout />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
    v7_fetcherPersist: true,
  },
});

const Routes = () => {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};

export default Routes;
