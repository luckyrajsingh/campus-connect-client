import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';      // 👈 add this
import PostItemPage from './pages/PostItemPage'; // 👈 add this

// Components
import Navbar from './components/Navbar';       // 👈 Navbar
import ProtectedRoute from './components/ProtectedRoute'; // 👈 gatekeeper

const App = () => {
  return (
    <Router>
      {/* Navbar will show on all pages */}
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected route */}
       <Route path="/post-item" element={<PostItemPage />} />

      </Routes>
    </Router>
  );
};

export default App;
