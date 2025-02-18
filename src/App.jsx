import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/common/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { useAuth } from "./contexts/AuthProvider";
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
