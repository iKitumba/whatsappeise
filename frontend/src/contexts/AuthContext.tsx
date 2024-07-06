"use client";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import React from "react";
import api from "../services/api";

export interface User {
  _id: string;
  username: string;
  bio: string;
  avatar: string;
  contacts: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserData {
  user: User;
  token: string;
}

type AuthContextProps = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  handleLogin: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  handleLogOut: () => void;
};

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserData | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const userData = getUserData();

    setUser(userData);
  }, []);

  const handleLogin = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const userData = {
      username,
      password,
    };
    try {
      const response = await api.post("users/authenticate", userData);
      const { data } = response;

      localStorage.setItem("user_data", JSON.stringify(data));
      setUser(data);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
