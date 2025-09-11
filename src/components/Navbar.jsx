import React from "react";
import { Link } from "react-router-dom";

// This is the definitive version with the most direct logout logic.
const Navbar = () => {
  const token = localStorage.getItem("userToken");

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
          CampusConnect
        </Link>

        <div className="flex items-center space-x-4 text-sm font-semibold">
          {token ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
                My Dashboard
              </Link>
              <Link to="/post-item" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm">
                Post an Item
              </Link>
              <button
                // THE FIX: Logic is now directly inside the onClick.
                onClick={() => {
                  localStorage.removeItem("userToken");
                  window.location.href = "/";
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition shadow-sm">
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