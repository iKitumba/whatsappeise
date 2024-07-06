"use client";
import { UserData } from "@/contexts/AuthContext";

export const getUserData = () => {
  const userData = localStorage.getItem("user_data");
  if (!userData) {
    return null;
  }

  return JSON.parse(userData) as UserData;
};
