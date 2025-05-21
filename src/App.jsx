import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import ShippingMethods from './admin/ShippingMethods';

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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken'); // You should implement proper auth check
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/orders" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminOrders />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/orders/:orderId" element={
          <ProtectedRoute>
            <AdminLayout>
              <OrderDetails />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/products" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/add-product" element={
          <ProtectedRoute>
            <AdminLayout>
              <AddProduct />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/edit-product/:id" element={
          <ProtectedRoute>
            <AdminLayout>
              <EditProduct />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/customers" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminCustomers />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/blogs" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminBlogs />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/add-blog" element={
          <ProtectedRoute>
            <AdminLayout>
              <AddBlog />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/discounts" element={
          <ProtectedRoute>
            <AdminLayout>
              <Discounts />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/shipping-methods" element={
          <ProtectedRoute>
            <AdminLayout>
              <ShippingMethods />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/settings" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* Redirect root to admin login */}
        <Route path="/" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
