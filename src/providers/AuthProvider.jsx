"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const saveToken = (token) => {
    if (typeof window !== "undefined") localStorage.setItem("access-token", token);
  };

  const registerUser = async ({ email, password, name }) => {
    const res = await fetch(`${BASE_URL}/register-local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    if (res.ok) {
      saveToken(data.token);
      setUser(data.user);
      return data;
    } else {
      throw new Error(data.message || "Registration failed");
    }
  };

  const loginUser = async ({ email, password }) => {
    const res = await fetch(`${BASE_URL}/login-local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      saveToken(data.token);
      setUser(data.user);
      return data;
    } else {
      throw new Error(data.message || "Login failed");
    }
  };

  const updatePassword = async (email, newPassword) => {
    const res = await fetch(`${BASE_URL}/users/update-password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await res.json();
    if (res.ok) return data;
    else throw new Error(data.message || "Password update failed");
  };

  const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("access-token");
    setUser(null);
    router.push("/login");
  };

  const authInfo = {
    user,
    registerUser,
    loginUser,
    updatePassword,
    logout,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;