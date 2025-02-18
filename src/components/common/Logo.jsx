import React from "react";

import LogoImage from "/logo.svg";

export const Logo = () => {
  return (
    <div>
      <img src={LogoImage} className="h-10 w-10" />
    </div>
  );
};
