import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input } from '../../components/common';
import { HiMail, HiLockClosed } from 'react-icons/hi';

const Login = () => {
  const { login, isAuthenticated, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, redirect immediately via render
  if (isAuthenticated && user && !authLoading) {
    const paths = { customer: '/customer/dashboard', merchant: '/merchant/dashboard', admin: '/admin/dashboard' };
    return <Navigate to={paths[user.role] || '/'} replace />;
  }

  const doLogin = async (email, password) => {
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // If we get here, login succeeded. Component will re-render
      // with isAuthenticated=true and Navigate will redirect.
    } catch (err) {
      console.error('Login error:', err);
      setError(err?.message || err?.toString() || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    await doLogin(form.email, form.password);
  };

  const handleQuickLogin = async (email) => {
    setForm({ email, password: 'demo123' });
    await doLogin(email, 'demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center justify-center p-4 relative overflow-hidden">
      <div className="floating-shape w-72 h-72 -top-20 -right-20 animate-float" />
      <div className="floating-shape w-96 h-96 -bottom-32 -left-20 animate-float-slow" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>
            <span className="font-heading font-bold text-2xl text-white">FoodSaver</span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 shadow-card-lg">
          <div className="text-center mb-6">
            <h1 className="font-heading font-bold text-2xl text-neutral-900 mb-1">Welcome Back</h1>
            <p className="text-neutral-500 text-sm">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              icon={HiMail}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Password"
              type="password"
              icon={HiLockClosed}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <Button type="submit" fullWidth size="lg" loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:text-primary-light transition-colors">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Demo accounts - click to login directly */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-xs text-neutral-400 text-center mb-3">Quick Login (Demo)</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '👤 Customer', email: 'sarah@example.com' },
                { label: '🏪 Merchant', email: 'budi@greenplate.id' },
                { label: '⚙️ Admin', email: 'admin@foodsaver.id' },
              ].map((demo) => (
                <button
                  key={demo.email}
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickLogin(demo.email)}
                  className="text-xs px-3 py-2.5 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-primary/10 hover:text-primary transition-colors font-medium disabled:opacity-50"
                >
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
