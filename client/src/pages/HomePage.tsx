import React, { useEffect } from "react";
import { Chatbox } from "../components/home";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../lib/stores";

const HomePage = () => {
  const { userState } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.userData) {
      navigate("/auth/login");
    }
  }, [userState.userData]);
  return (
    <div>
      <Chatbox />
    </div>
  );
};

export default HomePage;
