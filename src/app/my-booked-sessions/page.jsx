"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const MyBookedSessions = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);

  const user = {
    email: "student@gmail.com",
  };

  useEffect(() => {
    axiosSecure
      .get(`/my-bookings?email=${user.email}`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to load booked sessions");
      });
  }, [axiosSecure, user.email]);

  const handleCancel = async (id) => {
    try {
      const res = await axiosSecure.patch(`/bookings/${id}`);

      if (res.data.modifiedCount > 0) {
        toast.success("Booking cancelled");

        const updatedBookings = bookings.map((booking) =>
          booking._id === id
            ? { ...booking, status: "cancelled" }
            : booking
        );

        setBookings(updatedBookings);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Booking deleted");
        setBookings(bookings.filter((booking) => booking._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-5">
      <h2 className="text-3xl font-bold mb-6 text-center">  My Booked Sessions  </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">  You have not booked any session yet. </p>
        
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3">Tutor Name</th>
                <th className="border p-3">Student Name</th>
                <th className="border p-3">Student Number</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border p-3">{booking.tutorName}</td>
                  <td className="border p-3">{booking.studentName}</td>
                  <td className="border p-3">{booking.phone}</td> 

                  <td className="border p-3">{booking.studentEmail}</td>
                  <td className="border p-3">{booking.status}</td>
                  <td className="border p-3 flex gap-2">

                    <button  disabled={booking.status === "cancelled"} onClick={() => handleCancel(booking._id)}  className="bg-red-600 text-white px-3 py-1 rounded disabled:bg-gray-400" >
                      Cancel
                    </button>

                    <button  onClick={() => handleDelete(booking._id)}  className="bg-gray-700 text-white px-3 py-1 rounded" >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookedSessions;