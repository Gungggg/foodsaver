import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login, isAuthenticated, user, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated && user && !authLoading) {
    const paths = { customer: '/customer/dashboard', merchant: '/merchant/dashboard', admin: '/admin/dashboard' };
    return <Navigate to={paths[user.role] || '/'} replace />;
  }

  const doLogin = async (email, password) => {
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    await doLogin(form.email, form.password);
  };

  const handleQuickLogin = async (email) => {
    setForm({ email, password: 'demo123' });
    await doLogin(email, 'demo123');
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-gutter relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-container rounded-full mix-blend-screen filter blur-3xl opacity-20 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full filter blur-3xl opacity-30 -translate-x-1/3 translate-y-1/4" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-lg">
          <Link to="/" className="inline-flex items-center gap-sm">
            <div className="w-10 h-10 bg-on-primary/10 backdrop-blur rounded-lg flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <span className="text-headline-md font-headline-md text-on-primary">FoodSaver</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl p-lg shadow-card-hover border border-outline-variant/20">
          <div className="text-center mb-md">
            <h1 className="text-headline-lg font-headline-lg text-on-background mb-xs">Welcome Back</h1>
            <p className="text-body-md font-body-md text-on-surface-variant">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-md p-sm bg-error-container rounded-lg text-body-sm font-body-sm text-on-error-container flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-md">
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-lg pl-xl pr-sm py-sm text-body-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-outline"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-lg pl-xl pr-sm py-sm text-body-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-outline"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-sm rounded-lg text-body-md font-body-md font-semibold shadow-btn hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-sm"
            >
              {loading && <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>}
              Sign In
            </button>
          </form>

          <div className="mt-md text-center">
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:text-surface-tint transition-colors">Sign Up</Link>
            </p>
          </div>

          {/* Quick Login */}
          <div className="mt-md pt-md border-t border-outline-variant/20">
            <p className="text-label-md font-label-md text-outline text-center mb-sm">Quick Login (Demo)</p>
            <div className="grid grid-cols-3 gap-sm">
              {[
                { label: 'Customer', email: 'sarah@example.com', icon: 'person' },
                { label: 'Merchant', email: 'budi@greenplate.id', icon: 'storefront' },
                { label: 'Admin', email: 'admin@foodsaver.id', icon: 'admin_panel_settings' },
              ].map((demo) => (
                <button
                  key={demo.email}
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickLogin(demo.email)}
                  className="flex flex-col items-center gap-xs px-sm py-sm rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors text-label-md font-label-md disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[20px]">{demo.icon}</span>
                  {demo.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
