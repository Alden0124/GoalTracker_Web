import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";

const DefaultLayout = lazy(() => import("@/layout/DefaultLayout"));
const Home = lazy(() => import("@/pages/Home"));
const SignIn = lazy(() => import("@/pages/Auth/SignIn"));
const SignUp = lazy(() => import("@/pages/Auth/SignUp"));
const Forget = lazy(() => import("@/pages/Auth/ForgetPassword"));
const SendCode = lazy(() => import("@/pages/Auth/SendCode"));
const VerifyCode = lazy(() => import("@/pages/Auth/VerifyCode"));
const ResetPassword = lazy(() => import("@/pages/Auth/ResetPassword"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="h-screen"></div>}>
        <DefaultLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/home",
        element: (
          <Suspense fallback={<div className="h-screen"></div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/signIn",
        element: (
          <Suspense fallback={<div className="h-screen"></div>}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "/signUp",
        element: (
          <Suspense fallback={<div className="h-screen"></div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/forget",
        element: (
          <Suspense fallback={<div className="h-screen"></div>}>
            <Forget />
          </Suspense>
        ),
      },
      {
        path: "/sendCode",
        element: (
          <Suspense fallback={<div className="h-screen"></div>}>
            <SendCode />
          </Suspense>
        ),
      },
      {
        path: "/verifyCode",
        element: (
          <Suspense fallback={<div className="h-screen"></div>}>
            <VerifyCode />
          </Suspense>
        ),
      },
      {
        path: "/resetPassword",
        element: (
          <Suspense fallback={<div className="h-screen"></div>}>
            <ResetPassword />
          </Suspense>
        ),
      },
    ],
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
