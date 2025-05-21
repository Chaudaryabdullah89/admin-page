import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
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

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/admin/login', credentials),
  logout: () => api.post('/auth/admin/logout'),
  getProfile: () => api.get('/admin/settings'),
};

// Products API
export const productsAPI = {
  getAll: () => api.get('/admin/products'),
  getOne: (id) => api.get(`/admin/products/${id}`),
  create: (data) => api.post('/admin/products', data),
  update: (id, data) => api.put(`/admin/products/${id}`, data),
  delete: (id) => api.delete(`/admin/products/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/admin/orders'),
  getOne: (id) => api.get(`/admin/orders/${id}`),
  update: (id, data) => api.put(`/admin/orders/${id}`, data),
  delete: (id) => api.delete(`/admin/orders/${id}`),
};

// Customers API
export const customersAPI = {
  getAll: () => api.get('/admin/customers'),
  getOne: (id) => api.get(`/admin/customers/${id}`),
  update: (id, data) => api.put(`/admin/customers/${id}`, data),
  delete: (id) => api.delete(`/admin/customers/${id}`),
};

// Settings API
export const settingsAPI = {
  get: () => api.get('/admin/settings'),
  update: (data) => api.put('/admin/settings', data),
  updateProfile: (data) => api.put('/admin/settings/profile', data),
  updateStore: (data) => api.put('/admin/settings/store', data),
  updateSecurity: (data) => api.put('/admin/settings/security', data),
};

// Blogs API
export const blogsAPI = {
  getAll: () => api.get('/admin/blogs'),
  getOne: (id) => api.get(`/admin/blogs/${id}`),
  create: (data) => api.post('/admin/blogs', data),
  update: (id, data) => api.put(`/admin/blogs/${id}`, data),
  delete: (id) => api.delete(`/admin/blogs/${id}`),
};

// Discounts API
export const discountsAPI = {
  getAll: () => api.get('/admin/discounts'),
  create: (data) => api.post('/admin/discounts', data),
  update: (id, data) => api.put(`/admin/discounts/${id}`, data),
  delete: (id) => api.delete(`/admin/discounts/${id}`),
};

// Shipping Methods API
export const shippingAPI = {
  getAll: () => api.get('/admin/shipping-methods'),
  create: (data) => api.post('/admin/shipping-methods', data),
  update: (id, data) => api.put(`/admin/shipping-methods/${id}`, data),
  delete: (id) => api.delete(`/admin/shipping-methods/${id}`),
};

export default api; 