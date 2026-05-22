"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const TutorDetails = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [tutor, setTutor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
 
  const user = { name: "Student Name", email: "student@gmail.com" };

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/tutors/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Tutor not found");
        return res.json();
      })
      .then((data) => setTutor(data))
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load tutor details");
      });
  }, [id]);
  

  const handleBookClick = () => setShowBookingForm(!showBookingForm);

  const handleAddToList = () => toast.success("Added to list!");

  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;

    const bookingData = {
      tutorId: tutor._id,
      tutorName: tutor.tutorName,
      studentName: form.studentName.value,
      phone: form.phone.value,
      studentEmail: user.email,
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking successful!");
        form.reset();
        setShowBookingForm(false);

        setTutor((prev) => ({
          ...prev,
          totalSlot: Number(prev.totalSlot) - 1,
        }));

        router.push("/my-booked-sessions");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    }
  };

  if (!tutor) return <p className="text-center my-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto my-10 p-5 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-6">

      <div className="md:w-1/3 flex-shrink-0">
        <img src={tutor.photo} alt={tutor.tutorName} className="w-full h-full object-cover rounded-xl"/>

      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">{tutor.tutorName}</h2>
          <p className="text-gray-600 mb-4">by {tutor.institution}</p>

          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Subject:</span> {tutor.subject}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Available Time:</span> {tutor.availableTime}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Hourly Fee:</span> {tutor.hourlyFee} Tk
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Total Slot:</span> {tutor.totalSlot}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Session Start:</span> {tutor.sessionStartDate}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Experience:</span> {tutor.experience}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Location:</span> {tutor.location}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Teaching Mode:</span> {tutor.teachingMode}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button onClick={handleBookClick}  className="flex-1 cursor-pointer transition hover:scale-110 font-bold  bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
            Book Session
          </button>
          <button onClick={handleAddToList}className="flex-1  cursor-pointer transition hover:scale-110 font-bold bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
            Add to List
          </button>
        </div>

        {showBookingForm && (
          <div className="border rounded-xl p-5 mt-6">
            <h3 className="text-2xl font-bold mb-4">Book Session</h3>
            {Number(tutor.totalSlot) <= 0 ? (
              <p className="text-red-600 font-semibold">
                This session is fully booked. You can’t join at the moment.
              </p>
            ) : (
              <form onSubmit={handleBooking} className="space-y-3">
                <input name="studentName" defaultValue={user.name} placeholder="Student Name" required className="border p-2 w-full rounded" />

                <input name="phone" placeholder="Phone Number" required  className="border p-2 w-full rounded"/>

                <input  value={tutor._id} readOnly className="border p-2 w-full rounded bg-gray-100" />

                <input  value={tutor.tutorName} readOnly  className="border p-2 w-full rounded bg-gray-100" />

                <input value={user.email} readOnly  className="border p-2 w-full rounded bg-gray-100"/>

                <button type="submit" className=" cursor-pointer transition hover:scale-120 font-bold bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
                  Confirm Booking
                </button>
              </form>
            )
            }
          </div>
        )
        }
      </div>
    </div>
  );
};

export default TutorDetails;