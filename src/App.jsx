import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Context/AuthContext';
import './App.css';

// Admin Components
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminOrders from './admin/AdminOrders';
import AdminProducts from './admin/AdminProducts';
import AdminCustomers from './admin/AdminCustomers';
import AdminSettings from './admin/AdminSettings';
import AdminBlogs from './admin/AdminBlogs';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import AddBlog from './admin/AddBlog';
import OrderDetails from './admin/OrderDetails';
import Discounts from './admin/Discounts';
// import ShippingMethods from './admin/ShippingMethods';

// Layout Component
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <nav className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <ul className="admin-menu">
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/admin/orders">Orders</a></li>
          <li><a href="/admin/products">Products</a></li>
          <li><a href="/admin/customers">Customers</a></li>
          <li><a href="/admin/blogs">Blogs</a></li>
          <li><a href="/admin/discounts">Discounts</a></li>
          <li><a href="/admin/shipping-methods">Shipping</a></li>
          <li><a href="/admin/settings">Settings</a></li>
        </ul>
      </nav>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/products"
              element={
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/products/add"
              element={
                <AdminLayout>
                  <AddProduct />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/orders"
              element={
                <AdminLayout>
                  <AdminOrders />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/orders/:id"
              element={
                <AdminLayout>
                  <OrderDetails />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/customers"
              element={
                <AdminLayout>
                  <AdminCustomers />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/blogs"
              element={
                <AdminLayout>
                  <AdminBlogs />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/blogs/add"
              element={
                <AdminLayout>
                  <AddBlog />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/discounts"
              element={
                <AdminLayout>
                  <Discounts />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/settings"
              element={
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              }
            />
            
            <Route path="/" element={<Navigate to="/admin" />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
