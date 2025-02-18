import React, { useContext } from "react";
import { createContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user-claimer", null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }

  return context;
};
