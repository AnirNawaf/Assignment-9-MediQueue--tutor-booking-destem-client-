"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const { loginUser, updatePassword } = useAuth();
  const router = useRouter();

  const [redirectPath, setRedirectPath] = useState("/");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useSearchParams safely inside useEffect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRedirectPath(params.get("redirect") || "/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      toast.success("Login successful");
      router.push(redirectPath);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleForgotPassword = () => setShowReset(true);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await updatePassword(email, newPassword);
      toast.success("Password updated successfully");
      setShowReset(false);
      setPassword(newPassword);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-10 bg-gray-50">
      <form className="w-full max-w-md bg-white p-6 rounded shadow space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-3 w-full rounded"
        />

        {!showReset && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-3 w-full rounded"
          />
        )}

        {!showReset && (
          <button
            type="button"
            onClick={handleForgotPassword}
            className="cursor-pointer text-blue-600 text-sm hover:underline w-full text-left"
          >
            Forgot Password?
          </button>
        )}

        {showReset && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border p-3 w-full rounded"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border p-3 w-full rounded"
            />
            <button
              type="button"
              onClick={handleResetPassword}
              className="bg-green-600 text-white w-full py-3 rounded"
            >
              Update Password
            </button>
          </>
        )}

        {!showReset && (
          <>
            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-3 rounded"
            >
              Login
            </button>

            <p className="text-cente cursor-pointer transition hover:scale-110 font-bold text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 cursor-pointer transition hover:scale-110 font-bold font-semibold "
              >
                Register
              </Link>
            </p>
            <button type="button" className="bg-red-600 cursor-pointer transition hover:scale-110 font-bold text-white w-full py-3 rounded flex items-center justify-center space-x-2" >
              <Link href="/login"  onClick={() => setMobileOpen(false)}   >
                    <span>Login with Google</span>
                  </Link>
              
            </button>
          </>
        )}
      </form>
    </div>
  );
}