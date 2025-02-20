import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/common/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import FinancePage from "./pages/FinancePage";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { useAuth } from "./contexts/AuthProvider";
import ProjectManagement from "./pages/configuration/ProjectManagement";

const App = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          {user?.role === "finance" && (
            <Route path="finance" element={<FinancePage />} />
          )}
          {user?.role === "administrator" && (
            <Route path="manage/project" element={<ProjectManagement />} />
          )}
        </Route>
        <Route
          element={
            <ProtectedRoute isAuthenticated={!!user} isPublic>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
