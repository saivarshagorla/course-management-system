import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import { faGraduationCap, faAward, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import c1 from "../../assets/images/c1.jpg";
import c2 from "../../assets/images/html.png";
import c3 from "../../assets/images/sql.jpg";
import c4 from "../../assets/images/python.jpg";
import c5 from "../../assets/images/java.png";
import c6 from "../../assets/images/css.png";
import bannerImg from "../../assets/images/home-banner.png";

function Home() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- COURSES (NO PRICES NOW) ---------- */
  const courses = [
    { id: 1, title: "Course Management Basics", img: c1 },
    { id: 2, title: "Student Record Handling", img: c2 },
    { id: 3, title: "Database Management", img: c3 },
    { id: 4, title: "System Administration", img: c4 },
    { id: 5, title: "Backend Integration", img: c5 },
    { id: 6, title: "Frontend Dashboard UI", img: c6 },
  ];

  /* ---------- FEATURES UPDATED ---------- */
  const featureData = [
    {
      icon: faGraduationCap,
      title: "Student Management",
      desc: "Add, update and track student records easily.",
      color: "primary"
    },
    {
      icon: faStar,
      title: "Course Management",
      desc: "Create and organize courses efficiently.",
      color: "warning"
    },
    {
      icon: faAward,
      title: "Admin Dashboard",
      desc: "Control users, courses and analytics in one place.",
      color: "accent"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar page="home" />

      {/* Hero Section */}
      <section className="relative text-center px-6 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full h-full object-cover blur-md opacity-80 brightness-50"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug mb-6 text-gray-100">
            Welcome to <br />
            <span className="text-white">
              Course Management System
            </span>
          </h2>

          <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl">
            Manage courses, students and learning progress in one centralized platform.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate("/courses")}
              className="px-6 py-3 rounded-xl bg-warning/80 text-black font-semibold hover:bg-warning transition"
            >
              View Courses
            </button>

            <a
              href="#features"
              className="px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-gray-100 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>


      {/* Features */}
      <section id="features" className="px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">System Features</h1>
        <p className="text-gray-600 mb-10">Everything you need to manage courses efficiently</p>

        <div className="grid md:grid-cols-3 gap-8 md:px-24">
          {featureData.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition">
              <FontAwesomeIcon icon={feature.icon} className="text-4xl text-warning mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Courses */}
      <section id="course" className="px-6 py-16 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-4">
          Available Modules
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:px-24">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition">
              <img src={course.img} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h6 className="text-lg font-semibold">{course.title}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;