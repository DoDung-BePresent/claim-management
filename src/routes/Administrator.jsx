import React from "react";
import { Route, Routes } from "react-router-dom";

import ProjectManagement from "@/pages/admin/ProjectManagement";
import StaffManagement from "@/pages/admin/StaffManagement";

const Administrator = () => {
  return (
    <Routes>
      <Route path="manage/project" element={<ProjectManagement />} />
      <Route path="manage/staff" element={<StaffManagement />} />
    </Routes>
  );
};

export default Administrator;
