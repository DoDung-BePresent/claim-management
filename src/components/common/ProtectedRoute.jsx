import React from "react";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

export const ProtectedRoute = ({
  isAuthenticated,
  isLoading = false,
  isPublic = false,
  redirectPath = "/sign-in",
  children,
}) => {
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isPublic && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isPublic && !isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
