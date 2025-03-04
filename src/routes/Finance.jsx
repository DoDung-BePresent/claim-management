import React from "react";
import { Route, Routes } from "react-router-dom";
import FinancePage from "@/pages/finance/FinancePage";
import Profile from "@/pages/finance/Profile";

const Finance = () => {
  return (
    <Routes>
      <Route path="claims" element={<FinancePage />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};

export default Finance;
