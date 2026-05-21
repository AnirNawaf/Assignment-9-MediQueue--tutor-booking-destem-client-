import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediQueue",
  description: "Tutor Booking System",
};

export default function RootLayout({ children }) {
  const user = {
    displayName: "Student Name",
    email: "student@gmail.com",
    photoURL: "https://i.ibb.co/4pDNDk1/avatar.png",
  };

  return (
    <html lang="en" className={
    `
    ${geistSans.variable} ${geistMono.variable} h-full antialiased

    `
    }>
      <body className="min-h-full flex flex-col">
        <Navbar user={user} />

        <main className="flex-1">{children}</main>
        <Footer />

        <Toaster position="top-center" />
      </body>
    </html>
  );
}