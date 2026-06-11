import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { HiMenu, HiX, HiShoppingBag, HiUser, HiLogout, HiChevronDown } from 'react-icons/hi';
import Button from '../common/Button';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    const paths = { customer: '/customer/dashboard', merchant: '/merchant/dashboard', admin: '/admin/dashboard' };
    return paths[user.role] || '/';
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🌿</span>
            </div>
            <span className="font-heading font-bold text-xl text-primary group-hover:text-primary-light transition-colors">
              FoodSaver
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/marketplace" className="text-neutral-600 hover:text-primary font-medium transition-colors text-sm">
              Marketplace
            </Link>
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to={getDashboardPath()} className="text-neutral-600 hover:text-primary font-medium transition-colors text-sm">
                  Dashboard
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-neutral-700 hidden lg:block">{user?.name}</span>
                    <HiChevronDown className="w-4 h-4 text-neutral-400" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-card shadow-card-lg border border-neutral-200 py-2 animate-slide-down">
                      <div className="px-4 py-2 border-b border-neutral-100">
                        <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                        <p className="text-xs text-neutral-500">{user?.email}</p>
                        <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
                      </div>
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-primary"
                      >
                        <HiShoppingBag className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link
                        to={`/${user?.role}/profile`}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-primary"
                      >
                        <HiUser className="w-4 h-4" /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <HiLogout className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-neutral-100">
            {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="block py-2 text-neutral-700 hover:text-primary font-medium">
              Marketplace
            </Link>
            {isAuthenticated ? (
              <>
                <Link to={getDashboardPath()} onClick={() => setMobileOpen(false)} className="block py-2 text-neutral-700 hover:text-primary font-medium">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="block py-2 text-red-600 font-medium w-full text-left">
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" fullWidth size="sm">Log In</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="primary" fullWidth size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
