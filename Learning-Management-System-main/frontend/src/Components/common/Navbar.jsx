import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { authService } from "../../api/auth.service";

function Navbar(props) {
  const value = props.page;
  const navigate = useNavigate();
  const [isAuthenticated] = useState(authService.isUserAuthenticated());

  const handleLogOut = async () => {
    await authService.logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white w-full flex justify-between items-center px-10 py-3 shadow-md z-50">

      {/* LOGO TEXT */}
      <div
        className="text-2xl font-bold text-blue-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Course Management System
      </div>

      {/* MENU */}
      <ul className="flex items-center gap-6">

        {/* HOME */}
        <li>
          <Link
            to="/"
            className={`font-semibold ${
              value === "home"
                ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded"
                : "text-blue-900 hover:text-yellow-500"
            }`}
          >
            Home
          </Link>
        </li>

        {/* COURSES */}
        <li>
          <Link
            to="/courses"
            className={`font-semibold ${
              value === "courses"
                ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded"
                : "text-blue-900 hover:text-yellow-500"
            }`}
          >
            Courses
          </Link>
        </li>

        {/* PROFILE */}
        {isAuthenticated && (
          <li>
            <Link to="/profile" className="text-blue-900 font-semibold hover:text-yellow-500">
              Profile <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
        )}

        {/* LEARNINGS */}
        {isAuthenticated && (
          <li>
            <Link to="/learnings" className="text-blue-900 font-semibold hover:text-yellow-500">
              Learnings <FontAwesomeIcon icon={faChalkboardUser} />
            </Link>
          </li>
        )}

        {/* LOGIN / LOGOUT BUTTON */}
        <li>
          {isAuthenticated ? (
            <button
              onClick={handleLogOut}
              className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-900"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-900"
            >
              Login / SignUp
            </button>
          )}
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;