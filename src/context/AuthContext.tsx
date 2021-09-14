import { createContext, useContext, useState } from "react";
import { ApiUser } from "../api/api-client";
import React from "react";

// eslint-disable-next-line no-unused-vars
export const AuthContext = createContext<
  [token: Token, setToken: SetTokenFunction]
>([null, () => {}]);

export const useAuth = () => useContext(AuthContext);

type Token = string | null;
// eslint-disable-next-line no-unused-vars
type SetTokenFunction = (token: Token) => void;

type AuthContextProps = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const [token, setToken] = useState<Token>(
    localStorage.getItem("tosca_token")
  );

  // eslint-disable-next-line no-unused-vars
  const storeToken: (token: Token) => void = (token: Token) => {
    if (token !== null) {
      localStorage.setItem("tosca_token", token);
      setToken(token);
    } else {
      localStorage.removeItem("tosca_token");
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={[token, storeToken]}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line no-unused-vars
export const UserContext = createContext<
  [user: User, setUser: SetUserFunction]
>([null, () => {}]);

export const useUser = () => useContext(UserContext);

type User = ApiUser | null;
// eslint-disable-next-line no-unused-vars
type SetUserFunction = (user: User) => void;

type UserContextProps = {
  children: React.ReactNode;
};

export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
