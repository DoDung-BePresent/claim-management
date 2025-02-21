import React from "react";
import { Route, Routes } from "react-router-dom";

import ViewClaim from "@/pages/claimer/ViewClaim"

const Claimer = () => {
  return (
    <Routes>
      <Route path="claims" element={<ViewClaim />} />
    </Routes>
  );
};

export default Claimer;
