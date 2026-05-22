
"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("https://i.ibb.co.com/4pDNDk1/avatar.png");

  useEffect(() => {
    if (user) {
      setName(user?.name || user?.displayName || "");
      setEmail(user?.email || "");
      setPhotoURL(user?.photoURL || user?.image || "https://i.ibb.co.com/4pDNDk1/avatar.png");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-5">
        <h1 className="text-lg font-medium">Please login to view profile</h1>

        <a  href="/login"  className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition" > Login  </a>

      </div>
    );
  }

  const userName = name || (email ? email.split("@")[0] : "User");

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("/api/users/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, photoURL }),
      });

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API route JSON return kortese na. Route path check koro.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      const updatedUser = { ...user, name, image: photoURL };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully");

      router.push(`/profile/`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <img src={photoURL}alt={userName}  className="w-28 h-28 rounded-full object-cover" />
        </div>

        <h2 className="text-3xl font-extrabold text-black mb-2">{userName}</h2>
        <p className="text-gray-700 mb-7">{email}</p>

        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Name"  className="border p-3 rounded w-full" value={name} onChange={(e) => setName(e.target.value)} />

          <input type="email"  placeholder="Email"  className="border p-3 rounded w-full" value={email}  readOnly  />

          <input  type="text"  placeholder="Photo URL"   className="border p-3 rounded w-full" value={photoURL}  onChange={(e) => setPhotoURL(e.target.value)} />

          <button   onClick={handleUpdateProfile}   className=" cursor-pointer transition hover:scale-110 font-bold  bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold px-6 py-3 rounded shadow hover:bg-indigo-800 transition mt-2"  >
            
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;