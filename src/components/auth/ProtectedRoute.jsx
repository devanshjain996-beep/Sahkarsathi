import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    // Redirect unauthenticated user to login, preserving intended path
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // If authenticated user attempts cross-role access, redirect to their proper dashboard
    const roleDashboardMap = {
      customer: "/customer/dashboard",
      worker: "/worker/dashboard",
      supervisor: "/supervisor/dashboard",
    };
    const destination = roleDashboardMap[role] || "/";
    return <Navigate to={destination} replace />;
  }

  return children;
}
