import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { StatCard, Badge } from '../../components/common';
import { mockAdminStats, mockMonthlyTrend, mockImpact, formatCurrency } from '../../utils/mockData';
import { HiUsers, HiShoppingBag, HiCurrencyDollar, HiOfficeBuilding, HiExclamationCircle, HiArrowRight, HiTrendingUp, HiClipboardCheck, HiSparkles } from 'react-icons/hi';

const AdminDashboard = () => {
  const stats = mockAdminStats;
  const impact = mockImpact.platform;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const data = mockMonthlyTrend.orders;
    const labels = mockMonthlyTrend.labels;
    const max = Math.max(...data) * 1.2;
    const chartW = rect.width - 60;
    const chartH = rect.height - 40;
    const step = chartW / (data.length - 1);

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Grid lines
    for (let i = 0; i <= 4; i++) {
      const y = 10 + (chartH / 4) * i;
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(rect.width - 10, y);
      ctx.stroke();
    }

    // Area fill
    const grad = ctx.createLinearGradient(0, 10, 0, chartH + 10);
    grad.addColorStop(0, 'rgba(116,195,101,0.3)');
    grad.addColorStop(1, 'rgba(116,195,101,0)');
    ctx.beginPath();
    ctx.moveTo(30, chartH + 10);
    data.forEach((val, i) => {
      const x = 30 + i * step;
      const y = chartH + 10 - (val / max) * chartH;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(30 + (data.length - 1) * step, chartH + 10);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = '#1B4332';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    data.forEach((val, i) => {
      const x = 30 + i * step;
      const y = chartH + 10 - (val / max) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Points + Labels
    data.forEach((val, i) => {
      const x = 30 + i * step;
      const y = chartH + 10 - (val / max) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#1B4332';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      ctx.fillStyle = '#64748B';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x, rect.height - 5);
    });
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Admin Dashboard</h1>
        <p className="text-neutral-500 text-sm mt-1">Platform overview and management</p>
      </div>

      {/* Alert Cards */}
      {(stats.pending_verifications > 0 || stats.open_complaints > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.pending_verifications > 0 && (
            <Link to="/admin/verification" className="card bg-amber-50 border-amber-200 hover:shadow-card-hover transition-all group flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <HiClipboardCheck className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-amber-800">{stats.pending_verifications} Pending Verifications</p>
                <p className="text-sm text-amber-600">Merchants waiting for approval</p>
              </div>
              <HiArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          {stats.open_complaints > 0 && (
            <Link to="/admin/complaints" className="card bg-red-50 border-red-200 hover:shadow-card-hover transition-all group flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <HiExclamationCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-red-800">{stats.open_complaints} Open Complaints</p>
                <p className="text-sm text-red-600">Require attention</p>
              </div>
              <HiArrowRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiUsers} label="Total Users" value={stats.total_users} color="primary" trend={stats.monthly_growth_users} />
        <StatCard icon={HiOfficeBuilding} label="Active Merchants" value={stats.active_merchants} color="secondary" trend={5.2} />
        <StatCard icon={HiShoppingBag} label="Total Orders" value={stats.total_orders} color="info" trend={stats.monthly_growth_orders} />
        <StatCard icon={HiCurrencyDollar} label="Total GMV" value={stats.total_revenue} prefix="Rp " color="accent" trend={stats.monthly_growth_revenue} />
      </div>

      {/* Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-neutral-900">Order Trend (6 Months)</h2>
          <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
            <HiTrendingUp className="w-4 h-4" /> Growing
          </div>
        </div>
        <canvas ref={canvasRef} className="w-full h-56" />
      </div>

      {/* Impact + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <HiSparkles className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-neutral-900">Platform Impact</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <p className="text-2xl font-bold text-primary">{impact.food_saved_kg.toLocaleString()}</p>
              <p className="text-xs text-neutral-500">kg Food Saved</p>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <p className="text-2xl font-bold text-secondary-dark">{impact.co2_prevented_kg.toLocaleString()}</p>
              <p className="text-xs text-neutral-500">kg CO₂ Prevented</p>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <p className="text-2xl font-bold text-accent-dark">{impact.total_bags.toLocaleString()}</p>
              <p className="text-xs text-neutral-500">Bags Rescued</p>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">{impact.meals_rescued.toLocaleString()}</p>
              <p className="text-xs text-neutral-500">Meals Rescued</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="font-heading font-bold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { to: '/admin/verification', icon: '🔍', label: 'Review Merchant Applications', color: 'bg-amber-50 hover:bg-amber-100' },
              { to: '/admin/merchants', icon: '🏪', label: 'Manage Merchants', color: 'bg-blue-50 hover:bg-blue-100' },
              { to: '/admin/complaints', icon: '📝', label: 'Handle Complaints', color: 'bg-red-50 hover:bg-red-100' },
              { to: '/admin/analytics', icon: '📊', label: 'View Analytics', color: 'bg-green-50 hover:bg-green-100' },
            ].map(action => (
              <Link key={action.to} to={action.to} className={`flex items-center gap-3 p-3 rounded-xl ${action.color} transition-colors group`}>
                <span className="text-xl">{action.icon}</span>
                <span className="font-medium text-neutral-700 flex-1">{action.label}</span>
                <HiArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
