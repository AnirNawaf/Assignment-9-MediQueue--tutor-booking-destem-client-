"use client";

import Link from "next/link";
import { useState } from "react";

const HomeTutors = ({ tutors }) => {
  const [search, setSearch] = useState("");

  const filteredTutors = tutors.filter((tutor) =>
    tutor.tutorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      {/* Hero / Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your <span className="text-blue-400">Dream</span> Tutors
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore a world of knowledge with <strong>MediQueue</strong>. 
          Find your favorite tutors, book sessions, and learn online anytime,
          anywhere.
        </p>

        <div className="mt-6 mb-8 text-center">
          <input
            type="text"
            placeholder="Search tutor by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full max-w-md"
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">
        Available Tutors
      </h2>

      {/* Tutors Grid */}
      {filteredTutors.length === 0 ? (
        <p className="text-center text-gray-500">
          No tutors available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="border rounded-xl p-4 shadow bg-gray-100 text-center"
            >
              <img src={tutor.photo} alt={tutor.tutorName}  className="w-full h-52 object-cover rounded-lg" />

              <h3 className="text-xl font-bold mt-4">
                {tutor.tutorName}
              </h3>

              <p className="mt-1">Subject: {tutor.subject}</p>
              <p>Fee: {tutor.hourlyFee} Tk/hour</p>
              <p>Slot: {tutor.totalSlot}</p>
              <p>Mode: {tutor.teachingMode}</p>

              <Link  href={`/tutors/${tutor._id}`}  className="inline-block mt-4 cursor-pointer transition hover:scale-110 font-bold bg-gradient-to-r from-purple-800 to-purple-900 text-white px-4 py-2 rounded" >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )
      }

      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 text-center bg-gradient-to-r from-pink-500 via-red-500 via-orange-400 to-yellow-400 text-white rounded-xl p-8 shadow">
        <div className="flex flex-col items-center justify-center p-4 bg-purple-700 rounded-lg">
          <div className="text-3xl font-bold">3105+</div>
          <div className="font-bold text-2xl">Students</div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 bg-green-700 rounded-lg">
          <div className="text-3xl font-bold">40+</div>
          <div className="font-bold text-2xl">Tutors</div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 bg-pink-600 rounded-lg">
          <div className="text-3xl font-bold">4.7</div>
          <div className="font-bold text-2xl">Average Rating</div>
        </div>
      </div>


<div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50 rounded-xl p-8 shadow">
  
  <div className="flex-1">
    <h2 className="text-3xl font-bold mb-4 text-gray-800">
      "Learning never exhausts the mind, it only ignites it!"
    </h2>
    <p className="text-gray-600 text-lg">
      Stay motivated and achieve your dreams by connecting with the best tutors.
      Explore courses, book sessions, and take your knowledge to the next level.
    </p>
  </div>

  <div className="flex-1">
    <img src="/img/illustration.png" alt="Logo" className="" />
  </div>
</div>




    </section>
    
  );
};

export default HomeTutors;