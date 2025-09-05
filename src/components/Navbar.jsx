// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("userToken"); // check if logged in

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/"; // redirect to home
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Brand */}
        <Link to="/" className="text-xl font-bold hover:text-gray-200">
          Campus Connect
        </Link>

        {/* Right Side - Links */}
        <div className="space-x-4">
          {token ? (
            <>
              <Link
                to="/post-item"
                className="hover:bg-blue-700 px-3 py-2 rounded transition"
              >
                Post an Item
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:bg-blue-700 px-3 py-2 rounded transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
