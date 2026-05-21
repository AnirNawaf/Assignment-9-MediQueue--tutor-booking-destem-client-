"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const saveToken = (token) => {
    localStorage.setItem("access-token", token);
  };

  const registerUser = async ({ email, password, name }) => {
    const res = await fetch("http://localhost:5000/register-local", {
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
    const res = await fetch("http://localhost:5000/login-local", {
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
    const res = await fetch("http://localhost:5000/users/update-password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error("Unexpected response: " + text);
    }

    const data = await res.json();
    if (res.ok) return data;
    else throw new Error(data.message || "Password update failed");
  };

  const logout = () => {
    localStorage.removeItem("access-token");
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