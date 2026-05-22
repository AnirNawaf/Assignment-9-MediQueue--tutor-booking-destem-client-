"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  useEffect(() => {
    fetch(`http://localhost:5000/tutors?search=${search}`)
      .then((res) => res.json())
      .then((data) => setTutors(data))
      .catch((error) => console.log(error));
  }, [search]);

  const subjects = ["All", ...new Set(tutors.map((t) => t.subject))];

  const filteredTutors = tutors.filter(
    (t) => subjectFilter === "All" || t.subject === subjectFilter
  );


  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Available Tutors</h2>

      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {subjects.map((subject) => (
          <button key={subject} onClick={() => setSubjectFilter(subject)}  className={
            `
            px-4 py-2 cursor-pointer transition hover:scale-120 font-bold  rounded ${subjectFilter === subject
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
              }
              `
            }>
            {subject}
          </button>
        )
      )
    }

        <button onClick={() => setSubjectFilter("d")}  className={
          `
          px-4 py-2  cursor-pointer transition hover:scale-120 font-bold   rounded ${subjectFilter === "List" // ekhane "d" check kora hocche
              ? " text-white"
              : "bg-gray-200 text-gray-700"
            }

            `
          }>
          List
        </button>
      </div>

      <div className="mb-8 text-center">
        <input type="text" placeholder="Search tutor by name" onChange={(e) => setSearch(e.target.value)}  className="border px-4 py-2 rounded w-full max-w-md"/>
      </div>

      <div className="grid text-center grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTutors.map((tutor) => (
          <div key={tutor._id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <img src={tutor.photo} alt={tutor.tutorName} className="w-full h-52 object-cover rounded-lg" />

            <h3 className="text-xl font-bold mt-3">{tutor.tutorName}</h3>
            <p className="font-semibold mt-1">Subject: {tutor.subject}</p>
            <p>Fee: {tutor.hourlyFee} Tk/hour</p>
            <p>Slot: {tutor.totalSlot}</p>
            <p>Mode: {tutor.teachingMode}</p>

            <Link href={
              `
              /tutors/${tutor._id}
              `
            } className="inline-block mt-3 cursor-pointer transition hover:scale-120 font-bold  bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-4 py-2 rounded"
            >
              Book Session
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutors;
