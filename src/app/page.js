import HomeTutors from "@/components/HomeTutors";

const Home = async () => {
  let tutors = [];

  try {
    const res = await fetch("http://127.0.0.1:5000/tutors?limit=6", {
      cache: "no-store",
    });

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