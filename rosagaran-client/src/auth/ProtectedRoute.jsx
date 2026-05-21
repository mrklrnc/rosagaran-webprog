import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser, hasRole, isAuthenticated } from "./auth";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();
  const user = getCurrentUser();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" replace state={{ from: location }} />;
  }

  if (!hasRole(user, allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
