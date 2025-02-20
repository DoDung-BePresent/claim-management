import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/common/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import FinancePage from "./pages/FinancePage";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { useAuth } from "./contexts/AuthProvider";
import ProjectManagement from "./pages/configuration/ProjectManagement";
import StaffManagement from "./pages/configuration/StaffManagement";
import ViewClaim from "./pages/viewpage/viewClaim";
import ClaimsPage from "./pages/common/ClaimApprovalPage";
import NotFoundPage from "./pages/auth/NotFoundPage";

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
          <Route path="finance" element={<FinancePage />} />
          <Route path="view-claim" element={<ViewClaim />} />
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
        <Route path="management-project" element={<ProjectManagement/>}></Route>
        <Route path="management-staff" element={<StaffManagement/>}></Route>
        <Route path="management" element={<ProjectManagement />} />
        <Route path="claim-approval" element={<ClaimsPage />} />
        <Route path="management" element={<ProjectManagement />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
