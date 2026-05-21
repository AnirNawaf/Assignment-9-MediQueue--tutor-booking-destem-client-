import TutorDetails from "../pages/TutorDetails";
import MyTutors from "../pages/MyTutors";
import MyBookedSessions from "../pages/MyBookedSessions";

{
  path: "/tutors/:id",
  element: <TutorDetails />,
},
{
  path: "/my-tutors",
  element: <MyTutors />,
},
{
  path: "/my-booked-sessions",
  element: <MyBookedSessions />,
}