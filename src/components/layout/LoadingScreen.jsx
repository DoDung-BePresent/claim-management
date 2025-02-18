import { Spin } from "antd";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin size="large" />
    </div>
  );
};

export default LoadingScreen;
