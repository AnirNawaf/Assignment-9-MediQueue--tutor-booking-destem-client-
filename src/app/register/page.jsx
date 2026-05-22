"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { registerUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, name });
      toast.success("Registration successful");
      router.push("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-10 bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input type="text"placeholder="Name"  value={name}  onChange={(e) => setName(e.target.value)}required  className="border p-3 w-full rounded" />

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required   className="border p-3 w-full rounded"/>

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  required className="border p-3 w-full rounded"/>
        <button type="submit" className=" cursor-pointer transition hover:scale-120 font-bold bg-blue-600 text-white w-full py-3 rounded">
          Register
        </button>
      </form>
    </div>
  );
}