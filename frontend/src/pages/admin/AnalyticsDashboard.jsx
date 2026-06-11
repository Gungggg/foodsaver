import { useEffect, useRef } from 'react';
import { StatCard } from '../../components/common';
import { mockImpact, mockMerchantDistribution, mockTopMerchants, mockMonthlyTrend, formatCurrency } from '../../utils/mockData';
import { HiDownload, HiTrendingUp, HiShoppingBag, HiGlobeAlt, HiSparkles } from 'react-icons/hi';

const AnalyticsDashboard = () => {
  const impact = mockImpact.platform;
  const donutRef = useRef(null);
  const revenueRef = useRef(null);

  // Donut chart
  useEffect(() => {
    const canvas = donutRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 200 * dpr;
    canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);

    const data = mockMerchantDistribution.data;
    const labels = mockMerchantDistribution.labels;
    const total = data.reduce((s, v) => s + v, 0);
    const colors = ['#1B4332', '#74C365', '#F59E0B', '#3B82F6', '#8B5CF6'];
    let angle = -Math.PI / 2;

    data.forEach((val, i) => {
      const sliceAngle = (val / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(100, 100, 80, angle, angle + sliceAngle);
      ctx.arc(100, 100, 50, angle + sliceAngle, angle, true);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      angle += sliceAngle;
    });

    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 22px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(total.toString(), 100, 96);
    ctx.fillStyle = '#64748B';
    ctx.font = '11px Inter';
    ctx.fillText('Merchants', 100, 112);
  }, []);

  // Revenue chart
  useEffect(() => {
    const canvas = revenueRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const data = mockMonthlyTrend.revenue;
    const labels = mockMonthlyTrend.labels;
    const max = Math.max(...data) * 1.2;
    const barW = (rect.width - 60) / data.length;
    const chartH = rect.height - 40;

    ctx.clearRect(0, 0, rect.width, rect.height);
    data.forEach((val, i) => {
      const barH = (val / max) * chartH;
      const x = 30 + i * barW + barW * 0.1;
      const w = barW * 0.8;
      const y = chartH - barH + 10;

      const grad = ctx.createLinearGradient(x, y, x, y + barH);
      grad.addColorStop(0, '#F59E0B');
      grad.addColorStop(1, '#D97706');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, w, barH, [6, 6, 0, 0]);
      ctx.fill();

      ctx.fillStyle = '#64748B';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + w / 2, rect.height - 5);
    });
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Analytics Dashboard</h1>
          <p className="text-neutral-500 text-sm mt-1">Platform performance and impact metrics</p>
        </div>
        <button className="btn-outline flex items-center gap-2 text-sm">
          <HiDownload className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Impact Stats */}
      <div>
        <h2 className="text-lg font-heading font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <HiSparkles className="w-5 h-5 text-primary" /> Environmental Impact
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={HiSparkles} label="Food Saved" value={impact.food_saved_kg} suffix=" kg" color="secondary" />
          <StatCard icon={HiGlobeAlt} label="CO₂ Prevented" value={impact.co2_prevented_kg} suffix=" kg" color="primary" />
          <StatCard icon={HiShoppingBag} label="Bags Rescued" value={impact.total_bags} color="info" />
          <StatCard icon={HiSparkles} label="Trees Equivalent" value={impact.trees_equivalent} color="success" />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-neutral-900">Monthly Revenue</h2>
            <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
              <HiTrendingUp className="w-4 h-4" /> +15.7%
            </div>
          </div>
          <canvas ref={revenueRef} className="w-full h-48" />
        </div>

        {/* Merchant Distribution */}
        <div className="card">
          <h2 className="font-heading font-bold text-neutral-900 mb-4">Merchant Distribution</h2>
          <div className="flex items-center gap-8">
            <canvas ref={donutRef} className="w-[200px] h-[200px] flex-shrink-0" />
            <div className="space-y-3 flex-1">
              {mockMerchantDistribution.labels.map((label, i) => {
                const colors = ['#1B4332', '#74C365', '#F59E0B', '#3B82F6', '#8B5CF6'];
                return (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                      <span className="text-sm text-neutral-600">{label}</span>
                    </div>
                    <span className="text-sm font-semibold text-neutral-900">{mockMerchantDistribution.data[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Top Merchants */}
      <div className="card">
        <h2 className="font-heading font-bold text-neutral-900 mb-4">Top Merchants</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 text-left">
                <th className="pb-3 text-sm font-semibold text-neutral-500">#</th>
                <th className="pb-3 text-sm font-semibold text-neutral-500">Merchant</th>
                <th className="pb-3 text-sm font-semibold text-neutral-500">Orders</th>
                <th className="pb-3 text-sm font-semibold text-neutral-500">Revenue</th>
                <th className="pb-3 text-sm font-semibold text-neutral-500">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {mockTopMerchants.map((m, i) => (
                <tr key={m.name} className="hover:bg-neutral-50/50">
                  <td className="py-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-neutral-200 text-neutral-700' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-neutral-100 text-neutral-500'
                    }`}>{i + 1}</span>
                  </td>
                  <td className="py-3 font-medium text-neutral-900">{m.name}</td>
                  <td className="py-3 text-neutral-600">{m.orders.toLocaleString()}</td>
                  <td className="py-3 font-medium text-neutral-900">{formatCurrency(m.revenue)}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 text-amber-500 font-medium">⭐ {m.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
