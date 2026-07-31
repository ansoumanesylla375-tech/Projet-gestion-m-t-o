import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

/**
 * Route protégée : si l'utilisateur n'a pas de token, on le redirige vers
 * /login en gardant l'URL qu'il visait (pratique pour revenir après login).
 */
export default function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
