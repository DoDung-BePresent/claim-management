import React from "react";
import { Route, Routes } from "react-router-dom";

import ProjectManagement from "@/pages/admin/ProjectManagement";
import StaffManagement from "@/pages/admin/StaffManagement";
import AdminClaimer from "../pages/admin/AdminClaimer";

const Administrator = () => {
  return (
    <Routes>
      <Route path="projects" element={<ProjectManagement />} />
      <Route path="staffs" element={<StaffManagement />} />
      <Route path="claimer" element={<AdminClaimer/>} />
    </Routes>
  );
};

export default Administrator;
