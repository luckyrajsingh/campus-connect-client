import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("userToken");

  const handleLogout = () => {
    // 1. Remove the token from storage
    localStorage.removeItem("userToken");
    
    // 2. Redirect to the homepage to force a full page reload
    // This reliably resets the application's state.
    window.location.href = "/"; 
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Side - Brand Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
          CampusConnect
        </Link>

        {/* Right Side - Navigation Links */}
        <div className="flex items-center space-x-4 text-sm font-semibold">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                My Dashboard
              </Link>
              <Link
                to="/post-item"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm"
              >
                Post an Item
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition shadow-sm"
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