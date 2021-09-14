import React from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

const SetToken: React.FC = () => {
  const search = useLocation().search;
  const receivedToken = new URLSearchParams(search).get("tosca_token");
  const [, setToken] = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (receivedToken !== null) {
      setToken(receivedToken);
      history.push("/");
    }
  });

  return <></>;
};

export default SetToken;
