import React from "react";
import { Route, Routes } from "react-router-dom";

import ViewClaim from "@/pages/claimer/ViewClaim"
import Profile from "@/pages/claimer/Profile"

const Claimer = () => {
  return (
    <Routes>
      <Route path="claims" element={<ViewClaim />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};

export default Claimer;
