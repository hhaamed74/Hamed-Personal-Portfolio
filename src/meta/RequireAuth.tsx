import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuth) {
    // رجّع المستخدم للصفحة اللي كان رايحها بعد ما يعمل Login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
