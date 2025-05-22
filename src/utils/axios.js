import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',

  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Handle token expiration
    if (response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
      toast.error('Session expired. Please login again.');
    }

    // Handle other errors
    if (response?.data?.message) {
      toast.error(response.data.message);
    } else {
      toast.error('An error occurred. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default instance; 