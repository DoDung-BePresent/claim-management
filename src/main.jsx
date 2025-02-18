import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider, theme } from "antd";
import { AuthProvider } from "./contexts/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: {
          borderRadius: 5,
          colorPrimary: "hsl(240 5.9% 10%)",
          fontFamily: "Inter",
        },
        components: {
          Button: {
            primaryShadow: undefined, // Not apply shadow for primary button!
          },
          Form: {
            itemMarginBottom: 15,
          },
        },
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>,
);
