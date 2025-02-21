import React from "react";
import { Route, Routes } from "react-router-dom";

import ProjectManagement from "@/pages/admin/ProjectManagement";
import StaffManagement from "@/pages/admin/StaffManagement";

const Administrator = () => {
  return (
    <Routes>
      <Route path="projects" element={<ProjectManagement />} />
      <Route path="staffs" element={<StaffManagement />} />
    </Routes>
  );
};

export default Administrator;
