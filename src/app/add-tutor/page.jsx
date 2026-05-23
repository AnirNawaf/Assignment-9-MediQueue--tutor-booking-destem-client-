"use client";

import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

const AddTutor = () => {
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const { user } = useAuth();

  const handleAddTutor = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    const form = e.target;

    const tutor = {
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
      creatorName: user.name || user.displayName,
      creatorEmail: user.email,
    };

    try {
      const res = await axiosSecure.post("/tutors", tutor);
      if (res.data.insertedId) {
        toast.success("Tutor added successfully");
        form.reset();
        router.push("/my-tutors"); // ensure correct route
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-5">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Tutor</h2>
      <form onSubmit={handleAddTutor} className="space-y-4">
        <input name="tutorName" placeholder="Tutor Name" required className="border p-3 w-full rounded" />
        <input name="photo" placeholder="Photo URL" required className="border p-3 w-full rounded" />
        <select name="subject" required className="border p-3 w-full rounded">

          <option value="">Select Subject</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="English">English</option>
          <option value="Biology">Biology</option>
          <option value="ICT">ICT</option>
        </select>

        <input name="availableTime" placeholder="Sun - Thu 5:00 PM - 8:00 PM" required className="border p-3 w-full rounded" />
        <input name="hourlyFee" type="number" placeholder="Hourly Fee" required className="border p-3 w-full rounded" />
        <input name="totalSlot" type="number" placeholder="Total Slot" required className="border p-3 w-full rounded" />
        <input name="sessionStartDate" type="date" required className="border p-3 w-full rounded" />
        <input name="institution" placeholder="Institution" required className="border p-3 w-full rounded" />
        <input name="experience" placeholder="Experience" required className="border p-3 w-full rounded" />
        <input name="location" placeholder="Area / City" required className="border p-3 w-full rounded" />
        <select name="teachingMode" required className="border p-3 w-full rounded">

          <option value="">Select Mode</option>

          <option value="Online">Online</option>

          <option value="Offline">Offline</option>

       
       
          <option value="Both">Both</option>
        </select>

        <button type="submit" className="bg-blue-600 cursor-pointer transition hover:scale-110 font-bold text-white px-5 py-3 rounded w-full">Submit</button>

      </form>
    </div>
  );
};

export default AddTutor;