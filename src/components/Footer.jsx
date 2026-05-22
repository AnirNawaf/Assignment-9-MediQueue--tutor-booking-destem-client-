"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">MediQueue</h2>
          <p className="text-gray-300 text-sm"> A simple and reliable tutor booking platform for students and tutors. </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Learning Services</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>

            <li><a href="/sessions" className="hover:text-white">Study Sessions</a></li>

            <li><a href="/tutors" className="hover:text-white">Tutors</a></li><li><a href="/my-bookings" className="hover:text-white">My Bookings</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <div className="space-y-2 text-gray-300 text-sm">
            <p>Email: anirbishal08@gmail.com</p>
            <p>Phone: +880 1307304226</p>
            <p>Address: Rangpur, Dhaka, Bangladesh</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-300 text-sm">
            <a href="https://www.facebook.com/share/1EBEiWt6b4/" target="_blank" className="hover:text-white">
              <FontAwesomeIcon icon={faFacebook} />
            </a>

            <a href="https://www.linkedin.com/in/md-anir-nawaf-bishal-34aa7a239/" target="_blank" className="hover:text-white">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/AnirNawaf" target="_blank" className="hover:text-white">
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </a>

            <a href="#" target="_blank" className="hover:text-white">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>


        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">

        <p>&copy; {new Date().getFullYear()} Md. Anir Nawaf Bishal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;