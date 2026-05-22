"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium">Please login to view profile</p>
        <Link
          href="/login"
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </div>
    );
  }

  const userName =
    user.name || user.displayName || (user.email ? user.email.split("@")[0] : "User");

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          {user.image ? (
            <img
              src={user.image}
              alt={userName}
              className="w-28 h-28 rounded-full object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center">
              <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4Z" />
              </svg>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-extrabold text-black mb-2">{userName}</h2>
        <p className="text-gray-700 mb-7">{user.email}</p>

        <Link href="/update-profile">
          <button className=" cursor-pointer transition hover:scale-120 font-bold bg-indigo-700 text-white font-semibold px-6 py-3 rounded shadow hover:bg-indigo-800 transition">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
}