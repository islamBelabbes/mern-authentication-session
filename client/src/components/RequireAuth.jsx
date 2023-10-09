import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import { isRequireRoles } from "../helpers/utility";
function RequireAuth({ requiredRoles }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // lets check if user is logged in in the first place.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // does it require a specific role?
  if (!isRequireRoles(requiredRoles)) return <Outlet />;

  // in this point, we need to check the role of the user
  let hasRoles = false;
  requiredRoles.forEach((role) => {
    if (user.roles.includes(role)) hasRoles = true;
  });

  return hasRoles ? (
    <Outlet />
  ) : (
    <Navigate to="/Unauthorized" state={{ from: location.pathname }} replace />
  );
}

export default RequireAuth;
