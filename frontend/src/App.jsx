import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './components/common';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardLayout from './components/layout/DashboardLayout';
import { ProtectedRoute, RoleRoute } from './components/layout/ProtectedRoute';

// Public Pages
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Marketplace from './pages/public/Marketplace';
import ProductDetail from './pages/public/ProductDetail';
import Checkout from './pages/public/Checkout';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import OrderHistory from './pages/customer/OrderHistory';
import ImpactDashboard from './pages/customer/ImpactDashboard';
import Profile from './pages/customer/Profile';

// Merchant Pages
import MerchantDashboard from './pages/merchant/Dashboard';
import ProductManagement from './pages/merchant/ProductManagement';
import OrderManagement from './pages/merchant/OrderManagement';
import PickupVerification from './pages/merchant/PickupVerification';
import MerchantProfile from './pages/merchant/MerchantProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import MerchantVerification from './pages/admin/MerchantVerification';
import MerchantManagementAdmin from './pages/admin/MerchantManagement';
import ComplaintManagement from './pages/admin/ComplaintManagement';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';

// Public layout wrapper
const PublicLayout = ({ children, showFooter = true }) => (
  <>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    {showFooter && <Footer />}
  </>
);

// Role-based redirect on login
const RoleRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  switch (user?.role) {
    case 'merchant': return <Navigate to="/merchant/dashboard" />;
    case 'admin': return <Navigate to="/admin/dashboard" />;
    default: return <Navigate to="/customer/dashboard" />;
  }
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/marketplace" element={<PublicLayout><Marketplace /></PublicLayout>} />
            <Route path="/marketplace/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
            <Route path="/checkout/:orderId" element={
              <RoleRoute roles={['customer']}>
                <PublicLayout showFooter={false}><Checkout /></PublicLayout>
              </RoleRoute>
            } />

            {/* Dashboard redirect */}
            <Route path="/dashboard" element={<RoleRedirect />} />

            {/* Customer Routes */}
            <Route path="/customer" element={
              <RoleRoute roles={['customer']}>
                <DashboardLayout />
              </RoleRoute>
            }>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="impact" element={<ImpactDashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Merchant Routes */}
            <Route path="/merchant" element={
              <RoleRoute roles={['merchant']}>
                <DashboardLayout />
              </RoleRoute>
            }>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<MerchantDashboard />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="pickup" element={<PickupVerification />} />
              <Route path="profile" element={<MerchantProfile />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <RoleRoute roles={['admin']}>
                <DashboardLayout />
              </RoleRoute>
            }>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="verification" element={<MerchantVerification />} />
              <Route path="merchants" element={<MerchantManagementAdmin />} />
              <Route path="complaints" element={<ComplaintManagement />} />
              <Route path="analytics" element={<AnalyticsDashboard />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
