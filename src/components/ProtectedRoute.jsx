// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken'); // 👈 Check if token exists

  if (!token) {
    // If no token, redirect user to login page
    return <Navigate to="/login" />;
  }

  // If token exists, show the protected page
  return children;
};

export default ProtectedRoute;
