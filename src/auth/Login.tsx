import React from "react";
import { useEffect } from "react";
import { API_BASE } from "../api/api-client";

const Login: React.FC = () => {
  useEffect(() => {
    window.location.href = `${API_BASE}/login`;
  });

  return <></>;
};

export default Login;
