import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { StatCard, Badge } from '../../components/common';
import { mockMerchantOrders, mockWeeklyRevenue, mockImpact, formatCurrency, getStatusColor, getStatusLabel } from '../../utils/mockData';
import { HiShoppingBag, HiCurrencyDollar, HiClipboardList, HiTrendingUp, HiArrowRight, HiPlus, HiQrcode, HiSparkles } from 'react-icons/hi';

const MerchantDashboard = () => {
  const todaysOrders = mockMerchantOrders.filter(o => o.status !== 'cancelled');
  const todaysRevenue = todaysOrders.reduce((sum, o) => sum + o.total_price, 0);
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

    const data = mockWeeklyRevenue.data;
    const labels = mockWeeklyRevenue.labels;
    const max = Math.max(...data) * 1.2;
    const barW = (rect.width - 60) / data.length;
    const chartH = rect.height - 40;

    ctx.clearRect(0, 0, rect.width, rect.height);

    data.forEach((val, i) => {
      const barH = (val / max) * chartH;
      const x = 30 + i * barW + barW * 0.15;
      const w = barW * 0.7;
      const y = chartH - barH + 10;

      const grad = ctx.createLinearGradient(x, y, x, y + barH);
      grad.addColorStop(0, '#74C365');
      grad.addColorStop(1, '#1B4332');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, w, barH, [6, 6, 0, 0]);
      ctx.fill();

      ctx.fillStyle = '#64748B';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + w / 2, rect.height - 5);
    });
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Merchant Dashboard</h1>
          <p className="text-neutral-500 text-sm mt-1">Welcome back! Here's your store overview.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/merchant/products" className="btn-primary flex items-center gap-2 text-sm">
            <HiPlus className="w-4 h-4" /> Add Bag
          </Link>
          <Link to="/merchant/pickup" className="btn-outline flex items-center gap-2 text-sm">
            <HiQrcode className="w-4 h-4" /> Verify Pickup
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiClipboardList} label="Today's Orders" value={todaysOrders.length} color="primary" trend={12} />
        <StatCard icon={HiCurrencyDollar} label="Today's Revenue" value={todaysRevenue} prefix="Rp " color="accent" trend={8} />
        <StatCard icon={HiShoppingBag} label="Active Bags" value={5} color="info" />
        <StatCard icon={HiSparkles} label="Food Saved" value={156} suffix=" kg" color="secondary" trend={15} />
      </div>

      {/* Chart + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Revenue */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-neutral-900">Weekly Revenue</h2>
            <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
              <HiTrendingUp className="w-4 h-4" /> +18.3%
            </div>
          </div>
          <canvas ref={canvasRef} className="w-full h-48" />
        </div>

        {/* Recent Orders */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-neutral-900">Recent Orders</h2>
            <Link to="/merchant/orders" className="text-primary text-sm font-medium flex items-center gap-1">
              View All <HiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockMerchantOrders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
                <div>
                  <p className="font-medium text-sm text-neutral-900">{order.customer_name}</p>
                  <p className="text-xs text-neutral-500">{order.product_name} × {order.quantity}</p>
                </div>
                <div className="text-right">
                  <Badge color={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                  <p className="text-sm font-medium text-neutral-900 mt-1">{formatCurrency(order.total_price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
        <div className="flex items-center gap-4 mb-4">
          <HiSparkles className="w-6 h-6 text-primary" />
          <h2 className="font-heading font-bold text-neutral-900">Your Environmental Impact</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">156 kg</p>
            <p className="text-sm text-neutral-500">Food Saved</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary-dark">390 kg</p>
            <p className="text-sm text-neutral-500">CO₂ Prevented</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent-dark">389</p>
            <p className="text-sm text-neutral-500">Bags Sold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
