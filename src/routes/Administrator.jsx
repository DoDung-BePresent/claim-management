import React from "react";
import { Route, Routes } from "react-router-dom";

import ProjectManagement from "@/pages/admin/ProjectManagement";
import StaffManagement from "@/pages/admin/StaffManagement";
import AdminClaimer from "../pages/admin/AdminClaimer";
import Profile from "../pages/admin/Profile";

const Administrator = () => {
  return (
    <Routes>
      <Route path="projects" element={<ProjectManagement />} />
      <Route path="staffs" element={<StaffManagement />} />
      <Route path="claims" element={<AdminClaimer />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};

export default Administrator;
