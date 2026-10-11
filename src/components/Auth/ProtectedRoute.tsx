import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectIsAuthenticated, useAuthStore } from "../../store/authStore";

// Layout route: wraps a group of routes that need a signed-in user.
// Authentication only (no roles): any signed-in user passes.
function ProtectedRoute() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Remember where the user wanted to go; LoginForm/RegisterForm use it
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;