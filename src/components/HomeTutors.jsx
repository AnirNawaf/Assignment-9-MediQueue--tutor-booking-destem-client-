"use client";

import Link from "next/link";

const HomeTutors = ({ tutors }) => {
  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Available Tutors
      </h2>

      {tutors.length === 0 ? (
        <p className="text-center text-gray-500"> No tutors available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div key={tutor._id} className="border rounded-xl p-4 shadow bg-white">
              <img src={tutor.photo} alt={tutor.tutorName}  className="w-full h-52 object-cover rounded-lg" />

              <h3 className="text-xl font-bold mt-4"> {tutor.tutorName} </h3>

              <p className="mt-1">Subject: {tutor.subject}</p>
              <p>Fee: {tutor.hourlyFee} Tk/hour</p>
              <p>Slot: {tutor.totalSlot}</p>
              <p>Mode: {tutor.teachingMode}</p>

              <Link href={`/tutors/${tutor._id}`}>

                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"> Book Session </button>

              </Link>
            </div>
          ))}
        </div>
      )
    }

  
  
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center bg-gradient-to-r from-purple-800 to-purple-900 text-white rounded-xl p-8 shadow">
        <div className="flex flex-col items-center justify-center p-4 bg-purple-700 rounded-lg">

          <div className="text-2xl font-bold">3105+</div>

          <div>Students</div>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-green-700 rounded-lg">
          <div className="text-2xl font-bold">40+</div>

          <div>Tutors</div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 bg-pink-600 rounded-lg">
          <div className="text-2xl font-bold">4.7</div>

          <div>Average Rating</div>
        </div>
      </div>
    </section>
  );
};

export default HomeTutors;