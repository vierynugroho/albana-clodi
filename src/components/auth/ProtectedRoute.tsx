import { ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authUser = localStorage.getItem("token");
  localStorage.setItem("token", "test");
  if (!authUser) {
    return <Navigate to={"/signin"} replace />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
