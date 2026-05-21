"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth(); // <-- fixed function name
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logout successful");
        router.push("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navLink = (href, text) => (
    <Link  href={href}  onClick={() => setMobileOpen(false)} className={
      `
      transition hover:text-blue-600 ${pathname === href ? "text-blue-600 font-semibold" : "text-gray-700"
        }
        `
      } >
      {text}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-5">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              M
            </div>
            <span className="text-2xl font-bold text-blue-600"> MediQueue </span>
          </Link>

          <div className="hidden md:flex items-center gap-7 font-medium">
            {navLink("/", "Home")}
            {navLink("/tutors", "Tutors")}

            {user && (
              <>
                {navLink("/add-tutor", "Add Tutor")}
                {navLink("/my-tutors", "My Tutors")}
                {navLink("/my-booked-sessions", "My Booked Sessions")}
              </>
            )}
          </div>

          <div className="hidden md:block">
            {user ? (
              <div className="relative">
                <button onClick={() => setOpen(!open)} className="flex items-center gap-2" >
                  <img src={ user.photoURL || "https://i.ibb.co.com/4pDNDk1/avatar.png" } alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"/>
                  <span className="font-medium text-gray-700">
                    {user.displayName || "User"}
                  </span>
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-lg p-3">
                    <div className="px-3 py-2 border-b">
                      <p className="font-semibold"> {user.displayName || "User"} </p>

                      <p className="text-sm text-gray-500 break-all"> {user.email} </p>
                    </div>

                    <Link href="/profile" onClick={() => setOpen(false)} className="block px-3 py-2 mt-2 rounded hover:bg-blue-50" >
                      Profile
                    </Link>

                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50" >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login"  className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50" >
                  Login
                </Link>

                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" >
                  Register
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden border px-3 py-2 rounded-lg" >
            ☰
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t space-y-4 font-medium">
            <div className="flex flex-col gap-4">
              {navLink("/", "Home")}
              {navLink("/tutors", "Tutors")}

              {user && (
                <>
                  {navLink("/add-tutor", "Add Tutor")}
                  {navLink("/my-tutors", "My Tutors")}
                  {navLink("/my-booked-sessions", "My Booked Sessions")}
                </>
              )}
            </div>

            <div className="pt-4 border-t">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={  user.photoURL || "https://i.ibb.co.com/4pDNDk1/avatar.png" }  alt="User" className="w-10 h-10 rounded-full object-cover"/>
                    <div>
                      <p className="font-semibold">{user.displayName || (user.email ? user.email.split("@")[0] : "User")}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <Link href="/profile" onClick={() => setMobileOpen(false)}  className="block border px-4 py-2 rounded-lg text-center">
                    Profile
                  </Link>

                  <button onClick={handleLogout}  className="w-full bg-red-500 text-white px-4 py-2 rounded-lg" >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-center">
                    Login
                  </Link>

                  <Link href="/register" onClick={() => setMobileOpen(false)}  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center" >
                    Register
                  </Link>
                </div>
              )
              }
            </div>
          </div>
        )
      }
      </div>
    </nav>
  );
};

export default Navbar;


