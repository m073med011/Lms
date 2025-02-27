import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? (children ? children : <Outlet />) : <Navigate to="/signin" />;
};

export default ProtectedRoute;
