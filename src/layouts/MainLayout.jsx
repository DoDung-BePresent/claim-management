import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";

const MainLayout = () => {
  return (
    <div className="container mx-auto h-screen">
      <Header className="bg-background sticky top-0" />
      <div className="px-10">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
