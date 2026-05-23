import HomeTutors from "@/components/HomeTutors";

const Home = async () => {
  let tutors = [];

  try {
    const res = await fetch(
      "https://assignment-9-mediqueue-tutor-booking.onrender.com/tutors?limit=6",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tutors");
    }

    tutors = await res.json();
  } catch (error) {
    console.log("Tutor fetch error:", error.message);
    tutors = [];
  }

  return (
    <main>
      <HomeTutors tutors={tutors} />
    </main>
  );
};

export default Home;