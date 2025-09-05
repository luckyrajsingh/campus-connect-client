// src/api/api.js
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: '/api', // backend base (Vite proxy handles /api → localhost:5000)
});

// Interceptor: runs before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
