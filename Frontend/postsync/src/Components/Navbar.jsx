import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handlePostsClick = () => {
    if (userName) {
      navigate("/");
    } else {
      navigate("/login"); 
    }
  };

  return (
    <nav className="bg-green-500 shadow-md">
      <div className="container mx-auto flex items-center p-4">
        <Link
          to="/"
          className="text-white font-bold text-3xl px-4 py-2 rounded transition duration-300"
        >
          Post Sync
        </Link>
        <div className="flex-1 flex justify-end items-center space-x-4">
          <button
            onClick={handlePostsClick}
            className="text-white hover:bg-green-400 px-4 py-2 rounded transition duration-300"
          >
            Posts
          </button>
          <Link
            to="/about"
            className="text-white hover:bg-green-400 px-4 py-2 rounded transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:bg-green-400 px-4 py-2 rounded transition duration-300"
          >
            Contact
          </Link>
          {!userName ? (
            <Link
              to="/login"
              className="text-white hover:bg-green-400 px-4 py-2 rounded transition duration-300"
            >
              Login
            </Link>
          ) : (
            <div className="flex flex-col items-center">
              <p className=" text-violet-800 mb-1">Hello, {userName}</p>
              <button
                onClick={handleLogout}
                className="text-red-800 px-2 py-1 rounded hover:bg-red-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
