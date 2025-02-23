import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Components
const AuthLayout = lazy(() => import("@/pages/auth"));
const SigninPage = lazy(() => import("@/pages/auth/signin"));
const SignupPage = lazy(() => import("@/pages/auth/signup"));

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const RouteProvider = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/auth" Component={AuthLayout}>
          <Route index element={<Navigate to="signin" />} />
          <Route path="signin" Component={SigninPage} />
          <Route path="signup" Component={SignupPage} />
        </Route>
      </Routes>
    </Suspense>
  );
};
