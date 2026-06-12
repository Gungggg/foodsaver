import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    const paths = { customer: '/customer/dashboard', merchant: '/merchant/dashboard', admin: '/admin/dashboard' };
    return paths[user.role] || '/';
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-secondary font-bold border-b-2 border-secondary pb-1 text-body-md font-body-md transition-colors'
      : 'text-on-surface-variant hover:text-primary text-body-md font-body-md hover:bg-surface-container-low transition-colors px-sm py-xs rounded';

  return (
    <nav className="bg-surface/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-gutter py-base max-w-container-max mx-auto w-full">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-md">
          <Link to="/" className="text-headline-sm font-headline-sm font-bold text-primary">
            FoodSaver
          </Link>
          <div className="hidden md:flex gap-sm ml-lg">
            <NavLink to="/marketplace" className={navLinkClass}>Marketplace</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to={getDashboardPath()} className={navLinkClass}>Dashboard</NavLink>
              </>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-sm">
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center gap-sm">
              <Link to="/login" className="text-on-surface-variant hover:text-primary text-body-md font-body-md px-sm py-xs rounded transition-colors">
                Log In
              </Link>
              <Link to="/register" className="bg-primary text-on-primary px-md py-sm rounded-lg text-body-md font-body-md font-semibold hover:opacity-90 transition-opacity">
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">shopping_bag</span>
              </button>
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm font-semibold text-sm ml-2 border border-outline-variant/30 hover:opacity-90 transition-opacity"
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-card-hover border border-outline-variant/20 py-2 animate-fade-in z-50">
                    <div className="px-md py-sm border-b border-outline-variant/20">
                      <p className="text-body-md font-body-md font-semibold text-on-background">{user?.name}</p>
                      <p className="text-label-md font-label-md text-outline">{user?.email}</p>
                      <span className="inline-block mt-1 text-label-md bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
                    </div>
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-sm px-md py-sm text-body-md text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
                    </Link>
                    <Link
                      to={`/${user?.role}/profile`}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-sm px-md py-sm text-body-md text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">person</span> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-sm px-md py-sm text-body-md text-error hover:bg-error-container/30 w-full text-left transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">logout</span> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/20 animate-slide-up">
          <div className="px-gutter py-md space-y-sm">
            <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="flex items-center gap-sm py-sm text-on-surface-variant hover:text-primary text-body-md font-body-md transition-colors">
              <span className="material-symbols-outlined text-[20px]">storefront</span> Marketplace
            </Link>
            {isAuthenticated ? (
              <>
                <Link to={getDashboardPath()} onClick={() => setMobileOpen(false)} className="flex items-center gap-sm py-sm text-on-surface-variant hover:text-primary text-body-md font-body-md transition-colors">
                  <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-sm py-sm text-error text-body-md font-body-md w-full text-left">
                  <span className="material-symbols-outlined text-[20px]">logout</span> Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-sm pt-sm">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center border border-outline-variant text-primary py-sm rounded-lg text-body-md font-semibold hover:bg-surface-container-low transition-colors">
                  Log In
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center bg-primary text-on-primary py-sm rounded-lg text-body-md font-semibold hover:opacity-90 transition-opacity">
                  Sign Up
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
