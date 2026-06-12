import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const { register, isAuthenticated, user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    business_name: '', address: '', city: '', category: 'restaurant',
  });

  if (isAuthenticated && user && !authLoading) {
    const paths = { customer: '/customer/dashboard', merchant: '/merchant/dashboard', admin: '/admin/dashboard' };
    return <Navigate to={paths[user.role] || '/'} replace />;
  }

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    setError('');
    setLoading(true);
    try {
      await register({ ...form, role: tab });
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-surface border border-outline-variant rounded-lg pl-xl pr-sm py-sm text-body-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-outline";

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-gutter relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}} />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full filter blur-3xl opacity-30 -translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-container rounded-full mix-blend-screen filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/4" />

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-lg">
          <Link to="/" className="inline-flex items-center gap-sm">
            <div className="w-10 h-10 bg-on-primary/10 backdrop-blur rounded-lg flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <span className="text-headline-md font-headline-md text-on-primary">FoodSaver</span>
          </Link>
        </div>

        <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl p-lg shadow-card-hover border border-outline-variant/20">
          <div className="text-center mb-md">
            <h1 className="text-headline-lg font-headline-lg text-on-background mb-xs">Create Account</h1>
            <p className="text-body-md font-body-md text-on-surface-variant">Join the food rescue movement</p>
          </div>

          {error && (
            <div className="mb-md p-sm bg-error-container rounded-lg text-body-sm font-body-sm text-on-error-container flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>{error}
            </div>
          )}

          {/* Tabs */}
          <div className="flex bg-surface-container rounded-xl p-1 mb-md">
            {['customer', 'merchant'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-sm text-body-md font-body-md font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-xs ${
                  tab === t ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{t === 'customer' ? 'person' : 'storefront'}</span>
                {t === 'customer' ? 'Customer' : 'Merchant'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-md">
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
                <input type="text" placeholder="John Doe" value={form.name} onChange={(e) => update('name', e.target.value)} className={inputCls} required />
              </div>
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} required />
              </div>
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Phone</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">phone</span>
                <input type="tel" placeholder="+62 812 3456 7890" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls} required />
              </div>
            </div>

            {tab === 'merchant' && (
              <>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Business Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">store</span>
                    <input type="text" placeholder="Your Store Name" value={form.business_name} onChange={(e) => update('business_name', e.target.value)} className={inputCls} required />
                  </div>
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">location_on</span>
                    <input type="text" placeholder="Street address" value={form.address} onChange={(e) => update('address', e.target.value)} className={inputCls} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-sm">
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">City</label>
                    <input type="text" placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} className="w-full bg-surface border border-outline-variant rounded-lg px-sm py-sm text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-outline" required />
                  </div>
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Category</label>
                    <select value={form.category} onChange={(e) => update('category', e.target.value)} className="w-full bg-surface border border-outline-variant rounded-lg px-sm py-sm text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors">
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

            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                <input type="password" placeholder="••••••••" value={form.password} onChange={(e) => update('password', e.target.value)} className={inputCls} required />
              </div>
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                <input type="password" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} className={inputCls} required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary text-on-primary py-sm rounded-lg text-body-md font-body-md font-semibold shadow-btn hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-sm">
              {loading && <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>}
              Create Account
            </button>
          </form>

          <div className="mt-md text-center">
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:text-surface-tint transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
