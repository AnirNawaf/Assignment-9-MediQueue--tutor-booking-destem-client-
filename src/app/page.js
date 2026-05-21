import HomeTutors from "@/components/HomeTutors";

const Home = async () => {
  const res = await fetch("http://localhost:5000/tutors?limit=6", {
    cache: "no-store",
  });

  const tutors = await res.json();

  return (
    <main>
      <HomeTutors tutors={tutors} />
    </main>
  );
};

export default Home;