import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const iconMap = {
  dashboard: 'dashboard',
  orders: 'shopping_bag',
  impact: 'eco',
  profile: 'person',
  products: 'inventory_2',
  pickup: 'qr_code_scanner',
  verification: 'verified_user',
  merchants: 'storefront',
  complaints: 'feedback',
  analytics: 'monitoring',
  marketplace: 'store',
};

const navItems = {
  customer: [
    { to: '/customer/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { to: '/customer/orders', label: 'My Orders', icon: 'shopping_bag' },
    { to: '/customer/impact', label: 'My Impact', icon: 'eco' },
    { to: '/customer/profile', label: 'Profile', icon: 'person' },
  ],
  merchant: [
    { to: '/merchant/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { to: '/merchant/products', label: 'Products', icon: 'inventory_2' },
    { to: '/merchant/orders', label: 'Orders', icon: 'receipt_long' },
    { to: '/merchant/pickup', label: 'Verify Pickup', icon: 'qr_code_scanner' },
    { to: '/merchant/profile', label: 'Store Profile', icon: 'storefront' },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { to: '/admin/verification', label: 'Verification', icon: 'verified_user' },
    { to: '/admin/merchants', label: 'Merchants', icon: 'storefront' },
    { to: '/admin/complaints', label: 'Complaints', icon: 'feedback' },
    { to: '/admin/analytics', label: 'Analytics', icon: 'monitoring' },
  ],
};

const portalNames = {
  customer: 'Customer Portal',
  merchant: 'Merchant Portal',
  admin: 'Admin Portal',
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
        <div className="fixed inset-0 bg-on-background/40 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-[280px] bg-surface-container-low
          z-50 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 flex flex-col p-md border-r border-outline-variant/20
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Area */}
        <div className="mb-lg flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm font-semibold text-sm">
              FS
            </div>
            <div>
              <h1 className="text-headline-sm font-headline-sm text-on-surface">{portalNames[user?.role] || 'FoodSaver'}</h1>
              <p className="text-label-md font-label-md text-on-surface-variant">FoodSaver HQ</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 space-y-xs overflow-y-auto">
          {items.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                isActive
                  ? 'bg-secondary-container text-on-secondary-container rounded-lg font-semibold cursor-pointer flex items-center gap-sm px-md py-base mb-xs transition-all duration-200'
                  : 'text-on-surface-variant hover:bg-surface-container-high rounded-lg cursor-pointer flex items-center gap-sm px-md py-base mb-xs hover:translate-x-1 transition-all duration-200'
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-auto space-y-xs pt-md border-t border-outline-variant/20">
          <NavLink
            to="/marketplace"
            onClick={onClose}
            className="text-on-surface-variant hover:bg-surface-container-high rounded-lg cursor-pointer flex items-center gap-sm px-md py-base mb-xs hover:translate-x-1 transition-all duration-200"
          >
            <span className="material-symbols-outlined">store</span>
            Marketplace
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-error hover:bg-error-container/30 rounded-lg cursor-pointer flex items-center gap-sm px-md py-base w-full transition-all duration-200"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
