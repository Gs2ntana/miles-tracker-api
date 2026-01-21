import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-slate-900 text-white">Carregando...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}