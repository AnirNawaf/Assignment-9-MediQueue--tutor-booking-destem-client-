
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";



const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const saveToken = (token) => {
    if (typeof window !== "undefined") localStorage.setItem("access-token", token);
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

  const loginWithGoogle = async () => {
    if (!auth) throw new Error("Firebase not initialized yet");
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    saveToken(firebaseUser.uid); 
    setUser({
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photo: firebaseUser.photoURL,
    });
    return firebaseUser;
  };

  const updatePassword = async (email, newPassword) => {
    const res = await fetch("http://localhost:5000/users/update-password", {
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
    loginWithGoogle,
    updatePassword,
    logout,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;