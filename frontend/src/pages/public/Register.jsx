import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input } from '../../components/common';
import { HiUser, HiMail, HiPhone, HiLockClosed, HiOfficeBuilding, HiLocationMarker } from 'react-icons/hi';

const Register = () => {
  const { register, isAuthenticated, user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    business_name: '', address: '', city: '', category: 'restaurant',
  });

  // If already authenticated, redirect immediately via render
  if (isAuthenticated && user && !authLoading) {
    const paths = { customer: '/customer/dashboard', merchant: '/merchant/dashboard', admin: '/admin/dashboard' };
    return <Navigate to={paths[user.role] || '/'} replace />;
  }

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register({ ...form, role: tab });
      // After register succeeds, state updates will trigger re-render,
      // and the Navigate component above will redirect
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center justify-center p-4 relative overflow-hidden">
      <div className="floating-shape w-72 h-72 -top-20 -left-20 animate-float" />
      <div className="floating-shape w-64 h-64 -bottom-20 -right-10 animate-float-slow" />

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>
            <span className="font-heading font-bold text-2xl text-white">FoodSaver</span>
          </Link>
        </div>

        <div className="glass rounded-2xl p-8 shadow-card-lg">
          <div className="text-center mb-6">
            <h1 className="font-heading font-bold text-2xl text-neutral-900 mb-1">Create Account</h1>
            <p className="text-neutral-500 text-sm">Join the food rescue movement</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Tabs */}
          <div className="flex bg-neutral-100 rounded-xl p-1 mb-6">
            {['customer', 'merchant'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
                  tab === t ? 'bg-white shadow text-primary' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {t === 'customer' ? '👤 Customer' : '🏪 Merchant'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" icon={HiUser} placeholder="John Doe" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            <Input label="Email" type="email" icon={HiMail} placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
            <Input label="Phone" icon={HiPhone} placeholder="+62 812 3456 7890" value={form.phone} onChange={(e) => update('phone', e.target.value)} required />

            {tab === 'merchant' && (
              <>
                <Input label="Business Name" icon={HiOfficeBuilding} placeholder="Your Store Name" value={form.business_name} onChange={(e) => update('business_name', e.target.value)} required />
                <Input label="Address" icon={HiLocationMarker} placeholder="Street address" value={form.address} onChange={(e) => update('address', e.target.value)} required />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} required />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => update('category', e.target.value)}
                      className="input-field"
                    >
                      <option value="restaurant">Restaurant</option>
                      <option value="bakery">Bakery</option>
                      <option value="grocery">Grocery</option>
                      <option value="cafe">Cafe</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <Input label="Password" type="password" icon={HiLockClosed} placeholder="••••••••" value={form.password} onChange={(e) => update('password', e.target.value)} required />
            <Input label="Confirm Password" type="password" icon={HiLockClosed} placeholder="••••••••" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} required />

            <Button type="submit" fullWidth size="lg" loading={loading}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:text-primary-light transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
