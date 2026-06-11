import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  HiHome, HiShoppingBag, HiClipboardList, HiChartBar,
  HiUser, HiCube, HiQrcode, HiShieldCheck, HiUsers,
  HiExclamationCircle, HiTrendingUp, HiLogout, HiX,
  HiGlobe,
} from 'react-icons/hi';

const navItems = {
  customer: [
    { to: '/customer/dashboard', label: 'Dashboard', icon: HiHome },
    { to: '/customer/orders', label: 'My Orders', icon: HiShoppingBag },
    { to: '/customer/impact', label: 'My Impact', icon: HiChartBar },
    { to: '/customer/profile', label: 'Profile', icon: HiUser },
  ],
  merchant: [
    { to: '/merchant/dashboard', label: 'Dashboard', icon: HiHome },
    { to: '/merchant/products', label: 'Products', icon: HiCube },
    { to: '/merchant/orders', label: 'Orders', icon: HiClipboardList },
    { to: '/merchant/pickup', label: 'Verify Pickup', icon: HiQrcode },
    { to: '/merchant/profile', label: 'Store Profile', icon: HiUser },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: HiHome },
    { to: '/admin/verification', label: 'Verification', icon: HiShieldCheck },
    { to: '/admin/merchants', label: 'Merchants', icon: HiUsers },
    { to: '/admin/complaints', label: 'Complaints', icon: HiExclamationCircle },
    { to: '/admin/analytics', label: 'Analytics', icon: HiTrendingUp },
  ],
};

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = navItems[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-neutral-200
          z-50 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🌿</span>
              </div>
              <span className="font-heading font-bold text-lg text-primary">FoodSaver</span>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100">
              <HiX className="w-5 h-5" />
            </button>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">{user?.name}</p>
                <p className="text-xs text-neutral-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? 'sidebar-link-active' : 'sidebar-link'
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            ))}

            <div className="pt-4 mt-4 border-t border-neutral-200">
              <NavLink
                to="/marketplace"
                onClick={onClose}
                className="sidebar-link"
              >
                <HiGlobe className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Marketplace</span>
              </NavLink>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-neutral-200">
            <button
              onClick={handleLogout}
              className="sidebar-link text-red-600 hover:bg-red-50 hover:text-red-700 w-full"
            >
              <HiLogout className="w-5 h-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
