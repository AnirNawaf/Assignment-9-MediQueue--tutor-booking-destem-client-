"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const MyTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const router = useRouter();

  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);

  useEffect(() => {
    if (!user || !user.email) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    axiosSecure
      .get(`/my-tutors?email=${user.email}`)
      .then((res) => setTutors(res.data))
      .catch((error) => console.log(error));
  }, [axiosSecure, user, router]);

  const handleDeleteTutor = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this tutor?");
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(`/tutors/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Tutor deleted successfully");
        setTutors(tutors.filter((tutor) => tutor._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete tutor");
    }
  };

  const handleUpdateTutor = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedTutor = {
      tutorName: form.tutorName.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availableTime: form.availableTime.value,
      hourlyFee: form.hourlyFee.value,
      totalSlot: form.totalSlot.value,
      sessionStartDate: form.sessionStartDate.value,
      institution: form.institution.value,
      experience: form.experience.value,
      location: form.location.value,
      teachingMode: form.teachingMode.value,
      creatorName: selectedTutor.creatorName,
      creatorEmail: selectedTutor.creatorEmail,
    };

    try {
      const res = await axiosSecure.patch(`/tutors/${selectedTutor._id}`, updatedTutor);
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        toast.success("Tutor updated successfully");
        setTutors(
          tutors.map((tutor) =>
            tutor._id === selectedTutor._id ? { ...tutor, ...updatedTutor } : tutor
          )
        );
        setSelectedTutor(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update tutor");
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-5">
      <h2 className="text-3xl font-bold mb-6">My Tutors</h2>

      {tutors.length === 0 ? (
        <p>You have not added any tutor yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {tutors.map((tutor) => (
            <div key={tutor._id}   className="border rounded-lg shadow p-5 bg-white space-y-3"  >
              <img  src={tutor.photo} alt={tutor.tutorName}   className="w-full h-56 object-cover rounded" />

              <h3 className="text-2xl font-bold">{tutor.tutorName}</h3>
              <p><span className="font-semibold">Subject:</span> {tutor.subject}</p>

              <p><span className="font-semibold">Available Time:</span> {tutor.availableTime}</p>

              <p><span className="font-semibold">Hourly Fee:</span> {tutor.hourlyFee}</p>
              <p><span className="font-semibold">Total Slot:</span> {tutor.totalSlot}</p>
              <p><span className="font-semibold">Session Start Date:</span> {tutor.sessionStartDate}</p>

              <p><span className="font-semibold">Institution:</span> {tutor.institution}</p>
              <p><span className="font-semibold">Experience:</span> {tutor.experience}</p>
              <p><span className="font-semibold">Location:</span> {tutor.location}</p>
              <p><span className="font-semibold">Teaching Mode:</span> {tutor.teachingMode}</p>


              <p><span className="font-semibold">Creator Email:</span> {tutor.creatorEmail}</p>

              <div className="flex gap-3 pt-3">
                <button  onClick={() => setSelectedTutor(tutor)} className=" cursor-pointer transition hover:scale-120 font-bold bg-green-600 text-white px-4 py-2 rounded">
                  Update
                </button>

                <button onClick={() => handleDeleteTutor(tutor._id)} className=" cursor-pointer transition hover:scale-120 font-bold bg-red-600 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTutor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-5">Update Tutor</h3>
            <form onSubmit={handleUpdateTutor} className="space-y-4">
              <input name="tutorName" defaultValue={selectedTutor.tutorName} placeholder="Tutor Name" required className="border p-3 w-full rounded"/>

              <input name="photo" defaultValue={selectedTutor.photo} placeholder="Photo URL" required className="border p-3 w-full rounded"/>

              <select name="subject" defaultValue={selectedTutor.subject} required className="border p-3 w-full rounded" >

                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>

                <option value="Chemistry">Chemistry</option>
                <option value="English">English</option>
                <option value="Biology">Biology</option>
                <option value="ICT">ICT</option>
              </select>

              <input name="availableTime"  defaultValue={selectedTutor.availableTime} placeholder="Sun - Thu 5:00 PM - 8:00 PM" required  className="border p-3 w-full rounded"/>

              <input name="hourlyFee"   type="number" defaultValue={selectedTutor.hourlyFee} placeholder="Hourly Fee" required className="border p-3 w-full rounded"/>

              <input name="totalSlot" type="number" defaultValue={selectedTutor.totalSlot} placeholder="Total Slot" required  className="border p-3 w-full rounded" />

              <input  name="sessionStartDate"  type="date"   defaultValue={selectedTutor.sessionStartDate}    required  className="border p-3 w-full rounded" />

              <input name="institution"  defaultValue={selectedTutor.institution} placeholder="Institution" required  className="border p-3 w-full rounded" />

              <input name="experience"  defaultValue={selectedTutor.experience}  placeholder="Experience"  required  className="border p-3 w-full rounded"  />

              <input   name="location"  defaultValue={selectedTutor.location}     placeholder="Area / City"  required   className="border p-3 w-full rounded" />

              <select  name="teachingMode"  defaultValue={selectedTutor.teachingMode}   required  className="border p-3 w-full rounded"  >

                <option value="">Select Mode</option>
                <option value="Online">Online</option>

                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>

              <div className="flex gap-3">
                <button  type="submit"   className="bg-green-600 text-white px-5 py-3 rounded"  >
                  Update Tutor
                </button>

                <button  type="button"  onClick={() => setSelectedTutor(null)}  className=" cursor-pointer transition hover:scale-120 font-bold bg-gray-600 text-white px-5 py-3 rounded" >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTutors;