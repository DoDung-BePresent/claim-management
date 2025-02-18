import React from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/sign-in");
  };
  return (
    <div>
      {user.email}
      <Button onClick={handleLogout} danger>
        Logout
      </Button>
    </div>
  );
};

export default Home;
