import axios from './axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://apna-backend.vercel.app/api';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  getCurrentUser: () => api.get('/api/auth/me'),
  logout: () => api.post('/api/auth/logout')
};

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  updateStatus: (id, status) => api.patch(`/products/${id}/status`, { status })
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  delete: (id) => api.delete(`/orders/${id}`)
};

// Customers API
export const customersAPI = {
  getAll: () => api.get('/customers'),
  getById: (id) => api.get(`/customers/${id}`),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
  updateStatus: (id, status) => api.patch(`/customers/${id}/status`, { status })
};

// Blogs API
export const blogsAPI = {
  getAll: () => api.get('/blogs'),
  getById: (id) => api.get(`/blogs/${id}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
  updateStatus: (id, status) => api.patch(`/blogs/${id}/status`, { status })
};

// Discounts API
export const discountsAPI = {
  getAll: () => api.get('/discounts'),
  getById: (id) => api.get(`/discounts/${id}`),
  create: (data) => api.post('/discounts', data),
  update: (id, data) => api.put(`/discounts/${id}`, data),
  delete: (id) => api.delete(`/discounts/${id}`),
  updateStatus: (id, status) => api.patch(`/discounts/${id}/status`, { status })
};

// Settings API
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data)
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentOrders: () => api.get('/dashboard/recent-orders'),
  getLowStockProducts: () => api.get('/dashboard/low-stock-products')
};

// Shipping Methods API
export const shippingAPI = {
  getAll: () => api.get('/shipping-methods'),
  getById: (id) => api.get(`/shipping-methods/${id}`),
  create: (data) => api.post('/shipping-methods', data),
  update: (id, data) => api.put(`/shipping-methods/${id}`, data),
  delete: (id) => api.delete(`/shipping-methods/${id}`),
  updateStatus: (id, status) => api.patch(`/shipping-methods/${id}/status`, { status })
};

export default api; 