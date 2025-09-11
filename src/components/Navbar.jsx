import React, { useState } from "react";
import { Link } from "react-router-dom";

// This is the definitive version with a fully functional desktop AND mobile menu.
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Brand Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            CampusConnect
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-semibold">
            {token ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
                  My Dashboard
                </Link>
                <Link to="/post-item" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm">
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
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition shadow-sm">
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {token ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">My Dashboard</Link>
                <Link to="/post-item" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Post an Item</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;