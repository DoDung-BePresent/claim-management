import React from "react";
import { useAuth } from "@/contexts/AuthProvider";

const Home = () => {
  const { user } = useAuth();

  return <div className="">{user.email}</div>;
};

export default Home;
