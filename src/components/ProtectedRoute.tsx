import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "student";
}

const ProtectedRoute = ({ children, requiredRole = "admin" }: ProtectedRouteProps) => {
  const { isAdmin, isStudent } = useAuth();

  if (requiredRole === "admin" && !isAdmin) return <Navigate to="/login" replace />;
  if (requiredRole === "student" && !isStudent) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
